import {
  formatAbstractSession,
  formatScientistCategory,
} from "@/lib/abstract-topics";
import { brandWrapper, escapeHtml, paragraphs } from "./layout";

// Abstract confirmation email. Prose follows the Organizing Committee
// template verbatim (user-provided copy), plus a details table of the form
// input (same pattern as the old abstract email). Recipient name resolves to
// the registration fullName when the same email registered earlier, otherwise
// falls back to the neutral "Author".

const GREETING = (name: string) => `Dear ${escapeHtml(name)},`;

const THANKS =
  "Thank you very much for submitting the abstract to ACM23. Your abstract will be under review by the organizing committee. Once your abstract passes the evaluation process, we will inform you, and the title of your talk will then appear in the program.";

const FOLLOW_UP =
  "We will contact you soon after September 30, 2026";

const SIGNATURE =
  "Best regards,<br>The Organizing Committee";

// Email-safe two-column row: fixed-width label cell + value cell, spacing via
// cell padding (Outlook mishandles margin on tables), valign top so long
// values wrap cleanly beside the label.
const row = (label: string, value: string) => `
  <tr>
    <td width="130" valign="top" style="padding:8px 12px 8px 0;color:#64748b;font-size:14px;">${label}</td>
    <td valign="top" style="padding:8px 0;color:#1A2332;font-size:14px;">${value}</td>
  </tr>`;

export function abstractConfirmationEmail(data: {
  recipientName: string;
  submissionId: string;
  scientistCategory: string;
  sessionPreference: string;
  fileName: string;
}): { subject: string; html: string } {
  const body = `
    ${paragraphs(GREETING(data.recipientName), THANKS)}
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin:16px 0;">
      ${row("Submission ID", `<strong style="color:#0D7377;">${escapeHtml(data.submissionId)}</strong>`)}
      ${row("Scientist", escapeHtml(formatScientistCategory(data.scientistCategory)))}
      ${row("Preferred session", escapeHtml(formatAbstractSession(data.sessionPreference)))}
      ${row("File", escapeHtml(data.fileName))}
    </table>
    ${paragraphs(FOLLOW_UP, SIGNATURE)}
  `;
  return {
    subject: `ACM23 Abstract Received — ${data.submissionId}`,
    html: brandWrapper("ACM23 Abstract Received", body),
  };
}
