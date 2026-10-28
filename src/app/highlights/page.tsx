import { sitePath } from '../../lib/site-path';
import { Sparkles } from 'lucide-react';
import { TopNav } from '../page';
import { highlights as meaningful } from '../../lib/journal-collections';
export default function Highlights(){return <main className="subpage"><TopNav/><section className="sub-wrap"><p className="sub-kicker">SELECTED FROM THE RECORD</p><h1>Mission highlights</h1><p className="index-lede">Sacred encounters, answers to prayer, and witnesses of God’s hand, selected from the journal. Select an experience to read its full entry.</p><div className="highlight-list">{meaningful.map((entry)=><a href={sitePath(`/?plate=${entry.id}`)} className="highlight-card" key={entry.selectionId}><div className="highlight-medallion"><Sparkles size={18}/></div><div><span>{entry.date}</span><h2>{entry.title==='Journal entry'?'A sacred moment':entry.title}</h2><p style={{ whiteSpace: "pre-line" }}>{entry.highlight}</p><div>{entry.themes.map((theme)=><small key={theme}>{theme}</small>)}</div></div></a>)}</div></section></main>}

