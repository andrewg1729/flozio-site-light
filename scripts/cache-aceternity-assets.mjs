import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheRoot = path.join(root, ".component-lab-cache/aceternity");
const assetCacheRoot = path.join(cacheRoot, "assets");
const publicRoot = path.join(root, ".component-lab-cache/aceternity-app/public/research-assets");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/aceternity/catalog.json"), "utf8"));
const urls = new Set();
// SVG Mask Effect references this official root asset by absolute path.
urls.add("https://ui.aceternity.com/mask.svg");
for (const item of catalog.items.filter((value) => value.kind === "component")) {
  const paths = [
    path.join(cacheRoot, `registry/${item.name}.json`),
    ...Array.from({ length: item.exampleCount ?? 0 }, (_, index) => path.join(cacheRoot, `examples/${item.name}${item.exampleCount > 1 ? `-${index + 1}` : ""}.tsx`)),
  ];
  for (const filePath of paths) {
    let content;
    try {
      const file = filePath.endsWith(".json") ? JSON.parse(await fs.readFile(filePath, "utf8")).files.find((value) => value.content) : null;
      content = file?.content ?? await fs.readFile(filePath, "utf8");
    } catch { continue; }
    for (const match of content.matchAll(/https?:\/\/[^\s"'`()<>]+/g)) {
      const value = match[0].replace(/[),.;]+$/, "");
      try {
        const parsed = new URL(value);
        if (!value.includes("${") && (/^(images\.|assets\.|cdn\.|unpkg\.|img\.)/.test(parsed.hostname) || /\.(?:avif|gif|jpe?g|png|svg|webp|glb|gltf|mp4)(?:$|\?)/i.test(value))) urls.add(value);
      } catch {}
    }
  }
}

const oldManifestPath = path.join(cacheRoot, "asset-manifest.json");
let previous = [];
try { previous = JSON.parse(await fs.readFile(oldManifestPath, "utf8")).assets; } catch {}
const byUrl = new Map(previous.map((entry) => [entry.url, entry]));
const urlList = [...urls];
for (const url of urlList) {
  const hash = crypto.createHash("sha256").update(url).digest("hex").slice(0, 16);
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase() || ".bin";
  const filename = `${hash}${ext}`;
  byUrl.set(url, { ...byUrl.get(url), url, filename, localPath: `/research-assets/${filename}`, status: byUrl.get(url)?.status ?? "pending", bytes: byUrl.get(url)?.bytes ?? null });
}
if (process.argv.includes("--download")) {
  await fs.mkdir(assetCacheRoot, { recursive: true });
  await fs.mkdir(publicRoot, { recursive: true });
  let cursor = 0;
  let completed = 0;
  const failures = [];
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= urlList.length) return;
      const url = urlList[index];
      const entry = byUrl.get(url);
      try {
        await fs.access(path.join(assetCacheRoot, entry.filename));
        entry.status = "downloaded";
        completed += 1;
        continue;
      } catch {}
      const parsedAsset = new URL(url);
      const existingPublicAsset = parsedAsset.hostname === "assets.aceternity.com"
        ? path.resolve(path.join(publicRoot, ".."), decodeURIComponent(parsedAsset.pathname).replace(/^\/+/, ""))
        : path.join(publicRoot, entry.filename);
      try {
        await fs.access(existingPublicAsset);
        await fs.copyFile(existingPublicAsset, path.join(assetCacheRoot, entry.filename));
        entry.status = "downloaded";
        completed += 1;
        continue;
      } catch {}
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(30_000), headers: { "User-Agent": "Flozio-Aceternity-Visual-Research/1.0" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = Buffer.from(await response.arrayBuffer());
        await fs.writeFile(path.join(assetCacheRoot, entry.filename), data);
        entry.bytes = data.length;
        entry.status = "downloaded";
      } catch (error) {
        entry.status = `failed: ${error.message}`;
        failures.push({ url, error: error.message });
      }
      completed += 1;
      if (completed % 25 === 0 || completed === urlList.length) console.log(`Fetched ${completed}/${urlList.length} external assets.`);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  for (const entry of byUrl.values()) {
    if (entry.status !== "downloaded") continue;
    const cachedPath = path.join(assetCacheRoot, entry.filename);
    try {
      await fs.access(cachedPath);
      await fs.copyFile(cachedPath, path.join(publicRoot, entry.filename));
    } catch {
      entry.status = "missing-cached-file";
      continue;
    }
    const parsed = new URL(entry.url);
    if (parsed.hostname !== "assets.aceternity.com") continue;
    const relative = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
    const destination = path.resolve(path.join(publicRoot, ".."), relative);
    const base = path.resolve(path.join(publicRoot, ".."));
    if (!destination.startsWith(`${base}${path.sep}`)) continue;
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(path.join(publicRoot, entry.filename), destination);
  }
  console.log(`Download failures: ${failures.length}.`);
}
for (const entry of byUrl.values()) {
  if (entry.status !== "downloaded") continue;
  const cachedPath = path.join(assetCacheRoot, entry.filename);
  let bytes;
  try { bytes = await fs.readFile(cachedPath); } catch { continue; }
  const extension = bytes[0] === 0xff && bytes[1] === 0xd8 ? ".jpg"
    : bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" ? ".png"
      : bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP" ? ".webp" : null;
  if (!extension || path.extname(entry.filename) !== ".bin") continue;
  const newFilename = `${path.basename(entry.filename, ".bin")}${extension}`;
  const newPath = path.join(assetCacheRoot, newFilename);
  await fs.rename(cachedPath, newPath);
  entry.filename = newFilename;
  entry.localPath = `/research-assets/${newFilename}`;
  entry.bytes = bytes.length;
  await fs.copyFile(newPath, path.join(publicRoot, newFilename));
}
const manifest = {
  retrievedAt: new Date().toISOString(),
  count: byUrl.size,
  assets: [...byUrl.values()],
  previewSubstitutions: [
    {
      sourceUrl: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png",
      localUrl: "/demos/algochurn.webp",
      reason: "The original external image is not available to the restricted local runner; use a cached official demo thumbnail so the interactive product menu remains visually inspectable.",
    },
    {
      sourceUrl: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
      localUrl: "/demos/tailwindmasterkit.webp",
      reason: "The original external image is not available to the restricted local runner; use a cached official demo thumbnail so the interactive product menu remains visually inspectable.",
    },
  ],
};
await fs.writeFile(oldManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
