// OpenData Dicts Dataset Registry
const DATASETS = [
  {
    id: "corporate-companies",
    name: "CSR Companies Registry",
    category: "Corporate Sector",
    icon: "apartment",
    description: "Registry of companies that have filed Corporate Social Responsibility (CSR) disclosures in India, indexed by Corporate Identification Number (CIN), with comparison data for resolving duplicate, renamed, or conflicting company records.",
    tags: ["CSR", "Corporate", "Industries"],
    updated: "Aug 6, 2026",
    download: {
      csv: "assets/csr/mca_companies.csv",
      pdf: "assets/csr/mca_companies.pdf",
      json: "assets/csr/mca_companies.json",
      docx: "assets/csr/CSR.docx"
    },
    // Explicit Data Documentation sub-section titles for CSR.docx — some of its bold
    // sub-labels (e.g. "Entity Normalisation:") are formatted identically to ones we
    // don't want split out, so this pins the exact breakdown instead of guessing from
    // formatting alone.
    docxSections: [
      "When Does a Company's Corporate Identification Number (CIN) Change?",
      "Dataful's Data Cleaning Strategy",
      "Merger Management:"
    ],
    //create hyperlinks for below
    related: [
      { name: "Company-wise types of Projects Taken Up, Amount Outlaid and Spent", id: "https://dataful.in/datasets/1612/" },
      { name: "Company-wise Names of Companies registered under CSR", id: "https://dataful.in/datasets/1611/" },
      { name: "Company-wise Average Net Profit, CSR Amount Prescribed and Spent (In Local area and Overall)", id: "https://dataful.in/datasets/1613/" },
    ],
    schema: [
      { name: "company_name", type: "STRING", primary: false, desc: "Name of the registered company.", sample: '"HEALTHINDIA INSURANCE TPA SERVICES PRIVATE LIMITED"' },
      { name: "cin", type: "STRING", primary: true, desc: "Corporate Identification Number (CIN) assigned to the company by the Ministry of Corporate Affairs.", sample: '"U67200MH1997PTC105960"' },
      { name: "other_name", type: "STRING", primary: false, desc: "Semicolon-separated list of alternate or historical name variants found in raw filings for this company.", sample: '"20CUBE LOGISTICS SOLUTIONS PRIVATELIMITED;CUBE LOGISTICS SOLUTIONS PRIVATE LIMITED"' },
      { name: "other_cin", type: "STRING", primary: false, desc: "Semicolon-separated list of alternate or prior CINs linked to this company, e.g. due to renaming, relocation, or conversion.", sample: '"U74900MH2011PTC218222"' }
    ],
    previewHeaders: ["company_name", "cin", "other_name", "other_cin"],
    preview: [
      { "company_name": "20CUBE LOGISTICS SOLUTIONS PRIVATE LIMITED", "cin": "U74900TN2011PTC148864", "other_name": "20CUBE LOGISTICS SOLUTIONS PRIVATELIMITED;CUBE LOGISTICS SOLUTIONS PRIVATE LIMITED", "other_cin": "U74900MH2011PTC218222" },
      { "company_name": "22 FEET TRIBAL WORLDWIDE PRIVATE LIMITED", "cin": "U74900MH2009PTC310951", "other_name": "22 FEET COMMUNICATIONS PRIVATE LIMITED", "other_cin": "U74900KA2009PTC049244" }
    ],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/saisantoshv3/india-data-schema/main/assets/csr/mca_companies.csv"
df = pd.read_csv(url)

# Companies with a known alternate CIN (renamed, relocated, or reincorporated)
reconciled = df[df['other_cin'].notna() & (df['other_cin'] != '')]
print(reconciled.head())`,
    curlCode: `curl -X GET "https://raw.githubusercontent.com/saisantoshv3/india-data-schema/main/assets/csr/mca_companies.json" \\
     -H "Accept: application/json"`
  },
  {
    id: "diseases-registry",
    name: "Diseases and Illnesses Registry",
    category: "Healthcare",
    icon: "medical_services",
    description: "Comprehensive standardized registry of disease and illness names used across India's healthcare system for consistent medical reporting.",
    tags: ["Healthcare", "Medical", "Diseases", "Health"],
    updated: "Aug 6, 2026",
    download: {
      csv: "assets/diseases/diseases.csv",
      pdf: "assets/diseases/diseases_names.pdf",
      json: "assets/diseases/diseases.json",
      docx: "assets/diseases/diseases_names.docx"
    },
    related: [
      { name: "Disease-wise Cases and Death reported under IDSP", id: "https://dataful.in/datasets/18514/" },
    ],
    schema: [
      { name: "disease_illness_name", type: "STRING", primary: true, desc: "Original disease or illness name as reported.", sample: '"Acute Diarrheal Disease"' },
      { name: "standard", type: "STRING", primary: false, desc: "Standardized disease name for consistent reporting.", sample: '"Acute Diarrheal Disease"' }
    ],
    previewHeaders: ["disease_illness_name", "standard"],
    preview: [
      { "disease_illness_name": "Acute Diarrheal Disease", "standard": "Acute Diarrheal Disease" },
      { "disease_illness_name": "Malaria", "standard": "Malaria" }
    ],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/saisantoshv3/india-data-schema/main/assets/diseases.csv"
df = pd.read_csv(url)

# Display unique diseases
print(df['standard'].unique()[:10])`,
    curlCode: `curl -X GET "https://raw.githubusercontent.com/saisantoshv3/india-data-schema/main/assets/diseases.json" \\
     -H "Accept: application/json"`
  },
  {
    id: "airline-names",
    name: "Airline Names",
    category: "Transport",
    icon: "flight",
    description: "Comprehensive registry of airline names with standardized naming conventions for consistent identification across India's aviation and transportation data systems.",
    tags: ["IATA", "Aviation", "Transport", "Global"],
    updated: "Aug 6, 2026",
    download: {
      csv: "assets/airlines/airlines_names.csv",
      pdf: "assets/airlines/airlines_names.pdf",
      json: "assets/airlines/airlines_names.json",
      docx: "assets/airlines/airline_names.docx"
    },
    related: [
      { name: "DGCA : Airline Wise Data", id: "https://dataful.in/collections/?q=airline%20wise" },

    ],
    schema: [
      { name: "airline", type: "STRING", primary: true, desc: "The common name of the airline.", sample: '"Air India"' },
      { name: "standard_airline", type: "STRING", primary: false, desc: "The official standardized name of the airline company.", sample: '"Air India Limited"' },
      { name: "notes", type: "STRING", primary: false, desc: "Additional notes or remarks about the airline.", sample: '""' }
    ],
    previewHeaders: ["airline", "standard_airline", "notes"],
    preview: [
      { "airline": "Air India", "standard_airline": "Air India Limited", "notes": "" },
      { "airline": "IndiGo", "standard_airline": "InterGlobe Aviation Limited", "notes": "" }
    ],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/saisantoshv3/electoral_bonds/main/airline_codes.csv"
df = pd.read_csv(url)

# Display active airlines in India
indian_active = df[(df['Country'] == 'India') & (df['Active'] == True)]
print(indian_active.head())`,
    curlCode: `curl -X GET "https://raw.githubusercontent.com/saisantoshv3/electoral_bonds/main/airline_codes.json" \\
     -H "Accept: application/json"`
  }
];
