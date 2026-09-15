# Roadmap

Phases are ordered per `TODO.md`'s *Now*/*Next* priority, not invented from scratch. Each
phase is a shippable, independently reviewable slice. See `mission.md` for what success
looks like and `tech-stack.md` for the choices each phase draws on.

## Phase 1 — Schema & Content Validation (current stack)

Ships on the prototype as it stands today (static HTML/vanilla JS). No framework migration
yet — this closes the single widest gap between what the prototype proves and what NFR-06
requires, without coupling it to a larger rewrite.

### 1.1 Define the content schema

- [x] Write a schema for module, unit, block (per declared type) and resource shapes,
      matching what `course.js` actually contains today
- [x] Cover every block type currently in use (`h`, `p`, `note`, `ul`, `ol`, `callout`,
      `table`, `stats`, `qa`, `beats`, `gloss`)

### 1.2 Validate on load and at deploy time

- [x] Validate `window.COURSE` against the schema in development, surfacing the first
      violation with a unit/module path, not a silent render failure
- [x] Add a pre-deploy check (npm-free script, since the prototype has no package.json
      yet) that fails the build on a schema violation

### 1.3 Retrofit any violations the schema surfaces

- [x] Fix any existing content that fails validation (expected: none, since the schema is
      derived from current content, but confirm)

---

## Phase 2 — Next.js + Tailwind Migration

Rebuilds the shell on the chosen framework, preserving every prototype behavior, before any
backend changes land. Content stays static data during this phase (ported from `course.js`,
now typed) — Supabase comes in Phase 3.

### 2.1 Scaffold

- [ ] Next.js App Router project, TypeScript strict, `output: 'export'`, `basePath` set for
      the GitHub Pages project subpath, `images.unoptimized: true`
- [ ] Tailwind CSS v4 wired in; port theme tokens (light/dark/auto, NFR-04) from
      `style.css`

### 2.2 Port the shell

- [ ] Topbar, contents rail, progress gauge, theme toggle as components
- [ ] Real per-route static pages replacing hash routing (`/module/unit/`), preserving
      shareable, reload-safe deep links (R-18) — now via Next's own static routes instead
      of a hash-routing workaround

### 2.3 Port content rendering

- [ ] Block-type dispatch as a component (prose, table, callout, statistic tiles, Q&A,
      timeline, glossary)
- [ ] Course content typed against the Phase 1 schema (ported to Zod or equivalent)

### 2.4 Port progress tracking

- [ ] Completion state, per-module counts, whole-course gauge, resume-at-first-incomplete
      (R-14) — still backed by `localStorage` at this phase
- [ ] Reset-all-progress action (R-08)

### 2.5 Deploy pipeline

- [ ] GitHub Actions workflow: build, static export, deploy to Pages on push to `main`,
      replacing the manual upload

---

## Phase 3 — Supabase Persistence (content, progress, notes)

### 3.1 Schema and project setup

- [ ] Supabase tables: content (modules/units/blocks/resources), progress (per-unit
      completion), notes (per-unit rich text + image references)
- [ ] RLS policies scoped for a single anon-key reader, no auth

### 3.2 Migrate content

- [ ] Seed script: current course data → Supabase tables, validated against the Phase 1/2
      schema before insert
- [ ] Server Components read content from Supabase at `next build` time (static, baked
      into the export — not a per-visit runtime call)

### 3.3 Progress via Supabase

- [ ] Client-side completion read/write against Supabase, replacing `localStorage` as the
      source of truth
- [ ] Surface save failures to the reader (NFR-05) — the prototype gap where storage
      errors were caught and swallowed silently

### 3.4 Notes editor

- [ ] Per-unit rich-text editor: bold, italic, strike (R-19)
- [ ] Clipboard image paste, uploading to Supabase Storage and inserting inline
- [ ] Notes persist per unit, read back on return to that unit

---

## Phase 4 — Backup & Reseed Automation

### 4.1 Export script

- [ ] Script dumping Supabase content, progress and notes tables to `course-export.json`

### 4.2 Scheduled automation

- [ ] GitHub Actions cron job running the export and committing the result
- [ ] Document the reseed procedure: repopulating a fresh or reactivated Supabase project
      from `course-export.json`

---

## Phase 5 — Requirements Confirmation & Housekeeping

Closes the gap between what's `[inferred]` in `README.md` and what's confirmed, plus the
remaining `TODO.md` items not covered by Phases 1–4.

### 5.1 Confirm or drop inferred requirements

- [ ] Work through R-05, R-07, R-08, R-11, R-12, R-13, R-14, R-16, R-18 and NFR-01,
      NFR-03, NFR-04, NFR-05, NFR-07, NFR-08, NFR-09 — retag `[agreed]` or delete, trace
      survivors into `spec.md`

### 5.2 Link checking in CI

- [ ] Automated check over all resource URLs (R-10); fail or flag on a dead link

### 5.3 Content freshness

- [ ] Per-unit review-date field; decide whether staleness is surfaced to the reader or
      only visible to the author

### 5.4 Accessibility

- [ ] Focus management on route change (arrow-key navigation exists; focus does not
      follow)

### 5.5 Search

- [ ] Decide whether the resource/content library needs search at current scale (36
      units, growing)

### 5.6 Module ordering

- [ ] Derive module numbers from array/table order rather than the hand-maintained `n`
      field, now that content lives in Supabase with a natural ordering column
