# Payments Academy — Project Instructions

@README.md
@TODO.md

## What this is

A self-paced eLearning site on the payments industry (rails, settlement, regulation,
payment-hub architecture, AI/agentic payments), built as personal enablement for a Sibos
2026 speaking slot and kept afterward as a durable reference. One reader, no accounts, no
multi-learner tracking. A working prototype (static HTML/CSS/JS, no build step) is deployed
at [https://lfpazmino.github.io/payments-academy/] (repo `lfpazmino/payments-academy`) and is
in daily use. This repository is where that prototype becomes a specified, framework-backed
build per `specs/roadmap.md`.

## Method

This project runs on the `spec-dev` skill, in **brownfield** mode — the prototype already
exists and is deployed, so the build evolves it rather than restarting. `spec-readme` already
produced `README.md` and `TODO.md` from the original conversation; `spec-dev` has since
produced the constitution (`specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`) but
**`spec.md` and dated feature specs do not exist yet**. Use `spec-dev` (its "feature spec"
phase) to start the next phase from `specs/roadmap.md` once a phase is picked up.

Requirement IDs (`R-01`…`R-19`, `NFR-01`…`NFR-09` in `README.md`) are stable identifiers and
must never be renumbered, even when requirements are dropped — drop by deletion or by marking
resolved, not by renumbering survivors.

Architecture is tracked in `architecture/model.c4` (LikeC4) and must be updated in the same
change set as any change that adds, removes or rewires a component. Run it via
`npx likec4 serve --listen 0.0.0.0` / `npx likec4 validate`.

## Provenance discipline

Every requirement in `README.md` carries a tag: `[stated]` (the stakeholder said it directly),
`[agreed]` (proposed and explicitly confirmed), or `[inferred]` (assumed from prototype
behavior, never confirmed). **`[inferred]` means unconfirmed — do not silently promote it to
`[agreed]` or treat it as binding.**

As of the last count, **sixteen requirements are still `[inferred]`**: nine functional (R-05,
R-07, R-08, R-11, R-12, R-13, R-14, R-16, R-18) and seven non-functional (NFR-01, NFR-03,
NFR-04, NFR-05, NFR-07, NFR-08, NFR-09), with NFR-02 part-stated. Confirming or dropping each
one is tracked as its own roadmap item (Phase 5.1) — don't do it piecemeal as a side effect of
unrelated work.

## Non-negotiable constraints

Firm, do not revisit:

- Deploy to **GitHub Pages** from a **public** repository (Pages on a private repo needs a
  paid plan). Rejected alternative: hosting as a Claude artifact — explicitly declined by the
  stakeholder.
- Static output only, no server-side runtime (NFR-01) — Next.js with `output: 'export'`,
  `basePath` set to the Pages project subpath, `images.unoptimized: true`.
- No accounts, auth, or cross-device identity; no CMS or non-developer authoring path; no paid
  infrastructure tier by default.

Marked **Revisit** in `README.md`'s Decisions table — settled for now via `specs/tech-stack.md`
but not yet re-confirmed with the stakeholder as final:

- Progress and course content stored in a database (Supabase, Phase 3) rather than a static
  data file.
- Next.js + Tailwind CSS as the frontend stack (Phase 2), replacing the prototype's hand-rolled
  DOM/hash-routing `app.js`.
- Two-level module → unit hierarchy; Archivo/Source Serif 4/IBM Plex Mono via Google Fonts;
  four resource source-type families for filtering.

Do not treat these as open — they have a recorded decision and rationale in
`specs/tech-stack.md`. Raise it as a question rather than changing it quietly if new
information argues against one.

## Out of scope

Confirmed with the stakeholder, not to be reintroduced as an improvement:

- Accounts, authentication, cross-device progress sync, multi-learner tracking or completion
  reporting.
- A headless CMS or any non-developer content-authoring path.
- Hosting the site anywhere other than GitHub Pages (Claude artifact hosting was offered and
  declined).

## Working style

- Read `README.md`, `TODO.md`, `specs/roadmap.md` and the relevant `specs/*.md` before
  proposing changes — do not re-derive decisions that are already recorded.
- `prototype/` is evidence, not a foundation: it is preserved exactly as it came out of the
  original conversation. Do not refactor, rename or tidy it in place; port behavior forward
  into the new stack deliberately, phase by phase, per `specs/roadmap.md`.
- When the docs and the code disagree, surface the contradiction rather than silently
  resolving it in favor of whichever one you read last.
- The current roadmap position is Phase 1 (schema & content validation, `TODO.md` "Now" item)
  — no `package.json`, no framework, no tests exist yet at the repo root; only the prototype
  and the constitution docs.
