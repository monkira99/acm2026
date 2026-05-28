"use server";

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

    const count = await Abstract.countDocuments();
    const submissionId = `ACM23-A-${String(count + 1).padStart(4, "0")}`;

    const abstract = new Abstract({
      ...parsed.data,
      submissionId,
    });
    await abstract.save();

    await sendAbstractConfirmation(parsed.data.correspondingEmail, {
      title: parsed.data.title,
      submissionId,
      presentationType: parsed.data.presentationType,
      topic: parsed.data.topic,
    });

    return { success: true, submissionId };
  } catch (error) {
    console.error("Abstract submission error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
