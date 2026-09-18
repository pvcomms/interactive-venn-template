# Contributing

There is no CI on this repo, and there will not be. It is one static HTML file with no build
step and no test runner, and a pipeline that installs a browser to lint it would cost more than
it catches. The checks below are the ones a person walks before a change is finished.

## Before you start

Read `AGENTS.md`, then `docs/ARCHITECTURE.md`. If your change is one of the numbered features,
read that spec and nothing else. The numbered specs in `docs/features/` are the work queue; the
first one in `building`, then `next`, then `draft` order is the next thing to do.

If your change is not in a spec and is more than a typo, write the spec first. It takes ten
minutes and it is how the next person finds out why.

## Check it by hand

Serve the file and walk this list. Every item is something that has broken or could break
silently.

```bash
python3 -m http.server 5252   # http://localhost:5252
open index.html               # and the same page over file://, which must also work
```

1. **Both layouts.** Switch between 3 and 5 circles. Both draw, both label, both name their
   overlaps.
2. **Hit-testing matches the drawing.** Move the cursor slowly across a boundary. The readout
   changes at the line, not before or after it.
3. **Named regions.** Hover each named intersection. The name in the panel is the name in the
   diagram, and the letters match the domain initials.
4. **Filter.** Click a domain, then click it again. The first click filters; the second logs
   through `enterSet`. Escape clears the filter.
5. **Keyboard.** Tab to a circle. It takes focus visibly, Enter filters it, and Tab reaches the
   off-record set.
6. **Edits.** Change a label, a colour, a description and a physics slider. Each shows up
   immediately and none of them resets the others.
7. **Round trip.** Export, reload the page, import the file you just wrote. The diagram comes
   back identical.
8. **Reduced motion.** Turn on the system setting, reload: no circle-draw animation, no drift.
9. **Background tab.** Leave the page in a background tab for a minute and come back. The motes
   are still moving.
10. **Scrolled away.** Scroll the diagram out of view and back. The motes are still moving.
11. **Narrow.** At 380px wide the diagram scales and the panel text stays readable.

Then update the screenshot if the diagram changed:

```bash
node scripts/shot.mjs   # needs Playwright at the path in the script
```

## The rules that are not negotiable

Hit-testing reads `LAYOUTS`. Everything per-circle is generated from the layout rather than
written per circle. The page works from `file://`. No build step, no dependency, no analytics.
`AGENTS.md` has the full list and the reasons.

## Commits

Say what changed and why it mattered, in the subject. `README: the file is 64 KB, not 40` is the
standard. No conventional-commit prefixes.

## Features

`docs/features/NNN-slug.md`, numbered in creation order, never renumbered. Acceptance checks are
commands with expected output, not adjectives. Mark a spec `shipped` only when you ran its
checks and they passed, and put the output in the spec.
