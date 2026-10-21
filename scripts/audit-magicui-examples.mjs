import fs from "node:fs";
import crypto from "node:crypto";

const catalogPath = "public/magicui-catalog.json";
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const reportPath = "public/magicui-example-runtime-audit.json";
const priorReport = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, "utf8")) : { examples: {} };
const port = Number(process.env.MAGICUI_CDP_PORT || 9367);
const origin = process.env.MAGICUI_DOCS_ORIGIN || "http://localhost:38472";
const retryFailed = process.env.MAGICUI_RETRY_FAILED === "1";
const onlyExamples = new Set((process.env.MAGICUI_ONLY_EXAMPLES || "").split(",").map((id) => id.trim()).filter(Boolean));
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const groups = new Map();
const components = new Map(catalog.components.map((component) => [component.name, component]));

for (const example of catalog.examples) {
  const group = groups.get(example.route) || [];
  group.push(example);
  groups.set(example.route, group);
}
for (const group of groups.values()) group.sort((a, b) => a.previewIndex - b.previewIndex);
const totalRouteCount = groups.size;
if (retryFailed || onlyExamples.size) {
  for (const [route, examples] of groups) {
    const retry = examples.filter((example) => onlyExamples.size
      ? onlyExamples.has(example.sourceId)
      : priorReport.examples[example.sourceId]?.status !== "preview-rendered");
    if (retry.length) groups.set(route, retry);
    else groups.delete(route);
  }
}

const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
if (!targetResponse.ok) throw new Error(`Chrome CDP endpoint unavailable: ${targetResponse.status}`);
const target = await targetResponse.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});

let sequence = 0;
const pending = new Map();
const runtimeErrors = [];
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") runtimeErrors.push((message.params.exceptionDetails?.exception?.description || message.params.exceptionDetails?.text || "Runtime exception").split("\n")[0].slice(0, 360));
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});
const command = (method, params = {}) => new Promise((resolve) => {
  const id = ++sequence;
  pending.set(id, resolve);
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.result?.exceptionDetails) throw new Error(result.result.exceptionDetails.text);
  return result.result?.result?.value;
};
await command("Page.enable");
await command("Runtime.enable");

const stageExpression = (index) => `(async () => {
  const previews = [...document.querySelectorAll('[data-slot="preview"]')];
  const frame = previews[${index}];
  if (!frame) return { missing: true, count: previews.length };
  frame.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const demo = frame.querySelector('.preview');
  const rect = demo?.getBoundingClientRect();
  const clip = rect ? { x: Math.max(0, rect.left), y: Math.max(0, rect.top), width: Math.max(0, Math.min(innerWidth, rect.right) - Math.max(0, rect.left)), height: Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top)) } : null;
  const running = demo ? demo.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length : 0;
  const motionNodes = demo ? [demo, ...demo.querySelectorAll('linearGradient, svg circle, svg path, canvas, [style], img')].slice(0, 45) : [];
  const motionState = motionNodes.map((element) => {
    const style = getComputedStyle(element);
    const state = { tag: element.tagName.toLowerCase(), cls: String(element.className?.baseVal || element.className || '').slice(0, 60), transform: style.transform, opacity: style.opacity, backgroundPosition: style.backgroundPosition, animationName: style.animationName };
    if (element instanceof SVGElement) for (const name of ['x1', 'x2', 'y1', 'y2', 'r', 'opacity', 'cx', 'cy', 'stroke-dashoffset']) if (element.hasAttribute(name)) state[name] = element.getAttribute(name);
    if (element instanceof HTMLCanvasElement) { try { const data = element.toDataURL(); let hash = 2166136261; for (let i = 0; i < data.length; i += Math.max(1, Math.floor(data.length / 512))) hash = Math.imul(hash ^ data.charCodeAt(i), 16777619); state.canvasHash = (hash >>> 0).toString(16); } catch { state.canvasHash = 'unavailable'; } }
    return state;
  });
  const firstControl = demo?.querySelector('button:not([disabled]),[role="button"],input,[tabindex]:not([tabindex="-1"])');
  const controlRect = firstControl?.getBoundingClientRect();
  return {
    missing: false,
    count: previews.length,
    ready: Boolean(demo && rect?.width > 0 && rect?.height > 0 && getComputedStyle(demo).visibility !== 'hidden'),
    rect: rect ? { width: rect.width, height: rect.height } : null,
    visibility: demo ? getComputedStyle(demo).visibility : null,
    clip,
    text: demo?.innerText?.trim().slice(0, 160) || '',
    runningAnimations: running,
    motionState,
    animationNames: [...new Set([...(demo ? [demo, ...demo.querySelectorAll('*')] : [])].map((node) => getComputedStyle(node).animationName).filter((name) => name && name !== 'none'))],
    transitions: [...new Set([...(demo?.querySelectorAll('*') || [])].map((node) => getComputedStyle(node).transitionProperty).filter((name) => name && name !== 'all' && name !== 'none'))].slice(0, 8),
    control: controlRect ? { x: controlRect.left + controlRect.width / 2, y: controlRect.top + controlRect.height / 2, tag: firstControl.tagName.toLowerCase(), text: firstControl.innerText?.trim().slice(0, 50) || '' } : null,
    codeTabPresent: Boolean(frame.parentElement?.parentElement?.innerText?.includes('Code')),
  };
})()`;

const snapHash = async (clip) => {
  if (!clip?.width || !clip?.height) return null;
  const shot = await command("Page.captureScreenshot", { format: "png", clip: { ...clip, scale: 0.5 } });
  const data = shot.result?.data || shot.data;
  return data ? crypto.createHash("sha256").update(Buffer.from(data, "base64")).digest("hex") : null;
};

const clickTargets = new Set(["ripple-button", "animated-subscribe-button", "animated-theme-toggler", "hero-video-dialog", "file-tree", "interactive-hover-button", "pulsating-button"]);
const hoverTargets = new Set(["confetti"]);
const holdTargets = new Set(["cool-mode"]);
const dragTargets = new Set(["icon-cloud", "globe", "lens", "interactive-grid-pattern"]);
const interactionFor = (example, component, before) => {
  const trigger = String(component?.motionProfile?.trigger || "").toLowerCase();
  if (["scroll-progress", "scroll-based-velocity"].includes(component?.name) || trigger.includes("scroll") || trigger.includes("velocity")) return "scroll";
  if (["magic-card", "lens", "pointer", "smooth-cursor"].includes(component?.name) || trigger.includes("pointer movement") || trigger.includes("move the pointer")) return "pointer-sweep";
  if (hoverTargets.has(component?.name) || example.sourceAudit?.detectableInteractions?.includes("pointer / mouse / touch") && !trigger.includes("click")) return "hover";
  if (holdTargets.has(component?.name) || trigger.includes("press and hold") || trigger.includes("press-and-hold")) return "press-and-hold";
  if (dragTargets.has(component?.name) || trigger.includes("drag")) return "drag";
  if (clickTargets.has(component?.name) || trigger.includes("click") || trigger.includes("tap")) return "click";
  if (trigger.includes("hover")) return "hover";
  return "pointer-hover-and-auto-sample";
};

const evidence = { sourceCommit: catalog.source.sourceRepositoryCommit, docsOrigin: origin, startedAt: new Date().toISOString(), routeCount: totalRouteCount, routeVisitCount: groups.size, exampleCount: catalog.examples.length, examples: retryFailed ? { ...priorReport.examples } : {} };
let done = 0;
for (const [route, examples] of groups) {
  const errorStart = runtimeErrors.length;
  await command("Page.navigate", { url: `${origin}${route}` });
  let page = null;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await pause(attempt < 10 ? 250 : 500);
    page = await evaluate(`(() => { const frames=[...document.querySelectorAll('[data-slot="preview"]')]; const readyCount=frames.filter((frame)=>{const demo=frame.querySelector('.preview');const rect=demo?.getBoundingClientRect();return Boolean(rect?.width>0&&rect?.height>0&&getComputedStyle(demo).visibility!=='hidden')}).length; return { title: document.title, ready: document.readyState, count: frames.length, readyCount, errorText: document.body.innerText.includes('Application error:') ? document.body.innerText.slice(0,240) : null }; })()`);
    if (page?.errorText || (page?.count >= examples.length && page?.readyCount >= examples.length)) break;
  }
  for (const example of examples) {
    const component = components.get(example.component);
    const first = await evaluate(stageExpression(example.previewIndex));
    if (page?.errorText) {
      evidence.examples[example.sourceId] = { status: "docs-client-error", pageTitle: page.title, renderError: page.errorText, runtimeExceptions: runtimeErrors.slice(errorStart), previewIndex: example.previewIndex, pagePreviewCount: page.count };
      done += 1;
      continue;
    }
    if (!first?.ready) {
      evidence.examples[example.sourceId] = { status: first?.missing ? "mapped-preview-not-found" : "preview-not-rendered", expectedPreviewIndex: example.previewIndex, pagePreviewCount: first?.count ?? page?.count ?? 0, pageReadyPreviewCount: page?.readyCount ?? 0, pageTitle: page?.title ?? null, renderError: page?.errorText ?? null, previewText: first?.text ?? null, previewRect: first?.rect ?? null, previewVisibility: first?.visibility ?? null };
      done += 1;
      continue;
    }
    const firstHash = await snapHash(first.clip);
    const action = interactionFor(example, component, first);
    if (["hover", "pointer-sweep", "pointer-hover-and-auto-sample"].includes(action)) {
      const point = first.control || { x: first.clip.x + first.clip.width / 2, y: first.clip.y + first.clip.height / 2 };
      await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: Math.max(1, first.clip.x - 24), y: Math.max(1, first.clip.y - 24), button: "none" });
      await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x, y: point.y, button: "none" });
      if (action === "pointer-sweep" || action === "hover") await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x + 36, y: point.y + 18, button: "none" });
    } else if ((action === "click" || action === "press-and-hold") && first.control) {
      const { x, y } = first.control;
      await command("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", buttons: 1, clickCount: 1 });
      if (action === "press-and-hold") await pause(850);
      await command("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
    } else if (action === "click") {
      const x = first.clip.x + first.clip.width / 2;
      const y = first.clip.y + first.clip.height / 2;
      await command("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", buttons: 1, clickCount: 1 });
      await command("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
    } else if (action === "drag") {
      const x = first.clip.x + first.clip.width / 2;
      const y = first.clip.y + first.clip.height / 2;
      await command("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", buttons: 1, clickCount: 1 });
      await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: x + 65, y: y + 28, button: "left", buttons: 1 });
      await command("Input.dispatchMouseEvent", { type: "mouseReleased", x: x + 65, y: y + 28, button: "left", clickCount: 1 });
    } else if (action === "scroll") {
      await command("Input.dispatchMouseEvent", { type: "mouseWheel", x: first.clip.x + first.clip.width / 2, y: first.clip.y + first.clip.height / 2, deltaX: 0, deltaY: 240 });
    }
    await pause(["pointer-sweep", "hover", "click", "press-and-hold"].includes(action) ? 250 : 1000);
    const activated = await evaluate(stageExpression(example.previewIndex));
    const activatedHash = await snapHash(activated?.clip || first.clip);
    if (component?.name === "animated-beam") await pause(2500);
    else if (["icon-cloud", "spinning-text", "floating-3d-particles", "dotted-map"].includes(component?.name)) await pause(1200);
    else await pause(750);
    const after = await evaluate(stageExpression(example.previewIndex));
    const secondHash = await snapHash(after?.clip || first.clip);
    const motionStateChanges = [];
    for (let index = 0; index < Math.min(first.motionState?.length || 0, after?.motionState?.length || 0); index += 1) {
      const beforeState = first.motionState[index];
      const afterState = after.motionState[index];
      for (const key of new Set([...Object.keys(beforeState), ...Object.keys(afterState)])) {
        if (beforeState[key] !== afterState[key]) motionStateChanges.push(`${beforeState.tag}.${beforeState.cls || index} ${key}: ${beforeState[key]} → ${afterState[key]}`);
      }
    }
    evidence.examples[example.sourceId] = {
      status: after?.ready ? "preview-rendered" : runtimeErrors.length > errorStart ? "docs-client-error" : "preview-lost-after-interaction",
      previewId: example.previewId,
      previewIndex: example.previewIndex,
      pagePreviewCount: after?.count ?? first.count,
      pageTitle: page?.title ?? null,
      text: first.text,
      runningAnimationsBeforeInput: first.runningAnimations,
      runningAnimationsAfterInput: after?.runningAnimations ?? 0,
      animationNames: first.animationNames,
      transitionProperties: first.transitions,
      action,
      actionHadTarget: ["hover", "pointer-sweep", "pointer-hover-and-auto-sample", "drag", "scroll", "click"].includes(action) ? Boolean(first.clip?.width && first.clip?.height) : Boolean(first.control),
      codeTabPresent: first.codeTabPresent,
      runtimeExceptions: runtimeErrors.slice(errorStart),
      screenshotHashes: [firstHash, secondHash],
      activationScreenshotHash: activatedHash,
      activatedFrameChanged: Boolean(firstHash && activatedHash && firstHash !== activatedHash),
      animatedStateChanged: motionStateChanges.length > 0,
      motionStateChanges: motionStateChanges.slice(0, 20),
      frameChangedDuringSample: Boolean(firstHash && secondHash && firstHash !== secondHash),
    };
    done += 1;
    if (done % 15 === 0 || done === catalog.examples.length) console.log(`Runtime reviewed ${done}/${catalog.examples.length} variants.`);
  }
}

evidence.finishedAt = new Date().toISOString();
const records = new Map(Object.entries(evidence.examples));
for (const example of catalog.examples) example.runtimeAudit = records.get(example.sourceId) || { status: "not-audited" };
catalog.source.exampleRuntimeRenderedCount = catalog.examples.filter((example) => example.runtimeAudit?.status === "preview-rendered").length;
catalog.source.exampleRuntimeUnavailableCount = catalog.examples.length - catalog.source.exampleRuntimeRenderedCount;
catalog.source.exampleRuntimeAuditTimestamp = evidence.finishedAt;
catalog.source.exampleRuntimeAuditMethod = "Per-variant local docs preview: bring each preview into view; inspect Web Animations, computed animation/transition styles, SVG attribute values, and canvas frame fingerprints; apply profile-matched pointer-sweep/hover/click/press-and-hold/drag/scroll input where indicated; capture before, activation, and follow-up frames. Follow-up is about one second after activation, or 2.5 seconds for Animated Beam's longer default cycle. A matching screenshot alone is not treated as proof of no motion.";
const examplesByComponent = new Map();
for (const example of catalog.examples) {
  const group = examplesByComponent.get(example.component) || [];
  group.push(example);
  examplesByComponent.set(example.component, group);
}
for (const component of catalog.components) {
  const examples = examplesByComponent.get(component.name);
  if (!examples?.length) continue;
  const renderedCount = examples.filter((example) => example.runtimeAudit?.status === "preview-rendered").length;
  component.exampleRuntimeAudit = {
    variantCount: examples.length,
    renderedVariantCount: renderedCount,
    unavailableVariantCount: examples.length - renderedCount,
    status: renderedCount === examples.length ? "all-example-variants-rendered" : "some-example-variants-unavailable",
    unavailable: examples.filter((example) => example.runtimeAudit?.status !== "preview-rendered").map((example) => ({
      name: example.name,
      sourceId: example.sourceId,
      status: example.runtimeAudit?.status,
      reason: example.runtimeAudit?.runtimeExceptions?.[0] || example.runtimeAudit?.renderError || null,
    })),
  };
  component.runtimeMotionAudit = {
    status: renderedCount === examples.length ? "runtime-preview-rendered" : "docs-client-error",
    previewCount: examples.length,
    runningAnimationsAtSample: Math.max(0, ...examples.map((example) => example.runtimeAudit?.runningAnimationsBeforeInput || 0)),
    activeAnimationDetected: examples.some((example) => (example.runtimeAudit?.runningAnimationsBeforeInput || 0) > 0 || (example.runtimeAudit?.runningAnimationsAfterInput || 0) > 0 || example.runtimeAudit?.animatedStateChanged),
    interactionAttempted: examples.some((example) => Boolean(example.runtimeAudit?.action)),
    inputMode: [...new Set(examples.map((example) => example.runtimeAudit?.action).filter(Boolean))].join(", "),
    frameChangedBetweenSamples: examples.some((example) => example.runtimeAudit?.frameChangedDuringSample || example.runtimeAudit?.activatedFrameChanged),
    exampleVariantsVisited: examples.length,
    exampleVariantsRendered: renderedCount,
    runtimeExceptions: examples.flatMap((example) => (example.runtimeAudit?.runtimeExceptions || []).map((message) => `${example.name}: ${message}`)),
  };
}
fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
fs.writeFileSync(reportPath, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`Finished ${catalog.source.exampleRuntimeRenderedCount}/${catalog.examples.length} rendered previews. Details: ${reportPath}`);
ws.close();
