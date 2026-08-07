import { brandWrapper, escapeHtml, paragraphs } from "./layout";

// Registration confirmation email. Content is transcribed verbatim from
// "Registration response_*.docx" (repo root) — prose only, no confirmation ID
// or details table (decision in issue #4). The Vietnamese-audience vs
// International-audience variant is chosen here by country === "Vietnam".
//
// Two obvious ESL grammar slips in the docx were corrected in the International
// variant ("send it to you" -> "sent to you"; "participation to" -> "in";
// "seeing you to Hanoi" -> "in Hanoi"); flagged in issue #6.

const GREETING = (fullName: string) => `Dear ${escapeHtml(fullName)},`;

const THANKS =
  "Thank you very much for registering for ACM23, which will be held in Hanoi, Vietnam, from November 16-18, 2026.";

const ABSTRACT_CALL =
  "If you are an ACM member, or if you would like to present your research topics related to applied microbiology or microbial resources in environmental protection, circular economy, sustainable crop, livestock production, blue aquaculture, food safety, microbiome, human health, One health, or annual ACM report, we warmly encourage you to submit your abstracts by September 30, 2026. The abstract template is available on the ACM23 website.";

const SIGNATURE =
  "Best regards,<br>On behalf of the ACM23 Organizing Committee<br>Trinh Thanh Trung";

function vietnameseBody(fullName: string): string {
  return paragraphs(
    GREETING(fullName),
    THANKS,
    "We are pleased to confirm that your registration has been well received. Due to limited seats available, we will notify your successful registration later and send you an invitation letter soon.",
    ABSTRACT_CALL,
    "We sincerely appreciate your patience and look forward to receiving your abstracts for ACM23.",
    SIGNATURE,
  );
}

function internationalBody(fullName: string): string {
  return paragraphs(
    GREETING(fullName),
    THANKS,
    "We are pleased to confirm that your registration has been well received.",
    ABSTRACT_CALL,
    "An invitation letter for your visa application or administration purposes will be prepared and sent to you soon.",
    "We sincerely appreciate your participation in the ACM23 meeting and look forward to seeing you in Hanoi soon.",
    SIGNATURE,
  );
}

export function registrationEmail(data: {
  fullName: string;
  country: string;
}): { subject: string; html: string } {
  const isVietnam = data.country === "Vietnam";
  const body = isVietnam ? vietnameseBody(data.fullName) : internationalBody(data.fullName);
  return {
    subject: "ACM23 Registration Confirmation",
    html: brandWrapper("ACM23 Registration Received", body),
  };
}
