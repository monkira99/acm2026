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
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A2332;border:1px solid #e6e9ee;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#12659F,#0A3A63);padding:32px;border-radius:12px 12px 0 0;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:-0.01em;">${title}</h1>
        <p style="color:#BFD8EF;margin:8px 0 0;font-size:14px;">Hanoi, Vietnam · November 16-18, 2026</p>
      </div>
      <div style="padding:32px;background:#ffffff;">
        ${bodyHtml}
      </div>
      <div style="padding:18px 32px;background:#f3f5f7;border-top:1px solid #e6e9ee;border-radius:0 0 12px 12px;color:#6b7684;font-size:12px;line-height:1.6;">
        <p style="margin:0 0 4px;color:#334155;font-weight:600;">ACM23 · Asian Consortium for Microbial Resources</p>
        <p style="margin:0 0 4px;">Organized by the VNU Institute of Microbiology and Biotechnology (IMBT), Vietnam National University, Hanoi, Vietnam.</p>
        <p style="margin:0;">Contact <a href="mailto:acm23@vnu.edu.vn" style="color:#12659F;text-decoration:none;">acm23@vnu.edu.vn</a></p>
      </div>
    </div>
  `;
}
