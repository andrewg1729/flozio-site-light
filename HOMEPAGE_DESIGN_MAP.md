# Flozio website design map

This is the working map for carrying the current homepage's visual language across Flozio's website. The homepage is the reference. Use its actual structure and styling as evidence; do not recreate its look from a generic description of "modern SaaS."

## Authority

For website work, follow these sources in order:

1. The user's current request defines the page, section, and allowed scope.
2. [`BRAND.md`](BRAND.md) defines Flozio's product, audience, voice, and what is vision versus a verified current capability.
3. [`DESIGN_GUARDRAILS.md`](DESIGN_GUARDRAILS.md) defines Flozio's brand, content, and usability requirements.
4. This file maps the homepage's visual grammar and explains how to reuse it.
5. Existing homepage code is the concrete implementation reference. Treat it as evidence of layout and craft, while respecting the Flozio-specific overrides above.

## Where the homepage lives

- `/` is rewritten to `public/clickup-reference.html` in `next.config.mjs`.
- The page is a saved, mostly minified HTML snapshot. Its rendered styles and scripts live under `public/assets/clickup-reference/responses/` and `public/assets/clickup-reference/next/`; `next.config.mjs` rewrites their asset URLs.
- The snapshot also loads the original Next.js page bundles, which hydrate the `#__next` tree. Custom markup inserted directly inside that tree can be removed during hydration even though it appears in the served HTML. For custom homepage sections, keep the section markup in a `<template>` outside `#__next`, then mount it into the intended location after hydration with a small public script; keep section content in the template and mounting behavior in the script.
- This snapshot is the canonical homepage source. `app/page.tsx` is a fallback redirect, and React components under `app/sections/` are a dormant older reconstruction. Editing those components does not change `/`.
- A future React migration must first match the current Flozio page's copy, sections, styling, responsive behavior, and interactions; do not change the root rewrite before that parity review.
- Do not assume a hashed CSS-module class is a portable component or a design token. Use those class names to locate the matching source styles and section in the snapshot.
- Before adding another route, preserve `/` and understand how the new route will load the specific styles and assets it needs. Do not replace or refactor the homepage as a shortcut for adding pages.
- The snapshot retains ClickUp source names, content, assets, and colors alongside Flozio changes. Reuse visual structure only when it serves Flozio. Never carry over ClickUp identity, claims, customer proof, or product terminology as Flozio facts.

## The visual language to carry forward

The site should feel like the current homepage: a polished, light SaaS marketing site with clear hierarchy, confident display headings, readable supporting copy, generous section-level breathing room, crisp product-led visuals, and restrained controls. Keep sections related through shared type, alignment, widths, vertical rhythm, and treatment of product imagery. Let a section's content determine its composition within that grammar.

Use the following as constraints:

- **Page rhythm:** Follow the homepage's sequence of focused sections. Each section has one clear job and a strong heading; avoid turning every idea into an identical card grid.
- **Typography:** Follow the typeface, scale, weight, line-height, and text measure used by the closest matching homepage section. The snapshot contains multiple font families and component-specific rules, so do not infer a global font from a frequency count or impose a new type system.
- **Observed heading treatment:** The current hero and product-story heading selectors use Plus Jakarta Sans, tight letter spacing, and dark graphite text; the product-story heading has a subtle graphite gradient. Sizes differ by section and responsive rule (the video-story title is 48px in its base rule and 34px in an override). Match the relevant local selector and responsive behavior; do not turn these observations into a global heading rule.
- **Color:** Preserve the homepage's light surfaces and strong text contrast. Apply Flozio's deep navy, blue, and cyan roles from `DESIGN_GUARDRAILS.md`. The snapshot contains ClickUp colors, including purple; their presence in source CSS is not approval to use them for Flozio.
- **Product visuals:** Prefer a purposeful, legible depiction of a real Flozio sales workflow. Reuse the homepage's product-preview framing and level of detail where appropriate. Build code-native HTML/SVG interface visuals when that best explains the workflow; do not add an unrelated illustration, decorative blob, fake customer dashboard, or invented metric to fill space.
- **Components and decoration:** Match the existing button, border, radius, icon, and motion treatment of the nearest relevant section. Keep deliberate treatments already used by the matching section, including its restrained graphite heading gradient. Treat a component library as editable source, not a finished design: use a component only when its behavior explains the product, then tune it to the page's type, spacing, and color roles. Avoid adding generic floating badges, glass panels, ornamental gradients, glow, cursor effects, or animation without a product purpose. For a learning-loop graphic, show how real sales evidence connects to a rep decision with one clear focal point; avoid encoding it as four equal-weight steps.
- **Distinctiveness:** Make the content and product interaction Flozio-specific. A memorable detail should come from how Flozio helps a sales team, not decoration that could be moved to any SaaS site.
- **Truth:** Label illustrative interfaces and sample records as examples. Do not imply that a planned capability is live. Follow the claim rules in `BRAND.md` and `DESIGN_GUARDRAILS.md`.

## Useful homepage landmarks

These names help locate reference sections in `public/clickup-reference.html`. They are generated snapshot selectors, not a supported component API; confirm the surrounding markup and styles before using them.

- Main hero: `CuHomeHero4_1_heroTitle` and `HomeHeroLongTitle_wrapper`.
- Product-view navigation/demo: `OverviewHeroTabs0226_wrapper`.
- Product story section: `CuHomeVideoSection4on_title`.
- Product capability sections: `Lp4AgentsSection_*` and `HomeBrain2Section_*`.
- Closing call to action: `Lp4AiCta_*`.

The page also contains preserved ClickUp sections and proof. Their presence does not make their content or claims reusable for Flozio.

## Workflow for each new page or section

1. **Read the brief.** Read `BRAND.md`, `DESIGN_GUARDRAILS.md`, and this map. Restate the requested page or section and explicit non-goals.
2. **Find the closest precedent.** Inspect the relevant homepage markup, its exact CSS rules, and its assets. Name the precedent and the properties to carry over: composition, width, type, spacing, surface, and visual density. Do not invent a fresh design system.
3. **Design for the sales job.** Define what a Flozio visitor should understand from this section and what a rep or leader should recognize in its visual. Keep product facts and planned capabilities distinct.
4. **Keep scope tight.** Make only the requested section or new route change. Do not reflow neighboring sections, rewrite global styles, or replace the homepage unless asked.
5. **Render and review.** When implementation changes visuals, inspect the running page at the same desktop size as the homepage reference and at a narrow mobile width. Compare section hierarchy, spacing, typography, density, and product-preview treatment. Check that the rest of the page remains untouched. A source-only review cannot establish visual quality.
6. **Keep useful corrections.** When the user gives specific visual feedback, record the generalizable rule here or in `DESIGN_GUARDRAILS.md`; do not add vague rules such as "make it pop."

## Ready-to-keep checklist

- It reads as part of the current Flozio site at a glance.
- Its layout follows a specific homepage precedent, with only the variation needed for its content.
- A visitor can quickly understand the Flozio-specific point of the section.
- The visual illustrates a real or clearly labeled planned workflow; it has no invented proof.
- Only the requested page or section changed, and the responsive rendering has been checked.
