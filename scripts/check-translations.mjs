import fs from 'node:fs';
import assert from 'node:assert/strict';
const load=name=>JSON.parse(fs.readFileSync(new URL(`../src/app/${name}`,import.meta.url),'utf8'));
const original=load('journal.json');
const selections=load('journal-selections.json');
const translated=load('pt-BR.json');
assert.equal(translated.language,'pt-BR');
assert.deepEqual(Object.keys(translated.entries).sort(),original.map(entry=>String(entry.id)).sort());
for(const entry of original) {
  const pt=translated.entries[entry.id];
  assert(pt.title?.trim()&&pt.body?.trim(),`Missing entry ${entry.id}`);
  assert(pt.body.length>entry.body.length*.45,`Possibly truncated translation of entry ${entry.id}`);
  if(![16,89].includes(entry.id))assert.notEqual(pt.body,entry.body,`Untranslated entry ${entry.id}`);
}
for(const kind of ['highlights','quotes']) {
  assert.deepEqual(Object.keys(translated[kind]).sort(),selections[kind].map(selection=>selection.id).sort());
  for(const selection of selections[kind]) {
    const pt=translated[kind][selection.id];
    assert.equal(pt.passages.length,selection.passages.length,`Missing passage ${selection.id}`);
    assert(pt.passages.every(text=>typeof text==='string'&&text.trim()),`Empty passage ${selection.id}`);
    if(kind==='highlights')assert(pt.title?.trim());
    if(selection.attribution)assert(pt.attribution?.trim());
  }
}
assert(!/ZXTERM\d|ZXREC\d/.test(JSON.stringify(translated)),'Unrestored translation placeholder');
assert(translated.highlights['highlight-143-49'].passages[0].includes('o Salvador realmente estava ali'));
assert(translated.quotes['quote-10-2'].passages[0].startsWith('alcançar a perfeição'));
console.log('Portuguese coverage passed: 265 entries, 83 highlights, 83 quotes, with all titles, passages, and attributions.');
