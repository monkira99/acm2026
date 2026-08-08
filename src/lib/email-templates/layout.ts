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

// Table-based layout for cross-client rendering. Outlook (Word engine) ignores
// CSS gradients and `background` on <div>, which made the header band vanish —
// so the header/footer colours are set with the `bgcolor` attribute on <td>
// (which Outlook honours) plus a solid `background-color`. The gradient is kept
// as a `background-image` for clients that support it (Gmail, Apple Mail);
// Outlook simply falls back to the solid colour. `border-radius` is cosmetic
// and safely ignored by Outlook.
const HEADER_SOLID = "#0F5C97"; // solid fallback within the #12659F→#0A3A63 gradient

export function brandWrapper(title: string, bodyHtml: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:#f4f6f8;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e6e9ee;border-radius:12px;">
            <tr>
              <td bgcolor="${HEADER_SOLID}" style="background-color:${HEADER_SOLID};background-image:linear-gradient(135deg,#12659F,#0A3A63);padding:32px;border-radius:12px 12px 0 0;font-family:sans-serif;">
                <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:-0.01em;">${title}</h1>
                <p style="color:#BFD8EF;margin:8px 0 0;font-size:14px;">Hanoi, Vietnam · November 16-18, 2026</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;font-family:sans-serif;color:#1A2332;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td bgcolor="#f3f5f7" style="background-color:#f3f5f7;padding:18px 32px;border-top:1px solid #e6e9ee;border-radius:0 0 12px 12px;font-family:sans-serif;color:#6b7684;font-size:12px;line-height:1.6;">
                <p style="margin:0 0 4px;color:#334155;font-weight:600;">ACM23 · Asian Consortium for Microbial Resources</p>
                <p style="margin:0 0 4px;">Organized by the VNU Institute of Microbiology and Biotechnology (IMBT), Vietnam National University, Hanoi, Vietnam.</p>
                <p style="margin:0;">Contact <a href="mailto:acm23@vnu.edu.vn" style="color:#12659F;text-decoration:none;">acm23@vnu.edu.vn</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
