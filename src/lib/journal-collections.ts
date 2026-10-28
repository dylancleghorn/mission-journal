import journal from '../app/journal.json';
import selections from '../app/journal-selections.json';

// Editorial selections reviewed against all 265 entries. Never infer sacredness
// from keywords: edit journal-selections.json through scripts/curate-journal.mjs.
const entries = new Map(journal.map((entry) => [entry.id, entry]));
function sourceEntry(entryId: number) {
  const entry = entries.get(entryId);
  if (!entry) throw new Error(`Missing journal source for selection: ${entryId}`);
  return entry;
}

export const highlights = selections.highlights.map((selection) => ({
  ...sourceEntry(selection.entryId),
  selectionId: selection.id,
  title: selection.title,
  highlight: selection.passages.join('\n\n…\n\n'),
}));

export const quotes = selections.quotes.map((selection) => ({
  id: selection.id,
  entryId: selection.entryId,
  date: sourceEntry(selection.entryId).date,
  words: selection.passages.join(' … '),
  attribution: 'attribution' in selection ? selection.attribution : null,
}));
