# Agents

Constellation-wide rules are vendored at the bottom of this file. The map is
`docs/ARCHITECTURE.md` — read that instead of listing files.

## Stack

None. One HTML file with an inline `<style>` and an inline `<script>`, in ES5-flavoured
JavaScript with `var` and `function` throughout. No framework, no bundler, no package manager,
no lockfile, no `node_modules`. The only thing fetched from outside is the Google Fonts
stylesheet in `<head>`, and removing that is `docs/features/001-zero-third-party-requests.md`.

`scripts/shot.mjs` is the one file that runs under Node. It loads Playwright from a sibling
project at `~/Code/shosai/node_modules/playwright`, overridable with `PLAYWRIGHT_DIR`, on
purpose: that keeps this repo dependency-free.

## Commands

```bash
python3 -m http.server 5252   # the proof: open http://localhost:5252 and the diagram works
open index.html               # same page over file://, which must also work
node scripts/shot.mjs         # rewrites docs/img/venn.png at 1400x900
grep -c 'https://' index.html # count of third-party references; 001 drives this to fonts-free
```

There are no tests and no typecheck. `CONTRIBUTING.md` has the by-hand list that stands in for
them, and a change is not finished until that list has been walked.

## Do not touch

`LAYOUTS` geometry unless a feature spec says so. The circle positions are solved so that every
named region is geometrically real; nudging a `cx` to make a label sit better silently makes an
overlap a lie. `docs/img/venn.png` by hand — it is written by `scripts/shot.mjs`.

## Invariants

**Hit-testing reads the same numbers that drew the circles.** `inCircle` tests against the
`LAYOUTS` values, so a region cannot be named one thing and be another. Never introduce a second
copy of the geometry for hit-testing, hover or physics.

**Everything downstream is generated from `LAYOUTS` and the config.** Markup, lens fills, halo
rings, labels and drift are built in a loop over the layout. Adding a circle must never mean
adding a hand-written block per circle.

**The page works from `file://`.** Someone who downloads the file and double-clicks it gets the
whole thing. No feature may depend on being served, on a module graph, or on `fetch` of a
sibling file without a `file://` fallback.

**No build step and no dependency.** Both are the product here, not an accident of scale.

## Traps

**The drift loop has a `setInterval` backstop and an `IntersectionObserver` stop.**
`frameLoop(drawFn, fallbackMs)` runs on `requestAnimationFrame` and separately checks every
`fallbackMs` whether rAF has gone quiet for three intervals, then draws anyway. rAF is throttled
or stopped outright in a background tab and in some embedded webviews, and without the backstop
the motes freeze. The observer stops the loop entirely when the SVG scrolls out of view. If you
rewrite the animation, keep both halves, and test the page both scrolled away and in a
background tab.

**`reduce` and `hoverNone` are read once at boot.** `prefers-reduced-motion` disables the drift
and the circle-draw animation; `hover: none` removes the cursor reticle. Neither is re-read when
the media query changes, so a feature that re-wires interaction must not assume they are live.

**`wireInteraction()` runs again on every edit.** It re-queries the DOM and re-attaches
listeners to the markup `buildMarkup()` just replaced. Listeners attached to `document` rather
than to the rebuilt nodes accumulate across rebuilds — the existing `keydown` handler is already
one of these. Attach to elements inside the SVG where you can.

**Import accepts a file the page itself wrote.** It validates the shape loosely and shows an
alert on failure. It is not a sanitiser for hostile input, and the config is interpolated into
markup through `esc()`. Anything that widens what import accepts has to widen the escaping too.

---

<!-- BEGIN:capp -->

## Constellation rules

This repo is part of the Center for Applied Post-Phenomenology constellation. These rules hold
here and in every sibling repo. This block is generated — edit `spine/KERNEL.md`, not this copy.

**Read this much, then stop.** This file, then `docs/ARCHITECTURE.md` for the map, then the one
feature spec you were given at `docs/features/NNN-slug.md`. Do not crawl the repo to get
oriented — the architecture doc exists so you do not have to. Do not open a fifth document
without a reason you could state. Token discipline is a product requirement here, not a
preference: a tool about attention that wastes yours is a joke.

**Local by default.** Personal data stays on the machine that made it. No telemetry, no
analytics, no error reporting to a third party, no fonts or scripts from a CDN, no usage pings.
If a feature needs the network it says so in its spec and names the host.

**Flat files are the database.** Markdown with YAML frontmatter for what a human writes, JSON
for what a program writes. No hosted database, no ORM, no migration framework.

**The tool never decides.** Nothing ranks a person's options for them, scores them against a
norm, or recommends. Instruments surface; people judge. If a spec asks for a recommendation
engine, it is out of scope — say so rather than building it.

**No dependency without a written reason** in `docs/DECISIONS.md`. Prefer the standard library.
Prefer thirty lines you can read.

**Three similar lines beat a premature abstraction.** Extract on the third repetition.

**Never invent a fact about the system.** If you need to know what deploys where or whether
something is live, check it. This whole structure exists because hand-written claims drifted
from reality while still reading as authoritative.

**Features** are `docs/features/NNN-slug.md` with frontmatter `status:` of `draft` / `next` /
`building` / `shipped` / `parked`. Acceptance checks are commands with expected output, never
adjectives. Mark `shipped` only when you ran them and they passed — and report the output. A
feature you could not finish stays `building` with a note on what blocked it. Never silently
narrow scope.

**Style.** Plain declarative prose, no emoji, no "comprehensive" or "seamlessly", no summary
paragraph restating what was just said. Code matches its neighbours. Commit subjects say what
changed and why it mattered.

**Before you finish**, run the repo's tests and typecheck, and say plainly what passed, what
failed, and what you did not do.

<!-- END:capp -->
