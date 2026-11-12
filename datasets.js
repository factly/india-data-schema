// OpenData Dicts Dataset Registry
const DATASETS = [
  {
    id: "corporate-companies",
    name: "CSR Companies Registry",
    category: "Corporate Sector",
    icon: "apartment",
    description: "Registry of companies that have filed Corporate Social Responsibility (CSR) disclosures in India, indexed by Corporate Identification Number (CIN), with comparison data for resolving duplicate, renamed, or conflicting company records.",
    useCase: "Use CIN, company names, classifications, and location fields to identify and standardize corporate entities across datasets. The dictionary can support linking company records with financial, regulatory, government, procurement, CSR, litigation, and other public datasets for deeper corporate and sectoral analysis.",
    tags: ["CSR", "Corporate", "Industries"],
    updated: "Aug 6, 2026",
    download: {
      csv: "assets/csr/mca_companies.csv",
      pdf: "assets/csr/mca_companies.pdf",
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
    curlCode: `curl -L "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/csr/mca_companies.csv" \\
     -o mca_companies.csv`
  },
  {
    id: "diseases-registry",
    name: "Diseases and Illnesses Registry",
    category: "Healthcare",
    icon: "medical_services",
    description: "Comprehensive standardized registry of disease and illness names used across India's healthcare system for consistent medical reporting.",
    useCase: "Use the dictionary to map disease records across health surveys, government health statistics, research datasets, and other public data sources. This enables analysis of disease patterns, prevalence, mortality, comorbidities, and regional variations while reducing inconsistencies caused by different disease naming conventions.",
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
      { name: "disease_illness", type: "STRING", primary: true, desc: "Original disease or illness name as reported.", sample: '"Acute Diarrheal Disease"' },
      { name: "standardised_disease_name", type: "STRING", primary: false, desc: "Standardized disease name for consistent reporting.", sample: '"Acute diarrhoeal disease"' },
      { name: "icd10_code", type: "STRING", primary: false, desc: "International Classification of Diseases 10th Revision (ICD-10) diagnosis code.", sample: '"A09.0"' },
      { name: "icd10_title", type: "STRING", primary: false, desc: "Official title or disease description corresponding to the ICD-10 code.", sample: '"Other and unspecified gastroenteritis and colitis of infectious origin"' },
      { name: "icd11_code", type: "STRING", primary: false, desc: "International Classification of Diseases 11th Revision (ICD-11) code.", sample: '"1A40.Z"' },
      { name: "icd11_title", type: "STRING", primary: false, desc: "Official title or disease description corresponding to the ICD-11 code.", sample: '"Infectious gastroenteritis or colitis without specification of infectious agent"' }
    ],
    previewHeaders: ["disease_illness", "standardised_disease_name", "icd10_code", "icd10_title", "icd11_code", "icd11_title"],
    preview: [
      { "disease_illness": "Acute Diarrheal Disease", "standardised_disease_name": "Acute diarrhoeal disease", "icd10_code": "A09.0", "icd10_title": "Other and unspecified gastroenteritis and colitis of infectious origin", "icd11_code": "1A40.Z", "icd11_title": "Infectious gastroenteritis or colitis without specification of infectious agent" },
      { "disease_illness": "Japanese Encephalitis", "standardised_disease_name": "Japanese encephalitis", "icd10_code": "A83.0", "icd10_title": "Japanese encephalitis", "icd11_code": "1C85", "icd11_title": "Japanese encephalitis" }
    ],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/diseases/diseases.csv"
df = pd.read_csv(url)

# Display unique standardized diseases
print(df['standardised_disease_name'].unique()[:10])`,
    curlCode: `curl -X GET "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/diseases/diseases.json" \\
     -H "Accept: application/json"`
  },
  {
    id: "airline-names",
    name: "Airline Names",
    category: "Transport",
    icon: "flight",
    description: "Comprehensive registry of airline names with standardized naming conventions for consistent identification across India's aviation and transportation data systems.",
    useCase: "Use airline identifiers to connect datasets on airlines and aviation operations for research and analysis. The dictionary enables consistent identification of airlines across flight, airport, route, passenger, and aviation industry datasets.",
    tags: ["IATA", "Aviation", "Transport", "Global"],
    updated: "Aug 6, 2026",
    download: {
      csv: "assets/airlines/airlines_names.csv",
      pdf: "assets/airlines/airlines_names.pdf",
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

url = "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/airlines/airlines_names.csv"
df = pd.read_csv(url)

# All raw name variants for a standard airline
variants = df[df['standard_airline'] == 'Air India Limited']
print(variants[['airline', 'standard_airline']])`,
    curlCode: `curl -L "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/airlines/airlines_names.csv" \\
     -o airlines_names.csv`
  },
  {
    id: "rbi-bank-names",
    name: "RBI Bank Names",
    category: "Banking & Finance",
    icon: "account_balance",
    description: "Comprehensive standardized registry of bank names compiled from Reserve Bank of India (RBI) publications, mapping diverse raw reporting variations, abbreviations, and historical names across commercial, regional rural, and co-operative banks to canonical entities.",
    useCase: "Use the dictionary to join and standardize bank-level data across RBI publications, tables, and reporting periods. Use bank_name for exact joining against raw sources and standard_bank_name for grouping, aggregation, and tracking multi-year metrics like deposits, credit, branches, and ATMs without distortion from renamings, amalgamations, or spelling inconsistencies.",
    tags: ["Banking", "RBI", "Finance", "Public Registry"],
    updated: "Oct 15, 2026",
    download: {
      csv: "assets/rbi/bank_names.csv",
      pdf: "assets/rbi/rbi_datasheet.pdf",
      json: "assets/rbi/bank_names.json",
      docx: "assets/rbi/bank_names.docx"
    },
    docxSections: [
      "Dictionary Fields",
      "What the Standardization Process Covers",
      "Typos, Capitalisation and Formatting",
      "Abbreviations and Legal Suffixes",
      "Regional-Language Names and Look-Alike Banks",
      "Mergers, Amalgamations and Renamings",
      "Aggregate Rows and Non-Bank Entities",
      "Reporting Inconsistencies Across RBI Publications",
      "Using the Dictionary",
      "Annexure: Key Mergers, Amalgamations and Renamings"
    ],
    related: [
      { name: "RBI : Bank-wise Functioning Branches and ATMs", id: "https://dataful.in/collections/?q=bank%20wise" },
      { name: "RBI : ATM, CRM and WLA Deployment Master Data", id: "https://dataful.in/collections/?q=ATM" },
      { name: "RBI : Bank-wise Card Payments and Cash Withdrawals", id: "https://dataful.in/collections/?q=card%20payments" }
    ],
    schema: [
      { name: "bank_name", type: "STRING", primary: true, desc: "The bank name exactly as it appears in the source RBI publication, with the original spelling, capitalisation and punctuation.", sample: '"ABHYUDAYA CO-OP. BANK LTD., MUMBAI"' },
      { name: "standard_bank_name", type: "STRING", primary: false, desc: "The standardized name assigned by Dataful. Use this field to join, group and count banks.", sample: '"Abhyudaya Co-Operative Bank Limited, Mumbai"' }
    ],
    previewHeaders: ["bank_name", "standard_bank_name"],
    preview: [
      { "bank_name": "A.P.JANATA CO-OP.URBAN BANK LTD.S'BAD", "standard_bank_name": "A.P. Janata Co-Operative Urban Bank Limited, Secunderabad" },
      { "bank_name": "AB BANK LIMITED", "standard_bank_name": "AB Bank Limited" },
      { "bank_name": "ABHYUDAYA CO-OP. BANK LTD., MUMBAI", "standard_bank_name": "Abhyudaya Co-Operative Bank Limited, Mumbai" },
      { "bank_name": "AIRTEL PAYMENTS BANK", "standard_bank_name": "Airtel Payments Bank Limited" },
      { "bank_name": "BANK OF BARODA", "standard_bank_name": "Bank of Baroda" }
    ],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/saisantoshv3/india-data-schema/main/assets/rbi/bank_names.csv"
df = pd.read_csv(url)

# Display all raw name variants for a given standard bank
variants = df[df['standard_bank_name'] == 'State Bank of India']
print(variants[['bank_name', 'standard_bank_name']])`,
    curlCode: `curl -X GET "https://raw.githubusercontent.com/saisantoshv3/india-data-schema/main/assets/rbi/bank_names.json" \\
     -H "Accept: application/json"`
  },
  {
    id: "cpse-names",
    name: "CPSE Names Registry",
    category: "Government",
    icon: "domain",
    description: "Standardized registry of Central Public Sector Enterprises (CPSEs) mapping the many raw name variants found in government publications to a single canonical name, with CIN and Ratna (Maharatna, Navratna, Miniratna) status.",
    useCase: "Use cpse_as_per_source for exact joining against raw sources and standard_cpse for grouping and aggregation across years, ministries, and publications. The CIN and other_cin fields link CPSEs to corporate registry data, while ratna_status and note help track Ratna classification and mergers (e.g. Dena Bank and Vijaya Bank into Bank of Baroda).",
    tags: ["CPSE", "Public Sector", "Government", "Ratna Status"],
    updated: "Nov 12, 2026",
    download: {
      csv: "assets/cpse/cpse.csv",
      pdf: "assets/cpse/cpse.pdf",
      docx: "assets/cpse/cpse.docx"
    },
    // Explicit Data Documentation sub-section titles for cpse.docx
    docxSections: [
      "Dataful's Cleaning and Reconciliation Strategy",
      "What Does a Company's Corporate Identification Number (CIN) Tell Us?",
      "When Does a CIN Change?",
      "Dataful's Data Cleaning Strategy"
    ],
    related: [
      { name: "CPSE Disinvestments", id: "https://dataful.in/collections/2274/" },
      { name: "Master Collection: Central Public Sector Enterprises (CPSEs)", id: "https://dataful.in/collections/464/" },
      
    ],
    schema: [
      { name: "cpse_as_per_source", type: "STRING", primary: true, desc: "The CPSE name exactly as it appears in the source publication, with original spelling, capitalisation and abbreviations.", sample: '"National Mineral Development Corp.Ltd."' },
      { name: "standard_cpse", type: "STRING", primary: false, desc: "The standardized CPSE name. Use this field to join, group and count enterprises.", sample: '"NMDC Limited"' },
      { name: "cin", type: "STRING", primary: false, desc: "Corporate Identification Number (CIN) assigned by the Ministry of Corporate Affairs. Blank for entities without one, such as statutory bodies and banks.", sample: '"L13100TG1958GOI001674"' },
      { name: "other_cin", type: "STRING", primary: false, desc: "Alternate or prior CIN of the enterprise, e.g. after a change in company type.", sample: '"L13100AP1958GOI001674"' },
      { name: "ratna_status", type: "STRING", primary: false, desc: "Ratna classification of the CPSE: Maharatna, Navratna, Miniratna-I or Miniratna-II. Blank if none.", sample: '"Navratna"' },
      { name: "note", type: "STRING", primary: false, desc: "Additional remarks, such as mergers or renamings.", sample: '"Dena Bank merged with Bank of Baroda"' }
    ],
    previewHeaders: ["cpse_as_per_source", "standard_cpse", "cin", "other_cin", "ratna_status", "note"],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/cpse/cpse.csv"
df = pd.read_csv(url)

# All raw name variants for a standard CPSE
variants = df[df['standard_cpse'] == 'Bank of Baroda']
print(variants[['cpse_as_per_source', 'standard_cpse', 'note']])

# Maharatna CPSEs
print(df[df['ratna_status'] == 'Maharatna']['standard_cpse'].unique())`,
    curlCode: `curl -L "https://raw.githubusercontent.com/factly/india-data-schema/main/assets/cpse/cpse.csv" \\
     -o cpse.csv`
  }
];
