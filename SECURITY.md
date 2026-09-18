# Security and privacy

This is a static HTML file. It has no backend, no accounts, no session and no database. What
follows is the whole attack surface.

## What it reads

A JSON file you pick with the import button, read in the page with `FileReader`. Nothing else.
The page does not read your filesystem, your clipboard, your location or any device sensor, and
it has no permission prompts because it asks for nothing.

## What it writes

A JSON file you save with the export button, through the browser's own download. It writes
nothing else: no `localStorage`, no `sessionStorage`, no cookie, no IndexedDB, no cache entry of
its own. Reloading the page discards every edit you have not exported.

## What never leaves the machine

Everything you type. Labels, colours, descriptions and physics live in a JavaScript object for
as long as the tab is open and are never transmitted anywhere. There is no analytics, no
telemetry, no error reporting, no usage ping and no beacon on unload. Nothing in this repo
sends a request to any endpoint that could receive data.

## Network requests the page makes today

Three, all at load, all to Google:

| Request                                                        | Why                          |
| -------------------------------------------------------------- | ---------------------------- |
| `fonts.googleapis.com/css2?family=Newsreader&family=IBM+Plex+Mono` | the `@font-face` stylesheet |
| `fonts.gstatic.com` — the Newsreader file                      | the serif                    |
| `fonts.gstatic.com` — the IBM Plex Mono file                   | the mono                     |

Requesting a font tells that host your IP address, your user agent and the time. It carries no
content from the page. It is still a third party learning that someone opened this file, which
is why removing it is `docs/features/001-zero-third-party-requests.md` and why that feature is
numbered first.

The two links in the page footer, to `paramv.com` and `eileenie.net`, are links. They are
fetched only if someone clicks them.

## The one place untrusted input reaches the DOM

Imported config strings are interpolated into markup through `esc()`, which escapes `&`, `<`,
`>` and `"`. The import path is meant for a file the page itself wrote. If you extend what
import accepts, extend the escaping with it, and treat a config from a stranger the way you
would treat any file from a stranger.

If you fork this and add a share-by-URL feature, the same applies to whatever you decode out of
the URL. `docs/features/002-shareable-config-links.md` specifies that path and keeps the payload
in the fragment, which is never sent to a server.

## Reporting something

Open a private report through the repository's Security tab on GitHub, under "Report a
vulnerability". For anything that is not sensitive, a public issue is fine and is faster.

There is no release cadence and no support commitment. This is a template published in the hope
it is useful.
