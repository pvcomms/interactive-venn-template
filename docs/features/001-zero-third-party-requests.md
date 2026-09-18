---
title: Make zero third-party requests
status: next
created: 2026-09-19
---

# 001 — Make zero third-party requests

## Why

Open `index.html` and the page asks `fonts.googleapis.com` for a stylesheet, which asks
`fonts.gstatic.com` for two font files. That is one company being told the IP address, the
approximate location and the timing of every person who opens any copy of this template, in
exchange for two typefaces. The person who reskins this file and puts it on their own site
inherits that arrangement without being asked, because nothing on the page says it is there.

It also means the page is not actually the self-contained artefact the README says it is. Open
it on a plane and the type falls back to Georgia and a system mono; the layout shifts because
the metrics differ. A file whose appearance depends on a network is a different kind of object
from a file that does not.

This is the first feature in this repo and in every sibling repo, because local-by-default is
the constellation's first rule and a CDN font is the most common way a static page quietly
breaks it.

## What changes

- Before: three `<link>` tags in `<head>` pointing at two Google hosts, and two font files
  fetched at load. `grep -c 'https://' index.html` counts five.
- After: a `fonts/` directory in the repo, `@font-face` rules in the existing `<style>` block,
  and no request to any host. The page renders identically with the network off.

## Where

| File                     | Change                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `fonts/*.woff2`          | new. the subset faces, committed                                     |
| `index.html` lines 11–16 | delete the two `preconnect` links and the stylesheet `<link>`        |
| `index.html` line 17 on  | `@font-face` blocks at the top of `<style>`, before `:root`          |
| `README.md`              | drop the "one third-party request" paragraph; it stops being true    |
| `docs/DECISIONS.md`      | an entry naming the faces, their licences and where they came from   |

The page uses Newsreader at 300, Newsreader italic at 300, and IBM Plex Mono at 400 and 500.
Subsets for Newsreader and IBM Plex Mono already exist in `~/Code/paramvaswani-site/fonts/` as
`newsreader-latin.woff2`, `newsreader-latin-italic.woff2`, `plexmono-latin-300.woff2`,
`plexmono-latin-300-italic.woff2` and `plexmono-latin-400.woff2`, and can be copied rather than
re-subset. There is no 500-weight Plex Mono subset in that set: either map 500 onto the
400 file, or subset the 500 face, and say which in the decision entry.

Both families are SIL Open Font License 1.1. The licence text belongs in `fonts/OFL.txt`, and
the fact that the repo is MIT while the fonts are OFL belongs in `README.md` under the licence
heading.

## Out of scope

No change to which typefaces the page uses. No variable-font conversion. No `font-display`
tuning beyond `swap`. No preloading. This feature removes a network dependency and changes
nothing a person would see on a fast connection.

## Acceptance checks

```bash
grep -c 'https://' index.html   # counts only the two footer credit links, so 2
node scripts/shot.mjs           # writes docs/img/venn.png with the right faces
```

- [ ] With the machine offline, `open index.html` renders in Newsreader and IBM Plex Mono
- [ ] Chromium devtools, network tab, reload from `file://`: no request leaves the page
- [ ] The `fig. 1` label and the cursor readout are still mono; the domain descriptions serif
- [ ] `fonts/OFL.txt` is present and the README says the fonts are OFL while the code is MIT

## Notes

The two remaining `https://` matches after this lands are the `paramv.com` and `eileenie.net`
credits in the footer. They are links a person can click, not resources the page fetches, and
they stay.
