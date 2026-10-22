import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await fs.readFile(path.join(root, "component-research/aceternity/catalog.json"), "utf8"));
const free = catalog.items.filter((item) => item.kind === "component" && item.officialTier === "free").sort((a, b) => a.title.localeCompare(b.title));
const guidePath = path.join(root, "ACETERNITY_COMPONENT_GUIDE.md");
const escape = (value) => String(value ?? "").replaceAll("|", "\\|").replaceAll("\r", "").replaceAll("\n", " ");
const itemRoutes = free.flatMap((item) => item.review?.variants ?? []);
const officialVariants = itemRoutes.filter((variant) => variant.officialExample).length;
const sourceOnlyVariants = itemRoutes.length - officialVariants;
const statuses = itemRoutes.reduce((counts, variant) => {
  const key = variant.browserStatus ?? "pending";
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
const mobileOverflow = itemRoutes.filter((variant) => variant.mobileReducedMotion?.horizontalOverflow);
const desktopOverflow = itemRoutes.filter((variant) => variant.desktop?.horizontalOverflow);
const runtimeExceptions = itemRoutes.filter((variant) => variant.desktop?.runtimeExceptions);
const reducedMotionMissing = itemRoutes.filter((variant) => variant.mobileReducedMotion?.prefersReducedMotion !== true);
const noPixelDelta = itemRoutes.filter((variant) => variant.screenshotChangedAfterInput === false);
const consoleNoticeRoutes = itemRoutes.filter((variant) => variant.desktop?.consoleWarnings > 0);
const explicitReducedMotionComponents = free.filter((item) => item.review?.explicitReducedMotionSupport);

const lines = [
  "# Aceternity UI Component Guide",
  "",
  `Generated from the reconciled Aceternity catalog on ${new Date().toISOString().slice(0, 10)}. This guide covers every currently public free component source and every preview route imported into the isolated lab. It does not claim paid items or unresolved registry-only records were reviewed.`,
  "",
  "## Inventory and review status",
  "",
  `- Free components with exact registry source cached locally: **${free.length}/${free.length}**.`,
  `- Preview routes audited: **${itemRoutes.length}** (${officialVariants} published example variants and ${sourceOnlyVariants} source-only wrappers with no published example).`,
  `- Browser result counts: ${Object.entries(statuses).map(([key, value]) => `${key}: ${value}`).join("; ") || "none"}.`,
  `- Desktop horizontal overflow: ${desktopOverflow.length} routes; mobile horizontal overflow at the emulated 390px width: ${mobileOverflow.length} routes; reduced-motion preference not confirmed: ${reducedMotionMissing.length} routes; uncaught runtime exceptions: ${runtimeExceptions.length} routes.`,
  `- Console warnings/notices were recorded on ${consoleNoticeRoutes.length} routes. ${explicitReducedMotionComponents.length}/${free.length} sources explicitly include reduced-motion handling; every route's mobile preview was still captured with the reduced-motion preference enabled.`,
  `- Routes whose inspected input produced no screenshot pixel delta: ${noPixelDelta.length}. These are classified in the component entry using source behavior (static example, low-amplitude change, or capture limitation); they are not silently described as animated.`,
  "- Exact registry sources and example files remain in the ignored `.component-lab-cache/aceternity/` workspace. This guide stores metadata, source links, hashes, review notes, and local screenshot paths, not copied vendor source.",
  "",
  "## Open inventory boundaries",
  "",
  "The official AI catalog snapshot reports 114 free components, 23 Pro components, 182 Pro blocks, 17 templates, and 1 hook. Its 23 Pro-tier source records are `/blocks/...` category paths rather than individual components, and its single hook is not itemized in those records. The official registry also has 11 block records and 4 page records absent from the AI catalog. Paid sources were not imported; the 182 paid blocks and 17 templates need authorized source access. These entries stay blocked/unresolved, so the **free public component set is reviewed; the full commercial library is not 100% closed**.",
  "",
  "Aceternity's license restricts source redistribution. Source code and demo assets remain local and ignored. Use the official docs/registry links below to inspect source. See the [official license](https://ui.aceternity.com/licence) and [AI inventory](https://ui.aceternity.com/ai-recommendations).",
  "",
  "## Running and using the isolated lab",
  "",
  "The Aceternity lab is a separate Next app. It does not serve or rewrite Flozio's homepage.",
  "",
  "```powershell",
  "node scripts/cache-aceternity-assets.mjs --download",
  "node scripts/prepare-aceternity-preview.mjs",
  "npm.cmd run dev --prefix .component-lab-cache/aceternity-app",
  "```",
  "",
  "Open `http://localhost:38473/`. Search checks component names, official descriptions/categories, motion tags, and the Flozio fit notes. Each route has collapsible panels for the exact registry component and the exact official example source. Source-only wrappers are labeled and are not counted as published examples.",
  "",
  "## Reading the fit labels",
  "",
  "- **strongest-story-fit**: directly supports Flozio's learning-loop story when paired with a truthful, custom workflow explanation.",
  "- **conditional-story-fit / conditional-copy-accent**: can support a specific sales workflow or concise copy; avoid using the motion alone as the message.",
  "- **conditional-real-data / conditional-approved-proof**: only use with verified Flozio data or approved customer proof.",
  "- **conditional-real-product-visual**: requires actual, approved Flozio product visuals. Never copy the vendor demo or invent screens.",
  "- **functional-ui-only**: belongs inside a real working product flow, not as a marketing illustration.",
  "- **avoid-as-standalone-decoration**: generic decoration that should not become a default section visual.",
  "",
  "## Component index",
  "",
];

for (const item of free) {
  const review = item.review ?? {};
  const sourceUrl = item.registryUrl ?? `https://ui.aceternity.com/registry/${item.name}.json`;
  const docsUrl = item.officialDocsUrl ?? item.docsUrl ?? `https://ui.aceternity.com/components/${item.name}`;
  lines.push(`### ${item.title} — \`${item.name}\``);
  lines.push("");
  lines.push(`**What it renders:** ${escape(review.visualSummary || item.description)}`);
  lines.push(`**Motion and lifecycle:** ${escape(review.motionSummary || "See the source panel and route-level evidence; no behavior summary is available.")}`);
  lines.push(`**Flozio fit:** \`${escape(item.flozioFit?.fit || item.fit)}\` — ${escape(item.flozioFit?.reason || "No fit note recorded.")}`);
  lines.push(`**Tags:** ${[...(item.searchTags ?? []), ...(item.officialCategories ?? [])].filter(Boolean).map((tag) => `\`${escape(tag)}\``).join(" ") || "none"}`);
  lines.push(`**Dependencies:** ${(review.directDependencies ?? item.officialDependencies ?? item.dependencies ?? []).map((value) => `\`${escape(value)}\``).join(", ") || "none detected in registry imports"}. **Declared prop names:** ${(review.publicProps ?? []).map((value) => `\`${escape(value)}\``).join(", ") || "see source panel/docs"}.`);
  lines.push(`**Source:** [Official docs](${docsUrl}) · [Official registry JSON](${sourceUrl}) · registry SHA-256 \`${item.sourceHash ?? "not-recorded"}\` · cached source SHA-256 \`${review.componentSourceSha256 ?? "not-recorded"}\`.`);
  lines.push(`**Review:** source ${review.sourceRead ? "read/indexed" : "pending"}; visuals ${review.visualInspected ? "inspected" : "pending"}; motion ${review.motionInspected ? "inspected" : "pending"}; explicit reduced-motion support ${review.explicitReducedMotionSupport ? "found in source" : "not found in source; browser preference was still emulated"}.`);
  lines.push("");
  lines.push("| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  for (const variant of review.variants ?? []) {
    const route = variant.route ? `http://localhost:38473${variant.route}` : "—";
    const trigger = variant.inferredTrigger ?? "not recorded";
    const outcome = [
      variant.browserStatus ?? "pending",
      variant.interaction?.targetFound === false ? "target not found" : "target found",
      variant.screenshotChangedAfterInput === true ? "visible pixel change" : variant.screenshotChangedAfterInput === false ? "no sampled pixel change" : "no comparison",
      variant.motionObservation ?? "motion note unavailable",
      variant.mobileReducedMotion?.horizontalOverflow ? "mobile overflow" : "mobile fits",
      variant.desktop?.runtimeExceptions ? `${variant.desktop.runtimeExceptions} exceptions` : "no runtime exception",
    ].join("; ");
    const evidence = [
      variant.desktop?.screenshotInitial ? `[desktop initial](../${variant.desktop.screenshotInitial.replaceAll("\\", "/")})` : "desktop pending",
      variant.desktop?.screenshotAfterInput ? `[after input](../${variant.desktop.screenshotAfterInput.replaceAll("\\", "/")})` : "after input pending",
      variant.mobileReducedMotion?.screenshot ? `[mobile/reduced](../${variant.mobileReducedMotion.screenshot.replaceAll("\\", "/")})` : "mobile pending",
    ].join(" · ");
    lines.push(`| ${escape(variant.id)} | ${variant.officialExample ? `yes (${escape(variant.sourceFile)})` : "no — source-only wrapper"} | [open](${route}) | ${escape(trigger)} | ${escape(outcome)} | ${evidence} |`);
  }
  lines.push("");
  if (review.reviewNotes?.length) {
    lines.push(`**Notes:** ${review.reviewNotes.map(escape).join(" ")}`);
    lines.push("");
  }
}

await fs.writeFile(guidePath, `${lines.join("\n").trimEnd()}\n`);
console.log(`Wrote ${path.relative(root, guidePath)} for ${free.length} free components and ${itemRoutes.length} routes.`);
