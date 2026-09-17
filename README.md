# Interactive Venn — Customizable Template

A dark, hand-coded-feeling Venn diagram: hover a domain to flood it, hover an overlap to
name it, click to filter, click again to fire a callback. A live membership-test cursor
readout tells you exactly which set you're standing in. Two ambient dust motes drift on
their own, bounce off a dashed "off-the-record" set, and flee your cursor before settling
back.

Everything is live-editable from the page itself — no build step, no dependencies but a
Google Font, one file.

**[Open `index.html`](./index.html) in any browser to use it.** No server required.

## What's customizable

- **Labels, colors, copy** — every domain's name, color, and description; every named
  overlap's name and description; the triple-overlap region; the off-the-record set's
  label; an optional highlight marker.
- **Layout** — pick 3 circles (every one of the seven regions is geometrically real) or
  5 circles (the paramv.com original — one set drawn partly off-frame, honestly, since
  5 circles can't show all 31 combinations of 5 sets).
- **Physics** — drift speed, how fast a mote flees your cursor, cursor reach and force,
  hover-flood intensity, bloom glow on/off.
- **Import / export** — save your version as a small JSON file, or load one back in.
  Two people can hand each other a skin without touching code.

What's _not_ exposed in the UI: raw circle pixel positions. Getting five circles to show
seven real named overlaps (or three circles to show all seven of theirs) is a solved
geometry problem, not a slider — the two layouts here are pre-solved for you. If you want
a different circle count or arrangement, the layout geometry lives in the `LAYOUTS`
constant near the top of the `<script>`; everything downstream (hit-testing, hover-flood,
the intersection lens fills, the halo rings, the drift physics) is generated from it, not
hand-duplicated per circle.

## Use it as a starting point

The whole file is ~40KB of plain HTML/CSS/JS. To build your own version in code instead
of the UI, edit the `DEFAULTS` object near the top of the `<script>` — it's the same
shape the export/import JSON uses:

```js
domains: { d0: { label, color, desc }, d1: { ... }, ... },
pairs:   { "d0,d1": { name, desc }, ... },
triple:  { name, desc },
marker:  { enabled, label, color },
offrec:  { enabled, label },
physics: { driftBase, driftMax, cursorReach, cursorForce, flood, bloom },
```

Wire `onEnter` (currently just `console.log`s) to navigate or scroll when someone clicks
an already-filtered domain a second time.

## Origin

This engine started as fig. 1 on [paramv.com](https://paramv.com), with a nod to
[eileenie.net](https://eileenie.net)'s cursor-driven venn homepage for the "dynamic
movement" cue — flooding a hovered region, and dust that reacts to where you actually are
on the page.

## License

MIT — take it, reskin it, ship it. See [LICENSE](./LICENSE).
