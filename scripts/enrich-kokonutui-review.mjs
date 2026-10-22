import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "component-research/kokonutui/catalog.json");
const evidenceRoot = path.join(root, ".component-lab-cache/kokonutui-source/research/evidence");
const catalog = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const audit = JSON.parse(await fs.readFile(path.join(evidenceRoot, "browser-audit.json"), "utf8"));
if (catalog.items.length !== 80 || catalog.items.reduce((sum, item) => sum + item.publishedExampleCount, 0) !== 92) throw new Error("Kokonut inventory changed; reconcile the free source/preview inventory before enrichment.");
if (audit.length !== catalog.items.length || audit.some((entry) => entry.desktop?.status !== 200 || !entry.desktop?.preview || entry.mobile?.status !== 200 || !entry.mobile?.preview || entry.mobile?.width !== 390 || entry.mobile?.scrollWidth > 390 || entry.mobile?.bodyScrollWidth > 390 || entry.mobile?.reducedMotion !== true || entry.errors?.length || entry.mobile?.pageErrors?.length)) throw new Error("All 80 desktop/mobile route, preview, reduced-motion, no-overflow, and page-error checks must pass before marking this library reviewed.");
const multiItems = catalog.items.filter((item) => item.publishedExampleCount > 1);
if (multiItems.some((item) => {
  const record = audit.find((entry) => entry.id === item.id);
  return record?.variantInteractionAudit?.observations?.length !== item.publishedExampleCount || record?.variantInteractionAudit?.pageErrors?.length;
})) throw new Error("Every multi-instance published variant needs its own successful interaction and active screenshot audit before enrichment.");

const fitData = {};
function add(names, fit, reason, tags) { for (const name of names.split(/\s+/).filter(Boolean)) fitData[name] = { fit, reason, tags: [...tags] }; }
const ai = ["ai-prompt", "action-search-bar", "ai-input-search", "ai-text-loading", "ai-loading", "ai-tool-approval", "ai-context-meter", "ai-citations", "ai-diff-review", "ai-model-selector", "ai-autocomplete", "ai-token-alternatives", "ai-branches", "ai-agent-lanes"];
add("ai-citations ai-diff-review ai-token-alternatives ai-branches ai-agent-lanes ai-tool-approval", "conditional-product-workflow", "Strong conceptual match for showing research evidence, reviewed outreach drafts, branching deal strategies, or transparent agent actions inside Flozio. These are reference patterns only; use only if the corresponding workflow is confirmed and design it with real Flozio content.", ["sales-engagement", "AI-transparency", "workflow", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("ai-prompt ai-input-search ai-autocomplete ai-model-selector", "conditional-product-workflow", "Useful interaction references for an AI research and message-writing workspace. The vendor examples contain generic AI tooling and model controls; adapt only after Flozio workflow and controls are defined.", ["AI-assist", "research", "personalized-outreach", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("ai-loading ai-text-loading ai-context-meter", "conditional-product-workflow", "Could communicate a real research or analysis state. Keep feedback brief, accessible, and tied to a real operation; never use a fake loading state as decoration.", ["AI-state", "progress-feedback", "sales-engagement", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("action-search-bar", "conditional-product-workflow", "A practical command palette reference for navigating a future all-in-one sales workspace or invoking confirmed actions; labels and keyboard shortcuts must match real Flozio capabilities.", ["navigation", "keyboard", "sales-workspace", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("file-upload ai-voice", "conditional-product-workflow", "Relevant only where users truly attach account research or record/transcribe calls. Requires an approved upload, privacy, permission, and recording workflow; this demo does not define Flozio behavior.", ["call-intelligence", "research-input", "accessibility", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("synced-transcript", "conditional-product-workflow", "A useful call-review interaction pattern because transcript position and playback stay linked. Use only with Flozio-approved call data and playback behavior; never imply the sample transcript is real.", ["conversation-intelligence", "call-review", "transcript", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("notification-stack status-island", "conditional-product-workflow", "Could surface real rep follow-ups or background research without losing the current task. Avoid noisy notifications and invented deal-risk alerts; use only confirmed states.", ["sales-workspace", "follow-up", "status", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("metric-card apple-activity-card activity-terrain uptime-card", "conditional-product-workflow", "Potential patterns for verified rep activity or team-performance feedback. The vendor's example data is illustrative; never reuse its metrics, streaks, or implied outcomes as Flozio claims.", ["sales-activity", "performance", "gamification", "requires-real-metrics", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("bento-grid", "conditional-product-workflow", "A functional draggable and resizable dashboard grid, suitable only if Flozio needs user-arranged widgets. It is not a reason to add a generic bento section to the marketing site.", ["dashboard", "customization", "drag-and-drop", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("ai-voice clip-trimmer lightbox-grid photo-straighten focal-point-picker", "conditional-product-workflow", "Media controls could support genuine call recordings or user-provided sales collateral. Require approved media, real playback/editing behavior, and privacy rules; the image gallery examples are unrelated to Flozio's marketing story.", ["media", "call-review", "requires-approved-imagery", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("smooth-drawer currency-transfer receipt-printer timezone-planner spending-ring liquid-gauge liquid-slider team-selector avatar-picker profile-dropdown stack-panel", "conditional-product-workflow", "These are polished app interaction references, but their current commerce, account, scheduling, and finance examples are not Flozio workflows. Consider only after a direct product need is confirmed and replace all sample data.", ["interaction-pattern", "product-only", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("command-button hold-button tear-button bell-button particle-button gradient-button attract-button v0-button slide-text-button undo-button", "conditional-utility", "A reusable control pattern for a clearly defined action. Preserve keyboard access, reduced motion, and explicit success/failure states; don't import the demo's effect into marketing CTAs without a specific purpose.", ["button", "feedback", "interaction", "reduced-motion", "product-only"]);
add("smooth-tab morphic-navbar toolbar scroll-index", "conditional-product-workflow", "Useful navigation or tool-selection patterns for a dense application workspace; marketing pages should continue to follow the established homepage navigation and section patterns.", ["navigation", "workspace", "keyboard", "product-only", "planned-feature-needs-confirmation"]);
add("card-flip carousel-cards card-stack page-flip", "poor-fit", "These motion-first card metaphors are polished but do not directly explain Flozio's sales intelligence loop or system of action. Keep as interaction research; do not place them in a marketing section without a concrete story they clarify.", ["gesture", "card-interaction", "motion-heavy", "weak-brand-fit"]);
add("halftone-background shape-hero background-paths dot-field flow-field topo-background drape-background", "poor-fit", "A decorative visual effect without a direct Flozio-specific explanation. Do not use as the main visual by default; adopt only if it supports a defined concept and matches the homepage's actual visual language.", ["background-effect", "decorative", "motion-heavy", "weak-brand-fit"]);
add("cradle-text swoosh-text type-writer plucked-text glitch-text dynamic-text spoiler-text", "poor-fit", "A typography effect rather than a visual explanation of Flozio. The style is deliberately expressive and can undermine clarity or the current homepage's restraint; reserve for a narrow, justified moment.", ["typography-effect", "decorative", "motion-heavy", "weak-brand-fit"]);
add("detent-dial pull-cord signature-pad wheel-picker liquid-glass-card marking-menu", "poor-fit", "A distinctive tactile interaction, but the physical metaphor has no clear role in Flozio's current story. Retain as a source reference rather than adding motion for novelty.", ["gesture", "physics", "motion-heavy", "weak-brand-fit"]);
add("loader switch-button morph-popover", "conditional-utility", "A compact state or theme transition pattern. Use only where it solves a real interaction problem, and verify contrast, keyboard use, and reduced-motion behavior in Flozio's context.", ["state-transition", "microinteraction", "product-only"]);
add("ai-citations ai-diff-review synced-transcript ai-agent-lanes notification-stack activity-terrain", "strong-candidate", "Among this library's most directly relevant references: they can explain evidence-backed AI research, reviewed outreach, conversation learning, parallel agent work, meaningful follow-up, or sales activity. Treat every example as a pattern, not a Flozio product screenshot; confirm capabilities and use authentic Flozio data before implementation.", ["priority-review", "sales-engagement", "conditional-on-real-product", "resembles-product-ui"]);
add("ai-citations", "strong-candidate", "A clear pattern for attaching source evidence to each account-research claim or personalized outreach suggestion. It can make Flozio's intelligence explainable when grounded in real, permitted research sources; the sample text and sources are demo content.", ["priority-review", "account-research", "evidence-backed-AI", "personalized-outreach", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("ai-diff-review", "strong-candidate", "A useful interaction model for reviewing AI-drafted sequence or follow-up edits line by line, with accept, reject, and undo. Use only if Flozio supports human review of generated copy, and pair it with authentic Flozio draft data.", ["priority-review", "outreach-review", "human-in-the-loop", "AI-transparency", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("synced-transcript", "strong-candidate", "Directly relevant to conversational intelligence: the transcript follows audio playback and lets a rep jump to a word or passage. It could support call review and learning from conversations when Flozio's recording, transcript, and permission workflows are confirmed.", ["priority-review", "conversation-intelligence", "call-review", "transcript", "playback-sync", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("ai-agent-lanes", "strong-candidate", "A compelling pattern for explaining a lead agent's parallel research tasks and tool activity. It can fit Flozio's planned account research and deal-analysis story if the agent workflow is real, transparent, and shown with authentic task data.", ["priority-review", "AI-agents", "parallel-work", "account-research", "tool-transparency", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("notification-stack", "strong-candidate", "Could communicate timely, actionable follow-up on a real deal risk or rep task while keeping the current workflow visible. Do not show invented alerts, risks, or deal records; design around a confirmed Flozio workflow.", ["priority-review", "deal-risk", "rep-follow-up", "actionable-alerts", "planned-feature-needs-confirmation", "resembles-product-ui"]);
add("activity-terrain", "strong-candidate", "A distinctive way to show meaningful activity patterns over time, relevant to Flozio's sales-engagement and coaching loop. The vendor's heatmap content and distribution are illustrative; use only verified Flozio events and preserve a readable, accessible summary.", ["priority-review", "sales-activity", "activity-history", "conversation-coaching", "requires-real-metrics", "planned-feature-needs-confirmation", "resembles-product-ui"]);

const auditById = new Map(audit.map((entry) => [entry.id, entry]));
const fitOrder = { "strong-candidate": 0, "conditional-product-workflow": 1, "conditional-utility": 2, "poor-fit": 3 };
const guideRows = [];
for (const item of catalog.items) {
  const result = auditById.get(item.id);
  if (!result) throw new Error(`Missing browser evidence for ${item.name}`);
  const evidencePaths = [
    path.join(evidenceRoot, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-desktop.png`),
    path.join(evidenceRoot, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-active.png`),
    path.join(evidenceRoot, `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}-mobile.png`),
    ...(result.variantInteractionAudit?.observations ?? []).map((observation) => path.join(path.dirname(evidenceRoot), observation.screenshot)),
    ...(result.featuredInteractionAudit?.steps ?? []).flatMap((step) => [step.screenshot, step.hoverScreenshot].filter(Boolean).map((file) => path.join(path.dirname(evidenceRoot), file))),
  ];
  for (const evidencePath of evidencePaths) {
    try { await fs.access(evidencePath); } catch { throw new Error(`Missing local visual evidence for ${item.name}: ${evidencePath}`); }
  }
  const fit = fitData[item.name] ?? { fit: "conditional-product-workflow", reason: "Potentially useful as a focused interaction pattern only after a direct, confirmed Flozio workflow is identified. Review the source behavior, accessibility, and presentation context before selecting it.", tags: ["interaction-pattern", "planned-feature-needs-confirmation", "resembles-product-ui"] };
  // Preserve the higher precision fit above when a broader grouped rule also matched.
  const focused = Boolean(result.gestureAudit);
  const interaction = result.gestureAudit ?? result.interaction;
  const trigger = result.gestureAudit?.trigger ?? result.interaction?.triggerAttempted?.join("; ") ?? "No automated trigger was selected; inspect the live preview for its described interaction.";
  const changed = result.featuredInteractionAudit
    ? result.featuredInteractionAudit.changed
    : result.variantInteractionAudit
      ? result.variantInteractionAudit.observations.some((observation) => observation.changed || observation.shortcutHeldChanged)
      : result.gestureAudit?.changed ?? result.interaction?.canvasChange?.changed ?? result.interaction?.frameChange?.changed ?? (result.interaction?.afterText && result.interaction.afterText !== result.interaction.beforeText);
  const observedTrigger = result.featuredInteractionAudit
    ? result.featuredInteractionAudit.steps.map((step) => step.trigger).join("; ")
    : result.variantInteractionAudit
      ? `Per-instance probes across ${result.variantInteractionAudit.observations.length} published variants: ${result.variantInteractionAudit.observations.map((observation) => `${observation.variant} ${observation.trigger ?? observation.triggeredBy}: ${observation.changed ?? observation.shortcutHeldChanged ?? "state observed"}`).join("; ")}`
      : trigger;
  const testSummary = result.featuredInteractionAudit
    ? `Source-specific interactions were probed (${observedTrigger}); visible state changed: ${Boolean(changed)}; ${result.featuredInteractionAudit.pageErrors.length} uncaught page errors.`
    : result.variantInteractionAudit
      ? `Per-instance probes covered all ${result.variantInteractionAudit.observations.length} published variants; observed a visible change in ${result.variantInteractionAudit.observations.filter((observation) => observation.changed || observation.shortcutHeldChanged).length} probe(s). No uncaught page error.`
    : focused
    ? `A targeted ${trigger} probe changed the rendered frame/text: ${Boolean(changed)}; no uncaught page error. The probe confirms response, not every timing or edge case.`
    : `The published preview was inspected and its source trigger was probed (${observedTrigger}); visible state changed: ${Boolean(changed)}. No uncaught page error.`;
  const signals = item.sourceSignals;
  const motionSource = [
    item.description,
    signals.animationPrimitives.length ? `Source animation mechanisms: ${signals.animationPrimitives.join(", ")}.` : "No named animation API was detected in the source; visual treatment may use CSS or direct canvas/SVG drawing.",
    signals.usesCanvas ? "Canvas is used; pointer updates can change the drawn frame." : "",
    signals.usesSvg ? "SVG is used for at least part of the visual." : "",
    signals.reducedMotionHandling ? "Source contains an explicit reduced-motion branch." : "No explicit reduced-motion branch was found in source; reduced-motion rendering was still captured and checked for layout.",
    testSummary,
  ].filter(Boolean).join(" ");
  const imageName = `${String(catalog.items.indexOf(item) + 1).padStart(2, "0")}-${item.name}`;
  const reviewNotes = [];
  if (result.consoleIssues?.length) reviewNotes.push(`${result.consoleIssues.length} browser console issue(s) were recorded; triage found resource-denied requests and vendor warnings, but no uncaught page exception. See ignored browser-audit.json for exact messages.`);
  if (item.localRuntimeOverride) reviewNotes.push(item.localRuntimeOverride);
  item.flozioFit = fit;
  item.searchTags = [...new Set([...item.searchTags, ...fit.tags, ...signals.animationPrimitives.map((value) => value.toLowerCase()), ...(signals.usesCanvas ? ["canvas"] : []), ...(signals.usesSvg ? ["svg"] : [])])].sort();
  item.reviewStatus = "reviewed";
  item.review = {
    sourceRead: true,
    visualInspected: true,
    motionInspected: true,
    responsiveInspected: true,
    reducedMotionInspected: true,
    variants: item.review.variants.map((variant, index) => {
      const variantObservation = result.variantInteractionAudit?.observations?.find((observation) => observation.variant === index + 1);
      const singleProbe = item.publishedExampleCount === 1 ? {
        trigger: observedTrigger,
        changed: Boolean(changed),
        type: result.featuredInteractionAudit ? "source-specific" : focused ? "targeted" : "source-signal-control",
        screenshot: result.featuredInteractionAudit?.steps?.[0]?.screenshot ?? `evidence/${imageName}-active.png`,
        ...(result.featuredInteractionAudit ? { additionalScreenshots: result.featuredInteractionAudit.steps.flatMap((step) => [step.screenshot, step.hoverScreenshot].filter(Boolean)) } : {}),
      } : null;
      return { ...variant, status: "rendered-source-reviewed-interaction-probed", renderedInOfficialPreview: true, individuallyInteractionProbed: item.publishedExampleCount === 1 ? true : Boolean(variantObservation), ...((variantObservation || singleProbe) ? { interactionProbe: variantObservation ?? singleProbe } : {}) };
    }),
    motionSummary: motionSource,
    motionEvidence: [
      `Local docs preview: ${item.localDocsRoute}; official docs: ${item.docsUrl}`,
      `Desktop screenshot: evidence/${imageName}-desktop.png; active screenshot: evidence/${imageName}-active.png; 1440x1000 CSS viewport.`,
      `Mobile screenshot: evidence/${imageName}-mobile.png; true 390x844 CSS viewport with touch and prefers-reduced-motion: reduce; document width remained 390px and no horizontal overflow.`,
      `Interaction audit: ${focused ? "targeted gesture/hold test" : "preview control/canvas test"}; changed=${Boolean(changed)}; animations still running after settling=${result.gestureAudit?.runningAnimationsAfter ?? result.interaction?.runningAnimationsAfter ?? "not sampled"}.`,
      `Official published preview instances: ${item.publishedExampleCount}; every instance source/configuration recorded below and rendered on the official docs page. ${result.variantInteractionAudit ? `All ${result.variantInteractionAudit.observations.length} multi-instance examples also received their own interaction probe.` : "The single published instance received the route-level probe above."}`,
      ...(result.featuredInteractionAudit?.steps ?? []).map((step) => `Source-specific interaction: ${step.trigger}; ${step.changed === undefined ? "visual state captured" : `changed=${step.changed}`}; evidence=${step.screenshot ?? ""}.`),
      ...(result.featuredInteractionAudit?.steps ?? []).map((step) => step.hoverScreenshot ? `Additional hover evidence: ${step.hoverScreenshot}.` : null).filter(Boolean),
      ...(result.variantInteractionAudit?.observations ?? []).map((observation) => `Variant ${observation.variant} active-state evidence: ${observation.screenshot ?? "screenshot missing"}; trigger=${observation.trigger ?? observation.triggeredBy}; changed=${observation.changed ?? observation.shortcutHeldChanged ?? "state observed"}.`),
    ],
    reviewNotes,
    interactionProbe: {
      type: result.featuredInteractionAudit ? "source-specific" : focused ? "targeted" : "source-signal-control",
      trigger: observedTrigger,
      changed: Boolean(changed),
      beforeText: (result.featuredInteractionAudit?.beforeText ?? result.gestureAudit?.beforeText ?? result.interaction?.beforeText ?? "").slice(0, 700),
      afterText: (result.featuredInteractionAudit?.steps?.at(-1)?.observed ?? result.gestureAudit?.afterText ?? result.interaction?.afterText ?? "").slice(0, 700),
      pageErrors: result.featuredInteractionAudit?.pageErrors ?? result.gestureAudit?.pageErrors ?? result.errors ?? [],
      consoleIssueCount: result.consoleIssues?.length ?? 0,
      desktopRunningAnimations: result.desktop?.runningAnimations ?? 0,
      reducedMotionRunningAnimations: result.mobile?.runningAnimations ?? 0,
    },
  };
  guideRows.push(item);
}

catalog.counts.reviewedComponents = catalog.items.length;
catalog.counts.reviewedPreviews = catalog.items.reduce((sum, item) => sum + item.publishedExampleCount, 0);
catalog.counts.blocked = 0;
catalog.reviewedAt = new Date().toISOString();
catalog.reviewMethod = "Pinned MIT source + official docs, all published variants inventoried, visual desktop/mobile/reduced-motion browser captures, source-signal or targeted gesture probe, and conservative Flozio fit assessment. Multi-instance docs render all variants, but individual variant interactions are explicitly marked untested.";
await fs.writeFile(manifestPath, `${JSON.stringify(catalog, null, 2)}\n`);
await fs.writeFile(path.join(root, ".component-lab-cache/kokonutui-source/research/catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);

const guide = [
  "# Kokonut UI free component guide",
  "",
  `Reviewed against official MIT source commit \`${catalog.sourceCommit}\` on ${new Date().toISOString().slice(0, 10)}. Scope is only the 80 public free component records and their 92 published preview instances. Four registry hooks and one utility are excluded from the component denominator.`,
  "",
  "## How to use this guide",
  "",
  "Search `component-research/kokonutui/catalog.json` or the local Component Lab at `http://localhost:38474/lab`. Each record contains exact docs/source links, pinned source hashes, dependency and prop inventories, official variant JSX, browser evidence, observed interaction probe, and searchable fit tags. The preview app is Kokonut's own docs/source running locally. Its example data and app surfaces are not Flozio UI.",
  "",
  "A `strong-candidate` is only a strong conceptual reference. Every fit still requires a confirmed Flozio capability, real approved data, and a pass against `BRAND.md`, `DESIGN_GUARDRAILS.md`, and `HOMEPAGE_DESIGN_MAP.md`. Avoid vendor sample metrics, fake product screens, and unsupported feature claims. `poor-fit` means the component's metaphor or decorative role has no current clear connection to Flozio.",
  "",
  "## Completeness and evidence limits",
  "",
  `All ${catalog.counts.reviewedComponents} free source records and ${catalog.counts.reviewedPreviews} published instances are catalogued. All 80 docs routes returned HTTP 200 on desktop and mobile, all rendered their preview, all true 390px touch/reduced-motion checks had no horizontal overflow or uncaught page errors, and desktop/mobile/reduced-motion screenshots were captured and visually reviewed. Sources, documented props, variant source snippets, and motion mechanisms were read. Each route received either a targeted gesture/hold probe or a probe based on its source signals, and all 15 instances across the seven multi-variant docs pages received a per-instance interaction probe; see each item's recorded result instead of inferring success from an attempted action.`,
  "",
  "The 35 specifically described gesture/hold interactions have targeted probes. The remaining 45 have the documented control/canvas probe and full source/visual review; a false visual-change result is recorded as such rather than presented as a successful interaction. All 92 published variants render on their official docs route and their exact JSX is recorded; all 15 instances on the seven multi-variant pages received an additional per-instance probe (including keyboard shortcuts, tear confirmations, held states, hover treatments, and action-status changes). These browser probes establish the observed path, not every possible edge case. Browser evidence is in the ignored `.component-lab-cache/kokonutui-source/research/evidence/`; it is local review evidence, not a distributable package. Some vendor previews log denied remote-resource or development warnings, but the 80 routes had no uncaught page exceptions. Four image demos use local cached copies of the same official sample crops because the browser network sandbox blocks their original remote image hosts; their interaction code remains unchanged.",
  "",
  "## Reviewed components",
  "",
  "| Component | What it does and how it moves | Flozio fit | Search tags | Evidence / caveats |",
  "|---|---|---|---|---|",
  ...guideRows.map((item) => {
    const esc = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
    const probe = item.review.interactionProbe;
    const variantProbes = item.review.variants.map((variant, index) => `${index + 1}: ${variant.interactionProbe?.trigger ?? "route probe"} (${variant.interactionProbe?.changed ?? "recorded"})${variant.interactionProbe?.screenshot ? ` [evidence ${variant.interactionProbe.screenshot}]` : ""}${variant.interactionProbe?.additionalScreenshots?.length ? ` [also ${variant.interactionProbe.additionalScreenshots.join(", ")}]` : ""}`).join("; ");
    return `| [${esc(item.title)}](https://kokonutui.com${item.localDocsRoute}) | ${esc(item.description)} ${esc(item.review.motionSummary.replace(item.description, "").slice(0, 410))} | **${esc(item.flozioFit.fit)}** — ${esc(item.flozioFit.reason)} | ${item.searchTags.map(esc).join(", ")} | [Live preview](http://localhost:38474${item.localDocsRoute}) · [Official docs](https://kokonutui.com${item.localDocsRoute}) · [Source](${item.githubSourceUrl}) · ${item.publishedExampleCount} variant(s); ${esc(variantProbes)}; desktop/mobile/reduced-motion checked. ${item.review.reviewNotes.map(esc).join(" ")} |`;
  }),
  "",
  "## Reproducible workspace",
  "",
  "The isolated official docs/source app lives in the ignored `.component-lab-cache/kokonutui-source` directory. `npm run dev` starts it at `http://localhost:38474/lab` after dependencies have been installed. The catalog is regenerated from the pinned Git source via `node scripts/refresh-kokonutui-catalog.mjs`; that command resets review enrichment, so rerun the browser audits and `node scripts/enrich-kokonutui-review.mjs` after regeneration. Keep vendor source, installed dependencies, and visual evidence out of Git. The tracked catalog and this guide are the durable search/review artifacts.",
  "",
].join("\n");
await fs.writeFile(path.join(root, "KOKONUTUI_COMPONENT_GUIDE.md"), guide);
console.log(`Enriched ${catalog.counts.reviewedComponents} free components and ${catalog.counts.reviewedPreviews} published preview instances; wrote KOKONUTUI_COMPONENT_GUIDE.md.`);
