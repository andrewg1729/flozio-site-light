import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".component-lab-cache/aceternity/browser-audit");
const origin = process.env.ACETERNITY_PREVIEW_ORIGIN ?? "http://127.0.0.1:38473";
const port = 9238;
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--no-sandbox", "--no-first-run", "--disable-background-networking",
  "--remote-allow-origins=*", `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(root, ".component-lab-cache/aceternity-app/.chrome-catalog-audit")}`,
  "--window-size=1440,1000", "about:blank",
], { stdio: "ignore", windowsHide: true });

let socket;
let id = 0;
const pending = new Map();
async function waitForTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const tabs = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
      const page = tabs.find((tab) => tab.type === "page");
      if (page) return page;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Chrome DevTools target did not start.");
}
async function send(method, params = {}) {
  const messageId = ++id;
  const response = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Chrome timed out on ${method}`)), 20_000);
    pending.set(messageId, { resolve, reject, timer });
  });
  socket.send(JSON.stringify({ id: messageId, method, params }));
  return response;
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, userGesture: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? "Browser evaluation failed");
  return result.result?.value;
}
async function capture(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  await fs.writeFile(path.join(output, name), Buffer.from(data, "base64"));
}
try {
  const target = await waitForTarget();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const waiter = pending.get(message.id);
    if (!waiter) return;
    clearTimeout(waiter.timer);
    pending.delete(message.id);
    message.error ? waiter.reject(new Error(message.error.message)) : waiter.resolve(message.result ?? {});
  });
  await send("Page.enable");
  await send("Runtime.enable");
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await send("Emulation.setDeviceMetricsOverride", { ...viewport, deviceScaleFactor: 1, mobile: viewport.width < 500 });
    await send("Emulation.setEmulatedMedia", { features: [] });
    await send("Page.navigate", { url: `${origin}/` });
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (await evaluate("Boolean(document.querySelector('input[type=search]'))")) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    const name = viewport.width < 500 ? "lab-catalog-mobile.png" : "lab-catalog-desktop.png";
    await capture(name);
    const layout = await evaluate(`(() => { const input=document.querySelector('input[type=search]'); return {viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,main:document.querySelector('main')?.getBoundingClientRect().toJSON(),search:input?.getBoundingClientRect().toJSON(),count:document.querySelector('main')?.innerText.match(/\\d+ of 114 components/)?.[0]||null,previewSummary:[...document.querySelectorAll('main > p')][1]?.innerText||null}; })()`);
    if (!layout.search) throw new Error(`Catalog search field not found at ${viewport.width}px.`);
    if (viewport.width < 500) {
      await evaluate(`(() => {const input=document.querySelector('input[type=search]');const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;setter.call(input,'learning-loop');input.dispatchEvent(new Event('input',{bubbles:true}));return true})()`);
      await new Promise((resolve) => setTimeout(resolve, 100));
      layout.searchResult = await evaluate("document.querySelector('main ul')?.innerText.includes('Moving Line')");
      layout.searchQuery = "learning-loop";
      layout.searchResultText = await evaluate("document.querySelector('main ul')?.innerText.slice(0,300)||''");
      await capture("lab-catalog-search-mobile.png");
    }
    console.log(JSON.stringify(layout));
  }
} catch (error) {
  console.error(error.stack ?? error.message);
  process.exitCode = 1;
} finally {
  socket?.close();
  chrome.kill();
}
