export const ABSTRACT_TOPIC_VALUES = [
  "crop",
  "livestock",
  "aquaculture",
  "fermented-food",
  "circular-economy",
  "one-health",
  "other",
] as const;

export type AbstractTopic = (typeof ABSTRACT_TOPIC_VALUES)[number];

export const ABSTRACT_TOPIC_LABELS: Record<AbstractTopic, string> = {
  crop: "Crop",
  livestock: "Livestock",
  aquaculture: "Aquaculture",
  "fermented-food": "Fermented Food",
  "circular-economy": "Circular Economy",
  "one-health": "One Health",
  other: "Other",
};

export const ABSTRACT_TOPIC_OPTIONS = ABSTRACT_TOPIC_VALUES.map((value) => ({
  value,
  label: ABSTRACT_TOPIC_LABELS[value],
}));

export const ABSTRACT_SESSION_VALUES = [
  "environmental-protection",
  "circular-economy",
  "sustainable-crop",
  "livestock-production",
  "blue-aquaculture",
  "food-safety",
  "human-health",
  "one-health",
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

export function formatAbstractTopic(topic: unknown): string {
  if (typeof topic === "string" && topic in ABSTRACT_TOPIC_LABELS) {
    return ABSTRACT_TOPIC_LABELS[topic as AbstractTopic];
  }

  return String(topic ?? "");
}

export function formatAbstractSession(session: unknown): string {
  if (typeof session === "string" && session in ABSTRACT_SESSION_LABELS) {
    return ABSTRACT_SESSION_LABELS[session as AbstractSession];
  }

  return formatAbstractTopic(session);
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
