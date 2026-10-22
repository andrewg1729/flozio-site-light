import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const libraryRoot = path.join(root, ".component-lab-cache/aceternity");
const appRoot = path.join(root, ".component-lab-cache/aceternity-app");
const catalogPath = path.join(root, "component-research/aceternity/catalog.json");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const components = catalog.items.filter((item) => item.kind === "component" && item.officialTier === "free");
const assetManifest = JSON.parse(await fs.readFile(path.join(libraryRoot, "asset-manifest.json"), "utf8").catch(() => `{"assets":[]}`));
const localAssets = new Map(assetManifest.assets.filter((asset) => asset.status === "downloaded").map((asset) => [asset.url, asset.localPath]));

const packageJson = {
  name: "flozio-aceternity-component-lab",
  private: true,
  scripts: { dev: "next dev -p 38473" },
  dependencies: {
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-tabs": "^1.1.13",
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.18.0",
    "@tabler/icons-react": "^3.34.1",
    "@tailwindcss/postcss": "^4.1.13",
    "@tsparticles/engine": "^3.9.1",
    "@tsparticles/react": "^3.0.0",
    "@tsparticles/slim": "^3.9.1",
    clsx: "^2.1.1",
    "dotted-map": "*",
    "lucide-react": "^0.544.0",
    motion: "^12.23.12",
    "mini-svg-data-uri": "*",
    "next": "14.2.35",
    "next-themes": "^0.4.6",
    qss: "*",
    react: "18.3.1",
    "react-dom": "18.3.1",
    "react-dropzone": "*",
    "react-element-to-jsx-string": "*",
    "react-is": "file:../../node_modules/next/dist/compiled/react-is",
    "react-syntax-highlighter": "*",
    "simplex-noise": "*",
    sonner: "^1.7.4",
    three: "*",
    "three-globe": "*",
    "tailwind-merge": "^3.3.1",
    tailwindcss: "^4.1.13",
  },
  devDependencies: {
    "@types/node": "^22.20.1",
    "@types/react": "^18.3.27",
    "@types/react-dom": "^18.3.7",
    typescript: "^5.9.2",
  },
};

async function write(relativePath, content) {
  const destination = path.resolve(appRoot, relativePath);
  if (!destination.startsWith(`${appRoot}${path.sep}`)) throw new Error(`Unsafe output path: ${relativePath}`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, content);
}

async function copyRegistryFiles(record, seen) {
  for (const file of record.files ?? []) {
    if (!file.content) continue;
    const target = file.target ?? (file.path?.startsWith("ui/") ? `components/${file.path}` : file.path);
    if (!target || seen.has(target)) continue;
    await write(target, localizeRegistrySource(target, file.content));
    seen.add(target);
  }
}

function examplePath(item, index) {
  const name = `${item.name}${item.exampleCount > 1 ? `-${index + 1}` : ""}.tsx`;
  return path.join(libraryRoot, "examples", name);
}

function localizeExampleImports(source) {
  return source
    .replace(/(["'])\.\.\/ui\/([^"']+)\1/g, (_all, quote, name) => `${quote}@/components/ui/${name}${quote}`)
    .replace(/(["'])\.\.\/utils\/cn\1/g, "$1@/utils/cn$1")
    .replace(/(["'])\.\.\/lib\/utils\1/g, "$1@/lib/utils$1");
}

function localizeAssetUrls(source) {
  return source
    .replaceAll("https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png", "/demos/algochurn.webp")
    .replaceAll("https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png", "/demos/tailwindmasterkit.webp")
    .replaceAll("https://assets.aceternity.com/avatars/${i}.webp", "/avatars/${i}.webp")
    .replaceAll("https://assets.aceternity.com/${item.image}", "/${item.image}")
    .replaceAll("https://assets.aceternity.com/linear.webp", "/linear.webp")
    .replaceAll("/images/imraan-hashmi.jpeg", "/link-preview-imraan.png")
    .replaceAll("/images/fight-club.jpeg", "/link-preview-templates.png")
    .replace(/https?:\/\/[^\s"'`()<>]+/g, (url) => {
    const normalized = url.replace(/[),.;]+$/, "");
    return localAssets.get(normalized) ?? url;
    });
}

function localizeRegistrySource(target, source) {
  const localized = localizeAssetUrls(source);
  if (target !== "components/ui/link-preview.tsx") return localized;
  return localized.replace(
    'src = `https://api.microlink.io/?${params}`;',
    'src = ({ "https://tailwindcss.com": "/link-preview-tailwind.png", "https://framer.com/motion": "/link-preview-framer.png", "https://ui.aceternity.com": "/link-preview-aceternity.png" } as Record<string, string>)[url] ?? "/link-preview-aceternity.png";',
  );
}

function exampleExport(source) {
  const names = [...source.matchAll(/export\s+(?:default\s+)?(?:async\s+)?(?:function|const|class)\s+(\w+)/g)].map((match) => match[1]);
  const name = names.find((candidate) => /demo/i.test(candidate)) ?? names[0];
  if (!name) return null;
  const isDefault = new RegExp(`export\\s+default\\s+(?:async\\s+)?(?:function|class)\\s+${name}\\b`).test(source);
  return { name, isDefault };
}

function sourcePreviewExport(source) {
  const defaultName = source.match(/export\s+default\s+(\w+)\s*;?/);
  if (defaultName) return { name: defaultName[1], isDefault: true };
  const exportedName = source.match(/export\s*\{\s*(\w+)/);
  if (exportedName) return { name: exportedName[1], isDefault: false };
  return exampleExport(source);
}

await fs.mkdir(appRoot, { recursive: true });
const assetCacheRoot = path.join(libraryRoot, "assets");
const publicAssetRoot = path.join(appRoot, "public/research-assets");
await fs.mkdir(publicAssetRoot, { recursive: true });
for (const asset of assetManifest.assets.filter((value) => value.status === "downloaded")) {
  const cachedAsset = path.join(assetCacheRoot, asset.filename);
  try {
    await fs.access(cachedAsset);
    await fs.copyFile(cachedAsset, path.join(publicAssetRoot, asset.filename));
    const parsedAsset = new URL(asset.url);
    if (parsedAsset.hostname === "assets.aceternity.com") {
      const relativeAssetPath = decodeURIComponent(parsedAsset.pathname).replace(/^\/+/, "");
      const destination = path.resolve(path.join(appRoot, "public"), relativeAssetPath);
      if (destination.startsWith(`${path.resolve(path.join(appRoot, "public"))}${path.sep}`)) {
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.copyFile(cachedAsset, destination);
      }
    }
  } catch {}
}
const linearAsset = assetManifest.assets.find((value) => new URL(value.url).pathname.endsWith("/linear-demo.webp"));
if (linearAsset) {
  try { await fs.copyFile(path.join(assetCacheRoot, linearAsset.filename), path.join(appRoot, "public/linear.webp")); } catch {}
}
try {
  const soundDir = path.join(appRoot, "public/sounds");
  await fs.mkdir(soundDir, { recursive: true });
  await fs.copyFile(path.join(assetCacheRoot, "sound.ogg"), path.join(soundDir, "sound.ogg"));
  await fs.copyFile(path.join(assetCacheRoot, "sound-config.json"), path.join(soundDir, "config.json"));
} catch {}
try { await fs.copyFile(path.join(assetCacheRoot, "noise.webp"), path.join(appRoot, "public/noise.webp")); } catch {}
await write("package.json", `${JSON.stringify(packageJson, null, 2)}\n`);
await fs.cp(
  path.join(root, "node_modules/next/dist/compiled/react-is"),
  path.join(appRoot, "node_modules/react-is"),
  { recursive: true, force: true },
);
const maskAsset = assetManifest.assets.find((value) => new URL(value.url).hostname === "ui.aceternity.com" && new URL(value.url).pathname === "/mask.svg");
if (!maskAsset) throw new Error("Official Aceternity mask.svg is not in the asset manifest. Run node scripts/cache-aceternity-assets.mjs --download first.");
await fs.copyFile(path.join(assetCacheRoot, maskAsset.filename), path.join(appRoot, "public/mask.svg"));
await write("next.config.mjs", `const nextConfig = { distDir: ".next-flozio-aceternity", images: { unoptimized: true }, reactStrictMode: false };\nexport default nextConfig;\n`);
await write("postcss.config.mjs", `export default { plugins: { "@tailwindcss/postcss": {} } };\n`);
await write("tsconfig.json", `${JSON.stringify({
  compilerOptions: {
    target: "esnext", lib: ["dom", "dom.iterable", "esnext"], allowJs: true,
    skipLibCheck: true, strict: false, noEmit: true, esModuleInterop: true,
    module: "esnext", moduleResolution: "bundler", resolveJsonModule: true,
    isolatedModules: true, jsx: "preserve", baseUrl: ".",
    paths: { "@/*": ["./*"] }, plugins: [{ name: "next" }],
  }, include: ["**/*.ts", "**/*.tsx", ".next-flozio-aceternity/types/**/*.ts"], exclude: ["node_modules"],
}, null, 2)}\n`);
await write("app/layout.tsx", `import "../styles/globals.css";\n\nexport default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {\n  return <html lang="en"><head><link rel="icon" href="data:," /></head><body>{children}</body></html>;\n}\n`);
await write("styles/globals.css", `@import "tailwindcss" source(none);\n@source "../app";\n@source "../components";\n@source "../example-previews";\n\n/* Exact Tailwind v4 animation tokens required by the official Aceternity components. */\n@theme inline {\n  --animate-spotlight: spotlight 2s ease 0.75s 1 forwards;\n  --animate-aurora: aurora 60s linear infinite;\n  --animate-first: moveVertical 30s ease infinite;\n  --animate-second: moveInCircle 20s reverse infinite;\n  --animate-third: moveInCircle 40s linear infinite;\n  --animate-fourth: moveHorizontal 40s ease infinite;\n  --animate-fifth: moveInCircle 20s ease infinite;\n  --animate-cell-ripple: cell-ripple var(--duration, 200ms) ease-out none 1 var(--delay, 0ms);\n  --animate-scroll: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;\n  --animate-meteor-effect: meteor 5s linear infinite;\n\n  @keyframes spotlight {\n    0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }\n    100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }\n  }\n  @keyframes aurora {\n    from { background-position: 50% 50%, 50% 50%; }\n    to { background-position: 350% 50%, 350% 50%; }\n  }\n  @keyframes moveHorizontal {\n    0% { transform: translateX(-50%) translateY(-10%); }\n    50% { transform: translateX(50%) translateY(10%); }\n    100% { transform: translateX(-50%) translateY(-10%); }\n  }\n  @keyframes moveInCircle {\n    0% { transform: rotate(0deg); }\n    50% { transform: rotate(180deg); }\n    100% { transform: rotate(360deg); }\n  }\n  @keyframes moveVertical {\n    0% { transform: translateY(-50%); }\n    50% { transform: translateY(50%); }\n    100% { transform: translateY(-50%); }\n  }\n  @keyframes cell-ripple {\n    0% { opacity: 0.4; }\n    50% { opacity: 0.8; }\n    100% { opacity: 0.4; }\n  }\n  @keyframes scroll {\n    to { transform: translate(calc(-50% - 0.5rem)); }\n  }\n  @keyframes meteor {\n    0% { transform: rotate(215deg) translateX(0); opacity: 1; }\n    70% { opacity: 1; }\n    100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }\n  }\n}\n\n:root { color-scheme: light; }\nhtml, body { min-height: 100%; }\nbody { margin: 0; background: #fff; color: #171717; font-family: Arial, sans-serif; }\n.lab-toolbar { position: sticky; top: 0; z-index: 20; background: #fff; border-bottom: 1px solid #ddd; padding: 12px 20px; }\n.lab-canvas { min-height: 520px; overflow: visible; padding: 36px; border: 1px solid #e5e5e5; border-radius: 10px; background: white; }\n.lab-code { max-height: 60vh; overflow: auto; background: #111; color: #f3f3f3; padding: 16px; font: 12px/1.55 ui-monospace, monospace; white-space: pre-wrap; }\n`);
await fs.appendFile(path.join(appRoot, "styles/globals.css"), `\n:root { --background: 0 0% 100%; --foreground: 222.2 84% 4.9%; --border: 214.3 31.8% 91.4%; --ring: 221.2 83.2% 53.3%; }\n@theme inline { --color-background: hsl(var(--background)); --color-foreground: hsl(var(--foreground)); --color-border: hsl(var(--border)); --color-ring: hsl(var(--ring)); }\n/* Chromium can omit SVG filter defs under display:none, leaving url(#filter-id) content blank. */\n.lab-canvas svg[aria-hidden] { display: block !important; position: absolute; width: 0; height: 0; overflow: hidden; }\n`);
await write("lib/utils.ts", `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\nexport function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }\n`);
await write("utils/cn.ts", `export { cn } from "@/lib/utils";\n`);
await write("fonts/calsans.ts", `export const calsans = { className: "font-sans" };\n`);

const installedModules = new Set();
const copiedFiles = new Set();
for (const item of components) {
  const registryPath = path.join(libraryRoot, "registry", `${item.name}.json`);
  const record = JSON.parse(await fs.readFile(registryPath, "utf8"));
  await copyRegistryFiles(record, copiedFiles);
}

const routeInventory = [];
for (const item of components) {
  const variants = [];
  const registryRecord = JSON.parse(await fs.readFile(path.join(libraryRoot, "registry", `${item.name}.json`), "utf8"));
  const sourceFiles = registryRecord.files.filter((file) => file.content);
  if (!item.exampleCount) {
    variants.push({ id: "source", title: "Source only", status: "no-published-example" });
  }
  for (let index = 0; index < item.exampleCount; index += 1) {
    const inputPath = examplePath(item, index);
    const officialSource = await fs.readFile(inputPath, "utf8");
    let source = localizeExampleImports(localizeAssetUrls(officialSource));
    const exp = exampleExport(source);
    const variantId = String(index + 1);
    const exampleModule = `${item.name}-${variantId}`;
    await write(`example-previews/${exampleModule}.tsx`, source);
    const loadDemo = exp.isDefault
      ? `import("@/example-previews/${exampleModule}").then((module) => ({ default: module.default }))`
      : `import("@/example-previews/${exampleModule}").then((module) => ({ default: module.${exp.name} }))`;
    const title = `${item.title} - Example ${variantId}`;
    const routeFile = `app/p/${item.name}/${variantId}/page.tsx`;
    const route = `"use client";\n\nimport dynamic from "next/dynamic";\nconst Demo = dynamic(() => ${loadDemo}, { ssr: false, loading: () => <div className="min-h-24" aria-label="Loading component preview" /> });\nconst componentSources = ${JSON.stringify(sourceFiles.map((file) => ({ path: file.target ?? file.path, content: file.content })))};\nconst exampleSource = ${JSON.stringify(officialSource)};\n\nexport default function PreviewPage() {\n  return <main className="mx-auto max-w-6xl px-6 py-8 text-neutral-900"><header className="lab-toolbar -mx-6 -mt-8 mb-6 flex items-center justify-between"><a href="/">&lt;- Aceternity catalog</a><a href="${item.docsUrl ?? "https://ui.aceternity.com/components"}" target="_blank" rel="noreferrer">Official docs</a></header><p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">${item.name} - variant ${variantId}</p><h1 className="mb-6 text-2xl font-semibold">${title}</h1><section className="lab-canvas" aria-label="${title} live component preview"><Demo /></section><details className="mt-6 rounded-lg border p-4"><summary className="cursor-pointer font-medium">Inspect official component implementation</summary>{componentSources.map((file) => <section key={file.path} className="mt-4"><h2 className="font-medium">{file.path}</h2><pre className="lab-code mt-2"><code>{file.content}</code></pre></section>)}</details><details className="mt-4 rounded-lg border p-4"><summary className="cursor-pointer font-medium">Inspect exact official example source</summary><pre className="lab-code mt-4"><code>{exampleSource}</code></pre></details></main>;\n}\n`;
    await write(routeFile, route);
    variants.push({ id: variantId, route: `/p/${item.name}/${variantId}`, exampleFile: path.basename(inputPath), exportName: exp.name, status: "generated" });
  }
  if (variants.length === 1 && variants[0].status === "no-published-example") {
    const record = registryRecord;
    const componentSource = record.files.find((file) => file.content)?.content ?? "";
    const declared = sourcePreviewExport(componentSource);
    if (declared) {
      const route = `app/c/${item.name}/page.tsx`;
      const importStatement = declared.isDefault ? `import ${declared.name} from "@/components/ui/${item.name}";` : `import { ${declared.name} } from "@/components/ui/${item.name}";`;
      const page = `"use client";\n${importStatement}\nconst source = ${JSON.stringify(componentSource)};\nexport default function SourcePage() { return <main className="mx-auto max-w-5xl px-6 py-8"><a href="/">&lt;- Aceternity catalog</a><h1 className="my-6 text-2xl font-semibold">${item.title} - no published example</h1><section className="lab-canvas"><${declared.name} /></section><details className="mt-6 rounded border p-4"><summary>Inspect component source</summary><pre className="lab-code mt-4">{source}</pre></details></main> }\n`;
      await write(route, page);
      variants[0].route = `/c/${item.name}`;
      variants[0].status = "source-preview-generated";
    } else {
      variants[0].status = "source-only-no-exported-component";
    }
  }
  routeInventory.push({ id: item.id, name: item.name, title: item.title, description: item.description ?? "", categories: item.officialCategories ?? [], searchTags: item.searchTags ?? [], flozioFit: item.flozioFit ?? null, docsUrl: item.docsUrl, sourceUrl: item.registryUrl, sourceHash: item.sourceHash, dependencies: item.dependencies ?? [], variants });
}

const catalogClient = [
  '"use client";',
  'import { useMemo, useState } from "react";',
  'const entries = ' + JSON.stringify(routeInventory) + ';',
  'export default function Catalog() {',
  '  const [query, setQuery] = useState("");',
  '  const visible = useMemo(() => entries.filter((item) => [item.title,item.id,item.description,...item.categories,...item.searchTags,item.flozioFit?.fit,item.flozioFit?.reason].join(" ").toLowerCase().includes(query.trim().toLowerCase())), [query]);',
  '  const variants = entries.reduce((sum, item) => sum + item.variants.filter((variant) => variant.route).length, 0);',
  '  return <main className="mx-auto max-w-6xl px-6 py-10"><p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Internal visual research · local imports</p><h1 className="my-3 text-3xl font-semibold">Aceternity UI</h1><p className="max-w-3xl text-sm leading-6 text-neutral-600">Official examples and source panels are loaded in this isolated lab. These third-party demos are research references, not Flozio product UI.</p><input className="my-6 w-full max-w-xl rounded-md border px-3 py-2" type="search" placeholder="Search names, behavior, tags, or Flozio use" value={query} onChange={(event) => setQuery(event.target.value)} /><p className="mb-3 text-sm text-neutral-500">{visible.length} of {entries.length} components · {variants} published or source-only preview routes</p><ul className="divide-y rounded-lg border">{visible.map((item) => <li key={item.id} className="p-4"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-medium">{item.title}</h2><span className="flex flex-wrap gap-2">{item.variants.map((variant) => <a key={variant.id} className="rounded border px-3 py-1 text-sm hover:bg-neutral-50" href={variant.route || "#"}>{variant.status === "generated" ? (variant.exampleFile ? "Example " + variant.id : "Source-only") : variant.status}</a>)}</span></div><p className="mt-2 max-w-4xl text-sm leading-6 text-neutral-600">{item.description}</p><div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">{item.categories.map((tag) => <span key={tag}>{tag}</span>)}{item.searchTags.filter((tag) => tag.startsWith("flozio:")).map((tag) => <span key={tag}>{tag.replace("flozio:", "Flozio · ")}</span>)}</div>{item.flozioFit && <p className="mt-2 text-xs text-neutral-600"><strong>{item.flozioFit.fit}</strong> — {item.flozioFit.reason}</p>}</li>)}</ul></main>;',
  '}',
].join("\n");
await write("app/catalog.tsx", catalogClient);
await write("app/page.tsx", `import Catalog from "./catalog";\nexport default function Home() { return <Catalog /> }\n`);

const pkgPath = path.join(appRoot, "package.json");
const missingNodeModules = !await fs.stat(path.join(appRoot, "node_modules")).then((s) => s.isDirectory()).catch(() => false);
if (missingNodeModules) console.warn("Dependencies are not installed yet. Run npm.cmd install --prefix .component-lab-cache/aceternity-app before starting the lab.");
await fs.writeFile(path.join(appRoot, "preview-inventory.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), componentCount: components.length, variantCount: routeInventory.reduce((sum, item) => sum + item.variants.filter((v) => v.route).length, 0), routeInventory }, null, 2)}\n`);
console.log(`Generated ${components.length} component entries, ${routeInventory.reduce((sum, item) => sum + item.variants.length, 0)} preview routes, and ${copiedFiles.size} official source files in the ignored Aceternity app.`);
console.log(`Generated app: ${path.relative(root, appRoot)}`);
