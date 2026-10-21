import fs from 'node:fs';
import crypto from 'node:crypto';

const catalogPath = 'public/magicui-catalog.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const cdpPort = Number(process.env.MAGICUI_CDP_PORT || 9367);
const docsOrigin = process.env.MAGICUI_DOCS_ORIGIN || 'http://localhost:38472';
const priorPath = 'public/magicui-runtime-audit.json';
const prior = fs.existsSync(priorPath) ? JSON.parse(fs.readFileSync(priorPath, 'utf8')) : {};
const retryOnly = process.env.MAGICUI_RETRY_ONLY === '1';
const onlyNames = new Set((process.env.MAGICUI_ONLY || '').split(',').map((name) => name.trim()).filter(Boolean));
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const clickComponents = new Set(['confetti', 'ripple-button', 'animated-subscribe-button', 'animated-theme-toggler', 'hero-video-dialog', 'file-tree']);
const dragComponents = new Set(['icon-cloud', 'globe']);
const holdComponents = new Set(['cool-mode']);

const target = await (await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});

let id = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});
const send = (method, params = {}) => new Promise((resolve) => {
  const commandId = ++id;
  pending.set(commandId, resolve);
  ws.send(JSON.stringify({ id: commandId, method, params }));
});
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.result?.exceptionDetails) throw new Error(result.result.exceptionDetails.text);
  return result.result?.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
const paths = new Map();
for (const item of catalog.components) {
  if (!item.docsUrl) continue;
  const path = new URL(item.docsUrl).pathname;
  if (!path.startsWith('/docs/components/') || path === '/docs/components') continue;
  if (!paths.has(path)) paths.set(path, item.name);
}
const allRouteNames = new Set(paths.values());
if (retryOnly) {
  for (const [path, name] of [...paths]) {
    if (prior[name]?.status === 'runtime-preview-rendered') paths.delete(path);
  }
}
if (onlyNames.size) {
  for (const [path, name] of [...paths]) if (!onlyNames.has(name)) paths.delete(path);
}

const observations = { ...prior };
for (const name of Object.keys(observations)) if (!allRouteNames.has(name)) delete observations[name];
const sampleExpression = `(async () => {
  const previews = [...document.querySelectorAll('[data-slot="preview"][data-active="true"]')];
  const preview = previews[0];
  const demo = preview?.querySelector('.preview');
  if (demo) {
    demo.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }
  const animations = document.getAnimations().filter((animation) => animation.playState === 'running');
  const demoAnimations = demo ? demo.getAnimations({ subtree: true }).filter((animation) => animation.playState === 'running') : [];
  const styleSamples = demo ? [...demo.querySelectorAll('*')].slice(0, 16).map((element) => {
    const style = getComputedStyle(element);
    return { tag: element.tagName.toLowerCase(), cls: String(element.className?.baseVal || element.className || '').slice(0, 90), animation: style.animationName, transform: style.transform, opacity: style.opacity };
  }) : [];
  return {
    title: document.querySelector('h1')?.innerText || document.title,
    readyState: document.readyState,
    previewCount: previews.length,
    previewReady: Boolean(demo && demo.getBoundingClientRect().width > 0 && getComputedStyle(demo).visibility !== 'hidden'),
    previewRect: demo ? (() => { const r=demo.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; })() : null,
    previewClip: demo ? (() => { const r=demo.getBoundingClientRect(); const left=Math.max(0,r.left), top=Math.max(0,r.top), right=Math.min(window.innerWidth,r.right), bottom=Math.min(window.innerHeight,r.bottom); return { x:left, y:top, width:Math.max(0,right-left), height:Math.max(0,bottom-top), scale:1 }; })() : null,
    previewText: demo?.innerText?.trim().slice(0, 180) || '',
    media: { canvas: demo?.querySelectorAll('canvas').length || 0, svg: demo?.querySelectorAll('svg').length || 0, video: [...(demo?.querySelectorAll('video') || [])].map(v => ({ src: v.currentSrc || v.src, paused: v.paused, currentTime: v.currentTime })) },
    runningAnimations: animations.length,
    demoRunningAnimations: demoAnimations.length,
    animationNames: [...new Set([...demo?.querySelectorAll('*') || []].map(e => getComputedStyle(e).animationName).filter(n => n && n !== 'none'))],
    interactiveTargets: [...(demo?.querySelectorAll('button,a,input,[role="button"]') || [])].slice(0, 12).map(e => ({ tag: e.tagName.toLowerCase(), role: e.getAttribute('role'), text: e.innerText?.trim().slice(0, 50) || '', type: e.getAttribute('type') })),
    activationTarget: (() => { const e = demo?.querySelector('button:not([disabled]),[role="button"]'); if (!e) return null; const r=e.getBoundingClientRect(); return { x:r.left+r.width/2, y:r.top+r.height/2, text:e.innerText?.trim().slice(0,50)||'' }; })(),
    styleSamples
  };
})()`;

for (const [path, name] of paths) {
  const url = `${docsOrigin}${path}`;
  await send('Page.navigate', { url });
  await pause(1150);
  let first = await evaluate(sampleExpression);
  if (!first?.previewReady) {
    await pause(name === 'dotted-map' ? 10000 : 3500);
    first = await evaluate(sampleExpression);
  }
  const firstImage = first?.previewClip?.width > 0 && first?.previewClip?.height > 0
    ? await send('Page.captureScreenshot', { format: 'png', clip: first.previewClip })
    : null;
  const firstImageData = firstImage?.result?.data || firstImage?.data;
  const firstImageHash = firstImageData ? crypto.createHash('sha256').update(Buffer.from(firstImageData, 'base64')).digest('hex') : null;
  const clip = first?.previewClip;
  const center = clip ? { x: clip.x + clip.width / 2, y: clip.y + clip.height / 2 } : null;
  const pointerTarget = first?.activationTarget || center;
  if (pointerTarget && first.previewReady) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pointerTarget.x, y: pointerTarget.y, button: 'none' });
    await pause(180);
  }
  if (clickComponents.has(name) && first?.activationTarget && first.previewReady) {
    const { x, y } = first.activationTarget;
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await pause(220);
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  }
  if (holdComponents.has(name) && first?.activationTarget && first.previewReady) {
    const { x, y } = first.activationTarget;
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
    await pause(900);
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  }
  if (dragComponents.has(name) && center && first.previewReady) {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...center, button: 'left', buttons: 1, clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: center.x + 80, y: center.y + 24, button: 'left', buttons: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: center.x + 80, y: center.y + 24, button: 'left', clickCount: 1 });
  }
  await pause(1400);
  const second = await evaluate(sampleExpression);
  const secondImage = second?.previewClip?.width > 0 && second?.previewClip?.height > 0
    ? await send('Page.captureScreenshot', { format: 'png', clip: second.previewClip })
    : null;
  const secondImageData = secondImage?.result?.data || secondImage?.data;
  const secondImageHash = secondImageData ? crypto.createHash('sha256').update(Buffer.from(secondImageData, 'base64')).digest('hex') : null;
  observations[name] = {
    url,
    status: (first?.previewReady || second?.previewReady) ? 'runtime-preview-rendered' : (second?.readyState === 'complete' || first?.readyState === 'complete') ? 'docs-rendered-preview-not-found' : 'page-load-incomplete',
    first,
    second,
    screenshotHashes: [firstImageHash, secondImageHash],
    screenshotCaptureError: firstImage?.error?.message || secondImage?.error?.message || null,
    frameChangedBetweenSamples: Boolean(firstImageHash && secondImageHash && firstImageHash !== secondImageHash),
    activated: Boolean((clickComponents.has(name) || dragComponents.has(name) || holdComponents.has(name)) && first?.previewReady),
    inputMode: clickComponents.has(name) ? 'click' : holdComponents.has(name) ? 'press-and-hold' : dragComponents.has(name) ? 'drag' : first?.activationTarget ? 'hover-target-and-auto-sample' : 'pointer-hover-and-auto-sample',
  };
  console.log(`${observations[name].status}\t${name}\tpreviews=${first?.previewCount ?? 0}\tanimations=${first?.demoRunningAnimations ?? 0}\tframeChanged=${observations[name].frameChangedBetweenSamples}\tinput=${observations[name].inputMode}`);
}

for (const item of catalog.components) {
  const itemPath = item.docsUrl ? new URL(item.docsUrl).pathname : '';
  const routeName = paths.get(itemPath);
  const observation = observations[item.name] || observations[routeName];
  if (observation) {
    observation.frameChangedBetweenSamples ??= Boolean(observation.pixelsChanged);
    observation.activeAnimationDetected ??= Boolean([observation.first, observation.second].some((sample) => sample?.demoRunningAnimations > 0 || sample?.animationNames?.length));
    delete observation.pixelsChanged;
    delete observation.motionChanged;
    item.runtimeMotionAudit = {
      status: observation.status,
      previewCount: observation.first?.previewCount ?? 0,
      runningAnimationsAtSample: observation.first?.demoRunningAnimations ?? 0,
      activeAnimationDetected: observation.activeAnimationDetected,
      media: observation.first?.media ?? null,
      interactiveTargets: observation.first?.interactiveTargets ?? [],
      interactionAttempted: observation.activated,
      inputMode: observation.inputMode,
      frameChangedBetweenSamples: observation.frameChangedBetweenSamples,
      screenshotCaptureError: observation.screenshotCaptureError,
    };
    item.previewStatus = observation.status;
  }
}
catalog.source.runtimeMotionAuditCount = [...allRouteNames].filter((name) => observations[name]?.status === 'runtime-preview-rendered').length;
catalog.source.runtimeMotionAuditUnavailableCount = [...allRouteNames].filter((name) => observations[name]?.status !== 'runtime-preview-rendered').length;
catalog.source.runtimeDocsPageCount = allRouteNames.size;
catalog.source.runtimeMotionAuditTimestamp = new Date().toISOString();
fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
fs.writeFileSync(priorPath, `${JSON.stringify(observations, null, 2)}\n`);
console.log(`Runtime sampled ${Object.keys(observations).length} component documentation pages. See public/magicui-runtime-audit.json.`);
ws.close();
