---
title: Presets gallery
status: next
created: 2026-09-19
---

# 004 — Presets gallery

## Why

Import works and has nothing to import. A person arriving at the page sees one diagram and a
panel full of text fields, and has to imagine what a different version would look like before
deciding whether to spend ten minutes making one. Two or three worked examples turn
"customisable" into something visible in one click.

The examples also teach the format. Somebody who wants to write a config by hand currently has
to export one first to see the shape.

Presets are examples, not recommendations. They load on request, nothing is ranked, and the
list stays short enough that it is a set of samples rather than a menu of what to think.

## What changes

- Before: the only way to see a different diagram is to type one.
- After: a row of named presets above the import and export buttons; clicking one applies it
  through the same code path the file import uses.

## Where

| File                   | Change                                                            |
| ---------------------- | ------------------------------------------------------------------- |
| `presets/*.json`       | new. three or four `{layout, config}` files                        |
| `index.html` markup    | a preset row in `.cz-actions`                                      |
| `index.html` script    | `applyPayload(payload)` extracted from the `fileImport` handler    |
| `README.md`            | a line about the presets                                           |

Extract `applyPayload()` first. The import handler currently validates and applies inline, and
both the file path and the preset path need identical behaviour — including the layout switch
and the panel re-render.

Fetching `presets/x.json` fails from `file://` in Chromium. Either inline the presets as a
constant and keep the files as the readable source, or accept that presets only work when the
page is served and say so on the button. Inlining matches what this repo does elsewhere and
keeps the `file://` promise; if you inline, the files stay the source of truth and a comment
says how to regenerate.

Four that cover different shapes: a pitch-deck three-circle (product, market, team); a
content-strategy three-circle; the current story / craft / money default, saved explicitly so
the default is itself a preset; and a five-circle with a domain set unrelated to the shipped
one.

## Out of scope

No preset editor, no saving a preset back into the repo from the page, no gallery page, no
thumbnails. No ranking, ordering by popularity, or "recommended" marker.

## Acceptance checks

```bash
python3 -m http.server 5252
open index.html            # the file:// path, which must behave the same
```

- [ ] At least three presets load from the page without a file picker
- [ ] Loading a preset that uses the other layout switches the layout and re-renders the panel
- [ ] Each preset reads as a coherent example: different domains, different overlaps, not the
      same diagram with colours changed
- [ ] After loading a preset, export produces a file that re-imports to the same diagram
- [ ] The presets work from `file://`, or the button says plainly that they need a server

## Notes

The default config and the "explicit default preset" must not drift apart. If you inline the
presets, generate the default one from `DEFAULTS` rather than pasting a copy.
