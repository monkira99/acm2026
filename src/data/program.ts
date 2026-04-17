export interface ProgramSession {
  id: string;
  day: string;
  date: string;
  sessions: {
    time: string;
    title: string;
    description: string;
    type: "keynote" | "session" | "workshop" | "break" | "social";
  }[];
}

export const program: ProgramSession[] = [
  {
    id: "day-1",
    day: "Day 1",
    date: "November 16, 2026",
    sessions: [],
  },
  {
    id: "day-2",
    day: "Day 2",
    date: "November 17, 2026",
    sessions: [],
  },
];
