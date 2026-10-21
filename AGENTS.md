# Flozio site instructions

## Homepage source of truth

- The visible `/` homepage is `public/clickup-reference.html`, served by the `beforeFiles` rewrite in `next.config.mjs`.
- Make visible homepage edits in that snapshot and its referenced assets under `public/assets/clickup-reference/`.
- `app/page.tsx` is only a fallback redirect. The older React components under `app/sections/` are not the rendered homepage; do not use them as the source for homepage edits.
- A React migration requires a separate parity review before changing the root rewrite.

For website, copy, or visual work, read `BRAND.md`, `DESIGN_GUARDRAILS.md`, and `HOMEPAGE_DESIGN_MAP.md` before editing.

- Treat the current homepage as the visual source of truth. Extend its actual layout, typography, spacing, color roles, and product-preview language; do not start from a generic SaaS template.
- Work one page or section at a time and honor the user's stated scope. Copy-only requests change copy only. Preserve unrelated sections and the homepage baseline.
- Before a visual edit, identify the closest homepage precedent and the exact styles or patterns to reuse. If no close precedent exists, explain the narrow gap and create only what that section needs.
- Keep Flozio's copy, product workflows, examples, and identity original. Do not reuse ClickUp's brand, claims, customer proof, or terminology as facts about Flozio.
- Do not invent shipped features, customer proof, statistics, guarantees, or interface details. Treat planned capabilities as vision and label illustrative UI as an example.
- Prefer specific, product-led visuals and code-native UI where useful. Do not add generic AI decoration, fake metrics, redundant card grids, or motion without purpose.
- For visual implementation, render and inspect the changed page at desktop and mobile sizes. Report what was actually inspected; do not claim visual verification from source review alone.
- Do not change global styles, route behavior, dependencies, or other page content to solve a section-level request unless the user asks for it.

## Component library research

- For component-library cataloging or preview work, read `COMPONENT_REVIEW_PROCESS.md` and `TODO.md` first.
- `TODO.md` is the library queue; the process guide defines what counts as a complete review. Do not treat the docs-page iframe or a catalog scan as completion.
- Keep each library's imported source and dependencies in an isolated local workspace. Check redistribution terms before committing source; retain source links and hashes when source cannot be committed.
- Do not stop at an inventory, a sample preview, or a completed batch. Continue the active library item by item and variant by variant until each has a source/license review, imported live preview, observed motion/interaction, description, and searchable Flozio-fit tags. Do not ask whether to continue or move to another library while work remains.
- When a genuine external blocker prevents a review, record evidence and the precise blocker, try reasonable alternatives, and continue all unblocked items. A blocked entry is not understood; keep the library in progress and do not claim 100% completion until the blocker is resolved and reviewed.
- Before moving to a new library, report one fully reviewed standout component with observed behavior and likely Flozio use. The manifest must prove complete coverage first.
