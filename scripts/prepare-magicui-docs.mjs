import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = resolve(root, '.magicui-source/apps/www');

function replaceRequired(path, from, to) {
  const original = readFileSync(path, 'utf8');
  if (original.includes(to)) return;
  const updated = original.replace(from, to);
  if (updated === original) throw new Error(`Expected source text was not found in ${path}`);
  writeFileSync(path, updated);
}

export function prepareMagicUIDocs() {
  const configPath = resolve(app, 'next.config.mjs');
  const fontsPath = resolve(app, 'lib/fonts.ts');
  const stylesPath = resolve(app, 'styles/globals.css');
  if (![configPath, fontsPath, stylesPath].every(existsSync)) return false;

  replaceRequired(
    configPath,
    'const nextConfig = {',
    'const nextConfig = {\n  distDir: process.env.FLOZIO_MAGICUI_DIST_DIR || ".next",',
  );

  const fonts = readFileSync(fontsPath, 'utf8');
  if (fonts.includes('next/font/google')) {
    writeFileSync(fontsPath, 'export const fontVariables = "magic-ui-font-fallbacks"\n');
  }

  const fallbackFonts = '\n.magic-ui-font-fallbacks {\n  --font-geist-sans: Arial, "Helvetica Neue", sans-serif;\n  --font-geist-mono: "SFMono-Regular", Consolas, monospace;\n  --font-inter: Arial, "Helvetica Neue", sans-serif;\n}\n';
  const styles = readFileSync(stylesPath, 'utf8');
  if (!styles.includes('.magic-ui-font-fallbacks')) writeFileSync(stylesPath, `${styles}${fallbackFonts}`);
  return true;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(prepareMagicUIDocs() ? 'Magic UI docs prepared with isolated build output and offline font fallbacks.' : 'Magic UI docs source is not installed; preparation skipped.');
}
