import nodemailer, { type Transporter } from "nodemailer";

// Cache a single transporter on globalThis — same rationale as the Mongoose
// cache in src/lib/mongodb.ts: survive dev hot-reload re-imports and let a warm
// serverless instance reuse the SMTP connection across invocations.
declare global {
  var __acm23Mailer: Transporter | undefined;
}

function createTransporter(): Transporter {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // implicit TLS on 465 (see issue #3)
    pool: true,
    maxConnections: 3,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function getMailer(): Transporter {
  return (globalThis.__acm23Mailer ??= createTransporter());
}

const FROM =
  process.env.MAIL_FROM ?? `ACM23 Organizing Committee <${process.env.SMTP_USER ?? ""}>`;

// Standing CC: every outgoing ACM23 email copies the organizing-committee
// inboxes. Override with a comma-separated MAIL_CC env var.
const CC = (
  process.env.MAIL_CC ?? "nhung.dt@vnu.edu.vn, ha.nguyenviet@vnu.edu.vn"
)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  /** Plain-text alternative. Auto-derived from `html` when omitted. */
  text?: string;
  replyTo?: string;
  attachments?: { filename: string; content?: Buffer | string; path?: string }[];
}

/**
 * Derive a readable plain-text body from our email HTML. Sending multipart
 * (HTML + text) instead of HTML-only is a well-known deliverability win —
 * HTML-only messages are a common spam signal.
 */
function htmlToText(html: string): string {
  return html
    .replace(/\r?\n/g, " ") // flatten source indentation/newlines
    .replace(/<\s*br\s*\/?\s*>/gi, "\n") // <br> -> newline
    .replace(/<\/\s*(p|div|h[1-6]|li|tr)\s*>/gi, "\n") // block ends -> newline
    .replace(/<[^>]+>/g, "") // strip remaining tags
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+/g, " ") // collapse runs of spaces
    .replace(/ *\n */g, "\n") // trim spaces around newlines
    .replace(/\n{3,}/g, "\n\n") // at most one blank line
    .trim();
}

export type MailResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

/**
 * Send one email via the shared Gmail transport. Never throws — returns a
 * result so callers can record sent-status (issue #7) and decide whether a
 * failure is fatal (for registration it is not; see issue #4/#6).
 */
export async function sendMail(options: MailOptions): Promise<MailResult> {
  try {
    const info = await getMailer().sendMail({
      from: FROM,
      cc: CC.length > 0 ? CC : undefined,
      ...options,
      text: options.text ?? htmlToText(options.html),
    });
    // Only a rejected *primary* recipient is a real failure — a bounced CC
    // (e.g. a committee inbox) must not mark the recipient's email as failed.
    const rejected = (info.rejected ?? []).map((address: unknown) =>
      String(address).toLowerCase(),
    );
    if (rejected.includes(options.to.toLowerCase())) {
      return { ok: false, error: `Recipient rejected: ${options.to}` };
    }
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("sendMail failed:", message);
    return { ok: false, error: message };
  }
}
