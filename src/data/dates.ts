export interface ImportantDate {
  date: string;
  label: string;
  description: string;
  passed: boolean;
}

export const importantDates: ImportantDate[] = [
  {
    date: "September 30, 2026",
    label: "Abstract Submission",
    description: "Abstract submission deadline",
    passed: false,
  },
  {
    date: "October 31, 2026",
    label: "Registration",
    description: "Registration deadline",
    passed: false,
  },
];
