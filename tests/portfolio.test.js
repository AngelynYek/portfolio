import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { portfolio, folders } from '../content.js';

test('every folder targets an existing, uniquely identified section', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.equal(folders.length, 5);
  assert.equal(new Set(folders.map((folder) => folder.id)).size, 5);
  for (const folder of folders) assert.ok(html.includes(`<section id="${folder.id}"`));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
});

test('resume download exists and projects have distinct IDs', async () => {
  await access(new URL(`../${portfolio.resume.url}`, import.meta.url));
  assert.equal(new Set(portfolio.projects.map((project) => project.id)).size, portfolio.projects.length);
  for (const project of portfolio.projects) {
    assert.ok(project.title && project.details && project.tags.length);
    assert.ok(!project.url || project.url.startsWith('https://') || project.url.startsWith('#'));
  }
});

test('styling preserves the requested palette, no gradients, and reduced motion', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  for (const color of ['#FAFAF7', '#D5D98F', '#CEE1F2', '#F7A9A5', '#F0D9A3']) assert.ok(css.includes(color));
  assert.doesNotMatch(css, /(?:linear|radial|conic)-gradient\(/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
