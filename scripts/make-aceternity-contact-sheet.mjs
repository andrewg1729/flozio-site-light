import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const auditRoot = path.join(root, ".component-lab-cache/aceternity/browser-audit");
const rows = JSON.parse(await fs.readFile(path.join(auditRoot, "runtime-results.json"), "utf8"));
const start = Number(process.argv[2] ?? 0);
const count = Number(process.argv[3] ?? 20);
const selected = rows.slice(start, start + count);
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const cards = [];
for (const row of selected) {
  const images = [];
  for (const [key, label] of [["initial", "initial"], ["active", "after input"]]) {
    const screenshot = row.screenshots?.[key];
    if (!screenshot) continue;
    const image = await fs.readFile(path.join(root, screenshot.path));
    images.push(`<figure><img alt="${label}" src="data:image/png;base64,${image.toString("base64")}"><figcaption>${label}</figcaption></figure>`);
  }
  const flags = [`${row.status}`, `${row.inputInferredFromSource} -> ${row.interaction?.action}`, `mobile overflow: ${row.mobile?.overflow}`, `errors: ${row.consoleErrors?.length ?? 0}`].join(" | ");
  cards.push(`<article><h2>${escape(row.key)}</h2><p>${escape(flags)}</p><div class="shots">${images.join("")}</div><p class="desc">${escape(row.initial?.body?.replace(/\s+/g, " ").slice(0, 190) ?? "")}</p></article>`);
}

const html = `<!doctype html><meta charset="utf-8"><title>Aceternity preview audit ${start}-${start + selected.length}</title><style>body{font:14px Arial;margin:0;padding:16px;background:#eee}h1{font-size:18px}main{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}article{background:#fff;padding:10px;border:1px solid #ccc;overflow:hidden}h2{font-size:14px;margin:0 0 4px}p{font-size:10px;margin:4px 0}.shots{display:flex;gap:6px}figure{margin:0;min-width:0;flex:1}img{width:100%;height:180px;object-fit:cover;object-position:top;border:1px solid #ddd}figcaption{font-size:9px;color:#666}.desc{height:22px;overflow:hidden}</style><h1>Aceternity browser inspection: ${start + 1}-${start + selected.length}</h1><main>${cards.join("")}</main>`;
const output = path.join(auditRoot, `contact-${start + 1}-${start + selected.length}.html`);
await fs.writeFile(output, html);
console.log(path.relative(root, output));
