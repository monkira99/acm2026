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

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content?: Buffer | string; path?: string }[];
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
    const info = await getMailer().sendMail({ from: FROM, ...options });
    if (info.rejected && info.rejected.length > 0) {
      return { ok: false, error: `Recipient rejected: ${info.rejected.join(", ")}` };
    }
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("sendMail failed:", message);
    return { ok: false, error: message };
  }
}
