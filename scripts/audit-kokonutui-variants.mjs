import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, ".component-lab-cache/kokonutui-source");
const require = createRequire(path.join(source, "package.json"));
const { chromium } = require("playwright-core");
const file = path.join(root, "component-research/kokonutui/catalog.json");
const catalog = JSON.parse(await fs.readFile(file, "utf8"));
const auditFile = path.join(source, "research/evidence/browser-audit.json");
const audit = JSON.parse(await fs.readFile(auditFile, "utf8"));
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-gpu", "--no-sandbox"] });
const ids = new Set(catalog.items.filter((item) => item.publishedExampleCount > 1).map((item) => item.name));
const requested = new Set(process.argv.slice(2));
for (const item of catalog.items.filter((entry) => ids.has(entry.name) && (!requested.size || requested.has(entry.name)))) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error.message || error)));
  await page.goto(`http://localhost:38474${item.localDocsRoute}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  const surface = page.locator(".preview-surface").first();
  await surface.scrollIntoViewIfNeeded();
  const beforeText = await surface.innerText();
  const observations = [];
  if (item.name === "glitch-text") {
    const texts = surface.locator("span.sr-only");
    for (let index = 0; index < await texts.count(); index++) {
      const target = texts.nth(index).locator("xpath=..");
      const text = await texts.nth(index).innerText();
      const box = await target.boundingBox();
      if (!box) continue;
      const bounds = await surface.boundingBox();
      const before = bounds ? crypto.createHash("sha256").update(await page.screenshot({ clip: bounds, animations: "allow" })).digest("hex") : null;
      const startedAt = Date.now();
      let runningFrames = 0;
      let visibleText = await surface.innerText();
      let textChanged = false;
      let imageAfter = Buffer.from("");
      const duration = index === 0 ? 2200 : 3200;
      while (Date.now() - startedAt < duration) {
        const state = await target.evaluate((el) => ({ running: el.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length, text: el.innerText }));
        runningFrames = Math.max(runningFrames, state.running);
        visibleText = await surface.innerText();
        textChanged = textChanged || (index === 1 && state.text !== text);
        if (state.running > 0 || (index === 1 && state.text !== text)) {
          imageAfter = bounds ? await page.screenshot({ clip: bounds, animations: "allow" }) : Buffer.from("");
          if (state.running > 0) break;
        }
        await page.waitForTimeout(25);
      }
      if (!imageAfter.length && bounds) imageAfter = await page.screenshot({ clip: bounds, animations: "allow" });
      const shotPath = path.join(source, "research/evidence", `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-variant-${String(index + 1).padStart(2, "0")}-active.png`);
      await fs.writeFile(shotPath, imageAfter);
      const after = imageAfter.length ? crypto.createHash("sha256").update(imageAfter).digest("hex") : null;
      observations.push({ variant: index + 1, target: text, trigger: index === 0 ? "default idle glitch starts 1.2s after entering view, then repeats after a random 4–9s interval" : "text changes on a 2.4s interval and triggers a glitch transition", changed: Boolean(runningFrames || textChanged), textChanged, runningAnimationFramesObserved: runningFrames, screenshot: path.relative(path.join(source, "research"), shotPath).replaceAll("\\", "/"), visible: visibleText });
    }
  } else {
    for (let index = 0; index < item.publishedExampleCount; index++) {
      await page.goto(`http://localhost:38474${item.localDocsRoute}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(350);
      const currentSurface = page.locator(".preview-surface").first();
      await currentSurface.scrollIntoViewIfNeeded();
      const controls = currentSurface.locator("button:not([disabled])");
      const count = await controls.count();
      if (index >= count) { observations.push({ variant: index + 1, trigger: "no corresponding enabled button found", changed: false }); continue; }
      const button = controls.nth(index);
      await button.scrollIntoViewIfNeeded();
      const box = await button.boundingBox();
      if (!box) { observations.push({ variant: index + 1, trigger: "button had no visible box", changed: false }); continue; }
      const before = await currentSurface.innerText();
      const previewBounds = await currentSurface.boundingBox();
      const imageBefore = previewBounds ? await page.screenshot({ clip: previewBounds, animations: "allow" }).catch(() => Buffer.from("")) : Buffer.from("");
      let shortcutHeldChanged = null;
      let shortcutKeycapState = null;
      let shortcutDuringPath = null;
      if (item.name === "command-button") {
        if (index === 1 || index === 2) {
          const keys = index === 1 ? ["c"] : ["Shift", "n"];
          for (const key of keys) await page.keyboard.down(key);
          await page.waitForTimeout(120);
          const during = previewBounds ? await page.screenshot({ clip: previewBounds, animations: "allow" }) : Buffer.from("");
          shortcutHeldChanged = !imageBefore.equals(during);
          shortcutKeycapState = await currentSurface.locator("kbd").evaluateAll((nodes) => nodes.map((node) => node.className));
          shortcutDuringPath = path.join(source, "research/evidence", `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-variant-${String(index + 1).padStart(2, "0")}-during.png`);
          await fs.writeFile(shortcutDuringPath, during);
          for (const key of [...keys].reverse()) await page.keyboard.up(key);
        } else await button.click();
        await page.waitForTimeout(250);
      } else if (item.name === "hold-button") {
        await button.hover({ timeout: 1500 });
        await page.mouse.down();
        await page.waitForTimeout(index === 2 ? 2200 : 1600);
        await page.mouse.up();
        await page.waitForTimeout(250);
      } else if (item.name === "tear-button") {
        await button.press("Enter");
        await page.waitForTimeout(500);
      } else if (item.name === "gradient-button") {
        await button.hover({ timeout: 1500 });
        await page.waitForTimeout(250);
      } else {
        await button.click();
        await page.waitForTimeout(500);
      }
      const after = await currentSurface.innerText().catch(() => "");
      const imageAfter = await page.screenshot({ clip: await currentSurface.boundingBox(), animations: "allow" }).catch(() => Buffer.from(""));
      const shotPath = path.join(source, "research/evidence", `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-variant-${String(index + 1).padStart(2, "0")}-active.png`);
      await fs.writeFile(shotPath, imageAfter);
      observations.push({
        variant: index + 1,
        config: item.review.variants[index]?.source,
        trigger: item.name === "command-button" ? ["click; global disabled in this variant", "press c shortcut", "press Shift+N shortcut"][index] : item.name === "hold-button" ? `hold ${index === 2 ? "2200" : "1600"}ms` : item.name === "tear-button" ? "keyboard Enter invokes tear confirmation" : item.name === "gradient-button" ? "hover" : "click",
        changed: before !== after || !imageBefore.equals(imageAfter),
        ...(shortcutHeldChanged !== null ? { shortcutHeldChanged } : {}),
        ...(shortcutKeycapState ? { shortcutKeycapState } : {}),
        textChanged: before !== after,
        beforeText: before.slice(0, 350),
        afterText: after.slice(0, 350),
        screenshot: path.relative(path.join(source, "research"), shortcutDuringPath ?? shotPath).replaceAll("\\", "/"),
        settledScreenshot: path.relative(path.join(source, "research"), shotPath).replaceAll("\\", "/"),
      });
    }
  }
  const record = audit.find((entry) => entry.id === item.id);
  record.variantInteractionAudit = { expectedVariants: item.publishedExampleCount, observations, pageErrors: errors };
  await page.close();
  console.log(`${item.name}: checked ${observations.length}/${item.publishedExampleCount} published instances; errors=${errors.length}`);
}
await fs.writeFile(auditFile, `${JSON.stringify(audit, null, 2)}\n`);
await browser.close();
