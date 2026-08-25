import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { sendAbstractConfirmation } from "@/lib/email";
import type { MailResult } from "@/lib/mailer";

export async function deliverAbstractConfirmation(
  abstract: { submissionId: string },
): Promise<MailResult> {
  await connectDB();
  const doc = await Abstract.findOne({
    submissionId: abstract.submissionId,
  }).lean();

  if (!doc) {
    return { ok: false, error: "Abstract not found." };
  }

  const result = await sendAbstractConfirmation(doc.notificationEmail, {
    submissionId: doc.submissionId,
    scientistCategory: doc.scientistCategory,
    sessionPreference: doc.sessionPreference,
    fileName: doc.fileName,
  });

  await Abstract.updateOne(
    { submissionId: abstract.submissionId },
    result.ok
      ? {
          $set: { emailSent: true, emailSentAt: new Date() },
          $unset: { lastEmailError: "" },
        }
      : { $set: { emailSent: false, lastEmailError: result.error } },
  );

  return result;
}
