import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// Resolve from this script so running the build elsewhere cannot erase another dist folder.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'main.js', 'content.js', 'scene.js', 'assets']) {
  await cp(resolve(root, file), resolve(output, file), { recursive: true });
}
console.log('Built static portfolio in dist/');
