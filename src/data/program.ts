export type ProgramSessionType =
  | "assembly"
  | "break"
  | "ceremony"
  | "keynote"
  | "meal"
  | "registration"
  | "session"
  | "tour"
  | "wrap-up";

export interface ProgramSession {
  time: string;
  title: string;
  description?: string;
  items?: string[];
  type: ProgramSessionType;
}

export interface ProgramDay {
  id: string;
  day: string;
  date: string;
  sessions: ProgramSession[];
}

export const programOverview = {
  theme:
    "Harnessing Microbial Resources: From Single Cells to Microbiomes for a Sustainable Bioeconomy",
  dates: "16 - 18 November, 2026",
  venue: "Legend Westlake Hotel, 1 Yen Phu, Hanoi, Vietnam",
};

export const program: ProgramDay[] = [
  {
    id: "day-1",
    day: "Monday",
    date: "November 16, 2026",
    sessions: [
      {
        time: "8:00 - 9:00",
        title: "Registration",
        type: "registration",
      },
      {
        time: "9:00 - 9:15",
        title: "Opening ceremony",
        type: "ceremony",
        items: [
          "Welcome remarks from the Chair",
          "Welcome remarks from representatives",
        ],
      },
      {
        time: "9:15 - 9:45",
        title:
          "Significance and challenges of microbial resource centers in a changing world",
        description: "Prof. Dr. Jörg Overmann",
        type: "keynote",
      },
      {
        time: "9:45 - 10:15",
        title: "Keynote lecture 2",
        type: "keynote",
      },
      {
        time: "10:15 - 10:45",
        title: "Coffee break & Poster presentation",
        type: "break",
      },
      {
        time: "10:45 - 12:45",
        title: "Session 1",
        type: "session",
        items: [
          "Presentation 1",
          "Presentation 2",
          "Presentation 3",
          "Presentation 4",
          "Presentation 5",
          "Presentation 6",
        ],
      },
      {
        time: "12:45 - 14:00",
        title: "Lunch",
        type: "meal",
      },
      {
        time: "14:00 - 15:30",
        title: "Session 2",
        type: "session",
        items: [
          "Presentation 1",
          "Presentation 2",
          "Presentation 3",
          "Presentation 4",
          "Presentation 5",
          "Presentation 6",
        ],
      },
      {
        time: "15:30 - 16:00",
        title: "Coffee break & Poster presentation",
        type: "break",
      },
      {
        time: "16:00 - 17:30",
        title: "Session 3",
        type: "session",
        items: [
          "Presentation 1",
          "Presentation 2",
          "Presentation 3",
          "Presentation 4",
          "Presentation 5",
          "Presentation 6",
        ],
      },
      {
        time: "17:30 - 19:00",
        title: "Break",
        type: "break",
      },
      {
        time: "19:00 - 21:00",
        title: "Dinner",
        type: "meal",
      },
    ],
  },
  {
    id: "day-2",
    day: "Tuesday",
    date: "November 17, 2026",
    sessions: [
      {
        time: "8:30 - 12:30",
        title: "General Assembly of ACM23, T/F Report",
        type: "assembly",
      },
      {
        time: "12:30 - 13:30",
        title: "Lunch",
        type: "meal",
      },
      {
        time: "13:30 - 15:00",
        title: "Session 4",
        type: "session",
        items: [
          "Presentation 1",
          "Presentation 2",
          "Presentation 3",
          "Presentation 4",
          "Presentation 5",
          "Presentation 6",
        ],
      },
      {
        time: "15:00 - 15:30",
        title: "Coffee break & Poster presentation",
        type: "break",
      },
      {
        time: "15:30 - 17:00",
        title: "Session 5",
        type: "session",
        items: [
          "Presentation 1",
          "Presentation 2",
          "Presentation 3",
          "Presentation 4",
          "Presentation 5",
          "Presentation 6",
        ],
      },
      {
        time: "17:00 - 17:30",
        title: "Wrap-up",
        type: "wrap-up",
      },
    ],
  },
  {
    id: "day-3",
    day: "Wednesday",
    date: "November 18, 2026",
    sessions: [
      {
        time: "9:00 - 17:00",
        title: "Tours",
        description:
          "Tours to new campus of Vietnam National University, Hanoi and Vietnam National Village for Ethnic Culture and Tourism.",
        type: "tour",
      },
    ],
  },
];
