"use server";

import { put } from "@vercel/blob";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { abstractSchema } from "@/lib/validators";
import { sendAbstractConfirmation } from "@/lib/email";

interface ActionResult {
  success: boolean;
  submissionId?: string;
  error?: string;
}

export async function submitAbstractAction(formData: FormData): Promise<ActionResult> {
  const rawData = {
    title: formData.get("title") as string,
    authors: formData.get("authors") as string,
    correspondingEmail: formData.get("correspondingEmail") as string,
    affiliation: formData.get("affiliation") as string,
    abstractText: formData.get("abstractText") as string,
    keywords: formData.get("keywords") as string,
    presentationType: formData.get("presentationType") as string,
  };

  const parsed = abstractSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    let pdfFileUrl: string | undefined;
    const pdfFile = formData.get("pdfFile") as File | null;
    if (pdfFile && pdfFile.size > 0) {
      if (pdfFile.size > 10 * 1024 * 1024) {
        return { success: false, error: "PDF file must be under 10MB." };
      }
      if (pdfFile.type !== "application/pdf") {
        return { success: false, error: "Only PDF files are accepted." };
      }
      const blob = await put(`abstracts/${Date.now()}-${pdfFile.name}`, pdfFile, {
        access: "private",
      });
      pdfFileUrl = blob.url;
    }

    await connectDB();

    const count = await Abstract.countDocuments();
    const submissionId = `ACM23-A-${String(count + 1).padStart(4, "0")}`;

    const abstract = new Abstract({
      ...parsed.data,
      pdfFileUrl,
      submissionId,
    });
    await abstract.save();

    await sendAbstractConfirmation(parsed.data.correspondingEmail, {
      title: parsed.data.title,
      submissionId,
      presentationType: parsed.data.presentationType,
    });

    return { success: true, submissionId };
  } catch (error) {
    console.error("Abstract submission error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
