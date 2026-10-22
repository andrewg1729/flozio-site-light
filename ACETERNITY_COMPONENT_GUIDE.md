# Aceternity UI Component Guide

Generated from the reconciled Aceternity catalog on 2026-10-22. This guide covers every currently public free component source and every preview route imported into the isolated lab. It does not claim paid items or unresolved registry-only records were reviewed.

## Inventory and review status

- Free components with exact registry source cached locally: **114/114**.
- Preview routes audited: **199** (194 published example variants and 5 source-only wrappers with no published example).
- Browser result counts: rendered: 199.
- Desktop horizontal overflow: 2 routes; mobile horizontal overflow at the emulated 390px width: 12 routes; reduced-motion preference not confirmed: 0 routes; uncaught runtime exceptions: 0 routes.
- Console warnings/notices were recorded on 22 routes. 5/114 sources explicitly include reduced-motion handling; every route's mobile preview was still captured with the reduced-motion preference enabled.
- Routes whose inspected input produced no screenshot pixel delta: 22. These are classified in the component entry using source behavior (static example, low-amplitude change, or capture limitation); they are not silently described as animated.
- Exact registry sources and example files remain in the ignored `.component-lab-cache/aceternity/` workspace. This guide stores metadata, source links, hashes, review notes, and local screenshot paths, not copied vendor source.

## Open inventory boundaries

The official AI catalog snapshot reports 114 free components, 23 Pro components, 182 Pro blocks, 17 templates, and 1 hook. Its 23 Pro-tier source records are `/blocks/...` category paths rather than individual components, and its single hook is not itemized in those records. The official registry also has 11 block records and 4 page records absent from the AI catalog. Paid sources were not imported; the 182 paid blocks and 17 templates need authorized source access. These entries stay blocked/unresolved, so the **free public component set is reviewed; the full commercial library is not 100% closed**.

Aceternity's license restricts source redistribution. Source code and demo assets remain local and ignored. Use the official docs/registry links below to inspect source. See the [official license](https://ui.aceternity.com/licence) and [AI inventory](https://ui.aceternity.com/ai-recommendations).

## Running and using the isolated lab

The Aceternity lab is a separate Next app. It does not serve or rewrite Flozio's homepage.

```powershell
node scripts/cache-aceternity-assets.mjs --download
node scripts/prepare-aceternity-preview.mjs
npm.cmd run dev --prefix .component-lab-cache/aceternity-app
```

Open `http://localhost:38473/`. Search checks component names, official descriptions/categories, motion tags, and the Flozio fit notes. Each route has collapsible panels for the exact registry component and the exact official example source. Source-only wrappers are labeled and are not counted as published examples.

## Reading the fit labels

- **strongest-story-fit**: directly supports Flozio's learning-loop story when paired with a truthful, custom workflow explanation.
- **conditional-story-fit / conditional-copy-accent**: can support a specific sales workflow or concise copy; avoid using the motion alone as the message.
- **conditional-real-data / conditional-approved-proof**: only use with verified Flozio data or approved customer proof.
- **conditional-real-product-visual**: requires actual, approved Flozio product visuals. Never copy the vendor demo or invent screens.
- **functional-ui-only**: belongs inside a real working product flow, not as a marketing illustration.
- **avoid-as-standalone-decoration**: generic decoration that should not become a default section visual.

## Component index

### 3D Animated Pin — `3d-pin`

**What it renders:** A gradient pin that animates on hover, perfect for product links.
**Motion and lifecycle:** Hovering the pin reveals a tilted perspective panel and bright underline; the panel fades in and its layered text planes shift in 3D, then fade out on leave.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `3d` `card` `external-dependencies` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover` `hover-triggered` `pin` `repeating-animation` `special` `three-dimensional` `card` `hover` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/3d-pin) · [Official registry JSON](https://ui.aceternity.com/registry/3d-pin.json) · registry SHA-256 `605cd71a7afe1014c84fdf53c7521ec5d44a8a2eb09ae8f08952e0106d48ebab` · cached source SHA-256 `3eab7bf90257ddf144e33021f759656aab51bf218ef7c1e486b0438763156dc7`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (3d-pin.tsx) | [open](http://localhost:38473/p/3d-pin/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-pin--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-pin--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-pin--1--mobile-reduced.png) |

### 3d Card — `3d-card`

**What it renders:** 3d-card component for React/Next.js
**Motion and lifecycle:** Pointer position tilts the card in perspective with spring smoothing; on leave it eases back to flat.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `3d` `card` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `pointer-tracking` `three-dimensional`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/3d-card-effect) · [Official registry JSON](https://ui.aceternity.com/registry/3d-card.json) · registry SHA-256 `c2916dc70428da48e40ece3907b25ab028a7351c8da4410e3bf3a40688b24082` · cached source SHA-256 `ec2f994a294aa81bb10d8a4a8512e1d9d90acdccf2fb1c8eadf83874c5be34e8`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (3d-card-1.tsx) | [open](http://localhost:38473/p/3d-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-card--1--mobile-reduced.png) |
| 2 | yes (3d-card-2.tsx) | [open](http://localhost:38473/p/3d-card/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-card--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-card--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-card--2--mobile-reduced.png) |

### 3D Globe — `3d-globe`

**What it renders:** A realistic globe component with tooltips and avatar tips
**Motion and lifecycle:** A textured WebGL globe rotates under drag; marker avatars and connecting arcs stay anchored to geographic coordinates.
**Flozio fit:** `conditional-real-data` — Can explain territory or outcome patterns only when backed by real Flozio data. Never invent map markers, comparisons, deal metrics, or customer results.
**Tags:** `3d` `background` `call to action` `canvas-rendering` `card` `click-or-toggle` `drag-triggered` `external-dependencies` `flozio:requires-real-data` `flozio:workflow-explainer` `globe` `hover-triggered` `special` `three-dimensional` `card` `3d` `background` `special` `call to action`
**Dependencies:** `@react-three/drei`, `@react-three/fiber`, `react`, `three`. **Declared prop names:** `radius`, `globeColor`, `textureUrl`, `bumpMapUrl`, `showAtmosphere`, `atmosphereColor`, `atmosphereIntensity`, `atmosphereBlur`, `bumpScale`, `autoRotateSpeed`, `enableZoom`, `enablePan`, `minDistance`, `maxDistance`, `initialRotation`, `markerSize`, `showWireframe`, `wireframeColor`, `ambientIntensity`, `pointLightIntensity`, `backgroundColor`, `markers`, `config`, `className`, `onMarkerClick`, `onMarkerHover`, `marker`, `defaultSize`, `onClick`, `onHover`, `color`, `intensity`, `blur`.
**Source:** [Official docs](https://ui.aceternity.com/components/3d-globe) · [Official registry JSON](https://ui.aceternity.com/registry/3d-globe.json) · registry SHA-256 `69205b06a502d0de7374cef0b719f34d91109fd70ef0093228bd2ce1fef78b97` · cached source SHA-256 `b017111cda6b02bc1c3996912150648b93d0d908da304698b0e2cac16e5b22e5`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (3d-globe-1.tsx) | [open](http://localhost:38473/p/3d-globe/1) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-globe--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-globe--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-globe--1--mobile-reduced.png) |
| 2 | yes (3d-globe-2.tsx) | [open](http://localhost:38473/p/3d-globe/2) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-globe--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-globe--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-globe--2--mobile-reduced.png) |
| 3 | yes (3d-globe-3.tsx) | [open](http://localhost:38473/p/3d-globe/3) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-globe--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-globe--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-globe--3--mobile-reduced.png) |
| 4 | yes (3d-globe-4.tsx) | [open](http://localhost:38473/p/3d-globe/4) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-globe--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-globe--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-globe--4--mobile-reduced.png) |

### 3D Marquee — `3d-marquee`

**What it renders:** A 3D Marquee effect with grid, good for showcasing testimonials and hero sections
**Motion and lifecycle:** Four columns of image cards sit on a tilted 3D plane; alternating columns move up and down on 10- and 15-second reversing loops, while a hovered image lifts 10 pixels.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `3d` `backgrounds` `flozio:requires-real-product-visual` `flozio:system-of-action` `hero` `hero section` `hover-triggered` `marquee` `repeating-animation` `testimonials` `three-dimensional` `hero section` `hero` `backgrounds` `testimonials`
**Dependencies:** `motion/react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/3d-marquee) · [Official registry JSON](https://ui.aceternity.com/registry/3d-marquee.json) · registry SHA-256 `050920d84b098fc0039761d4e7f2cd5db8030755d60c0c324fa89048dbf91062` · cached source SHA-256 `49265fb39272e876a3ff8ce5a1b4b8b5921ad5b266ad74bf270a74c6b8332886`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (3d-marquee-1.tsx) | [open](http://localhost:38473/p/3d-marquee/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-marquee--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-marquee--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-marquee--1--mobile-reduced.png) |
| 2 | yes (3d-marquee-2.tsx) | [open](http://localhost:38473/p/3d-marquee/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-marquee--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-marquee--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-marquee--2--mobile-reduced.png) |
| 3 | yes (3d-marquee-3.tsx) | [open](http://localhost:38473/p/3d-marquee/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/3d-marquee--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/3d-marquee--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/3d-marquee--3--mobile-reduced.png) |

### Animated Modal — `animated-modal`

**What it renders:** A customizable, compound modal component with animated transitions
**Motion and lifecycle:** Clicking the trigger opens a centered overlay; the dialog scales/fades in and closes from its button or backdrop.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `animated` `click-or-toggle` `click-triggered` `drag-or-gesture` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `modal` `special` `spring-settling` `svg-or-path` `three-dimensional` `utilities` `special` `utilities` `modal`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/animated-modal) · [Official registry JSON](https://ui.aceternity.com/registry/animated-modal.json) · registry SHA-256 `141e95b1c01a22c3678be302a2eac5091b3dd0b8ceeebd7a6dbd461861ebf92a` · cached source SHA-256 `9d4166aa1229b45725c62bbde513a7198639df9365253c9e7be604b00bf1ea20`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (animated-modal.tsx) | [open](http://localhost:38473/p/animated-modal/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/animated-modal--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/animated-modal--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/animated-modal--1--mobile-reduced.png) |

### Animated Tabs — `tabs`

**What it renders:** Tabs to switch content, click on a tab to check background animation.
**Motion and lifecycle:** Clicking a tab changes the active content with a shared-layout background transition.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `click-triggered` `external-dependencies` `features` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hero` `hover-triggered` `product` `spring-settling` `tabs` `three-dimensional` `utility` `hero` `features` `product` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/tabs) · [Official registry JSON](https://ui.aceternity.com/registry/tabs.json) · registry SHA-256 `a0f2d1eb503190ec2e53ee5887a9b33d7c94e3f6d6548f07afd0a79ef0effcaa` · cached source SHA-256 `0d34660aeb2d49d912b1216343bf7a86edf6dc2e0eb097ad53c30068e6950a71`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (tabs.tsx) | [open](http://localhost:38473/p/tabs/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/tabs--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/tabs--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/tabs--1--mobile-reduced.png) |

### Animated Testimonials — `animated-testimonials`

**What it renders:** Minimal testimonials sections with image and quote.
**Motion and lifecycle:** The active quote and portrait transition with overlapping fade, scale, and position changes; arrow buttons switch entries and a five-second timer advances them automatically.
**Flozio fit:** `conditional-approved-proof` — Use only with approved, real customer quotes or verified outcomes. The published examples contain placeholder or third-party claims and are not Flozio proof.
**Tags:** `animated` `click-or-toggle` `click-triggered` `external-dependencies` `flozio:customer-proof-requires-approval` `flozio:requires-real-data` `hover-triggered` `special` `testimonials` `three-dimensional` `timer-driven` `testimonials` `special`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/animated-testimonials) · [Official registry JSON](https://ui.aceternity.com/registry/animated-testimonials.json) · registry SHA-256 `2bd0f7353df4b76f4e2e03d7b9805787d8a4900f1cd5f6be8a30c9e04e770341` · cached source SHA-256 `0ebd8145a884493cc52f27b9fc73aaa35102fc4d12fb31b4e33d55818e330627`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (animated-testimonials.tsx) | [open](http://localhost:38473/p/animated-testimonials/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/animated-testimonials--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/animated-testimonials--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/animated-testimonials--1--mobile-reduced.png) |

### Animated Tooltip — `animated-tooltip`

**What it renders:** A cool tooltip that reveals on hover, follows mouse pointer
**Motion and lifecycle:** Hovering each avatar reveals a name/title label that rises, scales, and rotates with the pointer; it springs in and exits on leave.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `animated` `canvas-rendering` `card` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover` `hover-triggered` `pointer-tracking` `special` `spring-settling` `timer-driven` `tooltip` `utility` `card` `hover` `special` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/animated-tooltip) · [Official registry JSON](https://ui.aceternity.com/registry/animated-tooltip.json) · registry SHA-256 `038df40626ed0cb682f737f9f28261251c57f4c994fec4289d724bd94c60011e` · cached source SHA-256 `5ac351d14d3890b4af055f2a0588c1499d905d144abe4f47aa2fbd887c44a3ea`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (animated-tooltip.tsx) | [open](http://localhost:38473/p/animated-tooltip/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/animated-tooltip--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/animated-tooltip--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/animated-tooltip--1--mobile-reduced.png) |

### Apple Cards Carousel — `apple-cards-carousel`

**What it renders:** A sleek and minimal carousel implementation, as seen on apple.com
**Motion and lifecycle:** The horizontal track scrolls through oversized cards; arrow buttons move by one card, and selecting a card expands it into a modal that exits back to the track.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `apple` `card` `cards` `carousel` `click-or-toggle` `click-triggered` `drag-or-gesture` `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `keyboard-input` `scroll-linked` `card` `features` `carousel`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `next/image`, `react`. **Declared prop names:** `items`, `initialScroll`.
**Source:** [Official docs](https://ui.aceternity.com/components/apple-cards-carousel) · [Official registry JSON](https://ui.aceternity.com/registry/apple-cards-carousel.json) · registry SHA-256 `47e5f3bcc11ed1af53bbb66c1bd65a3e4ed74dcfc308f6f2bfd68804f64205fb` · cached source SHA-256 `a9a498aa5832eb71b53f09fc65c16c4758503e38bf0d3f0bf97a6ccdfda5ecfe`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (apple-cards-carousel-1.tsx) | [open](http://localhost:38473/p/apple-cards-carousel/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--1--mobile-reduced.png) |
| 2 | yes (apple-cards-carousel-2.tsx) | [open](http://localhost:38473/p/apple-cards-carousel/2) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--2--mobile-reduced.png) |
| 3 | yes (apple-cards-carousel-3.tsx) | [open](http://localhost:38473/p/apple-cards-carousel/3) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/apple-cards-carousel--3--mobile-reduced.png) |

### ASCII Art — `ascii-art`

**What it renders:** Convert any image to ASCII art with customizable charsets, colors, and animations.
**Motion and lifecycle:** The component converts an image into a character grid; examples 1–3 animate the reveal, while examples 4–11 explicitly disable animation and remain static.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `art` `ascii` `background` `canvas` `canvas-rendering` `card` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `image` `timer-driven` `card` `image` `canvas` `background`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `src`, `resolution`, `charset`, `color`, `backgroundColor`, `inverted`, `colored`, `animated`, `animationStyle`, `animationDuration`, `fontFamily`, `className`, `animateOnView`, `objectFit`.
**Source:** [Official docs](https://ui.aceternity.com/components/ascii-art) · [Official registry JSON](https://ui.aceternity.com/registry/ascii-art.json) · registry SHA-256 `b2b33b6dd356504c56b8b80401844a0b652e18435ed490657ebda39999428d4c` · cached source SHA-256 `6d5c526aafc3b87ce0447b91a7c73cd7bca0b4d3f5c652ab481c412653827baa`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (ascii-art-1.tsx) | [open](http://localhost:38473/p/ascii-art/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--1--mobile-reduced.png) |
| 2 | yes (ascii-art-2.tsx) | [open](http://localhost:38473/p/ascii-art/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--2--mobile-reduced.png) |
| 3 | yes (ascii-art-3.tsx) | [open](http://localhost:38473/p/ascii-art/3) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--3--mobile-reduced.png) |
| 4 | yes (ascii-art-4.tsx) | [open](http://localhost:38473/p/ascii-art/4) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--4--mobile-reduced.png) |
| 5 | yes (ascii-art-5.tsx) | [open](http://localhost:38473/p/ascii-art/5) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--5--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--5--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--5--mobile-reduced.png) |
| 6 | yes (ascii-art-6.tsx) | [open](http://localhost:38473/p/ascii-art/6) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--6--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--6--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--6--mobile-reduced.png) |
| 7 | yes (ascii-art-7.tsx) | [open](http://localhost:38473/p/ascii-art/7) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--7--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--7--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--7--mobile-reduced.png) |
| 8 | yes (ascii-art-8.tsx) | [open](http://localhost:38473/p/ascii-art/8) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--8--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--8--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--8--mobile-reduced.png) |
| 9 | yes (ascii-art-9.tsx) | [open](http://localhost:38473/p/ascii-art/9) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--9--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--9--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--9--mobile-reduced.png) |
| 10 | yes (ascii-art-10.tsx) | [open](http://localhost:38473/p/ascii-art/10) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--10--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--10--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--10--mobile-reduced.png) |
| 11 | yes (ascii-art-11.tsx) | [open](http://localhost:38473/p/ascii-art/11) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/ascii-art--11--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/ascii-art--11--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/ascii-art--11--mobile-reduced.png) |

### Aurora Background — `aurora-background`

**What it renders:** A subtle Aurora or Southern Lights background for your website.
**Motion and lifecycle:** A soft gradient field loops slowly across the container; the gradient layers move independently.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `aurora` `background` `card` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `special` `card` `background` `gradient` `special`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/aurora-background) · [Official registry JSON](https://ui.aceternity.com/registry/aurora-background.json) · registry SHA-256 `a588ab66d7ac909e014ac3a30bc7d999af15f04b757fbaee048d9cf01df4dd96` · cached source SHA-256 `6b40cb23961819bb3619e61cbf971990c797133a29e767814fb5d578d1d83f3c`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (aurora-background.tsx) | [open](http://localhost:38473/p/aurora-background/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/aurora-background--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/aurora-background--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/aurora-background--1--mobile-reduced.png) |

### Background Beams — `background-beams`

**What it renders:** Multiple background beams that follow a path of SVG, makes a good hero section background.
**Motion and lifecycle:** SVG beams sweep along curved paths in a repeating animation behind the content.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `beams` `card` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `repeating-animation` `special` `svg-or-path` `card` `background` `gradient` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/background-beams) · [Official registry JSON](https://ui.aceternity.com/registry/background-beams.json) · registry SHA-256 `88af2973c676fabaee374fae69964ca7ce5fab84ea69fab8f2e0eb0146faf492` · cached source SHA-256 `a6cb4847ec4af2602d523b34eb1d3fd991f1b47b803635b114fc8313199f3682`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-beams.tsx) | [open](http://localhost:38473/p/background-beams/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-beams--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-beams--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-beams--1--mobile-reduced.png) |

### Background Beams With Collision — `background-beams-with-collision`

**What it renders:** Exploding beams in the background
**Motion and lifecycle:** SVG beams travel across the background and flare when they intersect the collision region.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `beams` `collision` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `repeating-animation` `timer-driven` `ui` `with` `ui` `background`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/background-beams-with-collision) · [Official registry JSON](https://ui.aceternity.com/registry/background-beams-with-collision.json) · registry SHA-256 `9337d964f6d597c3fe8edd2f3a3b37afacd9ec3577ffcbc4a61aeb0e92eebe5f` · cached source SHA-256 `ef1b5d0b32cae6f127773efd227938673d7df5dd10fb61381494b1bb5de0aa54`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-beams-with-collision.tsx) | [open](http://localhost:38473/p/background-beams-with-collision/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-beams-with-collision--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-beams-with-collision--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-beams-with-collision--1--mobile-reduced.png) |

### Background Boxes — `background-boxes`

**What it renders:** A full width background box container that highlights on hover
**Motion and lifecycle:** Pointer hover lights individual grid cells; the selected cell’s border and fill brighten briefly.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `boxes` `call to action` `card` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `hover-triggered` `special` `svg-or-path` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/background-boxes) · [Official registry JSON](https://ui.aceternity.com/registry/background-boxes.json) · registry SHA-256 `8de360b241e03c977853dec28672d37de88cc7ed2fb28112a9964d78ed35d7c5` · cached source SHA-256 `d56f958318c245afa245ee8c0449d647cd824bbb2ccbbad93d9a44f7edfcda18`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-boxes.tsx) | [open](http://localhost:38473/p/background-boxes/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-boxes--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-boxes--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-boxes--1--mobile-reduced.png) |

### Background Cubes Grid — `background-cubes-grid`

**What it renders:** A grid of 3D cubes that ripples under the cursor. Use the flat isometric field or a tilted perspective grid with glowing crests.
**Motion and lifecycle:** A WebGL cube field tilts and ripples around the cursor; three variants change the grid perspective and response.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `3d` `background` `canvas-rendering` `cubes` `external-dependencies` `flozio:requires-real-product-visual` `flozio:system-of-action` `grid` `hover-triggered` `interactive` `pointer-tracking` `reduced-motion-aware` `svg-or-path` `three-dimensional` `background` `3d` `interactive`
**Dependencies:** `motion/react`, `react`, `three`, `three/examples/jsm/geometries/RoundedBoxGeometry.js`, `three/examples/jsm/postprocessing/EffectComposer.js`, `three/examples/jsm/postprocessing/OutputPass.js`, `three/examples/jsm/postprocessing/RenderPass.js`, `three/examples/jsm/postprocessing/ShaderPass.js`. **Declared prop names:** `variant`, `className`, `cellSize`, `gap`, `topColor`, `leftColor`, `rightColor`, `amplitude`, `speed`, `damping`, `idleRipples`, `idleDelay`, `glowColor`, `glow`, `gridSize`, `baseColor`, `waveColor`, `backgroundColor`, `tilt`.
**Source:** [Official docs](https://ui.aceternity.com/components/background-cubes-grid) · [Official registry JSON](https://ui.aceternity.com/registry/background-cubes-grid.json) · registry SHA-256 `6212b5ea30dd41b6da395fee076a52d8e55aee3762dd00ba6f46e75b366ce64d` · cached source SHA-256 `10cc2b45bc58114af608ac48877a80b9bee201516a4c69b7373763b2165f5bc4`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support found in source.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-cubes-grid-1.tsx) | [open](http://localhost:38473/p/background-cubes-grid/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--1--mobile-reduced.png) |
| 2 | yes (background-cubes-grid-2.tsx) | [open](http://localhost:38473/p/background-cubes-grid/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--2--mobile-reduced.png) |
| 3 | yes (background-cubes-grid-3.tsx) | [open](http://localhost:38473/p/background-cubes-grid/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-cubes-grid--3--mobile-reduced.png) |

### Background Gradient — `background-gradient`

**What it renders:** An animated gradient that sits at the background of a card, button or anything.
**Motion and lifecycle:** Gradient layers drift continuously when the animate prop is enabled; hover increases the blurred glow's opacity, which fades back on leave.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `call to action` `card` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `hover-triggered` `repeating-animation` `special` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/background-gradient) · [Official registry JSON](https://ui.aceternity.com/registry/background-gradient.json) · registry SHA-256 `43899f7deb2c4fee2dea817c0a2c0e11b56ddba659f172fbe1bb79498bc7fe9a` · cached source SHA-256 `b00bbd960069dac2740889af5bdffcc4eaa245b465de7433a145742e628799f4`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-gradient.tsx) | [open](http://localhost:38473/p/background-gradient/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-gradient--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-gradient--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-gradient--1--mobile-reduced.png) |

### Background Gradient Animation — `background-gradient-animation`

**What it renders:** A smooth and elegant background gradient animation that changes the gradient position over time.
**Motion and lifecycle:** A blurred gradient shifts position continuously; the example adds a pointer-sensitive interaction region.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `animation` `background` `call to action` `card` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `hover-triggered` `pointer-tracking` `special` `svg-or-path` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/background-gradient-animation) · [Official registry JSON](https://ui.aceternity.com/registry/background-gradient-animation.json) · registry SHA-256 `a42b20bc1582d1113333dfded295fa094294c4983401fe8e068f252fd4f5ad07` · cached source SHA-256 `162bb2955384e56b221a375c42f8980569888e7d0bcdac5ebbc94450ce09004e`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-gradient-animation.tsx) | [open](http://localhost:38473/p/background-gradient-animation/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-gradient-animation--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-gradient-animation--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-gradient-animation--1--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Background Lines — `background-lines`

**What it renders:** A set of animated SVG wave paths used as a background layer; the source package has no published demo route, so the lab uses a small source-only wrapper.
**Motion and lifecycle:** SVG paths draw and wave over time as a decorative background; no user trigger is needed.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `background` `effects` `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `hero` `lines` `repeating-animation` `special` `svg-or-path` `background` `special` `effects` `hero`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/background-lines) · [Official registry JSON](https://ui.aceternity.com/registry/background-lines.json) · registry SHA-256 `not-recorded` · cached source SHA-256 `72c900efcb60886d5824649bc129106d9bc36e645ca418aca771a7d9fe4d3a96`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| source | no — source-only wrapper | [open](http://localhost:38473/c/background-lines) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-lines--source--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-lines--source--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-lines--source--mobile-reduced.png) |

### Background Ripple Effect — `background-ripple-effect`

**What it renders:** A grid of cells that ripple when clicked.
**Motion and lifecycle:** A clicked grid cell starts a staggered radial wave through nearby cells.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `background` `click-or-toggle` `click-triggered` `effect` `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `hover-triggered` `ripple` `background` `ripple` `effect`
**Dependencies:** `react`. **Declared prop names:** `className`, `rows`, `cols`, `cellSize`, `borderColor`, `fillColor`, `clickedCell`, `onCellClick`, `interactive`.
**Source:** [Official docs](https://ui.aceternity.com/components/background-ripple-effect) · [Official registry JSON](https://ui.aceternity.com/registry/background-ripple-effect.json) · registry SHA-256 `9b3b38fb58fe79c9c31a8235f8c92e504692f00974d7459f409a1a00fd9b408d` · cached source SHA-256 `bdb7622e70515843fcb52ec0574fccc19c513c35d60f730968ba8361b2a6d9b2`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (background-ripple-effect.tsx) | [open](http://localhost:38473/p/background-ripple-effect/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/background-ripple-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/background-ripple-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/background-ripple-effect--1--mobile-reduced.png) |

### Bento Grid — `bento-grid`

**What it renders:** A skewed grid layout with Title, description and a header component
**Motion and lifecycle:** Hovering a card translates its text group slightly and raises its shadow; the short transition settles back when the pointer leaves.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `bento` `card` `external-dependencies` `features` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `grid` `hover` `hover-triggered` `repeating-animation` `card` `grid` `hover` `features`
**Dependencies:** none detected in registry imports. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/bento-grid) · [Official registry JSON](https://ui.aceternity.com/registry/bento-grid.json) · registry SHA-256 `9d988ea63b4209b65e386aa26dba37005d67667e122184c8905b6d31eda32482` · cached source SHA-256 `a3cdb12c2f3183385859da768cd5a66a4024dd017230fb278b8f2d2acf85c730`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (bento-grid-1.tsx) | [open](http://localhost:38473/p/bento-grid/1) | hover | rendered; target found; no sampled pixel change; Pointer hover was active; source defines a 200ms text shift and shadow transition, but the sampled screenshots showed no detectable pixel change.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/bento-grid--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/bento-grid--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/bento-grid--1--mobile-reduced.png) |
| 2 | yes (bento-grid-2.tsx) | [open](http://localhost:38473/p/bento-grid/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/bento-grid--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/bento-grid--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/bento-grid--2--mobile-reduced.png) |
| 3 | yes (bento-grid-3.tsx) | [open](http://localhost:38473/p/bento-grid/3) | hover | rendered; target found; no sampled pixel change; Pointer hover was active; source defines a 200ms text shift and shadow transition, but the sampled screenshots showed no detectable pixel change.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/bento-grid--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/bento-grid--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/bento-grid--3--mobile-reduced.png) |

**Notes:** At least one trigger was dispatched but produced no sampled pixel change; see variant-level motionObservation and compare source before claiming the effect was visibly verified.

### Canvas Reveal Effect — `canvas-reveal-effect`

**What it renders:** A dot background that expands on hover, as seen on Clerk's website
**Motion and lifecycle:** Hovering the card starts a WebGL particle field that fades in and reveals over the text; leaving fades the field out.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `call to action` `canvas` `canvas-rendering` `card` `effect` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `hover-triggered` `reveal` `special` `svg-or-path` `three-dimensional` `card` `background` `gradient` `canvas` `special` `call to action`
**Dependencies:** `@react-three/fiber`, `react`, `three`. **Declared prop names:** `colors`, `opacities`, `totalSize`, `dotSize`, `shader`, `center`, `source`, `uniforms`, `maxFps`.
**Source:** [Official docs](https://ui.aceternity.com/components/canvas-reveal-effect) · [Official registry JSON](https://ui.aceternity.com/registry/canvas-reveal-effect.json) · registry SHA-256 `68ce92e879c578275ef4d74c6b0fe312bc8c114d8d0fb25d709f3913e9cd85c4` · cached source SHA-256 `7d49ce5826dc2b9a20439778c62bb6cf15547fd7472baa4d57de25eea2d40692`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (canvas-reveal-effect-1.tsx) | [open](http://localhost:38473/p/canvas-reveal-effect/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--1--mobile-reduced.png) |
| 2 | yes (canvas-reveal-effect-2.tsx) | [open](http://localhost:38473/p/canvas-reveal-effect/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--2--mobile-reduced.png) |
| 3 | yes (canvas-reveal-effect-3.tsx) | [open](http://localhost:38473/p/canvas-reveal-effect/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/canvas-reveal-effect--3--mobile-reduced.png) |

### Canvas Text — `canvas-text`

**What it renders:** Animated text component with colorful curved lines rendered on canvas, clipped to the text shape.
**Motion and lifecycle:** A timer or animation frame advances the sequence, then stops or loops according to the component logic. The main visual is painted on canvas rather than DOM layout elements.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `animation` `background` `canvas` `canvas-rendering` `flozio:copy-accent` `flozio:editorial` `text` `timer-driven` `text` `animation` `canvas` `background`
**Dependencies:** `react`. **Declared prop names:** `text`, `className`, `backgroundClassName`, `colors`, `animationDuration`, `lineWidth`, `lineGap`, `curveIntensity`, `overlay`.
**Source:** [Official docs](https://ui.aceternity.com/components/canvas-text) · [Official registry JSON](https://ui.aceternity.com/registry/canvas-text.json) · registry SHA-256 `33f09aa1897751b29b1530ef57282666d6d29fc180f177a612452307fe9f3965` · cached source SHA-256 `cd60ebbddf3b08596c692f34eb5a7db35f65dd84bb1e7cdceebe1a40e693f6f1`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (canvas-text-1.tsx) | [open](http://localhost:38473/p/canvas-text/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/canvas-text--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/canvas-text--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/canvas-text--1--mobile-reduced.png) |
| 2 | yes (canvas-text-2.tsx) | [open](http://localhost:38473/p/canvas-text/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/canvas-text--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/canvas-text--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/canvas-text--2--mobile-reduced.png) |
| 3 | yes (canvas-text-3.tsx) | [open](http://localhost:38473/p/canvas-text/3) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/canvas-text--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/canvas-text--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/canvas-text--3--mobile-reduced.png) |

### Card Spotlight — `card-spotlight`

**What it renders:** A card component with a spotlight effect revealing a radial gradient background
**Motion and lifecycle:** Pointer coordinates drive the active surface or visual position. Hover starts the visible state and pointer leave returns or dismisses it. The main rendering uses a 3D perspective or WebGL scene. SVG paths or masks provide the moving/revealing layer.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `canvas-rendering` `card` `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `pointer-tracking` `special` `spotlight` `svg-or-path` `three-dimensional` `card` `features` `special`
**Dependencies:** `@react-three/fiber`, `motion/react`, `react`, `three`. **Declared prop names:** `colors`, `opacities`, `totalSize`, `dotSize`, `shader`, `center`, `source`, `uniforms`, `maxFps`.
**Source:** [Official docs](https://ui.aceternity.com/components/card-spotlight) · [Official registry JSON](https://ui.aceternity.com/registry/card-spotlight.json) · registry SHA-256 `a46aab4f9f62bce0fb183635a03206be695f181d46a8c9b78ffed796906d5b6c` · cached source SHA-256 `acf15b7de638d214c30dd112475a90c8801ea821b97803e4f2e9cebab3b5ad4c`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (card-spotlight.tsx) | [open](http://localhost:38473/p/card-spotlight/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/card-spotlight--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/card-spotlight--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/card-spotlight--1--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Card Stack — `card-stack`

**What it renders:** Cards stack on top of each other after some interval. Perfect for showing testimonials.
**Motion and lifecycle:** A timer rotates the back card to the front every five seconds; Motion animates the stack offsets and scale.
**Flozio fit:** `conditional-approved-proof` — Use only with approved, real customer quotes or verified outcomes. The published examples contain placeholder or third-party claims and are not Flozio proof.
**Tags:** `card` `external-dependencies` `features` `flozio:customer-proof-requires-approval` `flozio:requires-real-data` `gradient` `stack` `testimonials` `timer-driven` `card` `testimonials` `gradient` `features`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/card-stack) · [Official registry JSON](https://ui.aceternity.com/registry/card-stack.json) · registry SHA-256 `92845c0100e8b673eae51a48d873f54114180bcec3a28f0e5c4c9cf10d24e224` · cached source SHA-256 `7d38e4667f81ccef7e641d0ebf492f7ec5b4f3d9d154e04c9bf00a413320df9e`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (card-stack.tsx) | [open](http://localhost:38473/p/card-stack/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/card-stack--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/card-stack--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/card-stack--1--mobile-reduced.png) |

### Carousel — `carousel`

**What it renders:** A customizable carousel with microinteractions and slider.
**Motion and lifecycle:** Clicking an indicator selects its image and animates the active slide; pointer position also tilts the active 3D card, which returns level on leave.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `canvas-rendering` `carousel` `click-or-toggle` `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `pointer-tracking` `special` `three-dimensional` `timer-driven` `carousel` `special` `features`
**Dependencies:** `@tabler/icons-react`, `react`. **Declared prop names:** `slide`, `index`, `current`, `handleSlideClick`, `type`, `title`, `handleClick`, `slides`.
**Source:** [Official docs](https://ui.aceternity.com/components/carousel) · [Official registry JSON](https://ui.aceternity.com/registry/carousel.json) · registry SHA-256 `0855d5a69a43dfb2e2025ca6b99f04d0aa2f5a30023954174a6b01a6bcf6e506` · cached source SHA-256 `04759858e8dc938b453c77e152658fc6cb07d7f04eaabf7a49673d9f9a434c4e`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (carousel.tsx) | [open](http://localhost:38473/p/carousel/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/carousel--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/carousel--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/carousel--1--mobile-reduced.png) |

### Chromatic Image — `chromatic-image`

**What it renders:** An interactive image with responsive color separation, displacement, and tilt.
**Motion and lifecycle:** A WebGL image shader tracks the pointer and eases color-channel separation, displacement, zoom, and tilt; reduced motion lowers motion but does not turn the shader into a static image.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `animation` `canvas` `canvas-rendering` `chromatic` `click-or-toggle` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `image` `pointer-tracking` `reduced-motion-aware` `special` `three-dimensional` `timer-driven` `image` `animation` `canvas` `special`
**Dependencies:** `react`. **Declared prop names:** `src`, `alt`, `children`, `className`, `backgroundColor`, `zoom`, `displacement`, `chromaticShift`, `tilt`.
**Source:** [Official docs](https://ui.aceternity.com/components/chromatic-image) · [Official registry JSON](https://ui.aceternity.com/registry/chromatic-image.json) · registry SHA-256 `6ca63f7c00e558568c5d2b91af073658354f98d223382dfc6b3d6454d2b5715d` · cached source SHA-256 `2e111364d8fa42b9e510a26a2822eb828d6cc614d87023cf8bc85571730244e8`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support found in source.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (chromatic-image-1.tsx) | [open](http://localhost:38473/p/chromatic-image/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/chromatic-image--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/chromatic-image--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/chromatic-image--1--mobile-reduced.png) |
| 2 | yes (chromatic-image-2.tsx) | [open](http://localhost:38473/p/chromatic-image/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/chromatic-image--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/chromatic-image--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/chromatic-image--2--mobile-reduced.png) |
| 3 | yes (chromatic-image-3.tsx) | [open](http://localhost:38473/p/chromatic-image/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/chromatic-image--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/chromatic-image--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/chromatic-image--3--mobile-reduced.png) |
| 4 | yes (chromatic-image-4.tsx) | [open](http://localhost:38473/p/chromatic-image/4) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/chromatic-image--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/chromatic-image--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/chromatic-image--4--mobile-reduced.png) |

### Cloud Shader — `cloud-shader`

**What it renders:** Soft procedural clouds that drift across the sky. Tune speed, count, and colors with props.
**Motion and lifecycle:** A WebGL cloud field drifts continuously; hover variants respond to pointer position and expose color/speed/density props.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `canvas-rendering` `cloud` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `hover-triggered` `reduced-motion-aware` `repeating-animation` `shader` `special` `svg-or-path` `three-dimensional` `timer-driven` `background` `special`
**Dependencies:** `react`. **Declared prop names:** `className`, `children`, `speed`, `count`, `cloudColor`, `skyTopColor`, `skyBottomColor`.
**Source:** [Official docs](https://ui.aceternity.com/components/cloud-shader) · [Official registry JSON](https://ui.aceternity.com/registry/cloud-shader.json) · registry SHA-256 `115f3c8f171e70e12afe5abe4de8aaaf2a854eff5da9c4a91d9399eead8697ec` · cached source SHA-256 `4a0fd073ef2939b05b7a1d796b43574c94acc17a6bf65f35f7933ab8156cd60e`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support found in source.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (cloud-shader-1.tsx) | [open](http://localhost:38473/p/cloud-shader/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/cloud-shader--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/cloud-shader--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/cloud-shader--1--mobile-reduced.png) |
| 2 | yes (cloud-shader-2.tsx) | [open](http://localhost:38473/p/cloud-shader/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/cloud-shader--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/cloud-shader--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/cloud-shader--2--mobile-reduced.png) |
| 3 | yes (cloud-shader-3.tsx) | [open](http://localhost:38473/p/cloud-shader/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/cloud-shader--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/cloud-shader--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/cloud-shader--3--mobile-reduced.png) |
| 4 | yes (cloud-shader-4.tsx) | [open](http://localhost:38473/p/cloud-shader/4) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/cloud-shader--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/cloud-shader--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/cloud-shader--4--mobile-reduced.png) |

### Code Block — `code-block`

**What it renders:** A configurable code block component built on top of react-syntax-highlighter.
**Motion and lifecycle:** Tabs replace the visible code sample; the copy button writes the active sample and briefly changes to a copied state before resetting after two seconds.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `block` `click-or-toggle` `click-triggered` `code` `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `special` `timer-driven` `code` `special` `features`
**Dependencies:** `@tabler/icons-react`, `react`, `react-syntax-highlighter`, `react-syntax-highlighter/dist/cjs/styles/prism`. **Declared prop names:** `language`, `filename`, `highlightLines`.
**Source:** [Official docs](https://ui.aceternity.com/components/code-block) · [Official registry JSON](https://ui.aceternity.com/registry/code-block.json) · registry SHA-256 `fa45c82d6dd867477213374d837ea75b00d4642ef686edf15cbc4df743d623d2` · cached source SHA-256 `3715eb017b80e5c019db8d60a22c1d0e72390cc6c17ec958bd9358548a19b076`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (code-block-1.tsx) | [open](http://localhost:38473/p/code-block/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/code-block--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/code-block--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/code-block--1--mobile-reduced.png) |
| 2 | yes (code-block-2.tsx) | [open](http://localhost:38473/p/code-block/2) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/code-block--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/code-block--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/code-block--2--mobile-reduced.png) |

### Colourful Text — `colourful-text`

**What it renders:** A text component with various colours, filter and scale effects.
**Motion and lifecycle:** A colored text word cycles through gradient states on a repeating interval, with each change eased over a short transition.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `colourful` `features` `flozio:copy-accent` `flozio:editorial` `hero` `special` `text` `timer-driven` `text` `special` `features` `hero`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/colourful-text) · [Official registry JSON](https://ui.aceternity.com/registry/colourful-text.json) · registry SHA-256 `e496a1f2160ca55376629fc127b1ccdfd8fb5b6125b9eb416818f7210e11fcca` · cached source SHA-256 `c3cdf9b013cc75b02855ef469b4a96da395e2c36396f6f7acd95b553c2e08ea5`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (colourful-text.tsx) | [open](http://localhost:38473/p/colourful-text/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/colourful-text--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/colourful-text--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/colourful-text--1--mobile-reduced.png) |

### Comet Card — `comet-card`

**What it renders:** A perspective, 3D, Tilt card as seen on Perplexity Comet's website.
**Motion and lifecycle:** Pointer position tilts the surface in 3D; the bright comet accent sweeps around the card edge.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `3d` `card` `comet` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `pointer-tracking` `spring-settling` `three-dimensional` `tilt` `card` `3d` `tilt`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/comet-card) · [Official registry JSON](https://ui.aceternity.com/registry/comet-card.json) · registry SHA-256 `ec37ce2b6930cbea451648ee517dcc6f5e25810c80d46544cd7a26f2d113112a` · cached source SHA-256 `43c862495a8c1c0a4f78d121d66b5837ca27afa5db6328895911497e7ed9b578`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (comet-card.tsx) | [open](http://localhost:38473/p/comet-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/comet-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/comet-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/comet-card--1--mobile-reduced.png) |

### Compare — `compare`

**What it renders:** A comparison component between two images, slide or drag to compare
**Motion and lifecycle:** Dragging the divider reveals different portions of two images; each variant uses a distinct comparison layout.
**Flozio fit:** `conditional-real-data` — Can explain territory or outcome patterns only when backed by real Flozio data. Never invent map markers, comparisons, deal metrics, or customer results.
**Tags:** `canvas-rendering` `card` `compare` `drag-or-gesture` `external-dependencies` `features` `flozio:requires-real-data` `flozio:workflow-explainer` `hover-triggered` `pointer-tracking` `special` `three-dimensional` `timer-driven` `card` `features` `special`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** `firstImage`, `secondImage`, `className`, `firstImageClassName`, `secondImageClassname`, `initialSliderPercentage`, `slideMode`, `showHandlebar`, `autoplay`, `autoplayDuration`.
**Source:** [Official docs](https://ui.aceternity.com/components/compare) · [Official registry JSON](https://ui.aceternity.com/registry/compare.json) · registry SHA-256 `73636598e1991cd0c400159a1a471b3831c48e9a4a508b80e267ebdf1ee185b6` · cached source SHA-256 `fd0801ffcb425cf02693aa7c9db752050d3e2aac2766a2bd8a0f4cb64fc16c08`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (compare-1.tsx) | [open](http://localhost:38473/p/compare/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/compare--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/compare--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/compare--1--mobile-reduced.png) |
| 2 | yes (compare-2.tsx) | [open](http://localhost:38473/p/compare/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/compare--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/compare--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/compare--2--mobile-reduced.png) |
| 3 | yes (compare-3.tsx) | [open](http://localhost:38473/p/compare/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/compare--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/compare--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/compare--3--mobile-reduced.png) |
| 4 | yes (compare-4.tsx) | [open](http://localhost:38473/p/compare/4) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/compare--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/compare--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/compare--4--mobile-reduced.png) |

### Container Scroll Animation — `container-scroll-animation`

**What it renders:** A scroll animation that rotates in 3d on scroll. Perfect for hero or marketing sections.
**Motion and lifecycle:** A contained visual rotates and translates as its scroll progress changes; it begins and settles with the page position.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `animation` `container` `external-dependencies` `features` `flozio:deal-progression` `flozio:workflow-explainer` `hero` `product` `scroll` `scroll-linked` `scroll-triggered` `three-dimensional` `hero` `product` `features`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/container-scroll-animation) · [Official registry JSON](https://ui.aceternity.com/registry/container-scroll-animation.json) · registry SHA-256 `222df8f0821d2cf27e7e8a0c3675018254ccf014ca6f7a632e40ce81c1e6d2bc` · cached source SHA-256 `dfcc37dc475073f28ed42cf5292622af47071a7bc32f7970073ef82594db4165`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (container-scroll-animation.tsx) | [open](http://localhost:38473/p/container-scroll-animation/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/container-scroll-animation--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/container-scroll-animation--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/container-scroll-animation--1--mobile-reduced.png) |

### Container Text Flip — `container-text-flip`

**What it renders:** A container that flips through words, animating the width.
**Motion and lifecycle:** A three-second interval swaps the word, animates the container width, and blurs letters in with small staggered delays.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `animation` `container` `flip` `flozio:copy-accent` `flozio:editorial` `hero` `text` `timer-driven` `text` `animation` `container` `hero`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `words`, `interval`, `className`, `textClassName`, `animationDuration`.
**Source:** [Official docs](https://ui.aceternity.com/components/container-text-flip) · [Official registry JSON](https://ui.aceternity.com/registry/container-text-flip.json) · registry SHA-256 `be4a39c38c35141f983129b547301a9c40ae134ccc0fd62574a7cdf095d81b96` · cached source SHA-256 `593026cdbc3ae45b0ac3e7a31525b33311e5bb10057538e24209f7cd1e460bad`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (container-text-flip-1.tsx) | [open](http://localhost:38473/p/container-text-flip/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/container-text-flip--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/container-text-flip--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/container-text-flip--1--mobile-reduced.png) |
| 2 | yes (container-text-flip-2.tsx) | [open](http://localhost:38473/p/container-text-flip/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/container-text-flip--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/container-text-flip--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/container-text-flip--2--mobile-reduced.png) |
| 3 | yes (container-text-flip-3.tsx) | [open](http://localhost:38473/p/container-text-flip/3) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/container-text-flip--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/container-text-flip--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/container-text-flip--3--mobile-reduced.png) |

### Cover — `cover`

**What it renders:** cover component for React/Next.js
**Motion and lifecycle:** Hovering reveals a looping particle strip and several short, delayed beams; the covered word scales down and jitters briefly, then all effects fade out on pointer leave.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `click-or-toggle` `cover` `external-dependencies` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `repeating-animation`
**Dependencies:** `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim`, `motion/react`, `react`. **Declared prop names:** `id`, `className`, `background`, `particleSize`, `minSize`, `maxSize`, `speed`, `particleColor`, `particleDensity`.
**Source:** [Official docs](https://ui.aceternity.com/components/container-cover) · [Official registry JSON](https://ui.aceternity.com/registry/cover.json) · registry SHA-256 `9cc8122716b7219f63538296815d74cd6bfcd459c96b8134d3fd4dec60151e07` · cached source SHA-256 `37f34a450b2f0a394cb2ccc91947e615b4920463f33540bbd58c000b95e488f5`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (cover.tsx) | [open](http://localhost:38473/p/cover/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/cover--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/cover--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/cover--1--mobile-reduced.png) |

### Direction Aware Hover — `direction-aware-hover`

**What it renders:** A direction aware hover effect using Framer Motion, Tailwindcss and good old javascript.
**Motion and lifecycle:** Entering the image card from each edge slides the caption and dark overlay in from that same direction; leaving reverses the reveal.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `aware` `card` `direction` `external-dependencies` `features` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `hover` `hover-triggered` `product` `card` `features` `hover` `product`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/direction-aware-hover) · [Official registry JSON](https://ui.aceternity.com/registry/direction-aware-hover.json) · registry SHA-256 `4ee3a3b3bef16c17d4781608a5cfadbb287660ea8a4c66d4659b801408aa9fae` · cached source SHA-256 `8667bdfa7fe1e7ae0683cea7c09ee695de84fe9632ed25ccfa85ca8801736d70`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (direction-aware-hover.tsx) | [open](http://localhost:38473/p/direction-aware-hover/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/direction-aware-hover--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/direction-aware-hover--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/direction-aware-hover--1--mobile-reduced.png) |

### Dither Shader — `dither-shader`

**What it renders:** A real-time ordered dithering effect for images, perfect for pixel art and retro aesthetics.
**Motion and lifecycle:** The source converts an image to a selected ordered-dither pattern on canvas. The four published examples set animated=false, so the inspected previews are static image treatments.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `call to action` `canvas-rendering` `card` `click-or-toggle` `click-triggered` `dither` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `hover-triggered` `shader` `special` `timer-driven` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `react`. **Declared prop names:** `src`, `gridSize`, `ditherMode`, `colorMode`, `invert`, `pixelRatio`, `primaryColor`, `secondaryColor`, `customPalette`, `brightness`, `contrast`, `backgroundColor`, `objectFit`, `threshold`, `animated`, `animationSpeed`, `className`.
**Source:** [Official docs](https://ui.aceternity.com/components/dither-shader) · [Official registry JSON](https://ui.aceternity.com/registry/dither-shader.json) · registry SHA-256 `0b87bec37777ad4f4a1080d8e8bf29d41dbdba91d8f8beddb30281a65985d5a0` · cached source SHA-256 `b3c1064c304d4c6648335febbb12a541f7c81905f1998e72202adb661ffc7503`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (dither-shader-1.tsx) | [open](http://localhost:38473/p/dither-shader/1) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/dither-shader--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/dither-shader--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/dither-shader--1--mobile-reduced.png) |
| 2 | yes (dither-shader-2.tsx) | [open](http://localhost:38473/p/dither-shader/2) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/dither-shader--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/dither-shader--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/dither-shader--2--mobile-reduced.png) |
| 3 | yes (dither-shader-3.tsx) | [open](http://localhost:38473/p/dither-shader/3) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/dither-shader--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/dither-shader--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/dither-shader--3--mobile-reduced.png) |
| 4 | yes (dither-shader-4.tsx) | [open](http://localhost:38473/p/dither-shader/4) | click | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/dither-shader--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/dither-shader--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/dither-shader--4--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Dotted Glow Background — `dotted-glow-background`

**What it renders:** A background effect with opacity animation, glow effect and more.
**Motion and lifecycle:** Dots brighten and fade in a repeating glow cycle; one variant adds pointer-responsive light.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `call to action` `canvas-rendering` `card` `dotted` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `glow` `gradient` `hover-triggered` `special` `timer-driven` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `react`. **Declared prop names:** `className`, `gap`, `radius`, `color`, `darkColor`, `glowColor`, `darkGlowColor`, `colorLightVar`, `colorDarkVar`, `glowColorLightVar`, `glowColorDarkVar`, `opacity`, `backgroundOpacity`, `speedMin`, `speedMax`, `speedScale`.
**Source:** [Official docs](https://ui.aceternity.com/components/dotted-glow-background) · [Official registry JSON](https://ui.aceternity.com/registry/dotted-glow-background.json) · registry SHA-256 `c26c5a69756382b89695e2541662124d806103692566a0c41ab6ae9216a1952d` · cached source SHA-256 `12820db19fead2d91f374165389258f28ff45633cc893974e80eb65036e649f1`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (dotted-glow-background-1.tsx) | [open](http://localhost:38473/p/dotted-glow-background/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/dotted-glow-background--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/dotted-glow-background--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/dotted-glow-background--1--mobile-reduced.png) |
| 2 | yes (dotted-glow-background-2.tsx) | [open](http://localhost:38473/p/dotted-glow-background/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/dotted-glow-background--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/dotted-glow-background--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/dotted-glow-background--2--mobile-reduced.png) |

### Draggable Card — `draggable-card`

**What it renders:** A tiltable, draggable card component that jumps on bounds.
**Motion and lifecycle:** The card follows pointer/touch drag, tilts with movement, and springs back or reacts at its bounds; all four variants use drag.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `card` `drag-or-gesture` `drag-triggered` `draggable` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `pointer-tracking` `spring-settling` `three-dimensional` `tiltable` `card` `draggable` `tiltable`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/draggable-card) · [Official registry JSON](https://ui.aceternity.com/registry/draggable-card.json) · registry SHA-256 `6ff8db3eb2ffe72a70238548f2a6e6bad07623853f4b795e2843123a072b8ae8` · cached source SHA-256 `a248f4cc3f94a08accb0a57117ad4748308867c19b01aade8331bc2eafb7a81a`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (draggable-card-1.tsx) | [open](http://localhost:38473/p/draggable-card/1) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/draggable-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/draggable-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/draggable-card--1--mobile-reduced.png) |
| 2 | yes (draggable-card-2.tsx) | [open](http://localhost:38473/p/draggable-card/2) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/draggable-card--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/draggable-card--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/draggable-card--2--mobile-reduced.png) |
| 3 | yes (draggable-card-3.tsx) | [open](http://localhost:38473/p/draggable-card/3) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/draggable-card--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/draggable-card--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/draggable-card--3--mobile-reduced.png) |
| 4 | yes (draggable-card-4.tsx) | [open](http://localhost:38473/p/draggable-card/4) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/draggable-card--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/draggable-card--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/draggable-card--4--mobile-reduced.png) |

### Encrypted Text — `encrypted-text`

**What it renders:** A text component that reveals the text gradually, gibberish effect.
**Motion and lifecycle:** Text reveals over time while unresolved characters are replaced by changing cipher-like glyphs; the effect stops when the target text resolves.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `canvas-rendering` `encrypted` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `special` `text` `timer-driven` `special` `text`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `text`, `className`, `revealDelayMs`, `charset`, `flipDelayMs`, `encryptedClassName`, `revealedClassName`.
**Source:** [Official docs](https://ui.aceternity.com/components/encrypted-text) · [Official registry JSON](https://ui.aceternity.com/registry/encrypted-text.json) · registry SHA-256 `f89693d8bce9196f26a73c928db63b57563f00b0d32351b8a4781bd297109ef7` · cached source SHA-256 `90c8efe74118294f8ddf39ced79178182946e469eec88fd4d531efc5d8e0d76b`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (encrypted-text-1.tsx) | [open](http://localhost:38473/p/encrypted-text/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/encrypted-text--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/encrypted-text--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/encrypted-text--1--mobile-reduced.png) |
| 2 | yes (encrypted-text-2.tsx) | [open](http://localhost:38473/p/encrypted-text/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/encrypted-text--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/encrypted-text--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/encrypted-text--2--mobile-reduced.png) |

### Evervault Card — `evervault-card`

**What it renders:** A cool card with amazing hover effect, reveals encrypted text and a mixed gradient.
**Motion and lifecycle:** Moving the pointer across the card moves a radial mask over a pattern of generated characters; the pattern brightens inside the mask and dims outside it.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `card` `evervault` `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover` `hover-triggered` `pointer-tracking` `product` `svg-or-path` `card` `features` `hover` `product`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/evervault-card) · [Official registry JSON](https://ui.aceternity.com/registry/evervault-card.json) · registry SHA-256 `61118061aabe213f61ecf5ad4e4a298c8bafc7d73c526bd9fe1e07ff6b351216` · cached source SHA-256 `03478ab4a980e8dd6a998311a0f703037ea17d5023aaa74eb8394c10c6723489`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (evervault-card.tsx) | [open](http://localhost:38473/p/evervault-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/evervault-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/evervault-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/evervault-card--1--mobile-reduced.png) |

### Fey.com Macbook Scroll — `macbook-scroll`

**What it renders:** Scroll through the page and see the image come out of the screen, as seen on Fey.com website.
**Motion and lifecycle:** A laptop frame tilts and its screen content opens as scroll progress advances; the demo depends on product-like media.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `footer` `hero` `macbook` `parallax` `scroll` `scroll-linked` `scroll-triggered` `section` `special` `svg-or-path` `three-dimensional` `hero` `footer` `section` `special` `parallax`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/macbook-scroll) · [Official registry JSON](https://ui.aceternity.com/registry/macbook-scroll.json) · registry SHA-256 `d7703f8ec9589014c15a5ed8a52aee92e489d38742815a3efd579999076db6a6` · cached source SHA-256 `49a5f5deef177892ca107052b8a3c07ed13731335c8a527cceaef5d976e08b99`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (macbook-scroll.tsx) | [open](http://localhost:38473/p/macbook-scroll/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/macbook-scroll--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/macbook-scroll--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/macbook-scroll--1--mobile-reduced.png) |

### File Upload — `file-upload`

**What it renders:** A minimal file upload form with background grid, drag and drop, and micro interactions.
**Motion and lifecycle:** Dragging files onto the drop zone or selecting them activates the border/background state and file list.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `external-dependencies` `file` `flozio:functional-ui` `flozio:not-a-marketing-visual` `form` `hover-triggered` `special` `spring-settling` `upload` `form` `special`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`, `react-dropzone`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/file-upload) · [Official registry JSON](https://ui.aceternity.com/registry/file-upload.json) · registry SHA-256 `12fac552ba06e9afb6ca566feae6dfd81f24957ebeb8a46ccfb0941a52d053e9` · cached source SHA-256 `04c24106950be495496e801ef5093529c935c5fa12d03d30f9a009f0d8adc622`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (file-upload.tsx) | [open](http://localhost:38473/p/file-upload/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/file-upload--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/file-upload--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/file-upload--1--mobile-reduced.png) |

### Flip Words — `flip-words`

**What it renders:** A component that flips through a list of words
**Motion and lifecycle:** The current word exits upward with blur/scale while the next word enters; the example advances through a supplied list.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `call to action` `external-dependencies` `flip` `flozio:copy-accent` `flozio:editorial` `hero` `special` `spring-settling` `text` `timer-driven` `words` `text` `hero` `special` `call to action`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/flip-words) · [Official registry JSON](https://ui.aceternity.com/registry/flip-words.json) · registry SHA-256 `871a2e18f3088970a368f3160f0e26c81356634beaeb05a08a8547773df292a1` · cached source SHA-256 `5fccf682bd6e999104a2d52fcec126c5f1acc8097b4eab4e874d01ff93bfa635`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (flip-words.tsx) | [open](http://localhost:38473/p/flip-words/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/flip-words--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/flip-words--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/flip-words--1--mobile-reduced.png) |

### Floating Dock — `floating-dock`

**What it renders:** A floating dock mac os style component, acts as a navigation bar.
**Motion and lifecycle:** Hovering a dock item scales it and its neighbors based on pointer distance; the dock stays anchored at the viewport edge.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `dock` `external-dependencies` `floating` `flozio:functional-ui` `flozio:not-a-marketing-visual` `form` `hover-triggered` `pointer-tracking` `special` `spring-settling` `form` `special`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/floating-dock) · [Official registry JSON](https://ui.aceternity.com/registry/floating-dock.json) · registry SHA-256 `0c790f445d65ab60e5677f0973456a89e4b3e0b27b6c28197dbbaae311404c58` · cached source SHA-256 `e6e4d163f11dd13135cf7ce08f3801ee91a81dbb75ccc9e0df51154cdd602919`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (floating-dock.tsx) | [open](http://localhost:38473/p/floating-dock/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/floating-dock--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/floating-dock--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/floating-dock--1--mobile-reduced.png) |

### Floating Navbar — `floating-navbar`

**What it renders:** A sticky Navbar that hides on scroll, reveals when scrolled up.
**Motion and lifecycle:** The bar enters after scrolling past its threshold and changes visibility as scroll direction changes.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `external-dependencies` `floating` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `navbar` `pointer-tracking` `scroll-linked` `scroll-triggered` `utility` `navbar` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/floating-navbar) · [Official registry JSON](https://ui.aceternity.com/registry/floating-navbar.json) · registry SHA-256 `a303239b666c526ce0a63da3e4122eaa03b76c26768f4e68f867200a2fa6f529` · cached source SHA-256 `9ab6f04dcc3bbf02d37db3478034af412e6166a3fb76f4889ca36e29cf4e558b`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (floating-navbar.tsx) | [open](http://localhost:38473/p/floating-navbar/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/floating-navbar--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/floating-navbar--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/floating-navbar--1--mobile-reduced.png) |

### Focus Cards — `focus-cards`

**What it renders:** Hover over the card to focus on it, blurring the rest of the cards.
**Motion and lifecycle:** Hover starts the visible state and pointer leave returns or dismisses it.
**Flozio fit:** `conditional-approved-proof` — Use only with approved, real customer quotes or verified outcomes. The published examples contain placeholder or third-party claims and are not Flozio proof.
**Tags:** `cards` `flozio:customer-proof-requires-approval` `flozio:requires-real-data` `focus` `hover-triggered` `ui` `cards` `ui`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/focus-cards) · [Official registry JSON](https://ui.aceternity.com/registry/focus-cards.json) · registry SHA-256 `cfd059f674ea4d91cadd28016deee21270044ea2c39709d643c60ab6b7ceee6d` · cached source SHA-256 `545e481dfd448b33508770ab661878382f45636cb1e0fe77e623d408bc35ebec`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (focus-cards.tsx) | [open](http://localhost:38473/p/focus-cards/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/focus-cards--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/focus-cards--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/focus-cards--1--mobile-reduced.png) |

### Following Pointer — `following-pointer`

**What it renders:** A custom pointer that follows mouse arrow and animates in pointer and content.
**Motion and lifecycle:** A small marker and content card track pointer position; the card remains attached to the current cursor location.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `external-dependencies` `feature` `flozio:functional-ui` `flozio:not-a-marketing-visual` `following` `hover-triggered` `pointer` `pointer-tracking` `special` `svg-or-path` `utility` `feature` `utility` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/following-pointer) · [Official registry JSON](https://ui.aceternity.com/registry/following-pointer.json) · registry SHA-256 `87248234c9605ed56d137d328d26417ae86082cda7dda730889f9567356c1ef4` · cached source SHA-256 `ea4c418b3f3dbfc85be0f4ae6d0624b36a3c46aba1207515a8f7287198727dac`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (following-pointer.tsx) | [open](http://localhost:38473/p/following-pointer/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/following-pointer--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/following-pointer--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/following-pointer--1--mobile-reduced.png) |

### Glare Card — `glare-card`

**What it renders:** A glare effect that happens on hover, as seen on Linear's website
**Motion and lifecycle:** Pointer movement tilts the card and shifts a radial glare across its surface; a short delay softens entry, and leaving fades and levels it.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `card` `flozio:requires-real-product-visual` `flozio:system-of-action` `glare` `hover-triggered` `pointer-tracking` `special` `svg-or-path` `three-dimensional` `timer-driven` `utilities` `special` `utilities` `card`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/glare-card) · [Official registry JSON](https://ui.aceternity.com/registry/glare-card.json) · registry SHA-256 `b044c4edc76cfe35942d677a8e971d1e7e64f3574c1f6af079d48a6923865835` · cached source SHA-256 `264882cf22d8033675100a332faab0d7e71b318ee9fb9276112ca4df02bcfe19`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (glare-card-1.tsx) | [open](http://localhost:38473/p/glare-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/glare-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/glare-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/glare-card--1--mobile-reduced.png) |
| 2 | yes (glare-card-2.tsx) | [open](http://localhost:38473/p/glare-card/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/glare-card--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/glare-card--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/glare-card--2--mobile-reduced.png) |

### Globe — `globe`

**What it renders:** globe component for React/Next.js
**Motion and lifecycle:** A canvas globe rotates continuously and places dots on its surface; the source exposes rotation, color, and size props.
**Flozio fit:** `conditional-real-data` — Can explain territory or outcome patterns only when backed by real Flozio data. Never invent map markers, comparisons, deal metrics, or customer results.
**Tags:** `canvas-rendering` `external-dependencies` `flozio:requires-real-data` `flozio:workflow-explainer` `globe` `three-dimensional` `timer-driven`
**Dependencies:** `@react-three/drei`, `@react-three/fiber`, `react`, `three`, `three-globe`. **Declared prop names:** `pointSize`, `globeColor`, `showAtmosphere`, `atmosphereColor`, `atmosphereAltitude`, `emissive`, `emissiveIntensity`, `shininess`, `polygonColor`, `ambientLight`, `directionalLeftLight`, `directionalTopLight`, `pointLight`, `arcTime`, `arcLength`, `rings`, `maxRings`, `initialPosition`, `autoRotate`, `autoRotateSpeed`, `globeConfig`, `data`.
**Source:** [Official docs](https://ui.aceternity.com/components/github-globe) · [Official registry JSON](https://ui.aceternity.com/registry/globe.json) · registry SHA-256 `e502802158f5593331c48370f973afc7555dcdaf33ad6a0e02d95e0294d1c138` · cached source SHA-256 `f1c4370796ff294abd9be6169a5642ed710347e5ecba121da498459ce4db7e2b`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (globe.tsx) | [open](http://localhost:38473/p/globe/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/globe--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/globe--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/globe--1--mobile-reduced.png) |

### Glowing Effect — `glowing-effect`

**What it renders:** A border glowing effect that adapts to any container or card, as seen on Cursor's website.
**Motion and lifecycle:** A conic-gradient border tracks the pointer’s angle around each card and springs around the perimeter; the glow fades when the pointer leaves its proximity.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `bento grid` `border` `canvas-rendering` `card` `effect` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `glowing` `highlight` `hover-triggered` `pointer-tracking` `timer-driven` `bento grid` `card` `border` `highlight`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `blur`, `inactiveZone`, `proximity`, `spread`, `variant`, `glow`, `className`, `disabled`, `movementDuration`, `borderWidth`.
**Source:** [Official docs](https://ui.aceternity.com/components/glowing-effect) · [Official registry JSON](https://ui.aceternity.com/registry/glowing-effect.json) · registry SHA-256 `8a13db18779c78f624a7b00c06af807ba668ac9f2383dcb969a1a3211bea1886` · cached source SHA-256 `9d987ef5daada143f84daa1b51261934e4462c14ffb77303b3063575864ba0af`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (glowing-effect-1.tsx) | [open](http://localhost:38473/p/glowing-effect/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/glowing-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/glowing-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/glowing-effect--1--mobile-reduced.png) |
| 2 | yes (glowing-effect-2.tsx) | [open](http://localhost:38473/p/glowing-effect/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/glowing-effect--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/glowing-effect--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/glowing-effect--2--mobile-reduced.png) |

### Glowing Stars — `glowing-stars`

**What it renders:** glowing-stars component for React/Next.js
**Motion and lifecycle:** Five stars brighten and pulse for about two seconds, with staggered delays; they are randomly reassigned every three seconds and all light while the card is hovered.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `glowing` `hover-triggered` `stars` `svg-or-path` `timer-driven`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/glowing-stars-effect) · [Official registry JSON](https://ui.aceternity.com/registry/glowing-stars.json) · registry SHA-256 `fc9ad1c32e8c57367e66583d499438ed784192136454269787e66ddc761c26ee` · cached source SHA-256 `e69fe3e5d991a7ba96544db11afd92b8363526f4fa4f9b73f21c5fb527a938c5`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (glowing-stars.tsx) | [open](http://localhost:38473/p/glowing-stars/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/glowing-stars--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/glowing-stars--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/glowing-stars--1--mobile-reduced.png) |

### Gooey Input — `gooey-input`

**What it renders:** A search-style input that expands with a gooey SVG filter and shared layout animation
**Motion and lifecycle:** Clicking the compact control expands the search field through a shared-layout transition; submit/close returns it to the compact state.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `click-triggered` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `form` `gooey` `input` `navigation` `special` `spring-settling` `svg-or-path` `utility` `utility` `form` `navigation` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `placeholder`, `className`, `classNames`, `collapsedWidth`, `expandedWidth`, `expandedOffset`, `gooeyBlur`, `value`, `defaultValue`, `onValueChange`, `onOpenChange`, `disabled`.
**Source:** [Official docs](https://ui.aceternity.com/components/gooey-input) · [Official registry JSON](https://ui.aceternity.com/registry/gooey-input.json) · registry SHA-256 `8aafc99e29861f0e293bd5271f2a2636f475642036c98288c84f937cf53f504d` · cached source SHA-256 `4e1a126cb6b621e911c99f0fafac2efc213d16802d145ed5f71cfa84131409e2`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (gooey-input.tsx) | [open](http://localhost:38473/p/gooey-input/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/gooey-input--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/gooey-input--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/gooey-input--1--mobile-reduced.png) |

### Google Gemini Effect — `google-gemini-effect`

**What it renders:** An effect of SVGs as seen on the Google Gemini Website
**Motion and lifecycle:** The visual responds to page scroll and progresses with the reader’s position. SVG paths or masks provide the moving/revealing layer.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `effect` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `footer` `gemini` `google` `scroll-linked` `scroll-triggered` `section` `special` `svg-or-path` `footer` `section` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/google-gemini-effect) · [Official registry JSON](https://ui.aceternity.com/registry/google-gemini-effect.json) · registry SHA-256 `9487d0e6a487582b83f66f23a2b9f7896a330e8e903be5706a46c5a03ca57bd0` · cached source SHA-256 `168631363d80f7c7654391273753594bcf1eb735cc9ea37909a394f3193eafe4`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (google-gemini-effect.tsx) | [open](http://localhost:38473/p/google-gemini-effect/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/google-gemini-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/google-gemini-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/google-gemini-effect--1--mobile-reduced.png) |

### Grid — `grid`

**What it renders:** A black grid-pattern background with centered content; decorative and static in the published source.
**Motion and lifecycle:** Static repeating grid; no motion or user trigger in the source-only example.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `grid`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/grid) · [Official registry JSON](https://ui.aceternity.com/registry/grid.json) · registry SHA-256 `755b3dfecce3d56b725941f584cc1d093c14286f3c8d7d2d77106bb199e3a249` · cached source SHA-256 `bebff9cd82d0d330a18f6e9fddbd570cd09006b5246823a375663b34cbd3d8c8`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| source | no — source-only wrapper | [open](http://localhost:38473/c/grid) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/grid--source--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/grid--source--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/grid--source--mobile-reduced.png) |

### Hero Highlight — `hero-highlight`

**What it renders:** A background effect with a text highlight component, perfect for hero sections.
**Motion and lifecycle:** Pointer movement positions a dotted SVG pattern over the words; the pattern fades in on hover and follows the cursor within the text area.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `background` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `hero` `highlight` `hover-triggered` `pointer-tracking` `section` `special` `text` `hero` `section` `special` `text` `background`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/hero-highlight) · [Official registry JSON](https://ui.aceternity.com/registry/hero-highlight.json) · registry SHA-256 `0090a13cc08d7c8762daacce9f9e75788df08d611420a231c5405777198af047` · cached source SHA-256 `22ba0ea6a206dfef79d266c296eac3d542df6cbfa1378a977d4986b00f575616`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (hero-highlight.tsx) | [open](http://localhost:38473/p/hero-highlight/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/hero-highlight--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/hero-highlight--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/hero-highlight--1--mobile-reduced.png) |

### Hero Parallax — `hero-parallax`

**What it renders:** A scroll effect with rotation, translation and opacity animations.
**Motion and lifecycle:** Layered content translates, scales, and fades with page scroll; its effect depends on a tall, controlled hero section.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `hero` `hover-triggered` `parallax` `scroll-linked` `scroll-triggered` `section` `special` `spring-settling` `three-dimensional` `hero` `section` `special` `parallax`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/hero-parallax) · [Official registry JSON](https://ui.aceternity.com/registry/hero-parallax.json) · registry SHA-256 `fd04ac21350b519740fc2e08ca8b1e5e3d928c1f23dd29468f6caabb474aa891` · cached source SHA-256 `3e700ea48e38831f35fa7b3c7e61cc438af3ae8a6de585314a12291b4312e142`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (hero-parallax.tsx) | [open](http://localhost:38473/p/hero-parallax/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/hero-parallax--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/hero-parallax--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/hero-parallax--1--mobile-reduced.png) |

### Hover Border Gradient — `hover-border-gradient`

**What it renders:** A hover effect that expands to the entire container with a gradient border.
**Motion and lifecycle:** On hover, a moving gradient travels around the pill-shaped border; while idle, its direction advances on a short interval, then settles when hovered.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `border` `button` `card` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `gradient` `hover` `hover-triggered` `svg-or-path` `timer-driven` `utility` `hover` `card` `utility` `button`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/hover-border-gradient) · [Official registry JSON](https://ui.aceternity.com/registry/hover-border-gradient.json) · registry SHA-256 `d1adc254f1bb18386598ae6afe930a4a12069e963184159fad4e4b8f797da5bf` · cached source SHA-256 `587453eb0ab551fe3ac444ea017d4e9620a212ef5dde20dd943619db5850d0a7`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (hover-border-gradient.tsx) | [open](http://localhost:38473/p/hover-border-gradient/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/hover-border-gradient--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/hover-border-gradient--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/hover-border-gradient--1--mobile-reduced.png) |

### Hover Effect — `card-hover-effect`

**What it renders:** Hover over the cards and the effect slides to the currently hovered card.
**Motion and lifecycle:** Hover starts the visible state and pointer leave returns or dismisses it.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `card` `effect` `external-dependencies` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover` `hover-triggered` `special` `card` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/card-hover-effect) · [Official registry JSON](https://ui.aceternity.com/registry/card-hover-effect.json) · registry SHA-256 `6f9451d50fdce14344c0fbab29f8f47ac29bd11d11dc11fb95f3fc94bce271af` · cached source SHA-256 `af736705935d3cda78f5ec03d23c808ed52e881902f0d03180b194a9cf67c309`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (card-hover-effect.tsx) | [open](http://localhost:38473/p/card-hover-effect/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/card-hover-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/card-hover-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/card-hover-effect--1--mobile-reduced.png) |

### Image Generation Loader — `image-generation-loader`

**What it renders:** A canvas loader that scans across an image with animated pixel grids, text masks, and progress overlays.
**Motion and lifecycle:** Canvas/pixel layers sweep across an image and update the progress overlay; the examples use different visual progress treatments.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `animation` `canvas` `canvas-rendering` `flozio:functional-ui` `flozio:not-a-marketing-visual` `generation` `image` `loader` `reduced-motion-aware` `timer-driven` `loader` `canvas` `image` `animation`
**Dependencies:** `react`. **Declared prop names:** `className`, `cellSize`, `gap`, `bandHeight`, `duration`, `effect`, `waveAmplitude`, `scaleAmplitude`, `colors`, `text`, `textLetterSpacing`, `textWordSpacing`, `overlayOpacity`, `overlayExitDuration`, `easing`.
**Source:** [Official docs](https://ui.aceternity.com/components/image-generation-loader) · [Official registry JSON](https://ui.aceternity.com/registry/image-generation-loader.json) · registry SHA-256 `bedd7580632c6c0906c9660da7ff1c1f934839af98059a93cb0675574a961359` · cached source SHA-256 `4b22af88a23992c561cb6bce732b7fd9be46e021c9be29d2185c64a7adc0f715`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support found in source.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (image-generation-loader-1.tsx) | [open](http://localhost:38473/p/image-generation-loader/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--1--mobile-reduced.png) |
| 2 | yes (image-generation-loader-2.tsx) | [open](http://localhost:38473/p/image-generation-loader/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--2--mobile-reduced.png) |
| 3 | yes (image-generation-loader-3.tsx) | [open](http://localhost:38473/p/image-generation-loader/3) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--3--mobile-reduced.png) |
| 4 | yes (image-generation-loader-4.tsx) | [open](http://localhost:38473/p/image-generation-loader/4) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/image-generation-loader--4--mobile-reduced.png) |

### Images Badge — `images-badge`

**What it renders:** A badge with images that can be hovered to reveal more images.
**Motion and lifecycle:** Hovering the badge fans its small image stack upward and outward with staggered rotation; leaving gathers the images back into the badge.
**Flozio fit:** `conditional-approved-proof` — Use only with approved, real customer quotes or verified outcomes. The published examples contain placeholder or third-party claims and are not Flozio proof.
**Tags:** `background` `badge` `call to action` `card` `flozio:customer-proof-requires-approval` `flozio:requires-real-data` `gradient` `hover-triggered` `images` `special` `spring-settling` `three-dimensional` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `text`, `images`, `className`, `href`, `target`, `folderSize`, `teaserImageSize`, `hoverImageSize`, `hoverTranslateY`, `hoverSpread`, `hoverRotation`.
**Source:** [Official docs](https://ui.aceternity.com/components/images-badge) · [Official registry JSON](https://ui.aceternity.com/registry/images-badge.json) · registry SHA-256 `f85e2ea9ecab4db9b9349552bfe765271a91e341e45dd088c8dc74d7c24f7cc0` · cached source SHA-256 `fff13566e4ab29c761de8fb4cee8dba311ce7a3a28ddfb80b217d84f7a3d4973`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (images-badge-1.tsx) | [open](http://localhost:38473/p/images-badge/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/images-badge--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/images-badge--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/images-badge--1--mobile-reduced.png) |
| 2 | yes (images-badge-2.tsx) | [open](http://localhost:38473/p/images-badge/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/images-badge--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/images-badge--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/images-badge--2--mobile-reduced.png) |
| 3 | yes (images-badge-3.tsx) | [open](http://localhost:38473/p/images-badge/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/images-badge--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/images-badge--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/images-badge--3--mobile-reduced.png) |
| 4 | yes (images-badge-4.tsx) | [open](http://localhost:38473/p/images-badge/4) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/images-badge--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/images-badge--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/images-badge--4--mobile-reduced.png) |
| 5 | yes (images-badge-5.tsx) | [open](http://localhost:38473/p/images-badge/5) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/images-badge--5--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/images-badge--5--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/images-badge--5--mobile-reduced.png) |

### Images Slider — `images-slider`

**What it renders:** A full page slider with images that can be navigated with the keyboard.
**Motion and lifecycle:** Image panels form a layered 3D stack; keyboard input drives the configured visual state while the demo also animates its reveal on mount.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `images` `keyboard-input` `product` `slider` `special` `three-dimensional` `timer-driven` `features` `product` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/images-slider) · [Official registry JSON](https://ui.aceternity.com/registry/images-slider.json) · registry SHA-256 `17219d621de7d7562b06fc727fe5b1a759eea0860311851b54289b4a2122a808` · cached source SHA-256 `dbc41d3dee94c121daaf44c2c58e4578d125c95f040e4fd7a8f6518b9ca64a9a`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (images-slider.tsx) | [open](http://localhost:38473/p/images-slider/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/images-slider--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/images-slider--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/images-slider--1--mobile-reduced.png) |

### Infinite Moving Cards — `infinite-moving-cards`

**What it renders:** A customizable group of cards that move infinitely in a loop. Made with Framer Motion and Tailwind CSS.
**Motion and lifecycle:** Cards translate continuously in a looping marquee; the direction and speed are configurable and pause-on-hover is available.
**Flozio fit:** `conditional-approved-proof` — Use only with approved, real customer quotes or verified outcomes. The published examples contain placeholder or third-party claims and are not Flozio proof.
**Tags:** `cards` `flozio:customer-proof-requires-approval` `flozio:requires-real-data` `hover-triggered` `infinite` `marquee` `moving` `testimonials` `utility` `testimonials` `utility` `marquee`
**Dependencies:** `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/infinite-moving-cards) · [Official registry JSON](https://ui.aceternity.com/registry/infinite-moving-cards.json) · registry SHA-256 `bc236e642c309e3a08877adff51d2eb32182c727d5f7132e8f5f9aaacaf1c742` · cached source SHA-256 `428312dab8233d627625e1b27d34709ac603a5d13fa12bcb0928a801d11031fc`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (infinite-moving-cards.tsx) | [open](http://localhost:38473/p/infinite-moving-cards/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/infinite-moving-cards--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/infinite-moving-cards--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/infinite-moving-cards--1--mobile-reduced.png) |

### Input — `input`

**What it renders:** A text input with a motion-driven highlight that responds to pointer movement; a form control, not a standalone illustration.
**Motion and lifecycle:** Pointer coordinates drive the active surface or visual position. Hover starts the visible state and pointer leave returns or dismisses it.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `input` `pointer-tracking`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/input) · [Official registry JSON](https://ui.aceternity.com/registry/input.json) · registry SHA-256 `8e1d9209741a5a8aac7f0d314d2ae4ca2e071a4f6faa595c1df5b0f81845cb53` · cached source SHA-256 `07d015c40c7ea00c108df95dc80d50c52c74aafe900ec48f7ed33058ade5fe6e`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| source | no — source-only wrapper | [open](http://localhost:38473/c/input) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/input--source--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/input--source--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/input--source--mobile-reduced.png) |

### Keyboard — `keyboard`

**What it renders:** A mac style keyboard component with mechanical keys sound effects.
**Motion and lifecycle:** Mouse or physical key presses depress the corresponding on-screen key; configured keys can trigger short sounds, and release raises the key.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `background` `call to action` `card` `external-dependencies` `flozio:requires-real-product-visual` `flozio:system-of-action` `gradient` `hover-triggered` `keyboard` `keyboard-input` `special` `spring-settling` `svg-or-path` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/keyboard) · [Official registry JSON](https://ui.aceternity.com/registry/keyboard.json) · registry SHA-256 `43026e27d855e2db85e58cfad88dbdf3ce5d3a05ba7ae44293bbc92f80e52244` · cached source SHA-256 `a0ba174c681f87f53f96536ad1b584768f5a3aa89bf39ff145d4003174b08f60`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (keyboard-1.tsx) | [open](http://localhost:38473/p/keyboard/1) | press | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/keyboard--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/keyboard--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/keyboard--1--mobile-reduced.png) |
| 2 | yes (keyboard-2.tsx) | [open](http://localhost:38473/p/keyboard/2) | press | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/keyboard--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/keyboard--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/keyboard--2--mobile-reduced.png) |
| 3 | yes (keyboard-3.tsx) | [open](http://localhost:38473/p/keyboard/3) | press | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/keyboard--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/keyboard--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/keyboard--3--mobile-reduced.png) |
| 4 | yes (keyboard-4.tsx) | [open](http://localhost:38473/p/keyboard/4) | press | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/keyboard--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/keyboard--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/keyboard--4--mobile-reduced.png) |

**Notes:** Keyboard audio is optional; the official sound sprite and config were loaded from Aceternity docs into ignored local cache for this audit.

### Label — `label`

**What it renders:** An accessible label primitive built on Radix; it has no standalone animation or visual treatment.
**Motion and lifecycle:** Static treatment in the inspected source/example; no animated lifecycle or user trigger was found.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `label`
**Dependencies:** `@radix-ui/react-label`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/label) · [Official registry JSON](https://ui.aceternity.com/registry/label.json) · registry SHA-256 `9d4dea1eb3cdbf1a48ab515ba3b06df551296074f126d9831a5d6e2f71bed355` · cached source SHA-256 `0e7dbd95b199d23704af5c4b5517fabc1595ef3dea448b9a0158654d1765ac4b`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| source | no — source-only wrapper | [open](http://localhost:38473/c/label) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/label--source--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/label--source--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/label--source--mobile-reduced.png) |

### Lamp — `lamp`

**What it renders:** lamp component for React/Next.js
**Motion and lifecycle:** When the lamp enters the viewport, the cyan light cone, core glow, beam, and heading widen or rise from their initial state after a 0.3 second delay; each settles over 0.8 seconds.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `lamp`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/lamp-effect) · [Official registry JSON](https://ui.aceternity.com/registry/lamp.json) · registry SHA-256 `197f13356996a51b253e953da656c71dc3cb3e7d1a967603d5656dd314b45758` · cached source SHA-256 `dfbfe0609b4a9e48912ce44601e77a478b7b7b145de34a0163e124de4e86862f`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (lamp.tsx) | [open](http://localhost:38473/p/lamp/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/lamp--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/lamp--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/lamp--1--mobile-reduced.png) |

### Layout Grid — `layout-grid`

**What it renders:** A layout effect that animates the grid item on click, powered by framer motion layout
**Motion and lifecycle:** Clicking a tile expands it into a selected detail view; the image layout animates between grid and focused panel, and clicking the detail closes it.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `click-or-toggle` `click-triggered` `external-dependencies` `features` `flozio:deal-progression` `flozio:workflow-explainer` `grid` `layout` `product` `section` `special` `section` `features` `special` `product`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/layout-grid) · [Official registry JSON](https://ui.aceternity.com/registry/layout-grid.json) · registry SHA-256 `234bfebc536af7cc6725cdb7c6ffa7270171c06a34c7ee0941ecbb2c58c2f6dc` · cached source SHA-256 `e354ed1870c324a9a665db35809b92cf3306f744c507722f5e67d8ab330448c2`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (layout-grid.tsx) | [open](http://localhost:38473/p/layout-grid/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/layout-grid--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/layout-grid--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/layout-grid--1--mobile-reduced.png) |

### Layout Text Flip — `layout-text-flip`

**What it renders:** A text flip effect that changes the layout of surrounding text
**Motion and lifecycle:** Words swap with a layout transition so surrounding content changes position with the word’s size.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `effect` `external-dependencies` `flip` `flozio:copy-accent` `flozio:editorial` `hero` `layout` `text` `timer-driven` `text` `hero` `effect`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/layout-text-flip) · [Official registry JSON](https://ui.aceternity.com/registry/layout-text-flip.json) · registry SHA-256 `85f079761b9ee385443deb0a086ccc987f9d0f427336965ff196c09a95b948d1` · cached source SHA-256 `7eb45448a2815b4f86492cf6192ff5a9ae4c15cd995b9a70199b7f40ba5393d4`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (layout-text-flip.tsx) | [open](http://localhost:38473/p/layout-text-flip/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/layout-text-flip--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/layout-text-flip--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/layout-text-flip--1--mobile-reduced.png) |

### Lens — `lens`

**What it renders:** A lens component to zoom into images, videos, or practically anything.
**Motion and lifecycle:** Dragging across the media moves a magnifying lens that enlarges the content beneath it; variants show image and content treatments.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `cards` `content` `effects` `external-dependencies` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `lens` `pointer-tracking` `special` `svg-or-path` `content` `special` `effects` `cards`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `children`, `zoomFactor`, `lensSize`, `position`, `isStatic`, `isFocusing`, `hovering`, `setHovering`.
**Source:** [Official docs](https://ui.aceternity.com/components/lens) · [Official registry JSON](https://ui.aceternity.com/registry/lens.json) · registry SHA-256 `3c7a790fd4b0c3d5d126ac0a5f91186480e0ac945ee3779b755fe3b396e56f83` · cached source SHA-256 `873148d3feed8f2241ab707d2a5a37d1f5ee1113f81b08919f1ff0e5dbf8e662`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (lens-1.tsx) | [open](http://localhost:38473/p/lens/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/lens--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/lens--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/lens--1--mobile-reduced.png) |
| 2 | yes (lens-2.tsx) | [open](http://localhost:38473/p/lens/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/lens--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/lens--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/lens--2--mobile-reduced.png) |
| 3 | yes (lens-3.tsx) | [open](http://localhost:38473/p/lens/3) | hover | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/lens--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/lens--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/lens--3--mobile-reduced.png) |
| 4 | yes (lens-4.tsx) | [open](http://localhost:38473/p/lens/4) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/lens--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/lens--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/lens--4--mobile-reduced.png) |

### Link Preview — `link-preview`

**What it renders:** Dynamic link previews for your anchor tags
**Motion and lifecycle:** Pointer coordinates drive the active surface or visual position. Hover starts the visible state and pointer leave returns or dismisses it. Motion values settle with spring-based transitions.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `link` `pointer-tracking` `preview` `special` `spring-settling` `text` `utilities` `text` `special` `utilities`
**Dependencies:** `@radix-ui/react-hover-card`, `motion/react`, `qss`, `react`. **Declared prop names:** `children`, `url`, `className`, `width`, `height`, `quality`, `layout`.
**Source:** [Official docs](https://ui.aceternity.com/components/link-preview) · [Official registry JSON](https://ui.aceternity.com/registry/link-preview.json) · registry SHA-256 `cd63f8210b07d4308aa1061b8cf0b79100cdd66b4d34a9b0ce286bf616fa9c8c` · cached source SHA-256 `c140609b59685342ed3b62bf7d5d90ac5ca099ed90fbb7cda1fe6c2dedd46475`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (link-preview-1.tsx) | [open](http://localhost:38473/p/link-preview/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/link-preview--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/link-preview--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/link-preview--1--mobile-reduced.png) |
| 2 | yes (link-preview-2.tsx) | [open](http://localhost:38473/p/link-preview/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/link-preview--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/link-preview--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/link-preview--2--mobile-reduced.png) |

### Liquid Glass — `liquid-glass`

**What it renders:** A glass surface that refracts the content behind it, with a curved rim, color fringing and a frosted fallback for every browser.
**Motion and lifecycle:** Dragging the glass surface changes its refractive offset and color fringe; the frosted fallback stays visible when the effect is reduced.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `canvas-rendering` `click-or-toggle` `click-triggered` `drag-or-gesture` `drag-triggered` `effects` `flozio:requires-real-product-visual` `flozio:system-of-action` `glass` `hover-triggered` `interactive` `liquid` `reduced-motion-aware` `special` `spring-settling` `svg-or-path` `special` `effects` `interactive`
**Dependencies:** `react`. **Declared prop names:** `width`, `height`, `radius`, `bevelDepth`, `gain`, `light`, `dpr`, `id`, `mapUrl`, `scale`, `aberration`, `frost`.
**Source:** [Official docs](https://ui.aceternity.com/components/liquid-glass) · [Official registry JSON](https://ui.aceternity.com/registry/liquid-glass.json) · registry SHA-256 `8469c921999806e69a15b7d60c965d4bbc4db0bbb9e83c7d6e800d4d3455abb3` · cached source SHA-256 `f72a0351d1bbeefa54680bfe10d3ed8d863ae48c5c1341ee2fefe745ed202a6c`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support found in source.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (liquid-glass-1.tsx) | [open](http://localhost:38473/p/liquid-glass/1) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/liquid-glass--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/liquid-glass--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/liquid-glass--1--mobile-reduced.png) |
| 2 | yes (liquid-glass-2.tsx) | [open](http://localhost:38473/p/liquid-glass/2) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/liquid-glass--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/liquid-glass--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/liquid-glass--2--mobile-reduced.png) |
| 3 | yes (liquid-glass-3.tsx) | [open](http://localhost:38473/p/liquid-glass/3) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/liquid-glass--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/liquid-glass--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/liquid-glass--3--mobile-reduced.png) |

### Loaders — `loader`

**What it renders:** A set of simple and minimal loaders for your loading screens and components.
**Motion and lifecycle:** The published examples show small loaders whose dots or marks repeat staggered opacity, scale, or rotation cycles until removed.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `flozio:functional-ui` `flozio:not-a-marketing-visual` `loader` `loaders` `loading` `repeating-animation` `three-dimensional` `loaders` `loader` `loading`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/loader) · [Official registry JSON](https://ui.aceternity.com/registry/loader.json) · registry SHA-256 `2d777a751e1bfd6aaa9b2ca4a92e7c27d2d2522beba91cba8de9f0beb5619501` · cached source SHA-256 `571e40326045bd67d54a4aede52ca6a2db4bfd5685eca0d2ec9e193b2a0243bb`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (loader-1.tsx) | [open](http://localhost:38473/p/loader/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/loader--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/loader--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/loader--1--mobile-reduced.png) |
| 2 | yes (loader-2.tsx) | [open](http://localhost:38473/p/loader/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/loader--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/loader--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/loader--2--mobile-reduced.png) |
| 3 | yes (loader-3.tsx) | [open](http://localhost:38473/p/loader/3) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/loader--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/loader--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/loader--3--mobile-reduced.png) |
| 4 | yes (loader-4.tsx) | [open](http://localhost:38473/p/loader/4) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/loader--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/loader--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/loader--4--mobile-reduced.png) |
| 5 | yes (loader-5.tsx) | [open](http://localhost:38473/p/loader/5) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/loader--5--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/loader--5--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/loader--5--mobile-reduced.png) |
| 6 | yes (loader-6.tsx) | [open](http://localhost:38473/p/loader/6) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/loader--6--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/loader--6--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/loader--6--mobile-reduced.png) |

### Magnetic Button — `magnetic-button`

**What it renders:** A button that subtly drifts toward the cursor as you hover, with a spring-based return when you leave.
**Motion and lifecycle:** Pointer coordinates drive the active surface or visual position. Hover starts the visible state and pointer leave returns or dismisses it. Click changes the visible state or selects an item. Motion values settle with spring-based transitions.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `button` `click-or-toggle` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover` `hover-triggered` `interaction` `magnetic` `pointer-tracking` `spring-settling` `button` `interaction` `hover`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/magnetic-button) · [Official registry JSON](https://ui.aceternity.com/registry/magnetic-button.json) · registry SHA-256 `cf50b980f4f8585c5fdd3bd2fa5ca1fa52bf1b24366cff91d7a23b6694c79416` · cached source SHA-256 `92960c6a3390d4a74da91de2eeb506da2930a532783aa4c99c78fcee01758181`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (magnetic-button.tsx) | [open](http://localhost:38473/p/magnetic-button/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/magnetic-button--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/magnetic-button--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/magnetic-button--1--mobile-reduced.png) |

### Meteor Effect — `meteors`

**What it renders:** A group of beams in the background of a container, sort of like meteors.
**Motion and lifecycle:** Meteor streaks travel diagonally across the panel on repeated, staggered paths and fade out between passes.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `card` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `meteors` `special` `svg-or-path` `testimonial` `card` `testimonial` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/meteors) · [Official registry JSON](https://ui.aceternity.com/registry/meteors.json) · registry SHA-256 `c46b9245e09d2039ec0baf256d2fb84957a034884e5a01e929f2a3f62366c794` · cached source SHA-256 `f5bacbd0e30396d56d0f14b08b48b33490095221f322a00ea68a6643c468eb92`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (meteors.tsx) | [open](http://localhost:38473/p/meteors/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/meteors--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/meteors--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/meteors--1--mobile-reduced.png) |

### Moving Border — `moving-border`

**What it renders:** A border that moves around the container. Perfect for making your buttons stand out.
**Motion and lifecycle:** A rotating gradient highlight travels around the border continuously; use the inner content as the real focus.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `border` `button` `card` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `moving` `pointer-tracking` `special` `svg-or-path` `utility` `button` `special` `card` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/moving-border) · [Official registry JSON](https://ui.aceternity.com/registry/moving-border.json) · registry SHA-256 `e44f978e969cb302619f73f09af8a26092163b6ec3db005fc49f1abaa5994186` · cached source SHA-256 `b1cf4ffc66cc3c220383fb0904d7505265bf65ebfbec2e714763114599ea8b25`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (moving-border.tsx) | [open](http://localhost:38473/p/moving-border/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/moving-border--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/moving-border--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/moving-border--1--mobile-reduced.png) |

### Moving Line — `moving-line`

**What it renders:** A scroll-driven SVG line travels down the page beside four content panels; the beam's position follows scroll progress.
**Motion and lifecycle:** Scroll-linked SVG stroke advances along the content path as the page scrolls; it is a process-story primitive, not a self-contained illustration.
**Flozio fit:** `strongest-story-fit` — A strong structural match for showing the closed learning loop: closed outcomes update fit, research, messaging, and future deal decisions. Use a real process diagram and Flozio copy around it.
**Tags:** `external-dependencies` `flozio:learning-loop` `flozio:workflow-explainer` `line` `moving` `pointer-tracking` `scroll-linked` `scroll-triggered` `spring-settling` `svg-or-path`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/moving-line) · [Official registry JSON](https://ui.aceternity.com/registry/moving-line.json) · registry SHA-256 `042912d7feedda3fcabcade4ffea54625b3ce5790b505549e658405ca7cdc856` · cached source SHA-256 `f5126c9d36a4a9350903f32339cac8f70a19dbd6d652f35edaf012203cc8640c`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| source | no — source-only wrapper | [open](http://localhost:38473/c/moving-line) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/moving-line--source--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/moving-line--source--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/moving-line--source--mobile-reduced.png) |

### Multi Step Loader — `multi-step-loader`

**What it renders:** A step loader for screens that take a lot of time to load.
**Motion and lifecycle:** The loader advances through supplied messages on a timer, animating the active line and progress between steps.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `click-triggered` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `loader` `multi` `special` `step` `svg-or-path` `timer-driven` `utility` `loader` `special` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/multi-step-loader) · [Official registry JSON](https://ui.aceternity.com/registry/multi-step-loader.json) · registry SHA-256 `9b664e381b2d96b55785aeb6e63c6a66d6f78d31452631d067fb74b60db06b73` · cached source SHA-256 `12abf9ff2c8b8893c57e85e9bee90b8eb2850b512aa1a150cdf38b00149a3d27`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (multi-step-loader.tsx) | [open](http://localhost:38473/p/multi-step-loader/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/multi-step-loader--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/multi-step-loader--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/multi-step-loader--1--mobile-reduced.png) |

### Navbar Menu — `navbar-menu`

**What it renders:** A navbar menu that animates its children on hover, makes a beautiful bignav
**Motion and lifecycle:** Hovering a top-level item opens a shared-layout mega-menu; the panel animates between items and exits when pointer leaves.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `menu` `navbar` `spring-settling` `utility` `navbar` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/navbar-menu) · [Official registry JSON](https://ui.aceternity.com/registry/navbar-menu.json) · registry SHA-256 `85ea288bcc5d8d7c1865ba6f9261a6691a0e810bfdfe9b7e546cd7cb70650c10` · cached source SHA-256 `6c9650ea81a0c364eb9cd06230ced52170de240518fb9426d5e495b9b5afb2cc`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (navbar-menu.tsx) | [open](http://localhost:38473/p/navbar-menu/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/navbar-menu--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/navbar-menu--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/navbar-menu--1--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Noise Background — `noise-background`

**What it renders:** A dynamic background effect with animated gradients, noise texture, and smooth motion.
**Motion and lifecycle:** A looping animated gradient sits beneath a noise texture; two variants change the gradient composition.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `call to action` `card` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `gradient` `noise` `pointer-tracking` `special` `spring-settling` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `children`, `className`, `containerClassName`, `gradientColors`, `noiseIntensity`, `speed`, `backdropBlur`, `animating`.
**Source:** [Official docs](https://ui.aceternity.com/components/noise-background) · [Official registry JSON](https://ui.aceternity.com/registry/noise-background.json) · registry SHA-256 `300027e3a76b893ce1e00ad0470dbd96bcf4481c7c8a6abfab115115e3e830ea` · cached source SHA-256 `fbedccf1bfdeaca7ddaa024948a791fcd7ff41364b11b6d854c10acdb28a54c8`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (noise-background-1.tsx) | [open](http://localhost:38473/p/noise-background/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/noise-background--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/noise-background--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/noise-background--1--mobile-reduced.png) |
| 2 | yes (noise-background-2.tsx) | [open](http://localhost:38473/p/noise-background/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/noise-background--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/noise-background--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/noise-background--2--mobile-reduced.png) |

### Notch — `notch`

**What it renders:** A floating, configurable notch that pins to the top or bottom of the screen. Pass an array of items with links and it animates the active state as you switch between them.
**Motion and lifecycle:** The floating top/bottom control opens its menu on click; choosing an alignment changes the notch position with a spring transition.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `click-triggered` `drag-or-gesture` `external-dependencies` `floating` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `keyboard-input` `navbar` `navigation` `notch` `spring-settling` `svg-or-path` `navigation` `navbar` `floating`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `items`, `position`, `align`, `onItemChange`, `closeOnSelect`, `showSelectedValue`, `showDividers`, `accentColor`, `offset`, `reveal`, `className`, `itemClassName`, `panelClassName`.
**Source:** [Official docs](https://ui.aceternity.com/components/notch) · [Official registry JSON](https://ui.aceternity.com/registry/notch.json) · registry SHA-256 `97c7c81ba98661db1ed1d4de279d677c88147ec9110865505110722d1aeddf48` · cached source SHA-256 `c61d87255e4e1658ab8f19a47524283e3428974e1f58aa20980de71bdd3af26c`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (notch.tsx) | [open](http://localhost:38473/p/notch/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/notch--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/notch--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/notch--1--mobile-reduced.png) |

### Parallax Grid Scroll — `parallax-scroll`

**What it renders:** A grid where two columns scroll in oposite directions, giving a parallax effect.
**Motion and lifecycle:** Two image columns move vertically at different rates during page scroll; the staggered depth is the core effect.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `card` `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `grid` `parallax` `scroll` `scroll-linked` `scroll-triggered` `section` `section` `parallax` `card` `grid`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/parallax-scroll) · [Official registry JSON](https://ui.aceternity.com/registry/parallax-scroll.json) · registry SHA-256 `970ef6a9ca48c63cd9780c0f43b5a559d794ae12dc768213bb209c76fce817cc` · cached source SHA-256 `bb2239b61315bc147d95baa59fd78bc58201d2a8955ddcd58746d2d0427794b6`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (parallax-scroll.tsx) | [open](http://localhost:38473/p/parallax-scroll/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/parallax-scroll--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/parallax-scroll--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/parallax-scroll--1--mobile-reduced.png) |

### Parallax Hero Images — `parallax-hero-images`

**What it renders:** Mouse-driven parallax effect, perfect for hero sections. Images blur fade in and move at different depths.
**Motion and lifecycle:** Layered image cards drift at different depths in response to pointer movement; both examples are media compositions.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `hero` `images` `parallax` `pointer-tracking` `section` `spring-settling` `hero` `parallax` `images` `section`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `images`, `className`, `imageClassName`, `variant`.
**Source:** [Official docs](https://ui.aceternity.com/components/parallax-hero-images) · [Official registry JSON](https://ui.aceternity.com/registry/parallax-hero-images.json) · registry SHA-256 `e26ae3506ecf1085b03a1acd41653ad5fbad992b500071132f78ba9309c85ce1` · cached source SHA-256 `b93bea939241620dbec43ad61d78e3928c309e1934c500e3689c67a19287ce11`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (parallax-hero-images-1.tsx) | [open](http://localhost:38473/p/parallax-hero-images/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/parallax-hero-images--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/parallax-hero-images--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/parallax-hero-images--1--mobile-reduced.png) |
| 2 | yes (parallax-hero-images-2.tsx) | [open](http://localhost:38473/p/parallax-hero-images/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/parallax-hero-images--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/parallax-hero-images--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/parallax-hero-images--2--mobile-reduced.png) |

### Parallax Scroll 2 — `parallax-scroll-2`

**What it renders:** parallax-scroll-2 component for React/Next.js
**Motion and lifecycle:** Image rows shift at separate scroll-linked rates; both published variants use page scroll to create depth.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `parallax` `scroll` `scroll-linked` `scroll-triggered` `three-dimensional`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/parallax-scroll) · [Official registry JSON](https://ui.aceternity.com/registry/parallax-scroll-2.json) · registry SHA-256 `ca327b960d1fb724c419f8657b9c9e7480fcbc9f2e6145dd05eb2a2fe83e776c` · cached source SHA-256 `508bacdeddb914de181fd5b7d91add8408ff8742ba062cfd9ddff9d7ac820bb1`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (parallax-scroll-2-1.tsx) | [open](http://localhost:38473/p/parallax-scroll-2/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/parallax-scroll-2--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/parallax-scroll-2--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/parallax-scroll-2--1--mobile-reduced.png) |
| 2 | yes (parallax-scroll-2-2.tsx) | [open](http://localhost:38473/p/parallax-scroll-2/2) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/parallax-scroll-2--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/parallax-scroll-2--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/parallax-scroll-2--2--mobile-reduced.png) |

### Pixelated Canvas — `pixelated-canvas`

**What it renders:** Convert any image to a pixelated canvas mouse distortion effects, as seen on Tailwind CSS Website.
**Motion and lifecycle:** The image is drawn as a grid of pixels; pointer movement locally repels, attracts, or swirls cells, and the current example also jitters pixels over time.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `3d` `background` `canvas` `canvas-rendering` `card` `drag-triggered` `flozio:requires-real-product-visual` `flozio:system-of-action` `pixelated` `pointer-tracking` `tilt` `timer-driven` `card` `3d` `tilt` `background`
**Dependencies:** `react`. **Declared prop names:** `src`, `width`, `height`, `cellSize`, `dotScale`, `shape`, `backgroundColor`, `grayscale`, `className`, `responsive`, `dropoutStrength`, `interactive`, `distortionStrength`, `distortionRadius`, `distortionMode`, `followSpeed`, `sampleAverage`, `tintColor`, `tintStrength`, `maxFps`, `objectFit`, `jitterStrength`, `jitterSpeed`, `fadeOnLeave`, `fadeSpeed`.
**Source:** [Official docs](https://ui.aceternity.com/components/pixelated-canvas) · [Official registry JSON](https://ui.aceternity.com/registry/pixelated-canvas.json) · registry SHA-256 `47d75c70c1a32ab27229369569860977b1eddc19b5351e72a6bf06f7dfa5faac` · cached source SHA-256 `3fb1d9ae52acfc02a126ec78e05d3aab75bf9d738287a6b634e657eebf5551d1`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (pixelated-canvas-1.tsx) | [open](http://localhost:38473/p/pixelated-canvas/1) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/pixelated-canvas--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/pixelated-canvas--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/pixelated-canvas--1--mobile-reduced.png) |
| 2 | yes (pixelated-canvas-2.tsx) | [open](http://localhost:38473/p/pixelated-canvas/2) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/pixelated-canvas--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/pixelated-canvas--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/pixelated-canvas--2--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Placeholders And Vanish Input — `placeholders-and-vanish-input`

**What it renders:** Sliding in placeholders and vanish effect of input on submit
**Motion and lifecycle:** Placeholder prompts rotate on a timer; submitting text animates characters away before the input resets.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `and` `canvas-rendering` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `form` `input` `keyboard-input` `placeholders` `section` `special` `svg-or-path` `timer-driven` `utility` `vanish` `utility` `form` `section` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/placeholders-and-vanish-input) · [Official registry JSON](https://ui.aceternity.com/registry/placeholders-and-vanish-input.json) · registry SHA-256 `770f5a15cd81c03c6684047715517966616589013895dfc0aa9fc1ca7f6d40bc` · cached source SHA-256 `0decb6b2f53e2896b784c0e3fedeaf8fdec60aa5cd3d4bcdea72a6d6d6d27e3d`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (placeholders-and-vanish-input.tsx) | [open](http://localhost:38473/p/placeholders-and-vanish-input/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/placeholders-and-vanish-input--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/placeholders-and-vanish-input--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/placeholders-and-vanish-input--1--mobile-reduced.png) |

### Pointer Highlight — `pointer-highlight`

**What it renders:** A component that highlights text when it's in view, with a pointer and border.
**Motion and lifecycle:** The cursor highlights selected text or color swatches through a local pointer-following overlay; text-only variants are static unless a hover target is present.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `highlight` `pointer` `svg-or-path` `text` `pointer` `highlight` `text`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/pointer-highlight) · [Official registry JSON](https://ui.aceternity.com/registry/pointer-highlight.json) · registry SHA-256 `c7e91d4111efda9f2ed6f4d36af7d2976d1ed9d9dc97a63905d56ab24cf08384` · cached source SHA-256 `e32a56b7eeb6dc4bfe8c05bc7c025310f26ab3d43aba6bbb22813b1a47960dc0`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (pointer-highlight-1.tsx) | [open](http://localhost:38473/p/pointer-highlight/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--1--mobile-reduced.png) |
| 2 | yes (pointer-highlight-2.tsx) | [open](http://localhost:38473/p/pointer-highlight/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--2--mobile-reduced.png) |
| 3 | yes (pointer-highlight-3.tsx) | [open](http://localhost:38473/p/pointer-highlight/3) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/pointer-highlight--3--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Resizable Navbar — `resizable-navbar`

**What it renders:** A navbar that changes width on scroll, responsive and animated.
**Motion and lifecycle:** The nav contracts from its full width into a smaller floating bar after scrolling; mobile and desktop use separate layouts.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `layout` `navbar` `navigation` `pointer-tracking` `resizable` `responsive` `scroll-linked` `scroll-triggered` `spring-settling` `navbar` `responsive` `navigation` `layout`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** `children`, `className`, `visible`, `items`, `onItemClick`, `isOpen`, `onClose`.
**Source:** [Official docs](https://ui.aceternity.com/components/resizable-navbar) · [Official registry JSON](https://ui.aceternity.com/registry/resizable-navbar.json) · registry SHA-256 `3294ecb0b3efacc058c190575a1bdacd9084f7b994812d4f3e3879b0ba5440f9` · cached source SHA-256 `d4188bfc54caef986fe5a91ffd3ede454a2ce8773d5dffba01fa6615d5d8a5af`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (resizable-navbar.tsx) | [open](http://localhost:38473/p/resizable-navbar/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/resizable-navbar--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/resizable-navbar--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/resizable-navbar--1--mobile-reduced.png) |

### Scales — `scales`

**What it renders:** A repeating diagonal, horizontal, or vertical line pattern background effect.
**Motion and lifecycle:** Static diagonal line-scale patterns; no motion trigger exists in the five published examples.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `pattern` `scales` `special` `background` `pattern` `special`
**Dependencies:** `react`. **Declared prop names:** `orientation`, `size`, `className`, `color`.
**Source:** [Official docs](https://ui.aceternity.com/components/scales) · [Official registry JSON](https://ui.aceternity.com/registry/scales.json) · registry SHA-256 `20757599d859c3af7aa7dd710e42fe14938f2406e71559ac218afac05df0f4a0` · cached source SHA-256 `0bc985c6bb477a5fda766bbe8747bbe6149aeb0409e7d507ac7bbe95c24ea691`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (scales-1.tsx) | [open](http://localhost:38473/p/scales/1) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/scales--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/scales--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/scales--1--mobile-reduced.png) |
| 2 | yes (scales-2.tsx) | [open](http://localhost:38473/p/scales/2) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/scales--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/scales--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/scales--2--mobile-reduced.png) |
| 3 | yes (scales-3.tsx) | [open](http://localhost:38473/p/scales/3) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/scales--3--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/scales--3--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/scales--3--mobile-reduced.png) |
| 4 | yes (scales-4.tsx) | [open](http://localhost:38473/p/scales/4) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/scales--4--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/scales--4--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/scales--4--mobile-reduced.png) |
| 5 | yes (scales-5.tsx) | [open](http://localhost:38473/p/scales/5) | wait | rendered; target found; no sampled pixel change; The inspected source/example is static for this variant; no motion is defined for the tested state.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/scales--5--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/scales--5--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/scales--5--mobile-reduced.png) |

### Shooting Stars — `shooting-stars`

**What it renders:** shooting-stars component for React/Next.js
**Motion and lifecycle:** Star streaks cross the background on staggered repeating paths and fade after passing through.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `canvas-rendering` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `shooting` `stars` `svg-or-path` `timer-driven`
**Dependencies:** `react`. **Declared prop names:** `minSpeed`, `maxSpeed`, `minDelay`, `maxDelay`, `starColor`, `trailColor`, `starWidth`, `starHeight`, `className`.
**Source:** [Official docs](https://ui.aceternity.com/components/shooting-stars-and-stars-background) · [Official registry JSON](https://ui.aceternity.com/registry/shooting-stars.json) · registry SHA-256 `b2fdbf73fa911fafdca9ca8f9fe262b0ae8da711faaed54a24b4c5c2f3dac0e0` · cached source SHA-256 `23da778568b618c0701b42f4b424335dfe7a0c82fe24c31a0e9ba16155fb1d38`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (shooting-stars.tsx) | [open](http://localhost:38473/p/shooting-stars/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/shooting-stars--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/shooting-stars--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/shooting-stars--1--mobile-reduced.png) |

### Sidebar — `sidebar`

**What it renders:** Expandable sidebar that expands on hover, mobile responsive and dark mode support
**Motion and lifecycle:** Hover or click expands/collapses the navigation rail; child items transition with the sidebar width.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `click-or-toggle` `dashboard` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `sidebar` `special` `utilities` `sidebar` `special` `utilities` `dashboard`
**Dependencies:** `@tabler/icons-react`, `motion/react`, `react`. **Declared prop names:** `open`, `setOpen`, `animate`.
**Source:** [Official docs](https://ui.aceternity.com/components/sidebar) · [Official registry JSON](https://ui.aceternity.com/registry/sidebar.json) · registry SHA-256 `df9cbde825e234d19b781c9595c63037decd86714a28ce7a2e3eb6403146877b` · cached source SHA-256 `0ff0812bd2e8ee8fb98d516004c46dfecd7d5bd2cf03b191c1a8d983d815d0ef`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (sidebar-1.tsx) | [open](http://localhost:38473/p/sidebar/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sidebar--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sidebar--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sidebar--1--mobile-reduced.png) |
| 2 | yes (sidebar-2.tsx) | [open](http://localhost:38473/p/sidebar/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sidebar--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sidebar--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sidebar--2--mobile-reduced.png) |

### Sparkles — `sparkles`

**What it renders:** A configurable sparkles component that can be used as a background or as a standalone component.
**Motion and lifecycle:** A particle field emits small twinkling points around the content; particles loop continuously, while examples change size and density.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `call to action` `click-or-toggle` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `hero` `hover-triggered` `section` `sparkles` `special` `section` `special` `call to action` `hero`
**Dependencies:** `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim`, `motion/react`, `react`. **Declared prop names:** `id`, `className`, `background`, `particleSize`, `minSize`, `maxSize`, `speed`, `particleColor`, `particleDensity`.
**Source:** [Official docs](https://ui.aceternity.com/components/sparkles) · [Official registry JSON](https://ui.aceternity.com/registry/sparkles.json) · registry SHA-256 `34f145078d73302c79960f0f049804bbd47f75a7459ac97ef079e1f67d79fc22` · cached source SHA-256 `4b37534984e393929bc7af6ef292affc9a5b416fd3549fc4c4941ca568a7e03e`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (sparkles-1.tsx) | [open](http://localhost:38473/p/sparkles/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sparkles--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sparkles--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sparkles--1--mobile-reduced.png) |
| 2 | yes (sparkles-2.tsx) | [open](http://localhost:38473/p/sparkles/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sparkles--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sparkles--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sparkles--2--mobile-reduced.png) |

### Spotlight — `spotlight`

**What it renders:** A spotlight effect with Tailwind CSS, good for drawing attention to a particular element on the page.
**Motion and lifecycle:** A large blurred SVG ellipse sweeps into view with a one-time CSS keyframe animation; it does not follow the pointer or loop in the supplied example.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `footer` `hero` `section` `special` `spotlight` `svg-or-path` `hero` `footer` `section` `special`
**Dependencies:** `react`. **Declared prop names:** `className`, `fill`.
**Source:** [Official docs](https://ui.aceternity.com/components/spotlight) · [Official registry JSON](https://ui.aceternity.com/registry/spotlight.json) · registry SHA-256 `8fb8ccb5bff388c48df583cd15be9562f4d8adf3f7223d8a636a51c52f6f1d7e` · cached source SHA-256 `5bf5e3c43a1dab43e6e0ac56c4783132608b91a2fabdc4a61b2b961ef519093d`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (spotlight.tsx) | [open](http://localhost:38473/p/spotlight/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/spotlight--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/spotlight--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/spotlight--1--mobile-reduced.png) |

### Spotlight New — `spotlight-new`

**What it renders:** A new spotlight component with left and right spotlight, configurable and customizable.
**Motion and lifecycle:** Layered blurred spotlight shapes run repeating position and opacity keyframes independently, without a user trigger.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `footer` `hero` `new` `repeating-animation` `section` `special` `spotlight` `hero` `footer` `section` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `gradientFirst`, `gradientSecond`, `gradientThird`, `translateY`, `width`, `height`, `smallWidth`, `duration`, `xOffset`.
**Source:** [Official docs](https://ui.aceternity.com/components/spotlight-new) · [Official registry JSON](https://ui.aceternity.com/registry/spotlight-new.json) · registry SHA-256 `df03e25ac5d808013c5287e52caaec424120f4a5010f886304d3f7084707c2ed` · cached source SHA-256 `7231f31ab0df6269dfcfce011af4a4b03860b7e157c1cda8c3d329e9a8f12b44`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (spotlight-new.tsx) | [open](http://localhost:38473/p/spotlight-new/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/spotlight-new--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/spotlight-new--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/spotlight-new--1--mobile-reduced.png) |

### Squiggly Text — `squiggly-text`

**What it renders:** A squiggly text effect using SVG turbulence and displacement filters, animated with Motion.
**Motion and lifecycle:** The example applies a static SVG squiggle treatment under selected words; the supplied implementation has no motion trigger.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `features` `flozio:copy-accent` `flozio:editorial` `hero` `special` `squiggly` `svg-or-path` `text` `text` `special` `features` `hero`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `children`, `className`, `style`, `steps`, `stepDuration`, `scale`, `baseFrequency`, `numOctaves`, `as`.
**Source:** [Official docs](https://ui.aceternity.com/components/squiggly-text) · [Official registry JSON](https://ui.aceternity.com/registry/squiggly-text.json) · registry SHA-256 `be1ef9e7d967d9425ab7b30f8190cf67b56a04eca92ffaad4d814f4bda4191c1` · cached source SHA-256 `7e99133897d9970938a95d3b27966dd1c4dc714519e118c878895de8ed40f783`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (squiggly-text.tsx) | [open](http://localhost:38473/p/squiggly-text/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/squiggly-text--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/squiggly-text--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/squiggly-text--1--mobile-reduced.png) |

### Stars Background — `stars-background`

**What it renders:** stars-background component for React/Next.js
**Motion and lifecycle:** Stars twinkle through staggered opacity/scale loops; the field runs continuously without user input.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `canvas-rendering` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `stars` `timer-driven`
**Dependencies:** `react`. **Declared prop names:** `x`, `y`, `radius`, `opacity`, `twinkleSpeed`, `starDensity`, `allStarsTwinkle`, `twinkleProbability`, `minTwinkleSpeed`, `maxTwinkleSpeed`, `className`.
**Source:** [Official docs](https://ui.aceternity.com/components/shooting-stars-and-stars-background) · [Official registry JSON](https://ui.aceternity.com/registry/stars-background.json) · registry SHA-256 `06c5a30931d3db2baa1482c65a383757dacce15c18aaaced35f57bf7890d2229` · cached source SHA-256 `82801c3eb4f966e6e31a6c24ab629137e7e6db14dfcc142553ccc33821fde3c6`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (stars-background.tsx) | [open](http://localhost:38473/p/stars-background/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/stars-background--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/stars-background--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/stars-background--1--mobile-reduced.png) |

### Stateful Button — `stateful-button`

**What it renders:** A button that shows a loading state when clicked, and a success state when the action is completed.
**Motion and lifecycle:** Clicking the button moves it through loading and success states, then returns to its resting state after the configured delay.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `button` `click-or-toggle` `click-triggered` `drag-or-gesture` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `loading` `repeating-animation` `stateful` `svg-or-path` `timer-driven` `button` `stateful` `loading`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/stateful-button) · [Official registry JSON](https://ui.aceternity.com/registry/stateful-button.json) · registry SHA-256 `a56addb268e991c0db018e20dbee7fb00ef9e0a3991053d696e765848c866b66` · cached source SHA-256 `b19e3cee5986e376b9bffb740b77747ffd3c149d150c9e36b73c395ba7cb2ef9`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (stateful-button.tsx) | [open](http://localhost:38473/p/stateful-button/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/stateful-button--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/stateful-button--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/stateful-button--1--mobile-reduced.png) |

### Sticky Banner — `sticky-banner`

**What it renders:** A banner component that sticks to top, hides when user scrolls down
**Motion and lifecycle:** The banner pins to the viewport edge and hides while scrolling down, then returns when the user scrolls upward.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `banner` `click-or-toggle` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hero` `hover-triggered` `pointer-tracking` `scroll-linked` `scroll-triggered` `sticky` `svg-or-path` `banner` `sticky` `hero`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/sticky-banner) · [Official registry JSON](https://ui.aceternity.com/registry/sticky-banner.json) · registry SHA-256 `3ca7a8577d2677377deb0205607553d3f121b20ff034d8952c4b868da3ddf5a7` · cached source SHA-256 `9708595c9af677b09f9260d0b0be5d1a11a5a6108269ceecdfa5d07e5348bb70`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (sticky-banner-1.tsx) | [open](http://localhost:38473/p/sticky-banner/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sticky-banner--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sticky-banner--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sticky-banner--1--mobile-reduced.png) |
| 2 | yes (sticky-banner-2.tsx) | [open](http://localhost:38473/p/sticky-banner/2) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sticky-banner--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sticky-banner--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sticky-banner--2--mobile-reduced.png) |

### Sticky Scroll Reveal — `sticky-scroll-reveal`

**What it renders:** A sticky container that sticks while scrolling, text reveals on scroll
**Motion and lifecycle:** A pinned section reveals successive text or panels as the user scrolls through its height.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `parallax` `pointer-tracking` `reveal` `scroll` `scroll-linked` `scroll-triggered` `section` `special` `sticky` `special` `parallax` `section`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/sticky-scroll-reveal) · [Official registry JSON](https://ui.aceternity.com/registry/sticky-scroll-reveal.json) · registry SHA-256 `24168fbc0b5b70903621f0601849ab6566d477cf0f6b9bbe7b7d1aa7b2671e60` · cached source SHA-256 `93dc4f8da9225f1df23bcf7e2567c1267062340ea00f91e0d8ed3573f711bce5`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (sticky-scroll-reveal.tsx) | [open](http://localhost:38473/p/sticky-scroll-reveal/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/sticky-scroll-reveal--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/sticky-scroll-reveal--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/sticky-scroll-reveal--1--mobile-reduced.png) |

### SVG Mask Effect — `svg-mask-effect`

**What it renders:** A mask reveal effect, hover the cursor over a container to reveal what's underneath.
**Motion and lifecycle:** Hovering the text enlarges a circular SVG mask and tracks it with pointer movement to reveal the second text layer; pointer leave shrinks it back.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `card` `effect` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `hover-triggered` `mask` `special` `svg` `card` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/svg-mask-effect) · [Official registry JSON](https://ui.aceternity.com/registry/svg-mask-effect.json) · registry SHA-256 `0421e93ec60da644c4fe263c24b3f631471642aeb4f3fec6052bf6e6c6106fa1` · cached source SHA-256 `8ce6017e2f55eeb266ba459f7c5bb73f54678f9693a026fe2ec55bddbe902506`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (svg-mask-effect.tsx) | [open](http://localhost:38473/p/svg-mask-effect/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/svg-mask-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/svg-mask-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/svg-mask-effect--1--mobile-reduced.png) |

### Tailwind CSS buttons — `tailwindcss-buttons`

**What it renders:** A curated list of awesome, battle tested Tailwind CSS buttons components
**Motion and lifecycle:** The sample buttons use distinct CSS hover and active treatments (color, shadow, gradient, and scale); effects begin on hover or press and settle on release.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `button` `buttons` `click-or-toggle` `external-dependencies` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `svg-or-path` `tailwindcss` `utility` `button` `utility`
**Dependencies:** `@tabler/icons-react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/tailwindcss-buttons) · [Official registry JSON](https://ui.aceternity.com/registry/tailwindcss-buttons.json) · registry SHA-256 `c1cc036411b81e550d5619ed693a72810f773bf865c85812b1f96f68017ddac6` · cached source SHA-256 `804df05a95ee6ff55dbbdfe7442fb39998ffa981437a23a2aebbfb913bd2fd27`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (tailwindcss-buttons.tsx) | [open](http://localhost:38473/p/tailwindcss-buttons/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/tailwindcss-buttons--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/tailwindcss-buttons--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/tailwindcss-buttons--1--mobile-reduced.png) |

### Terminal — `terminal`

**What it renders:** A mac style terminal component with bash syntax highlighting and typewriter effect.
**Motion and lifecycle:** The example types command and response text character by character, blinks the cursor, and scrolls as output grows; the timed sequence ends at its final prompt.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `background` `card` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `illustration` `keyboard-input` `special` `terminal` `timer-driven` `card` `background` `special` `illustration`
**Dependencies:** `react`. **Declared prop names:** `commands`, `outputs`, `username`, `className`, `typingSpeed`, `delayBetweenCommands`, `initialDelay`, `enableSound`.
**Source:** [Official docs](https://ui.aceternity.com/components/terminal) · [Official registry JSON](https://ui.aceternity.com/registry/terminal.json) · registry SHA-256 `85db211dec21cc866129852f76114af1e2cf460de1015228c8abdd7107123a97` · cached source SHA-256 `a82abc1d669625f53e7465cc658276681ab0edf2b1005ace4b6d96599eb3fbbc`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (terminal.tsx) | [open](http://localhost:38473/p/terminal/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/terminal--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/terminal--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/terminal--1--mobile-reduced.png) |

### Text Flipping Board — `text-flipping-board`

**What it renders:** A split-flap display component that animates characters with flip transitions, inspired by Vestaboard.
**Motion and lifecycle:** Characters flip through a split-flap display transition when the displayed text changes.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `board` `external-dependencies` `flipping` `flozio:copy-accent` `flozio:editorial` `hero` `special` `text` `three-dimensional` `timer-driven` `text` `special` `hero`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** `rows`, `text`, `className`, `duration`.
**Source:** [Official docs](https://ui.aceternity.com/components/text-flipping-board) · [Official registry JSON](https://ui.aceternity.com/registry/text-flipping-board.json) · registry SHA-256 `e4f82aca57ab253b658f3f332138fc617bd5c9d0e59ff8f4ec2c01c892a3b75d` · cached source SHA-256 `f33799e3ab6e0a407d26330853131d3332cf2c882e8bd406a8c60e0c3574830f`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (text-flipping-board.tsx) | [open](http://localhost:38473/p/text-flipping-board/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/text-flipping-board--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/text-flipping-board--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/text-flipping-board--1--mobile-reduced.png) |

### Text Generate Effect — `text-generate-effect`

**What it renders:** A cool text effect that fades in text on page load, one by one.
**Motion and lifecycle:** Words appear in sequence with opacity/blur transitions on mount; variants change the generated text treatment.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `content` `effect` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `generate` `hero` `section` `special` `text` `text` `content` `hero` `section` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/text-generate-effect) · [Official registry JSON](https://ui.aceternity.com/registry/text-generate-effect.json) · registry SHA-256 `31f3b8c41b215c8e91a6068c03e63d18ba1b2f196d055827eec6b6cf593ced1f` · cached source SHA-256 `f2a73f7adcb16395da2323b2485b2eed0c59caddcdb3b6ac2c0fadae81d1c22f`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (text-generate-effect-1.tsx) | [open](http://localhost:38473/p/text-generate-effect/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/text-generate-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/text-generate-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/text-generate-effect--1--mobile-reduced.png) |
| 2 | yes (text-generate-effect-2.tsx) | [open](http://localhost:38473/p/text-generate-effect/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/text-generate-effect--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/text-generate-effect--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/text-generate-effect--2--mobile-reduced.png) |

### Text Hover Effect — `text-hover-effect`

**What it renders:** A text hover effect that animates and outlines gradient on hover, as seen on x.ai
**Motion and lifecycle:** The text is drawn as SVG strokes; hovering moves a circular mask with the pointer to reveal a colored text layer, while the stroke draws on over four seconds.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `effect` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `hover` `hover-triggered` `pointer-tracking` `special` `spring-settling` `svg-or-path` `text` `hover` `special` `text`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/text-hover-effect) · [Official registry JSON](https://ui.aceternity.com/registry/text-hover-effect.json) · registry SHA-256 `1063dbb3ae58a2865b624225f434c9c48093c3644a72994bf2901657e40aca2e` · cached source SHA-256 `6921dc858bc64ac90e791720660ceac965df94986867e82d28a6eb2d8fe53518`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (text-hover-effect.tsx) | [open](http://localhost:38473/p/text-hover-effect/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/text-hover-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/text-hover-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/text-hover-effect--1--mobile-reduced.png) |

### Text Reveal Card — `text-reveal-card`

**What it renders:** Mousemove effect to reveal text content at the bottom of the card.
**Motion and lifecycle:** Hovering the card changes a mask/opacity treatment to expose the hidden text; leaving restores the covered state.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `card` `content` `drag-or-gesture` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `hero` `hover-triggered` `pointer-tracking` `repeating-animation` `reveal` `section` `special` `text` `text` `content` `hero` `section` `special` `card`
**Dependencies:** `motion/react`, `react`, `tailwind-merge`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/text-reveal-card) · [Official registry JSON](https://ui.aceternity.com/registry/text-reveal-card.json) · registry SHA-256 `7b018f2e76e11bb708fb27fa6e010ec65035857d3d78e37c536879a2ae6161f2` · cached source SHA-256 `70db36b2988130c58486954b533147055cd6a6d2c022d0d341c2fb5a8f9266e2`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (text-reveal-card.tsx) | [open](http://localhost:38473/p/text-reveal-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/text-reveal-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/text-reveal-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/text-reveal-card--1--mobile-reduced.png) |

### Timeline — `timeline`

**What it renders:** A timeline component with sticky header and scroll beam follow.
**Motion and lifecycle:** A vertical timeline reveals its line and entries as the user scrolls through the sequence.
**Flozio fit:** `conditional-story-fit` — Useful when the animation traces an actual Flozio workflow (lead qualification, personalized outreach, deal risk, or the learning loop). The component alone does not explain that story.
**Tags:** `content` `external-dependencies` `flozio:deal-progression` `flozio:workflow-explainer` `pointer-tracking` `scroll-linked` `scroll-triggered` `special` `timeline` `content` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/timeline) · [Official registry JSON](https://ui.aceternity.com/registry/timeline.json) · registry SHA-256 `32ec3327b9057d7f5dc75488d92a5cd1f233581437d58d55555ad260b771a9e0` · cached source SHA-256 `1b003835c83d3a0480f958ba5634aaee9009a83d7227be549b5f5c79d05543af`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (timeline.tsx) | [open](http://localhost:38473/p/timeline/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/timeline--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/timeline--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/timeline--1--mobile-reduced.png) |

### Tooltip Card — `tooltip-card`

**What it renders:** A tooltip card container that follows mouse pointer when hovered over
**Motion and lifecycle:** Hovering the trigger reveals a floating card beside the pointer; it measures the card and flips position near viewport edges, then fades on leave.
**Flozio fit:** `functional-ui-only` — A functional interface primitive or interaction. Keep it inside a real product flow; it is not a standalone homepage illustration, and its sample state is not Flozio UI.
**Tags:** `call to action` `card` `click-or-toggle` `drag-or-gesture` `flozio:functional-ui` `flozio:not-a-marketing-visual` `hover-triggered` `informative` `pointer-tracking` `special` `spring-settling` `timer-driven` `tooltip` `tooltip` `card` `special` `call to action` `informative`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/tooltip-card) · [Official registry JSON](https://ui.aceternity.com/registry/tooltip-card.json) · registry SHA-256 `9367df8f3e80c20c70fca76fffb5459585a34dc32f9c58b226413618607e6bbe` · cached source SHA-256 `aa43fee7024ea59de28e9a4ae5bf704e99b39109e478426f7fa116f6748334db`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (tooltip-card.tsx) | [open](http://localhost:38473/p/tooltip-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/tooltip-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/tooltip-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/tooltip-card--1--mobile-reduced.png) |

### Tracing Beam — `tracing-beam`

**What it renders:** A Beam that follows the path of an SVG as the user scrolls. Adjusts beam length with scroll speed.
**Motion and lifecycle:** As the reader scrolls through a vertical list, a beam follows the SVG path and its progress; the beam’s height and path are tied to scroll progress.
**Flozio fit:** `strongest-story-fit` — A strong structural match for showing the closed learning loop: closed outcomes update fit, research, messaging, and future deal decisions. Use a real process diagram and Flozio copy around it.
**Tags:** `beam` `content` `external-dependencies` `flozio:learning-loop` `flozio:workflow-explainer` `scroll` `scroll-linked` `scroll-triggered` `spring-settling` `svg-or-path` `tracing` `utility` `content` `scroll` `utility`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/tracing-beam) · [Official registry JSON](https://ui.aceternity.com/registry/tracing-beam.json) · registry SHA-256 `58ac7ff5ab9dbf1a6fd3250fc37ab1a66484b3ce4dc6dfce73270c111e2ea991` · cached source SHA-256 `99378566d3354d734f4d7da530875e6e1746ce28a6bf819df971632990d4254f`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (tracing-beam.tsx) | [open](http://localhost:38473/p/tracing-beam/1) | scroll | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/tracing-beam--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/tracing-beam--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/tracing-beam--1--mobile-reduced.png) |

### Typewriter Effect — `typewriter-effect`

**What it renders:** Text generates as if it is being typed on the screen.
**Motion and lifecycle:** Characters type into the line with a blinking cursor; the example’s typing starts automatically and progresses character by character.
**Flozio fit:** `conditional-copy-accent` — Can emphasize a short, specific Flozio promise or one sales insight. Keep the copy readable and avoid animating whole paragraphs or using motion as a substitute for product meaning.
**Tags:** `content` `effect` `external-dependencies` `flozio:copy-accent` `flozio:editorial` `hero` `repeating-animation` `section` `special` `text` `typewriter` `text` `content` `hero` `section` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/typewriter-effect) · [Official registry JSON](https://ui.aceternity.com/registry/typewriter-effect.json) · registry SHA-256 `758fc8767e27f355c6dfe0a7e362cb3a1855ceb8cc31e855c5a8be5d62433cb3` · cached source SHA-256 `9954fcc8d561014f650aeee24b1dc712bcd8da4292480e2c013dc47ebdb8d112`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (typewriter-effect-1.tsx) | [open](http://localhost:38473/p/typewriter-effect/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/typewriter-effect--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/typewriter-effect--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/typewriter-effect--1--mobile-reduced.png) |
| 2 | yes (typewriter-effect-2.tsx) | [open](http://localhost:38473/p/typewriter-effect/2) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/typewriter-effect--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/typewriter-effect--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/typewriter-effect--2--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Vortex Background — `vortex`

**What it renders:** A wavy, swirly, vortex background ideal for CTAs and backgrounds.
**Motion and lifecycle:** Procedural particle strands rotate and flow inward in a continuous vortex field; color, count, and speed are configurable.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `canvas-rendering` `cta` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `hover-triggered` `special` `timer-driven` `vortex` `background` `special` `cta`
**Dependencies:** `motion/react`, `react`, `simplex-noise`. **Declared prop names:** `children`, `className`, `containerClassName`, `particleCount`, `rangeY`, `baseHue`, `baseSpeed`, `rangeSpeed`, `baseRadius`, `rangeRadius`, `backgroundColor`.
**Source:** [Official docs](https://ui.aceternity.com/components/vortex) · [Official registry JSON](https://ui.aceternity.com/registry/vortex.json) · registry SHA-256 `5067d0a86626ffcb5e476848ca289fac2dabf365e1cd597ce333aee3eb320785` · cached source SHA-256 `bcd5dbeee17f5124b3a07aa3de29c44e96188778c5a53d82e3523eb0495e38bf`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (vortex-1.tsx) | [open](http://localhost:38473/p/vortex/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/vortex--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/vortex--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/vortex--1--mobile-reduced.png) |
| 2 | yes (vortex-2.tsx) | [open](http://localhost:38473/p/vortex/2) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/vortex--2--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/vortex--2--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/vortex--2--mobile-reduced.png) |

### Wavy Background — `wavy-background`

**What it renders:** A cool background effect with waves that move.
**Motion and lifecycle:** A timer or animation frame advances the sequence, then stops or loops according to the component logic. The main visual is painted on canvas rather than DOM layout elements.
**Flozio fit:** `avoid-as-standalone-decoration` — This is a general decorative effect. Do not use it as a default section visual; consider it only if it clarifies a specific Flozio workflow and stays subordinate to that explanation.
**Tags:** `background` `canvas-rendering` `external-dependencies` `flozio:generic-decoration-avoid` `flozio:needs-workflow-context` `special` `timer-driven` `wavy` `background` `special`
**Dependencies:** `react`, `simplex-noise`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/wavy-background) · [Official registry JSON](https://ui.aceternity.com/registry/wavy-background.json) · registry SHA-256 `f2cd93764107de13ddd3a0556df5d919027c89031ce614ec76169a7c49f14dd0` · cached source SHA-256 `76b9dcfa2143c9d80c3e0c9d7f09c1dd5e3319be9e941d9192b28e0b78b2ea26`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (wavy-background.tsx) | [open](http://localhost:38473/p/wavy-background/1) | wait | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/wavy-background--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/wavy-background--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/wavy-background--1--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence.

### Webcam Pixel Grid — `webcam-pixel-grid`

**What it renders:** A real-time webcam pixel grid effect, perfect for pixel art and retro aesthetics.
**Motion and lifecycle:** A live media stream is sampled into a pixel grid and reacts to the cursor; the isolated audit used Chrome’s synthetic camera feed because no real camera is attached.
**Flozio fit:** `conditional-real-data` — Can explain territory or outcome patterns only when backed by real Flozio data. Never invent map markers, comparisons, deal metrics, or customer results.
**Tags:** `background` `call to action` `canvas-rendering` `card` `click-or-toggle` `click-triggered` `flozio:requires-real-data` `flozio:workflow-explainer` `gradient` `grid` `hover-triggered` `pixel` `special` `svg-or-path` `timer-driven` `webcam` `webcam-permission` `card` `background` `gradient` `special` `call to action`
**Dependencies:** `react`. **Declared prop names:** `gridCols`, `gridRows`, `maxElevation`, `motionSensitivity`, `elevationSmoothing`, `colorMode`, `monochromeColor`, `backgroundColor`, `mirror`, `gapRatio`, `invertColors`, `darken`, `borderColor`, `borderOpacity`, `className`, `onWebcamError`, `onWebcamReady`.
**Source:** [Official docs](https://ui.aceternity.com/components/webcam-pixel-grid) · [Official registry JSON](https://ui.aceternity.com/registry/webcam-pixel-grid.json) · registry SHA-256 `c3de75b4d83841c394058938f67cb506ec57896e8a8fed6c642dfe50edf8a74d` · cached source SHA-256 `a1702ec46e566f8c32cbbf030a3df2599411e08a7fd251668668f2a2a777e5f1`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (webcam-pixel-grid.tsx) | [open](http://localhost:38473/p/webcam-pixel-grid/1) | click | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile overflow; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/webcam-pixel-grid--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/webcam-pixel-grid--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/webcam-pixel-grid--1--mobile-reduced.png) |

**Notes:** At least one captured viewport has horizontal overflow; see route evidence. Webcam preview was inspected with Chrome's synthetic media stream; the lab did not access a real camera.

### Wobble Card — `wobble-card`

**What it renders:** A card effect that translates and scales on mousemove, perfect for feature cards.
**Motion and lifecycle:** Pointer movement offsets and scales the card layers with an elastic wobble; the noise texture and image treatment are fixed assets.
**Flozio fit:** `conditional-real-product-visual` — Its interaction could support a product story, but the Aceternity example is not Flozio UI. Use only with approved real product visuals; do not imitate or invent Flozio screens.
**Tags:** `background` `card` `cta` `external-dependencies` `features` `flozio:requires-real-product-visual` `flozio:system-of-action` `hover-triggered` `pointer-tracking` `special` `wobble` `background` `features` `card` `cta` `special`
**Dependencies:** `motion/react`, `react`. **Declared prop names:** see source panel/docs.
**Source:** [Official docs](https://ui.aceternity.com/components/wobble-card) · [Official registry JSON](https://ui.aceternity.com/registry/wobble-card.json) · registry SHA-256 `2ae04e87bb72af12ed95af38abdb473d1c3c24158cf7b29e925868f696953866` · cached source SHA-256 `e044c7bc932752221b9e6c724cf304495a26376da27316c1a53fc0d207133516`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (wobble-card.tsx) | [open](http://localhost:38473/p/wobble-card/1) | hover | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/wobble-card--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/wobble-card--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/wobble-card--1--mobile-reduced.png) |

### World Map — `world-map`

**What it renders:** A world map with animated lines and dots, programatically generated.
**Motion and lifecycle:** SVG arcs draw between supplied coordinates and animated dots pulse at endpoints; the map itself is generated from the provided locations.
**Flozio fit:** `conditional-real-data` — Can explain territory or outcome patterns only when backed by real Flozio data. Never invent map markers, comparisons, deal metrics, or customer results.
**Tags:** `drag-triggered` `external-dependencies` `features` `flozio:requires-real-data` `flozio:workflow-explainer` `map` `special` `svg-or-path` `world` `map` `special` `features`
**Dependencies:** `dotted-map`, `motion/react`, `next-themes`, `react`. **Declared prop names:** `dots`, `lineColor`.
**Source:** [Official docs](https://ui.aceternity.com/components/world-map) · [Official registry JSON](https://ui.aceternity.com/registry/world-map.json) · registry SHA-256 `167ac9534f0b872ca342d40054754c30aec337e64bd22438fa900bfd184cf8bb` · cached source SHA-256 `a8cace90aee8b4fd3d2b14b74d4fca0583b10ac1b7112df9e5b9b6782948ef00`.
**Review:** source read/indexed; visuals inspected; motion inspected; explicit reduced-motion support not found in source; browser preference was still emulated.

| Variant | Published source | Local preview | Trigger tested | Result | Desktop/mobile evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | yes (world-map.tsx) | [open](http://localhost:38473/p/world-map/1) | drag | rendered; target found; visible pixel change; Visible state change captured after the tested trigger.; mobile fits; no runtime exception | [desktop initial](../.component-lab-cache/aceternity/browser-audit/world-map--1--desktop-initial.png) · [after input](../.component-lab-cache/aceternity/browser-audit/world-map--1--desktop-active.png) · [mobile/reduced](../.component-lab-cache/aceternity/browser-audit/world-map--1--mobile-reduced.png) |
