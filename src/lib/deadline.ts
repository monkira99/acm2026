// Pure deadline logic, kept free of imports so node:test can load it directly.

/**
 * Server-side grace window. Pages flip to "closed" exactly at the deadline, but
 * a form opened before it still goes through if submitted within this window.
 */
export const SUBMISSION_GRACE_MS = 15 * 60 * 1000;

export function isPastDeadline(
  deadline: string,
  now: Date,
  graceMs = 0,
): boolean {
  return now.getTime() > new Date(deadline).getTime() + graceMs;
}
