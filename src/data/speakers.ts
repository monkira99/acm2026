export interface Speaker {
  id: string;
  name: string;
  /** Affiliation / position lines, shown as a list. */
  positions: string[];
  talkTitle: string;
  /** Optional talk abstract or speaker bio. */
  bio?: string;
  /** Optional headshot; falls back to a placeholder when absent. */
  imageUrl?: string;
}

export const speakers: Speaker[] = [
  {
    id: "speaker-1",
    name: "Jörg Overmann",
    positions: [
      "Director General, Bavarian State Collections of Natural History, Germany",
      "Chair for Molecular Biodiversity Research, Ludwig-Maximilians Universität München",
    ],
    talkTitle:
      "Significance and challenges of microbial resource centers in a changing world",
    imageUrl:
      "/images/speakers/Overmann_01_26_Hagemann_081_Detail_Ausschnitt.jpg",
  },
  {
    id: "speaker-2",
    name: "To be announced",
    positions: ["Speaker details will be announced soon."],
    talkTitle: "Keynote lecture 2",
  },
];
