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

export function formatAbstractTopic(topic: unknown): string {
  if (typeof topic === "string" && topic in ABSTRACT_TOPIC_LABELS) {
    return ABSTRACT_TOPIC_LABELS[topic as AbstractTopic];
  }

  return String(topic ?? "");
}
