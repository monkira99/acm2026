import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "ACM23 <noreply@acm23.org>";

export async function sendRegistrationConfirmation(
  to: string,
  data: { fullName: string; confirmationId: string; role: string; affiliation: string }
) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `ACM23 Registration Confirmation — ${data.confirmationId}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#0D7377,#1A2332);padding:32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">ACM23 Registration Confirmed</h1>
          <p style="color:#C8A951;margin:8px 0 0;font-size:14px;">Hanoi, Vietnam · October 2026</p>
        </div>
        <div style="padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;">
          <p>Dear ${data.fullName},</p>
          <p>Thank you for registering for ACM23. Your registration has been received successfully.</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0;">
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Confirmation ID</td><td style="padding:8px 0;font-weight:bold;color:#0D7377;">${data.confirmationId}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Name</td><td style="padding:8px 0;">${data.fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Role</td><td style="padding:8px 0;">${data.role}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Affiliation</td><td style="padding:8px 0;">${data.affiliation}</td></tr>
          </table>
          <p>Please keep this email for your records. We look forward to seeing you in Hanoi!</p>
          <p style="color:#888;font-size:12px;margin-top:32px;">— ACM23 Organizing Committee</p>
        </div>
      </div>
    `,
  });
}

export async function sendAbstractConfirmation(
  to: string,
  data: { title: string; submissionId: string; presentationType: string }
) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `ACM23 Abstract Received — ${data.submissionId}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#0D7377,#1A2332);padding:32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Abstract Submission Received</h1>
          <p style="color:#C8A951;margin:8px 0 0;font-size:14px;">ACM23 · Hanoi, Vietnam</p>
        </div>
        <div style="padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;">
          <p>Dear Author,</p>
          <p>Your abstract has been successfully submitted to ACM23.</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0;">
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Submission ID</td><td style="padding:8px 0;font-weight:bold;color:#0D7377;">${data.submissionId}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Title</td><td style="padding:8px 0;">${data.title}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:14px;">Type</td><td style="padding:8px 0;">${data.presentationType}</td></tr>
          </table>
          <p>You will be notified of the review outcome by August 15, 2026.</p>
          <p style="color:#888;font-size:12px;margin-top:32px;">— ACM23 Scientific Committee</p>
        </div>
      </div>
    `,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: "contact@acm23.org",
    subject: `[ACM23 Contact] ${data.subject}`,
    replyTo: data.email,
    html: `
      <div style="font-family:sans-serif;max-width:600px;">
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr style="border:none;border-top:1px solid #eee;">
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  });
}
