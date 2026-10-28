import fs from 'node:fs';
import assert from 'node:assert/strict';
const read = path => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));
const journal = read('../src/app/journal.json');
const titles = read('../src/app/entry-titles.json');
const selections = read('../src/app/journal-selections.json');
const cachePath = new URL('../.translation-cache.json', import.meta.url);
const cache = fs.existsSync(cachePath) ? read('../.translation-cache.json') : {};
const strings = [];
for (const entry of journal) {
  strings.push([`entry.${entry.id}.title`, titles[entry.id]]);
  if ([16, 89].includes(entry.id)) cache[`entry.${entry.id}.body`] = entry.body;
  else strings.push([`entry.${entry.id}.body`, entry.body]);
}
for (const selection of selections.highlights) {
  strings.push([`${selection.id}.title`, selection.title]);
  selection.passages.forEach((text, index) => strings.push([`${selection.id}.${index}`, text]));
}
for (const selection of selections.quotes) {
  selection.passages.forEach((text, index) => strings.push([`${selection.id}.${index}`, text]));
  if (selection.attribution) strings.push([`${selection.id}.attribution`, selection.attribution]);
}

const glossary = [
  [/\bBrazil Campinas Mission\b/gi, 'Missão Brasil Campinas'],
  [/\bBook of Mormons?\b/gi, 'Livro de Mórmon'],
  [/\bWord of Wisdom\b/gi, 'Palavra de Sabedoria'],
  [/\bHoly Ghost\b/gi, 'Espírito Santo'],
  [/\bGift of Tongues\b/gi, 'dom de línguas'],
  [/\bbaptismal font\b/gi, 'pia batismal'],
  [/\bPreach my Gospel\b/gi, 'Pregar Meu Evangelho'],
  [/\bMTC\b/g, 'CTM'],
];
function protect(text) {
  const terms = [];
  const mask = replacement => {
    const marker = `ZXTERM${String(terms.length).padStart(4, '0')}XZ`;
    terms.push([marker, replacement]);
    return marker;
  };
  text = text.replace(/\b(Elder|Sister|President)\s+([A-Z][A-Za-zÀ-ÿ’'-]*(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-zÀ-ÿ’'-]+)?)/g,
    (_, prefix, name) => mask(`${({ Elder: 'Élder', Sister: 'Síster', President: 'Presidente' })[prefix]} ${name}`));
  for (const [pattern, replacement] of glossary) text = text.replace(pattern, () => mask(replacement));
  return { text, restore: translated => {
    for (const [marker, replacement] of terms) {
      assert(translated.includes(marker), `Translation lost glossary marker ${marker}`);
      translated = translated.replaceAll(marker, replacement);
    }
    return translated;
  } };
}
const pending = strings.filter(([key]) => !cache[key]);
let completed = strings.length - pending.length;
while (pending.length) {
  const batch = [];
  let length = 0;
  while (pending.length && (length + pending[0][1].length < 3500 || batch.length === 0)) {
    const [key, source] = pending.shift();
    const protectedText = protect(source);
    const marker = `[ZXREC${String(batch.length).padStart(4, '0')}XZ]`;
    batch.push({ key, ...protectedText, marker });
    length += protectedText.text.length + marker.length + 4;
  }
  const text = batch.map(item => `${item.marker}\n${item.text}`).join('\n\n');
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  for (const [key, value] of Object.entries({client:'gtx',sl:'auto',tl:'pt',dt:'t',q:text})) url.searchParams.set(key,value);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation service returned ${response.status}; progress is saved. No automatic retries.`);
  const result = await response.json();
  const translated = result[0].map(part => part[0] || '').join('');
  for (let i = 0; i < batch.length; i++) {
    const from = translated.indexOf(batch[i].marker);
    const to = i + 1 < batch.length ? translated.indexOf(batch[i+1].marker) : translated.length;
    assert(from >= 0 && to > from, `Translation markers missing for ${batch[i].key}`);
    cache[batch[i].key] = batch[i].restore(translated.slice(from + batch[i].marker.length, to).trim());
  }
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2)+'\n');
  completed += batch.length;
  console.log(`Translated ${completed}/${strings.length} passages`);
  await new Promise(resolve => setTimeout(resolve, 1200));
}
const entries = Object.fromEntries(journal.map(entry => [entry.id, {
  title: cache[`entry.${entry.id}.title`], body: cache[`entry.${entry.id}.body`],
}]));
const highlights = Object.fromEntries(selections.highlights.map(selection => [selection.id, {
  title: cache[`${selection.id}.title`], passages: selection.passages.map((_,index)=>cache[`${selection.id}.${index}`]),
}]));
const quotes = Object.fromEntries(selections.quotes.map(selection => [selection.id, {
  passages: selection.passages.map((_,index)=>cache[`${selection.id}.${index}`]),
  attribution: selection.attribution ? cache[`${selection.id}.attribution`] : null,
}]));
const output = { language:'pt-BR', translationMethod:'Machine translation with terminology glossary and selected editorial review', entries, highlights, quotes };
for (const collection of [entries,highlights,quotes]) for (const item of Object.values(collection)) assert(!JSON.stringify(item).includes('ZXTERM') && !JSON.stringify(item).includes('ZXREC'));
fs.writeFileSync(new URL('../src/app/pt-BR.json',import.meta.url),JSON.stringify(output,null,2)+'\n');
console.log(`Complete: ${Object.keys(entries).length} entries, ${Object.keys(highlights).length} highlights, ${Object.keys(quotes).length} quotes.`);

// Normalize mission terminology and apply the separately maintained editorial review.
const review = read('../src/app/pt-BR-overrides.json');
function terminology(value) {
  if (typeof value === 'string') return value
    .replace(/\banciãos\b/g, 'élderes').replace(/\bAnciãos\b/g, 'Élderes')
    .replace(/\bancião\b/g, 'élder').replace(/\bAncião\b/g, 'Élder')
    .replace(/\bmerecimento\b/g, 'dignidade')
    .replace(/José Smith/g, 'Joseph Smith')
    .replace(/José realmente era um profeta/g, 'Joseph realmente era um profeta')
    .replace(/^Uma testemunha\b/, 'Um testemunho');
  if (Array.isArray(value)) return value.map(terminology);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,terminology(item)]));
  return value;
}
const reviewed=terminology(output);
for(const collection of ['entries','highlights','quotes']) for(const [id,changes] of Object.entries(review[collection])) {
  assert(reviewed[collection][id], `Unknown reviewed selection ${id}`);
  Object.assign(reviewed[collection][id],changes);
}
fs.writeFileSync(new URL('../src/app/pt-BR.json',import.meta.url),JSON.stringify(reviewed,null,2)+'\n');
