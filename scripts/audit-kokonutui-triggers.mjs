import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localRoot = path.join(root, ".component-lab-cache/kokonutui-source");
const require = createRequire(path.join(localRoot, "package.json"));
const { chromium } = require("playwright-core");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/kokonutui/catalog.json"), "utf8"));
const auditPath = path.join(localRoot, "research/evidence/browser-audit.json");
const evidence = path.join(localRoot, "research/evidence");
const base = "http://localhost:38474";
const start = Math.max(0, Number(process.argv[2] ?? 0));
const limit = Math.max(1, Number(process.argv[3] ?? catalog.items.length));
const gesturePattern = /drag|flick|swipe|scrub|plucked|plucking|pull|throw|spin|turn|coast|rotary|scrubbable|scrubbable|scrubbed|spring|hold|press and hold|press.*release/i;
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-gpu", "--no-sandbox"] });

for (const item of catalog.items.slice(start, start + limit)) {
  const isGesture = gesturePattern.test(item.description);
  if (!isGesture) continue;
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error.message || error)));
  try {
    await page.goto(`${base}${item.localDocsRoute}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(500);
    const surface = page.locator(".preview-surface").first();
    await surface.scrollIntoViewIfNeeded();
    const selector = "canvas, [role=slider], [role=spinbutton], [role=group][tabindex], [role=tab], [tabindex], [data-drag-handle], .cursor-grab, .cursor-pointer, button:not([disabled])";
    let target = surface.locator(selector).first();
    if (!(await target.count())) target = surface;
    const box = await target.boundingBox();
    if (!box || box.width < 2 || box.height < 2) throw new Error("No visible target for the documented gesture.");
    const targetInfo = await target.evaluate((el) => ({ tag: el.tagName, role: el.getAttribute("role"), label: el.getAttribute("aria-label"), className: typeof el.className === "string" ? el.className.slice(0, 160) : "", text: el.innerText?.trim().slice(0, 140) ?? "", tabIndex: el.getAttribute("tabindex") }));
    const clip = { x: Math.max(0, box.x), y: Math.max(0, box.y), width: Math.max(1, Math.min(box.width, 1400 - Math.max(0, box.x))), height: Math.max(1, Math.min(box.height, 900 - Math.max(0, box.y))) };
    const hash = async () => crypto.createHash("sha256").update(await page.screenshot({ clip })).digest("hex");
    const beforeText = await surface.innerText().catch(() => "");
    const beforeHash = await hash();
    const action = { sourceDescription: item.description, target: targetInfo, trigger: "", beforeSha256: beforeHash, afterSha256: null, changed: null, beforeText, afterText: "", pageErrors: errors };

    if (/hold|press and hold/i.test(item.description) || item.name === "hold-button") {
      await target.hover();
      await page.mouse.down();
      action.trigger = "pointer down and hold for 900 ms, then release";
      await page.waitForTimeout(900);
      action.duringHoldSha256 = await hash();
      await page.screenshot({ path: path.join(evidence, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-held.png`), fullPage: false, animations: "allow" });
      await page.mouse.up();
    } else if (/spin|rotary|dial|turn/i.test(item.description) || ["detent-dial", "spending-ring", "timezone-planner"].includes(item.name)) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      const radius = Math.max(24, Math.min(box.width, box.height) * 0.25);
      await page.mouse.move(cx + radius, cy);
      await page.mouse.down();
      for (const angle of [45, 90, 135, 180, 225, 270, 315, 360]) {
        const radians = (angle * Math.PI) / 180;
        await page.mouse.move(cx + radius * Math.cos(radians), cy + radius * Math.sin(radians), { steps: 2 });
      }
      action.trigger = "pointer drag around the control in a full circle";
      action.duringGestureSha256 = await hash();
      await page.screenshot({ path: path.join(evidence, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-gesture.png`), fullPage: false, animations: "allow" });
      await page.mouse.up();
    } else {
      const vertical = /vertical|up|down|pull|sheet|drawer|liquid slider/i.test(item.description) || ["smooth-drawer", "liquid-slider", "pull-cord", "page-flip"].includes(item.name);
      const from = { x: box.x + box.width * 0.5, y: box.y + box.height * 0.52 };
      const to = vertical
        ? { x: from.x + box.width * 0.03, y: box.y + box.height * 0.25 }
        : { x: box.x + box.width * 0.78, y: from.y + box.height * 0.04 };
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      await page.mouse.move(to.x, to.y, { steps: 12 });
      action.trigger = vertical ? "pointer drag vertically across the preview target" : "pointer drag horizontally across the preview target";
      action.duringGestureSha256 = await hash();
      await page.screenshot({ path: path.join(evidence, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-gesture.png`), fullPage: false, animations: "allow" });
      await page.mouse.up();
    }
    await page.waitForTimeout(450);
    action.afterSha256 = await hash();
    action.changed = action.beforeSha256 !== action.afterSha256 || Boolean(action.duringGestureSha256 && action.duringGestureSha256 !== action.beforeSha256);
    action.afterText = await surface.innerText().catch(() => "");
    action.runningAnimationsAfter = await surface.evaluate((el) => [...el.getAnimations({ subtree: true })].filter((animation) => animation.playState === "running").length).catch(() => 0);
    action.pageErrors = errors;

    let rows = [];
    try { rows = JSON.parse(await fs.readFile(auditPath, "utf8")); } catch {}
    const record = rows.find((entry) => entry.id === item.id);
    if (!record) throw new Error(`Base audit record missing for ${item.id}.`);
    record.gestureAudit = action;
    await fs.writeFile(auditPath, `${JSON.stringify(rows, null, 2)}\n`);
    console.log(`${catalog.items.indexOf(item) + 1}/${catalog.items.length} ${item.name}: ${action.trigger}; target=${targetInfo.tag}[${targetInfo.role ?? "no role"}], changed=${action.changed}, page errors=${errors.length}`);
  } catch (error) {
    console.log(`${catalog.items.indexOf(item) + 1}/${catalog.items.length} ${item.name}: gesture review failed: ${error.message || error}`);
  } finally {
    await page.close();
  }
}

await browser.close();
