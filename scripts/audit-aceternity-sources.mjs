import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheRoot = path.join(root, ".component-lab-cache/aceternity");
const appRoot = path.join(root, ".component-lab-cache/aceternity-app");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/aceternity/catalog.json"), "utf8"));
const inventory = JSON.parse(await fs.readFile(path.join(appRoot, "preview-inventory.json"), "utf8"));
const assets = JSON.parse(await fs.readFile(path.join(cacheRoot, "asset-manifest.json"), "utf8")).assets;
const assetByPath = new Map(assets.map((asset) => [asset.localPath, asset]));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const signalRules = [
  ["scroll-linked", /useScroll|scrollYProgress|onScroll|scrollTo\(/i],
  ["pointer-tracking", /onMouseMove|onPointerMove|pointermove|useMotionValue/i],
  ["hover-triggered", /whileHover|onMouseEnter|onMouseLeave|group-hover|hover:/i],
  ["click-or-toggle", /onClick|onPointerUp|onTap|onToggle/i],
  ["drag-or-gesture", /onDrag|onPan|drag=|onPointerDown|touchStart/i],
  ["keyboard-input", /onKeyDown|onKeyUp|keydown|KeyboardEvent/i],
  ["repeating-animation", /repeat:\s*(?:Infinity|-1)|repeatType|repeatDelay/i],
  ["timer-driven", /setInterval|setTimeout|requestAnimationFrame/i],
  ["spring-settling", /useSpring|type:\s*["']spring["']|stiffness:/i],
  ["svg-or-path", /<svg|<path|strokeDashoffset/i],
  ["canvas-rendering", /<canvas|Canvas\b|requestAnimationFrame/i],
  ["three-dimensional", /@react-three|three-globe|perspective|rotateX|rotateY/i],
  ["webcam-permission", /getUserMedia|mediaDevices/i],
  ["reduced-motion-aware", /prefers-reduced-motion|useReducedMotion/i],
];

const records = [];
for (const item of catalog.items.filter((entry) => entry.kind === "component" && entry.officialTier === "free")) {
  const registryPath = path.join(cacheRoot, `registry/${item.name}.json`);
  const registry = JSON.parse(await fs.readFile(registryPath, "utf8"));
  const sourceFiles = registry.files.filter((file) => file.content);
  const combinedSource = sourceFiles.map((file) => file.content).join("\n");
  const preview = inventory.routeInventory.find((entry) => entry.name === item.name);
  const variants = [];
  for (const variant of preview?.variants ?? []) {
    let example = "";
    if (variant.exampleFile) {
      try { example = await fs.readFile(path.join(cacheRoot, `examples/${variant.exampleFile}`), "utf8"); } catch {}
    }
    const exportBody = example.match(/export\s+function\s+(\w+)/)?.[1]
      ?? example.match(/export\s+const\s+(\w+)/)?.[1]
      ?? variant.exportName
      ?? null;
    const propSamples = [...example.matchAll(/\b([A-Za-z][A-Za-z0-9]*)=\{?(["'][^"']*["']|true|false|\d+(?:\.\d+)?)/g)]
      .slice(0, 80).map((match) => ({ name: match[1], example: match[2].slice(0, 80) }));
    variants.push({
      id: variant.id,
      title: variant.title ?? null,
      officialExample: Boolean(variant.exampleFile),
      exampleFile: variant.exampleFile ?? null,
      exampleHash: example ? sha256(example) : null,
      exportName: exportBody,
      componentSymbolsUsed: [...new Set([...example.matchAll(/<([A-Z][A-Za-z0-9.]*)\b/g)].map((match) => match[1]))].slice(0, 20),
      propSamples,
      motionSignals: signalRules.filter(([, pattern]) => pattern.test(example)).map(([signal]) => signal),
      explicitReducedMotionSupport: /prefers-reduced-motion|useReducedMotion/i.test(example),
      sourceBytes: Buffer.byteLength(example),
    });
  }

  const dependencies = [...new Set([...combinedSource.matchAll(/^import\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/gm)]
    .map((match) => match[1]).filter((value) => !value.startsWith(".") && !value.startsWith("@/")))].sort();
  const publicPropNames = [...new Set([...combinedSource.matchAll(/(?:export\s+)?(?:interface|type)\s+[A-Za-z_$][\w$]*(?:Props|Options|Config)\s*=??\s*\{([\s\S]*?)\n\}/g)]
    .flatMap((match) => [...match[1].matchAll(/^ {2}([A-Za-z_$][\w$]*)\??\s*:/gm)].map((property) => property[1])))];
  const motionSignals = signalRules.filter(([, pattern]) => pattern.test(combinedSource)).map(([signal]) => signal);
  const externalUrls = [...new Set([...combinedSource.matchAll(/https?:\/\/[^\s"'`)]+/g)].map((match) => match[0]))];
  const assetPaths = [...new Set([
    ...[...combinedSource.matchAll(/(?:src|href|url)\s*(?:=\s*)?["'(]?\/(?!\/)[^\s"'`)]+/g)].map((match) => match[0].match(/\/(?!\/)[^\s"'`)]+/)?.[0]),
    ...variants.flatMap((variant) => {
      const examplePath = variant.exampleFile;
      if (!examplePath) return [];
      return [];
    }),
  ].filter(Boolean))];
  const directAssets = assetPaths.map((localPath) => ({
    localPath,
    source: assetByPath.get(localPath)?.url ?? null,
    cacheStatus: assetByPath.get(localPath)?.status ?? (localPath === "/mask.svg" ? "official-docs-asset" : "not-listed-in-asset-cache"),
  }));
  records.push({
    id: item.id,
    name: item.name,
    registryUrl: item.registryUrl,
    registrySourceHash: item.sourceHash,
    sourceFileCount: sourceFiles.length,
    sourceFiles: sourceFiles.map((file) => file.path),
    sourceFileHashes: sourceFiles.map((file) => ({ path: file.path, sha256: sha256(file.content) })),
    combinedSourceSha256: sha256(combinedSource),
    sourceFileHashes: sourceFiles.map((file) => ({ path: file.path, sha256: sha256(file.content) })),
    combinedSourceSha256: sha256(combinedSource),
    sourceBytes: Buffer.byteLength(combinedSource),
    componentSymbols: [...new Set([...combinedSource.matchAll(/export\s+(?:const|function|class|interface|type)\s+(\w+)/g)].map((match) => match[1]))],
    directDependencies: dependencies,
    declaredPropNames: publicPropNames,
    motionSignals,
    explicitReducedMotionSupport: motionSignals.includes("reduced-motion-aware"),
    externalUrls,
    assetPaths: directAssets,
    variants,
  });
}

const outputPath = path.join(cacheRoot, "source-audit.json");
await fs.writeFile(outputPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  sourceLocation: ".component-lab-cache/aceternity/registry (ignored local cache)",
  catalogComponents: records.length,
  records,
}, null, 2)}\n`);
console.log(`Read and fingerprinted ${records.length} exact registry sources and ${records.reduce((total, record) => total + record.variants.length, 0)} preview records. Source details are saved only in ignored local cache: ${path.relative(root, outputPath)}.`);
