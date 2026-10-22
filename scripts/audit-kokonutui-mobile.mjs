import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localRoot = path.join(root, ".component-lab-cache/kokonutui-source");
const require = createRequire(path.join(localRoot, "package.json"));
const { chromium } = require("playwright-core");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/kokonutui/catalog.json"), "utf8"));
const auditPath = path.join(localRoot, "research/evidence/browser-audit.json");
const evidenceRoot = path.join(localRoot, "research/evidence");
const start = Math.max(0, Number(process.argv[2] ?? 0));
const limit = Math.max(1, Number(process.argv[3] ?? catalog.items.length));
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-gpu", "--no-sandbox"] });
const base = "http://localhost:38474";

for (const item of catalog.items.slice(start, start + limit)) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error.message || error)));
  try {
    const response = await page.goto(`${base}${item.localDocsRoute}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(450);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    const surface = page.locator(".preview-surface").first();
    await surface.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const details = await surface.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        text: el.innerText?.trim().slice(0, 500) ?? "",
        buttons: [...el.querySelectorAll("button")].map((button) => ({ label: button.getAttribute("aria-label"), text: button.innerText.trim().slice(0, 70) })),
        runningAnimations: [...el.getAnimations({ subtree: true })].filter((animation) => animation.playState === "running").length,
      };
    });
    const metrics = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches }));
    const index = catalog.items.indexOf(item) + 1;
    const filename = `${String(index).padStart(2, "0")}-${item.name}-mobile.png`;
    await page.screenshot({ path: path.join(evidenceRoot, filename), fullPage: false, animations: "allow" });
    let audit = [];
    try { audit = JSON.parse(await fs.readFile(auditPath, "utf8")); } catch {}
    const entry = audit.find((record) => record.id === item.id);
    if (!entry) throw new Error(`Desktop/browser record missing for ${item.id}.`);
    entry.mobile = { ...metrics, preview: details, screenshot: `evidence/${filename}`, status: response?.status() ?? null, pageErrors: errors };
    await fs.writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`);
    console.log(`${index}/${catalog.items.length} ${item.name}: HTTP ${response?.status() ?? "?"}, preview ${details.width}x${details.height} at y=${details.top}, page width ${metrics.scrollWidth}, reduced motion ${metrics.reducedMotion}, errors ${errors.length}`);
  } catch (error) {
    console.log(`${item.name}: mobile audit failed: ${error.message || error}`);
  } finally {
    await page.close();
  }
}

await browser.close();
