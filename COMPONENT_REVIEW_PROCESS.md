# Component library review process

This is the operating procedure for the Flozio visual component lab. `TODO.md` is the queue. Per-library manifests are the evidence record. `VISUAL_COMPONENT_RESEARCH.md` is comparative design research, not the authoritative completion tracker.

## What “complete” means

A component is not complete because its catalog tile or documentation page was opened. Mark it **reviewed** only when its actual implementation and runnable preview have both been checked, its motion and interaction are described from evidence, and its likely Flozio uses and limitations are recorded.

**Do not stop the library review after inventory, setup, a sample component, or a batch. Continue through every entry and every published example variant until the completion criteria below are met. Do not ask whether to continue, move to the next library, or call the library complete while any reviewable entries remain. A turn ending or a batch finishing is only a checkpoint: record the exact cursor and resume with the next unreviewed item.**

Keep working around ordinary implementation friction: find alternate official source routes, resolve dependencies, repair the preview harness, and retry failed builds or interactions. If an item is genuinely blocked by missing paid access, removed source, or an external service the workspace cannot reach, exhaust reasonable alternatives, record the evidence and exact blocker on that item, and continue reviewing the remaining items. A blocked item is not understood or complete; the library stays `In progress` until the blocker is resolved and the review is finished. Never silently drop an item or lower the completion standard to meet a time limit.

Track each item through these statuses:

1. `discovered` — found in the library's current official inventory.
2. `source-located` — official implementation or documentation source identified and version recorded.
3. `license-checked` — free/paid status and redistribution terms recorded for this item.
4. `imported` — exact library component loaded into the isolated local lab, or a specific blocker recorded.
5. `preview-verified` — preview renders and its initial visual was inspected.
6. `motion-verified` — the documented trigger was exercised (hover, click, drag, scroll, timer, or other input); motion lifecycle and reduced-motion/mobile behavior were checked where applicable.
7. `tagged` — description, motion, dependencies, tradeoffs, and Flozio use tags have been recorded.

Only items that pass all applicable stages may be marked `reviewed`. Mark `blocked`, `paid`, `unavailable`, `source-only`, `legacy`, or `rejected` explicitly, with evidence and a reason. Those dispositions make the inventory honest; they do **not** mean the item's animation was understood. Do not mark the library complete while any item lacks a completed review or an explicitly reported unresolved blocker.

### Required per-item completion record

For every component and every published example/variant, record all of the following before marking it reviewed:

- Read the actual implementation and its official example; record the source version/hash, imports, dependencies, configurable props, and any external assets.
- Import and compile the real component in the library's isolated local app. Open its live preview and inspect the visible result at desktop and mobile widths.
- Exercise the actual trigger (for example scroll, hover, click, drag, or timer) in the preview. Describe what moves or changes, what starts it, its timing/direction/repetition/settling behavior, and whether it loops or stops.
- Check reduced-motion behavior and relevant keyboard/touch behavior. Record what was observed separately from what was inferred from source. If the effect cannot be observed, do not call motion verified.
- Write a concise plain-language description and searchable tags for visual form, motion, interaction, content/assets required, constraints, and suitable Flozio jobs/sections. Include a specific fit judgment and why.
- Save the preview/build result and evidence reference in the manifest. Failures need their exact error and a retry/blocker note; they cannot be counted as reviewed.

If a library publishes variants, audit each variant separately; a component-level summary does not substitute for variant review. Reconcile final reviewed, variant-reviewed, and blocked counts against the complete official inventory before advancing the queue.

## Library-by-library workflow

### 1. Establish the official inventory

- Prefer the library's machine-readable registry/API/CLI. Save the source URL, retrieval date, version or commit, and a checksum of the inventory.
- Reconcile that inventory against the public component index. Count components, blocks, templates, pages, paid items, and duplicate/legacy entries separately.
- Never repeat an old marketing count as the audited count. Record the exact inventory snapshot and any mismatch.
- Keep a manifest row for every catalog item, including excluded and unavailable items, so the coverage denominator is visible.

### 2. Check source and license before importing

- Record the official docs URL, source URL, dependencies, props, and license/free/paid boundary for each item.
- Check the license at the component level when the library does not apply one clear license to the whole catalog.
- Do not commit or publish source that cannot be redistributed. Store restricted source and installed dependencies only in an ignored local workspace, and retain official links plus source hashes in the tracked manifest.
- Treat third-party assets, demo copy, testimonial names, customer marks, and sample metrics as untrusted demo material. Do not reuse them as Flozio facts.

### 3. Import previews into an isolated local library workspace

- Use one isolated app/workspace per library, with that library's real component source and dependencies. Do not add research dependencies to Flozio's homepage package or change the `/` rewrite.
- Generate one selectable, lazy-mounted preview per catalog item, using the official example where available. Keep the live preview, source view, props/dependencies, license, evidence, and tags together in the lab.
- The central Component Lab may use an iframe **only as a boundary around our own local imported preview app** to isolate incompatible CSS and dependencies. An iframe of the vendor's documentation page by itself is not a completed import or audit.
- Keep proprietary workspaces in gitignored paths. The lab shell and manifests may be committed when they contain no restricted implementation or assets.
- Render one selected component at a time. Do not mount hundreds of animated components simultaneously.

### 4. Review the whole library in batches

- Build and render every manifest item in batches. Save per-item compile/runtime outcomes; a failed item stays visible with its reason.
- Use browser automation to visit each local preview, capture a consistent initial/active/settled state, and exercise the interaction inferred from source. Produce a compact contact sheet or short motion reel per batch rather than manually taking repeated screenshots of the whole library.
- A visual contact sheet is for scanning appearance; it does not prove motion behavior. Pair it with source inspection and automated interaction/frame sampling, and inspect the actual preview for any ambiguous or failed signal.
- Record what was visibly observed separately from what was inferred from source. A preview that renders is not automatically motion-verified.
- Inspect responsive layout and reduced-motion behavior for components with motion. Record unsupported accessibility or browser behavior rather than assuming it works.
- Batches are only a way to organize the work, not a stopping point. After each batch, persist completed rows and the next exact item/variant to review; continue until the whole inventory is reconciled.

### 5. Write a useful searchable record

Every manifest item should include:

- Stable library ID and item ID; official title/category; exact docs and source links; source version and hash.
- Item kind and availability: component/effect/block/template/page; free/paid; license and redistribution note.
- Concise description of what appears, motion mechanism, trigger, lifecycle, interaction inputs, and motion-reduction behavior.
- Dependencies and notable props; local preview route and source-view route; browser/build result and limitations.
- Search tags for visual form, motion/interaction, content requirements, and likely Flozio section/job. Include `requires-approved-imagery`, `requires-real-metrics`, or `resembles-product-ui` when relevant.
- A fit judgment: `candidate`, `conditional`, or `reject`, with a specific Flozio use or reason it does not fit. Tags are discovery aids, not permission to publish.

## Flozio-specific review rules

- No guessed Flozio interface, product screenshots, dashboards, fake deal records, invented customer proof, or fabricated metrics.
- Prefer a component when its form or behavior explains a known sales workflow. Do not approve a component solely because it is animated or visually impressive.
- Check fit against `BRAND.md`, `DESIGN_GUARDRAILS.md`, and `HOMEPAGE_DESIGN_MAP.md` before recommending it for the public site.
- The homepage is not a component playground. Do not change homepage sections, global styles, routes, or dependencies while cataloging libraries.

## Current implementation boundary

Magic UI has an existing pinned source/docs workspace and a detailed source/runtime audit. Its preview currently uses the vendor docs app locally. That is useful evidence but is not the target architecture for new libraries. Aceternity's full free catalog is imported into the separate ignored Next app at `.component-lab-cache/aceternity-app`: 114 component sources and all 199 published-example/source-only routes, with local source panels and per-route browser evidence. Regenerate it with `node scripts/prepare-aceternity-preview.mjs`, then run `npm.cmd run dev --prefix .component-lab-cache/aceternity-app` and open `http://localhost:38473/`. Use `ACETERNITY_COMPONENT_GUIDE.md` for the reviewed free set. The remaining paid and unresolved official inventory is tracked in `TODO.md`; do not advance to Kokonut until those blockers are settled. Keep Magic UI's pinned guide as its historical audit record; do not silently revise its counts when the vendor changes its catalog.

## Handoff rule for future chats

When continuing active library work, read this file and `TODO.md`, inspect the manifest's exact cursor, and resume at the next unreviewed item without restarting completed work or asking the user whether to continue. Send brief progress updates as useful, but keep working until the current library meets the completion criteria. Only after it is complete, report a standout item with its observed appearance, trigger/motion, and plausible Flozio use, then begin the next queued library. Never advance the queue while the current library has unfinished or unresolved items. Do not describe a library as done until every inventory entry and published variant is accounted for and every applicable review has evidence.
