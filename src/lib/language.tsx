import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type Language = 'en' | 'pt-BR';
export type PortugueseContent = typeof import('../app/pt-BR.json');
const STORAGE_KEY = 'mission-journal:language';
export function preferredLanguage(): Language {
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (requested === 'pt' || requested === 'pt-BR') return 'pt-BR';
  if (requested === 'en') return 'en';
  try { return localStorage.getItem(STORAGE_KEY) === 'pt-BR' ? 'pt-BR' : 'en'; } catch { return 'en'; }
}
const Context = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  content: PortugueseContent | null;
  t: (english: string, portuguese: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(preferredLanguage);
  const [content, setContent] = useState<PortugueseContent | null>(null);
  const [failed, setFailed] = useState(false);
  const setLanguage = (next: Language) => {
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Reading works without storage. */ }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next === 'pt-BR' ? 'pt' : 'en');
    window.history.replaceState(null, '', url);
    updateLanguage(next);
  };
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, language); } catch { /* Storage is optional. */ }
    document.documentElement.lang = language;
    document.title = language === 'pt-BR' ? 'Diário Missionário | Missão Brasil Campinas' : 'Mission Journal | Brazil Campinas Mission';
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute('content', language === 'pt-BR' ? 'Um arquivo pesquisável do diário da missão de Élder Dylan Cleghorn na Missão Brasil Campinas, de 2009 a 2011.' : 'A searchable archive of Elder Dylan Cleghorn’s 2009–2011 Brazil Campinas Mission journal.');
  }, [language]);
  useEffect(() => {
    if (language === 'pt-BR' && !content) {
      setFailed(false);
      import('../app/pt-BR.json').then(module => setContent(module.default)).catch(() => setFailed(true));
    }
  }, [language, content]);
  const t = (english: string, portuguese: string) => language === 'pt-BR' ? portuguese : english;
  return <Context.Provider value={{ language, setLanguage, content, t }}>
    {language === 'pt-BR' && !content && <main className="language-loading"><h1>{failed ? 'Não foi possível carregar a tradução.' : 'Carregando a versão em português…'}</h1><p role="status">{failed ? 'Tente atualizar a página ou leia o original em inglês.' : 'Preparando o diário, as experiências e as citações.'}</p><button onClick={() => setLanguage('en')}>Read in English</button></main>}
    <div hidden={language === 'pt-BR' && !content}>{children}</div>
  </Context.Provider>;
}
export function useLanguage() {
  const value = useContext(Context);
  if (!value) throw new Error('LanguageProvider is required');
  return value;
}
export function localDate(isoDate: string, language: Language) {
  return new Intl.DateTimeFormat(language === 'pt-BR' ? 'pt-BR' : 'en-US', { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(`${isoDate}T12:00:00Z`));
}
const themes: Record<string,string> = {
  Faith:'Fé', Prayer:'Oração', 'Scripture study':'Estudo das escrituras', Teaching:'Ensino',
  'Christlike service':'Serviço cristão', Temple:'Templo', Portuguese:'Português',
  Companionship:'Companheirismo', Baptism:'Batismo', Leadership:'Liderança',
};
export const portugueseTheme = (theme: string) => themes[theme] ?? theme;
export const portugueseName = (name: string) => name.replace(/^Elder\b/, 'Élder').replace(/^Sister\b/, 'Síster').replace(/^President\b/, 'Presidente');
export const portuguesePlace = (place: string) => place === 'Brazil' ? 'Brasil' : place === 'MTC' ? 'CTM' : place;
