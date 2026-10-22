import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.join(root, ".component-lab-cache/aceternity-app");
const libraryRoot = path.join(root, ".component-lab-cache/aceternity");
const inventoryPath = path.join(appRoot, "preview-inventory.json");
const outputRoot = path.join(root, ".component-lab-cache/aceternity/browser-audit");
const port = 9237;
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const origin = process.env.ACETERNITY_PREVIEW_ORIGIN ?? "http://127.0.0.1:38473";
const args = new Map(process.argv.slice(2).map((arg, index, all) => [arg.startsWith("--") ? arg : all[index - 1], arg.startsWith("--") ? true : arg]));
const limit = args.has("--limit") ? Number(args.get("--limit")) : Infinity;
const from = Number(args.get("--from") ?? 0);
const filters = args.has("--only") ? new Set(String(args.get("--only")).split(",").map((value) => value.trim()).filter(Boolean)) : null;
const force = args.has("--force");
const inventory = JSON.parse(await fs.readFile(inventoryPath, "utf8"));
const previewRows = inventory.routeInventory.flatMap((item) => item.variants.map((variant) => ({ item, variant })))
  .filter(({ variant }) => variant.route);
const rows = previewRows.filter(({ item, variant }) => !filters || filters.has(`${item.name}:${variant.id}`)).slice(from, from + limit);
await fs.mkdir(outputRoot, { recursive: true });

const profile = path.join(appRoot, ".chrome-audit-profile");
const chrome = spawn(chromePath, [
  "--headless=new", "--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream", "--no-sandbox", "--no-first-run", "--no-default-browser-check",
  "--disable-background-networking", "--disable-extensions", "--remote-allow-origins=*",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--window-size=1440,1000", "about:blank",
], { stdio: "ignore", windowsHide: true });

let browser;
let socket;
const pending = new Map();
const listeners = new Map();
let sequence = 0;

async function waitForDebugger() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Chrome DevTools endpoint did not start.");
}

function on(method, callback) {
  const callbacks = listeners.get(method) ?? new Set();
  callbacks.add(callback);
  listeners.set(method, callbacks);
  return () => callbacks.delete(callback);
}

async function send(method, params = {}) {
  const id = ++sequence;
  const result = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out waiting for Chrome command ${method}`));
    }, 30_000);
    pending.set(id, { resolve, reject, timer });
  });
  socket.send(JSON.stringify({ id, method, params }));
  return result;
}

async function evaluate(expression, awaitPromise = false) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise, userGesture: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? "Chrome evaluation failed");
  return result.result?.value;
}

function screenshotName(row, state) {
  return path.join(outputRoot, `${row.item.name}--${row.variant.id}--${state}.png`);
}

async function capture(row, state) {
  const { data } = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
  const bytes = Buffer.from(data, "base64");
  const filepath = screenshotName(row, state);
  await fs.writeFile(filepath, bytes);
  return { path: path.relative(root, filepath), sha256: crypto.createHash("sha256").update(bytes).digest("hex"), bytes: bytes.length };
}

async function waitReady() {
  const start = Date.now();
  while (Date.now() - start < 120_000) {
    const state = await evaluate(`(() => ({ready: document.readyState, canvas: !!document.querySelector('.lab-canvas'), title: document.querySelector('main h1')?.textContent || document.title, body: document.body?.innerText?.slice(0,800) || '', nextError: !!document.querySelector('nextjs-portal') && /Build Error|Internal Server Error|Module not found|Cannot find module/.test(document.body.innerText) }))()`);
    if (state?.canvas || state?.nextError) return state;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return await evaluate(`(() => ({ready: document.readyState, canvas: !!document.querySelector('.lab-canvas'), title: document.querySelector('main h1')?.textContent || document.title, body: document.body?.innerText?.slice(0,800) || '', nextError: /Build Error|Internal Server Error|Module not found|Cannot find module/.test(document.body?.innerText||'') }))()`);
}

async function waitDemoReady() {
  const start = Date.now();
  while (Date.now() - start < 30_000) {
    const waiting = await evaluate(`!!document.querySelector('.lab-canvas [aria-label="Loading component preview"]')`);
    if (!waiting) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

async function waitLocalImages() {
  await evaluate(`Promise.race([Promise.all([...document.querySelectorAll('.lab-canvas img')].filter((image) => image.src.startsWith(location.origin)).map((image) => image.decode().catch(() => undefined))), new Promise((resolve) => setTimeout(resolve, 2500))])`, true);
}

function chooseInput(source, row) {
  const key = `${row.item.name}:${row.variant.id}`;
  const scrollComponents = new Set(["moving-line", "tracing-beam", "container-scroll-animation", "sticky-scroll-reveal", "floating-navbar", "macbook-scroll", "parallax-scroll", "parallax-scroll-2", "hero-parallax", "timeline", "resizable-navbar", "sticky-banner"]);
  if (scrollComponents.has(row.item.name)) return "scroll";
  if (["floating-dock", "magnetic-button"].includes(row.item.name)) return "hover";
  if (row.item.name === "pixelated-canvas") return "drag";
  if (key === "glowing-effect:1" || key === "glowing-effect:2") return "hover";
  if (["chromatic-image", "evervault-card", "svg-mask-effect"].includes(row.item.name)) return "hover";
  if (key === "background-ripple-effect:1") return "click";
  if (row.item.name === "keyboard") return "press";
  if (row.item.name === "3d-globe") return "drag";
  if (row.item.name === "sparkles" && row.variant.id === "2") return "wait";
  if (key === "infinite-moving-cards:1" || key === "background-beams:1" || key === "meteors:1") return "wait";
  if (/<(?:\w+\.)?(?:button|Button)\b[\s\S]{0,300}?onClick\s*=/.test(source)) return "click";
  if (/onDrag|drag="/i.test(source)) return "drag";
  if (/onMouseEnter|onMouseMove|onPointerMove|whileHover|group-hover|hover:/i.test(source)) return "hover";
  if (/useScroll|scrollYProgress|onScroll/i.test(source)) return "scroll";
  if (/onClick|onPointerUp|onTap|role=["']button/i.test(source)) return "click";
  if (/onPointerDown|draggable/i.test(source)) return "drag";
  return "wait";
}

async function applyInput(input, row) {
  if (`${row.item.name}:${row.variant.id}` === "notch:1") {
    const positioned = await evaluate(`(() => { const root=document.querySelector('.lab-canvas'); if(!root)return false; const rect=root.getBoundingClientRect(); window.scrollTo({top:Math.max(0,rect.bottom-innerHeight+8),behavior:'instant'}); return true })()`);
    await new Promise((resolve) => setTimeout(resolve, 250));
    const trigger = await evaluate(`(() => {const el=document.querySelector('.lab-canvas button[aria-haspopup="listbox"]');if(!el)return null;const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,text:el.innerText}})()`);
    if (!positioned || !trigger) return { action: "click-open-select", targetFound: false, reason: "notch control was not visible after scrolling its example into the viewport" };
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: trigger.x, y: trigger.y });
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: trigger.x, y: trigger.y, button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: trigger.x, y: trigger.y, button: "left", clickCount: 1 });
    await new Promise((resolve) => setTimeout(resolve, 450));
    const opened = await capture(row, "desktop-open-options");
    const option = await evaluate(`(() => {const el=[...document.querySelectorAll('.lab-canvas button')].find(x=>x.innerText.trim()==='Right');if(!el)return null;const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
    if (option) {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: option.x, y: option.y });
      await send("Input.dispatchMouseEvent", { type: "mousePressed", x: option.x, y: option.y, button: "left", clickCount: 1 });
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: option.x, y: option.y, button: "left", clickCount: 1 });
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    const selected = await capture(row, "desktop-after-selection");
    return { action: "open-notch-and-select-alignment", targetFound: true, target: { text: trigger.text, option: option ? "Right" : null }, optionsScreenshot: opened, duringGestureScreenshot: selected };
  }
  if (input === "wait") {
    const key = `${row.item.name}:${row.variant.id}`;
    const delay = row.item.name === "background-beams" ? 8_000
      : row.item.name === "meteors" ? 6_000
      : row.item.name === "infinite-moving-cards" ? 2_500
      : row.item.name === "card-stack" ? 5_500
      : row.item.name === "container-text-flip" ? 3_500
      : key === "canvas-reveal-effect:2" ? 1_500
      : 1_500;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return { action: "wait", targetFound: true };
  }
  if (input === "scroll") {
    const movement = await evaluate(`(() => { const el=document.querySelector('.lab-canvas'); if(!el) return null; const root=el.getBoundingClientRect(); const max=Math.max(0,document.documentElement.scrollHeight-innerHeight); const target=Math.min(max,Math.max(0,root.top+Math.min(root.height*.45,innerHeight*.52))); const before=window.scrollY; window.scrollTo({top:target,behavior:'instant'}); const after=window.scrollY; el.scrollTop=Math.max(0,Math.round(el.scrollHeight*.45)); return {before,after,componentHeight:Math.round(root.height),componentVisible:(root.top<innerHeight&&root.bottom>0)} })()`);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { action: "scroll", targetFound: Boolean(movement), ...movement };
  }
  if (input === "press") {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await new Promise((resolve) => setTimeout(resolve, 150));
    const gestureScreenshot = await capture(row, "desktop-during-press");
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { action: "physical-key-press", targetFound: true, target: { code: "KeyA" }, duringGestureScreenshot: gestureScreenshot };
  }
  const key = `${row.item.name}:${row.variant.id}`;
  const selectorOverrides = {
    "3d-globe:1": "canvas",
    "3d-globe:2": "canvas",
    "3d-globe:3": "canvas",
    "3d-globe:4": "canvas",
    "following-pointer:1": "[class*=group]",
    "background-gradient-animation:1": ".gradients-container",
    "input:source": "input",
    "background-boxes:1": ".border-t.border-r",
    "background-ripple-effect:1": ".cell",
    "canvas-reveal-effect:2": "> div",
    "glowing-effect:1": "li",
    "glowing-effect:2": "li",
    "text-hover-effect:1": "svg",
    "world-map:1": "svg",
    "pixelated-canvas:1": "canvas",
    "pixelated-canvas:2": "canvas",
    "chromatic-image:1": "canvas",
    "chromatic-image:2": "canvas",
    "chromatic-image:3": "canvas",
    "chromatic-image:4": "canvas",
    "evervault-card:1": '[class*="group/card"]',
    "svg-mask-effect:1": ".relative.z-20",
    "canvas-reveal-effect:2": "p",
    "tooltip-card:1": "span.cursor-pointer",
  };
  const selectorOverride = selectorOverrides[key] ?? null;
  const targetIndex = key === "notch:1" || key === "liquid-glass:2" ? 1 : key === "code-block:2" ? 1 : 0;
  const target = await evaluate(`(() => { const interactionType=${JSON.stringify(input)}; const override=${JSON.stringify(selectorOverride)}; const targetIndex=${targetIndex}; const root=document.querySelector('.lab-canvas'); if(!root) return null; const visible=el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>4&&r.height>4&&r.right>0&&r.bottom>0&&r.left<innerWidth&&r.top<innerHeight&&s.visibility!=='hidden'&&s.display!=='none'}; const fits=el=>{const r=el.getBoundingClientRect();return r.width<root.clientWidth*.9&&r.height<root.clientHeight*.9}; let el; if(override){const candidates=[...root.querySelectorAll(override)].filter(visible); if(override.includes('border-t.border-r')){const box=root.getBoundingClientRect(),cx=box.left+box.width/2,cy=box.top+box.height/2; candidates.sort((a,b)=>{const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return Math.hypot(ra.x+ra.width/2-cx,ra.y+ra.height/2-cy)-Math.hypot(rb.x+rb.width/2-cx,rb.y+rb.height/2-cy)})} el=candidates[0]} else if(interactionType==='hover'){const cards=[...root.querySelectorAll('[class*="group/"],[class*="hover:"],[class*="card"],a,button,[role=button],canvas')].filter(visible).filter(fits); el=cards.sort((a,b)=>b.getBoundingClientRect().width*b.getBoundingClientRect().height-a.getBoundingClientRect().width*a.getBoundingClientRect().height)[0]; if(!el) el=[...root.querySelectorAll('img,svg,canvas,div')].filter(visible).filter(fits).sort((a,b)=>b.getBoundingClientRect().width*b.getBoundingClientRect().height-a.getBoundingClientRect().width*a.getBoundingClientRect().height)[0];} else {const controls=[...root.querySelectorAll('button,[role=button],canvas,[draggable=true],a,input,[tabindex]')].filter(visible); el=controls[Math.min(targetIndex,Math.max(0,controls.length-1))]; if(!el&&(interactionType==='drag'||interactionType==='click')) el=[...root.querySelectorAll('[class*="cursor"],[class*="drag"],img,canvas,svg,div')].filter(visible).filter(fits).sort((a,b)=>b.getBoundingClientRect().width*b.getBoundingClientRect().height-a.getBoundingClientRect().width*a.getBoundingClientRect().height)[0]; if(!el&&interactionType==='scroll') el=root; } if(!el)return null; const r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2,w:r.width,h:r.height,tag:el.tagName,role:el.getAttribute('role'),className:String(el.className?.baseVal??el.className??'').slice(0,160),text:el.innerText?.slice(0,80)||''} })()`);
  if (!target) return { action: input, targetFound: false, reason: "no matching interactive DOM target" };
  if (input === "hover") {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1 });
    await new Promise((resolve) => setTimeout(resolve, 100));
    const offsets = key.startsWith("glowing-effect:")
      ? [[target.x - target.w * 0.46, target.y], [target.x - target.w * 0.35, target.y], [target.x - target.w * 0.35, target.y]]
      : key.startsWith("glare-card:") || key.startsWith("evervault-card:")
        ? [[target.x - target.w * 0.3, target.y - target.h * 0.25], [target.x + target.w * 0.3, target.y + target.h * 0.25]]
      : [[target.x - Math.min(80, target.w * 0.3), target.y], [target.x + Math.min(30, target.w * 0.15), target.y], [target.x, target.y]];
    for (const [x, y] of offsets) {
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.max(1, x), y: Math.max(1, y), pointerType: "mouse" });
      await new Promise((resolve) => setTimeout(resolve, 180));
    }
  } else if (input === "click") {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: target.x, y: target.y });
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: target.x, y: target.y, button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: target.x, y: target.y, button: "left", clickCount: 1 });
  } else if (input === "drag") {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: target.x, y: target.y });
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: target.x, y: target.y, button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.min(1380, target.x + 70), y: Math.min(920, target.y + 50), button: "left", buttons: 1, deltaX: 70, deltaY: 50, pointerType: "mouse" });
    await new Promise((resolve) => setTimeout(resolve, 200));
    var gestureScreenshot = await capture(row, "desktop-during-drag");
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: Math.min(1380, target.x + 70), y: Math.min(920, target.y + 50), button: "left", clickCount: 1 });
  }
  await new Promise((resolve) => setTimeout(resolve, 750));
  return { action: input, targetFound: true, target: { tag: target.tag, role: target.role, className: target.className, text: target.text, width: Math.round(target.w), height: Math.round(target.h) }, ...(gestureScreenshot ? { duringGestureScreenshot: gestureScreenshot } : {}) };
}

async function applyMobileInput(input, row, mobileInitial) {
  if (input === "hover") return { applicable: false, reason: "hover is unavailable on touch; source and desktop hover were inspected" };
  if (input === "wait") return { applicable: false, reason: "autonomous animation; no touch trigger is expected" };
  if (input === "scroll") {
    const before = await evaluate(`window.scrollY`);
    await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 190, y: 730, id: 1, radiusX: 1, radiusY: 1, force: 1 }] });
    for (const y of [660, 580, 500, 420, 340, 260]) {
      await send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 190, y, id: 1, radiusX: 1, radiusY: 1, force: 1 }] });
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
    await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const after = await evaluate(`window.scrollY`);
    return { applicable: true, action: "touch-scroll", scrollBefore: before, scrollAfter: after, changed: before !== after };
  }

  const target = await evaluate(`(() => { const interactionType=${JSON.stringify(input)}; const root=document.querySelector('.lab-canvas'); if(!root)return null; const visible=el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>4&&r.height>4&&s.display!=='none'&&s.visibility!=='hidden'}; const selector=${JSON.stringify(input === "drag" ? '[draggable=true],[class*="cursor-grab"],[class*="cursor-move"],[class*="drag"],canvas' : 'button,[role=button],a,input,[tabindex]')}; let el=[...root.querySelectorAll(selector)].find(visible); if(!el&&interactionType==='drag')el=[...root.querySelectorAll('img,canvas,svg,div')].filter(visible).filter(x=>{const r=x.getBoundingClientRect();return r.width<root.clientWidth*.9&&r.height<root.clientHeight*.9}).sort((a,b)=>b.getBoundingClientRect().width*b.getBoundingClientRect().height-a.getBoundingClientRect().width*a.getBoundingClientRect().height)[0];if(!el)return null;const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,tag:el.tagName,role:el.getAttribute('role'),className:String(el.className?.baseVal??el.className??'').slice(0,120),text:el.innerText?.slice(0,60)||''}})()`);
  if (!target) return { applicable: true, action: input === "drag" ? "touch-drag" : "tap", targetFound: false, reason: "no matching touch target" };
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: target.x, y: target.y, id: 1, radiusX: 1, radiusY: 1, force: 1 }] });
  if (input === "drag") {
    for (const step of [0.25, 0.5, 0.75, 1]) {
      await send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: Math.min(380, target.x + 40 * step), y: Math.min(820, target.y + 30 * step), id: 1, radiusX: 1, radiusY: 1, force: 1 }] });
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
  }
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await new Promise((resolve) => setTimeout(resolve, 500));
  const touchShot = await capture(row, "mobile-after-touch");
  return {
    applicable: true,
    action: input === "drag" ? "touch-drag" : "tap",
    targetFound: true,
    target: { tag: target.tag, role: target.role, className: target.className, text: target.text },
    screenshotChanged: touchShot.sha256 !== mobileInitial.sha256,
    screenshot: touchShot,
  };
}

async function applyKeyboardInput(input) {
  if (input === "press") {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    return { applicable: true, targetFound: true, key: "KeyA", note: "Physical-key event sampled after the pointer interaction." };
  }
  if (input !== "click") return { applicable: false, reason: "component trigger is not a keyboard-activatable action" };
  const target = await evaluate(`(() => {const root=document.querySelector('.lab-canvas');const el=root?.querySelector('button,[role=button],a,input,[tabindex]');if(!el)return null;el.focus();const r=el.getBoundingClientRect();return {tag:el.tagName,role:el.getAttribute('role'),className:String(el.className?.baseVal??el.className??'').slice(0,100),text:el.innerText?.slice(0,60)||'',x:r.left+r.width/2,y:r.top+r.height/2}})()`);
  if (!target) return { applicable: true, targetFound: false, reason: "no focusable control in preview" };
  const before = await evaluate(`document.querySelector('.lab-canvas')?.innerText?.slice(0,240)||''`);
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await send("Input.dispatchKeyEvent", { type: "char", key: "Enter", code: "Enter", text: "\r", windowsVirtualKeyCode: 13 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await new Promise((resolve) => setTimeout(resolve, 250));
  const after = await evaluate(`document.querySelector('.lab-canvas')?.innerText?.slice(0,240)||''`);
  return { applicable: true, targetFound: true, target: { tag: target.tag, role: target.role, className: target.className, text: target.text }, enterPressed: true, textChanged: before !== after };
}

try {
  await waitForDebugger();
  const tabs = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
  const target = tabs.find((tab) => tab.type === "page");
  if (!target) throw new Error("Chrome did not open a page target.");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const waiter = pending.get(message.id);
      clearTimeout(waiter.timer);
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result ?? {});
    } else if (message.method) {
      for (const callback of listeners.get(message.method) ?? []) callback(message.params);
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  const resultPath = path.join(outputRoot, "runtime-results.json");
  let results = [];
  try { results = JSON.parse(await fs.readFile(resultPath, "utf8")); } catch {}
  const expectedKeys = new Set(previewRows.map(({ item, variant }) => `${item.name}:${variant.id}`));
  results = results.filter((entry) => expectedKeys.has(entry.key));
  const already = new Set(results.map((entry) => entry.key));
  const queued = rows.filter(({ item, variant }) => force || !already.has(`${item.name}:${variant.id}`));
  console.log(`Auditing ${queued.length} Aceternity preview routes (batch starts at index ${from}${Number.isFinite(limit) ? `, limit ${limit}` : ""}).`);

  for (let index = 0; index < queued.length; index += 1) {
    const row = queued[index];
    const key = `${row.item.name}:${row.variant.id}`;
    const routeUrl = `${origin}${row.variant.route}`;
    const consoleErrors = [];
    const consoleMessages = [];
    const offException = on("Runtime.exceptionThrown", (event) => {
      const detail = event.exceptionDetails ?? {};
      consoleErrors.push({
        text: detail.text ?? "runtime exception",
        description: detail.exception?.description ?? "",
        url: detail.url ?? "",
        line: detail.lineNumber ?? null,
        column: detail.columnNumber ?? null,
      });
    });
    const offConsole = on("Runtime.consoleAPICalled", (event) => {
      if (event.type !== "error" && event.type !== "warning") return;
      consoleMessages.push({ type: event.type, text: event.args?.map((arg) => arg.value ?? arg.description ?? "").join(" ").slice(0, 500) ?? "" });
    });
    const offLog = on("Log.entryAdded", (event) => {
      const entry = event.entry ?? {};
      if (entry.level !== "error" && entry.level !== "warning") return;
      consoleMessages.push({ type: entry.level, source: entry.source ?? "", url: entry.url ?? "", text: String(entry.text ?? "").slice(0, 500) });
    });
    await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 960, deviceScaleFactor: 1, mobile: false });
    await send("Emulation.setEmulatedMedia", { features: [] });
    await send("Page.navigate", { url: routeUrl });
    let ready;
    try { ready = await waitReady(); } catch (error) { ready = { nextError: true, body: error.message }; }
    if (!ready?.nextError) { await waitDemoReady(); await waitLocalImages(); }
    // Start each route from a neutral pointer position so a hover state left by
    // the previous route cannot be mistaken for the initial visual state.
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 2, y: 2, button: "none" });
    await new Promise((resolve) => setTimeout(resolve, 180));
    let source = "";
    if (row.variant.exampleFile) {
      const sourcePath = path.join(libraryRoot, "examples", row.variant.exampleFile);
      try { source = await fs.readFile(sourcePath, "utf8"); } catch {}
    }
    const componentRecord = JSON.parse(await fs.readFile(path.join(libraryRoot, "registry", `${row.item.name}.json`), "utf8"));
    source += `\n${componentRecord.files.filter((file) => file.content).map((file) => file.content).join("\n")}`;
    const input = chooseInput(source, row);
    const initial = await evaluate(`(() => { const root=document.querySelector('.lab-canvas'), r=root?.getBoundingClientRect(); return {title:document.querySelector('main h1')?.textContent||document.title, body:document.body?.innerText?.slice(0,600)||'', canvas:!!root, width:r?.width||0,height:r?.height||0,overflows:document.documentElement.scrollWidth>1440, svg:document.querySelectorAll('.lab-canvas svg').length, canvases:document.querySelectorAll('.lab-canvas canvas').length, buttons:[...document.querySelectorAll('.lab-canvas button,[role=button]')].length, images:[...document.querySelectorAll('.lab-canvas img')].map(x=>({src:x.currentSrc||x.src,loaded:x.complete&&x.naturalWidth>0})), animations:document.getAnimations({subtree:true}).length, reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches} })()`);
    const initialShot = await capture(row, "desktop-initial");
    await evaluate(`(() => {window.__auditPointerMoves=0;document.querySelectorAll('.lab-canvas canvas').forEach(canvas=>canvas.addEventListener('pointermove',()=>window.__auditPointerMoves++))})()`);
    let interaction;
    try { interaction = await applyInput(input, row); } catch (error) { interaction = { action: input, targetFound: false, error: error.message }; }
    const active = await evaluate(`(() => {const root=document.querySelector('.lab-canvas');const card=root?.querySelector('[class*="group/card"]');const hovered=[...(root?.querySelectorAll(':hover')||[])].slice(0,12).map(x=>({tag:x.tagName,className:String(x.className?.baseVal??x.className??'').slice(0,100)}));const overlay=card?.querySelector('div.absolute.inset-0.rounded-2xl.bg-gradient-to-r');return {animations:document.getAnimations({subtree:true}).length,scrollY:window.scrollY,scrollTop:root?.scrollTop||0,canvasPointerMoves:window.__auditPointerMoves||0,svg:[...document.querySelectorAll('.lab-canvas svg path')].map(x=>({stroke:x.getAttribute('stroke'),dashoffset:x.getAttribute('stroke-dashoffset'),opacity:getComputedStyle(x).opacity})),text:root?.innerText?.slice(0,250)||'',hovered,effect:card?{matchesHover:card.matches(':hover'),background:getComputedStyle(card).backgroundImage,overlayOpacity:overlay?getComputedStyle(overlay).opacity:null}:null}})()`);
    const activeShot = await capture(row, "desktop-active");
    await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 1 });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    // Resize and emulate reduced motion in place. Navigating to the same route
    // unmounts React Three Fiber Html portals and can throw during Drei cleanup.
    await new Promise((resolve) => setTimeout(resolve, 300));
    const mobile = await evaluate(`(() => ({emulatedWidth:390,width:innerWidth,clientWidth:document.documentElement.clientWidth,visualViewportWidth:visualViewport?.width??null,height:innerHeight,bodyWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>390,canvas:!!document.querySelector('.lab-canvas'),animations:document.getAnimations({subtree:true}).length,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches}))()`);
    const mobileShot = await capture(row, "mobile-reduced");
    let mobileInteraction;
    let keyboard;
    try { mobileInteraction = await applyMobileInput(input, row, mobileShot); } catch (error) { mobileInteraction = { applicable: true, targetFound: false, error: error.message }; }
    try { keyboard = await applyKeyboardInput(input); } catch (error) { keyboard = { applicable: input === "click", targetFound: false, error: error.message }; }
    const entry = {
      key, route: row.variant.route, title: row.variant.title, status: ready?.nextError ? "render-failed" : ready?.canvas ? "rendered" : "preview-not-found",
      interaction, inputInferredFromSource: input, initial, active, mobile, mobileInteraction, keyboard, consoleErrors, consoleMessages,
      screenshots: { initial: initialShot, active: activeShot, mobileReduced: mobileShot },
      screenshotChangedAfterInput: initialShot.sha256 !== activeShot.sha256 || initialShot.sha256 !== (interaction?.duringGestureScreenshot?.sha256 ?? activeShot.sha256),
      recordedAt: new Date().toISOString(),
    };
    const existingIndex = results.findIndex((value) => value.key === key);
    if (existingIndex >= 0) results[existingIndex] = entry;
    else results.push(entry);
    await fs.writeFile(resultPath, `${JSON.stringify(results, null, 2)}\n`);
    offException();
    offConsole();
    offLog();
    console.log(`${index + 1}/${queued.length} ${key}: ${entry.status}, ${input}${entry.screenshotChangedAfterInput ? " (frame changed)" : " (no sampled pixel change)"}${consoleErrors.length ? `, ${consoleErrors.length} console exceptions` : ""}`);
  }
  socket.close();
  chrome.kill();
  console.log(`Saved ${results.length} browser audit records and screenshots under ${path.relative(root, outputRoot)}.`);
} catch (error) {
  console.error(error.stack ?? error.message);
  try { socket?.close(); } catch {}
  try { chrome.kill(); } catch {}
  process.exitCode = 1;
}
