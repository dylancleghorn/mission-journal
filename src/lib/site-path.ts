import { preferredLanguage } from './language';
export function sitePath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = new URL(path, 'https://journal.local');
  const pathname = url.pathname === '/' ? '/' : `${url.pathname.replace(/\/$/, '')}/`;
  url.searchParams.set('lang', preferredLanguage() === 'pt-BR' ? 'pt' : 'en');
  return `${base}${pathname}${url.search}${url.hash}`;
}
