---
title: Repo polish: topics and social preview
status: next
created: 2026-09-19
---

# 006 — Repo polish: topics and social preview

## Why

The repo is public and findable only by name. GitHub's topics are how someone looking for a
vanilla-JS Venn diagram with no build step arrives at it without knowing it exists, and a social
preview image is what a pasted link becomes in a message. Both are done once and never again.

The description on the repo also predates the customisation work and undersells what the page
does.

## What changes

- Before: no topics, no social preview, a description that mentions labels, colours, layout and
  physics.
- After: seven topics, a preview image, and a description that matches the page.

## Where

| Where                             | Change                                     |
| --------------------------------- | -------------------------------------------- |
| GitHub repo settings              | topics, social preview, description         |
| `docs/img/venn.png`               | the preview source, already generated       |

```bash
gh repo edit pvcomms/interactive-venn-template \
  --add-topic svg --add-topic data-visualization --add-topic venn-diagram \
  --add-topic vanilla-js --add-topic no-build --add-topic interactive --add-topic html-css-js
```

The social preview cannot be set from the CLI; it is Settings, General, Social preview, and it
wants a 1280×640 image. `docs/img/venn.png` is 1400×900, so either crop it to that ratio in the
same script or add a second output to `scripts/shot.mjs` at that size.

Revisit the description after 002 and 004 land, since shareable links and presets are the parts
a stranger would most want to know about.

## Out of scope

No GitHub Pages reconfiguration, no CI, no badges in the README, no releases beyond the tag that
already exists. No promotion anywhere.

## Acceptance checks

```bash
gh repo view pvcomms/interactive-venn-template --json repositoryTopics,description
```

- [ ] The command lists all seven topics
- [ ] The topics are visible on the repo page
- [ ] Pasting the repo URL somewhere that unfurls links shows the preview image
- [ ] The description reads true against the page as it is that day

## Notes

Depends on nothing, and the preview image is better once 007 has produced a frame worth using.
Doing the topics now and the image after 007 is a reasonable split.
