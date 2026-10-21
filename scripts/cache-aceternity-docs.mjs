import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "component-research", "aceternity", "catalog.json");
const cacheRoot = path.join(root, ".component-lab-cache", "aceternity");
const docsRoot = path.join(cacheRoot, "docs");
const examplesRoot = path.join(cacheRoot, "examples");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const components = catalog.items.filter((item) => item.kind === "component");
const concurrency = 6;
let nextIndex = 0;
let completed = 0;
const failures = [];

await Promise.all([fs.mkdir(docsRoot, { recursive: true }), fs.mkdir(examplesRoot, { recursive: true })]);

function getRawStrings(html) {
  const found = [];
  const pattern = /__rawString__:"((?:\\.|[^"\\])*)"/g;
  for (const match of html.matchAll(pattern)) {
    const encoded = match[1].replace(/\\x3c/gi, "<").replace(/\\x3e/gi, ">");
    try {
      found.push(JSON.parse(`"${encoded}"`));
    } catch {
      // Keep scanning the rest of the page; one non-JSON escape should not hide its other examples.
    }
  }
  return found;
}

function findComponentExamples(strings, item) {
  const slugs = new Set([
    item.name,
    ...item.files.map((file) => path.basename(file.path ?? "", path.extname(file.path ?? ""))),
    ...(item.docsUrlAlias ? [new URL(item.docsUrlAlias).pathname.split("/").at(-1)] : []),
  ].filter(Boolean));
  const patterns = [...slugs].map((slug) => {
    const escaped = slug.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
    return new RegExp(`from\\s+["'](?:(?:\\.{1,2}/)+ui/|@/components/ui/|@/ui/)${escaped}["']`);
  });
  return strings.filter((source) => patterns.some((pattern) => pattern.test(source)));
}

async function auditComponent(item) {
  if (!item.docsUrl) {
    item.docsStatus = "no-public-docs-route";
    item.exampleStatus = "registry-source-only";
    item.exampleCount = 0;
    item.exampleHashes = [];
    return;
  }
  const cachedHtmlPath = path.join(docsRoot, `${item.name}.html`);
  let html = null;
  if (item.docsStatus === "http-200") {
    try { html = await fs.readFile(cachedHtmlPath, "utf8"); } catch {}
  }
  if (!html) {
    const response = await fetch(item.docsUrl, {
      headers: { accept: "text/html" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`docs HTTP ${response.status}`);
    html = await response.text();
    await fs.writeFile(cachedHtmlPath, html);
  }
  const strings = getRawStrings(html);
  const examples = findComponentExamples(strings, item);
  const sourceHashes = [];
  for (let index = 0; index < examples.length; index += 1) {
    const source = examples[index];
    const filename = `${item.name}${examples.length > 1 ? `-${index + 1}` : ""}.tsx`;
    await fs.writeFile(path.join(examplesRoot, filename), `${source}\n`);
    sourceHashes.push(crypto.createHash("sha256").update(source).digest("hex"));
  }
  item.docsStatus = "http-200";
  item.docsHtmlBytes = Buffer.byteLength(html);
  item.exampleStatus = examples.length ? "official-example-source-extracted" : "official-example-source-not-found";
  item.exampleCount = examples.length;
  item.exampleHashes = sourceHashes;
  return examples.length;
}

async function worker() {
  while (true) {
    const index = nextIndex++;
    if (index >= components.length) return;
    const item = components[index];
    try {
      await auditComponent(item);
    } catch (error) {
      item.docsStatus = "fetch-failed";
      item.docsError = error.message;
      item.exampleStatus = "not-audited";
      item.exampleCount = 0;
      item.exampleHashes = [];
      failures.push({ id: item.id, error: error.message });
    }
    completed += 1;
    if (completed % 12 === 0 || completed === components.length) {
      console.log(`Audited ${completed}/${components.length} official component docs routes.`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
catalog.docsAudit = {
  retrievedAt: new Date().toISOString(),
  componentCount: components.length,
  docsOkCount: components.filter((item) => item.docsStatus === "http-200").length,
  exampleSourceCount: components.filter((item) => item.exampleCount > 0).length,
  extractedExampleCount: components.reduce((sum, item) => sum + item.exampleCount, 0),
  failures,
  localCache: ".component-lab-cache/aceternity/docs and .component-lab-cache/aceternity/examples",
};
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Docs available: ${catalog.docsAudit.docsOkCount}/${components.length}.`);
console.log(`Components with official example source: ${catalog.docsAudit.exampleSourceCount}/${components.length} (${catalog.docsAudit.extractedExampleCount} examples).`);
console.log(`Recorded results in ${path.relative(root, catalogPath)}.`);
if (failures.length) process.exitCode = 1;
