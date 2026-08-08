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
  data: { fullName: string; country: string },
): Promise<MailResult> {
  const { subject, html } = registrationEmail(data);
  return sendMail({ to, subject, html });
}

export function sendAbstractConfirmation(
  to: string,
  data: { title: string; submissionId: string; presentationType: string; topic: string },
): Promise<MailResult> {
  const topicLabel = formatAbstractTopic(data.topic);
  // Email-safe two-column row: fixed-width label cell + value cell, spacing via
  // cell padding (Outlook mishandles margin on tables), valign top so long
  // values wrap cleanly beside the label.
  const row = (label: string, value: string) => `
    <tr>
      <td width="130" valign="top" style="padding:8px 12px 8px 0;color:#64748b;font-size:14px;">${label}</td>
      <td valign="top" style="padding:8px 0;color:#1A2332;font-size:14px;">${value}</td>
    </tr>`;
  const body = `
    ${paragraphs("Dear Author,", "Your abstract has been successfully submitted to ACM23.")}
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
      ${row("Submission ID", `<strong style="color:#0D7377;">${escapeHtml(data.submissionId)}</strong>`)}
      ${row("Title", escapeHtml(data.title))}
      ${row("Type", escapeHtml(data.presentationType))}
      ${row("Topic", escapeHtml(topicLabel))}
    </table>
    ${paragraphs(
      "You will be notified of the review outcome by August 15, 2026.",
      '<span style="color:#888;font-size:12px;">— ACM23 Scientific Committee</span>',
    )}
  `;
  // Explicit plain-text alternative: the details are a table, which the HTML→text
  // fallback would flatten badly — so we author the text part directly.
  const text = `Dear Author,

Your abstract has been successfully submitted to ACM23.

Submission ID: ${data.submissionId}
Title: ${data.title}
Type: ${data.presentationType}
Topic: ${topicLabel}

You will be notified of the review outcome by August 15, 2026.

— ACM23 Scientific Committee`;
  return sendMail({
    to,
    subject: `ACM23 Abstract Received — ${data.submissionId}`,
    text,
    html: brandWrapper("Abstract Submission Received", body),
  });
}

export function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<MailResult> {
  // Same layout system as the other emails (brandWrapper). The message body
  // sits in a bgcolor'd table cell rather than a styled <div>, so Outlook keeps
  // the tinted panel. Subject sanitisation and Reply-To validation happen
  // upstream (sendMail strips CR/LF; contactSchema validates data.email).
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
