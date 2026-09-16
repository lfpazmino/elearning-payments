# nextjs-tailwind-migration - Requirements

## Scope

Phase 2 rebuilds the prototype's shell on Next.js + Tailwind, preserving every reader-visible
behavior, before any backend change (Supabase is Phase 3). Content stays static data during this
phase, ported from `prototype/assets/js/course.js` and typed against the Phase 1 schema (now Zod).
It delivers the five groups in `specs/roadmap.md` 2.1-2.5:

- Next.js App Router scaffold: TypeScript strict, `output: 'export'`, `basePath` `/elearning-payments`,
  `images.unoptimized: true`.
- Tailwind CSS v4, with light/dark/auto theme tokens ported from the prototype's `style.css` (NFR-04).
- The shell as components: topbar, contents rail, progress gauge, theme toggle.
- Real per-route static pages replacing hash routing (`/module/unit/`), preserving shareable,
  reload-safe deep links (R-18).
- Block-type dispatch as a component for all eleven types from the Phase 1 schema (`h`, `p`, `note`,
  `ul`, `ol`, `callout`, `table`, `stats`, `qa`, `beats`, `gloss`).
- A Zod content-validation step, ported from the Phase 1 `schema.js` rules, that runs against the
  typed content module and fails `next build` on any violation — closing the CI-enforcement gap
  Phase 1's spec explicitly deferred here (NFR-06: "validated before deploy"). This is a build-time
  gate, not left implicit in TypeScript's structural typing.
- Progress tracking still on `localStorage`: completion state, per-module counts, whole-course gauge,
  resume-at-first-incomplete (R-14), reset-all-progress (R-08).
- GitHub Actions workflow: `next build` (static export) -> deploy to Pages on push to `main`,
  replacing the manual upload.
- A Vitest + React Testing Library suite covering the block renderer and progress logic.

## Out of Scope

- Supabase persistence of content, progress or notes — Phase 3.
- The per-unit notes editor (R-19) — Phase 3.
- Backup/reseed automation — Phase 4.
- Confirming or dropping the sixteen `[inferred]` requirements — Phase 5.
- Touching `prototype/` — it is evidence, preserved exactly; content is ported forward, not edited.
- Retiring `localStorage` in favor of a database — Phase 3.

## Decisions

- **Deploy target is this repo, basePath `/elearning-payments`.** `lfpazmino/elearning-payments`
  serves its own Pages site; the prototype's `/payments-academy` site stays as-is. Rejected:
  carrying forward tech-stack.md's earlier `/payments-academy` assumption, which does not match this
  repo's name.
- **Next.js + Tailwind confirmed.** The README "Revisit at spec time" marker is resolved: React 19 +
  Next.js App Router (`output: 'export'`) + TypeScript strict + Tailwind v4, as `specs/tech-stack.md`
  already records.
- **CI deploy (2.5) ships in this phase.** One reviewable migration including the GitHub Actions
  pipeline, not split out.
- **A test suite lands now.** Vitest + React Testing Library, chosen over deferring tests — the
  migration is when tech-stack.md says they become worthwhile.
- **`prototype/` stays untouched.** The new app lives at the repo root; the prototype remains evidence.
- **Content validation is an explicit build-time gate, not implicit in TypeScript.** Phase 1's spec
  deferred "Zod schema checks in CI, failing the build on violation" to this phase
  (`specs/tech-stack.md`). Relying on `next build` failing on a TypeScript type mismatch was
  considered and rejected as too indirect — a runtime Zod check against the actual data, run as its
  own step, gives a clear error message naming the violating unit, the way `scripts/validate-course.js`
  already does today.

## Context

Phase 1 (schema & content validation) is complete and signed off. Phase 2 is the first framework
migration: it replaces the hand-rolled `app.js` routing/rendering/storage with Next.js components
while keeping the deployment target (static files on GitHub Pages) and every observable behavior.
Phase 3 (Supabase) depends on it — Server Components read content at `next build`, and the Supabase
JS client writes progress/notes at runtime, both of which presuppose the Next.js app. The Phase 1
schema moves into a shared Zod data layer here.

## Stakeholder Notes

- **lfpazmino** needs the new build to look and behave like the prototype, not worse — the prototype
  is in daily use and is the reference for "correct."
- **lfpazmino** needs deep links to keep working (R-18), now via real static routes instead of hash
  routing.
- **lfpazmino** chose to deploy from this repo (`elearning-payments`) rather than reuse the
  prototype's `/payments-academy` Pages site.
- **lfpazmino** has no new requirements this phase; it is a migration, not a feature addition.
