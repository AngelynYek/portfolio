import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

test('rebuilding removes deleted assets and is independent of the working directory', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'portfolio-build-'));
  try {
    const project = join(fixture, 'project');
    await mkdir(join(project, 'scripts'), { recursive: true });
    await mkdir(join(project, 'assets'));
    await cp(new URL('../scripts/build.mjs', import.meta.url), join(project, 'scripts/build.mjs'));
    for (const file of ['index.html', 'styles.css', 'main.js', 'content.js', 'scene.js']) {
      await writeFile(join(project, file), file);
    }
    await mkdir(join(fixture, 'dist'));
    await writeFile(join(fixture, 'dist/keep.txt'), 'unrelated output');
    await writeFile(join(project, 'assets/old-resume.pdf'), 'old resume');
    const build = () => execFileSync(process.execPath, [join(project, 'scripts/build.mjs')], { cwd: fixture });
    build();
    assert.equal(await readFile(join(project, 'dist/assets/old-resume.pdf'), 'utf8'), 'old resume');
    await rm(join(project, 'assets/old-resume.pdf'));
    await writeFile(join(project, 'assets/resume.pdf'), 'current resume');
    build();
    await assert.rejects(readFile(join(project, 'dist/assets/old-resume.pdf')), { code: 'ENOENT' });
    assert.equal(await readFile(join(project, 'dist/assets/resume.pdf'), 'utf8'), 'current resume');
    assert.equal(await readFile(join(fixture, 'dist/keep.txt'), 'utf8'), 'unrelated output');
    assert.equal(await readFile(join(project, 'index.html'), 'utf8'), 'index.html');
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
