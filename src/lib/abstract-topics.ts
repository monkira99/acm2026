export const ABSTRACT_SESSION_VALUES = [
  "environmental-protection",
  "circular-economy",
  "sustainable-crop",
  "livestock-production",
  "blue-aquaculture",
  "food-safety",
  "human-health",
  "one-health",
  "annual-acm-report",
] as const;

export type AbstractSession = (typeof ABSTRACT_SESSION_VALUES)[number];

export const ABSTRACT_SESSION_LABELS: Record<AbstractSession, string> = {
  "environmental-protection": "Environmental protection",
  "circular-economy": "Circular economy",
  "sustainable-crop": "Sustainable crop",
  "livestock-production": "Livestock production",
  "blue-aquaculture": "Blue aquaculture",
  "food-safety": "Food safety",
  "human-health": "Human health",
  "one-health": "One Health",
  "annual-acm-report": "Annual ACM report",
};

export const ABSTRACT_SESSION_OPTIONS = ABSTRACT_SESSION_VALUES.map((value) => ({
  value,
  label: ABSTRACT_SESSION_LABELS[value],
}));

export const SCIENTIST_CATEGORY_VALUES = [
  "junior",
  "senior",
  "other",
] as const;

export type ScientistCategory = (typeof SCIENTIST_CATEGORY_VALUES)[number];

export const SCIENTIST_CATEGORY_LABELS: Record<ScientistCategory, string> = {
  junior: "Juniors (PhD students or less than 5 years after PhD completion)",
  senior: "Seniors (PI project or project leader)",
  other: "Other (Keynote speaker, ...)",
};

export const SCIENTIST_CATEGORY_OPTIONS = SCIENTIST_CATEGORY_VALUES.map(
  (value) => ({
    value,
    label: SCIENTIST_CATEGORY_LABELS[value],
  }),
);

export function formatAbstractSession(session: unknown): string {
  if (typeof session === "string" && session in ABSTRACT_SESSION_LABELS) {
    return ABSTRACT_SESSION_LABELS[session as AbstractSession];
  }

  return String(session ?? "");
}

export function formatScientistCategory(category: unknown): string {
  if (
    typeof category === "string" &&
    category in SCIENTIST_CATEGORY_LABELS
  ) {
    return SCIENTIST_CATEGORY_LABELS[category as ScientistCategory];
  }

  return String(category ?? "");
}
