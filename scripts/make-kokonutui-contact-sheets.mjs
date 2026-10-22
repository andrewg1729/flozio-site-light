import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localRoot = path.join(root, ".component-lab-cache/kokonutui-source");
const evidence = path.join(localRoot, "research/evidence");
const audit = JSON.parse(await fs.readFile(path.join(evidence, "browser-audit.json"), "utf8"));
const require = createRequire(path.join(localRoot, "package.json"));
const { chromium } = require("playwright-core");
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-gpu", "--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1480, height: 940 }, deviceScaleFactor: 1 });

for (const kind of ["desktop", "active", "mobile"]) {
  for (let start = 0; start < audit.length; start += 12) {
    const subset = audit.slice(start, start + 12);
    const imagePath = (entry) => kind === "desktop"
      ? `${String(audit.findIndex((record) => record.id === entry.id) + 1).padStart(2, "0")}-${entry.id.split("/")[1]}-desktop.png`
      : kind === "active"
        ? `${String(audit.findIndex((record) => record.id === entry.id) + 1).padStart(2, "0")}-${entry.id.split("/")[1]}-active.png`
        : `${String(audit.findIndex((record) => record.id === entry.id) + 1).padStart(2, "0")}-${entry.id.split("/")[1]}-mobile.png`;
    const html = `<!doctype html><meta charset="utf-8"><style>
      *{box-sizing:border-box}body{margin:0;padding:14px;background:#f2f3f5;color:#17202a;font:12px/1.4 Arial,sans-serif}
      header{display:flex;justify-content:space-between;margin:0 2px 10px;font-weight:700}
      main{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
      figure{margin:0;overflow:hidden;background:#fff;border:1px solid #d9dde3;border-radius:5px}
      figcaption{height:26px;padding:5px 8px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      img{display:block;width:100%;height:212px;object-fit:cover;object-position:top center}
    </style><header><span>Kokonut UI · ${kind} preview captures</span><span>${start + 1}–${start + subset.length} / ${audit.length}</span></header><main>${subset.map((entry) => {
      const file = imagePath(entry);
      const title = `${String(audit.findIndex((record) => record.id === entry.id) + 1).padStart(2, "0")} · ${entry.id.split("/")[1]}`;
      return `<figure><figcaption>${title}</figcaption><img src="${pathToFileURL(path.join(evidence, file)).href}" alt=""></figure>`;
    }).join("")}</main>`;
    const htmlPath = path.join(evidence, `${kind}-contact-${String(Math.floor(start / 12) + 1).padStart(2, "0")}.html`);
    await fs.writeFile(htmlPath, html);
    await page.goto(pathToFileURL(htmlPath).href);
    await page.waitForTimeout(100);
    const output = path.join(evidence, `${kind}-contact-${String(Math.floor(start / 12) + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: output, fullPage: true });
    console.log(path.relative(root, output));
  }
}

await browser.close();
