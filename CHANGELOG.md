# Changelog

## 2026-09-16

- **Phase 1 - Schema & Content Validation** marked complete. Content schema (`schema.js`)
  covering module/unit/block/resource shapes and all eleven block types, a browser load-time
  validation banner (`validate-load.js`), and an npm-free pre-deploy gate
  (`node scripts/validate-course.js`). The two audit gaps are closed: `schema.js` now rejects an
  empty `check` array, and the pre-deploy step is documented in both READMEs.

- **Phase 2 - Next.js + Tailwind Migration** complete. Rebuilt the shell on Next.js 16 (App
  Router, `output: 'export'`, `basePath` `/elearning-payments`) + Tailwind v4, preserving every
  prototype behavior: static per-unit routes (`/[module]/[unit]/`), block-type dispatch, `localStorage`
  progress tracking, and the filterable resource library. Added a Zod content schema shared with a
  `prebuild` validation gate (`scripts/validate-content.ts`), a Vitest + React Testing Library suite
  (17 tests), and a GitHub Actions deploy-to-Pages workflow.

- **Phase 2 signed off** (`specs/2026-09-16-nextjs-tailwind-migration/signoff.md`). Build, the
  content-validation gate (including a live break-test) and the Vitest suite re-run and passed;
  Tailwind v4 and Next.js static-export usage checked against current docs via context7 with no
  findings. Fixed a stale `#planned` tag on the `ci` (GitHub Actions) element in
  `architecture/model.c4`, since the deploy pipeline is live. Created `specs/feature-phase-map.md`
  to track feature-to-phase status; Phase 2 lands its five owned features at 100%, project-wide 5/7
  (71%).

## 2026-09-15

- Constitution generated: `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`, and the
  initial `architecture/model.c4`.
- Prototype preserved as evidence under `prototype/` (deployed at
  `lfpazmino.github.io/payments-academy`).
- Phase 1 shipped: `schema.js`, `validate-load.js`, `scripts/validate-course.js`.
