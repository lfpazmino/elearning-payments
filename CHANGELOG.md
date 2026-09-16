# Changelog

## 2026-09-16

- **Phase 1 - Schema & Content Validation** marked complete. Content schema (`schema.js`)
  covering module/unit/block/resource shapes and all eleven block types, a browser load-time
  validation banner (`validate-load.js`), and an npm-free pre-deploy gate
  (`node scripts/validate-course.js`). The two audit gaps are closed: `schema.js` now rejects an
  empty `check` array, and the pre-deploy step is documented in both READMEs.

## 2026-09-15

- Constitution generated: `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`, and the
  initial `architecture/model.c4`.
- Prototype preserved as evidence under `prototype/` (deployed at
  `lfpazmino.github.io/payments-academy`).
- Phase 1 shipped: `schema.js`, `validate-load.js`, `scripts/validate-course.js`.
