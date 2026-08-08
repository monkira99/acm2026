import { formatAbstractTopic } from "@/lib/abstract-topics";
import { sendMail, type MailResult } from "@/lib/mailer";
import { brandWrapper, escapeHtml, paragraphs } from "@/lib/email-templates/layout";
import { registrationEmail } from "@/lib/email-templates/registration";

/**
 * Registration confirmation. Content + Vietnamese/International variant come
 * from the registration template (issue #4). Non-throwing — returns a result so
 * the caller can record sent-status and treat failure as non-fatal (issue #6).
 */
export function sendRegistrationConfirmation(
  to: string,
  data: { confirmationId: string; fullName: string; country: string },
): Promise<MailResult> {
  const { subject, html } = registrationEmail(data);
  return sendMail({ to, subject, html });
}

export function sendAbstractConfirmation(
  to: string,
  data: { title: string; submissionId: string; presentationType: string; topic: string },
): Promise<MailResult> {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#888;font-size:14px;">${label}</td><td style="padding:8px 0;">${value}</td></tr>`;
  const body = `
    ${paragraphs("Dear Author,", "Your abstract has been successfully submitted to ACM23.")}
    <table style="width:100%;border-collapse:collapse;margin:24px 0;">
      <tr><td style="padding:8px 0;color:#888;font-size:14px;">Submission ID</td><td style="padding:8px 0;font-weight:bold;color:#0D7377;">${escapeHtml(data.submissionId)}</td></tr>
      ${row("Title", escapeHtml(data.title))}
      ${row("Type", escapeHtml(data.presentationType))}
      ${row("Topic", escapeHtml(formatAbstractTopic(data.topic)))}
    </table>
    ${paragraphs(
      "You will be notified of the review outcome by August 15, 2026.",
      '<span style="color:#888;font-size:12px;">— ACM23 Scientific Committee</span>',
    )}
  `;
  return sendMail({
    to,
    subject: `ACM23 Abstract Received — ${data.submissionId}`,
    html: brandWrapper("Abstract Submission Received", body),
  });
}

export function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<MailResult> {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;color:#1A2332;">
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <hr style="border:none;border-top:1px solid #eee;">
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    </div>
  `;
  return sendMail({
    to: "acm23@vnu.edu.vn",
    subject: `[ACM23 Contact] ${data.subject}`,
    replyTo: data.email,
    html,
  });
}
