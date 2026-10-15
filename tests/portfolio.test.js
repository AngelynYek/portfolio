import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { portfolio, pokemon } from '../content.js';
import { drawIsland } from '../scene.js';

test('all six controls have available sprites and valid on-scene crop bounds', async () => {
  assert.deepEqual(new Set(pokemon.map(p=>p.id)), new Set(['about','skills','projects','learning','contact','achievements']));
  for (const p of pokemon) {
    await access(new URL(`../assets/sprites/${p.file}.gif`,import.meta.url));
    const [l,t,r,b]=p.bounds;
    assert(l>=0 && t>=0 && r<=p.size[0] && b<=p.size[1] && r>l && b>t);
    const h=p.width/(r-l)*(b-t);
    assert(p.x-p.width/2>=0 && p.x+p.width/2<=320 && p.y-h>=0 && p.y<=280);
  }
  await access(new URL(`../${portfolio.resume.url}`,import.meta.url));
});
test('pixel renderer produces finite, bounded drawing commands', () => {
  let pixels=0;
  const ctx={clearRect(){},fillRect(x,y,w,h){assert([x,y,w,h].every(Number.isFinite));assert(x>=0&&x<=320&&y>=0&&y<=280);assert(w>=0&&h>=0);pixels++;}};
  drawIsland({getContext:()=>ctx});
  assert(pixels>1000);
});
test('required frame and font are packaged; no gradients', async () => {
  await access(new URL('../assets/pokedex-frame.jpg',import.meta.url));
  await access(new URL('../assets/fonts/pkmn_w.ttf',import.meta.url));
  const css=await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert(!/gradient\(/i.test(css));
});
