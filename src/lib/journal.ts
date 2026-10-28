import source from '../app/journal.json';
import entryTitles from '../app/entry-titles.json';

// Editorial navigation titles; the transcribed entries remain unchanged.
const titles: Record<string, string> = entryTitles;
const journal = source.map((entry) => {
  const title = titles[String(entry.id)];
  if (!title) throw new Error(`Missing descriptive title for journal entry ${entry.id}`);
  return { ...entry, title };
});

export default journal;
