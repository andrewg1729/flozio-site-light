# Flozio Visual Component Research

Status: comparative research notes. For current library queue and completion rules, use [`TODO.md`](TODO.md) and [`COMPONENT_REVIEW_PROCESS.md`](COMPONENT_REVIEW_PROCESS.md). This file is not the coverage source of truth and does not change the homepage.

Research date: 2026-10-21

## Interactive review page

The local site has a separate [Component Lab](/component-lab.html). The current Magic UI docs embed is a legacy preview route. New libraries are to be shown using exact components imported into isolated local preview workspaces; a vendor docs iframe is not the completion criterion. See `COMPONENT_REVIEW_PROCESS.md` for the authoritative method.

## Scope and review standard

The target is a reusable library of expressive, high-quality visual components for Flozio's marketing site. A candidate must make a section's idea clearer or give it a memorable visual form. Decorative effects, fake metrics, and simulated Flozio screens do not qualify by themselves. Flozio product screenshots remain excluded until the founder supplies approved product imagery.

For this first pass, I rendered the official catalog pages in a browser and viewed the full React Bits and Aceternity galleries as visual sheets. I also opened Magic UI's Animated Beam preview and rendered the 21st.dev library directory. A gallery scan establishes visual direction and helps shortlist items; it does not verify every hover state, mobile fallback, accessibility behavior, performance cost, license, or dependency. Those checks belong to each shortlisted item before implementation.

## Library map

| Source | Catalog size shown by source | What its gallery looks like | Research status |
|---|---:|---|---|
| [React Bits](https://reactbits.dev/get-started/index) | 217 components in its current catalog | Full gallery visually scanned. It spans image-led carousels, sculptural type, textured fields, cursor effects, shader-like backgrounds, and small controls. The range is much wider than the familiar glow-and-gradient subset. | Gallery scan complete; individual interactions and licensing/dependencies still need checking for candidates. |
| [Aceternity UI](https://ui.aceternity.com/components) | 88 components in 21st.dev's listing | Full gallery visually scanned. It has striking image, 3D, shader, and scroll examples, alongside many dark neon/glow treatments and demo app panels. | Gallery scan complete; candidate details still need checking. Exclude demos that resemble product UI. |
| [Magic UI](https://magicui.design/docs/components) | 85 records in the pinned local source audit; this includes stale and docs-only history entries | Audited at the pinned commit listed in `MAGIC_UI_COMPONENT_GUIDE.md`; 170 example variants have per-example source and runtime records. This is a snapshot, not a claim about today's vendor catalog. | Source and example audit recorded in `MAGIC_UI_COMPONENT_GUIDE.md`; some historical entries are explicitly unresolved or unreleased. |
| [Animata](https://animata.design/components) | 156+ components on its homepage | The index groups the library into 19 categories. It ranges from backgrounds and charts to text effects and widgets; the category glyphs are only index art, not a view of each component. | Full category inventory scanned; four individual previews opened so far. |
| [21st.dev community libraries](https://21st.dev/community/libraries) | 164 libraries | Directory visually scanned. The filters show 43 motion libraries, 36 marketing UI libraries, six chart libraries, and six 3D libraries. This is a discovery directory, not a gallery of every component in every library. | Directory and Motion, Marketing UI, and Charts category inventories scanned. Library-by-library visual review remains. |
| [Hyperiux Vault](https://vault.hyperiux.com/effects) | 151 effects; 56 free per its current LLM info | A further source found through 21st.dev. Its catalog combines static preview art with live effects across text, backgrounds, carousels, scroll, components, cursors, and WebGL. It explicitly reports dependencies and reduced-motion guidance. | Catalog and featured examples reviewed. Free/access requirements and candidate pages need individual verification. |

## Early visual findings

### Strong directions to explore

- **Integrations:** Magic UI Animated Beam. The live preview shows a hub connected to named services, so the motion has a clear job. This is the right direction for an integrations visual, not a generic substitute for every kind of diagram.
- **Distinctive, image-led movement:** React Bits Circular Carousel, Accordion Gallery, Depth Carousel, and Image Trail. These can use supplied photography or abstract source imagery; they do not require invented Flozio screens.
- **Material and editorial texture:** React Bits Paper Crumple, Dither Veil, Halftone Reveal, Metallic Paint, and the more restrained examples from its backgrounds gallery. These are candidates for occasional section artwork when the effect supports the message.
- **Shape and dimensionality:** Aceternity Liquid Glass, Chromatic Image, 3D Globe, SVG Path Morphing, and selected illustration blocks. They need palette and motion tuning against Flozio's light ClickUp-inspired baseline; their library defaults should not be dropped in unedited.
- **Scroll as explanation:** Animata Animated Timeline and Stacked Sections; Aceternity Sticky Scroll Reveal and Container Scroll Animation; Hyperiux Horizontal Feature Reveal and Timeline. These may fit multi-step sales stories if the section's content supplies the real steps.
- **Data visuals:** Animata chart examples and the six chart libraries listed on 21st.dev, including visx, Evil Charts, REAVIZ, and Bklit. Use only with truthful or explicitly illustrative data; never imply Flozio results that have not been measured.

### Patterns to reject or constrain

- Looping glow borders, random particles, auroras, and cursor trails are not candidates by default. They need a specific tie to the section's message and should not repeat across the page.
- Demo cards that look like invented Flozio screens stay out. This includes fabricated dashboards, pipeline cards, inboxes, call interfaces, analytics panels, and metrics.
- Photo galleries, logo orbiters, and image trails require an approved image source and a clear story. Without that, they become decoration.
- Large WebGL and 3D effects need a content reason, a reduced-motion path, a mobile fallback, and a performance check before use.

## Current ranking after live preview review

This is a ranked direction list, not a decision to implement these immediately.

1. **Magic UI Animated Beam — strongest integrations visual.** Its motion has a visible origin and named destinations. Replace the demo endpoints with only real Flozio integrations; make the flows represent real connections, not random glowing paths.
2. **Image Carousels (21st.dev) — source of strong but image-dependent treatments.** The Ink Blot preview is visually polished, but its landscape-photo demo has no direct Flozio meaning. Keep for a later editorial story, not as a default feature visual.
3. **React Bits image galleries and transitions — strongest composition variety.** Circular Carousel, Depth Carousel, Accordion Gallery, Scroll Expand, Morph Slider, and Dither Veil have meaningfully different movement. They need approved imagery and must not become a substitute for product-specific explanation.
4. **Animata Animated Timeline / Stacked Sections — strongest low-complexity narrative patterns.** The reviewed timeline is plain but legible. Its value is pacing a genuine sequence, not being a standalone hero graphic.
5. **Aceternity SVG Path Morphing / Tracing Beam — strongest custom process illustration references.** They can illustrate change or a path without drawing a fake product screen. Their default theme must be adapted to the homepage's light, crisp visual language.

### Preview review outcomes that should prevent attractive-but-wrong choices

| Preview | Visual read | Decision for Flozio |
|---|---|---|
| Magic UI Animated Beam | Named endpoints visibly linked to a central hub. | Keep as first choice for a real integrations section. |
| Magic UI Orbiting Circles | Recognizable orbiting service marks, but weak labeling and meaning. | Keep as a comparison reference; Beam is clearer. |
| Magic UI Globe / Dotted Map | Spatial motifs with highlighted locations. | Use only if the copy and data are genuinely geographic. |
| Magic UI Floating 3D Particles / Flickering Grid | Polished fields with no inherent information. | Do not use as a section's main visual. |
| Magic UI Morphing Text | Morphing black fluid shape. | Interesting material study; no sales meaning by default. |
| Magic UI Animated List | Sequential notification card with fabricated sample activity. | Borrow the timing only for truthful events; discard sample content. |
| Magic UI Marquee | Two moving rows of quote cards. | Only use for real approved customer statements or other actual content. |
| Magic UI Border Beam | Thin colored light running around a login card. | Avoid as a section visual; sample UI is fictional and beam is decorative. |
| Animata Boids Ecosystem | Cursor-driven flock of triangles. | Reject as a sales visual; motion has no natural semantic link. |
| Animata Shape Shifter | Image-dependent morph between architecture photos. | Keep only as image-transition inspiration. |

### Individual Animata previews checked

- **Animated Timeline:** rendered preview is a simple vertical three-event list inside a dotted frame. The movement colors the current and preceding milestones on hover. It is structurally clear but visually plain in its default state; it is a possible interaction reference, not a standout hero visual.
- **Orbiting Items:** rendered preview circles familiar framework logos around an empty center on a saturated navy panel. It reads as integrations. The Beam preview is more direct for labeled connections, so this is a comparison candidate rather than a lead choice.
- **Shape Shifter:** rendered example morphs between two stock architecture/interior photos, with a small title and interaction on hover. It depends on source imagery and does not fit Flozio's story as shown.
- **Boids Ecosystem:** rendered preview is a cursor-driven flocking field of small colored triangles on dark navy. It is an expressive movement study but has no natural sales meaning, so it is low priority for the site.

### Individual Magic UI previews checked

- **Animated Beam:** a clean central hub connected to six labeled services, with animated light moving along SVG paths. Strong semantic fit for integrations. The simple line-and-node structure can sit on a light background and carry Flozio's real system names.
- **Orbiting Circles:** two fine orbit rings with repeated third-party logos. Immediately recognizable as an ecosystem, but unlabeled logos communicate less than Beam and risk reading as a generic integrations diagram.
- **Globe:** a large dotted globe with a couple of highlighted points, rendered with WebGL. It has real spatial form but the demo gives no story for the points; only useful if the page discusses geographic coverage.
- **Dotted Map:** a low-contrast dotted world map with two labeled markers. Cleaner than the globe, but still needs truthful geographic meaning and approved location data.
- **Floating 3D Particles:** a large field of monochrome particles behind sample headline/CTA copy. The visual is attractive but primarily atmospheric; reject as a section's main illustration unless a specific concept gives it meaning.
- **Morphing Text:** a black fluid-like shape morphing in the center of a white preview. Interesting material motion, but no direct relationship to the sales workflow; low-priority brand-art reference.
- **Animated List:** a notification item animates into a mostly empty preview. Useful motion primitive for actual events, but this particular example resembles fabricated app activity. Do not reuse its sample content or present fictional notifications as Flozio.
- **Marquee:** two rows of repetitive testimonial cards glide horizontally. The motion itself is versatile, but the sample is generic social proof. Could be used only for truthful, approved content; not a standout visual by itself.
- **Border Beam:** a thin multi-color light travels around a login card. The motion is polished but does not explain content and the sample is a fake login panel. Reject as a section visual; at most a small interaction affordance.
- **Flickering Grid:** sparse gray dots gently flicker over a blank panel. Very quiet, but still decorative and too generic to carry a section. Not a first-choice visual.

### Individual 21st.dev previews checked

- **Animated Features Bento with Live Diagrams (Ink Orbit):** the page preview is a dark bento with a fake team/workflow panel, service integrations, and a forecast chart. The integrations sub-visual has a clear diagram idea, but the surrounding sample resembles an invented product UI and includes unverified capability claims. Reject the section as a Flozio visual; retain only the possibility of a standalone, truthfully labeled connection diagram. [Preview](https://21st.dev/@kedhareswer/components/ink-orbit-features)
- **Ink Blot Reveal Image Carousel (Image Carousels):** the live preview is a full-bleed landscape photo with an editorial serif title; the photo transition is an ink-spread reveal. It is visually attractive but only useful if Flozio has a real photography-led story to tell. It does not explain sales workflows on its own. [Preview](https://21st.dev/@kedhareswer/components/ink-blot-carousel)
- **Hover Expand Gallery (Image Carousels):** its documented behavior is a row of narrow vertical image panels that expands the active image, then becomes a vertical accordion on smaller screens. This looks more like a portfolio/case-study gallery than a Flozio feature explanation, so keep it low priority unless the site gains real customer stories or approved campaign photography. [Preview](https://21st.dev/@kedhareswer/components/hover-expand-gallery)

## Initial shortlist for individual review

This is a shortlist, not an implementation recommendation. Each item below appeared in a rendered gallery or official live preview during the index scan; the next audit pass needs to inspect the component page, interaction states, setup, license, and responsive behavior.

| Component | Source | Potential Flozio role | Why it made the shortlist |
|---|---|---|---|
| Animated Beam | [Magic UI](https://magicui.design/docs/components/animated-beam) | Integrations | The live example directly maps hub-to-service connections. |
| Orbiting Circles | [Magic UI](https://magicui.design/docs/components/orbiting-circles) | Integrations | Native orbital movement; needs careful logo and density treatment. |
| Dotted Map | [Magic UI](https://magicui.design/docs/components/dotted-map) | Reach or account coverage | A spatial visual with a clear data role, if the underlying data is real. |
| Globe | [Magic UI](https://magicui.design/docs/components/globe) | Market reach | A distinct 3D form; use only if geography matters to the story. |
| Animated List | [Magic UI](https://magicui.design/docs/components/animated-list) | Sequential activity | Useful motion language for an ordered stream; avoid dressing up fake activity. |
| Circular Carousel | [React Bits](https://reactbits.dev/get-started/index) | Editorial or campaign gallery | Distinctive depth and card movement visible in the gallery. |
| Accordion Gallery | [React Bits](https://reactbits.dev/get-started/index) | People or story gallery | A varied image composition; depends on approved photography. |
| Depth Carousel | [React Bits](https://reactbits.dev/get-started/index) | Editorial or customer story gallery | Strong spatial composition, subject to real source imagery. |
| Image Trail | [React Bits](https://reactbits.dev/get-started/index) | A single image-led brand moment | A recognizable image interaction; only with real approved assets and restrained motion. |
| Orbit Images | [React Bits](https://reactbits.dev/get-started/index) | Integrations or connected capabilities | It can arrange assets along a path, but must not duplicate the more semantically direct Beam. |
| Paper Crumple | [React Bits](https://reactbits.dev/get-started/index) | Tactile campaign artwork | A material effect with a different visual register from generic SaaS gradients. |
| Dither Veil | [React Bits](https://reactbits.dev/get-started/index) | Reveal or transition | Image transformation is visually specific; requires an approved source image. |
| Halftone Reveal | [React Bits](https://reactbits.dev/get-started/index) | Editorial image reveal | Distinct print-like texture; requires an approved source image. |
| Metallic Paint | [React Bits](https://reactbits.dev/get-started/index) | Brand mark or headline accent | A material treatment rather than another floating-card illustration. |
| Web Threads | [React Bits](https://reactbits.dev/get-started/index) | Connected-data atmosphere | Could suggest connected signals, but needs a visible data story to avoid decoration. |
| Light Tunnel | [React Bits](https://reactbits.dev/get-started/index) | Dramatic transition | A strong frame effect; likely too atmospheric for explanatory sections. |
| Liquid Glass | [Aceternity UI](https://ui.aceternity.com/components) | Small material accent | Visually polished; can become a generic glass-card motif if overused. |
| Chromatic Image | [Aceternity UI](https://ui.aceternity.com/components) | Image-led section transition | Strong visual treatment tied to actual imagery. |
| Cloud Shader | [Aceternity UI](https://ui.aceternity.com/components) | Soft, expansive section artwork | A quieter organic form than common neon particle fields. |
| Background Cubes Grid | [Aceternity UI](https://ui.aceternity.com/components) | Spatial/system metaphor | Could support structure, but the default cube-grid look is not yet a Flozio fit. |
| SVG Path Morphing | [Aceternity UI](https://ui.aceternity.com/components) | Change-over-time narrative | A shape transition can express progress without inventing an interface. |
| Parallax Hero Images | [Aceternity UI](https://ui.aceternity.com/components) | Hero art with supplied imagery | Layered depth is useful if the source images are real and compositionally strong. |
| Animated Timeline | [Animata](https://animata.design/components) | Sales process narrative | The underlying component matches a real chronological story. |
| Stacked Sections | [Animata](https://animata.design/components) | Progressive explanation | Could turn a sequence into a scroll-led story, subject to readability and reduced motion. |
| Shape Shifter | [Animata](https://animata.design/components) | Abstract brand visual | A morphing shape can make an idea memorable without pretending to show product UI. |
| Product Features | [Animata](https://animata.design/components) | Feature narrative | Needs review to ensure the example does not imply unshipped interface details. |
| Spider Particles Background | [Hyperiux Vault](https://vault.hyperiux.com/effects/featured) | Integrations | Could communicate real connected systems; the default particle treatment needs visual review against Flozio's lighter palette. |
| Orbit Flip Slider | [Hyperiux Vault](https://vault.hyperiux.com/effects/featured) | Image-led feature or story browser | A distinct motion composition; source content must be real and useful. |
| Horizontal Feature Reveal | [Hyperiux Vault](https://vault.hyperiux.com/effects/featured) | Step-by-step product story | Scroll interaction may pace a real sequence of capabilities. |
| Infinite Grid Gallery | [Hyperiux Vault](https://vault.hyperiux.com/effects/featured) | Capability or asset gallery | Can hold varied media, but should not become a generic tile wall. |
| Timeline | [Hyperiux Vault](https://vault.hyperiux.com/effects) | Learning-loop / process story | A better semantic base for chronological causality than a decorative orbit. |
| Parallax Strip Slider | [Hyperiux Vault](https://vault.hyperiux.com/effects) | Editorial image strip | Distinct image motion; requires suitable approved imagery. |

## Expanded candidate pool from the rendered galleries

The 31 items above are the strongest early candidates. These additional entries were visible in the full React Bits or Aceternity gallery scans, or in the rendered 21st.dev directory. They are retained for comparison because they add a distinct visual behavior or could support a specific story. “Candidate” means it deserves a closer look, not that it should ship on Flozio.

### React Bits gallery scan

These appeared in the rendered 217-item gallery. The full list has strong variety, though much of it is aimed at portfolios, effects showcases, and dark visual experiments. Apply Flozio's lighter palette, section purpose, and motion restraint during any later review.

| Component | Potential use to investigate |
|---|---|
| Flying Button | Tiny campaign interaction; likely too small to be a section visual. |
| Flux Lines | Abstract section atmosphere if tied to connected signals. |
| Holo Card | Material study; avoid a fake trading-card or product-card metaphor. |
| Micro Slats | A transition texture or narrow separator. |
| Flex Carousel | Media strip for approved imagery. |
| Electric Logo | Brand mark motion, only if it respects the actual logo geometry. |
| Ghost Fliers | Image collage transition, requiring real source imagery. |
| CRT Warp | A highly stylized transition; likely too retro for core Flozio pages. |
| Acid Squares | Pattern field for a tightly scoped visual moment. |
| Drift Wall | Editorial media wall with real imagery. |
| Gradient Waves | Soft background art, with color and contrast brought into the site palette. |
| Light Tunnel | Dramatic transition or hero framing; likely too intense for explanatory sections. |
| Molten Metal | Brand wordmark or shape accent, if the material treatment fits. |
| Morph Slider | Image transition with approved photography or illustration. |
| Scanner | Reveal treatment for supplied artwork, not an invented UI. |
| Scroll Expand | A media frame that can make a single supplied image carry the story. |
| Sliced Waves | Section texture, subject to a restrained motion pass. |
| Text Loop | Editorial ticker for a short, meaningful phrase. |
| Topography | A quiet field pattern if connected to territory, signals, or coverage. |
| Strands | Sculptural motion that could express interconnection, pending close preview review. |
| Antigravity | A 3D field; high risk of becoming a generic particle backdrop. |
| Light Pillar | Strong lighting effect for a hero, likely too theatrical for most sections. |
| Floating Lines | A light connection motif if the lines actually map to a process. |
| Liquid Ether | Organic material treatment for a single brand moment. |
| Plasma | Abstract visual texture; candidate only if color and movement fit the page. |
| Balatro | Painterly color distortion for a supplied asset, not a standalone claim. |
| Ghost Cursor | Avoid as a site-wide cursor effect; consider only in a purposeful interactive demo. |
| Swarm Cursor | Could express a gathering of signals, but needs a content-led interaction. |
| Shape Blur | Reveal treatment on a supplied shape or mark. |
| Ribbons | A connected-flow visual, provided it maps to actual labeled steps. |
| Splash Cursor | High-motion effect; low priority for a product marketing site. |
| Meta Balls | Shape transformation for a single abstract illustration. |
| Blob Cursor | High-motion cursor treatment; low priority. |
| Star Border | Small CTA accent only; not a main visual. |
| Infinite Spiral | Gallery motion for real images, not a diagram. |
| Pixel Snow | Sparse texture that might work as a transition, not persistent background. |
| Reflective Card | Only for real content cards; avoid invented customer or product surfaces. |
| Gradient Islands | Abstract spatial field, pending palette and meaning review. |
| Prism | Light refraction texture for a single section. |
| Pixel Trail | Small interaction detail; low priority for section artwork. |
| Cubes | Spatial field if the visual metaphor is explicitly about a system. |
| Metallic Paint | Marked above; keep one entry in final ranking. |
| Image Trail | Marked above; keep one entry in final ranking. |

### Aceternity gallery scan

These appeared in the rendered 88-item gallery. Several demos use cards, mock devices, or app-like panels; inspect only the effect layer and do not reuse their fictional screen content.

| Component | Potential use to investigate |
|---|---|
| Background Lines | Restrained section texture with a clear content relationship. |
| Background Ripple Effect | Interaction response for a focused, user-triggered moment. |
| Background Beams | Integration or signal motif only when the beams connect real labeled endpoints. |
| Background Beams With Collision | High-drama effect; likely too noisy for this site. |
| Vortex | Abstract transition, with strong risk of generic AI aesthetics. |
| Aurora Background | Background texture; lower priority because it is common and easy to misuse. |
| World Map | Coverage visual only with accurate, approved geographic data. |
| Timeline | A sequence of events, if the story is genuinely chronological. |
| Sticky Scroll Reveal | Scroll-led narrative for real capability steps. |
| Container Scroll Animation | Scroll-led visual reveal, with the content supplied by Flozio. |
| Hero Parallax | Layered supplied imagery; avoid fabricated product mockups. |
| SVG Mask Effect | Reveal of a real illustration or photo. |
| Tracing Beam | A path animation for a real route through a process. |
| 3D Marquee | Avoid testimonial mode without real customer quotes; the motion may suit a media strip instead. |
| Google Gemini Effect | SVG motion reference; inspect carefully and avoid borrowing another brand's recognizable treatment. |
| Focus Cards | Only if the cards contain real, approved material. |
| Card Stack | Could show a sequence of approved assets; reject if it reads as a guessed UI. |
| Infinite Moving Cards | Not for fake social proof or invented customer logos. |
| Parallax Scroll | A paced narrative using approved imagery. |
| Lens | A magnified detail view of a real asset. |
| 3D Pin | Could anchor a real geographic or illustrative point; low priority otherwise. |
| 3D Globe | Marked above; use only when geography is relevant. |
| Illustrations | Motion illustration blocks are worth reviewing individually because they can add variety without product UI. |
| Shaders | A source for material and form ideas, not a default section background. |
| Text Reveal Card | Can focus a short phrase; inspect whether it works without adding a card-heavy layout. |
| Pixelated Canvas | Transition or image treatment for approved source art. |
| Compare | Could show a before/after only where Flozio has substantiated evidence and permission. |
| Canvas Reveal Effect | Reveal of approved illustration or imagery. |
| Spotlight | Small focus interaction; avoid the default dark spotlight aesthetic if it clashes with the section. |

### Newly discovered 21st.dev libraries to inspect

The directory is useful for finding specialized sources beyond the named libraries. These are library-level leads, not component approvals.

| Library | Why it merits a preview pass |
|---|---|
| ThreeUI | Procedural 3D and shader work with live controls; likely expressive but heavier than the current static homepage. |
| Motion Primitives | Purpose-built motion components; inspect for restrained, useful storytelling behavior. |
| Hyperiux Vault | 151 effects with live previews; 56 listed as free in its current catalog information. |
| Image Carousels | A set of image presentations with distinct motion ideas; only useful with approved source assets. |
| Illos | Animated illustrations in shader, HUD, and isometric styles; inspect for non-product narrative art. |
| Evil Charts | A specialist source for polished chart treatment, subject to truthful data. |
| visx | Lower-level, composable data visualization primitives; useful if Flozio needs real data storytelling. |
| REAVIZ | Modular chart library with interaction support; assess visuals and complexity. |
| Bklit | Design-engineered charts and data visuals; inspect actual samples before ranking. |
| Kokonut UI | Large catalog with current updates; screen for meaningful visual blocks rather than generic SaaS cards. |
| Ruixen UI | Large marketing component library; search for non-bento section compositions and expressive illustration. |
| UI Layouts | Motion and landing-page blocks; screen against the existing page rather than adopting whole sections blindly. |
| Fancy Components | Explicitly playful interaction recreations; inspect for isolated ideas that can be toned to Flozio. |
| SmoothUI | Motion components; inspect current previews and implementation quality. |
| SVG UI | Animated SVG components; potential source for lightweight, ownable line and shape motion. |
| Motion Primitives | Listed once above; keep one entry in the tracked library set. |

The directory itself confirms that the scope is much larger than a component gallery: it lists 164 libraries, and some list hundreds of components. The current directory includes such large catalogs as Ruixen UI (347), Cnippet (347), ShadcnSpace (186), Freedom (215), Hirael (217), Kokonut UI (60), Efferd (116), UI Layouts (127), HextaUI (119), plus many narrower motion libraries. Counts and descriptions are directory metadata; they do not imply those components are visually approved for Flozio.

Additional 21st.dev libraries that merit triage before opening every individual item:

| Library | Why it merits triage | Official directory |
|---|---|---|
| Image Carousels | 21 components dedicated to varied image transitions, with several nonstandard material treatments. | [21st motion directory](https://21st.dev/community/libraries/s/motion) |
| Motion Primitives | 39 motion-specific components, potentially easier to adapt than a full page template. | [21st motion directory](https://21st.dev/community/libraries/s/motion) |
| Fancy Components | 35 animated details and microinteractions; isolate individual ideas rather than import their overall style. | [21st motion directory](https://21st.dev/community/libraries/s/motion) |
| Hyperiux Vault | Effect-focused library with source, category, motion-reduction and dependency details. | [Hyperiux effects](https://vault.hyperiux.com/effects) |
| ThreeUI | 38 procedural 3D / shader examples with live controls; likely needs stronger performance and mobile scrutiny. | [21st motion directory](https://21st.dev/community/libraries/s/motion) |
| Ruixen UI | Large marketing library; screen for unusual compositions rather than copying its page templates. | [21st marketing directory](https://21st.dev/community/libraries/s/marketing) |
| UI Layouts | Marketing blocks plus motion examples; prioritize individual visual ideas over complete sections. | [21st motion directory](https://21st.dev/community/libraries/s/motion) |
| Kokonut UI | Large and actively updated catalog; needs filtering for specific visual behavior. | [21st libraries](https://21st.dev/community/libraries) |
| Efferd | Broad block collection; inspect only distinctive compositions or effects. | [21st marketing directory](https://21st.dev/community/libraries/s/marketing) |
| Hirael | Large block catalog with light and dark themes; candidate for editorial compositions after preview review. | [21st marketing directory](https://21st.dev/community/libraries/s/marketing) |
| Evil Charts / visx / REAVIZ | Specialist data visualization sources; visuals must be grounded in approved Flozio data. | [21st chart directory](https://21st.dev/community/libraries/s/charts) |

## What is still unreviewed

Coverage note: the 2026-10-21 Magic UI audit is recorded in `MAGIC_UI_COMPONENT_GUIDE.md` and its JSON audit files. React Bits and Aceternity gallery scans recorded here are only discovery scans, not individual source-and-motion reviews. Aceternity is the first library in the current TODO queue; its registry and current license must be checked from official sources before importing it. Do not infer completion from the earlier counts or gallery scans in this research note.

## Source inventory links

- [Magic UI components](https://magicui.design/docs/components)
- [Aceternity UI components](https://ui.aceternity.com/components)
- [Kokonut UI](https://kokonutui.com/)
- [React Bits components](https://reactbits.dev/get-started/index)
- [Ruixen UI](https://ruixen.com/)
- [Animata components](https://animata.design/components)
- [Aceternity UI components](https://ui.aceternity.com/components)
- [21st.dev libraries](https://21st.dev/community/libraries)
- [21st.dev Motion libraries](https://21st.dev/community/libraries/s/motion)
- [21st.dev Marketing UI libraries](https://21st.dev/community/libraries/s/marketing)
- [21st.dev Charts libraries](https://21st.dev/community/libraries/s/charts)
- [Hyperiux Vault featured effects](https://vault.hyperiux.com/effects/featured)
