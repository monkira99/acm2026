export interface CommitteeMember {
  name: string;
  titleLines: string[];
  affiliation?: string;
  image?: string;
}

export interface Committee {
  name: string;
  description: string;
  members: CommitteeMember[];
}

export const committees: Committee[] = [
  {
    name: "Scientific Committee",
    description:
      "Scientific leaders supporting ACM23's program direction and technical review.",
    members: [
      {
        name: "Ms. FUNABIKI Rie",
        titleLines: ["Senior Chief, CBD Administration Division"],
        affiliation:
          "Biological Resource Center (NBRC), National Institute of Technology and Evaluation (NITE)",
        image: "/images/committees/MS_FUNABIKI_RIE.jpeg",
      },
      {
        name: "Dr. Hailei Wei",
        titleLines: [
          "Director"
        ],
        affiliation:
          "Agricultural Culture Collection of China, Institute of Agricultural Resources and Regional Planning, Chinese Academy of Agricultural Sciences\nNational Microbial Resource Center",
        image: "/images/committees/DR_HAILEI_WEI.png",
      },
      {
        name: "Dr. Ju Huck Lee",
        titleLines: ["Director"],
        affiliation: "Korean Collection for Type Cultures (KCTC)",
        image: "/images/committees/DR_JU_HUCK_LEE.png",
      },
      {
        name: "Dr. KINOSHITA Hiroshi",
        titleLines: [
          "Director for Biodiversity Policy Planning and Coordination/Bio-manufacturing Planning and Coordination",
        ],
        affiliation:
          "Biological Resource Center (NBRC), National Institute of Technology and Evaluation (NITE)",
        image: "/images/committees/DR_KINOSHITA_HIROSHI.png",
      },
    ],
  },
  {
    name: "Organizing Committee",
    description: "Organizing committee members will be announced later.",
    members: [
      { name: "TBA", titleLines: ["To be announced"] },
      { name: "TBA", titleLines: ["To be announced"] },
      { name: "TBA", titleLines: ["To be announced"] },
    ],
  },
];
