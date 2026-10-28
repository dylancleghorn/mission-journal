import { useMemo } from 'react';
import journal from './journal';
import { highlights, quotes } from './journal-collections';
import { localDate, portugueseName, portuguesePlace, portugueseTheme, useLanguage } from './language';

type TranslatedEntry = { title: string; body: string };
type TranslatedHighlight = { title: string; passages: string[] };
type TranslatedQuote = { passages: string[]; attribution: string | null };
export function useJournal() {
  const { language, content } = useLanguage();
  return useMemo(() => journal.map(entry => {
    const translated = (content?.entries as Record<string,TranslatedEntry> | undefined)?.[entry.id];
    const portuguese = language === 'pt-BR';
    return {
      ...entry,
      title: portuguese && translated ? translated.title : entry.title,
      body: portuguese && translated ? translated.body : entry.body,
      date: localDate(entry.isoDate, language),
      themes: portuguese ? entry.themes.map(portugueseTheme) : entry.themes,
      people: portuguese ? entry.people.map(portugueseName) : entry.people,
      places: portuguese ? [...new Set(entry.places.map(portuguesePlace))] : entry.places,
      wordCount: portuguese && translated ? translated.body.trim().split(/\s+/).length : entry.wordCount,
      searchText: [entry.title,entry.body,entry.date,...entry.people,...entry.places,...entry.themes,translated?.title,translated?.body].join(' '),
    };
  }),[language,content]);
}
export function useHighlights() {
  const { language, content } = useLanguage();
  return useMemo(() => highlights.map(entry => {
    const translated = (content?.highlights as Record<string,TranslatedHighlight> | undefined)?.[entry.selectionId];
    return { ...entry, date:localDate(entry.isoDate,language),
      title:language === 'pt-BR' && translated ? translated.title : entry.title,
      highlight:language === 'pt-BR' && translated ? translated.passages.join('\n\n…\n\n') : entry.highlight,
      themes:language === 'pt-BR' ? entry.themes.map(portugueseTheme) : entry.themes,
    };
  }),[language,content]);
}
export function useQuotes() {
  const { language, content } = useLanguage();
  return useMemo(() => quotes.map(quote => {
    const translated = (content?.quotes as Record<string,TranslatedQuote> | undefined)?.[quote.id];
    const entry = journal.find(entry=>entry.id===quote.entryId)!;
    return { ...quote, date:localDate(entry.isoDate,language),
      words:language === 'pt-BR' && translated ? translated.passages.join(' … ') : quote.words,
      attribution:language === 'pt-BR' && translated ? translated.attribution : quote.attribution,
    };
  }),[language,content]);
}
export const normalizeSearch = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
