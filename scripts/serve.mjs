import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv.includes('--dist') ? 'dist' : '.');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    const relative = file.slice(root.length + 1);
    if (!file.startsWith(root + sep) || relative.split(/[\\/]/).some((part) => part.startsWith('.')) || !types[extname(file)]) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    res.writeHead(200, { 'Content-Type': `${types[extname(file)]}; charset=utf-8`, 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end('Not found');
  }
});
server.listen(5173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:5173'));
server.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
