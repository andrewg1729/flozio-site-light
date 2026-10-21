import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "component-research", "aceternity", "catalog.json");
const cacheRoot = path.join(root, ".component-lab-cache", "aceternity", "registry");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const components = catalog.items.filter((item) => item.kind === "component");
const concurrency = 6;
const failures = [];
let nextIndex = 0;
let completed = 0;

await fs.mkdir(cacheRoot, { recursive: true });

async function cacheItem(item) {
  const response = await fetch(item.registryUrl, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const raw = await response.text();
  const data = JSON.parse(raw);
  if (!Array.isArray(data.files) || data.files.length === 0) throw new Error("registry record has no source files");
  const pathName = path.join(cacheRoot, `${item.name}.json`);
  await fs.writeFile(pathName, `${JSON.stringify(data, null, 2)}\n`);
  return crypto.createHash("sha256").update(raw).digest("hex");
}

async function worker() {
  while (true) {
    const index = nextIndex++;
    if (index >= components.length) return;
    const item = components[index];
    try {
      item.sourceHash = await cacheItem(item);
      item.sourceStatus = "cached-locally-not-redistributed";
    } catch (error) {
      item.sourceHash = null;
      item.sourceStatus = "fetch-failed";
      item.sourceError = error.message;
      failures.push({ id: item.id, error: error.message });
    }
    completed += 1;
    if (completed % 12 === 0 || completed === components.length) {
      console.log(`Cached ${completed}/${components.length} official component registry records.`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
catalog.sourceCache = {
  retrievedAt: new Date().toISOString(),
  directory: ".component-lab-cache/aceternity/registry",
  redistribution: "not-permitted-by-default; local-only cache, do not commit or publish source",
  componentCount: components.length,
  cachedCount: components.filter((item) => item.sourceStatus === "cached-locally-not-redistributed").length,
  failures,
};
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Saved metadata and source hashes to ${path.relative(root, catalogPath)}.`);
if (failures.length) process.exitCode = 1;
