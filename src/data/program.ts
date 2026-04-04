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
    date: "October 15, 2026",
    sessions: [
      { time: "08:30 - 09:00", title: "Registration & Welcome Coffee", description: "", type: "break" },
      { time: "09:00 - 09:30", title: "Opening Ceremony", description: "Welcome address by organizers", type: "session" },
      { time: "09:30 - 10:30", title: "Keynote Lecture 1", description: "To be announced", type: "keynote" },
      { time: "10:30 - 11:00", title: "Coffee Break", description: "", type: "break" },
      { time: "11:00 - 12:30", title: "Scientific Session 1: Microbial Diversity", description: "Oral presentations", type: "session" },
      { time: "12:30 - 14:00", title: "Lunch", description: "", type: "break" },
      { time: "14:00 - 15:30", title: "Scientific Session 2: Conservation Strategies", description: "Oral presentations", type: "session" },
      { time: "15:30 - 16:00", title: "Coffee Break", description: "", type: "break" },
      { time: "16:00 - 17:30", title: "Poster Session", description: "Poster presentations and networking", type: "session" },
      { time: "18:30 - 21:00", title: "Welcome Dinner", description: "Traditional Vietnamese cuisine", type: "social" },
    ],
  },
  {
    id: "day-2",
    day: "Day 2",
    date: "October 16, 2026",
    sessions: [
      { time: "09:00 - 10:00", title: "Keynote Lecture 2", description: "To be announced", type: "keynote" },
      { time: "10:00 - 10:30", title: "Coffee Break", description: "", type: "break" },
      { time: "10:30 - 12:00", title: "Scientific Session 3: Biotechnology Applications", description: "Oral presentations", type: "session" },
      { time: "12:00 - 13:30", title: "Lunch", description: "", type: "break" },
      { time: "13:30 - 15:00", title: "Workshop: Culture Collection Management", description: "Hands-on workshop", type: "workshop" },
      { time: "15:00 - 15:30", title: "Coffee Break", description: "", type: "break" },
      { time: "15:30 - 17:00", title: "ACM Business Meeting", description: "Members only", type: "session" },
      { time: "17:00 - 17:30", title: "Closing Ceremony & Awards", description: "Best poster award, closing remarks", type: "session" },
    ],
  },
];
