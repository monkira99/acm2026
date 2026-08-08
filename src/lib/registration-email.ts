import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { sendRegistrationConfirmation } from "@/lib/email";
import type { MailResult } from "@/lib/mailer";

/**
 * The single "send + record" path for registration confirmation emails, shared
 * by the registration auto-send (issue #6) and the admin manual/resend action
 * (issue #8). Sends the confirmation, then records the outcome onto the
 * Registration document (emailSent / emailSentAt / lastEmailError).
 *
 * Non-throwing: returns the MailResult so callers decide whether a failure is
 * fatal. For registration it is not — the record is already saved.
 */
export async function deliverRegistrationConfirmation(registration: {
  confirmationId: string;
  email: string;
  fullName: string;
  country: string;
}): Promise<MailResult> {
  const result = await sendRegistrationConfirmation(registration.email, {
    confirmationId: registration.confirmationId,
    fullName: registration.fullName,
    country: registration.country,
  });

  await connectDB();
  await Registration.updateOne(
    { confirmationId: registration.confirmationId },
    result.ok
      ? { $set: { emailSent: true, emailSentAt: new Date() }, $unset: { lastEmailError: "" } }
      : { $set: { emailSent: false, lastEmailError: result.error } },
  );

  return result;
}
