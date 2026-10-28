import { BookOpen, CalendarDays, ScrollText } from 'lucide-react';
import { TopNav } from '../page';
import { useJournal } from '../../lib/use-journal';
import { useLanguage } from '../../lib/language';
export default function AboutPage() {
  const journal=useJournal();
  const {language,t}=useLanguage();
  const words=journal.reduce((n,e)=>n+e.wordCount,0).toLocaleString(language==='pt-BR'?'pt-BR':'en-US');
  return <main className="subpage"><TopNav/><section className="sub-wrap about-page"><p className="sub-kicker">{t('ABOUT THIS RECORD','SOBRE ESTE DIÁRIO')}</p><h1>{t('A modern mission,','Uma missão moderna,')}<br/>{t('preserved one day at a time.','preservada um dia de cada vez.')}</h1><p className="about-lede">{t('This is the journal of Elder Dylan Cleghorn’s service in the Brazil Campinas Mission, from 2009 to 2011. The original transcription is preserved here in a format designed for reading, searching, and remembering.','Este é o diário do serviço de Élder Dylan Cleghorn na Missão Brasil Campinas, de 2009 a 2011. A transcrição original está preservada aqui em um formato criado para ler, pesquisar e recordar.')}</p><div className="about-stats"><div><CalendarDays/><b>{journal.length}</b><span>{t('dated entries','registros datados')}</span></div><div><ScrollText/><b>{words}</b><span>{t('words preserved','palavras')}</span></div><div><BookOpen/><b>3</b><span>{t('years recorded','anos registrados')}</span></div></div>{language==='pt-BR'&&<p className="translation-note">A versão em português é uma tradução automática com revisão de trechos selecionados. O original em inglês está disponível no seletor de idioma.</p>}</section></main>;
}
