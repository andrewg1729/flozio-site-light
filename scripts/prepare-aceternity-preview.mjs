import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2] ?? "tracing-beam";
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/aceternity/catalog.json"), "utf8"));
const item = catalog.items.find((entry) => entry.kind === "component" && entry.name === slug);
if (!item) throw new Error(`No Aceternity component named ${slug} in the tracked catalog.`);

const registryPath = path.join(root, ".component-lab-cache/aceternity/registry", `${slug}.json`);
const registryItem = JSON.parse(await fs.readFile(registryPath, "utf8"));
const componentFile = registryItem.files.find((file) => file.type === "registry:ui" && file.content);
if (!componentFile) throw new Error(`${slug} has no cached registry:ui implementation file.`);

const appRoot = path.join(root, ".component-lab-cache/aceternity-app");
const componentPath = path.join(appRoot, "components/ui", `${slug}.tsx`);
const pagePath = path.join(appRoot, "app/page.tsx");
const dependencyRoot = path.join(root, ".magicui-source/apps/www/node_modules");
const dependencyLink = path.join(appRoot, "node_modules");
await fs.mkdir(path.dirname(componentPath), { recursive: true });
await fs.mkdir(path.dirname(pagePath), { recursive: true });
await fs.mkdir(path.join(appRoot, "lib"), { recursive: true });
await fs.mkdir(path.join(appRoot, "styles"), { recursive: true });
await fs.mkdir(appRoot, { recursive: true });
await fs.writeFile(path.join(appRoot, "package.json"), JSON.stringify({
  name: "flozio-aceternity-component-lab",
  private: true,
  scripts: { dev: "next dev -p 38473" },
  dependencies: { next: "15.5.25", react: "19.1.1", "react-dom": "19.1.1", motion: "12.23.12", clsx: "2.1.1", "tailwind-merge": "3.3.1" },
}, null, 2) + "\n");
await fs.writeFile(path.join(appRoot, "next.config.mjs"), `const nextConfig = { distDir: ".next-flozio-aceternity" };\nexport default nextConfig;\n`);
await fs.writeFile(path.join(appRoot, "postcss.config.mjs"), `export default { plugins: { "@tailwindcss/postcss": {} } };\n`);
await fs.writeFile(path.join(appRoot, "tsconfig.json"), JSON.stringify({
  compilerOptions: {
    target: "esnext", lib: ["dom", "dom.iterable", "esnext"], allowJs: true,
    skipLibCheck: true, strict: true, noEmit: true, esModuleInterop: true,
    module: "esnext", moduleResolution: "bundler", resolveJsonModule: true,
    isolatedModules: true, jsx: "preserve", baseUrl: ".",
    paths: { "@/*": ["./*"] }, plugins: [{ name: "next" }],
  }, include: ["**/*.ts", "**/*.tsx", ".next-flozio-aceternity/types/**/*.ts"], exclude: ["node_modules"],
}, null, 2) + "\n");
await fs.writeFile(path.join(appRoot, "app/layout.tsx"), `import "../styles/globals.css";\n\nexport default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {\n  return <html lang="en"><body>{children}</body></html>;\n}\n`);
await fs.writeFile(path.join(appRoot, "styles/globals.css"), `@import "tailwindcss";\n\n:root { color-scheme: light; }\nhtml, body { min-height: 100%; }\nbody { margin: 0; background: #fff; color: #171717; font-family: Arial, sans-serif; }\n`);
await fs.writeFile(path.join(appRoot, "lib/utils.ts"), `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\nexport function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }\n`);
try { await fs.lstat(dependencyLink); } catch {
  try {
    await fs.symlink(dependencyRoot, dependencyLink, process.platform === "win32" ? "junction" : "dir");
  } catch (error) {
    throw new Error(`Could not link the installed research dependencies into the ignored isolated app. Run npm run setup:component-lab first. ${error.message}`);
  }
}
await fs.writeFile(componentPath, componentFile.content);

const componentExport = componentFile.content.match(/export\s+(?:const|function)\s+(\w+)/)?.[1];
if (!componentExport) throw new Error(`Could not identify the exported component in ${slug}.`);
const sourceForPage = JSON.stringify(componentFile.content);
const page = `"use client";

import { ${componentExport} } from "@/components/ui/${slug}";

const implementation = ${sourceForPage};

const entries = [
  { title: "A signal enters the picture", body: "The path starts at the first point in the reading area. Scroll to move the beam through the content." },
  { title: "The beam follows the path", body: "The highlighted segment tracks scroll progress while a spring smooths its movement." },
  { title: "The path reaches its end", body: "Continue scrolling to observe how the line and gradient finish their travel." },
];

export default function AceternityPreview() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-foreground">
      <header className="mb-10 border-b pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Local component research · Aceternity UI</p>
        <h1 className="mt-2 text-3xl font-semibold">Tracing Beam</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Imported from the official registry. Scroll the preview area to move the gradient along its SVG path. This editorial sample is for motion inspection and does not represent Flozio product UI.</p>
        <a className="mt-3 inline-block text-sm underline underline-offset-4" href="https://ui.aceternity.com/components/tracing-beam" target="_blank" rel="noreferrer">Official documentation ↗</a>
      </header>
      <section aria-label="Live Tracing Beam component preview" className="mb-10 h-[72vh] min-h-[460px] overflow-y-auto rounded-lg border bg-background px-4 py-8 sm:px-8">
        <${componentExport} className="px-8">
          <article className="mx-auto max-w-2xl space-y-14 py-8">
            {entries.map((entry, index) => (
              <section key={entry.title} className="min-h-[240px]">
                <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Stage 0{index + 1}</p>
                <h2 className="mb-3 text-xl font-medium">{entry.title}</h2>
                <p className="leading-7 text-muted-foreground">{entry.body}</p>
              </section>
            ))}
          </article>
        </${componentExport}>
      </section>
      <details className="rounded-lg border p-4">
        <summary className="cursor-pointer text-sm font-medium">Inspect imported component source</summary>
        <pre className="mt-4 max-h-[65vh] overflow-auto rounded-md bg-muted p-4 text-xs leading-5"><code>{implementation}</code></pre>
      </details>
    </main>
  );
}
`;
await fs.writeFile(pagePath, page);
console.log(`Prepared native local preview for ${item.title} at http://localhost:38473`);
console.log(`Imported official source into ignored local workspace: ${path.relative(root, componentPath)}`);
