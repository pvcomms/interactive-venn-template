# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-09-19

The first tagged release. The diagram itself is unchanged; what landed is the documentation and
the repository hygiene that make it possible to hand a piece of this work to somebody else.

### Added

- `AGENTS.md`, carrying the repo's stack, commands, invariants and traps, plus the vendored
  constellation kernel, and `CLAUDE.md` pointing at it
- `docs/ARCHITECTURE.md`, the map of the single file, its data flow and its sharp edges
- `docs/DECISIONS.md`, recording why there is no build step, why the geometry is frozen, why
  five circles are drawn honestly incomplete, and why the drift loop has three moving parts
- `docs/TEMPLATE.md`, separating what in the file is one person's from what is the instrument
- `docs/features/`, with an index and seven numbered specs
- `CONTRIBUTING.md`, with the by-hand check list that stands in for CI
- `SECURITY.md`, stating what the page reads, writes and requests
- `scripts/shot.mjs` and `docs/img/venn.png`, a 1400×900 screenshot from headless Chromium
- `.editorconfig`

### Changed

- The directory was renamed from `venn-diagram-template` to `interactive-venn-template`, so the
  folder, the GitHub repo and the Vercel project are one name
- The README was reordered into the shared section order, given the screenshot, and corrected:
  the file is 64 KB, not the roughly 40 KB it claimed
- The six planning notes in the gitignored `tasks/` directory became feature specs 002 to 007,
  with their substance intact

### Removed

- `tasks/`, and its entry in `.gitignore`

[unreleased]: https://github.com/pvcomms/interactive-venn-template/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/pvcomms/interactive-venn-template/releases/tag/v0.1.0
