# Running your own

This whole repo is the seam: it exists to be taken and reskinned. The list below is what is one
person's and what is the instrument, so that the first thing you do is not a search for
someone else's words in a 64 KB file.

## What is Param's

| Thing                                    | Where                            | Replace with                        |
| ---------------------------------------- | -------------------------------- | ----------------------------------- |
| The five domain names and their copy     | `DEFAULTS["5"]`                  | your own sets; or use the panel     |
| The three-circle story / craft / money   | `DEFAULTS["3"]`                  | your own three                      |
| The named intersections and their copy   | `DEFAULTS[n].pairs`              | what your overlaps actually mean    |
| `marker.label` — "me"                    | `DEFAULTS[n].marker`             | your own point, or `enabled: false` |
| `offrec.label` — "the set I don't draw"  | `DEFAULTS[n].offrec`             | your own, or `enabled: false`       |
| The palette (`--c-me`, `--c-consume`, the per-domain colours) | `:root` in `<style>`, `DEFAULTS[n].domains[].color` | your colours |
| Newsreader and IBM Plex Mono             | the `<link>` in `<head>`, `--serif` and `--mono` | your faces, self-hosted |
| The page header copy and the `fig. 1` label | the markup, `#figlabel`       | your own framing                    |
| The origin credit in the footer          | `footer.credit`                  | keep the MIT notice, drop the rest  |
| Port 5252                                | `AGENTS.md`, your own launcher   | anything free                       |
| `docs/img/venn.png`                      | generated                        | re-run `scripts/shot.mjs`           |

The fastest path is not to edit any of that by hand: open the page, use the customize panel,
click _export config_, and keep the JSON. Editing `DEFAULTS` is for when you want your version
to be what the file itself ships with.

`scripts/shot.mjs` loads Playwright from `~/Code/shosai/node_modules/playwright` unless
`PLAYWRIGHT_DIR` says otherwise, which assumes a sibling project that is not yours. Set that
variable, or delete the script; nothing else depends on it.

## What is the instrument

`LAYOUTS` and everything generated from it. The solved geometry, `buildMarkup()`, the
point-in-circle hit-testing, the hover flood, the intersection lenses, the halo rings, the
membership-test cursor readout, the drift physics, the keyboard and focus paths, and the
import/export round trip. None of that knows whose sets it is drawing.

The customize panel is also general: it walks the current layout and builds a card per domain
and per pair, so it fits any layout you add without being edited.

## Running it against your own life

1. Clone, and open `index.html` in a browser. No install step.
2. Pick 3 or 5 circles in the dropdown.
3. Rewrite the labels, colours and descriptions in the cards. The diagram updates as you type.
4. Name your overlaps. An overlap with a name is the reason to draw a Venn diagram at all; an
   unnamed one is decoration.
5. Set the physics to taste, or leave them.
6. Click _export config_ and keep the JSON next to the file.
7. To ship your version as the default: paste that JSON's `config` over the matching entry in
   `DEFAULTS`, and change the header copy and the footer credit.

To embed rather than publish the whole page: `enterSet()` is the hook that fires on a second
click, and `docs/features/003-embeddable-component-mode.md` is the specified path to a real
mount API.

## What will not work yet

Circle counts other than 3 and 5. There is no general n-circle solver, and there should not be
one — adding a layout means solving its geometry once and adding it to `LAYOUTS`. Four sets
specifically need ellipses; see `docs/features/005-four-circle-layout.md`.

The export JSON has no version field, so a config exported from a future layout will import
into an older copy of the file and fail the `LAYOUTS[payload.layout]` check with a generic
alert rather than an explanation.

Nothing persists. Closing the tab discards your edits unless you exported them.
Feature 002 puts the config in the URL, which is the nearest thing to persistence that stays
local.

The fonts come from Google today, so a copy of this page opened offline falls back to Georgia
and a system mono. Feature 001 fixes that and is the first thing to do with the file.
