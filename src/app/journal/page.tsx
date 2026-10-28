import { sitePath } from '../../lib/site-path';
'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { TopNav } from '../page';
import { useJournal, normalizeSearch } from '../../lib/use-journal';
import { useLanguage } from '../../lib/language';

const PAGE_SIZE = 10;

export default function JournalPage() {
  const journal=useJournal();
  const {t}=useLanguage();
  const [query, setQuery] = useState(() => typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('search') ?? '');
  const [year, setYear] = useState('All');
  const [page, setPage] = useState(1);
  const hits = useMemo(() => journal.filter(entry =>
    (year === 'All' || String(entry.year) === year) &&
    (!query || normalizeSearch([entry.searchText, entry.title, entry.date, entry.body, ...entry.people, ...entry.places, ...entry.themes].join(' ')).includes(normalizeSearch(query)))
  ), [query, year, journal]);
  const pageCount = Math.max(1, Math.ceil(hits.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const entries = hits.slice(start, start + PAGE_SIZE);

  function goToPage(next: number) {
    setPage(next);
    document.getElementById('journal-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return <main className="subpage"><TopNav />
    <section className="sub-wrap">
      <p className="sub-kicker">{t('THE JOURNAL','O DIÁRIO')}</p><h1>{t('All entries','Todos os registros')}</h1>
      <div className="archive-search"><Search size={18} />
        <input aria-label={t('Search journal entries','Pesquisar no diário')} value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder={t('A name, a place, a scripture, a memory…','Um nome, um lugar, uma escritura, uma lembrança…')} />
        <select aria-label={t('Filter by year','Filtrar por ano')} value={year} onChange={event => { setYear(event.target.value); setPage(1); }}><option value="All">{t('All','Todos')}</option><option>2009</option><option>2010</option><option>2011</option></select>
      </div>
      <p className="results-note" id="journal-results" role="status">{hits.length ? `${start + 1}–${Math.min(start + PAGE_SIZE, hits.length)} ${t('of','de')} ${hits.length} ${t('records','registros')}` : t('No entries found. Try another search or year.','Nenhum registro encontrado. Tente outra pesquisa ou outro ano.')}</p>
      <div className="journal-entries">
        {entries.map(entry => <article key={entry.id} className="result-card journal-entry">
          <span>{entry.date}</span><h2>{entry.title}</h2>
          <div className="journal-entry-body">{entry.body.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          <a href={sitePath(`/?plate=${entry.id}`)}><small>{t('Open plate','Abrir placa')} <ArrowRight size={13} /></small></a>
        </article>)}
      </div>
      {hits.length > 0 && <nav className="journal-pagination" aria-label={t('Journal pagination','Paginação do diário')}>
        <button disabled={page === 1} onClick={() => goToPage(page - 1)}>{t('Previous','Anterior')}</button>
        <label>{t('Page','Página')} <select aria-label={t('Go to page','Ir para a página')} value={page} onChange={event => goToPage(Number(event.target.value))}>{Array.from({ length: pageCount }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select> {t('of','de')} {pageCount}</label>
        <button disabled={page === pageCount} onClick={() => goToPage(page + 1)}>{t('Next','Próximo')}</button>
      </nav>}
    </section>
  </main>;
}
