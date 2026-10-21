import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const catalog = JSON.parse(await fs.readFile('public/magicui-catalog.json', 'utf8'));
const root = '.magicui-source/components';
await fs.mkdir(root, { recursive: true });
const evidencePattern = /\b(motion\.|animate=|initial=|while(?:Hover|Tap|InView|Focus|Drag|Pan|Press|Edit)|transition=|variants=|on(?:Mouse|Pointer|Touch|Click|Drag|Hover)|requestAnimationFrame|set(?:Timeout|Interval)|keyframes?|animationName|transform:|@keyframes|useSpring|useMotionValue|useAnimate|useInView|useScroll|useVelocity)\b/i;

const mapLimit = async (values, limit, fn) => {
  const output = new Array(values.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (cursor < values.length) {
      const index = cursor++;
      output[index] = await fn(values[index]);
    }
  }));
  return output;
};

const records = await mapLimit(catalog.components, 8, async (item) => {
  const result = { name: item.name, title: item.title, url: item.sourceUrl, status: 'source-fetch-failed', evidence: [] };
  try {
    const relative = item.sourceUrl?.split('/main/').at(-1) || `apps/www/registry/magicui/${item.name}.tsx`;
    const localFile = path.join('.magicui-source', relative);
    let source;
    let origin;
    try {
      source = await fs.readFile(localFile, 'utf8');
      origin = 'checked-out-current-source';
    } catch {
      const repoPath = `apps/www/registry/magicui/${item.name}.tsx`;
      const hash = execFileSync('git', ['-c', 'safe.directory=C:/flozio-site-light/.magicui-source', '-C', '.magicui-source', 'log', '--all', '-1', '--format=%H', '--', repoPath], { encoding: 'utf8' }).trim();
      if (!hash) throw new Error(`No current or historical source file: ${repoPath}`);
      source = execFileSync('git', ['-c', 'safe.directory=C:/flozio-site-light/.magicui-source', '-C', '.magicui-source', 'show', `${hash}:${repoPath}`], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      origin = `historical-source:${hash.slice(0, 12)}`;
    }
    const filename = path.join(root, `${item.name}.tsx`);
    await fs.writeFile(filename, source);
    const lines = source.split(/\r?\n/);
    result.status = 'source-reviewed';
    result.origin = origin;
    result.path = filename.replaceAll('\\', '/');
    result.bytes = Buffer.byteLength(source);
    result.sha256 = crypto.createHash('sha256').update(source).digest('hex');
    result.evidence = lines.flatMap((line, index) => evidencePattern.test(line)
      ? [{ line: index + 1, text: line.trim().slice(0, 240) }]
      : []);
  } catch (error) {
    result.error = String(error).slice(0, 240);
  }
  return result;
});

const repoCommit = execFileSync('git', ['-c', 'safe.directory=C:/flozio-site-light/.magicui-source', '-C', '.magicui-source', 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const payload = {
  source: { ...catalog.source, sourceRepositoryCommit: repoCommit },
  generatedAt: new Date().toISOString(),
  fetchedCount: records.filter((item) => item.status === 'source-reviewed').length,
  failedCount: records.filter((item) => item.status !== 'source-reviewed').length,
  components: records,
};
await fs.writeFile('.magicui-source/source-motion-evidence.json', `${JSON.stringify(payload, null, 2)}\n`);
for (const item of records) console.log(`${item.status}\t${item.name}\t${item.evidence?.length ?? 0} motion/source markers`);
console.log(`Fetched ${payload.fetchedCount}/${records.length} current source files. Evidence: .magicui-source/source-motion-evidence.json`);
