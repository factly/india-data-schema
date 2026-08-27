# OpenData Dicts - Administrator's Dataset Management Guide

This guide explains how to add new datasets, manage downloadable CSV and PDF files, and register them in the OpenData Dicts catalog.


---

## Workflow Overview

Adding a dataset to the catalog involves three simple steps:
1. **Host the Files**: Commit your dataset's CSV and PDF to your GitHub repository to generate public URLs.
2. **Configure the Metadata**: Add a new configuration block to the `DATASETS` registry in `datasets.js`.
3. **Deploy**: Push your changes to your GitHub branch. GitHub Pages will build and deploy the update automatically.

---

## Detailed Step-by-Step Guide

### Step 1: Upload and Host the Raw Files

To support download buttons in the sidebar, you must host the physical data files (e.g. CSV, PDF dictionary, JSON schemas).

1. Commit your files into a subdirectory of your repository (e.g., `data/` or `dist/`):
   ```bash
   mkdir -p data
   cp /path/to/my_dataset.csv data/my_dataset.csv
   cp /path/to/my_dataset_dictionary.pdf data/my_dataset_dictionary.pdf
   cp /path/to/my_dataset.json data/my_dataset.json
   ```
2. Git push the files to your remote repository branch (e.g., `main`):
   ```bash
   git add data/
   git commit -m "Upload raw dataset files for My Dataset"
   git push origin main
   ```
3. Retrieve the **Raw Content URL** from GitHub. On GitHub.com, locate your file, click it, and press the **Raw** button. The URL format will look like this:
   `https://raw.githubusercontent.com/[Username]/[Repository-Name]/[Branch]/data/my_dataset.csv`

---

### Step 2: Register in `datasets.js`

Open the `datasets.js` file at the root of your workspace in a text editor. Append a new object to the `DATASETS` array:

```javascript
const DATASETS = [
  // Existing datasets...
  
  {
    // 1. Unique kebab-case ID used in hash-routing (e.g. #/dataset/my-new-dataset)
    id: "my-new-dataset",
    
    // 2. Human-readable name shown throughout the UI
    name: "My New Dataset Name",
    
    // 3. Category for indexing and tab filtering
    category: "Government",
    
    // 4. Material icon name (e.g. 'verified', 'map', 'flight', 'payments', 'database')
    icon: "payments",
    
    // 5. Short summary of what the dataset contains
    description: "Provide a concise summary explaining the dataset contents, source, and use cases.",
    
    // 6. Metadata tags shown on cards. `updated` is shown as-is unless the CSV's own
    // server sends a real Last-Modified header — keep it current when you update this
    // dataset's data files, since it won't update itself automatically.
    rows: "1.2M rows",
    updated: "2 days ago",
    tags: ["Finance", "National", "Public Registry"],
    
    // 7. Links to the raw files hosted on GitHub (from Step 1)
    download: {
      csv: "https://raw.githubusercontent.com/[Username]/[Repository-Name]/main/data/my_dataset.csv",
      pdf: "https://raw.githubusercontent.com/[Username]/[Repository-Name]/main/data/my_dataset_dictionary.pdf",
      json: "https://raw.githubusercontent.com/[Username]/[Repository-Name]/main/data/my_dataset.json"
    },
    
    // 8. List of related dataset titles and their registry IDs
    related: [
      { name: "Indian Districts (LGD)", id: "indian-districts-lgd" },
      { name: "MCA Companies Registry", id: "mca-companies-registry" }
    ],
    
    // 9. Dictionary properties to draw the interactive field definition table
    schema: [
      { 
        name: "Unique_ID", 
        type: "INTEGER", 
        primary: true, // Renders a yellow key icon next to the field name
        desc: "Primary Key. Incremental unique transaction identifier.", 
        sample: "100482" 
      },
      { 
        name: "Donor_Name", 
        type: "STRING", 
        primary: false, 
        desc: "The official name of the corporation or citizen issuing funds.", 
        sample: '"Adani Enterprises"' 
      },
      { 
        name: "Issue_Date", 
        type: "DATE", 
        primary: false, 
        desc: "Date when transaction was cleared.", 
        sample: '"2026-04-12"' 
      }
    ],
    
    // 10. Headers and mock records for the interactive Data Preview tab
    previewHeaders: ["Unique_ID", "Donor_Name", "Issue_Date"],
    preview: [
      { "Unique_ID": 100482, "Donor_Name": "Adani Enterprises", "Issue_Date": "2026-04-12" },
      { "Unique_ID": 100483, "Donor_Name": "Birla Corp", "Issue_Date": "2026-04-13" },
      { "Unique_ID": 100484, "Donor_Name": "Tata Sons", "Issue_Date": "2026-04-14" }
    ],
    
    // 11. Code blocks to show under the Implementation tab
    pythonCode: `import pandas as pd

url = "https://raw.githubusercontent.com/[Username]/[Repository-Name]/main/data/my_dataset.csv"
df = pd.read_csv(url)
print(df.info())`,
    
    curlCode: `curl -X GET "https://raw.githubusercontent.com/[Username]/[Repository-Name]/main/data/my_dataset.json" \\
     -H "Accept: application/json"`
  }
];
```

---

### Step 3: Deploy to Production

Once `datasets.js` is modified locally, deploy the changes:

```bash
# Add updated files
git add datasets.js index.html ADMIN_GUIDE.md

# Commit
git commit -m "docs: add My New Dataset schema and admin documentation"

# Push to your deployment branch (usually main or gh-pages)
git push origin main
```

Within a few minutes, the **GitHub Pages Actions builder** will compile and deploy your updates. Clear your browser cache and refresh to see your new dataset live in the explorer grid!
