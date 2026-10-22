import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, ".component-lab-cache/kokonutui-source");
const require = createRequire(path.join(source, "package.json"));
const { chromium } = require("playwright-core");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/kokonutui/catalog.json"), "utf8"));
const auditPath = path.join(source, "research/evidence/browser-audit.json");
const audit = JSON.parse(await fs.readFile(auditPath, "utf8"));
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--disable-gpu", "--no-sandbox"] });
const cases = ["ai-citations", "ai-diff-review", "notification-stack", "activity-terrain", "synced-transcript", "ai-agent-lanes"];
const requested = new Set(process.argv.slice(2));
for (const name of cases.filter((candidate) => !requested.size || requested.has(candidate))) {
  const item = catalog.items.find((entry) => entry.name === name);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error.message || error)));
  await page.goto(`http://localhost:38474${item.localDocsRoute}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  const surface = page.locator(".preview-surface").first();
  await surface.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const screenshot = async (suffix) => {
    const bounds = await surface.boundingBox();
    if (!bounds) throw new Error(`${name}: preview surface not visible for ${suffix} capture.`);
    const file = path.join(source, "research/evidence", `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${name}-targeted-${suffix}.png`);
    await page.screenshot({ path: file, clip: bounds, animations: "allow" });
    return path.relative(path.join(source, "research"), file).replaceAll("\\", "/");
  };
  const hash = async () => {
    const bounds = await surface.boundingBox();
    if (!bounds) return null;
    return crypto.createHash("sha256").update(await page.screenshot({ clip: bounds, animations: "allow" })).digest("hex");
  };
  const beforeText = await surface.innerText();
  const beforeHash = await hash();
  const steps = [];

  if (name === "ai-citations") {
    const chip = surface.locator('button[aria-label^="Sources:"]').first();
    await chip.hover();
    await page.waitForTimeout(230);
    const tooltip = surface.getByRole("tooltip");
    if (!(await tooltip.count())) throw new Error("Citation chip hover did not open its source card.");
    steps.push({ trigger: "hover a cited source chip", observed: (await tooltip.innerText()).slice(0, 220), screenshot: await screenshot("source-hover") });
    await chip.click();
    await page.waitForTimeout(230);
    steps.push({ trigger: "click the cited source chip to pin its preview", observed: (await surface.innerText()).slice(-400), screenshot: await screenshot("source-pinned") });
  } else if (name === "ai-diff-review") {
    const accept = surface.locator('button[aria-label^="Accept "]').first();
    if (!(await accept.count())) throw new Error("Diff review has no accept action.");
    await accept.click();
    await page.waitForTimeout(180);
    const acceptedText = await surface.innerText();
    steps.push({ trigger: "accept the first reviewed file", observed: acceptedText.slice(0, 600), screenshot: await screenshot("file-accepted") });
    const undo = surface.locator('button[aria-label^="Undo for "]').first();
    if (await undo.count()) {
      await undo.click();
      await page.waitForTimeout(180);
      steps.push({ trigger: "undo the file decision", observed: (await surface.innerText()).slice(0, 600), screenshot: await screenshot("file-undone") });
    }
  } else if (name === "notification-stack") {
    const card = surface.locator("article[aria-label]").first();
    await card.hover();
    await page.waitForTimeout(320);
    const stackCountBefore = await surface.locator("article[aria-label]").count();
    steps.push({ trigger: "hover the front card to fan out the stack", observed: (await surface.innerText()).slice(0, 500), cardsVisible: stackCountBefore, screenshot: await screenshot("stack-hover") });
    const box = await card.boundingBox();
    if (!box) throw new Error("Expanded notification card not visible for swipe probe.");
    await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 1.25, box.y + box.height * 0.5, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(650);
    let cardsAfterSwipe = await surface.locator("article[aria-label]").count();
    steps.push({ trigger: "swipe the front notification card sideways", observed: (await surface.innerText()).slice(0, 500), cardsBefore: stackCountBefore, cardsAfter: cardsAfterSwipe, changed: cardsAfterSwipe < stackCountBefore, screenshot: await screenshot("card-swiped") });
    if (cardsAfterSwipe === stackCountBefore) {
      await card.focus();
      await page.keyboard.press("Delete");
      await page.waitForTimeout(450);
      cardsAfterSwipe = await surface.locator("article[aria-label]").count();
      steps.push({ trigger: "press Delete on a focused notification card (keyboard dismissal fallback)", observed: (await surface.innerText()).slice(0, 500), cardsAfter: cardsAfterSwipe, changed: cardsAfterSwipe < stackCountBefore, screenshot: await screenshot("keyboard-dismiss") });
    }
  } else if (name === "activity-terrain") {
    const terrain = surface.locator('[role="img"][aria-label*="contributions"]');
    const box = await terrain.boundingBox();
    if (!box) throw new Error("Activity terrain interaction surface not found.");
    await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.52);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.76, box.y + box.height * 0.42, { steps: 18 });
    await page.mouse.move(box.x + box.width * 0.86, box.y + box.height * 0.7, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(220);
    steps.push({ trigger: "drag across the terrain surface to rotate it", observed: await surface.innerText(), screenshot: await screenshot("terrain-rotated") });
  } else if (name === "synced-transcript") {
    const play = surface.getByRole("button", { name: "Play", exact: true });
    await play.click();
    await page.waitForTimeout(650);
    steps.push({ trigger: "play sample audio", observed: (await surface.innerText()).slice(-500), screenshot: await screenshot("audio-playing") });
    const word = surface.getByRole("button", { name: /^Welcome back\./ }).first();
    await word.click();
    await page.waitForTimeout(220);
    steps.push({ trigger: "click a transcript segment to seek playback", observed: (await surface.innerText()).slice(-500), screenshot: await screenshot("transcript-seek") });
    const scroll = surface.getByRole("region", { name: "Transcript" });
    await scroll.evaluate((el) => { el.scrollTop = el.scrollHeight; el.dispatchEvent(new Event("scroll", { bubbles: true })); });
    await page.waitForTimeout(140);
    steps.push({ trigger: "scroll away from the active transcript section", observed: (await surface.innerText()).slice(-280), screenshot: await screenshot("scrolled-away") });
  } else if (name === "ai-agent-lanes") {
    const range = surface.getByRole("slider", { name: "Run time" });
    const initialValue = await range.inputValue();
    const box = await range.boundingBox();
    if (!box) throw new Error("AI agent run-time scrubber not visible.");
    await page.mouse.click(box.x + box.width * 0.84, box.y + box.height / 2);
    await page.waitForTimeout(200);
    steps.push({ trigger: "scrub the agent-run timeline to a later time", before: initialValue, after: await range.inputValue(), observed: (await surface.innerText()).slice(-500), screenshot: await screenshot("timeline-scrubbed") });
    const pause = surface.getByRole("button", { name: "Pause" });
    if (await pause.count()) {
      await pause.click();
      await page.waitForTimeout(150);
      steps.push({ trigger: "pause the agent run", observed: (await surface.innerText()).slice(-400), screenshot: await screenshot("run-paused") });
    }
  }

  const record = audit.find((entry) => entry.id === item.id);
  const afterHash = await hash();
  record.featuredInteractionAudit = {
    steps,
    beforeText: beforeText.slice(0, 500),
    changed: beforeHash !== afterHash,
    pageErrors,
  };
  await fs.writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`);
  console.log(`${name}: ${steps.length} source-specific interactions captured; page errors=${pageErrors.length}`);
  await page.close();
}
await browser.close();
