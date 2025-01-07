// These mocks can help get you started with the frontend while you build out your api and the backend
export const highlightsMock = [
  {
    id: 3,
    firstLine: "Carries a",
    secondLine: "Lower",
    thirdLine: "risk of spread than other RCC types",
  },
  {
    id: 1,
    firstLine: "Represents approximately",
    secondLine: "5%",
    thirdLine: "of RCC cases diagnosed",
  },

  {
    id: 2,
    firstLine: "Associated with a",
    secondLine: "Lower",
    thirdLine: "response to PD-L/PD-L1 immunotherapies",
  },
];

export const institutionTagsMock = [
  {
    id: 1,
    value: "fresh_tissue",
    title: "Surgical Tissue Donation",
    firstLine:
      "Also known as fresh tissue donation. Institutions tagged with this tag are able to accept surgical tissue donations from patients.",
    secondLine: "Samples must be fresh, and within hours of surgery.",
  },
  {
    id: 2,
    value: "fixed_tissue",
    title: "Preserved Tissue Donation",
    firstLine:
      "Also know as fixed tissue. This typically comes from biopsy or preserved samples after surgery. Institutions tagged with this tag are able to accept preserved tissue donations from patients.",
    secondLine:
      "These are samples that don't need to be fresh and can be donated years within preservation.",
  },
  {
    id: 3,
    value: "trials",
    title: "Trials",
    firstLine:
      "These are institutions with clinical trials for Chromophobe RCC.",
    secondLine: "",
  },
];

export const providersTagsMock = [
  {
    id: 1,
    value: "oncology",
    title: "Oncologist",
    firstLine:
      "Physicans with the onologist tag are medical oncoligst who see Chromophobe RCC patients. They are able to prescribe systemic therapies and typically manage patients in more advanced stages.",
    secondLine: "",
  },
  {
    id: 2,
    value: "surgery",
    title: "Surgeon",
    firstLine:
      "Physicans tagged with the surgeon tag are surgeons who have managed Chromophobe RCC patients surgically. They are able to perform nephrectomies, partial nephrectomies, or refer out for other surgical considerations.",
  },
  {
    id: 3,
    value: "physician_scientist",
    title: "Physican Scientist",
    firstLine:
      "Providers with the physician scientist tag are physicians with dual roles - both as a physician who provides patient care and as a scientist who conducts research. They are able to provide clinical care and also have a research lab.",
    secondLine: "",
  },
  {
    id: 3,
    value: "research",
    title: "research",
    firstLine:
      "Providers with the research tag are physicians who are specifically involved in research for ChRCC.",
    secondLine: "",
  },
];

export const mangementArticles = [
  {
    id: 1,
    title: "Renal Cell Carcinoma of Variant Histology: Biology and Therapies",
    headline:
      "Includes a review of trial data for patients with chromophobe renal cell carcinoma and management strategies. ",
    description:
      "Discusses the management of rare kidney cancer histologies based on clinical and biological considerations",
    link: "https://www.sciencedirect.com/science/article/pii/S0889858823000539?",
    datePublished: "2023-05-23T04:33:06.033Z",
    authors: [
      {
        firstName: "Pavlos",
        lastName: "Msaouel",
        designation: "MD PhD",
        institution: "MD Anderson Cancer Center",
      },
      {
        firstName: "Giannicola",
        lastName: "Genovese",
        designation: "MD PhD",
        institution: "Memorial Sloan Kettering Cancer Center",
      },
      {
        firstName: "Nizar",
        lastName: "M. Tannir",
        designation: "MD",
        institution: "MD Anderson Cancer Center",
      },
    ],
  },
  {
    id: 1,
    title:
      "A Causal Framework for Making Individualized Treatment Decisions in Oncology",
    headline:
      "Includes scenarios and examples for Chromophobe RCC in the adjuvant setting.",
    description:
      "Causally defines two types of biomarker effects using terminology familiar to oncologists & statisticians: prognostic and predictive. This distinction is applicable across multiple situations and has been used to inform clinical and translational research.",
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9406391/",
    authors: [
      {
        firstName: "Pavlos",
        lastName: "Msaouel",
        designation: "MD PhD",
        institution: "MD Anderson Cancer Center",
      },
      {
        firstName: "Juhee",
        lastName: "Lee",
        designation: "PhD",
        institution: "University of California",
      },
      {
        firstName: "Jose A. ",
        lastName: "Karam",
        designation: "MD FACS",
        institution: "MD Anderson Cancer Center",
      },
      {
        firstName: "Peter",
        lastName: "Thrall",
        designation: "",
        institution: "MD Anderson Cancer Center",
      },
    ],
    datePublished: "2022-08-14T04:33:06.033Z",
  },
  {
    id: 1,
    title:
      "Systemic therapy for chromophobe renal cell carcinoma: A systematic review",
    headline:
      "Review and summary of response rates to systemic therapy for chRCC.",
    description:
      "Chromophobe renal cell carcinoma (chRCC) subtype accounts for almost 5% of total RCC cases. It carries the best prognosis among the rest of RCC types. However, patients with metastatic chRCC disease have worse prognosis than patients with advanced clear cell RCC. Furthermore, available data regarding systemic therapy for chRCC patients are scarce and confusing.",
    link: "https://www.google.com",
    authors: [
      {
        firstName: "Dimitrios",
        lastName: "Papanikolaou",
        designation: "MD MSc",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Periklis",
        lastName: "Koukourikis",
        designation: "MD MSc",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Pinelopi",
        lastName: "Ioannidou",
        designation: "MD MSc",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Kyriakos",
        lastName: "Moysidis",
        designation: "MD PhD",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Soultana",
        lastName: "Meditskou",
        designation: "MD MSc",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Dimitrios",
        lastName: "Koutsoumparis",
        designation: "MD",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Eudoxia",
        lastName: "Hatzivassiliou",
        designation: "MSc PhD",
        institution: "Aristotle University of Thessaloniki",
      },
      {
        firstName: "Konstantinos",
        lastName: "Hatzimouratidis",
        designation: "MD PhD",
        institution: "Aristotle University of Thessaloniki",
      },
    ],
    datePublished: "2020-01-15",
  },
];

export const recentResearchMock = [
  {
    id: 1,
    title:
      "Hypersensitivity to ferroptosis in chromophobe RCC is mediated by a glutathione metabolic dependency and cystine import via solute carrier family 7 member 11",
    headline: "Identifies a hypersensitivity to ferroptosis in chromophobe RCC",
    description:
      "Targeted therapeutic approaches for chromophobe renal cell carcinoma (ChRCC) are urgently needed. Here, we found that ChRCC is hypersensitive to ferroptosis induction via a mechanism that involves the gamma-glutamyl cycle. ChRCC can be therapeutically targeted by the inhibition of cystine uptake or treatment with cyst(e)inase in vitro and in vivo.",
    link: "https://www.pnas.org/doi/10.1073/pnas.2122840119",
    datePublished: "2022-07-09T04:33:06.033Z",
    authors: [
      {
        firstName: "Elizabeth P ",
        lastName: "Henske",
        designation: "MD PhD",
        institution: "Dana-Farber / Harvard Cancer Center",
      },
      {
        firstName: "Long",
        lastName: "Zhang",
        designation: "MD",
        institution:
          "Pulmonary and Critical Care Medicine, Brigham and Women's Hospital, Harvard Medical School",
      },
      {
        firstName: "Charbel S ",
        lastName: "Hobeika",
        designation: "MD PhD",
        institution:
          "Pulmonary and Critical Care Medicine, Brigham and Women's Hospital, Harvard Medical School",
      },
      {
        firstName: "Damir",
        lastName: "Khabibullin",
        designation: "MS",
        institution:
          "Pulmonary and Critical Care Medicine, Brigham and Women's Hospital, Harvard Medical School",
      },
      {
        firstName: "Deyang",
        lastName: "Yu",
        designation: "",
        institution: "Dana-Farber / Harvard Cancer Center",
      },
      {
        firstName: "Harilaos",
        lastName: "Filippakis",
        designation: "",
        institution:
          "Pulmonary and Critical Care Medicine, Brigham and Women's Hospital, Harvard Medical School",
      },
      {
        firstName: "Michel",
        lastName: "Alchoueiry",
        designation: "MD MSc",
        institution: "Dana-Farber / Harvard Cancer Center",
      },
      {
        firstName: "Yan",
        lastName: "Tang",
        designation: "PhD",
        institution: "Dana-Farber / Harvard Cancer Center",
      },
      {
        firstName: "Hilaire C ",
        lastName: "Lamhel",
        designation: "PhD",
        institution: "Dana-Farber / Harvard Cancer Center",
      },
      {
        firstName: "Peter",
        lastName: "Tsvetkov",
        designation: "PhD",
        institution: "MIT and Harvard",
      },
      {
        firstName: "George",
        lastName: "Georgiou",
        designation: "PhD",
        institution: "Univierity of Texas at Austin",
      },
      {
        firstName: "Candice",
        lastName: "Lamb",
        designation: "MS",
        institution: "Univierity of Texas at Austin",
      },
      {
        firstName: "Everett",
        lastName: "Stone",
        designation: "PhD",
        institution: "Univierity of Texas at Austin",
      },
      {
        firstName: "Pere",
        lastName: "Puigserver",
        designation: "PhD",
        institution: "Dana-Farber / Harvard Cancer Center",
      },
      {
        firstName: "Carmen",
        lastName: "Priolo",
        designation: "MD PhD",
        institution:
          "Pulmonary and Critical Care Medicine, Brigham and Women's Hospital, Harvard Medical School",
      },
    ],
  },
  {
    id: 1,
    title:
      "Chromophobe renal cell carcinoma: Novel molecular insights and clinicopathologic updates",
    headline:
      "Includes scenarios and examples for Chromophobe RCC in the adjuvant setting.",
    description:
      "Causally defines two types of biomarker effects using terminology familiar to oncologists & statisticians: prognostic and predictive. This distinction is applicable across multiple situations and has been used to inform clinical and translational research.",
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8841285/",
    authors: [
      {
        firstName: "Reza",
        lastName: "Alaghehbandan",
        designation: "MD",
        institution: "Royal Columbian Hospital",
      },
      {
        firstName: "Christopher G. ",
        lastName: "Przybycin",
        designation: "MD",
        institution: "Cleveland Clinic, OH",
      },
      {
        firstName: "Virginie",
        lastName: "Verkarre",
        designation: "MD PhD",
        institution: "Hopital Necker-Enfants Malades, Paris",
      },
      {
        firstName: "Rohit",
        lastName: "Mehra",
        designation: "MD",
        institution: "University of Michigan, Ann Arbor",
      },
    ],
    datePublished: "2021-12-02",
  },
];

export const institutionsMock = [
  {
    id: 0,
    name: "MD Anderson Cancer Center",
    lab: "Msaouel Lab",
    address: "1515 Holcombe Blvd",
    city: "Houston",
    tags: ["fresh_tissue", "fixed_tissue", "trials"],
    state: "TX",
    country: "United States",
    postal: "77030",
    image: "MDAnderson.png",
    link: "https://www.mdanderson.org/research/",
  },
  {
    id: 1,
    name: "Brighams and Womens Hospital",
    lab: "Henske Lab",
    tags: ["fresh_tissue", "fixed_tissue"],
    address: "20 Shattuck Street Thorn Building, (Elevator D) Room 826",
    city: "Boston",
    state: "MA",
    country: "United States",
    postal: "02115",
    image: "Brigham.png",
    link: "https://henskelab.bwh.harvard.edu/",
  },
  {
    id: 2,
    name: "National Cancer Institute",
    tags: ["fresh_tissue"],
    lab: "Linehan Lab",
    address: "10 Center Dr",
    city: "Bethesda",
    state: "MD",
    country: "United States",
    postal: "20892",
    image: "NCI.png",
    link: "https://ccr.cancer.gov/staff-directory/w-marston-linehan",
  },
  {
    id: 2,
    name: "Memorial Sloan Kettering Cancer Center",
    tags: ["fresh_tissue", "fixed_tissue"],
    lab: "",
    address: "1275 York Ave",
    city: "New York",
    state: "NY",
    country: "United States",
    postal: "10065",
    image: "sloan.png",
    link: "https://ccr.cancer.gov/staff-directory/w-marston-linehan",
  },
];

export const providersMock = [
  {
    id: 0,
    first_name: "Pavlos",
    last_name: "Msaouel",
    designation: "MD PhD",
    institution: "MD Anderson Cancer Center",
    address: "1515 Holcombe Blvd",
    city: "Houston",
    tags: ["rcc_specialist", "physician_scientist", "research"],
    state: "TX",
    country: "United States",
    postal: "77030",
    image: "msaouel.png",
    link: "https://faculty.mdanderson.org/profiles/pavlos_msaouel.html",
  },
  {
    id: 0,
    first_name: "Andrew",
    last_name: "Hahn",
    designation: "MD",
    institution: "MD Anderson Cancer Center",
    address: "1515 Holcombe Blvd",
    city: "Houston",
    tags: ["rcc_specialist"],
    state: "TX",
    country: "United States",
    postal: "77030",
    image: "andrewHahn.png",
    link: "https://faculty.mdanderson.org/profiles/andrew_hahn.html",
  },
  {
    id: 0,
    first_name: "Nizar",
    last_name: "Tannir",
    designation: "FACP",
    institution: "MD Anderson Cancer Center",
    address: "1515 Holcombe Blvd",
    city: "Houston",
    tags: ["rcc_specialist", "research"],
    state: "TX",
    country: "United States",
    postal: "77030",
    image: "tannir.png",
    link: "https://faculty.mdanderson.org/profiles/nizar_tannir.html",
  },
  {
    id: 0,
    first_name: "Martin",
    last_name: "Voss",
    designation: "MD",
    institution: "Memorial Sloan Kettering Cancer Center",
    address: "1275 York Ave",
    city: "New York",
    tags: ["rcc_specialist", "research"],
    state: "NY",
    country: "United States",
    postal: "10065",
    image: "voss.png",
    link: "https://www.mskcc.org/cancer-care/doctors/martin-voss",
  },
  {
    id: 0,
    first_name: "Lisa",
    last_name: "Henske",
    designation: "MD PhD",
    institution: "Dana Farber Cancer Institute",
    address: "450 Brookline Ave",
    city: "Boston",
    tags: ["rcc_specialist", "physician_scientist", "research"],
    state: "NY",
    country: "United States",
    postal: "10065",
    image: "henske.png",
    link: "https://www.dana-farber.org/find-a-doctor/elizabeth-p-henske/",
  },
  {
    id: 0,
    first_name: "Sumanta Kumar",
    last_name: "Pal",
    designation: "MD",
    institution: "City of Hope",
    address: "1500 E Duarte Rd",
    city: "Duarte",
    tags: ["rcc_specialist", "research"],
    state: "CA",
    country: "United States",
    postal: "91010",
    image: "monty.png",
    link: "https://www.dana-farber.org/find-a-doctor/elizabeth-p-henske/",
  },
  ,
  {
    id: 0,
    first_name: "Tian",
    last_name: "Zhang",
    designation: "MD",
    institution: "UT Southwestern",
    address: "5323 Harry Hines Blvd",
    city: "Dallas",
    tags: ["rcc_specialist"],
    state: "TX",
    country: "United States",
    postal: "75390",
    image: "zhang.png",
    link: "https://utswmed.org/doctors/tian-zhang/",
  },
];

export const organizationsMock = [
  {
    id: 0,
    name: "Kidney Cancer Association",
    image: "kca.png",
    link: "https://www.kidneycancer.org/research/grants/",
  },
  {
    id: 1,
    name: "Chromophobe and Oncocytic Tumor Alliance",
    image: "COA_orange.png",
    link: "https://www.kidneycoa.org/",
  },
  {
    id: 2,
    name: "Kidney Cancer Research Alliance",
    image: "kccure.png",
    link: "https://kccure.org/chromophobe-rcc-research-program/",
  },
];
