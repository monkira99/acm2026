export type ProgramSessionType =
  | "assembly"
  | "break"
  | "ceremony"
  | "meal"
  | "registration"
  | "session"
  | "tour"
  | "wrap-up";

interface ProgramTalk {
  time: string;
  title: string | (string | { scientificName: string })[];
  speaker: string;
  affiliation: string;
  keynote?: "Invited keynote" | "Selected keynote";
}

export interface ProgramSession {
  time: string;
  title: string;
  description?: string;
  details?: string[];
  chairs?: string[];
  talks?: ProgramTalk[];
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
    "id": "day-1",
    "day": "Monday",
    "date": "November 16, 2026",
    "sessions": [
      {
        "time": "7:30 - 8:30",
        "title": "Registration & Poster installation",
        "type": "registration"
      },
      {
        "time": "8:30 - 8:45",
        "title": "Opening ceremony",
        "details": [
          "Welcome remarks from the Chair",
          "Welcome remarks from VNU and ACM representatives"
        ],
        "type": "ceremony"
      },
      {
        "time": "8:45 - 10:05",
        "title": "Session 1: Microbial Culture Collection in Circular Bioeconomy and AI Era",
        "chairs": ["Dr. Trinh Thanh Trung"],
        "type": "session",
        "talks": [
          {
            "time": "8:45 - 9:15",
            "title": "Significance and challenges of microbial resource centers in a changing world",
            "speaker": "Prof. Dr. Jörg Overmann",
            "affiliation": "Bavarian State Collections of Natural History; Molecular Biodiversity Research, University of Munich, Germany",
            "keynote": "Invited keynote"
          },
          {
            "time": "9:15 - 9:40",
            "title": "Innovative Utilization of Microbial Data Resources in the AI Era",
            "speaker": "Prof. Dr. Juncai Ma",
            "affiliation": "Chinese Academy of Sciences, Beijing, China",
            "keynote": "Selected keynote"
          },
          {
            "time": "9:40 - 10:05",
            "title": "Building Nagoya protocol partnerships that help provider countries unlock value from microbial biodiversity in the AI economy",
            "speaker": "Dr. Donald Pan",
            "affiliation": "Basecamp Research, London, United Kingdom",
            "keynote": "Selected keynote"
          }
        ]
      },
      {
        "time": "10:05 - 10:30",
        "title": "Coffee break & Poster presentation",
        "type": "break"
      },
      {
        "time": "10:30 - 12:25",
        "title": "Session 2: Microbial Culture Collection in Circular Bioeconomy and AI Era",
        "chairs": ["Dr. Hsiu-Jung Lo"],
        "type": "session",
        "talks": [
          {
            "time": "10:30 - 10:50",
            "title": "From the culture collection to the cell factory",
            "speaker": "Dr. Yajing Yu",
            "affiliation": "China General Microbiological Culture Collection Center (CGMCC), Beijing, China"
          },
          {
            "time": "10:50 - 11:10",
            "title": "iMAPS: building a global network of microbiome metabolic observatories and strainbanks @ single-cell via high-throughput RACS-culture",
            "speaker": "Dr. Jian Xu",
            "affiliation": "Single-Cell Center, Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT), Chinese Academy of Sciences, Qingdao, China"
          },
          {
            "time": "11:10 - 11:30",
            "title": "From conservation to valorization: KCTC fungal resources as a platform for bio-ppcycling and a sustainable bioeconomy",
            "speaker": "Dr. Mi Kyung Lee",
            "affiliation": "Korean Collection for Type Cultures (KCTC), Biological Resource Center, Korea Research Institute of Bioscience and Biotechnology (KRIBB), Korea"
          },
          {
            "time": "11:30 - 11:50",
            "title": "A platform for sharing and efficient utilization of engineered microorganism resources",
            "speaker": "Dr. Zhang Xiaojun",
            "affiliation": "Engineering Microorganism and Genetic Tools Collection Center, Ministry of Education, Shanghai, China"
          },
          {
            "time": "11:50 - 12:10",
            "title": "Minifying space for keeping biosafety level 2 (RG-2) microbes",
            "speaker": "Dr. Hsiu-Jung Lo",
            "affiliation": "Taiwan Mycology Reference Center, National Infectious Diseases Bank, National Institute of Infectious Diseases and Vaccinology, National Health Research Institutes, Miaoli County, Chinese Taipei"
          },
          {
            "time": "12:10 - 12:25",
            "title": [
              "Induction of sporangiospores for long-term preservation of ",
              { "scientificName": "Syzygites megalocarpus" },
              " (Mucoromycetes): insights from transcriptome analysis."
            ],
            "speaker": "Dr. C. Moriya",
            "affiliation": "Biological Resource Center, National Institute of Technology and Evaluation, Japan"
          }
        ]
      },
      {
        "time": "12:25 - 13:30",
        "title": "Lunch",
        "type": "meal"
      },
      {
        "time": "13:30 - 15:30",
        "title": "Session 3: Agricultural Microbes for Sustainable Crop Production",
        "chairs": ["Dr. Seung Beom Hong", "Dr. Hailei Wei"],
        "type": "session",
        "talks": [
          {
            "time": "13:30 - 13:55",
            "title": "The neglected foundation: why true One Health demands soil health focus",
            "speaker": "Dr. Didier Lesueur",
            "affiliation": "School of Life and Environmental Sciences, Faculty of Science, Engineering and Built Environment, Deakin University, Melbourne, Australia; Senior Soil Microbiologist at CIRAD, UMR Eco&Sols, Montpellier, France; Associate Senior Researcher at the Centro Internacional de Agricultura Tropical (CIAT), Hanoi, Vietnam",
            "keynote": "Selected keynote"
          },
          {
            "time": "13:55 - 14:20",
            "title": "From microbiome biobanking to agricultural innovation: Conserving and translating microbial resources for a sustainable bioeconomy",
            "speaker": "Dr. Joseph Mulema",
            "affiliation": "CAB International (CABI), Nairobi, Kenya",
            "keynote": "Selected keynote"
          },
          {
            "time": "14:20 - 14:40",
            "title": [
              "Metabolites from ",
              { "scientificName": "Streptomyces" },
              " spp. as potential biostimulants for use in agriculture"
            ],
            "speaker": "Dr. Hillol Chakdar",
            "affiliation": "National Agriculturally Important Microbial Culture Collection (NAIMCC), ICAR-National Bureau of Agriculturally Important Microorganisms (NBAIM), Mau, Uttar Pradesh, India"
          },
          {
            "time": "14:40 - 15:00",
            "title": "Infrastructure for the conservation and utilization of microbial resources in China",
            "speaker": "Dr. Hai-Lei Wei",
            "affiliation": "Agricultural Culture collection of China, Chinese Academy of Agricultural Sciences, Beijing China"
          },
          {
            "time": "15:00 - 15:15",
            "title": "From discovery to deployment: beneficial microbes for crop growth, stress resilience, and disease control in Korea",
            "speaker": "Dr. Sieun Kim",
            "affiliation": "Division of Agricultural Microbiology, National Institute of Agricultural Science, Rural Development Administration, Wanju, Korea"
          },
          {
            "time": "15:15 - 15:30",
            "title": [
              "Microbes for sustainable agriculture: Plant growth promotion and genomic characterization of ",
              { "scientificName": "Enterobacter roggenkampii" },
              " B1-01 and ",
              { "scientificName": "Leclercia barmai" },
              " B1-02"
            ],
            "speaker": "Camille Andrea Flores",
            "affiliation": "Natural Sciences Research Institute, University of the Philippines Diliman, Quezon City, Philippines"
          }
        ]
      },
      {
        "time": "15:30 - 16:00",
        "title": "Coffee break & Poster presentation",
        "type": "break"
      },
      {
        "time": "16:00 - 17:35",
        "title": "Session 4: Microbiome-based strategies for plant and animal health",
        "chairs": ["Dr. Kinoshita Hiroshi", "Assoc. Prof. Dr. Dinh Thuy Hang"],
        "type": "session",
        "talks": [
          {
            "time": "16:00 - 16:20",
            "title": [
              "Bacterial resources for antivirulence drug discovery: Endophytic bacterial communities of ",
              { "scientificName": "Panax vietnamensis" },
              " and their interaction with the host plant in the production of bioactive compounds"
            ],
            "speaker": "Prof. Dr. Sebastian Günther",
            "affiliation": "Department of Pharmaceutical Biology, Institute of Pharmacy, University of Greifswald, Greifswald, Germany"
          },
          {
            "time": "16:20 - 16:40",
            "title": "Rice microbiome in biocontrolling the bacterial leaf blight (BLB) diseases",
            "speaker": "Prof. Dr. Dinh Thuy Hang",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "16:40 - 17:05",
            "title": "Cross-kingdom interactions enhance key-member establishment and disease suppression in a designed synthetic microbial community",
            "speaker": "Dr. Haoqing Zhang",
            "affiliation": "State Key Laboratory for Quality and Safety of Agro-Products, Key Laboratory of Biotechnology in Plant Protection of MARA, Zhejiang Key Laboratory of Green Plant Protection, Institute of Plant Virology, Ningbo University, China"
          },
          {
            "time": "17:05 - 17:20",
            "title": "Potential application of representative strains of predominant species in shrimp gut as indigenous probiotics for sustainable aquaculture",
            "speaker": "Chau Bao Nguyen",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "17:20 - 17:35",
            "title": "Can metagenomics streamline selection of promising microbial candidates for shrimp probiotics?",
            "speaker": "Ha Viet Nguyen",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          }
        ]
      },
      {
        "time": "17:35 - 19:00",
        "title": "Break",
        "type": "break"
      },
      {
        "time": "19:00 - 21:00",
        "title": "Dinner",
        "type": "meal"
      }
    ]
  },
  {
    "id": "day-2",
    "day": "Tuesday",
    "date": "November 17, 2026",
    "sessions": [
      {
        "time": "8:30 - 9:45",
        "title": "T/F Report",
        "type": "assembly"
      },
      {
        "time": "9:45 - 09:55",
        "title": "Short Break",
        "type": "break"
      },
      {
        "time": "9:55 - 11:20",
        "title": "General Assembly of ACM23",
        "type": "assembly"
      },
      {
        "time": "11:20 - 11:30",
        "title": "Short Break",
        "type": "break"
      },
      {
        "time": "11:30 - 12:30",
        "title": "ACM Member Report (3 minutes for each organization’s poster)",
        "type": "assembly"
      },
      {
        "time": "12:30 - 13:30",
        "title": "Lunch",
        "type": "meal"
      },
      {
        "time": "13:30 - 15:00",
        "title": "Session 5: Flash talks (3 - 5 minutes for research finding posters)",
        "type": "session"
      },
      {
        "time": "15:00 - 15:30",
        "title": "Coffee break & Poster presentation",
        "type": "break"
      },
      {
        "time": "15:30 - 17:30",
        "title": "Session 6: Microbes for human health and safe foods",
        "chairs": ["Dr. Ju Huck Lee", "Prof. Dr. Zunita Zakaria"],
        "type": "session",
        "talks": [
          {
            "time": "15:30 - 15:50",
            "title": "From indigenous probiotic resources to gut microbiomes: Development and functional evaluation of multi-strain probiotics",
            "speaker": "Dr. Hoang Van Vinh",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "15:50 - 16:20",
            "title": [
              "From microbial bioactive molecules to neuroprotection: Exploring β-amyloid modulation by biomolecules from ",
              { "scientificName": "Rhodotorula paludigena" }
            ],
            "speaker": "Mark Kevin Devanadera",
            "affiliation": "Department of Biochemistry, Faculty of Pharmacy, University of Santo Tomas, Manila, Philippines"
          },
          {
            "time": "16:20 - 16:35",
            "title": "Integrated culture-based and 16S rRNA gene profiling of Vietnamese maternal and neonatal microbiota",
            "speaker": "Dr. Thi Ly Do",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "16:35 - 16:55",
            "title": "From Korea’s signature fermented food to health-promoting bioresources: Functional lactic acid bacteria portfolio for next-generation health applications",
            "speaker": "Dr. Misun Yun",
            "affiliation": "Industrial Innovation Research Division, Kimchiome Bio-Resources Research Group, World Institute of Kimchi, Gwangju, Republic of Korea"
          },
          {
            "time": "16:55 - 17:15",
            "title": "Lactic acid bacteria: From fundamental research to applications in traditional fermented meats in Vietnam",
            "speaker": "Dr. Hoang Thi Lan Anh",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "17:15 - 17:30",
            "title": [
              { "scientificName": "Chlorella sorokiniana" },
              " derived ZnO nanoparticles for Pb(II) sequestration: Interfacial adsorption behavior, thermodynamics, and regeneration study"
            ],
            "speaker": "Manish Sutradhar",
            "affiliation": "Department of Earth and Environmental Sciences, National Chung Cheng University, Min-Hsiung, Chiayi County, Chinese Taipei"
          }
        ]
      },
      {
        "time": "17:30 - 18:00",
        "title": "Wrap-up",
        "type": "wrap-up"
      }
    ]
  },
  {
    "id": "day-3",
    "day": "Wednesday",
    "date": "November 18, 2026",
    "sessions": [
      {
        "time": "8:00 - 17:00",
        "title": "Tours",
        "description": "Tours to new campus of Vietnam National University, Hanoi and Vietnam National Village for Ethnic Culture and Tourism",
        "type": "tour"
      }
    ]
  }
];
