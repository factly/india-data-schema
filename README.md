# India Data Dictionary (OpenData Dicts)

A free, open-source data dictionary for India's public datasets — corporate registries, disease and illness names, airline names, and more. It documents field-level schemas, standardized naming conventions, and sample records so anyone working with Indian open data can resolve inconsistent, duplicated, or conflicting entries with confidence.

The entire site is a single static page. There's no backend, no build step, and no database — everything is driven by one JavaScript file (`datasets.js`) and rendered client-side.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
  - [The Easy Way — No Coding Needed](#the-easy-way--no-coding-needed)
  - [The Developer Way](#the-developer-way)
  - [Adding a New Dataset](#adding-a-new-dataset)
  - [Writing a Good Data Dictionary Document](#writing-a-good-data-dictionary-document)
  - [Before You Submit](#before-you-submit)
- [License](#license)

## Features

- **Searchable dataset catalog** — filter by category, search by name/description/tag, sort alphabetically or by row count.
- **Schema Definition table** — field types, primary key, description, and sample value. Type, primary key, and sample value are inferred automatically from the live sample records every time a dataset loads, so they never drift out of sync with the actual data.
- **Data Documentation viewer** — parses each dataset's `.docx` data dictionary directly in the browser (no server-side conversion) and organizes it into collapsible sub-sections based on its headings.
- **Sample Records explorer** — streams and paginates real CSV rows client-side, with a live filter box.
- **Download Center** — one-click CSV, PDF, and data dictionary downloads for every dataset.
- **Dark mode**, responsive layout, and zero build tooling — clone it and open `index.html` behind any static file server.

## Project Structure

```
india-data-schema/
├── index.html            # The entire application: routing, rendering, CSV/docx parsing
├── datasets.js           # Dataset registry — the single source of truth for the catalog
├── ADMIN_GUIDE.md         # Field-by-field reference for datasets.js entries
├── README.md              # You are here
└── assets/
    ├── csr/               # CSR Companies Registry dataset: csv, pdf, docx
    ├── diseases/          # Diseases and Illnesses Registry dataset: csv, pdf, docx
    ├── airlines/          # Airline Names dataset: csv, pdf, docx
    └── dataful-logo.png
```

> `dashboard_footer_credit_variant/`, `deep_dive_footer_credit_variant/`, `implementation_view_library_preview/`, and `syntactic_flux/` are earlier UI design explorations kept for reference — they aren't part of the live app.

## Getting Started

No dependencies or build step — any static file server works.

```bash
git clone https://github.com/saisantoshv3/india-data-schema.git
cd india-data-schema
python3 -m http.server 8000
# then open http://localhost:8000
```

Or use any equivalent (`npx serve`, PHP's built-in server, the VS Code "Live Server" extension, etc.). Opening `index.html` directly via `file://` will not work — the app fetches CSV/docx files with `fetch()`, which browsers block on the `file://` protocol.

Pushing to `main` redeploys automatically via GitHub Pages.

## How It Works

- **Routing** is hash-based (`#/`, `#/dataset/:id`, `#/docs`) so the whole app is one HTML file with no server-side routing required.
- **`datasets.js`** exports a `DATASETS` array. Each entry describes one dataset: metadata, download links, a hand-written `schema` array (used for field descriptions), and fallback `preview` rows shown before the real CSV loads.
- **CSV parsing** uses [PapaParse](https://www.papaparse.com/) to load the real file from `download.csv` at runtime; the hand-written `preview`/`previewHeaders` in `datasets.js` are only a fallback if that fetch fails.
- **Schema inference**: once sample records are loaded (real CSV or fallback preview), `updateSchemaFromSamples()` in `index.html` recomputes each field's `type`, `primary` key guess, and `sample` value from the actual data. It only keeps the `desc` text from `datasets.js` — matched by field name — so **field names in `schema` must exactly match your CSV's header row** for descriptions to show up correctly.
- **Docx rendering** uses [JSZip](https://stuk.github.io/jszip/) to unzip the `.docx` file and a small custom parser to turn `word/document.xml` into HTML, split into collapsible sub-sections (see [Writing a Good Data Dictionary Document](#writing-a-good-data-dictionary-document)).

## Contributing

Everyone is welcome here, no matter your experience level. Found a typo? Know a dataset that should be added? Think a description could be clearer? All of that counts as a contribution, and you don't need to be a professional developer to help.

### The Easy Way — No Coding Needed

The simplest way to contribute doesn't require installing anything:

- **Noticed something wrong or missing?** [Open an issue](https://github.com/saisantoshv3/india-data-schema/issues/new) describing it — a typo, a confusing description, a dataset you'd like to see added. A sentence or two is plenty; screenshots help too.
- **Want to fix it yourself without setting anything up locally?** Open the file on GitHub (for example [datasets.js](datasets.js)), click the pencil icon in the top right ("Edit this file"), make your change right in the browser, and GitHub will walk you through submitting it as a pull request. No git commands required.

### The Developer Way

If you're comfortable with git and want to preview your change locally before submitting it:

1. **Fork** this repository — click "Fork" at the top right of the [GitHub page](https://github.com/saisantoshv3/india-data-schema), which gives you your own copy to work in.
2. **Clone your fork**: `git clone https://github.com/<your-username>/india-data-schema.git`
3. **Create a branch** for your change: `git checkout -b add-my-dataset`
4. Make your change — see [Adding a New Dataset](#adding-a-new-dataset) below if you're adding one.
5. **Preview it locally** (see [Getting Started](#getting-started)) and check the page looks right.
6. **Commit, push, and open a Pull Request** describing what you changed and why. Don't worry about making it perfect — reviewers are happy to help polish it from there.

### Adding a New Dataset

1. **Add the files.** Put your dataset's CSV (required) and, ideally, a PDF and a `.docx` data dictionary into a new folder under `assets/`, e.g. `assets/my-dataset/`.
2. **Register it in `datasets.js`.** Add a new entry to the `DATASETS` array. [ADMIN_GUIDE.md](ADMIN_GUIDE.md) walks through every field with a full example — here's the short version:
   - `id`, `name`, `category`, `icon` (a [Material Symbol](https://fonts.google.com/icons) name), `description`, `tags`.
   - `download.csv` / `download.pdf` / `download.docx` / `download.json` — paths to the files you just added.
   - `schema` — one entry per CSV column: `{ name, type, primary, desc, sample }`. Just make sure `name` exactly matches your CSV's header row (the site figures out `type`/`primary`/`sample` automatically) — `desc` is the one thing you always need to write yourself.
   - `previewHeaders` / `preview` — a couple of example rows, shown only if the live CSV can't be loaded for some reason.
   - `related` — links to other datasets that pair well with this one.
   - `pythonCode` / `curlCode` — a short, working example of loading your dataset's actual columns.
3. **Double-check it worked**: open the site locally, find your new card on the homepage, and open its detail page. Every field in the Schema Definition table should show your own description, not the generic "Auto-detected from sample records." fallback text.

### Writing a Good Data Dictionary Document

If you're including a `.docx` data dictionary, the site automatically splits it into neat, collapsible sections for readers. A few tips to get a clean result:

- Start the document with one title line — it's shown up top on its own, not folded into a section.
- Use Word's built-in Heading styles for your section titles where you can.
- No heading styles handy? A short, fully bold, standalone line (under ~100 characters) also works as a section title.
- A bold "Label:" at the start of a paragraph, followed by regular text, is recognized as a new section too.
- Keep numbered or bulleted lists as regular content, not as section titles — give real headings their own plain paragraph.

### Before You Submit

A quick self-check before opening your pull request:

- [ ] Dataset files live under `assets/<dataset-name>/`, not loose in the `assets/` root.
- [ ] `schema` field names exactly match the real CSV header row.
- [ ] No personal, sensitive, or unlicensed third-party data is included.
- [ ] You've previewed it locally and it looks right.
- [ ] Your PR description says what you changed and why.

If you're missing one of these, that's okay — just mention it in your PR and someone will help you sort it out.

## License

Released under the MIT License.
