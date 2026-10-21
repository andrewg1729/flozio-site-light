# Aceternity UI review status

**State:** registry inventory and source extraction complete; native preview generator is in place for the first component; the full library preview and motion audit remain in progress.

## Inventory snapshot

- Source: [official registry index](https://ui.aceternity.com/registry/index.json)
- Catalog page: [Aceternity UI components](https://ui.aceternity.com/components)
- Terms: [Aceternity license](https://ui.aceternity.com/licence)
- The current registry index snapshot contains 114 `registry:ui` items, 182 block items, and 4 page items. The tracked metadata and inventory hash are in `catalog.json`.
- The official components page describes the UI components as free React/Next components. Blocks and pages have separate availability; do not assume all registry items are free.
- The 114 UI registry payloads were fetched successfully (114/114) and cached under `.component-lab-cache/aceternity/registry/`. That directory is gitignored because the site license prohibits redistribution of source. The tracked catalog contains only identifiers, URLs, metadata, and source hashes.
- The license page permits using a licensed item in end products and bars redistribution of the item or its source files. Keep downloaded source local, and separately establish access terms for each block/page before importing it. [Official license](https://ui.aceternity.com/licence)

## First candidate preview

[Tracing Beam](https://ui.aceternity.com/components/tracing-beam) is the first candidate. Source inspection shows a gradient segment following an SVG path as the reader scrolls, with spring smoothing tied to scroll progress. It could pace an editorial explanation of how outcomes inform later prospect and deal guidance. The source's blue-to-purple gradient would need a separate brand-fit review. Use `npm run prepare:aceternity-preview -- tracing-beam` to generate a local page that imports the official component source, renders a scrollable example, and exposes that source for inspection. Its actual rendering and motion have not yet been visually audited.

## Not done yet

- The starter native preview generator is implemented; it writes source only into the ignored Aceternity workspace. Tracing Beam compiled and served from that isolated app, but still needs an actual browser visual and scroll-motion review.
- None of the 114 components has a completed local preview/motion record in this library's audit.
- The 182 blocks and 4 pages are inventory-only; their free/pro status and suitability remain unchecked.
