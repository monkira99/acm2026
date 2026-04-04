export interface ImportantDate {
  date: string;
  label: string;
  description: string;
  passed: boolean;
}

export const importantDates: ImportantDate[] = [
  { date: "March 1, 2026", label: "Registration Opens", description: "Online registration system opens", passed: true },
  { date: "March 1, 2026", label: "Abstract Submission Opens", description: "Submit your research abstract", passed: true },
  { date: "July 15, 2026", label: "Abstract Submission Deadline", description: "Last day to submit abstracts", passed: false },
  { date: "August 15, 2026", label: "Acceptance Notification", description: "Authors notified of acceptance", passed: false },
  { date: "August 31, 2026", label: "Early Bird Registration Deadline", description: "Register at reduced rate", passed: false },
  { date: "September 30, 2026", label: "Registration Deadline", description: "Last day to register", passed: false },
  { date: "October 15-16, 2026", label: "ACM23 Conference", description: "The 23rd Annual Meeting in Hanoi", passed: false },
];
