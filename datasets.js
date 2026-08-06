// OpenData Dicts Dataset Registry
const DATASETS = [
  {
    id: "corporate-companies",
    name: "Corporate Companies (CSR)",
    category: "Corporate Sector",
    icon: "apartment",
    description: "Registry of Corporate Identification Numbers (CIN) for companies registered in India, including comparison data for resolving duplicate or conflicting company records with standardized naming conventions.",
    tags: ["CSR", "Corporate", "Industries"],
    download: {
      csv: "assets/csr/mca_companies.csv",
      pdf: "assets/csr/mca_companies.pdf",
      json: "assets/csr/mca_companies.json",
      docx: "assets/csr/CSR.docx"
    },
    //create hyperlinks for below
    related: [
      { name: "Company-wise types of Projects Taken Up, Amount Outlaid and Spent", id: "https://dataful.in/datasets/1612/" },
      { name: "Company-wise Names of Companies registered under CSR", id: "https://dataful.in/datasets/1611/" },
      { name: "Company-wise Average Net Profit, CSR Amount Prescribed and Spent (In Local area and Overall)", id: "https://dataful.in/datasets/1613/" },
    ],
    schema: [
      { name: "remarks", type: "STRING", primary: false, desc: "Notes about the company record.", sample: '"Company Names aren\'t Matching"' },
      { name: "current_cin", type: "STRING", primary: false, desc: "Current Corporate Identification Number identifier.", sample: '"CIN-1"' },
      { name: "to_delete", type: "STRING", primary: true, desc: "CIN marked for deletion.", sample: '"U72200KL2007PTC021228"' },
      { name: "replace", type: "STRING", primary: false, desc: "Replacement field.", sample: '""' },
      { name: "cin_1", type: "STRING", primary: false, desc: "First CIN in comparison.", sample: '"U72200KA2007PTC130646"' },
      { name: "company_name_1", type: "STRING", primary: false, desc: "Company name associated with CIN 1.", sample: '"INFOBLOX TECHNICAL SUPPORT"' },
      { name: "cin_2", type: "STRING", primary: false, desc: "Second CIN in comparison.", sample: '"U72200KL2007PTC021228"' },
      { name: "company_name_2", type: "STRING", primary: false, desc: "Company name associated with CIN 2.", sample: '"INFOBLOX TECHNICAL SUPPORT LIMITED"' }
    ],
    previewHeaders: ["remarks", "current_cin", "cin_1", "company_name_1", "cin_2", "company_name_2"],
    preview: [
      { "remarks": "Company Names aren't Matching", "current_cin": "CIN-1", "cin_1": "U72200KA2007PTC130646", "company_name_1": "INFOBLOX TECHNICAL", "cin_2": "U72200KL2007PTC021228", "company_name_2": "INFOBLOX LIMITED" }
    ],
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/saisantoshv3/electoral_bonds/main/mca_companies.csv"
df = pd.read_csv(url)

# Filter by state
karnataka_districts = df[df['State Name'] == 'Karnataka']
print(karnataka_districts.head())`,
    curlCode: `curl -X GET "https://raw.githubusercontent.com/saisantoshv3/electoral_bonds/main/indian_districts_lgd.json" \\
     -H "Accept: application/json"`
  },
  {
    id: "diseases-registry",
    name: "Diseases and Illnesses Registry",
    category: "Healthcare",
    icon: "medical_services",
    description: "Comprehensive standardized registry of disease and illness names used across India's healthcare system for consistent medical reporting.",
    tags: ["Healthcare", "Medical", "Diseases", "Health"],
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
