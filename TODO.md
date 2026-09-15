# Payments eLearning

## TODO

### Now

Phase 1 (Schema & Content Validation) is done and audited (2026-09-16, see below). Nothing is
queued in *Now* until the next priority is picked — "Design and implement the notes +
persistence layer" and "Decide the framework/build-step question" below already flag
themselves as candidates; that promotion is a deliberate call, not made here.

- **Close two small gaps the Phase 1 audit surfaced (low effort, do first):**
  - Document `node scripts/validate-course.js` as a required manual step before every deploy
    (in `README.md` or `prototype/README.md`). The script works and exits non-zero on a schema
    violation, but nothing currently tells a developer to run it. CI enforcement is deferred by
    design to Phase 2 (`specs/tech-stack.md`: "Zod schema checks in CI, failing the build on
    violation") — this covers the manual-deploy gap until then.
  - Tighten `schema.js` to require a non-empty `check` array per unit. It currently accepts a
    unit with zero self-checks and would not catch a future regression, even though R-13
    requires every unit to end with self-check prompts. Not a live bug — all 36 current units
    have at least one check — but the invariant isn't guarded going forward.

### Phase 1 audit (2026-09-16)

Verified against `specs/roadmap.md` 1.1–1.3 by reading `schema.js`, `validate-load.js`,
`index.html` and `scripts/validate-course.js`, and by running the validator against the live
`course.js`. The roadmap's checkmarks hold up:

- **1.1 Schema** — correct and complete. Covers module (`id`, `n`, `title`, `subtitle`), unit
  (`id`, `title`, `objective`, `mins`, `blocks`, `resources`, `check`) and all 11 block types
  actually used in `course.js` (confirmed by grep — `h`, `p`, `note`, `ul`, `ol`, `callout`,
  `table`, `stats`, `qa`, `beats`, `gloss` — none extra, none missing).
- **1.2 Validate on load / pre-deploy gate** — both wired correctly. `validate-load.js` shows a
  visible banner listing every violation (stronger than the roadmap's "first violation," not a
  gap). `scripts/validate-course.js` is genuinely npm-free (no `package.json`, no dependencies)
  and exits non-zero on failure — confirmed by running it: "Content valid — 36 units across 11
  modules, 86 resources," matching the README's stated baseline exactly.
- **1.3 Retrofit** — confirmed zero violations; nothing needed retrofitting.
- **Process gaps found, not code gaps** (see *Now* above for the two worth fixing immediately):
  - No `specs/YYYY-MM-DD-*/` directory exists for Phase 1 (no `requirements.md`/`plan.md`/
    `validation.md`) — it shipped without this project's own spec-phase workflow, so there was
    no recorded Definition of Done to check against; this audit reconstructed one from the
    roadmap checklist instead.
  - No `CHANGELOG.md` exists anywhere in the repo — the spec-phase skill's close-out step calls
    for a dated entry per phase; none was ever created. Worth starting one now rather than
    backfilling Phase 1's history.
  - `architecture/model.c4` was not touched by the Phase 1 commit (`12d68a6`). Not treated as a
    defect here — `schema.js`/`validate-course.js` are dev-time tooling, not a new runtime
    container — but confirm that reasoning deliberately next time rather than assuming it.
- **Content observation, not a defect:** three units (`stage/hard-questions`,
  `stage/ninety-seconds`, `stage/glossary`) have zero resources. The schema correctly allows
  this — it reads as intentional, since all three are module 10 rehearsal/closing units rather
  than standard content units.

### Next

- **Design and implement the notes + persistence layer** (R-19, NFR-07, NFR-08, NFR-09; Decisions
  table rows "Progress in database storage" and "Course content stored in a database", both marked
  *Revisit at spec time*). This is unimplemented, not just unpolished — the prototype proves none of
  it. R-19 needs a per-unit note editor (bold/italic/strike, clipboard image paste); NFR-07/NFR-08
  ask for a free-tier database (e.g. Supabase) to persist progress, completions and notes-with-images;
  NFR-09 asks whether course content itself should move off `course.js` into that same store. All
  four items are `[inferred]` or explicitly un-decided. This is likely a wider gap than schema
  validation above and may belong in *Now* instead of *Next* — worth a deliberate call, not a default.
- **Confirm or drop the sixteen `[inferred]`/part-stated requirements** (R-05, R-07, R-08, R-11,
  R-12, R-13, R-14, R-16, R-18, NFR-01, NFR-03, NFR-04, NFR-05, NFR-07, NFR-08, NFR-09). Anything
  that survives gets re-tagged `[agreed]` and traced into `spec.md`; anything that does not gets
  deleted. Until this is done the spec is building on assumptions. This now includes `NFR-03`
  (payload ≤200 KB uncompressed), restored as a numbered row — it had been dropped from the table
  and left as a dangling reference in the inferred-count paragraph and the Open Questions section;
  both are now fixed to point at it correctly.
- **Decide the framework/build-step question** (Decisions, marked *Revisit*). It was never actually
  decided — it happened. It constrains everything downstream, so it should be a decision with a
  recorded reason, whichever way it goes.
- **Link checking in CI** (R-10). Eighty-six external links, all required to be free and reachable.
  One already 404'd and was caught by hand. This does not scale without automation.
- **Content freshness mechanism** (open question). The syllabus is full of dated regulatory facts
  with known move-risk. Decide whether a unit carries a review date, and whether staleness is
  surfaced to the reader or only to the author.
- **Focus management on route change** (open question, accessibility). Arrow-key navigation exists;
  moving between units does not move focus, which makes the site awkward to operate without a mouse.
- **Derive module numbers from order.** They are hand-maintained in the data today and drifted once
  already when two modules were inserted.
- **Surface storage failure to the reader** (NFR-05). Failures are caught and swallowed; a reader in
  private browsing sees progress silently not save.
- **Decide on search** (open question). Judgement call at 36 units; not one at 60.
