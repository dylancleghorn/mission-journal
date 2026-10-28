import { sitePath } from '../../lib/site-path';
import { Quote } from 'lucide-react';
import { TopNav } from '../page';
import { quotes } from '../../lib/journal-collections';

export default function Quotes() {
  return <main className="subpage"><TopNav /><section className="sub-wrap quotes-page">
    <p className="sub-kicker">WORDS FROM THE RECORD</p>
    <h1>Lines worth keeping</h1>
    <p className="index-lede">Doctrinal insights and enduring reflections, selected from the journal. Original wording is preserved, with ellipses marking omissions. Follow the date to read the full entry.</p>
    <p>{quotes.length} passages from the record</p>
    <div className="quote-grid">{quotes.map(({ id, words, date, entryId, attribution }) =>
      <blockquote key={id}><Quote size={22} /><p style={{ whiteSpace: 'pre-line' }}>{words}</p><footer>{attribution && <span style={{ display: "block", marginBottom: 8 }}>{attribution}</span>}<a href={sitePath(`/?plate=${entryId}`)}>{date} · Read full entry</a></footer></blockquote>
    )}</div>
  </section></main>;
}
