import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const registryUrl = "https://raw.githubusercontent.com/magicuidesign/magicui/main/registry.json";
const llmsUrl = "https://magicui.design/llms.txt";
const rawBase = "https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/";

async function get(url) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "Flozio-Component-Lab-catalog-audit" } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return { response, body: await response.text() };
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  throw new Error(`${url}: ${lastError}`);
}

async function mapLimit(items, limit, fn) {
  const output = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await fn(items[index], index);
    }
  }));
  return output;
}

function parseMarkdownLinks(section, basePattern) {
  const rows = [];
  for (const line of section.split(/\r?\n/)) {
    const match = line.match(basePattern);
    if (match) rows.push(match.slice(1));
  }
  return rows;
}

function extractProps(source) {
  if (!source) return [];
  const file = ts.createSourceFile("component.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found = [];
  const visit = (node) => {
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && /Props$/.test(node.name.text)) {
      const members = ts.isInterfaceDeclaration(node)
        ? node.members
        : ts.isTypeLiteralNode(node.type) ? node.type.members : [];
      for (const member of members) {
        if (!ts.isPropertySignature(member) || !member.name) continue;
        const name = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name) ? member.name.text : member.name.getText(file);
        found.push({
          name,
          optional: Boolean(member.questionToken),
          type: member.type ? member.type.getText(file).replace(/\s+/g, " ").trim() : "unknown",
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}

function matchingComponent(exampleName, components) {
  const base = path.basename(exampleName, path.extname(exampleName)).toLowerCase().replace(/-demo(?:-\d+)?$/, "");
  const alias = base.startsWith("bento-") || base === "bento" ? "bento-grid" : base.startsWith("iphone") ? "iphone-15-pro" : null;
  if (alias) return components.find((component) => component.name === alias)?.name ?? null;
  const candidates = components
    .map((component) => ({ component, slug: component.name.toLowerCase() }))
    .sort((a, b) => b.slug.length - a.slug.length);
  const match = candidates.find(({ slug }) => base === slug || base.startsWith(`${slug}-`));
  return match?.component.name ?? null;
}

const [{ body: registryText }, { body: llmsText }] = await Promise.all([get(registryUrl), get(llmsUrl)]);
const registry = JSON.parse(registryText);
const components = registry.items.filter((item) => item.type === "registry:ui");
const componentsSection = llmsText.split("## Components")[1]?.split("## Examples")[0] ?? "";
const examplesSection = llmsText.split("## Examples")[1] ?? "";
const docsLinks = parseMarkdownLinks(componentsSection, /^- \[([^\]]+)\]\((https:\/\/magicui\.design\/docs\/components\/[^)]+)\):?\s*(.*)$/);
const docsByName = new Map(docsLinks.map(([title, url, description]) => [title.trim().toLowerCase(), { url, description: description.trim() }]));
const docsBySlug = new Map(docsLinks.map(([, url, description]) => [url.split("/").at(-1), { url, description: description.trim() }]));
const exampleLinks = parseMarkdownLinks(examplesSection, /^- \[([^\]]+)\]\((https:\/\/github\.com\/magicuidesign\/magicui\/blob\/main\/example\/[^)]+)\):\s*Example usage$/);

const scrapedComponents = await mapLimit(components, 8, async (item) => {
  const title = item.title || item.name.replace(/(^|-)([a-z])/g, (_, dash, letter) => `${dash ? " " : ""}${letter.toUpperCase()}`);
  const documented = (item.name === "client-tweet-card" ? docsBySlug.get("tweet-card") : null)
    ?? (item.name === "iphone-15-pro" ? docsBySlug.get("iphone") : null)
    ?? docsByName.get(title.toLowerCase())
    ?? docsBySlug.get(item.name);
  const docsUrl = documented?.url ?? "https://magicui.design/docs/components";
  const file = item.files?.find((candidate) => candidate.path.endsWith(".tsx"));
  let source = "";
  let sourceUrl = file ? `${rawBase}${file.path}` : null;
  let sourceStatus = "unavailable";
  if (sourceUrl) {
    try {
      const result = await get(sourceUrl);
      source = result.body;
      sourceStatus = "ok";
    } catch (error) {
      sourceStatus = String(error).slice(0, 160);
    }
  }
  if (!source) {
    const registryItemUrl = `https://magicui.design/r/${item.name}.json`;
    try {
      const { body } = await get(registryItemUrl);
      const publishedItem = JSON.parse(body);
      const componentFile = publishedItem.files?.find((candidate) => candidate.path?.endsWith(".tsx"));
      if (componentFile?.content) {
        source = componentFile.content;
        sourceUrl = registryItemUrl;
        sourceStatus = "ok-registry";
      }
    } catch (error) {
      sourceStatus = String(error).slice(0, 160);
    }
  }
  let docsStatus = documented ? "listed" : "unverified";
  try {
    const response = await fetch(docsUrl, { method: "HEAD", redirect: "follow", headers: { "user-agent": "Flozio-Component-Lab-catalog-audit" } });
    docsStatus = `${response.status}`;
  } catch (error) {
    docsStatus = `unverified: ${String(error).slice(0, 100)}`;
  }
  return {
    name: item.name,
    title,
    description: item.description ?? documented?.description ?? "",
    category: "Component",
    docsUrl,
    docsStatus,
    registryUrl: `https://magicui.design/r/${item.name}.json`,
    sourceUrl,
    sourceStatus,
    importPath: source ? `@/components/magicui/${item.name}` : null,
    installCommand: source ? `npx shadcn@latest add @magicui/${item.name}` : null,
    dependencies: item.dependencies ?? [],
    props: extractProps(source),
  };
});

const registeredDocSlugs = new Set(scrapedComponents.map((item) => item.docsUrl.split("/").at(-1)));
const docsOnlyComponents = docsLinks
  .map(([title, url, description]) => ({ title: title.trim(), url, description: description.trim(), slug: url.split("/").at(-1) }))
  .filter((item) => !registeredDocSlugs.has(item.slug) && !scrapedComponents.some((component) => component.name === item.slug))
  .map((item) => ({
    name: item.slug,
    title: item.title,
    description: item.description,
    category: "Component",
    docsUrl: item.url,
    docsStatus: "listed",
    registryUrl: null,
    sourceUrl: null,
    sourceStatus: "docs-only",
    importPath: null,
    installCommand: null,
    dependencies: [],
    props: [],
  }));
const allComponents = [...scrapedComponents, ...docsOnlyComponents];

const examples = await mapLimit(exampleLinks, 10, async ([name, url]) => {
  const filePath = decodeURIComponent(url.split("/blob/main/")[1] ?? "");
  const rawUrl = filePath ? `${rawBase}registry/${filePath}` : null;
  let sourceStatus = "unavailable";
  if (rawUrl) {
    try { await get(rawUrl); sourceStatus = "ok"; } catch (error) { sourceStatus = String(error).slice(0, 160); }
  }
  return { name, url, rawUrl, component: matchingComponent(filePath, allComponents), sourceStatus };
});

const catalog = {
  source: {
    registryUrl,
    docsUrl: "https://magicui.design/docs/components",
    llmsUrl,
    scrapedAt: new Date().toISOString(),
  registryComponentCount: scrapedComponents.length,
  registrySourceCount: scrapedComponents.filter((item) => item.sourceStatus.startsWith("ok")).length,
  staleRegistryEntryCount: scrapedComponents.filter((item) => !item.sourceStatus.startsWith("ok")).length,
  documentedComponentCount: docsLinks.length,
  componentEntryCount: allComponents.length,
    officialExampleCount: examples.length,
    note: "The registry count is installable UI components. Examples are additional official variants/demos and are listed separately.",
  },
  components: allComponents,
  examples,
};

const output = path.join(root, "public", "magicui-catalog.json");
await fs.writeFile(output, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
console.log(`Wrote ${output}`);
console.log(`Registry UI components: ${scrapedComponents.length}`);
console.log(`Component entries across registry and docs: ${allComponents.length}`);
console.log(`Official example files: ${examples.length}`);
console.log(`Components with source: ${scrapedComponents.filter((item) => item.sourceStatus.startsWith("ok")).length}`);
console.log(`Examples with source: ${examples.filter((item) => item.sourceStatus === "ok").length}`);
console.log(`Docs pages listed by official index: ${docsLinks.length}`);
