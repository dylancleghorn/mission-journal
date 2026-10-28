import { sitePath } from '../../lib/site-path';
import { BookOpen, MapPin, Users } from 'lucide-react';
import { TopNav } from '../page';
import journal from '../journal.json';
const count=(items:string[])=>Object.entries(items.reduce<Record<string,number>>((out,item)=>({...out,[item]:(out[item]||0)+1}),{})).sort((a,b)=>b[1]-a[1]);
function Panel({title,icon,items}:{title:string;icon:React.ReactNode;items:[string,number][]}){return <section className="index-panel"><div>{icon}<h2>{title}</h2></div><ul>{items.map(([label,n])=><li key={label}><a href={sitePath(`/journal?search=${encodeURIComponent(label)}`)}>{label}</a><span>{n}</span></li>)}</ul></section>}
export default function IndexPage(){return <main className="subpage"><TopNav/><section className="sub-wrap"><p className="sub-kicker">INDEX OF THE RECORD</p><h1>Names, places, &amp; themes</h1><p className="index-lede">Trace the people, locations, and teachings that recur through the mission journal.</p><div className="index-panels"><Panel title="People" icon={<Users/>} items={count(journal.flatMap(e=>e.people)).filter(([,n])=>n>1).slice(0,18)}/><Panel title="Places" icon={<MapPin/>} items={count(journal.flatMap(e=>e.places)).slice(0,18)}/><Panel title="Themes" icon={<BookOpen/>} items={count(journal.flatMap(e=>e.themes)).slice(0,18)}/></div></section></main>}
