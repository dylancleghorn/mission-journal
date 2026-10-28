import { sitePath } from '../../lib/site-path';
'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { TopNav } from '../page';
import journal from '../../lib/journal';

const PAGE_SIZE = 10;

export default function JournalPage() {
  const [query, setQuery] = useState(() => typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('search') ?? '');
  const [year, setYear] = useState('All');
  const [page, setPage] = useState(1);
  const hits = useMemo(() => journal.filter(entry =>
    (year === 'All' || String(entry.year) === year) &&
    (!query || [entry.title, entry.date, entry.body, ...entry.people, ...entry.places, ...entry.themes].join(' ').toLowerCase().includes(query.toLowerCase()))
  ), [query, year]);
  const pageCount = Math.max(1, Math.ceil(hits.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const entries = hits.slice(start, start + PAGE_SIZE);

  function goToPage(next: number) {
    setPage(next);
    document.getElementById('journal-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return <main className="subpage"><TopNav />
    <section className="sub-wrap">
      <p className="sub-kicker">THE JOURNAL</p><h1>All entries</h1>
      <div className="archive-search"><Search size={18} />
        <input aria-label="Search journal entries" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="A name, a place, a scripture, a memory…" />
        <select aria-label="Filter by year" value={year} onChange={event => { setYear(event.target.value); setPage(1); }}><option>All</option><option>2009</option><option>2010</option><option>2011</option></select>
      </div>
      <p className="results-note" id="journal-results" role="status">{hits.length ? `${start + 1}–${Math.min(start + PAGE_SIZE, hits.length)} of ${hits.length} records` : 'No entries found. Try another search or year.'}</p>
      <div className="journal-entries">
        {entries.map(entry => <article key={entry.id} className="result-card journal-entry">
          <span>{entry.date}</span><h2>{entry.title}</h2>
          <div className="journal-entry-body">{entry.body.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          <a href={sitePath(`/?plate=${entry.id}`)}><small>Open plate <ArrowRight size={13} /></small></a>
        </article>)}
      </div>
      {hits.length > 0 && <nav className="journal-pagination" aria-label="Journal pagination">
        <button disabled={page === 1} onClick={() => goToPage(page - 1)}>Previous</button>
        <label>Page <select aria-label="Go to page" value={page} onChange={event => goToPage(Number(event.target.value))}>{Array.from({ length: pageCount }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select> of {pageCount}</label>
        <button disabled={page === pageCount} onClick={() => goToPage(page + 1)}>Next</button>
      </nav>}
    </section>
  </main>;
}
