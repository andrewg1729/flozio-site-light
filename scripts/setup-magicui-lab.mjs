import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const magicRoot = resolve(root, '.magicui-source');
const magicApp = resolve(magicRoot, 'apps/www');
const magicSourceMissing = !existsSync(resolve(magicApp, 'package.json'));
const sourceCommit = JSON.parse(readFileSync(resolve(root, 'public/magicui-catalog.json'), 'utf8')).source.sourceRepositoryCommit;

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (magicSourceMissing) {
  run('git', ['clone', '--depth', '1', 'https://github.com/magicuidesign/magicui.git', magicRoot], root);
  if (sourceCommit) {
    run('git', ['-c', `safe.directory=${magicRoot}`, 'fetch', '--depth', '1', 'origin', sourceCommit], magicRoot);
    run('git', ['-c', `safe.directory=${magicRoot}`, 'checkout', '--detach', sourceCommit], magicRoot);
  }
}

const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
run(pnpm, ['install', '--filter', 'www...'], magicRoot);
run(process.execPath, [resolve(root, 'scripts/map-magicui-examples.mjs')], root);
console.log('Pinned Magic UI docs and every cataloged example preview are ready. Run npm run dev to start both local apps.');
