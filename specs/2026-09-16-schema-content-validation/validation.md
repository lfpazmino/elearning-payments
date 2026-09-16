# schema-content-validation - Validation

## Definition of Done

`schema.js` rejects a unit with an empty `check` array, all 36 current units still validate
cleanly under the tightened rule, and a developer reading either `README.md` or
`prototype/README.md` is told to run `node scripts/validate-course.js` before every deploy.

## Steps for Testing the Phase

1. `node scripts/validate-course.js` - expect
   `Content valid — 36 units across 11 modules, 86 resources.` and exit code `0`.
2. Edit one unit in `prototype/assets/js/course.js` to set `check: []`, then run
   `node scripts/validate-course.js` again - expect a non-zero exit and an error line naming that
   unit's `.check` as invalid (e.g. `... .check: must be a non-empty array`). Revert the edit
   afterward and re-run step 1 to confirm it's back to a clean pass.
3. `grep -n "validate-course" README.md prototype/README.md` - expect at least one match in each
   file, in each case describing it as a required pre-deploy step.
4. Open `prototype/index.html` in a browser (`cd prototype && python3 -m http.server 8000`) -
   expect the page to render normally with no red validation banner, confirming
   `validate-load.js` still passes against the tightened schema.
5. `ls specs/2026-09-16-schema-content-validation/` - expect `requirements.md`, `plan.md`,
   `validation.md`, and `architecture.md` all present.

## Not Required

- CI enforcement of `scripts/validate-course.js` - explicitly deferred to Phase 2 per
  `specs/tech-stack.md`.
- A `CHANGELOG.md` entry - deferred by stakeholder choice this pass; remains an open item in
  `TODO.md`.
- Any change to `architecture/model.c4` or a new LikeC4 view - this phase adds no structural
  element (see `architecture.md`).
