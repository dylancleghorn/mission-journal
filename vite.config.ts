import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Both assets and navigation use the repository subdirectory on GitHub Pages.
const base = process.env.PAGES_BASE_PATH || '/';
export default defineConfig({
  base,
  plugins: [react(), {
    name: 'static-page-routes',
    closeBundle() {
      const output = resolve('dist');
      const html = readFileSync(resolve(output, 'index.html'), 'utf8');
      for (const route of ['journal', 'highlights', 'quotes', 'index', 'about']) {
        mkdirSync(resolve(output, route), { recursive: true });
        writeFileSync(resolve(output, route, 'index.html'), html);
      }
      writeFileSync(resolve(output, '.nojekyll'), '');
    },
  }],
  css: { postcss: { plugins: [tailwindcss()] } },
});
