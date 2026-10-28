import { sitePath } from '../../lib/site-path';
import { Quote } from 'lucide-react';
import { TopNav } from '../page';
import { useQuotes } from '../../lib/use-journal';
import { useLanguage } from '../../lib/language';

export default function Quotes() {
  const quotes = useQuotes();
  const { t } = useLanguage();
  return <main className="subpage"><TopNav /><section className="sub-wrap quotes-page">
    <p className="sub-kicker">{t('WORDS FROM THE RECORD','PALAVRAS DO DIÁRIO')}</p>
    <h1>{t('Lines worth keeping','Palavras para guardar')}</h1>
    <p className="index-lede">{t('Doctrinal insights and enduring reflections, selected from the journal. Original wording is preserved, with ellipses marking omissions. Follow the date to read the full entry.','Reflexões doutrinárias e pensamentos duradouros selecionados do diário. As reticências indicam trechos omitidos. Selecione a data para ler o registro completo.')}</p>
    <p>{quotes.length} {t('passages from the record','trechos do diário')}</p>
    <div className="quote-grid">{quotes.map(({ id, words, date, entryId, attribution }) =>
      <blockquote key={id}><Quote size={22} /><p style={{ whiteSpace: 'pre-line' }}>{words}</p><footer>{attribution && <span style={{ display: 'block', marginBottom: 8 }}>{attribution}</span>}<a href={sitePath(`/?plate=${entryId}`)}>{date} · {t('Read full entry','Ler o registro completo')}</a></footer></blockquote>
    )}</div>
  </section></main>;
}
