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
    name: "Scientific committee",
    description:
      "Scientific leaders supporting ACM23's program direction and technical review.",
    members: [
      {
        name: "Ms. Funabiki Rie",
        titleLines: [""],
        affiliation:
          "Senior Chief, CBD Administration Division of Biological Resource Center (NBRC), National Institute of Technology and Evaluation (NITE)",
        image: "/images/committees/MS_FUNABIKI_RIE.jpeg",
      },
      {
        name: "Dr. Hailei Wei",
        titleLines: [
          "Director"
        ],
        affiliation:
          "Director of Agricultural Culture Collection of China, Institute of Agricultural Resources and Regional Planning, Chinese Academy of Agricultural Sciences\nDirector of National Microbial Resource Center",
        image: "/images/committees/DR_HAILEI_WEI.png",
      },
      {
        name: "Dr. Hsiu-Jung Lo",
        titleLines: [
          "Director for Biodiversity Policy Planning and Coordination/Bio-manufacturing Planning and Coordination",
        ],
        affiliation:
          "Director of The Institute of Bioscience, Universiti Putra Malaysia",
        image: "/images/committees/DR_HSIU_JUNG_LO.png",
      },
      {
        name: "Dr. Ju Huck Lee",
        titleLines: ["Director"],
        affiliation: "Director of Korean Collection for Type Cultures (KCTC)",
        image: "/images/committees/DR_JU_HUCK_LEE.png",
      },
      {
        name: "Dr. Kinoshita Hiroshi",
        titleLines: [
          "Director for Biodiversity Policy Planning and Coordination/Bio-manufacturing Planning and Coordination",
        ],
        affiliation:
          "Director for Biodiversity Policy Planning and Coordination / Bio-manufacturing Planning and Coordination of Biological Resource Center (NBRC), National Institute of Technology and Evaluation (NITE)",
        image: "/images/committees/DR_KINOSHITA_HIROSHI.png",
      },
      {
        name: "Prof. Dr. Zunita Zakaria",
        titleLines: [
          "Director for Biodiversity Policy Planning and Coordination/Bio-manufacturing Planning and Coordination",
        ],
        affiliation:
          "Director of The Institute of Bioscience, Universiti Putra Malaysia",
        image: "/images/committees/PROFESSOR_DR_ ZUNITA_ZAKARIA.png",
      },
    ],
  },
  {
    name: "Organizing committee",
    description: "ACM23 organizing committee members.",
    members: [
      { name: "Dr. Trinh Thanh Trung", titleLines: [] },
      { name: "Assoc. Prof. Dr. Dinh Thuy Hang", titleLines: [] },
      { name: "Assoc. Prof. Dr. Vo Thuong Lan", titleLines: [] },
      { name: "Dr. Hoang Thi Lan Anh", titleLines: [] },
      { name: "Dr. Hoang Van Vinh", titleLines: [] },
      { name: "Dr. Nguyen Thi Hai", titleLines: [] },
      { name: "Dr. Pham Thi Thuy Van", titleLines: [] },
      { name: "Dr. Do Thi Ly", titleLines: [] },
      { name: "Dr. Le Thi Hoa", titleLines: [] },
      { name: "Dr. Nguyen Thi Tinh", titleLines: [] },
      { name: "MSc. Bui Nguyen Hai Linh", titleLines: [] },
      { name: "MSc. Nguyen Viet Ha", titleLines: [] },
      { name: "MSc. Doan Thi Nhung", titleLines: [] },
    ],
  },
];
