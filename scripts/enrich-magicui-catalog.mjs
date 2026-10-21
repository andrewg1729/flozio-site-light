import fs from 'node:fs';

const path = 'public/magicui-catalog.json';
const catalog = JSON.parse(fs.readFileSync(path, 'utf8'));
const sourceEvidencePath = '.magicui-source/source-motion-evidence.json';
const sourceEvidence = fs.existsSync(sourceEvidencePath) ? JSON.parse(fs.readFileSync(sourceEvidencePath, 'utf8')) : null;
if (sourceEvidence?.source?.sourceRepositoryCommit) {
  catalog.source.sourceRepositoryCommit = sourceEvidence.source.sourceRepositoryCommit;
}

// Short, queryable notes distilled from the official component docs and source.
// fitTags describe possible storytelling jobs, not automatic homepage approvals.
const notes = {
  'magic-card': ['Pointer-tracking spotlight inside a card; supports a gradient or orb glow treatment.', 'Move the pointer across the surface to move the highlight; choose gradient or orb mode.', ['pointer interaction', 'hover effect', 'card', 'deal guidance', 'account research']],
  android: ['Android device frame for presenting supplied app media.', 'Pass an image or video source and size the frame; the component itself does not simulate an app.', ['device frame', 'media presentation', 'product demo']],
  'warp-background': ['A card surface with a perspective grid that bends and recedes like a time-warp tunnel.', 'Place content inside the card; the animated grid provides the surrounding depth effect.', ['background motion', 'perspective', 'product story', 'learning loop']],
  'line-shadow-text': ['Text with a moving linear shadow that travels across the letterforms.', 'Render the text and let the configured animation sweep the shadow.', ['text motion', 'headline accent', 'section title']],
  'aurora-text': ['Text filled with a soft, shifting aurora color field.', 'The color field animates continuously behind the clipped text.', ['text motion', 'headline accent']],
  'morphing-text': ['Cycles between strings by crossfading two text layers while blurring the outgoing and incoming words.', 'Provide alternate words or phrases; the component transitions between them automatically.', ['text transition', 'headline', 'changing message']],
  'scroll-progress': ['A thin progress indicator tied to the reader’s scroll position.', 'Scroll the page to move the indicator from start to completion.', ['scroll feedback', 'navigation utility']],
  lens: ['A magnifying lens that enlarges the region under a pointer over supplied content.', 'Move the pointer or touch across the media to move the zoom lens.', ['pointer interaction', 'image detail', 'inspection']],
  pointer: ['A custom pointer element that follows a target element with a smooth spring.', 'Move the pointer inside the wrapped area; enter and leave control its visibility.', ['pointer interaction', 'cursor motion', 'editorial illustration']],
  'smooth-cursor': ['A free-moving cursor graphic that follows pointer movement with spring easing and rotation.', 'Move the pointer across the page to see the lagging, softened follow motion.', ['pointer interaction', 'cursor motion', 'avoid as decoration']],
  'progressive-blur': ['A blur gradient at the edge of a scrollable region, signaling more content beyond the visible edge.', 'Scroll the clipped content; the blur masks the overflow edge.', ['scroll feedback', 'content overflow']],
  'neon-gradient-card': ['A card with a configurable animated gradient border or glow treatment.', 'Hover or view the card while its border treatment animates; the effect is decorative.', ['card treatment', 'hover effect', 'high decoration']],
  meteors: ['A field of short streaks that travel diagonally across a background.', 'The meteor streaks animate automatically behind the supplied content.', ['ambient motion', 'background effect', 'high decoration']],
  'grid-pattern': ['A static SVG grid pattern that can be clipped or positioned as a background.', 'Set grid size and color through props/classes; there is no interaction.', ['background pattern', 'static texture']],
  'striped-pattern': ['A static SVG stripe pattern for a restrained background texture.', 'Configure the stripe size, color, and placement; there is no interaction.', ['background pattern', 'static texture']],
  'interactive-grid-pattern': ['A grid whose cells respond to pointer entry with a localized highlight.', 'Move the pointer across cells to trigger the hover response.', ['pointer interaction', 'background pattern', 'hover effect']],
  'dot-pattern': ['A static SVG dot field with adjustable spacing and color.', 'Set spacing and dot color; there is no interaction.', ['background pattern', 'static texture']],
  'flickering-grid': ['A grid of cells that flicker with randomized opacity over time.', 'The cell shimmer runs automatically; tune density, colors, and flicker.', ['ambient motion', 'background pattern', 'high decoration']],
  'hero-video-dialog': ['A video preview that opens into a modal video player.', 'Activate the preview button to open the dialog; close it to return to the page.', ['video dialog', 'content reveal', 'product story']],
  'code-comparison': ['A side-by-side code comparison with highlighted additions and removals.', 'Select or inspect the two versions; line changes are styled as a diff.', ['code display', 'before and after', 'developer content']],
  'script-copy-btn': ['A code-install helper with package-manager command choices and copy feedback, documented in Magic UI v3.', 'Choose a package manager command and activate Copy; current implementation source is no longer in the public registry.', ['utility control', 'copy action', 'legacy docs']],
  marquee: ['A continuously moving horizontal track for text, logos, or media.', 'The track loops automatically and can pause or respond to hover depending on configuration.', ['continuous movement', 'logo strip', 'avoid unsupported proof']],
  'glyph-matrix': ['A field of changing characters arranged in a grid with fading transitions.', 'Glyphs update automatically; theme and density affect the visual field.', ['ambient motion', 'data texture', 'high decoration']],
  globe: ['An interactive WebGL globe with auto-rotation and pointer drag.', 'Drag to rotate; the globe also turns automatically when idle.', ['3d visualization', 'integration map', 'global reach']],
  'shimmer-button': ['A button with a moving light that traces or crosses its surface.', 'The shimmer animates on the button; activation follows normal button behavior.', ['button treatment', 'hover effect']],
  'tweet-card': ['A formatted social post card showing author identity and post content.', 'Render supplied post data; it is a static content presentation.', ['social proof layout', 'third-party content', 'avoid invented proof']],
  'client-tweet-card': ['A client-rendered social post card with author and post content.', 'Render supplied post data in the browser; it is a static content presentation.', ['social proof layout', 'third-party content', 'avoid invented proof']],
  'bento-grid': ['A responsive grid layout whose tiles also animate their icon, title, and supporting copy on hover.', 'Hover a tile; the title/icon shift and supporting text slides into view.', ['layout pattern', 'feature grouping', 'hover reveal']],
  particles: ['A pointer-responsive particle field with configurable movement and density.', 'Move the pointer through the canvas to disturb or guide particles.', ['pointer interaction', 'ambient motion', 'editorial illustration']],
  'number-ticker': ['A number that counts or rolls to a target value when it enters view.', 'Scroll it into view to trigger the count-up or count-down animation.', ['number animation', 'data emphasis', 'only with verified metrics']],
  ripple: ['Concentric circles pulse in place by scaling and changing opacity; they do not expand from a click point.', 'The background pulse runs continuously; use Ripple Button for click-originating expanding rings.', ['ambient motion', 'background effect', 'pulsating rings']],
  'retro-grid': ['A perspective grid that scrolls toward a horizon in a retro-futurist style.', 'The grid moves continuously; color and perspective set the mood.', ['background motion', 'perspective', 'high decoration']],
  'animated-list': ['Reveals supplied children one at a time, keeping earlier children visible as the list grows.', 'A timer adds the next child with a spring scale and opacity entrance; it stops after the final child.', ['sequenced reveal', 'activity timeline', 'deal guidance']],
  'animated-shiny-text': ['A narrow light sheen sweeps across otherwise stable text.', 'The sheen repeats automatically across the text.', ['text motion', 'headline accent']],
  'animated-grid-pattern': ['An SVG grid where individual squares fade in and out, then reappear at new random positions.', 'Squares animate in staggered loops and relocate after each cycle; the grid responds to container resizing.', ['background motion', 'background pattern', 'randomized reveal']],
  'border-beam': ['A short bright beam travels around a container’s border.', 'The beam loops around the perimeter; direction and speed are configurable.', ['border motion', 'attention cue', 'integrations']],
  'animated-beam': ['Animated connector paths link supplied elements to illustrate relationships or data flow.', 'Beams travel along the paths between referenced DOM nodes; resize and layout affect the paths.', ['connection diagram', 'integrations', 'learning loop', 'workflow']],
  'text-reveal': ['Text color is revealed progressively according to page scroll progress.', 'Scroll through the text to advance the reveal.', ['scroll reveal', 'section headline', 'editorial storytelling']],
  'hyper-text': ['Characters scramble or swap before settling into the target word.', 'Hover or activate the text to trigger the scramble-and-resolve effect.', ['text interaction', 'headline accent', 'high decoration']],
  'animated-gradient-text': ['Text uses a moving gradient fill that shifts between configured colors.', 'The color gradient loops automatically behind the letterforms.', ['text motion', 'headline accent']],
  'orbiting-circles': ['Small elements travel around a shared circular center.', 'Orbits animate automatically; set radius, direction, and child elements.', ['orbit diagram', 'relationship map', 'learning loop']],
  dock: ['A row of icons grows and shifts based on pointer distance, like a desktop dock.', 'Move across the icons to trigger proximity scaling and spring movement.', ['pointer interaction', 'navigation pattern', 'highly app-like']],
  'word-rotate': ['A vertical slot rotates through a list of words or phrases.', 'Words change on a timer with a vertical transition.', ['text transition', 'headline', 'changing message']],
  'avatar-circles': ['A compact overlapping stack of supplied avatar images.', 'Static display; provide real, approved portraits and optional overflow count.', ['people grouping', 'team activity', 'requires real assets']],
  'typing-animation': ['Text appears character by character, optionally followed by a cursor.', 'The typewriter sequence starts when configured or when the element enters view.', ['text reveal', 'message drafting', 'conversation intelligence']],
  'sparkles-text': ['Small star-like particles appear and fade around emphasized text.', 'Sparkles are generated repeatedly around the text while mounted.', ['text decoration', 'celebration', 'high decoration']],
  'spinning-text': ['Characters follow a circular path and rotate around a center.', 'The circular lettering rotates continuously at a configurable speed and direction.', ['text motion', 'badge', 'high decoration']],
  'flip-text': ['Characters flip through a vertical or 3D transition to reveal replacement text.', 'A text change triggers per-character flipping; current public registry source is unresolved.', ['text transition', 'headline', 'source unresolved']],
  'comic-text': ['Text enters with a playful, elastic comic-book style motion.', 'The entrance animation runs when rendered; its exaggerated style is attention-grabbing.', ['text motion', 'playful tone', 'high decoration']],
  'icon-cloud': ['Icons are laid out in a manipulable 3D cloud that responds to pointer movement.', 'Drag or move across the cloud to rotate and explore its icons.', ['interactive 3d', 'integration map', 'pointer interaction']],
  'text-animate': ['A text wrapper offering several entrance and emphasis animations for its child text.', 'Choose the animation preset and trigger behavior; presets may run on mount or while in view.', ['text reveal', 'section headline', 'motion utility']],
  'scroll-based-velocity': ['A scrolling text track whose speed and direction react to scroll velocity.', 'Scroll faster or reverse direction to change the track’s movement.', ['scroll interaction', 'continuous movement', 'editorial storytelling']],
  'scratch-to-reveal': ['A scratch-off surface reveals content beneath it as the user drags.', 'Drag or touch across the overlay to erase/reveal; current public registry source is unresolved.', ['drag interaction', 'content reveal', 'source unresolved']],
  'shiny-button': ['A repeating sheen travels across the button; press adds a brief scale-down and hover adds shadow.', 'The sheen runs continuously; press the button to see tap feedback.', ['button treatment', 'ambient sheen']],
  'box-reveal': ['A moving rectangular mask slides away to reveal text beneath.', 'The reveal animation runs on entry; current public registry source is unresolved.', ['masked reveal', 'text reveal', 'source unresolved']],
  'shine-border': ['A moving highlight sweeps around the border of a container.', 'The border sheen loops automatically around the element.', ['border motion', 'attention cue']],
  'animated-circular-progress-bar': ['A circular meter whose arc animates to a supplied progress value.', 'On render, the arc transitions to the configured percentage and can show a label.', ['progress visualization', 'deal guidance', 'only with verified data']],
  confetti: ['A configurable burst of falling paper pieces exposed as a triggerable effect.', 'Call its imperative trigger or render behavior on a success event; particles fall and clear.', ['celebration', 'success feedback', 'action motivation']],
  'animated-subscribe-button': ['A button transitions between idle and subscribed states with a short confirmation animation.', 'Activate the button to switch to its completed state.', ['state transition', 'confirmation feedback', 'avoid false CTA']],
  'cool-mode': ['A press-and-hold particle emitter sends colorful image or text particles upward with spin and drift.', 'Press and hold the target to emit; release to stop creating particles while existing ones finish.', ['press and hold', 'celebration', 'rep motivation', 'success feedback']],
  'pulsating-button': ['A button emits a repeating outward pulse to draw attention.', 'The pulse runs while enabled; it can be started or stopped through its ref API.', ['attention cue', 'button treatment', 'use sparingly']],
  'ripple-button': ['A button creates a circular ripple from the activation point.', 'Click or tap to create a ripple that expands and fades.', ['button feedback', 'click interaction']],
  'file-tree': ['An expandable file and folder tree with nested rows and selection state.', 'Expand or collapse branches and select items; content is a file-system metaphor.', ['tree navigation', 'hierarchy', 'not a sales workflow']],
  'blur-fade': ['Children fade and sharpen into view with a configurable stagger.', 'The reveal is triggered when content mounts or enters the viewport.', ['sequenced reveal', 'content entrance']],
  safari: ['A Safari browser frame for presenting supplied web content or media.', 'Pass a URL, image, or video to the frame; it does not create a real Flozio screen.', ['browser frame', 'media presentation', 'product demo']],
  'iphone-15-pro': ['An iPhone device frame for supplied media.', 'Pass an image or video source; current public registry source is unresolved.', ['device frame', 'media presentation', 'source unresolved']],
  'rainbow-button': ['A button surrounded by a shifting multi-color gradient border.', 'The color treatment animates automatically around the button.', ['button treatment', 'high decoration']],
  'interactive-hover-button': ['A round accent dot expands to cover the button while the label slides away and returns with an arrow.', 'Hover the button to expand the dot and swap the label position.', ['button interaction', 'hover transition', 'call to action']],
  terminal: ['A terminal window that reveals scripted command and output lines over time.', 'The sequence starts when configured or brought into view; timings and lines are supplied.', ['sequenced reveal', 'technical storytelling', 'not a sales workflow']],
  'video-text': ['Text is used as a mask so a video plays inside its letterforms.', 'The video plays continuously beneath the fixed text mask.', ['media mask', 'headline visual', 'high contrast needed']],
  'pixel-image': ['An image is divided into a grid of clipped tiles that fade in at staggered random delays, then shift from grayscale to color.', 'The tile reveal and color transition run automatically after mount; it is not hover-triggered.', ['image transition', 'staggered reveal', 'editorial media']],
  highlighter: ['A marker-like stroke draws behind text when the text enters view.', 'Scroll the text into view to animate the highlight stroke.', ['scroll reveal', 'text emphasis', 'editorial storytelling']],
  'arc-timeline': ['A historical catalog name with no recoverable current official docs page or source; its design and motion are unverified.', 'Unknown until a specific official version/source is recovered.', ['unverified legacy entry', 'source unavailable']],
  'animated-theme-toggler': ['A theme switcher animates the transition between light and dark modes.', 'Activate the toggle; a circular mask transition reveals the next theme.', ['theme control', 'state transition', 'not marketing artwork']],
  'grid-beams': ['A historical catalog name with no recoverable current official docs page or source; its design and motion are unverified.', 'Unknown until a specific official version/source is recovered.', ['unverified legacy entry', 'source unavailable']],
  backlight: ['A backlight glow appears behind supplied media such as an image, video, or SVG.', 'The glow sits behind the media; no interaction is required.', ['media framing', 'glow effect', 'high decoration']],
  'dia-text-reveal': ['A horizontal color band sweeps across text, briefly tinting it before it returns to its base color.', 'The reveal runs as an entrance animation.', ['text reveal', 'headline accent']],
  'dotted-map': ['An SVG world map made from dots; configured point markers can pulse in radius and opacity.', 'The base map stays still; marker pulses run automatically.', ['map visualization', 'global coverage', 'integration map']],
  'floating-3d-particles': ['A canvas field of pseudo-3D particles with perspective, rotation, and gentle drift.', 'The particle field moves continuously without user input.', ['ambient motion', '3d background', 'high decoration']],
  'glare-hover': ['A diagonal glare passes over a surface in response to hover.', 'Hover over the element to reveal the moving glare.', ['hover effect', 'surface treatment']],
  'hexagon-pattern': ['A static SVG hexagon tiling used as a background pattern.', 'Configure size and color; there is no interaction.', ['background pattern', 'static texture']],
  'kinetic-text': ['Character weight changes dynamically as the pointer passes over the text.', 'Move the pointer across the characters to shift their font weight.', ['text interaction', 'pointer response']],
  'light-rays': ['Soft rays of light descend from the top of a section or container.', 'The rays animate automatically behind content.', ['ambient motion', 'background effect', 'high decoration']],
  'noise-texture': ['An SVG fractal-noise layer adds controllable grain to a surface.', 'Set opacity, contrast, and desaturation; generally static unless CSS is changed.', ['texture', 'surface treatment', 'static decoration']],
  'text-3d-flip': ['Characters rotate in 3D with a staggered flip to reveal text.', 'Hover triggers the per-character 3D flip.', ['text interaction', 'headline accent', 'high decoration']],
};

const unresolved = new Set(['script-copy-btn', 'flip-text', 'scratch-to-reveal', 'box-reveal', 'iphone-15-pro', 'arc-timeline', 'grid-beams']);
const legacyDocs = {
  'script-copy-btn': 'https://v3.magicui.design/docs/components/script-copy-btn',
  'flip-text': 'https://v3.magicui.design/docs/components/flip-text',
  'scratch-to-reveal': 'https://v3.magicui.design/docs/components/scratch-to-reveal',
  'box-reveal': 'https://v3.magicui.design/docs/components/box-reveal',
  'iphone-15-pro': 'https://v3.magicui.design/docs/components/iphone-15-pro',
};
// Per-component motion models checked against the local official source snapshot.
// For legacy entries without source, the profile stays explicitly docs-only.
const motionProfiles = {
  'magic-card': ['A radial spotlight follows pointer coordinates; spring values smooth the lag and the glow fades in on hover.', 'Pointer enter/move/leave.', 'Interactive while hovered; no autonomous loop.'],
  android: ['Static device bezel around caller-supplied image or video.', 'None; media plays only if the supplied media is animated.', 'Presentation frame, not a simulated interface.'],
  'warp-background': ['Perspective grid/card field with vertical elements traveling through the scene on repeating linear paths.', 'Starts on mount.', 'Continuous loop; content is slotted above the effect.'],
  'line-shadow-text': ['CSS background-position moves a narrow line-shadow texture across the text.', 'Starts on mount.', '15-second linear infinite sweep.'],
  'aurora-text': ['Clipped gradient background shifts position while the color field rotates and scales.', 'Starts on mount.', 'Eight-second ease-in-out loop, alternating direction.'],
  'morphing-text': ['Two text layers crossfade while blur changes, making one phrase resolve into the next.', 'Starts on mount; cycles through provided strings.', 'RAF-driven cycle; default morph 1.5 seconds plus 0.5-second pause.'],
  'scroll-progress': ['Scale/position of the progress bar is bound to page scroll progress.', 'Page scroll.', 'Tracks scroll continuously; no timer.'],
  lens: ['A clipped magnified copy moves beneath a circular/shape lens; the lens enters and exits with opacity and scale.', 'Pointer move; keyboard controls are also provided.', 'Visible while active over the media; no autonomous loop.'],
  pointer: ['Custom pointer follows the pointer position with Motion values and enter/leave visibility transitions.', 'Pointer enters, moves within, and leaves the wrapped target.', 'Interactive; spring tracking rather than timed looping.'],
  'smooth-cursor': ['Custom cursor follows pointer input with spring smoothing, orientation response, and visibility/fade handling.', 'Pointer movement; inactivity can return it to its resting state.', 'Interactive; requestAnimationFrame processes pointer movement.'],
  'progressive-blur': ['Layered CSS blur masks soften the edge of a clipped scroll region.', 'Scroll the contained content.', 'Static masks; perceived exposure changes as content moves underneath.'],
  'neon-gradient-card': ['Two CSS gradient layers shift their background position to animate the border and glow.', 'Starts on mount.', 'Three-second alternating loop.'],
  meteors: ['Each streak rotates to its configured angle, translates across the background, then fades out.', 'Starts on mount with per-meteor delays.', 'Five-second linear repeating trajectories.'],
  'grid-pattern': ['Static SVG grid lines.', 'None.', 'No motion.'],
  'striped-pattern': ['Static SVG diagonal stripe paths.', 'None.', 'No motion.'],
  'interactive-grid-pattern': ['SVG cells transition fill/stroke when the pointer enters; leaving clears the active cell.', 'Pointer enter/leave on each cell.', 'Hover-driven; fill response is quick and reset eases more slowly.'],
  'dot-pattern': ['SVG dots are static by default; optional glow mode pulses each dot with its own randomized duration and delay.', 'Optional glow prop enables motion.', 'Glow dots loop with reverse repeat; default off.'],
  'flickering-grid': ['Canvas cells receive randomized opacity changes to create an irregular flicker.', 'Starts only while the component is in the viewport.', 'Ambient canvas updates; pauses work outside the viewport.'],
  'hero-video-dialog': ['Click opens a video dialog; configurable entrance/exit variants move, scale, or fade the overlay and player.', 'Click preview; close or escape to dismiss.', 'One transition per open/close; supplied video playback is separate.'],
  'code-comparison': ['Static side-by-side code; hovering a side focuses its changed lines while dimming/blurring the others.', 'Hover either comparison panel.', '300 ms CSS focus transition; no autonomous motion.'],
  'script-copy-btn': ['Official v3 docs describe a copy control with package-manager command choices and copy feedback; source is no longer in the current registry.', 'Click copy or choose a package command.', 'Action feedback only; implementation animation cannot be source-verified.'],
  marquee: ['Duplicated track translates horizontally or vertically to form a seamless ticker.', 'Starts on mount; optional hover pause.', 'Continuous linear loop; configurable direction, duration, gap, and vertical mode.'],
  'glyph-matrix': ['Canvas redraws a grid of glyphs that change over time with fading and theme-aware color.', 'Starts on mount.', 'Continuous canvas animation; density and glyph palette configure the field.'],
  globe: ['WebGL globe rotates automatically; pointer drag adjusts its rotation and changes the cursor to grabbing.', 'Auto-rotation on mount; pointer drag temporarily controls orientation.', 'Continuous WebGL render; fades in after initialization.'],
  'shimmer-button': ['A sheen travels across the button while a conic spark rotates around it.', 'Starts on mount; press gives a slight downward active state.', 'CSS shimmer and rotation repeat continuously.'],
  'tweet-card': ['Static embedded post content; links get subtle hover color/scale feedback.', 'Pointer hover on links/icons only.', 'No card-level entrance or ambient animation.'],
  'client-tweet-card': ['Client-rendered version of the same static embedded post content.', 'Pointer hover on links/icons only.', 'No card-level entrance or ambient animation.'],
  'bento-grid': ['On hover, the icon shrinks, title block shifts upward, and hidden supporting text slides/fades into view.', 'Pointer hover on a tile; mobile layout keeps content visible.', '300 ms transitions; no autonomous motion.'],
  particles: ['Canvas particles drift and respond to pointer position/force; the field is recalculated through an animation loop.', 'Starts on mount; pointer movement influences the field.', 'Continuous canvas motion; configurable count, speed, size, and interaction.'],
  'number-ticker': ['A spring-driven number interpolates from a start value to the target.', 'Runs once when the element enters view, after a short delay.', 'One count-up/count-down per mount/in-view event.'],
  ripple: ['Concentric circles pulse in place by scaling inward/outward with opacity; they do not expand outward as click ripples.', 'Starts on mount.', 'Repeating CSS pulse; duration is configurable.'],
  'retro-grid': ['WebGL shader renders a perspective floor grid with animated depth/position.', 'Starts when mounted and visible.', 'Frame-by-frame render; IntersectionObserver pauses work offscreen.'],
  'animated-list': ['The list accumulates supplied children one by one; each new child springs from scale zero and fades in while earlier children stay visible.', 'A timer reveals the next child; the default delay is one second.', 'Finite sequence; it stops after the last child rather than looping.'],
  'animated-shiny-text': ['CSS background-position sends a narrow sheen across clipped text.', 'Starts on mount.', 'Eight-second repeating sweep.'],
  'animated-grid-pattern': ['SVG squares fade in, fade out, then get assigned new random positions.', 'Starts on mount and reacts to container resize.', 'Each square performs a staggered two-pass reveal; the next cycle changes positions.'],
  'border-beam': ['A bright segment moves along an SVG/path-like offset path around the host border.', 'Starts on mount; reverse, delay, and transition can be configured.', 'Linear infinite loop, six-second default.'],
  'animated-beam': ['An SVG linear-gradient highlight travels along a path connecting referenced elements.', 'Starts on mount after optional delay; path recalculates with layout/resize.', 'Repeated beam travel along the connector; easing and duration are configurable.'],
  'text-reveal': ['Text changes from muted to foreground color according to scroll progress through its container.', 'Scroll through the text section.', 'Scroll-linked reveal; not a timed typewriter.'],
  'hyper-text': ['Characters are repeatedly replaced by random glyphs until each position resolves to the target text.', 'Hover by default; can start on view or be configured otherwise.', 'Finite scramble sequence per trigger; optional repeat behavior.'],
  'animated-gradient-text': ['Clipped text gradient shifts its background position across configured colors.', 'Starts on mount.', 'Eight-second linear infinite loop.'],
  'orbiting-circles': ['Each child is positioned on a radius and rotated around a shared center while counter-rotation keeps its orientation upright.', 'Starts on mount.', 'Continuous linear CSS orbit; direction, radius, speed, and delay are configurable.'],
  dock: ['Pointer proximity drives spring-scaled icons and neighboring spacing, like a desktop dock.', 'Pointer moves across the dock; leaving resets the distance field.', 'Interactive spring response; no autonomous loop.'],
  'word-rotate': ['One word exits upward while the next enters from below with opacity and vertical translation.', 'A timer advances through the word list.', 'Repeated interval; default transition is 250 ms ease-out.'],
  'avatar-circles': ['Static overlapping avatar stack with optional overflow count.', 'None.', 'No motion; uses supplied images.'],
  'typing-animation': ['Characters are revealed in sequence; optional cursor blinks, and multiple words/lines can be sequenced.', 'Starts immediately or when in view according to props.', 'Finite typing sequence; cursor uses a repeating blink.'],
  'sparkles-text': ['Small SVG star particles are placed around the text, drift/scale, and fade in and out.', 'Starts on mount; star positions refresh periodically.', 'Particles repeat their short opacity/scale cycles.'],
  'spinning-text': ['Characters are individually placed around a circular path; the group rotates as one.', 'Starts on mount.', 'Linear infinite rotation; ten-second default duration.'],
  'flip-text': ['Official v3 docs describe a character-by-character flip when the displayed text changes, with a configurable duration and stagger delay.', 'Text/prop change.', 'Finite staggered transition; current source is unavailable, so exact transform and replay behavior are docs-only.'],
  'comic-text': ['Text fades in while scaling from 0.8 and rotating slightly, with an overshooting ease.', 'On mount.', 'One 600 ms entrance; no repeating motion.'],
  'icon-cloud': ['Icons are drawn on a canvas sphere that slowly rotates; pointer movement changes rotation, and drag gives direct control.', 'Auto-rotates until paused; pointer drag directly turns it.', 'Continuous canvas loop by default; pause button stops idle rotation.'],
  'text-animate': ['Selectable Motion presets animate child words/characters through opacity, position, scale, blur, and stagger variants.', 'On mount or in-view depending on props; may be one-shot.', 'Finite entrance/effect sequence; exact movement depends on chosen preset.'],
  'scroll-based-velocity': ['A duplicated text track translates continuously; scroll velocity changes its speed and direction.', 'Page/container scroll.', 'Scroll-linked velocity; track continues moving between scroll input.'],
  'scratch-to-reveal': ['Official v3 docs describe a pointer/touch scratch mask that erases to reveal child content and calls onComplete at a scratched-area threshold.', 'Drag or touch across the surface.', 'User-driven finite reveal; default completion threshold 50%; source was removed from current registry.'],
  'shiny-button': ['A sheen sweeps across the button on a repeating Motion animation; press scales it to 0.95 and hover adds shadow.', 'Ambient sheen; pointer press for tap feedback.', 'Continuous sheen plus brief tap state.'],
  'box-reveal': ['Official v3 docs describe a colored rectangular block moving across text, then clearing to reveal the text underneath.', 'On mount/entrance.', 'Finite reveal; documented default duration 0.5 s, current source unavailable.'],
  'shine-border': ['A CSS gradient highlight moves around the border background position.', 'Starts on mount when motion is allowed.', 'Infinite CSS sweep; respects motion-safe styling.'],
  'animated-circular-progress-bar': ['SVG arc dash length and transform transition from zero to the supplied percentage; the value is also rendered as text.', 'On mount/value update.', 'Finite transition, default about one second; not a live meter unless its value changes.'],
  confetti: ['Canvas-confetti emits falling particles in a configured burst.', 'Explicit API trigger or wrapped button click.', 'Finite event-driven burst; no particles until triggered.'],
  'animated-subscribe-button': ['Click toggles between two states; outgoing and incoming button content fade and slide vertically.', 'Click; can be controlled by a status prop.', 'Finite state transition; no automatic cycling.'],
  'cool-mode': ['Press-and-hold emits image/text particles that rise, rotate, drift, and fade; releasing stops new emissions while existing particles finish.', 'Pointer/touch press and hold; release ends emission.', 'Interactive particle loop with finite particle lifetimes.'],
  'pulsating-button': ['A pseudo-element repeats either a scale pulse or expanding pulse-ripple around the button.', 'Runs while enabled; exposed controls can start/stop it.', 'Continuous CSS loop while active.'],
  'ripple-button': ['Click position creates a circle that expands and fades from the interaction point.', 'Click or tap.', 'One finite CSS ripple per activation; 600 ms default.'],
  'file-tree': ['Clicking a folder expands/collapses nested rows through accordion height transitions; selection updates separately.', 'Click folder or item.', 'Finite open/close transition; rows are not continuously animated.'],
  'blur-fade': ['Children move up into place while opacity rises and blur clears, with a stagger between children.', 'On mount or when entering view; in-view is once by default.', 'Finite entrance with configurable delay and stagger.'],
  safari: ['Static Safari browser frame around supplied image/video/URL content.', 'None; supplied video may play.', 'Presentation frame, not a simulated website.'],
  'iphone-15-pro': ['Official v3 docs describe a device frame around supplied media; no built-in screen choreography is documented.', 'None; supplied video may play.', 'Legacy docs-only media frame; current source unavailable.'],
  'rainbow-button': ['A multi-color gradient border and blurred underglow shift their background position.', 'Starts on mount.', 'Continuous CSS rainbow loop.'],
  'interactive-hover-button': ['A small dot expands to cover the button as the original label slides away; replacement label/arrow slides in.', 'Pointer hover/focus state.', '300 ms transition; reverses on leave.'],
  terminal: ['Supplied terminal lines appear in sequence; optional typewriter mode reveals characters and cursor.', 'Immediately or when in view, with configurable delay.', 'Finite scripted sequence; no real command execution.'],
  'video-text': ['Video playback is clipped by text glyphs; the letters themselves do not move.', 'Video playback starts according to the supplied media/browser.', 'Media motion inside a static mask.'],
  'pixel-image': ['Image tiles fade into place at randomized delays, then a delayed grayscale-to-color transition resolves the image.', 'On mount.', 'Finite staggered reveal; no hover trigger.'],
  highlighter: ['Rough Notation draws a hand-marked underline/box/highlight stroke around or behind the text.', 'On mount or once when entering view, depending on props.', 'Finite draw (600 ms default); redraws if measured layout changes.'],
  'arc-timeline': ['Historical catalog name; no current official docs page or source was recoverable, so its animation and interaction are unverified.', 'Unknown.', 'Do not treat as understood or installable without a recoverable version/source.'],
  'animated-theme-toggler': ['Click starts a View Transition whose new-theme snapshot is revealed through a configurable circle, diamond, or star clip path.', 'Click/toggle.', 'Finite theme change transition; optional reveal origin is viewport center or toggle position.'],
  'grid-beams': ['Historical catalog name; no current official Magic UI docs page or source was recoverable, so beam behavior is unverified.', 'Unknown.', 'Do not treat as understood or installable without a recoverable version/source.'],
  backlight: ['Static layered glow behind supplied media.', 'None.', 'No motion in the component itself.'],
  'dia-text-reveal': ['A color/sheen band moves across the text using a Motion value, briefly changes the text treatment, then resets.', 'On mount or once when entering view; configurable delay/replay.', 'Finite sweep; can be set to replay when visibility changes.'],
  'dotted-map': ['SVG map dots remain fixed; configured point markers pulse their radius and opacity.', 'Starts on mount for marked points.', 'Marker pulses repeat; the base map has no motion.'],
  'floating-3d-particles': ['Canvas particles are projected in pseudo-3D and continuously drift/rotate; loop pauses when outside view.', 'Starts while visible.', 'Continuous RAF motion while intersecting the viewport.'],
  'glare-hover': ['A diagonal CSS glare band moves across the surface as background-position changes.', 'Hover/focus; optional play-once behavior.', 'Finite hover sweep or repeated hover sweeps according to props.'],
  'hexagon-pattern': ['Static SVG hexagon tiling.', 'None.', 'No motion.'],
  'kinetic-text': ['Per-character weight, stroke, and side padding change with hover; adjacent characters respond to create a local weight wave.', 'Pointer hover across characters.', '400 ms CSS transitions; no autonomous loop.'],
  'light-rays': ['Independent rays vary opacity from zero to intensity and rotate slightly, each with its own timing/phase.', 'Starts on mount.', 'Repeating ease-in-out cycles; default durations and delays are randomized.'],
  'noise-texture': ['Static SVG fractal-noise texture layer.', 'None.', 'No motion unless external CSS animates it.'],
  'text-3d-flip': ['Characters rotate through a 3D transform in a configurable direction and stagger order, then return to the resting transform.', 'Hover/activation trigger provided by the component.', 'Finite per-character sequence; timing and stagger are configurable.'],
};
for (const component of catalog.components) {
  const note = notes[component.name];
  if (!note) throw new Error(`Missing review note: ${component.name}`);
  component.reviewDescription = note[0];
  component.interaction = note[1];
  if (unresolved.has(component.name)) component.sourceUrl = null;
  if (!unresolved.has(component.name) && catalog.source.sourceRepositoryCommit) {
    component.sourceUrl = `https://github.com/magicuidesign/magicui/blob/${catalog.source.sourceRepositoryCommit}/apps/www/registry/magicui/${component.name}.tsx`;
  }
  if (legacyDocs[component.name]) {
    component.legacyDocsUrl = legacyDocs[component.name];
    component.sourceUrl = null;
  }
  const motionProfile = motionProfiles[component.name];
  if (!motionProfile) throw new Error(`Missing motion profile: ${component.name}`);
  component.motionProfile = {
    mechanism: motionProfile[0],
    trigger: motionProfile[1],
    lifecycle: motionProfile[2],
    evidence: legacyDocs[component.name]
      ? 'official v3 docs only; current implementation source unavailable'
      : unresolved.has(component.name)
        ? 'no recoverable official source or component docs; behavior unverified'
        : 'checked against the local official component source snapshot',
  };
  component.behaviorTags = note[2];
  component.fitTags = note[2];
  component.reviewStatus = unresolved.has(component.name)
    ? 'docs-reviewed-source-unresolved'
    : component.sourceStatus === 'docs-only'
      ? 'docs-reviewed-source-not-in-public-registry'
      : 'docs-and-source-reviewed';
  component.previewStatus = component.runtimeMotionAudit?.status || (component.docsUrl?.endsWith('/docs/components')
    ? 'component-specific-docs-page-unresolved'
    : component.docsStatus === '200'
      ? 'official-docs-preview-available-not-individually-checked'
      : 'docs-preview-unavailable');
}
catalog.source.componentReviewCount = catalog.components.length;
catalog.source.sourceReviewedCount = catalog.components.filter((item) => item.reviewStatus === 'docs-and-source-reviewed').length;
catalog.source.docsOnlyReviewCount = catalog.components.filter((item) => item.reviewStatus === 'docs-reviewed-source-not-in-public-registry').length;
catalog.source.unresolvedReviewCount = catalog.components.filter((item) => item.reviewStatus === 'docs-reviewed-source-unresolved').length;
catalog.source.motionProfileSourceReviewedCount = catalog.components.filter((item) => item.motionProfile.evidence.startsWith('checked against')).length;
catalog.source.legacyDocsBehaviorCount = catalog.components.filter((item) => Boolean(item.legacyDocsUrl)).length;
catalog.source.legacyUnverifiedCount = catalog.components.filter((item) => ['arc-timeline', 'grid-beams'].includes(item.name)).length;
const runtimeByRoute = new Map();
for (const item of catalog.components) {
  if (!item.runtimeMotionAudit || !item.docsUrl) continue;
  const key = new URL(item.docsUrl).pathname;
  const current = runtimeByRoute.get(key);
  if (!current || item.runtimeMotionAudit.status === 'runtime-preview-rendered') runtimeByRoute.set(key, item.runtimeMotionAudit);
}
const runtimeRoutes = [...runtimeByRoute.values()];
catalog.source.runtimeDocsPageCount = runtimeRoutes.length;
catalog.source.runtimeMotionAuditCount = runtimeRoutes.filter((item) => item.status === 'runtime-preview-rendered').length;
catalog.source.runtimeMotionAuditUnavailableCount = runtimeRoutes.filter((item) => item.status !== 'runtime-preview-rendered').length;
fs.writeFileSync(path, `${JSON.stringify(catalog, null, 2)}\n`);
const escapeCell = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const link = (label, url) => url ? `[${escapeCell(label)}](${url})` : '—';
const rows = catalog.components.map((item) =>
  `| ${link(item.title, item.legacyDocsUrl || item.docsUrl)} | ${escapeCell(item.reviewDescription)} | ${escapeCell(item.motionProfile.mechanism)} | ${escapeCell(item.motionProfile.trigger)} ${escapeCell(item.motionProfile.lifecycle)} | ${escapeCell(item.fitTags.join(', '))} | ${escapeCell(item.reviewStatus)} | ${escapeCell(item.runtimeMotionAudit ? `${item.runtimeMotionAudit.status}; preview nodes ${item.runtimeMotionAudit.previewCount}; Web Animations detected ${item.runtimeMotionAudit.activeAnimationDetected}; frame changed ${item.runtimeMotionAudit.frameChangedBetweenSamples}; input ${item.runtimeMotionAudit.inputMode || 'none'}` : item.previewStatus)} | ${link('source', item.sourceUrl)} |`,
);
const routeCount = catalog.source.runtimeDocsPageCount || 0;
const renderedCount = catalog.source.runtimeMotionAuditCount || 0;
const guide = `# Magic UI component review\n\nGenerated from the local catalog and official Magic UI docs/source snapshot at commit ${catalog.source.sourceRepositoryCommit || 'not recorded'}. Use this as a searchable research index, not as approval to put a component on the Flozio homepage. Each row records its motion mechanism, trigger, lifecycle, tags, source status, and available runtime evidence. The seven legacy entries without current source are explicitly marked docs-only or unverified; their behavior is not represented as source-verified.\n\n## Runtime audit\n\nThe browser audit visited ${routeCount} distinct component documentation routes and checked the first active preview area on each route. ${renderedCount} previews rendered; ${catalog.source.runtimeMotionAuditUnavailableCount} route(s) did not produce a usable preview. It sampled two frames about 1.4 seconds apart and separately recorded frame changes and running Web Animations API animations. It moved the pointer over each preview (or its first control) and exercised mapped click, press-and-hold, and drag examples. A changed frame is evidence of visual change during the sample window, not proof by itself that the intended animation worked. This pass sampled the first active preview per route, not all ${catalog.source.officialExampleCount} example variants as individual demos.\n\nCurrent source-backed entries include the installable registry files and docs components present in the local official source snapshot. Seven legacy records have no current source; five have behavior descriptions in official v3 docs, and two have no recoverable official behavior record. Dotted Map source is available and its marker pulse is source-confirmed, but its docs preview did not render in the browser pass.\n\n| Component docs | What it does | Motion mechanism | Trigger / lifecycle | Search / fit tags | Source review | Runtime observation | Source |\n|---|---|---|---|---|---|---|---|\n${rows.join('\n')}\n`;
fs.writeFileSync('MAGIC_UI_COMPONENT_GUIDE.md', guide);
const runtimeIndex = Object.fromEntries(catalog.components.filter((item) => item.runtimeMotionAudit).map((item) => [item.name, {
  url: item.docsUrl,
  status: item.runtimeMotionAudit.status,
  first: {
    previewReady: item.runtimeMotionAudit.status === 'runtime-preview-rendered',
    previewCount: item.runtimeMotionAudit.previewCount,
    demoRunningAnimations: item.runtimeMotionAudit.runningAnimationsAtSample,
    animationNames: item.runtimeMotionAudit.activeAnimationDetected ? ['detected-by-runtime-audit'] : [],
  },
  second: null,
  frameChangedBetweenSamples: item.runtimeMotionAudit.frameChangedBetweenSamples,
  activated: item.runtimeMotionAudit.interactionAttempted,
  inputMode: item.runtimeMotionAudit.inputMode,
} ]));
fs.writeFileSync('public/magicui-runtime-audit.json', `${JSON.stringify(runtimeIndex, null, 2)}\n`);
console.log(`Wrote review metadata for ${catalog.components.length} Magic UI catalog entries and generated MAGIC_UI_COMPONENT_GUIDE.md.`);
