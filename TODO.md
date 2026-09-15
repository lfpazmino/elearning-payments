# Payments eLearning

## TODO

### Now

- **Schema validation for the course data file (NFR-06).** This is the widest gap between what the
  prototype proves and what the requirements demand. Content correctness *is* the product, and today
  a mistyped block type or a missing `objective` either throws at runtime or renders nothing, with
  no signal at author time. Define the shape of a module, a unit, a block and a resource, validate
  on load in development, and fail the deploy on a violation.

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
