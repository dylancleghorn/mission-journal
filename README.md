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

## Languages

The header language selector offers English and Brazilian Portuguese. Language links use `?lang=en` or `?lang=pt`; the selection is saved in the visitor’s browser. Navigation preserves the selected language, and switching language keeps the current page, search, and reading position. Search supports accents and searches the original text as well as the selected translation.

All 265 entry bodies and titles, 83 highlights, and 83 quotes are bundled in Portuguese in `src/app/pt-BR.json`. The Portuguese content loads only when selected; the live site makes no translation-service requests. Dates, themes, navigation, filters, pagination, and accessibility labels are localized too.

Portuguese journal content was machine-translated using Google Translate with a mission terminology glossary. Selected key passages were reviewed separately in `src/app/pt-BR-overrides.json`; the original English remains unchanged. The About page identifies the translation method.

Run `npm run check:translations` to verify completeness. The build runs this check automatically. `npm run translate:pt` is an optional editor-only generation script that contacts Google Translate and caches progress in the ignored `.translation-cache.json`; it is never part of deployment or visitor requests. Review generated content and maintain the overrides before publishing.
