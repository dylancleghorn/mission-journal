import { sitePath } from '../../lib/site-path';
import { BookOpen, MapPin, Users } from 'lucide-react';
import { TopNav } from '../page';
import { useJournal } from '../../lib/use-journal';
import { useLanguage } from '../../lib/language';
const count=(items:string[])=>Object.entries(items.reduce<Record<string,number>>((out,item)=>({...out,[item]:(out[item]||0)+1}),{})).sort((a,b)=>b[1]-a[1]);
function Panel({title,icon,items}:{title:string;icon:React.ReactNode;items:[string,number][]}){return <section className="index-panel"><div>{icon}<h2>{title}</h2></div><ul>{items.map(([label,n])=><li key={label}><a href={sitePath(`/journal?search=${encodeURIComponent(label)}`)}>{label}</a><span>{n}</span></li>)}</ul></section>}
export default function IndexPage() {
  const journal=useJournal();
  const {t}=useLanguage();
  return <main className="subpage"><TopNav/><section className="sub-wrap"><p className="sub-kicker">{t('INDEX OF THE RECORD','ÍNDICE DO DIÁRIO')}</p><h1>{t('Names, places, & themes','Nomes, lugares e temas')}</h1><p className="index-lede">{t('Trace the people, locations, and teachings that recur through the mission journal.','Explore as pessoas, os lugares e os ensinamentos que aparecem ao longo do diário missionário.')}</p><div className="index-panels"><Panel title={t('People','Pessoas')} icon={<Users/>} items={count(journal.flatMap(e=>e.people)).filter(([,n])=>n>1).slice(0,18)}/><Panel title={t('Places','Lugares')} icon={<MapPin/>} items={count(journal.flatMap(e=>e.places)).slice(0,18)}/><Panel title={t('Themes','Temas')} icon={<BookOpen/>} items={count(journal.flatMap(e=>e.themes)).slice(0,18)}/></div></section></main>;
}
