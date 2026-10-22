import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localRoot = path.join(root, ".component-lab-cache/kokonutui-source");
const require = createRequire(path.join(localRoot, "package.json"));
const { chromium } = require("playwright-core");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/kokonutui/catalog.json"), "utf8"));
const evidenceRoot = path.join(localRoot, "research/evidence");
await fs.mkdir(evidenceRoot, { recursive: true });
const start = Math.max(0, Number(process.argv[2] ?? 0));
const limit = Math.max(1, Number(process.argv[3] ?? catalog.items.length));
const items = catalog.items.slice(start, start + limit);
const base = "http://localhost:38474";
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-gpu", "--no-sandbox"] });
const results = [];

for (const item of items) {
  const record = { id: item.id, route: item.localDocsRoute, variants: item.publishedExampleCount, desktop: null, mobile: null, errors: [], consoleIssues: [], screenshot: null };
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, hasTouch: true });
  page.on("pageerror", (error) => record.errors.push(String(error.message || error)));
  page.on("console", (message) => { if (["error", "warning"].includes(message.type())) record.consoleIssues.push(`${message.type()}: ${message.text()}`); });
  try {
    const response = await page.goto(`${base}${item.localDocsRoute}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(1200);
    const preview = page.locator(".preview-surface").first();
    const figures = page.locator("figure");
    const figureCount = await figures.count();
    let target = preview;
    if (!(await target.count())) target = figures.first();
    if (await target.count()) await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const describe = async () => page.evaluate(() => {
      const visible = (node) => {
        const rect = node.getBoundingClientRect();
        return rect.width > 200 && rect.height > 80 && rect.bottom > 0 && rect.top < innerHeight;
      };
      const el = [...document.querySelectorAll(".preview-surface")].find(visible)
        ?? [...document.querySelectorAll("[data-preview], figure")].find(visible);
      const rect = el?.getBoundingClientRect();
      const active = [...(el?.getAnimations({ subtree: true }) ?? [])].filter((animation) => animation.playState === "running").length;
      const buttons = [...(el ?? document).querySelectorAll("button")].map((button) => ({ text: button.innerText.trim().slice(0, 80), label: button.getAttribute("aria-label"), disabled: button.disabled }));
      return {
        preview: el ? { tag: el.tagName, className: typeof el.className === "string" ? el.className : "", width: Math.round(rect.width), height: Math.round(rect.height), text: el.innerText?.trim().slice(0, 400) ?? "" } : null,
        viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth },
        runningAnimations: active,
        reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
        buttons,
      };
    });
    record.desktop = { status: response?.status() ?? null, figureCount, ...(await describe()) };
    const safe = item.name.replace(/[^a-z0-9-]/gi, "-");
    const screenshot = path.join(evidenceRoot, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${safe}-desktop.png`);
    await page.screenshot({ path: screenshot, fullPage: false, animations: "allow" });
    record.screenshot = path.relative(localRoot, screenshot).replaceAll("\\", "/");
    const surface = page.locator(".preview-surface").first();
    const signal = item.sourceSignals ?? {};
    const triggerNames = signal.eventHandlers ?? [];
    const interaction = { sourceHandlers: triggerNames, triggerAttempted: [], beforeText: record.desktop.preview?.text ?? "", afterText: "", runningAnimationsAfter: 0, canvasChange: null, touchAttempted: false };
    const canvasTarget = surface.locator("canvas").first();
    if (signal.usesCanvas && await canvasTarget.count()) {
      const bounds = await canvasTarget.boundingBox();
      if (bounds) {
        const screenshotHash = async () => crypto.createHash("sha256").update(await page.screenshot({ clip: bounds })).digest("hex");
        const beforeCanvas = await screenshotHash();
        await page.mouse.move(bounds.x + bounds.width * 0.42, bounds.y + bounds.height * 0.48);
        interaction.triggerAttempted.push("pointer-move on canvas");
        await page.waitForTimeout(350);
        await page.mouse.move(bounds.x + bounds.width * 0.7, bounds.y + bounds.height * 0.65);
        await page.mouse.click(bounds.x + bounds.width * 0.7, bounds.y + bounds.height * 0.65);
        interaction.triggerAttempted.push("pointer sweep and click on canvas");
        await page.waitForTimeout(350);
        const afterCanvas = await screenshotHash();
        interaction.canvasChange = { beforeSha256: beforeCanvas, afterSha256: afterCanvas, changed: beforeCanvas !== afterCanvas };
      }
    } else if (triggerNames.some((name) => /(?:Click|Down|Up|Press|Select|Open|Toggle|Change|Key)/i.test(name))) {
      const button = surface.locator("button:not([disabled])").first();
      if (await button.count()) {
        await button.hover().catch(() => {});
        interaction.triggerAttempted.push("hover first enabled preview button");
        await button.click({ timeout: 1500 }).catch(() => {});
        interaction.triggerAttempted.push("click first enabled preview button");
        await page.waitForTimeout(350);
      } else {
        const bounds = await surface.boundingBox();
        if (bounds) {
          const before = crypto.createHash("sha256").update(await page.screenshot({ clip: bounds })).digest("hex");
          const from = { x: bounds.x + bounds.width * 0.35, y: bounds.y + bounds.height * 0.5 };
          const to = { x: bounds.x + bounds.width * 0.67, y: bounds.y + bounds.height * 0.5 };
          await page.mouse.move(from.x, from.y);
          interaction.triggerAttempted.push("pointer move across preview surface");
          if (triggerNames.some((name) => /(?:Down|Up|Drag|Pointer)/i.test(name))) {
            await page.mouse.down();
            await page.mouse.move(to.x, to.y, { steps: 10 });
            await page.mouse.up();
            interaction.triggerAttempted.push("pointer drag across preview surface");
          } else {
            await page.mouse.click(to.x, to.y);
            interaction.triggerAttempted.push("click preview surface");
          }
          await page.waitForTimeout(350);
          const after = crypto.createHash("sha256").update(await page.screenshot({ clip: bounds })).digest("hex");
          interaction.frameChange = { beforeSha256: before, afterSha256: after, changed: before !== after };
        }
      }
    } else {
      const hoverable = surface.locator("[data-state], [role=button], button, a, svg, [class*=cursor]").first();
      if (await hoverable.count()) {
        await hoverable.hover({ timeout: 1500 }).catch(() => {});
        interaction.triggerAttempted.push("hover first preview target");
        await page.waitForTimeout(300);
      }
    }
    interaction.afterText = await surface.innerText().catch(() => "");
    interaction.runningAnimationsAfter = await surface.evaluate((el) => [...el.getAnimations({ subtree: true })].filter((animation) => animation.playState === "running").length).catch(() => 0);
    record.interaction = interaction;
    await page.screenshot({ path: path.join(evidenceRoot, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${safe}-active.png`), fullPage: false, animations: "allow" });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(250);
    record.mobile = await describe();
    if (signal.usesCanvas || triggerNames.some((name) => /(?:Click|Down|Up|Press|Select|Open|Toggle|Change)/i.test(name))) {
      await surface.scrollIntoViewIfNeeded().catch(() => {});
      const bounds = await surface.boundingBox();
      if (bounds) {
        await page.touchscreen.tap(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2).catch(() => {});
        record.interaction.touchAttempted = true;
        await page.waitForTimeout(250);
        record.interaction.touchAfterText = await surface.innerText().catch(() => "");
        record.interaction.touchRunningAnimations = await surface.evaluate((el) => [...el.getAnimations({ subtree: true })].filter((animation) => animation.playState === "running").length).catch(() => 0);
      }
    }
    record.mobile.screenshot = path.join("evidence", `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${safe}-mobile.png`);
    await page.screenshot({ path: path.join(evidenceRoot, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${safe}-mobile.png`), fullPage: false, animations: "allow" });
  } catch (error) {
    record.errors.push(`audit: ${error.message || error}`);
  } finally {
    await page.close();
  }
  results.push(record);
  const output = path.join(evidenceRoot, "browser-audit.json");
  let prior = [];
  try { prior = JSON.parse(await fs.readFile(output, "utf8")); } catch {}
  const merged = new Map(prior.map((entry) => [entry.id, entry]));
  merged.set(record.id, record);
  await fs.writeFile(output, `${JSON.stringify([...merged.values()], null, 2)}\n`);
  console.log(`${catalog.items.indexOf(item) + 1}/${catalog.items.length} ${item.name}: HTTP ${record.desktop?.status ?? "error"}, preview ${record.desktop?.preview?.width ?? "missing"}x${record.desktop?.preview?.height ?? ""}, animations ${record.desktop?.runningAnimations ?? "?"}, page errors ${record.errors.length}, console issues ${record.consoleIssues.length}`);
}

await browser.close();
console.log(`Saved ${results.length} preview audits to ${path.relative(root, path.join(evidenceRoot, "browser-audit.json"))}.`);
