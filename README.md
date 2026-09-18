# Interactive Venn

A dark, hand-coded-feeling Venn diagram that you edit from the page itself: hover a domain to
flood it, hover an overlap to name it, click to filter, click again to fire a callback. A live
membership-test cursor readout tells you which set you are standing in.

**[Live demo](https://interactive-venn-template.vercel.app)**, mirrored on
[GitHub Pages](https://pvcomms.github.io/interactive-venn-template/). Or clone and open
[`index.html`](./index.html) in any browser.

![The five-circle layout with a domain hovered: the set floods with its own colour, the named
intersections around it dim, and the cursor readout names the region under the
pointer.](docs/img/venn.png)

## What it reads and writes, and what never leaves the machine

Nothing leaves the machine. There is no analytics, no telemetry, no error reporting and no
backend. The page holds its state in memory for as long as the tab is open, and forgets it on
reload.

| Path                            | Direction | What                                           |
| ------------------------------- | --------- | ---------------------------------------------- |
| `venn-config-<n>circle.json`    | write     | your version, exported through the browser's own download |
| any file you pick with _import_ | read      | a config in that same shape, read in the page  |

One third-party request is made today: the Google Fonts stylesheet and the two font files it
pulls in. That is the one thing the page fetches from anywhere, and removing it is
[feature 001](docs/features/001-zero-third-party-requests.md).

## Prerequisites

A browser. There is no Node, no package manager, no build step and no dependency to install.
Python is only needed if you want to serve the file over HTTP rather than open it directly.

## Run

```bash
open index.html                  # or drag it into a browser window
python3 -m http.server 5252      # then http://localhost:5252
```

Taking the screenshot in `docs/img/` needs Playwright, which is not a dependency of this repo —
`scripts/shot.mjs` imports it by absolute path from a sibling project.

## How it works

One file. The geometry is a constant, the content is a separate constant, and everything
downstream is generated from the two.

`LAYOUTS` holds the solved circle positions for each layout. `DEFAULTS` holds the labels,
colours, copy and physics. `buildMarkup()` writes the whole SVG from those two, and
`wireInteraction()` attaches the hit-testing, the hover flood, the keyboard paths and the drift
loop to what it just built. Changing anything in the customize panel mutates the config and
re-runs both, which is why every edit shows up immediately and why there is no diffing layer.

Hit-testing is a point-in-circle test against the same numbers that drew the circles, so the
named regions cannot drift out of sync with the geometry. The cursor readout is that test
printed: it names the set membership under the pointer on every move.

### What is customizable

- **Labels, colors, copy** — every domain's name, color and description; every named overlap's
  name and description; the triple-overlap region; the off-the-record set's label; an optional
  highlight marker.
- **Layout** — 3 circles, where every one of the seven regions is geometrically real, or
  5 circles, the paramv.com original, with one set drawn partly off-frame because five circles
  cannot show all thirty-one combinations of five sets.
- **Physics** — drift speed, how fast a mote flees the cursor, cursor reach and force,
  hover-flood intensity, bloom glow on or off.
- **Import and export** — save your version as a small JSON file, or load one back in. Two
  people can hand each other a skin without touching code.

What is not exposed in the UI: raw circle pixel positions. Getting five circles to show seven
real named overlaps, or three circles to show all seven of theirs, is a solved geometry problem
rather than a slider, and the two layouts here are pre-solved. If you want a different circle
count or arrangement, the geometry is the `LAYOUTS` constant near the top of the `<script>`;
hit-testing, the hover flood, the intersection lens fills, the halo rings and the drift physics
are all generated from it rather than hand-duplicated per circle.

### Use it as a starting point

The whole file is 64 KB of plain HTML, CSS and JS. To build your own version in code rather
than through the UI, edit the `DEFAULTS` object near the top of the `<script>`. It is the same
shape the export and import JSON uses:

```js
domains: { d0: { label, color, desc }, d1: { ... }, ... },
pairs:   { "d0,d1": { name, desc }, ... },
triple:  { name, desc },
marker:  { enabled, label, color },
offrec:  { enabled, label },
physics: { driftBase, driftMax, cursorReach, cursorForce, flood, bloom },
```

Wire `onEnter`, which currently only calls `console.log`, to navigate or scroll when someone
clicks an already-filtered domain a second time.

`docs/TEMPLATE.md` is the fuller version of this: what in the file is one person's and what is
the instrument.

### Origin

The engine started as fig. 1 on [paramv.com](https://paramv.com), with a nod to
[eileenie.net](https://eileenie.net)'s cursor-driven venn homepage for the dynamic-movement
cue: flooding a hovered region, and dust that reacts to where you actually are on the page.

## Part of the constellation

One of four repos from the Center for Applied Post-Phenomenology, alongside
[niwa](https://github.com/pvcomms/niwa) and kiku. They share one contract: local by default,
flat files as the database, no dependency without a written reason, and the tool never decides
anything on your behalf. The contract is vendored into [`AGENTS.md`](./AGENTS.md); the map of
this repo is [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

This one is the outlier in the group: it is a template rather than an instrument, and it is
meant to be taken and reskinned.

## License

MIT. Take it, reskin it, ship it. See [LICENSE](./LICENSE).
