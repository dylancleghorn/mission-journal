import { createRoot } from 'react-dom/client';
import Home from './app/page';
import Journal from './app/journal/page';
import Highlights from './app/highlights/page';
import Quotes from './app/quotes/page';
import Index from './app/index/page';
import About from './app/about/page';
import './app/globals.css';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const route = window.location.pathname.slice(base.length).replace(/^\/+|\/+$/g, '');
const pages = { '': Home, journal: Journal, highlights: Highlights, quotes: Quotes, index: Index, about: About };
const Page = pages[route as keyof typeof pages];
createRoot(document.getElementById('root')!).render(Page ? <Page /> : <main><h1>Page not found</h1><a href={import.meta.env.BASE_URL}>Return to the journal</a></main>);
