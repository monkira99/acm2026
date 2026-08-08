"use server";

import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { abstractSchema } from "@/lib/validators";
import { sendAbstractConfirmation } from "@/lib/email";
import { nextSequentialId, isDuplicateKeyError } from "@/lib/actions/sequential-id";

interface ActionResult {
  success: boolean;
  submissionId?: string;
  error?: string;
}

export async function submitAbstractAction(formData: FormData): Promise<ActionResult> {
  const coAuthorNames = formData.getAll("coAuthorName").map(String);
  const coAuthorAffiliations = formData.getAll("coAuthorAffiliation").map(String);
  const coAuthors = coAuthorNames
    .map((name, index) => ({
      name,
      affiliation: coAuthorAffiliations[index] ?? "",
    }))
    .filter((author) => author.name.trim() || author.affiliation.trim());

  const rawData = {
    title: formData.get("title") as string,
    presentingAuthor: {
      name: formData.get("presentingAuthorName") as string,
      affiliation: formData.get("presentingAuthorAffiliation") as string,
      email: formData.get("presentingAuthorEmail") as string,
    },
    coAuthors,
    abstractText: formData.get("abstractText") as string,
    keywords: formData.get("keywords") as string,
    presentationType: formData.get("presentationType") as string,
    topic: formData.get("topic") as string,
  };

  const parsed = abstractSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await connectDB();

    // Allocate the sequential ID from the current max and save. Retry if a
    // concurrent submission grabbed the same submissionId first.
    let submissionId = "";
    for (let attempt = 0; ; attempt++) {
      submissionId = await nextSequentialId(Abstract, "ACM23-A-", "submissionId");
      try {
        await new Abstract({ ...parsed.data, submissionId }).save();
        break;
      } catch (error) {
        if (isDuplicateKeyError(error, "submissionId") && attempt < 5) {
          continue;
        }
        throw error;
      }
    }

    // Non-fatal: the abstract is already saved, so a send failure must not fail
    // the submission (same rule as registration — issue #4/#6).
    const mail = await sendAbstractConfirmation(parsed.data.correspondingEmail, {
      title: parsed.data.title,
      submissionId,
      presentationType: parsed.data.presentationType,
      topic: parsed.data.topic,
    });
    if (!mail.ok) {
      console.error(`Abstract ${submissionId}: confirmation email failed — ${mail.error}`);
    }

    return { success: true, submissionId };
  } catch (error) {
    console.error("Abstract submission error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
