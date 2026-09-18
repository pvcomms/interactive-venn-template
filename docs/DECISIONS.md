# Decisions

Append-only. Newest last. One entry per decision that would otherwise be re-litigated.

---

**2026-09-17 — One file, no build step, no dependency.**
The page is a template meant to be taken, reskinned and dropped somewhere. Every dependency is
a thing the next person has to install before they can see it work, and every build step is a
reason the file in the repo is not the file that runs. One file that a browser opens from disk
is the product decision, not a limitation to grow out of. The cost is a 64 KB `index.html` and
no module boundaries, which is accepted.

---

**2026-09-17 — Geometry is solved and frozen; content is not.**
`LAYOUTS` holds circle positions that make every named region geometrically real. Those numbers
are not exposed in the customize panel, because dragging a circle to make a label fit turns a
named overlap into a false claim about sets. Labels, colours, copy and physics are fully
editable; the coordinates are a fixed input.

---

**2026-09-17 — Five circles, drawn honestly.**
Five circles cannot represent all thirty-one combinations of five sets. Rather than fake it with
overlaps that are not real, the five-circle layout draws one set partly off-frame and the README
states the limitation. A correct four-set diagram requires ellipses and is deferred to its own
feature rather than approximated.

---

**2026-09-17 — Hit-testing shares the geometry constant.**
Point-in-circle tests read the same `cx`, `cy` and `r` the SVG was drawn from. A second copy for
hit-testing would be faster to write and would drift on the first geometry change, and the drift
would show up as a region that names itself wrongly — the one failure this diagram cannot have.

---

**2026-09-17 — The drift loop carries a `setInterval` backstop.**
`requestAnimationFrame` is throttled in background tabs and can stop entirely in some embedded
webviews. `frameLoop()` therefore also checks on a timer whether rAF has gone quiet and draws
anyway, and an `IntersectionObserver` stops both when the diagram scrolls out of view. Three
moving parts for one animation, kept because the failure without them is a page that looks
broken rather than a page that looks still.

---

**2026-09-19 — Doc set adopted; folder renamed to match the repo.**
The directory was `venn-diagram-template` while the GitHub repo and the Vercel project were
`interactive-venn-template`. The constellation convention is that all three are the same
kebab-case name, so the folder was renamed and `~/.claude/launch.json` was pointed at the new
path. The repo also picked up the shared doc set: `AGENTS.md` with the vendored constellation
kernel, `docs/ARCHITECTURE.md`, this file, `docs/TEMPLATE.md` and `docs/features/`.

---

**2026-09-19 — The six planning notes became feature specs 002 to 007.**
They were sitting in a gitignored `tasks/` directory, which meant the work was invisible to
anyone who cloned the repo and to any agent asked to pick up the next piece. They are now
numbered specs in `docs/features/` in the repository, rewritten into the template shape with
acceptance checks, and `tasks/` is gone. Their substance is unchanged.

---

**2026-09-19 — The fonts are the only third-party request, and removing them is 001.**
The page asks Google Fonts for a stylesheet and two font files. That is one host learning the IP
address of everyone who opens any copy of this template, for two typefaces. Self-hosting them is
feature 001 and is `next`. It is numbered first in this repo and in every sibling repo for the
same reason.
