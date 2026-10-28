import { sitePath } from '../../lib/site-path';
import { Sparkles } from 'lucide-react';
import { TopNav } from '../page';
import { useHighlights } from '../../lib/use-journal';
import { useLanguage } from '../../lib/language';
export default function Highlights() {
  const meaningful = useHighlights();
  const { t } = useLanguage();
  return <main className="subpage"><TopNav /><section className="sub-wrap">
    <p className="sub-kicker">{t('SELECTED FROM THE RECORD','SELECIONADOS DO DIÁRIO')}</p>
    <h1>{t('Mission highlights','Destaques da missão')}</h1>
    <p className="index-lede">{t('Sacred encounters, answers to prayer, and witnesses of God’s hand, selected from the journal. Select an experience to read its full entry.','Encontros sagrados, respostas às orações e testemunhos da mão de Deus, selecionados do diário. Selecione uma experiência para ler o registro completo.')}</p>
    <div className="highlight-list">{meaningful.map(entry => <a href={sitePath(`/?plate=${entry.id}`)} className="highlight-card" key={entry.selectionId}>
      <div className="highlight-medallion"><Sparkles size={18} /></div><div><span>{entry.date}</span><h2>{entry.title}</h2><p style={{ whiteSpace:'pre-line' }}>{entry.highlight}</p><div>{entry.themes.map(theme=><small key={theme}>{theme}</small>)}</div></div>
    </a>)}</div>
  </section></main>;
}
