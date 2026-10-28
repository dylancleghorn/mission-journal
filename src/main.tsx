import { createRoot } from 'react-dom/client';
import Home from './app/page';
import Journal from './app/journal/page';
import Highlights from './app/highlights/page';
import Quotes from './app/quotes/page';
import Index from './app/index/page';
import About from './app/about/page';
import { LanguageProvider, useLanguage } from './lib/language';
import { sitePath } from './lib/site-path';
import './app/globals.css';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const route = window.location.pathname.slice(base.length).replace(/^\/+|\/+$/g, '');
const pages = { '': Home, journal: Journal, highlights: Highlights, quotes: Quotes, index: Index, about: About };
const Page = pages[route as keyof typeof pages];
function App() {
  const { t } = useLanguage();
  return Page ? <Page /> : <main className="language-loading"><h1>{t('Page not found','Página não encontrada')}</h1><a href={sitePath('/')}>{t('Return to the journal','Voltar ao diário')}</a></main>;
}
createRoot(document.getElementById('root')!).render(<LanguageProvider><App /></LanguageProvider>);
