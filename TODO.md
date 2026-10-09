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
