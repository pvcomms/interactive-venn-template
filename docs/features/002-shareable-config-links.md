---
title: Shareable config links
status: next
created: 2026-09-19
---

# 002 — Shareable config links

## Why

Customising the diagram produces a JSON file. To show someone what you made, you have to attach
it to a message, and they have to download it, open the page and use the import button. Three
steps and a file, for something that is a few hundred bytes of text. Most people will not do it,
which means the customisation ends at their own screen.

A URL is the artefact people already know how to send. It also happens to solve a second problem:
the page forgets everything on reload, so a refresh mid-edit loses the work.

Putting the config in the hash keeps this local. The fragment is never sent to a server, so a
shared link discloses the diagram to the person you sent it to and to nobody else. Do not add a
shortener, and do not fall back to a query string.

## What changes

- Before: export writes a file; import reads one; a reload discards everything.
- After: a _copy share link_ button puts the whole state in `location.hash`, and opening that
  link anywhere reproduces the diagram exactly. Editing keeps the hash current, so a reload
  resumes rather than resets.

## Where

| File                              | Change                                                          |
| --------------------------------- | ---------------------------------------------------------------- |
| `index.html` `.cz-actions` markup | a third button beside export and import                         |
| `index.html` near `state` (~line 900) | `encodeState()` / `decodeState()` on `{layout, config}`      |
| `index.html` boot (~line 2010)    | read `location.hash` before the first `buildMarkup()`           |
| `index.html` edit handlers        | a debounced hash write, shared by every mutation path           |
| `README.md`                       | the share link in the customisation list                        |

Serialise the same `{layout, config}` payload the export button already builds, as
`#c=<base64url>`. Use `encodeURIComponent` before base64 so non-ASCII labels survive, and strip
the `=` padding. On decode, a payload that fails to parse, or whose `layout` is not a key of
`LAYOUTS`, falls through to `DEFAULTS` silently rather than alerting — a bad link should show
the default diagram, not an error dialog.

Debounce the hash write to about 400 ms and use `history.replaceState`, not assignment to
`location.hash`, so that typing a label does not fill the back button with one entry per
keystroke.

## Out of scope

No server, no link shortener, no storage of configs anywhere. No `localStorage` persistence;
the hash is the persistence, and it is visible to the person rather than hidden in their
browser. No query-string fallback: `?c=` would be sent to whatever host serves the file.

## Acceptance checks

```bash
python3 -m http.server 5252   # then http://localhost:5252
```

- [ ] Edit several labels and colours, click _copy share link_, open it in a private window:
      the diagram matches, including layout, physics and the marker
- [ ] A URL with no `#c=` loads the default five-circle diagram
- [ ] Editing a label then reloading keeps the edit
- [ ] Typing one label leaves at most one history entry, checked with the back button
- [ ] `#c=notbase64` loads the default diagram with no dialog
- [ ] A config large enough to exceed roughly 8000 characters tells the person to use the JSON
      export instead of writing a truncated link

## Notes

The length ceiling is real: browsers accept long fragments, but chat clients and email break
them. Measure the encoded string and refuse above the threshold rather than producing a link
that works for you and not for them.
