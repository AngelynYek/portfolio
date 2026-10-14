import { cp, mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'main.js', 'content.js', 'scene.js', 'assets']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
console.log('Built static portfolio in dist/');

