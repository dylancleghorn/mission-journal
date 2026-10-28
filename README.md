# Mission Journal

Elder Dylan Cleghorn’s Brazil Campinas Mission journal, 2009–2011. Includes all 265 entries, descriptive titles, search, a people/places/themes index, 83 selected sacred experiences, and 83 doctrinal insights and reflections.

## Run locally

Use Node.js 24, then run `npm ci` and `npm run dev`.

## Publish

GitHub Actions builds and publishes the site to GitHub Pages on each push to `main`. In repository Settings → Pages, the publishing source is **GitHub Actions**. The build automatically uses the repository’s Pages path. No backend, database, hosting API keys, or paid hosting plan is needed.

To test a project path locally in PowerShell:

```powershell
$env:PAGES_BASE_PATH = '/mission-journal/'
npm run build
npm run preview
```

The static build includes an HTML entry point for each route so direct links and refreshes work on Pages. Searching and reading-position storage run in the visitor’s browser.

## Content

- `src/app/journal.json`: the original transcribed entries.
- `src/app/entry-titles.json`: editorial navigation titles.
- `src/app/journal-selections.json`: reviewed sacred experiences and insightful quotations.
- `scripts/curate-journal.mjs`: exact source anchors used to regenerate and validate selections with `npm run curate`.

The journal and all bundled content are publicly accessible on GitHub Pages. The original private Sites deployment is separate.
