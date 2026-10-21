import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const magicRoot = resolve(root, '.magicui-source');
const magicApp = resolve(magicRoot, 'apps/www');

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

if (!existsSync(resolve(magicApp, 'package.json'))) {
  run('git', ['clone', '--depth', '1', 'https://github.com/magicuidesign/magicui.git', magicRoot], root);
}

const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
run(pnpm, ['install', '--filter', 'www...'], magicRoot);
console.log('Magic UI docs are ready at .magicui-source/apps/www. Run npm run dev to start both local apps.');
