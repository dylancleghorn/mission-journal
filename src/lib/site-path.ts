export function sitePath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = new URL(path, 'https://journal.local');
  const pathname = url.pathname === '/' ? '/' : `${url.pathname.replace(/\/$/, '')}/`;
  return `${base}${pathname}${url.search}${url.hash}`;
}
