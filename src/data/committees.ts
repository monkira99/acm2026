export interface CommitteeMember {
  name: string;
  affiliation: string;
}

export interface Committee {
  name: string;
  members: CommitteeMember[];
}

export const committees: Committee[] = [
  {
    name: "Scientific Committee",
    members: [
      { name: "TBA", affiliation: "To be update" },
      { name: "TBA", affiliation: "To be update" },
      { name: "TBA", affiliation: "To be update" },
    ],
  },
  {
    name: "Organizing Committee",
    members: [
      { name: "TBA", affiliation: "To be update" },
      { name: "TBA", affiliation: "To be update" },
      { name: "TBA", affiliation: "To be update" },
    ],
  },
];
