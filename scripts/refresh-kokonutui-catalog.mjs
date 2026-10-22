import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, ".component-lab-cache/kokonutui-source");
const require = createRequire(path.join(sourceRoot, "package.json"));
const ts = require("typescript");
const registry = JSON.parse(await fs.readFile(path.join(sourceRoot, "registry.json"), "utf8"));
const commit = (await fs.readFile(path.join(sourceRoot, ".git/refs/heads/main"), "utf8").catch(async () => {
  const head = (await fs.readFile(path.join(sourceRoot, ".git/HEAD"), "utf8")).trim();
  if (!head.startsWith("ref: ")) return head;
  return fs.readFile(path.join(sourceRoot, ".git", head.slice(5)), "utf8");
})).trim();
const safeSourceRoot = sourceRoot.replaceAll("\\", "/");
function readPinnedSource(sourcePath) {
  return execFileSync("git", ["-c", `safe.directory=${safeSourceRoot}`, "show", `${commit}:${sourcePath}`], { cwd: sourceRoot, encoding: "utf8" });
}

const localRuntimeOverrides = {
  "focal-point-picker": "The demo's official Unsplash crop is mirrored in the ignored public cache because the sandbox blocks remote image requests; interaction code remains unchanged.",
  "photo-straighten": "The demo's official Unsplash crop is mirrored in the ignored public cache because the sandbox blocks remote image requests; interaction code remains unchanged.",
  "clip-trimmer": "The demo's official Unsplash crop is mirrored in the ignored public cache because the sandbox blocks remote image requests; interaction code remains unchanged.",
  "lightbox-grid": "The six official Unsplash demo crops are mirrored in the ignored public cache because the sandbox blocks remote image requests; interaction code remains unchanged.",
};

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.name.endsWith(".mdx")) files.push(absolute);
  }
  return files;
}

const mdxFiles = await walk(path.join(sourceRoot, "content/docs"));
const docsBySlug = new Map(mdxFiles.map((file) => [path.basename(file, ".mdx"), file]));
const entries = [];
for (const item of registry.items.filter((entry) => entry.type === "registry:component")) {
  const sourceFiles = [];
  const sourceContents = [];
  for (const file of item.files ?? []) {
    const content = readPinnedSource(file.path);
    sourceContents.push(content);
    sourceFiles.push({ path: file.path, sha256: crypto.createHash("sha256").update(content).digest("hex"), bytes: Buffer.byteLength(content) });
  }
  const sourceHash = crypto.createHash("sha256").update(sourceFiles.map((file) => `${file.path}:${file.sha256}`).join("\n")).digest("hex");
  const sourceText = sourceContents.join("\n");
  const docsFile = docsBySlug.get(item.name);
  if (!docsFile) throw new Error(`Official docs page not found for registry component ${item.name}.`);
  const docs = await fs.readFile(docsFile, "utf8");
  const frontmatter = docs.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  const readString = (key) => frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim().replace(/^['"]|['"]$/g, "") ?? null;
  const title = readString("title") ?? item.title ?? item.name;
  const description = readString("description") ?? item.description ?? "";
  const previewStart = docs.search(/<Preview(?:Client)?\b/);
  const previewOffset = previewStart < 0 ? 0 : previewStart + (docs.slice(previewStart).search(/<\/Preview(?:Client)?>/) ?? 0);
  const officialNotes = docs.slice(previewOffset).replace(/^import\s+.*$/gm, " ").replace(/^\s*#{1,6}\s*/gm, "").replace(/^\|.*\|\s*$/gm, " ").replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`_]/g, "").replace(/\s+/g, " ").trim().slice(0, 5000);
  let keywords = [];
  const rawKeywords = frontmatter.match(/^keywords:\s*(\[[^\n]*\])\s*$/m)?.[1];
  if (rawKeywords) {
    try { keywords = JSON.parse(rawKeywords); } catch {}
  }
  const previewBlocks = [...docs.matchAll(/<Preview(?:Client)?\b[^>]*>([\s\S]*?)<\/Preview(?:Client)?>/g)];
  if (previewBlocks.length !== 1) throw new Error(`${item.name} has ${previewBlocks.length} official preview wrappers; expected one preview route. Inspect and account for each explicitly.`);
  const previewBody = previewBlocks[0][1];
  const componentImport = [...docs.matchAll(/import\s+([\w$]+)\s+from\s+["']@\/components\/kokonutui\/([^"']+)["']/g)]
    .find((match) => match[2] === item.name);
  let instances = [];
  const readInstances = (text, componentName, demoFile) => [...text.matchAll(new RegExp(`<${componentName}(?=[\\s/>])`, "g"))].map((match, index) => {
    const end = text.indexOf(">", match.index);
    return { source: text.slice(match.index, end < 0 ? match.index : end + 1), index, ...(demoFile ? { demoFile } : {}) };
  });
  if (componentImport) {
    const [, componentName] = componentImport;
    instances = readInstances(previewBody, componentName);
  }
  if (instances.length === 0) {
    const demoImport = [...docs.matchAll(/import\s+([\w$]+)\s+from\s+["']@\/components\/mdx\/demos\/([^"']+)["']/g)][0];
    if (demoImport) {
      const demoFile = path.join(sourceRoot, "components/mdx/demos", `${demoImport[2]}.tsx`);
      const demo = await fs.readFile(demoFile, "utf8");
      const sourceImport = [...demo.matchAll(/import\s+([\w$]+)(?:\s*,\s*\{[^}]*\})?\s+from\s+["']@\/components\/kokonutui\/([^"']+)["']/gs)]
        .find((match) => match[2] === item.name);
      if (sourceImport) {
        const [, componentName] = sourceImport;
        instances = readInstances(demo, componentName, path.relative(sourceRoot, demoFile).replaceAll("\\\\", "/"));
      }
    }
  }
  if (instances.length < 1) throw new Error(`${item.name} has no counted instance in its official preview; inspect its documented MDX and demo wrapper.`);
  const variants = instances.map(({ source, index, demoFile }) => {
    const attrs = [...source.matchAll(/([\w-]+)=(?:"([^"]*)"|\{([^}]+)\})/g)].map((match) => `${match[1]}=${match[2] ?? `{${match[3]}}`}`);
    return {
      id: `${item.name}#${index + 1}`,
      title: attrs.slice(0, 2).join(" · ") || `Published example ${index + 1}`,
      docsRoute: docsRouteFor(item.name),
      previewWrapper: "official-preview",
      source: source.trim(),
      ...(demoFile ? { demoFile } : {}),
      status: "pending-review",
    };
  });
  const relativeDocsPath = path.relative(path.join(sourceRoot, "content/docs"), docsFile).replaceAll("\\", "/").replace(/\.mdx$/, "");
  const docsRoute = `/docs/${relativeDocsPath}`;
  const category = relativeDocsPath.split("/")[0];
  const sourceSignals = {
    imports: [...new Set([...sourceText.matchAll(/^import\s+(?:type\s+)?(?:[\w$]+|\{[^}]+\})\s+from\s+["']([^"']+)["']/gm)].map((match) => match[1]))],
    eventHandlers: [...new Set([...sourceText.matchAll(/\b(on[A-Z][A-Za-z]+)\s*=/g)].map((match) => match[1]))].sort(),
    nativeEvents: [...new Set([...sourceText.matchAll(/\.addEventListener\(\s*["']([^"']+)["']/g)].map((match) => match[1]))].sort(),
    animationPrimitives: [...new Set([
      ...(sourceText.match(/\b(?:motion\.[a-zA-Z]+|useMotionValue|useSpring|useTransform|useAnimate|animate\(|spring\()/g) ?? []),
      ...(sourceText.match(/\b(?:requestAnimationFrame|setInterval|setTimeout|ResizeObserver|IntersectionObserver)\b/g) ?? []),
      ...(sourceText.match(/\b(?:transition|animation|animate|animate-ping|animate-spin|animate-pulse|animate-bounce)(?=[:\s\]])/g) ?? []),
    ])].sort(),
    usesCanvas: /<canvas\b|\bgetContext\(/.test(sourceText),
    usesSvg: /<svg\b/.test(sourceText),
    reducedMotionHandling: /prefers-reduced-motion|useReducedMotion|reducedMotion/.test(sourceText),
    externalReferences: [...new Set(sourceText.match(/https?:\/\/[^\s"'`)}<>]+/g) ?? [])],
    assetProps: [...new Set([...sourceText.matchAll(/(?:src|poster|backgroundImage|image)\s*[:=]\s*(?:\{[^}]*?\b([^\s"'`)}<>]+)|["']([^"']+)["'])/g)].map((match) => match[1] ?? match[2]).filter((value) => value && !value.startsWith("data:")))],
    cssOrTailwindMotion: [...new Set(sourceText.match(/(?:duration|ease|animate|transition|motion-safe|motion-reduce)[-:\w\[\]./%]*/g) ?? [])].slice(0, 32),
  };
  const propTableText = docs.match(/\|\s*Prop\s*\|\s*Type\s*\|\s*Default\s*\|\s*Description\s*\|\s*\r?\n((?:\|[^\r\n]*\|\s*\r?\n)+)/i)?.[1] ?? "";
  const documentedProps = propTableText.split(/\r?\n/).filter((line) => line.trim().startsWith("|")).map((line) => {
    const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
    return { name: cells[0] ?? "", type: cells[1] ?? "", default: cells[2] ?? "", description: cells.slice(3).join(" | ") };
  }).filter((row) => row.name && !/^[-:]+$/.test(row.name));
  const sourceProps = [];
  for (const source of sourceContents) {
    const ast = ts.createSourceFile("component.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node) => {
      const name = node.name?.text ?? "";
      const members = ts.isInterfaceDeclaration(node) ? node.members : ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type) ? node.type.members : [];
      if (members.length && /(?:props|options|config)$/i.test(name)) {
        for (const member of members) {
          if (!ts.isPropertySignature(member)) continue;
          const propName = member.name?.getText(ast).replace(/^['"]|['"]$/g, "") ?? "";
          sourceProps.push({ name: propName, type: member.type?.getText(ast) ?? "unknown", optional: Boolean(member.questionToken), description: ts.getJSDocCommentsAndTags(member).map((tag) => typeof tag.comment === "string" ? tag.comment : ts.displayPartsToString(tag.comment ?? [])).join(" ") });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(ast);
  }
  entries.push({
    id: `kokonutui/${item.name}`,
    name: item.name,
    title,
    description,
    officialNotes,
    kind: "component",
    category,
    officialTier: "free",
    availability: "free-public-registry",
    licenseStatus: "MIT",
    docsUrl: `https://kokonutui.com${docsRoute}`,
    localDocsRoute: docsRoute,
    registryUrl: `https://kokonutui.com/r/${item.name}.json`,
    githubSourceUrl: `https://github.com/kokonut-labs/kokonutui/tree/${commit}/${item.files[0].path}`,
    sourceCommit: commit,
    sourceHash,
    sourceFiles,
    sourceSignals,
    documentedProps,
    sourceProps,
    localRuntimeOverride: localRuntimeOverrides[item.name] ?? null,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    publishedExampleCount: variants.length,
    searchTags: [...new Set([category, ...keywords.map((value) => String(value).toLowerCase())])].sort(),
    flozioFit: null,
    reviewStatus: "source-located-license-checked",
    review: {
      sourceRead: false,
      visualInspected: false,
      motionInspected: false,
      responsiveInspected: false,
      reducedMotionInspected: false,
      variants,
      motionSummary: null,
      motionEvidence: [],
      reviewNotes: [],
    },
  });
}

function docsRouteFor(name) {
  const file = docsBySlug.get(name);
  const relativeDocsPath = path.relative(path.join(sourceRoot, "content/docs"), file).replaceAll("\\", "/").replace(/\.mdx$/, "");
  return `/docs/${relativeDocsPath}`;
}

const catalog = {
  library: "Kokonut UI",
  officialHomepage: "https://kokonutui.com/",
  officialRepository: "https://github.com/kokonut-labs/kokonutui",
  officialRegistryUrl: "https://kokonutui.com/r/registry.json",
  inventorySource: "registry.json",
  inventoryRetrievedAt: new Date().toISOString(),
  sourceCommit: commit,
  license: "MIT",
  scope: "Free components only, per user instruction.",
  counts: { officialFreeComponents: entries.length, reviewedComponents: 0, reviewedPreviews: 0, blocked: 0 },
  items: entries,
};
const output = path.join(root, "component-research/kokonutui/catalog.json");
await fs.mkdir(path.dirname(output), { recursive: true });
const serialized = `${JSON.stringify(catalog, null, 2)}\n`;
await fs.writeFile(output, serialized);
await fs.mkdir(path.join(sourceRoot, "research"), { recursive: true });
await fs.writeFile(path.join(sourceRoot, "research/catalog.json"), serialized);
console.log(`Wrote ${entries.length} free Kokonut UI component records (${entries.reduce((sum, item) => sum + item.publishedExampleCount, 0)} published preview instances) from commit ${commit}.`);
