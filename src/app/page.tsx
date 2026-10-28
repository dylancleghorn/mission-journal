import { sitePath } from '../lib/site-path';
'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight, Landmark, MapPin, Search, Users } from 'lucide-react';
import { useJournal } from '../lib/use-journal';
import { useLanguage } from '../lib/language';

const initial = 0;
const POSITION_KEY = 'mission-journal:plate';

export default function Home() {
  const journal = useJournal();
  const { t } = useLanguage();
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
      <div className="stage-intro"><p>{t('THE RECORD OF','O REGISTRO DE')}</p><h1>{t('Elder Dylan Cleghorn','Élder Dylan Cleghorn')}</h1><span>{t('Brazil Campinas Mission','Missão Brasil Campinas')} · 2009–2011</span></div>
      <div className="plate-frame">
        <article className="gold-plate" aria-label={t(`Journal entry ${page + 1} of ${journal.length}`, `Registro ${page + 1} de ${journal.length}`)}>
          <div className="plate-rim"><div className="plate-content">
            <div className="plate-header"><span>{t('Plate','Placa')} {String(page + 1).padStart(3, '0')}</span><span>MMIX–MMXI</span></div>
            <div className="entry-marker"><CalendarDays size={15} /> {entry.date}</div>
            <h2>{entry.title}</h2>
            <div className="plate-text">{entry.body.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <div className="plate-bottom"><div>{entry.themes.slice(0, 3).map((theme) => <span key={theme}>{theme}</span>)}</div><small>{entry.wordCount} {t('words','palavras')}</small></div>
          </div></div>
        </article>
        <button className="plate-turn turn-left" onClick={() => advance(-1)} disabled={page === 0} aria-label={t('Previous plate','Placa anterior')}><ChevronLeft /></button>
        <button className="plate-turn turn-right" onClick={() => advance(1)} disabled={page === journal.length - 1} aria-label={t('Next plate','Próxima placa')}><ChevronRight /></button>
      </div>
      <div className="record-controls">
        <button onClick={() => advance(-1)} disabled={page === 0}><ArrowLeft size={16} /> {t('Previous','Anterior')}</button>
        <div className="record-progress"><span>{t('Record','Registro')} {page + 1} {t('of','de')} {journal.length}</span><input aria-label={t('Entry position','Posição do registro')} type="range" min="0" max={journal.length - 1} value={page} onChange={(event) => setPage(Number(event.target.value))} style={{ '--progress': `${progress}%` } as React.CSSProperties} /></div>
        <button onClick={() => advance(1)} disabled={page === journal.length - 1}>{t('Next','Próximo')} <ArrowRight size={16} /></button>
      </div>
      <p className="key-hint">{t('Use ← and → to turn the plates','Use ← e → para virar as placas')}</p>
    </section>
  </main>;
}

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  return <header className="top-nav" onKeyDown={(event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      document.getElementById('navigation-toggle')?.focus();
    }
  }}>
    <a className="nav-mark" href={sitePath('/')}><span>DC</span><b>{t('MISSION','DIÁRIO')}<br />{t('RECORD','MISSIONÁRIO')}</b></a>
    <div className="nav-actions"><label className="language-picker"><span className="sr-only">{t('Language','Idioma')}</span><select aria-label={t('Language','Idioma')} value={language} onChange={event => setLanguage(event.target.value as 'en' | 'pt-BR')}><option value="en" lang="en">English</option><option value="pt-BR" lang="pt-BR">Português</option></select></label><button id="navigation-toggle" className="nav-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? t('Close','Fechar') : 'Menu'}<span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button></div>
    <nav id="main-navigation" aria-label={t('Main navigation','Navegação principal')} className={menuOpen ? 'is-open' : ''}>
      <a href={sitePath('/')}>{t('The Record','O registro')}</a><a href={sitePath('/journal')}>{t('Journal','Diário')}</a><a href={sitePath('/highlights')}>{t('Highlights','Destaques')}</a><a href={sitePath('/quotes')}>{t('Quotes','Citações')}</a><a href={sitePath('/index')}>{t('Index','Índice')}</a><a href={sitePath('/about')}>{t('About','Sobre')}</a>
    </nav>
    <a className="nav-archive" href={sitePath('/journal')}><Search size={15} /> {t('Explore archive','Explorar arquivo')}</a>
  </header>;
}
