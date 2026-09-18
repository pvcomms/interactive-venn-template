---
title: Four-circle layout
status: draft
created: 2026-09-19
---

# 005 — Four-circle layout

## Why

The layouts skip from three to five. Four sets is a common thing to want to draw, and the two
existing layouts bracket it without covering it.

Four circles cannot do it. A true four-set Venn diagram with all fifteen regions present
requires four congruent **ellipses**, each rotated from its neighbour — the standard symmetric
arrangement. Four circles can be arranged to look approximately right while several of the
fifteen regions are missing or false, and that is precisely the failure this repo's geometry
decision exists to prevent.

## What changes

- Before: the layout dropdown offers 3 and 5.
- After: it offers 3, 4 and 5, and the 4 is a correct four-ellipse diagram in which every one of
  the fifteen regions can be visited and every nameable one reports itself correctly.

## Where

| File                    | Change                                                                |
| ----------------------- | ----------------------------------------------------------------------- |
| `index.html` `LAYOUTS`  | a `"4"` entry carrying ellipse geometry: `cx`, `cy`, `rx`, `ry`, `rot`  |
| `index.html` `buildMarkup` | emit `<ellipse>` with a rotation transform where the layout says so |
| `index.html` `inCircle` | becomes a shape test that dispatches on the shape                      |
| `index.html` `wireDrift` | the offrec bounce and the `activeAt` colour test use the same dispatch |
| `index.html` `DEFAULTS` | a `"4"` content block: four domains, the nameable intersections        |
| `README.md`             | the layout list                                                        |

The containment test for a rotated ellipse is to rotate the point back by `-rot` about the
centre and check `(dx/rx)² + (dy/ry)² ≤ 1`. Keep the circle path as it is: the 3 and 5 layouts
must keep using the cheaper test and must not change behaviour at all.

The clip paths in `buildMarkup()` are `<circle>` elements today and become shape-dependent too,
which affects the intersection lens fills.

Fifteen regions is more than can be labelled legibly. Decide which are named — most likely the
six pairs, the four triples and the centre — and leave the rest unnamed but correctly reported
by the cursor readout.

## Out of scope

No general n-set solver. No six or more. No automatic label placement: anchors are part of the
layout constant, placed by hand, like the existing two.

## Acceptance checks

```bash
python3 -m http.server 5252
```

- [ ] All fifteen regions are reachable with the cursor, confirmed against the readout
- [ ] The centre region, inside all four, reports all four letters
- [ ] Each of the four triple regions reports exactly three
- [ ] The 3 and 5 layouts are pixel-identical to before, and still use the circle test
- [ ] The drift motes bounce off the off-record set in the 4 layout as they do in the others
- [ ] Keyboard focus reaches all four sets in order

## Notes

This is the most geometry-heavy item in the list. Budget time for the ellipse maths being right
rather than looking right: a diagram whose regions are subtly wrong is worse than no diagram,
because it is still legible and now it lies.

The four-ellipse arrangement is standard and can be taken from any reference on Venn diagram
construction; record where the numbers came from in `docs/DECISIONS.md` when they land.
