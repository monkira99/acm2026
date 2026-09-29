import { cookies } from "next/headers";
import { importantDates } from "@/data/dates";
import { isPastDeadline, SUBMISSION_GRACE_MS } from "@/lib/deadline";

/**
 * Dev/test-only cookie that fakes the current time (any `Date`-parsable
 * string), so deadline behaviour can be exercised end to end before the real
 * deadline. Ignored in production builds.
 */
export const FAKE_NOW_COOKIE = "acm23_now";

export type SubmissionWindow = "Abstract Submission" | "Registration";

/** Current time for deadline checks in server components and actions. */
export async function requestNow(): Promise<Date> {
  if (process.env.NODE_ENV !== "production") {
    const fake = (await cookies()).get(FAKE_NOW_COOKIE)?.value;
    if (fake && !Number.isNaN(Date.parse(fake))) return new Date(fake);
  }
  return new Date();
}

/**
 * Whether a submission window has closed. Pages use the exact deadline; server
 * actions pass `{ grace: true }` so a form opened just before the deadline can
 * still be submitted within SUBMISSION_GRACE_MS.
 */
export async function isWindowClosed(
  label: SubmissionWindow,
  { grace = false }: { grace?: boolean } = {},
): Promise<boolean> {
  const entry = importantDates.find((d) => d.label === label);
  if (!entry) return false;
  return isPastDeadline(entry.deadline, await requestNow(), grace ? SUBMISSION_GRACE_MS : 0);
}

const closedLead: Record<SubmissionWindow, string> = {
  "Abstract Submission": "Abstract submission",
  Registration: "Registration",
};

/** User-facing notice shown on the closed page and returned by the actions. */
export function closedMessage(label: SubmissionWindow): string {
  const date = importantDates.find((d) => d.label === label)?.date;
  return `${closedLead[label]} closed on ${date} (23:59 ICT). For enquiries, please contact acm23@vnu.edu.vn.`;
}
