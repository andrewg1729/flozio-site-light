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

The goal is to inspect the original components, their motion, and source code in a local browser lab, then tag each entry by what it is useful for. Catalog complete, inspectable public components and examples from each source; record paid, unavailable, stale, or source-only items instead of presenting them as runnable previews.

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

1. [ ] Aceternity UI — https://ui.aceternity.com/components
   - Official AI catalog currently lists 114 free components, 23 Pro components, 17 templates, and 182 Pro blocks; inventory and preview the free components first, and mark Pro-only entries clearly.
   - The official CLI exposes component registry JSON, so use the registry source plus each docs example rather than treating a docs-page iframe as a completed local preview.
2. [ ] Kokonut UI — source URL and current catalog to verify
3. [ ] ReactBits — source URL and current catalog to verify
4. [ ] Ruixen UI — source URL and current catalog to verify
5. [ ] Efferd — https://efferd.com/
6. [ ] UI Layouts — https://www.ui-layouts.com/
7. [ ] Fancy Components — https://www.fancycomponents.dev/ (listed twice in the request; track once)
8. [ ] shadcnblocks — https://www.shadcnblocks.com/
9. [ ] ReUI — https://reui.io/components
10. [ ] OriginUI NG — https://www.originui-ng.com/
11. [ ] COSS UI — https://coss.com/ui
12. [ ] Hexta UI — https://hextaui.com/

### Inspection and tagging notes

- Use each library's functioning local docs/demo surface and source code to inspect interactions; don't produce a screenshot for every catalog item. Use a small number of targeted browser checks to confirm the local preview flow works, then inspect individual entries through the same lab.
- For each component, capture its name, source link, props/dependencies where published, what the motion does, how to trigger it, and the visual/use-case tags. Mark source-only or inaccessible previews clearly.
- Potential-use tags are research hints, not approval to place a component on the marketing homepage. Homepage use still needs to match `BRAND.md`, `DESIGN_GUARDRAILS.md`, and `HOMEPAGE_DESIGN_MAP.md`.
