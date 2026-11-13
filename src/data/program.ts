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
  time?: string;
  duration?: string;
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
  events?: { time: string; title: string }[];
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
  dates: "November 16 - 18, 2026",
  venue: "Legend Westlake Hotel, Yen Phu 1, Hanoi, Vietnam",
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
          "Welcome remarks by the Chair",
          "Welcome remarks by the VNU representative",
          "Welcome remarks by the ACM representative"
        ],
        "type": "ceremony"
      },
      {
        "time": "8:45 - 10:05",
        "title": "Session 1: Microbial Culture Collection in Circular Bioeconomy and AI Era",
        "chairs": ["Dr. Trinh Thanh Trung", "Dr. Hsiu-Jung Lo"],
        "type": "session",
        "talks": [
          {
            "time": "8:45 - 9:15",
            "duration": "30 min",
            "title": "Significance and challenges of microbial resource centers in a changing world",
            "speaker": "Prof. Dr. Jörg Overmann",
            "affiliation": "Bavarian State Collections of Natural History; Molecular Biodiversity Research, University of Munich, Germany",
            "keynote": "Invited keynote"
          },
          {
            "time": "9:15 - 9:40",
            "duration": "25 min",
            "title": "Innovative Utilization of Microbial Data Resources in the AI Era",
            "speaker": "Prof. Dr. Juncai Ma",
            "affiliation": "World Data Centre for Microorganisms, Institute of Microbiology, Chinese Academy of Sciences, China",
            "keynote": "Selected keynote"
          },
          {
            "time": "9:40 - 10:05",
            "duration": "25 min",
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
        "chairs": ["Dr. Chatrudee Suwannachart", "Dr. Gina R. Dedeles"],
        "type": "session",
        "talks": [
          {
            "time": "10:30 - 10:50",
            "duration": "20 min",
            "title": "From the culture collection to the cell factory",
            "speaker": "Dr. Yajing Yu",
            "affiliation": "China General Microbiological Culture Collection Center (CGMCC), Beijing, China"
          },
          {
            "time": "10:50 - 11:10",
            "duration": "20 min",
            "title": "iMAPS: building a global network of microbiome metabolic observatories and strainbanks @ single-cell via high-throughput RACS-culture",
            "speaker": "Dr. Jian Xu",
            "affiliation": "Single-Cell Center, Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT), Chinese Academy of Sciences, Qingdao, China"
          },
          {
            "time": "11:10 - 11:30",
            "duration": "20 min",
            "title": "From conservation to valorization: KCTC fungal resources as a platform for bio-upcycling and a sustainable bioeconomy",
            "speaker": "Dr. Mi Kyung Lee",
            "affiliation": "Korean Collection for Type Cultures (KCTC), Biological Resource Center, Korea Research Institute of Bioscience and Biotechnology (KRIBB), Korea"
          },
          {
            "time": "11:30 - 11:50",
            "duration": "20 min",
            "title": "A platform for sharing and efficient utilization of engineered microorganism resources",
            "speaker": "Dr. Zhang Xiaojun",
            "affiliation": "Engineering Microorganism and Genetic Tools Collection Center, Ministry of Education, Shanghai, China"
          },
          {
            "time": "11:50 - 12:10",
            "duration": "20 min",
            "title": "Minifying space for keeping biosafety level 2 (RG-2) microbes",
            "speaker": "Dr. Hsiu-Jung Lo",
            "affiliation": "Taiwan Mycology Reference Center, National Infectious Diseases Bank, National Institute of Infectious Diseases and Vaccinology, National Health Research Institutes, Miaoli County, Chinese Taipei"
          },
          {
            "time": "12:10 - 12:25",
            "duration": "15 min",
            "title": [
              "Induction of sporangiospores for long-term preservation of ",
              { "scientificName": "Syzygites megalocarpus" },
              " (Mucoromycetes): insights from transcriptome analysis."
            ],
            "speaker": "Dr. Chise Moriya",
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
            "duration": "25 min",
            "title": "The neglected foundation: why true One Health demands soil health focus",
            "speaker": "Dr. Didier Lesueur",
            "affiliation": "School of Life and Environmental Sciences, Faculty of Science, Engineering and Built Environment, Deakin University, Melbourne, Australia; Senior Soil Microbiologist at CIRAD, UMR Eco&Sols, Montpellier, France; Associate Senior Researcher at the Centro Internacional de Agricultura Tropical (CIAT), Hanoi, Vietnam",
            "keynote": "Selected keynote"
          },
          {
            "time": "13:55 - 14:20",
            "duration": "25 min",
            "title": "From microbiome biobanking to agricultural innovation: Conserving and translating microbial resources for a sustainable bioeconomy",
            "speaker": "Dr. Joseph Mulema",
            "affiliation": "CAB International (CABI), Nairobi, Kenya",
            "keynote": "Selected keynote"
          },
          {
            "time": "14:20 - 14:40",
            "duration": "20 min",
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
            "duration": "20 min",
            "title": "Infrastructure for the conservation and utilization of microbial resources in China",
            "speaker": "Dr. Hai-Lei Wei",
            "affiliation": "Agricultural Culture collection of China, Chinese Academy of Agricultural Sciences, Beijing China"
          },
          {
            "time": "15:00 - 15:15",
            "duration": "15 min",
            "title": "From discovery to deployment: beneficial microbes for crop growth, stress resilience, and disease control in Korea",
            "speaker": "Dr. Sieun Kim",
            "affiliation": "Division of Agricultural Microbiology, National Institute of Agricultural Science, Rural Development Administration, Wanju, Korea"
          },
          {
            "time": "15:15 - 15:30",
            "duration": "15 min",
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
        "time": "16:00 - 17:25",
        "title": "Session 4: Microbiome-based Strategies for Plant and Animal Health",
        "chairs": ["Dr. Kinoshita Hiroshi", "Assoc. Prof. Dr. Dinh Thuy Hang"],
        "type": "session",
        "talks": [
          {
            "time": "16:00 - 16:20",
            "duration": "20 min",
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
            "duration": "20 min",
            "title": "Rice microbiome in controlling the bacterial leaf blight (BLB) diseases",
            "speaker": "Prof. Dr. Dinh Thuy Hang",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "16:40 - 16:55",
            "duration": "15 min",
            "title": "Cross-kingdom interactions enhance key-member establishment and disease suppression in a designed synthetic microbial community",
            "speaker": "Dr. Haoqing Zhang",
            "affiliation": "State Key Laboratory for Quality and Safety of Agro-Products, Key Laboratory of Biotechnology in Plant Protection of MARA, Zhejiang Key Laboratory of Green Plant Protection, Institute of Plant Virology, Ningbo University, China"
          },
          {
            "time": "16:55 - 17:10",
            "duration": "15 min",
            "title": "Potential application of representative strains of predominant species in shrimp gut as indigenous probiotics for sustainable aquaculture",
            "speaker": "Chau Bao Nguyen",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "17:10 - 17:25",
            "duration": "15 min",
            "title": "Can metagenomics streamline selection of promising microbial candidates for shrimp probiotics?",
            "speaker": "Ha Viet Nguyen",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          }
        ]
      },
      {
        "time": "17:25 - 19:00",
        "title": "Break",
        "type": "break"
      },
      {
        "time": "19:00 - 21:00",
        "title": "Gala Dinner at the Victoria Room, 2nd Floor, The Hanoi Club Hotel & Residences, 76 Yen Phu Street, Tay Ho Ward, Hanoi",
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
        "time": "8:30 - 12:30",
        "title": "Session 5: Task Force Reports and General Assembly",
        "chairs": ["Dr. Trinh Thanh Trung", "Ms. Funabiki Rie"],
        "type": "assembly",
        "events": [
          { "time": "8:30 - 9:45", "title": "T/F Report" },
          { "time": "9:45 - 09:55", "title": "Short Break" },
          { "time": "9:55 - 11:20", "title": "General Assembly of ACM23" },
          { "time": "11:20 - 11:30", "title": "Short Break" },
          { "time": "11:30 - 12:30", "title": "ACM Member Report (3 minutes for each organization’s poster)" }
        ]
      },
      {
        "time": "12:30 - 14:00",
        "title": "Lunch",
        "type": "meal"
      },
      {
        "time": "14:00 - 14:30",
        "title": "Session 6: Flash Talks (3 - 5 minutes for research finding posters)",
        "chairs": ["Dr. Hoang Thi Lan Anh", "Dr. Trinh Thanh Trung"],
        "type": "session",
        "talks": [
          {
            "title": [
              "Characterization of the soil bacterial community associated with ",
              { "scientificName": "Rafflesia consueloae" },
              " and its ",
              { "scientificName": "Tetrastigma" },
              " sp. Host"
            ],
            "speaker": "Cedrick Verdejo Alguzar",
            "affiliation": "Microbiological Research and Services Laboratory, Natural Sciences Research Institute, University of the Philippines Diliman, Quezon City 1101"
          },
          {
            "title": "Unveiling the MICP potential of Actinomycetes from Caramoan cave speleothems in Camarines Sur, Philippines",
            "speaker": "Catherine Joyce Orate",
            "affiliation": "Microbiological Research and Services Laboratory, Natural Sciences Research Institute, Miranda Hall, Quirino corner P. Velasquez St., University of the Philippines - Diliman, Quezon City"
          },
          {
            "title": "Dynamics of rice microbiomes reveal core vertically transmitted seed endophytes",
            "speaker": "Dr. Ma Yinan",
            "affiliation": "National Key Laboratory of Agricultural Microbiology and Key Laboratory of Agricultural Microbiome (MARA), Biotechnology Research Institute, Chinese Academy of Agricultural Sciences, Beijing 100081, China"
          },
          {
            "title": "Diversity and functional potential of paddy soil microbial resources along an elevation gradient in Yunnan and Guangxi, China",
            "speaker": "Dr. Zhiyong Ruan",
            "affiliation": "State Key Laboratory of Efficient Utilization of Arable Land in China/CAAS-CIAT Joint Laboratory in Advanced Technologies for Sustainable Agriculture, Institute of Agricultural Resources and Regional Planning, Chinese Academy of Agricultural Sciences, Beijing, China"
          }
        ]
      },
      {
        "time": "14:30 - 15:00",
        "title": "Coffee break & Poster presentation",
        "type": "break"
      },
      {
        "time": "15:00 - 16:50",
        "title": "Session 7: Microbes for Human Health and Safe Foods",
        "chairs": ["Dr. Ju Huck Lee", "Prof. Dr. Zunita Zakaria"],
        "type": "session",
        "talks": [
          {
            "time": "15:00 - 15:20",
            "duration": "20 min",
            "title": "From indigenous probiotic resources to gut microbiomes: Development and functional evaluation of multi-strain probiotics",
            "speaker": "Dr. Hoang Van Vinh",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "15:20 - 15:40",
            "duration": "20 min",
            "title": [
              "From microbial bioactive molecules to neuroprotection: Exploring β-amyloid modulation by biomolecules from ",
              { "scientificName": "Rhodotorula paludigena" }
            ],
            "speaker": "Mark Kevin Devanadera",
            "affiliation": "Department of Biochemistry, Faculty of Pharmacy, University of Santo Tomas, Manila, Philippines"
          },
          {
            "time": "15:40 - 15:55",
            "duration": "15 min",
            "title": "Integrated culture-based and 16S rRNA gene profiling of Vietnamese maternal and neonatal microbiota",
            "speaker": "Dr. Thi Ly Do",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "15:55 - 16:15",
            "duration": "20 min",
            "title": "From Korea’s signature fermented food to health-promoting bioresources: Functional lactic acid bacteria portfolio for next-generation health applications",
            "speaker": "Dr. Misun Yun",
            "affiliation": "Industrial Innovation Research Division, Kimchiome Bio-Resources Research Group, World Institute of Kimchi, Gwangju, Republic of Korea"
          },
          {
            "time": "16:15 - 16:35",
            "duration": "20 min",
            "title": "Lactic acid bacteria: From fundamental research to applications in traditional fermented meats in Vietnam",
            "speaker": "Dr. Hoang Thi Lan Anh",
            "affiliation": "Institute of Microbiology and Biotechnology, Vietnam National University, Hanoi, Vietnam"
          },
          {
            "time": "16:35 - 16:50",
            "duration": "15 min",
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
        "time": "16:50 - 17:00",
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
