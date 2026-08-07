// Shared brand wrapper for ACM23 emails. Pure — takes a title + body HTML and
// returns the full HTML document body. Extracted from the original email.ts so
// registration, abstract, and future emails render consistently.

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Wrap paragraph strings in styled <p> tags. Callers pass pre-escaped/trusted HTML. */
export function paragraphs(...html: string[]): string {
  return html.map((p) => `<p style="margin:0 0 16px;line-height:1.6;">${p}</p>`).join("");
}

export function brandWrapper(title: string, bodyHtml: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A2332;">
      <div style="background:linear-gradient(135deg,#0D7377,#1A2332);padding:32px;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">${title}</h1>
        <p style="color:#C8A951;margin:8px 0 0;font-size:14px;">Hanoi, Vietnam · November 16-18, 2026</p>
      </div>
      <div style="padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;">
        ${bodyHtml}
      </div>
    </div>
  `;
}
