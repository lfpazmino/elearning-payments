# Mission

## Core Concept

A self-paced eLearning site that takes one reader from payment-flow fundamentals to
defensible architectural depth: how a payment moves, the rails and schemes that move it,
the business and regulatory forces around it, and the payment-hub architecture underneath
it. Built first as enablement for a Sibos 2026 speaking slot, kept afterward as a durable
personal reference.

## Key Features

- **Structured curriculum** — 11 modules, 36 units, each with a stated objective, an
  estimated time, and self-check prompts.
- **Sequential and direct navigation** — move unit to unit in order, or jump to any unit
  from a contents list available on every screen.
- **Completion tracking** — mark a unit complete to advance automatically; un-mark it if
  needed. Progress is visible per module and as a whole-course figure, and persists across
  visits and across reactivating a paused backend.
- **Resource library** — 86 free resources, each with a title, source type and a one-line
  note on why it's worth reading, browsable per-unit and in one aggregated, filterable view.
- **Per-unit notes** — a rich-text editor (bold/italic/strike) attached to each unit,
  including pasting images straight from the OS clipboard.
- **Shareable deep links** — a link to a specific unit survives a reload.
- **Resilient content** — course content, progress and notes live in a managed database,
  with a scheduled static export acting as a reseed path if that database instance is
  paused or lost.

## Samples

Content spans ten payment domains named explicitly by the stakeholder: payment anatomy and
rails, settlement and scheme mechanics, business models, regulation (PSD3, PSR, FIDA, DORA),
payment hub architecture (event-driven, event sourcing, CQRS), distributed architecture,
infrastructure and the data layer, and AI/agentic AI in payments. See `README.md` Appendix A
for the full required syllabus.

## What We Do

- Teach payments domain knowledge and payment-hub architecture to one specific reader,
  self-paced, with no accounts and no multi-learner tracking.
- Track that reader's progress and notes durably, surviving browser changes, cache
  clears, and gaps in use of a week or more.
- Keep content editable by a developer (the stakeholder) and validated before it reaches
  the reader.
- Deploy as a public, free, static site.

## What We Are NOT Doing

- Accounts, authentication, or cross-device identity beyond a single reader's use of the
  site.
- Multi-learner tracking, cohorts, or completion reporting to anyone else.
- A CMS or any non-developer content-authoring path — content edits are a git/Supabase
  task, not a public submission form.
- Hosting anywhere other than GitHub Pages, or any paid infrastructure tier by default.

## Who We Serve

One reader: the stakeholder, preparing for and then referencing a Sibos 2026 session on
payment-hub architecture and scale.

## Target Audience

Personal use only. The site is public (GitHub Pages requires it for a free private-adjacent
setup) but is not designed, marketed, or supported for other learners.

## What Success Looks Like

- Every functional requirement in `README.md` (R-01 through R-19) is either implemented,
  or explicitly dropped with a recorded reason.
- The reader can study, mark progress, and take notes with images, and none of that state
  is lost — not to a cache clear, not to a week of inactivity pausing the database, not to
  losing the Supabase project outright.
- The site remains a living reference after Sibos 2026, not a one-shot conference asset:
  content stays current, the resource library stays link-checked, and new modules can be
  added without a rebuild of the whole system.
