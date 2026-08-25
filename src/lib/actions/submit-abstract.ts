"use server";

import { put, del } from "@vercel/blob";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { abstractSubmissionSchema } from "@/lib/validators";
import { getFileError } from "@/lib/abstract-file";
import { deliverAbstractConfirmation } from "@/lib/abstract-email";
import { nextSequentialId, isDuplicateKeyError } from "@/lib/actions/sequential-id";

type SubmitAbstractResult =
  | { success: true; submissionId: string }
  | { success: false; error: string };

export async function submitAbstractAction(
  formData: FormData,
): Promise<SubmitAbstractResult> {
  const rawFile = formData.get("abstractFile");
  if (!(rawFile instanceof File)) {
    return {
      success: false,
      error: "Please upload your abstract file.",
    };
  }

  const fileError = getFileError(rawFile);
  if (fileError) {
    return { success: false, error: fileError };
  }

  const rawData = {
    notificationEmail: String(formData.get("notificationEmail") ?? ""),
    scientistCategory: String(formData.get("scientistCategory") ?? ""),
    sessionPreference: String(formData.get("sessionPreference") ?? ""),
  };

  const parsed = abstractSubmissionSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set");
    return {
      success: false,
      error:
        "File storage is not configured. Please contact the organizers at acm23@vnu.edu.vn.",
    };
  }

  try {
    await connectDB();

    const safeName = rawFile.name
      .replace(/[/\\?%*:|"<>\u0000-\u001F]/g, "")
      .replace(/\s+/g, "-");

    let submissionId = "";
    for (let attempt = 0; ; attempt++) {
      submissionId = await nextSequentialId(
        Abstract,
        "ACM23-A-",
        "submissionId",
      );

      let blob;
      try {
        blob = await put(`abstracts/${submissionId}-${safeName}`, rawFile, {
          access: "public",
          addRandomSuffix: false,
          contentType: rawFile.type || "application/octet-stream",
        });
      } catch (putError) {
        if (
          putError instanceof Error &&
          putError.message.includes("Cannot use public access on a private store")
        ) {
          blob = await put(`abstracts/${submissionId}-${safeName}`, rawFile, {
            access: "private",
            addRandomSuffix: false,
            contentType: rawFile.type || "application/octet-stream",
          });
        } else {
          throw putError;
        }
      }

      try {
        await new Abstract({
          ...parsed.data,
          submissionId,
          fileUrl: blob.url,
          fileName: rawFile.name,
          fileSize: rawFile.size,
        }).save();
        break;
      } catch (error) {
        try {
          await del(blob.url);
        } catch {
          // Ignore cleanup error
        }

        if (isDuplicateKeyError(error, "submissionId") && attempt < 5) {
          continue;
        }
        throw error;
      }
    }

    // Email is non-fatal: the abstract is already saved, so a send failure
    // must not fail the submission — it's recorded on the doc and recoverable
    // via admin manual resend.
    const mail = await deliverAbstractConfirmation({ submissionId });
    if (!mail.ok) {
      console.error(`Abstract ${submissionId}: confirmation email failed — ${mail.error}`);
    }

    return { success: true, submissionId };
  } catch (error) {
    console.error("Abstract submission error:", error);
    return {
      success: false,
      error:
        "An unexpected error occurred while submitting your abstract. Please try again.",
    };
  }
}
