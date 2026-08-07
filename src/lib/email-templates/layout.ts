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

// Organizer logo (VNU Institute of Microbiology and Biotechnology). Email
// clients strip data: URIs, so this must be an absolute https URL served from
// the deployed site — kept in sync with metadataBase in src/app/layout.tsx.
const LOGO_URL = "https://acm23.org/logo_imbt.png";

export function brandWrapper(title: string, bodyHtml: string): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A2332;border:1px solid #e6e9ee;border-radius:12px;overflow:hidden;">
      <div style="background:#ffffff;padding:20px 26px 18px;text-align:center;">
        <img src="${LOGO_URL}" alt="VNU Institute of Microbiology and Biotechnology (IMBT)" style="width:100%;max-width:460px;height:auto;display:block;margin:0 auto;" />
      </div>
      <div style="height:4px;background:linear-gradient(90deg,#E32119 0%,#E32119 25%,#9AA0A6 25%,#9AA0A6 50%,#7FB539 50%,#7FB539 75%,#1C75BB 75%,#1C75BB 100%);font-size:0;line-height:0;">&nbsp;</div>
      <div style="background:linear-gradient(135deg,#12659F,#0A3A63);padding:26px 30px;">
        <h1 style="color:#ffffff;margin:0;font-size:23px;letter-spacing:-0.01em;">${title}</h1>
        <p style="color:#BFD8EF;margin:8px 0 0;font-size:14px;">Hanoi, Vietnam · November 16-18, 2026</p>
      </div>
      <div style="padding:30px 32px 32px;background:#ffffff;">
        ${bodyHtml}
      </div>
    </div>
  `;
}
