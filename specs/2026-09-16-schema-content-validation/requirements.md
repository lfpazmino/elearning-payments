# schema-content-validation - Requirements

## Scope

This spec retroactively documents **Phase 1 - Schema & Content Validation** (`specs/roadmap.md`
1.1-1.3), which shipped in commit `12d68a6` on 2026-09-15 without a `specs/YYYY-MM-DD-*/` folder of
its own, and closes the two remaining gaps the 2026-09-16 audit in `TODO.md` surfaced before the
phase is treated as fully done:

- A schema for module, unit, block (per declared type) and resource shapes, matching `course.js`
  as it stands, covering all eleven block types in use (`h`, `p`, `note`, `ul`, `ol`, `callout`,
  `table`, `stats`, `qa`, `beats`, `gloss`).
- A browser load-time check that renders a visible banner on the first violation, and an npm-free
  Node CLI gate (`scripts/validate-course.js`) that exits non-zero on any violation.
- **New in this pass:** `schema.js` MUST reject a unit whose `check` array is empty. R-13 requires
  every unit to end with self-check prompts; the schema accepted zero as valid until now, which
  would let a future content edit silently violate R-13 with no signal.
- **New in this pass:** a developer-facing instruction, in both `README.md` and
  `prototype/README.md`, that `node scripts/validate-course.js` must be run and must pass before
  every deploy. The script existed and worked; nothing told a human to run it.

## Out of Scope

- CI enforcement of the validator. Deferred by design to Phase 2 (`specs/tech-stack.md`: "Zod
  schema checks in CI, failing the build on violation"). This spec only closes the manual-deploy
  gap until then.
- Starting `CHANGELOG.md`. `TODO.md` flags this as a separate open gap; the stakeholder chose not
  to bundle it into this pass.
- Any change to `architecture/model.c4`. Nothing in this phase or this fix pass introduces or
  rewires a runtime container, actor, or data store - see `architecture.md` in this folder.
- Requiring more than one self-check per unit. R-13 asks for "self-check prompts" (plural in the
  requirement text, but every current unit already carries at least one); this pass enforces
  "non-empty," not a specific minimum count.

## Decisions

- **`check` array minimum is 1, not 2.** R-13's plain requirement is that a unit end with
  self-checks, not a specific count. Requiring 2 was considered and rejected as inventing a bar
  the stakeholder never asked for; all 36 current units already clear a minimum of 1, so this
  choice does not force any content rewrite.
- **Deploy-step documentation lives in both `README.md` and `prototype/README.md`**, not only in
  `CLAUDE.md`. `CLAUDE.md` is agent-facing; a human running a manual deploy needs the instruction
  in the project's own developer-facing docs. Putting it only in `CLAUDE.md` was rejected because
  it would leave a human deploying without an agent invisible to the requirement.
- **This spec folder is dated 2026-09-16 (today), not backdated to 2026-09-15** (the phase's actual
  ship date). The folder records when the retroactive spec was written, not when the code shipped;
  backdating it would misrepresent when this documentation actually came to exist.
- **No `CHANGELOG.md` in this pass.** Explicitly deferred per stakeholder choice; remains tracked
  as an open gap in `TODO.md` rather than silently dropped.

## Context

Phase 1 is the only roadmap phase implemented so far, and it shipped directly to `main` with no
branch and no dated spec folder - a process gap the 2026-09-16 `TODO.md` audit already named. This
spec is not jumping the roadmap out of order: it is a completeness pass on the phase currently in
progress, closing the two concrete gaps (`schema.js`'s missing non-empty check, and the undocumented
pre-deploy step) that the same audit flagged as the immediate next work in `TODO.md`'s *Now*
section. Phase 2 (Next.js + Tailwind migration) depends on this schema being trustworthy, since
`specs/tech-stack.md` 2.3 ports this same schema to Zod - a gap here would carry forward.

## Stakeholder Notes

- **lfpazmino** needs the schema to actually enforce R-13 structurally, not just describe it in
  prose, since nothing today would catch a future unit shipped with zero self-checks.
- **lfpazmino** needs the pre-deploy validation step to be discoverable by a human doing a manual
  deploy, not only known to whoever last touched `scripts/validate-course.js`.
- No new end-reader-facing behavior is introduced by this pass; both changes are developer-facing
  tooling and documentation.
