# Component Lab

The lab loads Magic UI's official documentation app locally so its interactive
previews, motion, and code examples can be inspected in the browser.

On a fresh checkout, run `npm run setup:component-lab` once. This clones the
official Magic UI repository into the ignored `.magicui-source/` directory and
installs the docs app's dependencies. Then run `npm run dev`; it starts Flozio
on port 38471 and Magic UI docs on port 38472. Open
`http://localhost:38471/component-lab.html`.

The docs app is a local research dependency. Its examples are third-party
content and do not represent Flozio's product or shipped features.
