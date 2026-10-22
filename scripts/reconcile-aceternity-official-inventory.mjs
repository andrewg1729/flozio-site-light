import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "component-research/aceternity/catalog.json");
const htmlPath = path.join(root, ".component-lab-cache/aceternity/ai-recommendations.html");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const html = await fs.readFile(htmlPath, "utf8");
const jsonLdBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));
const official = jsonLdBlocks.flatMap((value) => value["@graph"] ?? value.hasPart ?? [value])
  .filter((value) => value["@type"] === "SoftwareSourceCode");
const unescape = (value) => value.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(([article]) => {
  const name = article.match(/<dt[^>]*>Component Name<\/dt>\s*<dd[^>]*>([^<]+)<\/dd>/)?.[1]?.trim();
  const categories = article.match(/<dt[^>]*>Categories<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/)?.[1] ?? "";
  return {
    name,
    title: unescape(article.match(/itemProp="name">([^<]+)</)?.[1] ?? ""),
    description: unescape(article.match(/itemProp="description">([^<]+)</)?.[1] ?? ""),
    categories: [...categories.matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map((match) => unescape(match[1]).trim().toLowerCase()),
    docsUrl: article.match(/itemProp="url" href="([^"]+)"/)?.[1] ?? null,
  };
}).filter((value) => value.name);
const articleByName = new Map(articles.map((value) => [value.name, value]));
const originalByName = new Map(catalog.items.map((item) => [item.name, item]));
const normalized = official.map((item) => {
  const tier = item.tier ?? "unknown";
  const officialName = item.name;
  const name = tier === "pro-template"
    ? officialName.split("/").at(-1)
    : (tier === "pro-block" ? officialName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : officialName);
  const old = originalByName.get(name);
  const article = articleByName.get(name);
  const isBlockCategory = tier === "pro" && officialName.startsWith("/blocks/");
  const kind = tier === "free" ? "component" : isBlockCategory ? "block-category" : tier === "pro" ? "component" : tier === "pro-template" ? "template" : tier === "pro-block" ? "block" : "unknown";
  const url = article?.docsUrl ?? item.url ?? old?.docsUrl ?? ((tier === "free" || tier === "pro") ? `https://ui.aceternity.com/components/${name}` : null);
  const paid = tier !== "free";
  return {
    ...(old ?? {}),
    id: old?.id ?? `aceternity/${name}`,
    name,
    title: article?.title || old?.title || (tier === "pro-block" ? officialName : name.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ")),
    description: article?.description || item.description || old?.description || "Official item listed in Aceternity's AI recommendations; public description metadata was not provided.",
    kind,
    docsUrl: url,
    registryUrl: old?.registryUrl ?? null,
    dependencies: item.dependencies ?? old?.dependencies ?? [],
    officialCategories: article?.categories ?? (item.category ? [item.category.toLowerCase()] : old?.officialCategories ?? []),
    officialTier: tier,
    officialName,
    availability: isBlockCategory ? "pro-block-category-not-individual-component" : paid ? "paid-source-access-required-not-imported" : "free-public-component-registry",
    licenseStatus: paid ? "official-license-applies-source-access-required-redistribution-restricted" : (old?.licenseStatus ?? "official-aceternity-license-reviewed-local-only-source"),
    sourceStatus: old?.sourceStatus ?? (paid ? "not-imported-paid-access-required" : "official-source-not-located-in-registry-cache"),
    reviewStatus: isBlockCategory ? "category-not-component-source-record" : paid ? "blocked-paid-source-access-required" : (old?.reviewStatus === "blocked-paid-source-access-required" ? "discovered" : (old?.reviewStatus ?? "discovered")),
    fit: paid ? "unreviewed-paid-access-required" : (old?.fit ?? "unreviewed"),
    officialDescription: item.description ?? article?.description ?? old?.description ?? null,
    officialDependencies: item.dependencies ?? old?.dependencies ?? [],
    review: isBlockCategory ? {
      status: "category-not-component-source-record",
      sourceRead: false,
      visualInspected: false,
      motionInspected: false,
      variants: [],
      motionSignals: [],
      reviewNotes: ["The official AI catalog labels this /blocks/ index entry as tier pro, while listing it among 23 Pro components. Its path identifies a block-category page, not an individual component source; it is retained as a taxonomy record and not counted as a component preview."],
    } : paid ? {
      status: "blocked-paid-source-access-required",
      sourceRead: false,
      visualInspected: false,
      motionInspected: false,
      variants: [],
      motionSignals: [],
      reviewNotes: ["Listed in the official Aceternity AI recommendations index as paid. Source and live example were not accessible from the public free registry; requires authorized access before review."],
    } : old?.review,
    searchTags: [...new Set([...(old?.searchTags ?? []), ...(article?.categories ?? []), ...(paid ? ["access:paid", "review:blocked-paid-access"] : [])])].sort(),
    officialDocsUrl: url,
    officialSourceRecord: true,
  };
});
const officialNames = new Set(normalized.map((item) => item.name));
const registryOnlyRecords = catalog.items.filter((item) => !item.officialSourceRecord && !officialNames.has(item.name));
catalog.items = [...normalized, ...registryOnlyRecords];
catalog.itemCount = catalog.items.length;
catalog.countsByKind = Object.fromEntries([...new Set(catalog.items.map((item) => item.kind))].sort().map((kind) => [kind, catalog.items.filter((item) => item.kind === kind).length]));
catalog.officialCatalogAudit = {
  officialIndexUrl: "https://ui.aceternity.com/ai-recommendations",
  retrievedAt: "2026-10-21",
  officialRecordCount: official.length,
  recordsByTier: Object.fromEntries([...new Set(official.map((item) => item.tier ?? "unknown"))].sort().map((tier) => [tier, official.filter((item) => item.tier === tier).length])),
  reconciledManifestRecords: normalized.length,
  retainedRegistryOnlyRecords: registryOnlyRecords.length,
  registryOnlyByKind: Object.fromEntries([...new Set(registryOnlyRecords.map((item) => item.kind))].sort().map((kind) => [kind, registryOnlyRecords.filter((item) => item.kind === kind).length])),
    note: "The official AI page reports 114 free components, 23 Pro components, 17 templates, 182 Pro blocks, and 1 hook. Its 23 Pro-tier JSON-LD names are /blocks/ category paths rather than individual component sources, so they are retained as category records and the claimed Pro-component list is unresolved. One hook is counted in the page summary but not itemized in its SoftwareSourceCode records. Paid blocks/templates are inventoried but cannot be source-reviewed without authorized access. Fifteen additional registry-only block/page entries do not appear in the AI index and remain separately unresolved.",
};
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(JSON.stringify(catalog.officialCatalogAudit, null, 2));
