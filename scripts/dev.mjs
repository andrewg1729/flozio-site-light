import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const homepageNext = resolve(root, 'node_modules/next/dist/bin/next');
const magicRoot = resolve(root, '.magicui-source');
const magicApp = resolve(magicRoot, 'apps/www');
const magicNext = resolve(magicApp, 'node_modules/next/dist/bin/next');
const children = [];

function launch(label, command, args, options) {
  const child = spawn(command, args, { stdio: 'inherit', ...options });
  children.push({ label, child });
  child.on('exit', (code, signal) => {
    if (code && !shuttingDown) {
      console.error(`${label} exited with code ${code}${signal ? ` (${signal})` : ''}.`);
      shutdown(code);
    }
  });
}

let shuttingDown = false;
function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  const live = children.filter(({ child }) => child.exitCode === null);
  if (process.platform === 'win32') {
    for (const { child } of live) {
      if (child.pid) spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    }
  } else {
    for (const { child } of live) child.kill('SIGTERM');
  }
  setTimeout(() => process.exit(code), 600);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

if (!existsSync(homepageNext)) {
  console.error('Flozio dependencies are missing. Run npm install, then npm run dev.');
  process.exit(1);
}

launch('Flozio homepage', process.execPath, [homepageNext, 'dev', '-p', '38471'], {
  cwd: root,
  env: { ...process.env },
});

if (existsSync(magicNext)) {
  launch('Magic UI local docs', process.execPath, [magicNext, 'dev', '-p', '38472'], {
    cwd: magicApp,
    env: { ...process.env, PORT: '38472' },
  });
  console.log('Component Lab docs: http://localhost:38472/docs/components');
} else {
  console.warn('Magic UI docs are not installed in .magicui-source; the Component Lab preview server will not start.');
}

console.log('Flozio: http://localhost:38471');
