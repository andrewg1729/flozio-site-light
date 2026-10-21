# Flozio website TODO

## Replace the ClickUp hero product demo with one Flozio workflow

**Status:** Not started

Recreate the interactive product preview below the hero CTA using Flozio's own interface and a real Flozio workflow. Keep the current page's visual style and layout as the reference. Start with one demo; add more only after that first one is approved.

### Instructions

1. Confirm with Flozio which workflow to show and the exact actions it supports. Get the real screen or a step-by-step description before designing the demo. Do not invent features, customer data, or results.
2. Storyboard one short sequence: starting state, cursor clicks or drag, visible interface changes, and finished state. Keep the sequence faithful to how Flozio actually works.
3. Build the preview as a maintainable, code-based component with its interface and cursor animation in sync. Avoid a GIF as the primary implementation so the states can be edited and adapted to smaller screens.
4. Preserve the existing design language: light surface, compact controls, restrained borders and shadows, and clear type. Change only the hero product-demo area and its selector labels.
5. Make the selector keyboard-accessible and provide a static state when reduced motion is enabled.
6. Verify the result in the running site at desktop and mobile sizes, and confirm the only visual changes are within this demo.

### Source-of-truth note

`next.config.mjs` currently rewrites `/` to `public/clickup-reference.html`. The React homepage in `app/page.tsx` is not currently served at `/`. Before implementing the demo, choose the actual route/component that will own it; avoid building the interaction into the cloned static HTML if it can live in a maintainable Flozio component instead.

## Build a usable component research lab across UI libraries

**Status:** In progress

The goal is to inspect the original components, their motion, and source code in a local browser lab, then tag each entry by what it is useful for. Catalog complete, inspectable public components and examples from each source; record paid, unavailable, stale, or source-only items instead of presenting them as runnable previews. Follow [`COMPONENT_REVIEW_PROCESS.md`](COMPONENT_REVIEW_PROCESS.md) as the single review procedure. The old docs-page iframe is evidence only; new library previews must import the actual source into a library-isolated local workspace.

### Current lab

- [x] Run Magic UI's official docs app locally and inventory its docs, registry entries, examples, and source links.
- [x] Focus the selected component's docs frame on its examples section so the live demo is in view; Cool Mode is the initial selection.
- [x] Add a searchable behavior summary, trigger/motion note, and use tags to every Magic UI catalog entry; generate the queryable [`MAGIC_UI_COMPONENT_GUIDE.md`](MAGIC_UI_COMPONENT_GUIDE.md).
- [x] Record the Cool Mode interaction and initial potential-use tags in the catalog.
- [x] Record source review status, docs preview status, and unresolved registry entries without implying they are installable or individually motion-verified.
- [x] Run a browser audit across all 77 distinct Magic UI component docs routes with a live preview; record preview availability, running Web Animations, frame changes, and mapped hover/click/press-and-hold/drag input in the catalog.
- [x] Add a per-component motion profile for all 85 catalog records: mechanism, trigger, lifecycle, fit tags, and evidence status. Checked all 78 available current component sources and classified five entries from official v3 docs. Magic UI maintainers say Arc Timeline never entered production; Grid Beams remains a stale registry name with no official source or docs and is flagged unsupported/unverified.
- [x] Show each selected component's motion model and evidence basis in the lab; point five legacy entries to their official v3 demo/code pages instead of broken current source URLs.
- [x] Correct motion descriptions that source review disproved, including Ripple vs. Ripple Button, Shiny Button, Animated List, Icon Cloud, Bento Grid, and Dotted Map.
- [x] Resolve the Dotted Map behavior from its source and inspect each of its three individual demo previews; the base map is static while configured point markers pulse.
- [x] Map all 170 example source files to their exact docs preview IDs and anchors. Add source hashes, component imports, configured props, event signals, inherited use tags, and motion notes to the searchable catalog.
- [x] Run the browser audit against all 170 mapped previews individually. Inspect computed animation styles, SVG attributes, and canvas fingerprints; sample before/activation/follow-up frames; and apply source-matched pointer sweep, hover, click, press-and-hold, drag, or scroll input. All 170 rendered; Globe was verified with software WebGL, and its canvas fingerprint and frame changed during initialization and drag sampling.
- [x] Check the Grid Beams catalog record against the pinned official registry, docs, source tree, and public search. Its registry URL returns 404 and no official component page/source is available; retain it as an unsupported, unverified historical name rather than infer behavior from third-party lookalikes.
- [x] Make the local Magic UI preview work without network access: replace Google Font downloads with system fallbacks and give its Next app an isolated build directory. The isolated docs app served the full audit; an already-running `npm run dev` process must be restarted to load this startup fix.

### Library sequence

Process these one library at a time in the order below. Before starting each new library, send a brief preview of one standout component and explain its motion/interaction and likely use. Keep the lab backed by each library's real preview and source where available; don't substitute screenshot grids or invented demos. After the local catalog is in place, tag every component by its visual behavior and plausible Flozio use. Check current availability and license/paid boundaries as part of each library's inventory.

1. [~] Aceternity UI — https://ui.aceternity.com/components
   - First library in progress. Snapshot from the official registry index currently records 114 UI components, 182 blocks, and 4 pages (inventory SHA-256 and retrieval date are in `component-research/aceternity/catalog.json`). This is a registry inventory, not an audited/approved count; free/pro and docs availability still need item-level reconciliation.
   - Use the library-isolated native preview described in `COMPONENT_REVIEW_PROCESS.md`. Aceternity's license restricts redistribution of source; imported source must remain in the ignored local workspace, with only links and hashes in tracked files.
   - [x] Add an official-registry refresh script and metadata-only manifest.
   - [x] Cache all 114 `registry:ui` source records locally; 114/114 succeeded. Source JSON stays under the gitignored `.component-lab-cache/aceternity/registry/` and must never be committed.
   - [x] Add a generator for a separate, ignored Next preview app and import Tracing Beam's exact source; the generated route compiled and returned the preview plus source panel.
   - [ ] **Continue until every one of the 114 components and every published example variant is fully reviewed. Do not stop after a batch, sample, or turn, and do not start Kokonut until this library is complete.** Read each source; check license/access, dependencies and props; import and compile the real preview; visually inspect desktop/mobile; trigger and describe motion/interaction; inspect reduced motion; write the plain-language description, evidence, fit judgment, and searchable tags. Persist the exact next item/variant after each batch and resume there.
   - [ ] Resolve each failed, missing, paid, or unavailable item through reasonable alternatives; record evidence and the exact blocker, then continue with all other items. Do not mark the library complete while any review or blocker is unresolved. The Tracing Beam route currently only has source inspection and compile/HTTP evidence; visual and scroll-motion verification remain pending.
   - [ ] Reconcile every component docs route and check each item’s license/access, dependencies, and any missing/stale items. Inventory blocks/pages separately; do not import paid content without confirming access.
2. [ ] Kokonut UI — https://kokonutui.com/
3. [ ] ReactBits — https://reactbits.dev/
4. [ ] Ruixen UI — https://ruixen.com/
5. [ ] Efferd — https://efferd.com/
6. [ ] UI Layouts — https://www.ui-layouts.com/
7. [ ] Fancy Components — https://www.fancycomponents.dev/ (listed twice in the request; track once)
8. [ ] shadcnblocks — https://www.shadcnblocks.com/
9. [ ] ReUI — https://reui.io/components
10. [ ] OriginUI NG — https://www.originui-ng.com/
11. [ ] COSS UI — https://coss.com/ui
12. [ ] Hexta UI — https://hextaui.com/

### Inspection and tagging notes

- Follow [`COMPONENT_REVIEW_PROCESS.md`](COMPONENT_REVIEW_PROCESS.md). It defines completion, evidence fields, import isolation, batch browser review, licensing, and Flozio fit checks.
- Potential-use tags are research hints, not approval to place a component on the marketing homepage. Homepage use still needs to match `BRAND.md`, `DESIGN_GUARDRAILS.md`, and `HOMEPAGE_DESIGN_MAP.md`.
