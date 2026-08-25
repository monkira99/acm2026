import { sendMail, type MailResult } from "@/lib/mailer";
import { brandWrapper, escapeHtml, paragraphs } from "@/lib/email-templates/layout";
import { registrationEmail } from "@/lib/email-templates/registration";
import { abstractConfirmationEmail } from "@/lib/email-templates/abstract";

/**
 * Registration confirmation. Content + Vietnamese/International variant come
 * from the registration template (issue #4). Non-throwing — returns a result so
 * the caller can record sent-status and treat failure as non-fatal (issue #6).
 */
export function sendRegistrationConfirmation(
  to: string,
  data: { fullName: string; country: string },
): Promise<MailResult> {
  const { subject, html } = registrationEmail(data);
  return sendMail({ to, subject, html });
}

/**
 * Abstract submission confirmation. Prose template from the Organizing
 * Committee plus the submission details table. Non-throwing — returns a
 * result so the caller can record sent-status and treat failure as non-fatal.
 */
export function sendAbstractConfirmation(
  to: string,
  data: {
    recipientName: string;
    submissionId: string;
    scientistCategory: string;
    sessionPreference: string;
    fileName: string;
  },
): Promise<MailResult> {
  const { subject, html } = abstractConfirmationEmail(data);
  return sendMail({ to, subject, html });
}

export function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<MailResult> {
  const body = `
    ${paragraphs(
      `<strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})`,
      `<strong>Subject:</strong> ${escapeHtml(data.subject)}`,
    )}
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
      <tr>
        <td bgcolor="#f8fafc" style="background-color:#f8fafc;padding:16px;border:1px solid #e6e9ee;border-radius:8px;color:#1A2332;font-size:14px;line-height:1.6;">
          ${escapeHtml(data.message).replace(/\n/g, "<br>")}
        </td>
      </tr>
    </table>
  `;
  return sendMail({
    to: "acm23@vnu.edu.vn",
    subject: `[ACM23 Contact] ${data.subject}`,
    replyTo: data.email,
    html: brandWrapper("New Contact Message", body),
  });
}
