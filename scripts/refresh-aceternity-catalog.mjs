import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryUrl = "https://ui.aceternity.com/registry/index.json";
const outputPath = path.join(root, "component-research", "aceternity", "catalog.json");
const docAliases = {
  "3d-card": "3d-card-effect",
  "cover": "container-cover",
  "globe": "github-globe",
  "glowing-stars": "glowing-stars-effect",
  "lamp": "lamp-effect",
  "parallax-scroll-2": "parallax-scroll",
  "shooting-stars": "shooting-stars-and-stars-background",
  "stars-background": "shooting-stars-and-stars-background",
};
const noStandaloneDocs = new Set(["grid", "input", "label", "moving-line"]);
let previousCatalog = null;
try {
  previousCatalog = JSON.parse(await fs.readFile(outputPath, "utf8"));
} catch {}
const previousItems = new Map((previousCatalog?.items ?? []).map((item) => [item.name, item]));

function titleFromSlug(value) {
  return value
    .split("-")
    .map((part) => part ? part[0].toUpperCase() + part.slice(1) : part)
    .join(" ");
}

const response = await fetch(registryUrl, {
  headers: { accept: "application/json" },
  signal: AbortSignal.timeout(30_000),
});
if (!response.ok) throw new Error(`Aceternity registry request failed: HTTP ${response.status}`);

const raw = await response.text();
let index;
try {
  index = JSON.parse(raw);
} catch (error) {
  throw new Error(`Aceternity registry did not return JSON: ${error.message}`);
}
if (!Array.isArray(index.items)) throw new Error("Aceternity registry index has no items array.");

const items = index.items.map((item) => {
  const name = String(item.name ?? "");
  if (!name) throw new Error("Aceternity registry item is missing its name.");
  const registryType = String(item.type ?? "unknown");
  const registryKind = registryType.startsWith("registry:") ? registryType.slice("registry:".length) : registryType;
  const files = Array.isArray(item.files)
    ? item.files.map((file) => ({ path: file.path ?? null, type: file.type ?? null, target: file.target ?? null }))
    : [];
  const previous = previousItems.get(name);
  const docsSlug = docAliases[name] ?? name;
  const docsUrl = noStandaloneDocs.has(name) ? null : registryKind === "ui"
    ? `https://ui.aceternity.com/components/${docsSlug}`
    : null;

  return {
    id: `aceternity/${name}`,
    name,
    title: item.title ?? titleFromSlug(name),
    description: item.description ?? null,
    kind: item.meta?.kind === "page" || files.some((file) => file.type === "registry:page")
      ? "page"
      : registryKind === "ui" ? "component" : registryKind === "block" ? "block" : registryKind,
    registryType,
    docsUrl,
    docsUrlAlias: docsSlug !== name ? `https://ui.aceternity.com/components/${docsSlug}` : null,
    catalogRole: noStandaloneDocs.has(name) ? "registry-supporting-primitive-or-source-only-item" : "catalog-item",
    registryUrl: `https://ui.aceternity.com/registry/${name}.json`,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files,
    meta: item.meta ? {
      kind: item.meta.kind ?? null,
      sections: item.meta.sections ?? [],
    } : null,
    availability: item.meta?.kind === "page"
      ? "page-availability-needs-check"
      : registryKind === "ui" ? "listed-in-public-components-catalog" : "free-pro-status-needs-check",
    licenseStatus: previous?.licenseStatus ?? "official-terms-need-scope-check",
    reviewStatus: previous?.reviewStatus ?? "discovered",
    fit: previous?.fit ?? "unreviewed",
    ...(previous?.sourceHash ? { sourceHash: previous.sourceHash, sourceStatus: previous.sourceStatus } : {}),
    ...(previous?.sourceError ? { sourceError: previous.sourceError } : {}),
    ...(previous?.docsStatus ? { docsStatus: previous.docsStatus } : {}),
    ...(previous?.docsHtmlBytes ? { docsHtmlBytes: previous.docsHtmlBytes } : {}),
    ...(previous?.exampleStatus ? { exampleStatus: previous.exampleStatus } : {}),
    ...(previous?.exampleCount ? { exampleCount: previous.exampleCount, exampleHashes: previous.exampleHashes } : {}),
    ...(previous?.research ? { research: previous.research } : {}),
  };
});

const byKind = Object.fromEntries(
  [...new Set(items.map((item) => item.kind))].sort().map((kind) => [kind, items.filter((item) => item.kind === kind).length]),
);
const catalog = {
  library: "Aceternity UI",
  homepage: index.homepage ?? "https://ui.aceternity.com",
  registryIndexUrl: registryUrl,
  licenseUrl: "https://ui.aceternity.com/licence",
  retrievedAt: new Date().toISOString(),
  inventorySha256: crypto.createHash("sha256").update(raw).digest("hex"),
  itemCount: items.length,
  countsByKind: byKind,
  note: "Metadata-only inventory. Restricted implementation source must stay in the ignored local component-lab cache; do not commit registry source or demo assets.",
  ...(previousCatalog?.sourceCache ? { sourceCache: previousCatalog.sourceCache } : {}),
  items,
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Wrote ${items.length} Aceternity registry entries to ${path.relative(root, outputPath)}.`);
console.log(`Kinds: ${Object.entries(byKind).map(([kind, count]) => `${kind}=${count}`).join(", ")}`);
console.log(`Inventory SHA-256: ${catalog.inventorySha256}`);
