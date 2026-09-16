# Feature - Phase Map

One row per key feature (see `specs/mission.md`'s Key Features). Refreshed by `spec-signoff`
every time a phase is signed off - this is the source `signoff.md`'s feature-progress section
reads from. Do not duplicate this per phase; it is a living, whole-project artifact, like
`architecture/model.c4`.

| Feature | Requirement IDs | Phase | Status | Notes |
| --- | --- | --- | --- | --- |
| Structured curriculum | R-01, R-12, R-13 | Phase 2 | Done | 11 modules, 36 units render from typed `content/course.json`; each unit shows objective, time estimate and self-check prompts. |
| Sequential and direct navigation | R-02, R-03 | Phase 2 | Done | Contents rail on every screen; prev/next via real static routes. |
| Completion tracking | R-04, R-05, R-07, R-08, R-14 | Phase 2 | Done | `lib/progress.tsx` backs mark/un-mark, resume-at-first-incomplete, per-module + whole-course stats, and reset-all - still on `localStorage`, not yet durable across a lost backend (Phase 3). |
| Resource library | R-09, R-10, R-11 | Phase 2 | Done | Per-unit framed resource checklist and the aggregated, filterable `/library` view both ported. |
| Per-unit notes | R-19 | Phase 3 | Not Started | No editor component exists yet; confirmed absent in this signoff's code sweep. |
| Shareable deep links | R-18 | Phase 2 | Done | Real per-route static export (`/module/unit/`) replaces hash routing; reload-safe, verified in this signoff. |
| Resilient content | NFR-07, NFR-08, NFR-09 | Phase 3 | Not Started | Content and progress are still static data / `localStorage`; Supabase migration and reseed export are Phase 3/4. |
