# schema-content-validation - Plan

## Tasks Group 1

1. Tighten `prototype/assets/js/schema.js` so a unit's `check` array must be non-empty, not just
   an array - fail with a message consistent with the existing style (e.g. `"must be a non-empty
   array"`).
2. Run `node scripts/validate-course.js` against the current `course.js` to confirm all 36 units
   still pass with the tightened rule.
3. Temporarily set one unit's `check` to `[]`, re-run the validator to confirm it now fails with a
   clear, correctly-pathed error, then revert the edit.

## Tasks Group 2

1. Add a "before every deploy" instruction to `prototype/README.md` naming
   `node scripts/validate-course.js` as a required, must-pass step.
2. Add the same instruction to root `README.md`, cross-referencing `prototype/README.md` rather
   than duplicating the full explanation.
3. Note in both places that CI enforcement is deferred to Phase 2, so the documentation does not
   overclaim automation that does not exist yet.

## Tasks Group 3

1. Confirm `specs/2026-09-16-schema-content-validation/requirements.md` and this `plan.md` are in
   place (this group closes out the retroactive spec itself).
2. Write `validation.md` and `architecture.md` in the same folder.
3. Update `TODO.md`'s *Now* section to reflect that both flagged gaps are closed, and note this
   spec folder now exists.
