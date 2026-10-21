# Component Lab

The current lab can load Magic UI's official documentation app locally so its
interactive previews, motion, and code examples can be inspected in the browser.
This is the existing Magic UI review setup; a vendor-docs iframe alone does not
count as a completed review for a new library.

On a fresh checkout, run `npm run setup:component-lab` once. This clones the
official Magic UI repository into the ignored `.magicui-source/` directory and
installs the docs app's dependencies. Then run `npm run dev`; it starts Flozio
on port 38471 and Magic UI docs on port 38472. Open
`http://localhost:38471/component-lab.html`.

The docs app is a local research dependency. Its examples are third-party
content and do not represent Flozio's product or shipped features. New libraries
must use the isolated, locally imported preview workflow in
[`COMPONENT_REVIEW_PROCESS.md`](COMPONENT_REVIEW_PROCESS.md). Check each
library's license before storing or committing source; Aceternity source stays
in an ignored local workspace. After setup, run
`npm run prepare:aceternity-preview -- tracing-beam` to create the isolated
Aceternity app and import the first native preview. Then restart `npm run dev`;
the preview runs at `http://localhost:38473` and shows the imported implementation
source in a collapsible panel. The app reuses installed research dependencies
through an ignored local link, so it does not change Flozio's homepage package.
The generator is the starter for per-item previews, not evidence that all
Aceternity entries have been reviewed.
