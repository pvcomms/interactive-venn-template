# Features

One feature, one file, `NNN-slug.md`. Numbers are allocated in creation order and never reused
or renumbered — the number is the permanent name of that work, so `venn 005` still means
something in a year.

Frontmatter carries `title` and `status`. Status is one of `draft`, `next`, `building`,
`shipped`, `parked`. `~/work/capp/spine/bin/scan.py` reads only the frontmatter, and the first feature
in `building` → `next` → `draft` order becomes this project's next action on the front door.

A feature is marked `shipped` only when its acceptance checks were actually run and passed.

The shape to copy: `~/work/capp/spine/docs/templates/feature.template.md`.

| #   | Title                         | Status |
| --- | ----------------------------- | ------ |
| 001 | Make zero third-party requests | next   |
| 002 | Shareable config links        | next   |
| 003 | Embeddable component mode     | next   |
| 004 | Presets gallery               | next   |
| 005 | Four-circle layout            | draft  |
| 006 | Repo polish: topics and social preview | next |
| 007 | README screenshot and GIF     | draft  |

002 to 007 were planning notes in a gitignored `tasks/` directory until 2026-09-19. Their
substance is theirs; the shape is this template's.
