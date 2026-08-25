import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { Registration } from "@/lib/models/registration";
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

  // Resolve a friendly recipient name: reuse the registered fullName when the
  // same email registered earlier, otherwise fall back to the neutral "Author".
  const registration = await Registration.findOne({
    email: doc.notificationEmail,
  })
    .select({ fullName: 1 })
    .lean();
  const recipientName = registration?.fullName ?? "Author";

  const result = await sendAbstractConfirmation(doc.notificationEmail, {
    recipientName,
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
