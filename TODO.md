# Payments eLearning

## TODO

### Now

Phase 1 (Schema & Content Validation) and Phase 2 (Next.js + Tailwind Migration) are both complete
and signed off. Phase 2's signoff (`specs/2026-09-16-nextjs-tailwind-migration/signoff.md`)
re-ran the real build, the build-fails-on-violation gate, and the Vitest suite live; all passed
(5/5 features at 100% for this phase). Its one caveat: deep-link/theme/progress UI behavior and
the actual CI deploy were verified by reading the code, not by an interactive browser session or
an observed `main` push — see that signoff's Test Results and Follow-Ups.

The next phase is **Phase 3 (Supabase Persistence)** — move content, progress and notes to Supabase
and build the per-unit notes editor (R-19). Picking it up is a deliberate call; it depends on the
four `[inferred]`/un-decided items it touches (NFR-07, NFR-08, NFR-09, and the notes persistence model).

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
- **Process gaps found, not code gaps** (see *Now* above — both now closed):
  - No `specs/YYYY-MM-DD-*/` directory existed for Phase 1 (no `requirements.md`/`plan.md`/
    `validation.md`) — it shipped without this project's own spec-phase workflow, so there was
    no recorded Definition of Done to check against; this audit reconstructed one from the
    roadmap checklist instead. `specs/2026-09-16-schema-content-validation/` now exists and the
    code matches it.
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

### Phase 2 signoff (2026-09-16)

Verified against `specs/2026-09-16-nextjs-tailwind-migration/{requirements,plan,validation}.md`
by running the real build, test suite and a live break-test of the content-validation gate. Full
detail in `specs/2026-09-16-nextjs-tailwind-migration/signoff.md`; `specs/feature-phase-map.md`
created to track feature-to-phase status going forward.

- All five plan task groups shipped as planned; one undocumented-but-sound deviation found and
  recorded (`output: 'export'` scoped to production only in `next.config.mjs`, to suppress a dev-mode
  warning while `redirects()` still points the dev root at the basePath).
- `npm run build`, the `prebuild` content gate, and `npm test` (17/17) all re-run live and passed.
  The build-fails-on-violation behavior was verified by actually breaking a unit's `check` array
  and observing the non-zero exit, not assumed from the code.
- **Architecture drift fixed:** `architecture/model.c4` still tagged the `ci` (GitHub Actions)
  system `#planned` even though its `ci -> web` relationship had already lost that tag and the
  pipeline is live. Removed the stale tag; `npx likec4 validate` confirms the model is still valid.
- Tailwind v4 and Next.js `output: 'export'`/`basePath` usage checked against current docs via
  context7 — both match current best practice with no findings.

### Next

- **`@tailwindcss/webpack` loader** (Phase 2 signoff follow-up). Context7-confirmed ~2x faster
  builds than `@tailwindcss/postcss` under Turbopack, which this project already runs. Small,
  isolated, low-risk — not a content-phase task.
- **Live-browser validation pass** (Phase 2 signoff follow-up). `validation.md` steps 2–5 and 7
  (rendered output, deep-link reload, theme toggle, progress UI, and an actual `main` push/deploy)
  were verified structurally in the signoff, not by observing them run. Worth a manual pass before
  or shortly after this branch merges.
- **Add a standalone `lint`/`typecheck` script** (Phase 2 signoff follow-up). Type-checking
  currently only runs inside `next build`; a separate script would let CI or a pre-commit hook fail
  faster and independently of a full build.
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
