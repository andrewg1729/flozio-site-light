import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareMagicUIDocs } from './prepare-magicui-docs.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const homepageNext = resolve(root, 'node_modules/next/dist/bin/next');
const magicRoot = resolve(root, '.magicui-source');
const magicApp = resolve(magicRoot, 'apps/www');
const magicNext = resolve(magicApp, 'node_modules/next/dist/bin/next');
const aceternityApp = resolve(root, '.component-lab-cache/aceternity-app');
const aceternityNext = resolve(aceternityApp, 'node_modules/next/dist/bin/next');
const kokonutApp = resolve(root, '.component-lab-cache/kokonutui-source');
const kokonutNext = resolve(kokonutApp, 'node_modules/next/dist/bin/next');
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
  prepareMagicUIDocs();
  launch('Magic UI local docs', process.execPath, [magicNext, 'dev', '-p', '38472'], {
    cwd: magicApp,
    env: { ...process.env, PORT: '38472', FLOZIO_MAGICUI_DIST_DIR: '.next-flozio-component-lab' },
  });
  console.log('Component Lab docs: http://localhost:38472/docs/components');
} else {
  console.warn('Magic UI docs are not installed in .magicui-source; the Component Lab preview server will not start.');
}

if (existsSync(aceternityNext) && existsSync(resolve(aceternityApp, 'app/page.tsx'))) {
  launch('Aceternity native component previews', process.execPath, [aceternityNext, 'dev', '-p', '38473'], {
    cwd: aceternityApp,
    env: { ...process.env, PORT: '38473', NEXT_DIST_DIR: '.next-flozio-aceternity' },
  });
  console.log('Aceternity native previews: http://localhost:38473');
}

if (existsSync(kokonutNext) && existsSync(resolve(kokonutApp, 'app/lab/page.tsx'))) {
  launch('Kokonut UI free component lab', process.execPath, [kokonutNext, 'dev', '-p', '38474'], {
    cwd: kokonutApp,
    env: { ...process.env, PORT: '38474' },
  });
  console.log('Kokonut UI component lab: http://localhost:38474/lab');
}

console.log('Flozio: http://localhost:38471');
