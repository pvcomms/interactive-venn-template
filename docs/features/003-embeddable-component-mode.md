---
title: Embeddable component mode
status: next
created: 2026-09-19
---

# 003 — Embeddable component mode

## Why

The diagram is a whole page. Anyone who wants it inside something they already have — a
portfolio, a docs page, an essay — has to take the page apart first, and the parts are not
separated: `buildMarkup()` writes into a specific `<svg id="vennSvg">`, `paint()` writes into a
specific `#cap1`, and the customize panel reaches into both by id. The engine and the demo
around it are the same code.

An `<iframe>` is the workaround people reach for, and it costs them the page's styling, its
sizing and any interaction with the host page. The engine is worth more than that.

## What changes

- Before: one file that is both the engine and the demo, wired together by `getElementById`.
- After: `venn.js` exposes `VennDiagram.mount(el, {layout, config})`, and `index.html` is a demo
  that uses it like anyone else would.

```html
<div id="my-venn"></div>
<script src="venn.js"></script>
<script>
  VennDiagram.mount(document.getElementById("my-venn"), { layout: "3", config: {...} });
</script>
```

## Where

| File                 | Change                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `venn.js`            | new. `LAYOUTS`, `buildMarkup`, `paint`, `wireInteraction`, `wireReticle`, `wireDrift`, `frameLoop`, `esc` |
| `venn.css`           | new. the SVG and panel styles, scoped under one container class          |
| `index.html`         | becomes the demo: loads `venn.js`, keeps the customize panel, calls `.update()` |
| `embed.html`         | new. the minimal second page proving a bare mount works                  |
| `docs/ARCHITECTURE.md` | the tree and the data flow both change                                  |
| `README.md`          | a mount section                                                          |

The handle returned by `mount()` needs `update(config)`, `destroy()` and an `onEnter` option to
replace the `console.log` stub. `destroy()` has to stop the drift loop, disconnect the
`IntersectionObserver` and remove the `document`-level `keydown` listener, or a page that mounts
and unmounts repeatedly leaks a loop each time.

Scope every id the module writes. Two diagrams on one page must not collide, so the clip-path
and filter ids (`uclip`, `bloom`, `cp-d0`) need a per-instance prefix.

## Out of scope

No npm package, no bundler, no TypeScript, no framework wrappers. One script tag that defines
one global is the whole distribution story. No change to what the diagram does or looks like;
this is a boundary, not a feature.

## Acceptance checks

```bash
python3 -m http.server 5252   # http://localhost:5252 and .../embed.html
grep -n 'getElementById' venn.js   # only ids the module itself created, all prefixed
```

- [ ] `embed.html` is under thirty lines and shows a working diagram
- [ ] Two mounts on one page both work, with independent hover state
- [ ] `destroy()` leaves no timer, no observer and no listener: mount and destroy in a loop and
      the frame callbacks do not accumulate
- [ ] The demo page still does everything it did before, through the public handle only
- [ ] `onEnter` fires on the second click on a filtered domain

## Notes

`wireInteraction()` currently re-attaches a `document` `keydown` handler on every rebuild, so
the existing page already accumulates listeners on edit. Fix that while extracting rather than
carrying it into the module.
