export interface CommitteeMember {
  name: string;
  affiliation: string;
  country: string;
  role?: string;
}

export interface Committee {
  name: string;
  members: CommitteeMember[];
}

export const committees: Committee[] = [
  {
    name: "Organizing Committee",
    members: [
      { name: "TBA", affiliation: "To be announced", country: "Vietnam", role: "Chair" },
      { name: "TBA", affiliation: "To be announced", country: "Vietnam", role: "Co-Chair" },
      { name: "TBA", affiliation: "To be announced", country: "Japan", role: "Secretary" },
    ],
  },
  {
    name: "Scientific Committee",
    members: [
      { name: "TBA", affiliation: "To be announced", country: "Japan" },
      { name: "TBA", affiliation: "To be announced", country: "Korea" },
      { name: "TBA", affiliation: "To be announced", country: "China" },
      { name: "TBA", affiliation: "To be announced", country: "Thailand" },
      { name: "TBA", affiliation: "To be announced", country: "Vietnam" },
    ],
  },
  {
    name: "Local Organizing Committee",
    members: [
      { name: "TBA", affiliation: "To be announced", country: "Vietnam" },
      { name: "TBA", affiliation: "To be announced", country: "Vietnam" },
    ],
  },
];
