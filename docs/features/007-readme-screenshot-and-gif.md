---
title: README screenshot and GIF
status: draft
created: 2026-09-19
---

# 007 — README screenshot and GIF

## Why

The README now opens with a still image, which shows the layout and the palette and cannot show
the thing the page is actually about: a region floods as the cursor crosses it, the readout
names the set under the pointer, and a mote swerves away from the cursor and settles back. All
three are motion, and a still frame argues for the page in the one register the page does not
work in.

## What changes

- Before: one static PNG under the title.
- After: a short loop under the title showing a hover flood, an overlap lighting up, and a mote
  fleeing the cursor, with the PNG kept as the fallback and as the social preview source.

## Where

| File                     | Change                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `scripts/shot.mjs`       | a second mode that drives the pointer and captures frames   |
| `docs/img/venn.gif`      | new, or `.mp4`                                              |
| `README.md`              | the clip above the live-demo line, PNG as fallback          |

Playwright can move the mouse along a path and screenshot each step, which gives deterministic
frames rather than a screen recording that has to be redone whenever the page changes. Assemble
with whatever is on the machine; `ffmpeg` produces both GIF and MP4 from a frame sequence.

Five to eight seconds is enough. Keep it under about 2 MB so the repo stays quick to clone;
MP4 in `<video autoplay loop muted playsinline>` is far smaller than GIF at the same quality and
GitHub renders both.

The drift motes are disabled under `prefers-reduced-motion`, and headless Chromium can be
launched either way. Capture with motion enabled, and make sure the still PNG is captured in a
state that does not depend on where the motes happen to be.

## Out of scope

No screen recording by hand. No hosted video. No autoplaying audio, ever. No animation added to
the page for the sake of the clip.

## Acceptance checks

```bash
node scripts/shot.mjs --motion    # writes docs/img/venn.gif or .mp4
ls -lh docs/img/                  # the clip is under 2 MB
```

- [ ] The clip shows a flood, a named overlap and a mote reacting to the cursor
- [ ] It loops without a visible seam
- [ ] It renders on the repo page on github.com
- [ ] The still PNG is still there and still used by 006 for the social preview
- [ ] Re-running the script twice produces the same frames

## Notes

Draft rather than next: the frame path through the diagram has to be chosen by eye, and what
reads well in a loop cannot be specified in advance. Whoever does it should expect to try
several paths.
