import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "component-research/aceternity/catalog.json");
const catalog = JSON.parse(await fs.readFile(catalogPath, "utf8"));
const cacheRoot = path.join(root, ".component-lab-cache/aceternity");
const appRoot = path.join(root, ".component-lab-cache/aceternity-app");

const html = await fs.readFile(path.join(cacheRoot, "ai-recommendations.html"), "utf8");
const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));
const sourceItems = jsonLd.flatMap((value) => value["@graph"] ?? value.hasPart ?? [value])
  .filter((value) => value["@type"] === "SoftwareSourceCode");
function decodeHtml(value) {
  return value.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
const articleData = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(([article]) => {
  const name = article.match(/<dt[^>]*>Component Name<\/dt>\s*<dd[^>]*>([^<]+)<\/dd>/)?.[1]?.trim();
  const categories = article.match(/<dt[^>]*>Categories<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/)?.[1] ?? "";
  return {
    name,
    title: decodeHtml(article.match(/itemProp="name">([^<]+)</)?.[1] ?? ""),
    description: decodeHtml(article.match(/itemProp="description">([^<]+)</)?.[1] ?? ""),
    categories: [...categories.matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map((match) => decodeHtml(match[1]).trim().toLowerCase()),
  };
}).filter((item) => item.name);
const officialBySlug = new Map(sourceItems.map((value) => [value.name, value]));
const articleBySlug = new Map(articleData.map((value) => [value.name, value]));
const results = JSON.parse(await fs.readFile(path.join(cacheRoot, "browser-audit/runtime-results.json"), "utf8"));
const resultByKey = new Map(results.map((value) => [value.key, value]));
const previewInventory = JSON.parse(await fs.readFile(path.join(appRoot, "preview-inventory.json"), "utf8"));
const previewByName = new Map(previewInventory.routeInventory.map((value) => [value.name, value]));
const sourceAudit = JSON.parse(await fs.readFile(path.join(cacheRoot, "source-audit.json"), "utf8"));
const sourceByName = new Map(sourceAudit.records.map((value) => [value.name, value]));

const flozioFitProfiles = {
  process: {
    fit: "conditional-story-fit",
    reason: "Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.",
    tags: ["flozio:workflow-explainer", "flozio:deal-progression"],
  },
  learning: {
    fit: "strongest-story-fit",
    reason: "A strong structural match for showing the closed learning loop: closed outcomes update fit, research, messaging, and future deal decisions. Use a real process diagram and Flozio copy around it.",
    tags: ["flozio:learning-loop", "flozio:workflow-explainer"],
  },
  data: {
    fit: "conditional-real-data",
    reason: "Can explain territory or outcome patterns only when backed by real Flozio data. Never invent map markers, comparisons, deal metrics, or customer results.",
    tags: ["flozio:requires-real-data", "flozio:workflow-explainer"],
  },
  proof: {
    fit: "conditional-approved-proof",
    reason: "Use only with approved, real customer quotes or verified outcomes. The published examples contain placeholder or third-party claims and are not Flozio proof.",
    tags: ["flozio:customer-proof-requires-approval", "flozio:requires-real-data"],
  },
  copy: {
    fit: "conditional-copy-accent",
    reason: "Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.",
    tags: ["flozio:copy-accent", "flozio:editorial"],
  },
  product: {
    fit: "conditional-real-product-visual",
    reason: "Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.",
    tags: ["flozio:requires-real-product-visual", "flozio:system-of-action"],
  },
  utility: {
    fit: "functional-ui-only",
    reason: "A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.",
    tags: ["flozio:functional-ui", "flozio:not-a-marketing-visual"],
  },
  decoration: {
    fit: "avoid-as-standalone-decoration",
    reason: "This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.",
    tags: ["flozio:generic-decoration-avoid", "flozio:needs-workflow-context"],
  },
};

const fitGroupByName = new Map();
const assignFit = (profile, names) => names.forEach((name) => fitGroupByName.set(name, profile));
assignFit("learning", ["tracing-beam", "moving-line"]);
assignFit("process", ["timeline", "sticky-scroll-reveal", "parallax-scroll", "parallax-scroll-2", "parallax-hero-images", "container-scroll-animation", "hero-parallax", "macbook-scroll", "background-lines", "layout-grid"]);
assignFit("data", ["world-map", "globe", "3d-globe", "compare", "webcam-pixel-grid"]);
assignFit("proof", ["animated-testimonials", "card-stack", "infinite-moving-cards", "images-badge", "focus-cards"]);
assignFit("copy", ["text-reveal-card", "text-generate-effect", "typewriter-effect", "flip-words", "container-text-flip", "layout-text-flip", "text-flipping-board", "colourful-text", "squiggly-text", "encrypted-text", "text-hover-effect", "hero-highlight", "canvas-text", "google-gemini-effect"]);
assignFit("product", ["3d-card", "3d-pin", "wobble-card", "comet-card", "draggable-card", "card-hover-effect", "glare-card", "evervault-card", "card-spotlight", "lens", "pixelated-canvas", "chromatic-image", "liquid-glass", "background-cubes-grid", "3d-marquee", "apple-cards-carousel", "images-slider", "carousel", "code-block", "keyboard", "terminal", "cover", "following-pointer"]);
assignFit("utility", ["input", "label", "gooey-input", "placeholders-and-vanish-input", "file-upload", "tabs", "stateful-button", "multi-step-loader", "image-generation-loader", "loader", "animated-modal", "tooltip-card", "animated-tooltip", "link-preview", "sidebar", "floating-dock", "floating-navbar", "navbar-menu", "resizable-navbar", "sticky-banner", "notch", "magnetic-button", "tailwindcss-buttons", "moving-border", "hover-border-gradient", "following-pointer"]);
assignFit("decoration", ["sparkles", "spotlight", "glowing-stars", "background-beams", "svg-mask-effect", "meteors", "lamp", "background-boxes", "wavy-background", "background-gradient", "background-gradient-animation", "aurora-background", "canvas-reveal-effect", "vortex", "shooting-stars", "stars-background", "background-beams-with-collision", "spotlight-new", "dotted-glow-background", "noise-background", "dither-shader", "cloud-shader", "scales", "grid", "glowing-effect"]);
assignFit("process", ["background-ripple-effect"]);

const motionNotes = {
  grid: "Static repeating grid; no motion or user trigger in the source-only example.",
  "moving-line": "Scroll-linked SVG stroke advances along the content path as the page scrolls; it is a process-story primitive, not a self-contained illustration.",
  "tracing-beam": "As the reader scrolls through a vertical list, a beam follows the SVG path and its progress; the beam’s height and path are tied to scroll progress.",
  "parallax-scroll": "Two image columns move vertically at different rates during page scroll; the staggered depth is the core effect.",
  "parallax-scroll-2": "Image rows shift at separate scroll-linked rates; both published variants use page scroll to create depth.",
  "parallax-hero-images": "Layered image cards drift at different depths in response to pointer movement; both examples are media compositions.",
  "container-scroll-animation": "A contained visual rotates and translates as its scroll progress changes; it begins and settles with the page position.",
  "sticky-scroll-reveal": "A pinned section reveals successive text or panels as the user scrolls through its height.",
  "hero-parallax": "Layered content translates, scales, and fades with page scroll; its effect depends on a tall, controlled hero section.",
  "macbook-scroll": "A laptop frame tilts and its screen content opens as scroll progress advances; the demo depends on product-like media.",
  timeline: "A vertical timeline reveals its line and entries as the user scrolls through the sequence.",
  "background-lines": "SVG paths draw and wave over time as a decorative background; no user trigger is needed.",
  "animated-tooltip": "Hovering each avatar reveals a name/title label that rises, scales, and rotates with the pointer; it springs in and exits on leave.",
  "following-pointer": "A small marker and content card track pointer position; the card remains attached to the current cursor location.",
  "svg-mask-effect": "Hovering the text enlarges a circular SVG mask and tracks it with pointer movement to reveal the second text layer; pointer leave shrinks it back.",
  "infinite-moving-cards": "Cards translate continuously in a looping marquee; the direction and speed are configurable and pause-on-hover is available.",
  "card-stack": "A timer rotates the back card to the front every five seconds; Motion animates the stack offsets and scale.",
  "container-text-flip": "A three-second interval swaps the word, animates the container width, and blurs letters in with small staggered delays.",
  "text-flipping-board": "Characters flip through a split-flap display transition when the displayed text changes.",
  "text-generate-effect": "Words appear in sequence with opacity/blur transitions on mount; variants change the generated text treatment.",
  "typewriter-effect": "Characters type into the line with a blinking cursor; the example’s typing starts automatically and progresses character by character.",
  "encrypted-text": "Text reveals over time while unresolved characters are replaced by changing cipher-like glyphs; the effect stops when the target text resolves.",
  "flip-words": "The current word exits upward with blur/scale while the next word enters; the example advances through a supplied list.",
  "layout-text-flip": "Words swap with a layout transition so surrounding content changes position with the word’s size.",
  "text-reveal-card": "Hovering the card changes a mask/opacity treatment to expose the hidden text; leaving restores the covered state.",
  "dither-shader": "The source converts an image to a selected ordered-dither pattern on canvas. The four published examples set animated=false, so the inspected previews are static image treatments.",
  "ascii-art": "The component converts an image into a character grid; examples 1–3 animate the reveal, while examples 4–11 explicitly disable animation and remain static.",
  scales: "Static diagonal line-scale patterns; no motion trigger exists in the five published examples.",
  "pixelated-canvas": "The image is drawn as a grid of pixels; pointer movement locally repels, attracts, or swirls cells, and the current example also jitters pixels over time.",
  "chromatic-image": "A WebGL image shader tracks the pointer and eases color-channel separation, displacement, zoom, and tilt; reduced motion lowers motion but does not turn the shader into a static image.",
  "webcam-pixel-grid": "A live media stream is sampled into a pixel grid and reacts to the cursor; the isolated audit used Chrome’s synthetic camera feed because no real camera is attached.",
  "glowing-effect": "A conic-gradient border tracks the pointer’s angle around each card and springs around the perimeter; the glow fades when the pointer leaves its proximity.",
  "background-ripple-effect": "Clicking a cell expands a radial ripple through the grid with a staggered cell delay.",
  lamp: "When the lamp enters the viewport, the cyan light cone, core glow, beam, and heading widen or rise from their initial state after a 0.3 second delay; each settles over 0.8 seconds.",
  cover: "Hovering reveals a looping particle strip and several short, delayed beams; the covered word scales down and jitters briefly, then all effects fade out on pointer leave.",
  "3d-marquee": "Four columns of image cards sit on a tilted 3D plane; alternating columns move up and down on 10- and 15-second reversing loops, while a hovered image lifts 10 pixels.",
  lens: "The first two examples reveal a circular 1.5x zoom lens that follows the pointer and fades/scales in or out; example 3 sets isStatic and shows a stationary zoom patch instead.",
  spotlight: "A large blurred SVG ellipse sweeps into view with a one-time CSS keyframe animation; it does not follow the pointer or loop in the supplied example.",
  "glowing-stars": "Five stars brighten and pulse for about two seconds, with staggered delays; they are randomly reassigned every three seconds and all light while the card is hovered.",
  "3d-pin": "Hovering the pin reveals a tilted perspective panel and bright underline; the panel fades in and its layered text planes shift in 3D, then fade out on leave.",
  "evervault-card": "Moving the pointer across the card moves a radial mask over a pattern of generated characters; the pattern brightens inside the mask and dims outside it.",
  "bento-grid": "Hovering a card translates its text group slightly and raises its shadow; the short transition settles back when the pointer leaves.",
  "images-slider": "Image panels form a layered 3D stack; keyboard input drives the configured visual state while the demo also animates its reveal on mount.",
  "direction-aware-hover": "Entering the image card from each edge slides the caption and dark overlay in from that same direction; leaving reverses the reveal.",
  "background-gradient": "Gradient layers drift continuously when the animate prop is enabled; hover increases the blurred glow's opacity, which fades back on leave.",
  "tailwindcss-buttons": "The sample buttons use distinct CSS hover and active treatments (color, shadow, gradient, and scale); effects begin on hover or press and settle on release.",
  "layout-grid": "Clicking a tile expands it into a selected detail view; the image layout animates between grid and focused panel, and clicking the detail closes it.",
  "hover-border-gradient": "On hover, a moving gradient travels around the pill-shaped border; while idle, its direction advances on a short interval, then settles when hovered.",
  "hero-highlight": "Pointer movement positions a dotted SVG pattern over the words; the pattern fades in on hover and follows the cursor within the text area.",
  "glare-card": "Pointer movement tilts the card and shifts a radial glare across its surface; a short delay softens entry, and leaving fades and levels it.",
  "apple-cards-carousel": "The horizontal track scrolls through oversized cards; arrow buttons move by one card, and selecting a card expands it into a modal that exits back to the track.",
  "text-hover-effect": "The text is drawn as SVG strokes; hovering moves a circular mask with the pointer to reveal a colored text layer, while the stroke draws on over four seconds.",
  "animated-testimonials": "The active quote and portrait transition with overlapping fade, scale, and position changes; arrow buttons switch entries and a five-second timer advances them automatically.",
  "code-block": "Tabs replace the visible code sample; the copy button writes the active sample and briefly changes to a copied state before resetting after two seconds.",
  carousel: "Clicking an indicator selects its image and animates the active slide; pointer position also tilts the active 3D card, which returns level on leave.",
  "colourful-text": "A colored text word cycles through gradient states on a repeating interval, with each change eased over a short transition.",
  "squiggly-text": "The example applies a static SVG squiggle treatment under selected words; the supplied implementation has no motion trigger.",
  "spotlight-new": "Layered blurred spotlight shapes run repeating position and opacity keyframes independently, without a user trigger.",
  loader: "The published examples show small loaders whose dots or marks repeat staggered opacity, scale, or rotation cycles until removed.",
  "pointer-highlight": "The cursor highlights selected text or color swatches through a local pointer-following overlay; text-only variants are static unless a hover target is present.",
  "tooltip-card": "Hovering the trigger reveals a floating card beside the pointer; it measures the card and flips position near viewport edges, then fades on leave.",
  "images-badge": "Hovering the badge fans its small image stack upward and outward with staggered rotation; leaving gathers the images back into the badge.",
  keyboard: "Mouse or physical key presses depress the corresponding on-screen key; configured keys can trigger short sounds, and release raises the key.",
  terminal: "The example types command and response text character by character, blinks the cursor, and scrolls as output grows; the timed sequence ends at its final prompt.",
  "stateful-button": "Clicking the button moves it through loading and success states, then returns to its resting state after the configured delay.",
  "multi-step-loader": "The loader advances through supplied messages on a timer, animating the active line and progress between steps.",
  "image-generation-loader": "Canvas/pixel layers sweep across an image and update the progress overlay; the examples use different visual progress treatments.",
  "notch": "The floating top/bottom control opens its menu on click; choosing an alignment changes the notch position with a spring transition.",
  "floating-navbar": "The bar enters after scrolling past its threshold and changes visibility as scroll direction changes.",
  "resizable-navbar": "The nav contracts from its full width into a smaller floating bar after scrolling; mobile and desktop use separate layouts.",
  "sticky-banner": "The banner pins to the viewport edge and hides while scrolling down, then returns when the user scrolls upward.",
  "navbar-menu": "Hovering a top-level item opens a shared-layout mega-menu; the panel animates between items and exits when pointer leaves.",
  "tabs": "Clicking a tab changes the active content with a shared-layout background transition.",
  "sidebar": "Hover or click expands/collapses the navigation rail; child items transition with the sidebar width.",
  "floating-dock": "Hovering a dock item scales it and its neighbors based on pointer distance; the dock stays anchored at the viewport edge.",
  "animated-modal": "Clicking the trigger opens a centered overlay; the dialog scales/fades in and closes from its button or backdrop.",
  "file-upload": "Dragging files onto the drop zone or selecting them activates the border/background state and file list.",
  "gooey-input": "Clicking the compact control expands the search field through a shared-layout transition; submit/close returns it to the compact state.",
  "placeholders-and-vanish-input": "Placeholder prompts rotate on a timer; submitting text animates characters away before the input resets.",
  "lens": "Dragging across the media moves a magnifying lens that enlarges the content beneath it; variants show image and content treatments.",
  "compare": "Dragging the divider reveals different portions of two images; each variant uses a distinct comparison layout.",
  "world-map": "SVG arcs draw between supplied coordinates and animated dots pulse at endpoints; the map itself is generated from the provided locations.",
  globe: "A canvas globe rotates continuously and places dots on its surface; the source exposes rotation, color, and size props.",
  "3d-globe": "A textured WebGL globe rotates under drag; marker avatars and connecting arcs stay anchored to geographic coordinates.",
  "3d-card": "Pointer position tilts the card in perspective with spring smoothing; on leave it eases back to flat.",
  "draggable-card": "The card follows pointer/touch drag, tilts with movement, and springs back or reacts at its bounds; all four variants use drag.",
  "comet-card": "Pointer position tilts the surface in 3D; the bright comet accent sweeps around the card edge.",
  "wobble-card": "Pointer movement offsets and scales the card layers with an elastic wobble; the noise texture and image treatment are fixed assets.",
  "background-cubes-grid": "A WebGL cube field tilts and ripples around the cursor; three variants change the grid perspective and response.",
  "liquid-glass": "Dragging the glass surface changes its refractive offset and color fringe; the frosted fallback stays visible when the effect is reduced.",
  "canvas-reveal-effect": "Hovering the card starts a WebGL particle field that fades in and reveals over the text; leaving fades the field out.",
  "noise-background": "A looping animated gradient sits beneath a noise texture; two variants change the gradient composition.",
  "cloud-shader": "A WebGL cloud field drifts continuously; hover variants respond to pointer position and expose color/speed/density props.",
  "dotted-glow-background": "Dots brighten and fade in a repeating glow cycle; one variant adds pointer-responsive light.",
  "shooting-stars": "Star streaks cross the background on staggered repeating paths and fade after passing through.",
  "stars-background": "Stars twinkle through staggered opacity/scale loops; the field runs continuously without user input.",
  "meteors": "Meteor streaks travel diagonally across the panel on repeated, staggered paths and fade out between passes.",
  "background-beams": "SVG beams sweep along curved paths in a repeating animation behind the content.",
  "background-beams-with-collision": "SVG beams travel across the background and flare when they intersect the collision region.",
  "background-boxes": "Pointer hover lights individual grid cells; the selected cell’s border and fill brighten briefly.",
  "background-gradient-animation": "A blurred gradient shifts position continuously; the example adds a pointer-sensitive interaction region.",
  "aurora-background": "A soft gradient field loops slowly across the container; the gradient layers move independently.",
  "vortex": "Procedural particle strands rotate and flow inward in a continuous vortex field; color, count, and speed are configurable.",
  "sparkles": "A particle field emits small twinkling points around the content; particles loop continuously, while examples change size and density.",
  "moving-border": "A rotating gradient highlight travels around the border continuously; use the inner content as the real focus.",
  "background-ripple-effect": "A clicked grid cell starts a staggered radial wave through nearby cells.",
};

const defaultVisual = (item) => item.description || `${item.title} is supplied as a reusable React component; inspect its official preview for its concrete appearance.`;
const motionSummaryFor = (name, source, variants) => {
  if (motionNotes[name]) return motionNotes[name];
  const signals = [...new Set([...(source?.motionSignals ?? []), ...(source?.variants ?? []).flatMap((variant) => variant.motionSignals ?? [])])];
  const triggers = [...new Set(variants.map((variant) => variant.inferredTrigger).filter(Boolean))];
  if (!signals.length || (signals.length === 1 && signals[0] === "svg-or-path")) return "Static treatment in the inspected source/example; no animated lifecycle or user trigger was found.";
  const descriptions = [];
  if (signals.includes("scroll-linked") || triggers.includes("scroll")) descriptions.push("The visual responds to page scroll and progresses with the reader’s position.");
  if (signals.includes("pointer-tracking")) descriptions.push("Pointer coordinates drive the active surface or visual position.");
  if (signals.includes("hover-triggered") || triggers.includes("hover")) descriptions.push("Hover starts the visible state and pointer leave returns or dismisses it.");
  if (signals.includes("click-or-toggle") || triggers.includes("click")) descriptions.push("Click changes the visible state or selects an item.");
  if (signals.includes("drag-or-gesture") || triggers.includes("drag")) descriptions.push("Drag or touch movement controls the position or comparison state.");
  if (signals.includes("keyboard-input") || triggers.includes("press")) descriptions.push("Keyboard events change or animate the pressed state.");
  if (signals.includes("repeating-animation")) descriptions.push("The source repeats the motion continuously or on a configured interval.");
  else if (signals.includes("timer-driven")) descriptions.push("A timer or animation frame advances the sequence, then stops or loops according to the component logic.");
  if (signals.includes("spring-settling")) descriptions.push("Motion values settle with spring-based transitions.");
  if (signals.includes("three-dimensional")) descriptions.push("The main rendering uses a 3D perspective or WebGL scene.");
  else if (signals.includes("canvas-rendering")) descriptions.push("The main visual is painted on canvas rather than DOM layout elements.");
  if (signals.includes("svg-or-path")) descriptions.push("SVG paths or masks provide the moving/revealing layer.");
  return descriptions.join(" ") || "Source and published preview were inspected; see the route-level trigger/evidence for the observed lifecycle.";
};

let missingOfficial = 0;
for (const item of catalog.items) {
  if (item.kind !== "component") continue;
  if (item.officialTier !== "free") continue;
  const official = officialBySlug.get(item.name);
  const article = articleBySlug.get(item.name);
  if (official) {
    item.description = article?.description || official.description || item.description;
    item.officialCategories = article?.categories ?? [];
    item.officialTier = official.tier ?? "free-component-registry";
    item.officialDependencies = official.dependencies ?? item.dependencies ?? [];
  } else {
    missingOfficial += 1;
    item.description ??= `Official registry component ${item.title}. Description not present on the public recommendations index.`;
    item.officialCategories ??= [];
    item.officialTier ??= "free-component-registry";
  }
  if (!article && item.docsUrl) {
    try {
      const docs = await fs.readFile(path.join(cacheRoot, `docs/${item.name}.html`), "utf8");
      const description = docs.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
      if (description) item.description = decodeHtml(description);
    } catch {}
  }
  const noDocsDescriptions = {
    grid: "A black grid-pattern background with centered content; decorative and static in the published source.",
    "moving-line": "A scroll-driven SVG line travels down the page beside four content panels; the beam's position follows scroll progress.",
    input: "A text input with a motion-driven highlight that responds to pointer movement; a form control, not a standalone illustration.",
    label: "An accessible label primitive built on Radix; it has no standalone animation or visual treatment.",
    "background-lines": "A set of animated SVG wave paths used as a background layer; the source package has no published demo route, so the lab uses a small source-only wrapper.",
  };
  if (noDocsDescriptions[item.name]) item.description = noDocsDescriptions[item.name];

  const preview = previewByName.get(item.name);
  const source = sourceByName.get(item.name);
  const sourceVariantById = new Map((source?.variants ?? []).map((variant) => [variant.id, variant]));
  const variants = (preview?.variants ?? []).map((variant) => {
    const result = resultByKey.get(`${item.name}:${variant.id}`);
    const sourceVariant = sourceVariantById.get(variant.id);
    return {
      id: variant.id,
      officialExample: Boolean(variant.exampleFile),
      sourceFile: variant.exampleFile ?? null,
      sourceSha256: sourceVariant?.exampleHash ?? null,
      exportName: variant.exportName ?? null,
      exampleMotionSignals: sourceVariant?.motionSignals ?? [],
      route: variant.route ?? null,
      sourceStatus: variant.status,
      browserStatus: result?.status ?? "pending-browser-audit",
      visualInspected: Boolean(result?.screenshots?.initial && result?.screenshots?.active && result?.screenshots?.mobileReduced),
      motionInspected: Boolean(result?.interaction && result?.mobileInteraction),
      interaction: result?.interaction ?? null,
      inferredTrigger: result?.inputInferredFromSource ?? null,
      screenshotChangedAfterInput: result?.screenshotChangedAfterInput ?? null,
      motionObservation: !result ? "not audited" : result.screenshotChangedAfterInput ? "Visible state change captured after the tested trigger." : ["grid:source", "label:source", "lens:3", ...[1, 2, 3, 4].map((n) => `dither-shader:${n}`), ...Array.from({ length: 8 }, (_, n) => `ascii-art:${n + 4}`), ...Array.from({ length: 5 }, (_, n) => `scales:${n + 1}`)].includes(`${item.name}:${variant.id}`) ? "The inspected source/example is static for this variant; no motion is defined for the tested state." : item.name === "bento-grid" ? "Pointer hover was active; source defines a 200ms text shift and shadow transition, but the sampled screenshots showed no detectable pixel change." : "The source trigger was exercised, but the sampled screenshots showed no pixel change; the exact behavior remains described from source.",
      keyboardEvidence: result?.keyboard ?? null,
      mobileInteractionEvidence: result?.mobileInteraction ?? null,
      desktop: result ? {
        screenshotInitial: result.screenshots.initial.path,
        screenshotAfterInput: result.screenshots.active.path,
        screenshotDuringInput: result.interaction?.duringGestureScreenshot?.path ?? null,
        horizontalOverflow: result.initial.overflows,
        runtimeExceptions: result.consoleErrors.length,
        consoleWarnings: result.consoleMessages.length,
      } : null,
      mobileReducedMotion: result ? {
        screenshot: result.screenshots.mobileReduced.path,
        emulatedWidth: result.mobile.emulatedWidth ?? 390,
        viewportWidth: result.mobile.width,
        viewportClientWidth: result.mobile.clientWidth ?? null,
        documentWidth: result.mobile.bodyWidth,
        horizontalOverflow: result.mobile.overflow,
        prefersReducedMotion: result.mobile.reducedMotion,
        activeAnimations: result.mobile.animations ?? null,
      } : null,
    };
  });

  const allRendered = variants.length > 0 && variants.every((variant) => variant.browserStatus === "rendered");
  const profile = flozioFitProfiles[fitGroupByName.get(item.name)] ?? flozioFitProfiles.decoration;
  const visualSummary = defaultVisual(item);
  const motionSummary = motionSummaryFor(item.name, source, variants);
  const allMotionSignals = [...new Set([...(source?.motionSignals ?? []), ...(source?.variants ?? []).flatMap((variant) => variant.motionSignals ?? [])])];
  const sourceEvidenceComplete = Boolean(source?.sourceFiles.length && source.sourceBytes > 0 && source.combinedSourceSha256);
  item.review = {
    status: allRendered && variants.every((variant) => variant.desktop && variant.mobileReducedMotion) ? "free-source-visual-and-motion-reviewed" : "in-progress",
    sourceRead: sourceEvidenceComplete,
    visualInspected: allRendered && variants.every((variant) => variant.desktop?.screenshotInitial && variant.desktop?.screenshotAfterInput),
    motionInspected: allRendered && variants.every((variant) => variant.desktop && variant.interaction),
    visualSummary,
    motionSummary,
    motionSignals: allMotionSignals,
    directDependencies: source?.directDependencies ?? [],
    publicProps: source?.declaredPropNames ?? [],
    componentSourceSha256: source?.combinedSourceSha256 ?? null,
    componentSourceFiles: source?.sourceFileHashes ?? [],
    registrySource: item.registryUrl,
    registrySourceHash: item.sourceHash,
    explicitReducedMotionSupport: Boolean(source?.explicitReducedMotionSupport || source?.variants?.some((variant) => variant.explicitReducedMotionSupport)),
    variants,
    reviewNotes: [
      ...(variants.some((variant) => variant.browserStatus !== "rendered") ? ["At least one preview route did not render; this item remains incomplete."] : []),
      ...(variants.some((variant) => variant.desktop?.horizontalOverflow || variant.mobileReducedMotion?.horizontalOverflow) ? ["At least one captured viewport has horizontal overflow; see route evidence."] : []),
      ...(variants.some((variant) => variant.desktop?.runtimeExceptions) ? ["The browser reported a runtime exception; inspect per-route console evidence before use."] : []),
      ...(variants.some((variant) => variant.screenshotChangedAfterInput === false && !variant.motionObservation?.startsWith("The inspected source/example is static")) ? ["At least one trigger was dispatched but produced no sampled pixel change; see variant-level motionObservation and compare source before claiming the effect was visibly verified."] : []),
      ...(item.name === "webcam-pixel-grid" ? ["Webcam preview was inspected with Chrome's synthetic media stream; the lab did not access a real camera."] : []),
      ...(item.name === "keyboard" ? ["Keyboard audio is optional; the official sound sprite and config were loaded from Aceternity docs into ignored local cache for this audit."] : []),
    ],
  };
  item.visualSummary = visualSummary;
  item.motionSummary = motionSummary;
  item.flozioFit = { ...profile, group: fitGroupByName.get(item.name) ?? "decoration" };
  item.fit = profile.fit;
  item.searchTags = [...new Set([
    ...item.name.toLowerCase().split(/[^a-z0-9]+/).filter((part) => part.length > 1),
    ...(item.officialCategories ?? []),
    ...allMotionSignals,
    ...(variants.some((variant) => variant.inferredTrigger === "scroll") ? ["scroll-triggered"] : []),
    ...(variants.some((variant) => variant.inferredTrigger === "hover") ? ["hover-triggered"] : []),
    ...(variants.some((variant) => variant.inferredTrigger === "click") ? ["click-triggered"] : []),
    ...(variants.some((variant) => variant.inferredTrigger === "drag") ? ["drag-triggered"] : []),
    ...(item.dependencies?.length ? ["external-dependencies"] : []),
    ...profile.tags,
  ])].sort();
  item.licenseStatus = "official-aceternity-license-reviewed-local-only-source";
  item.availability = "free-public-component-registry";
  item.searchTags = [...new Set(item.searchTags)].sort();
}

catalog.componentAudit = {
  generatedAt: new Date().toISOString(),
  officialIndexUrl: "https://ui.aceternity.com/ai-recommendations",
  officialIndexRetrievedAt: "2026-10-21",
  officialComponentRecords: sourceItems.length,
  catalogComponents: catalog.items.filter((item) => item.kind === "component" && item.officialTier === "free").length,
  paidCatalogComponents: catalog.items.filter((item) => item.kind === "component" && item.officialTier === "pro").length,
  missingOfficialMetadata: missingOfficial,
  browserAuditRecords: results.length,
  browserAuditRoutes: previewInventory.routeInventory.reduce((sum, item) => sum + item.variants.length, 0),
  nextUnreviewedRoute: previewInventory.routeInventory.flatMap((item) => item.variants.map((variant) => `${item.name}:${variant.id}`))
    .find((key) => !resultByKey.has(key)) ?? null,
  paidItems: "Paid pro components, blocks, and templates remain inventoried with explicit access blockers; they were not imported or represented as reviewed.",
};
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Enriched ${catalog.componentAudit.catalogComponents} components from ${sourceItems.length} official descriptions/categories; ${missingOfficial} lacked a name match.`);
console.log(`Browser evidence attached: ${results.length}/${catalog.componentAudit.browserAuditRoutes} routes; next=${catalog.componentAudit.nextUnreviewedRoute ?? "none"}.`);
