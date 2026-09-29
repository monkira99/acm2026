export interface ImportantDate {
  date: string;
  label: string;
  description: string;
  /** Closing instant (ISO, Hanoi time). Submissions after it are rejected. */
  deadline: string;
}

export const importantDates: ImportantDate[] = [
  {
    date: "September 30, 2026",
    label: "Abstract Submission",
    description: "Abstract submission deadline",
    deadline: "2026-09-30T23:59:59+07:00",
  },
  {
    date: "October 31, 2026",
    label: "Registration",
    description: "Registration deadline",
    deadline: "2026-10-31T23:59:59+07:00",
  },
];
