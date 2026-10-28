import { sitePath } from '../lib/site-path';
'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight, Landmark, MapPin, Search, Users } from 'lucide-react';
import journal from '../lib/journal';

const initial = Math.max(0, journal.findIndex((entry) => entry.isoDate === '2009-03-18'));
const POSITION_KEY = 'mission-journal:plate';

export default function Home() {
  const [page, setPage] = useState(initial);
  const [positionLoaded, setPositionLoaded] = useState(false);

  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get('plate'));
    if (Number.isInteger(requested) && requested >= 1 && requested <= journal.length) {
      setPage(requested - 1);
    } else {
      try {
        const saved = Number(window.localStorage.getItem(POSITION_KEY));
        if (Number.isInteger(saved) && saved >= 1 && saved <= journal.length) setPage(saved - 1);
      } catch {
        // Reading remains available when browser storage is disabled.
      }
    }
    setPositionLoaded(true);
  }, []);

  useEffect(() => {
    if (!positionLoaded) return;
    try {
      window.localStorage.setItem(POSITION_KEY, String(page + 1));
    } catch {
      // Reading remains available when browser storage is disabled.
    }
  }, [page, positionLoaded]);
  const entry = journal[page];
  const advance = (amount: number) => setPage((current) => Math.min(Math.max(current + amount, 0), journal.length - 1));

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => { if (event.key === 'ArrowLeft') advance(-1); if (event.key === 'ArrowRight') advance(1); };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  const progress = ((page + 1) / journal.length) * 100;
  return <main className="record-site">
    <TopNav />
    <section className="record-stage">
      <div className="stage-orbit orbit-a" /><div className="stage-orbit orbit-b" />
      <div className="stage-intro"><p>THE RECORD OF</p><h1>Elder Dylan Cleghorn</h1><span>Brazil Campinas Mission · 2009–2011</span></div>
      <div className="plate-frame">
        <article className="gold-plate" aria-label={`Journal entry ${page + 1} of ${journal.length}`}>
          <div className="plate-rim"><div className="plate-content">
            <div className="plate-header"><span>Plate {String(page + 1).padStart(3, '0')}</span><span>MMIX–MMXI</span></div>
            <div className="entry-marker"><CalendarDays size={15} /> {entry.date}</div>
            <h2>{entry.title}</h2>
            <div className="plate-text">{entry.body.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <div className="plate-bottom"><div>{entry.themes.slice(0, 3).map((theme) => <span key={theme}>{theme}</span>)}</div><small>{entry.wordCount} words</small></div>
          </div></div>
        </article>
        <button className="plate-turn turn-left" onClick={() => advance(-1)} disabled={page === 0} aria-label="Previous plate"><ChevronLeft /></button>
        <button className="plate-turn turn-right" onClick={() => advance(1)} disabled={page === journal.length - 1} aria-label="Next plate"><ChevronRight /></button>
      </div>
      <div className="record-controls">
        <button onClick={() => advance(-1)} disabled={page === 0}><ArrowLeft size={16} /> Previous</button>
        <div className="record-progress"><span>Record {page + 1} of {journal.length}</span><input aria-label="Entry position" type="range" min="0" max={journal.length - 1} value={page} onChange={(event) => setPage(Number(event.target.value))} style={{ '--progress': `${progress}%` } as React.CSSProperties} /></div>
        <button onClick={() => advance(1)} disabled={page === journal.length - 1}>Next <ArrowRight size={16} /></button>
      </div>
      <p className="key-hint">Use ← and → to turn the plates</p>
    </section>
  </main>;
}

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="top-nav" onKeyDown={(event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      document.getElementById('navigation-toggle')?.focus();
    }
  }}>
    <a className="nav-mark" href={sitePath('/')}><span>DC</span><b>MISSION<br />RECORD</b></a>
    <button id="navigation-toggle" className="nav-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? 'is-open' : ''}>
      <a href={sitePath('/')}>The Record</a><a href={sitePath('/journal')}>Journal</a><a href={sitePath('/highlights')}>Highlights</a><a href={sitePath('/quotes')}>Quotes</a><a href={sitePath('/index')}>Index</a><a href={sitePath('/about')}>About</a>
    </nav>
    <a className="nav-archive" href={sitePath('/journal')}><Search size={15} /> Explore archive</a>
  </header>;
}
