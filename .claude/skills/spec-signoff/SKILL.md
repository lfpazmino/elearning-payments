---
name: spec-signoff
description: "Sign off a completed roadmap phase in a spec-driven project: review the shipped code against its own spec and current best practices (via context7), reconcile requirements.md/plan.md/validation.md/architecture.md with what actually shipped, refresh the project's feature-to-phase map, and write a signoff.md report with scope completed, real test results and feature-progress percentages. Use for \"sign off phase N\", \"close out this phase\", or /spec-signoff."
---
# Spec Signoff

Closes out a roadmap phase that has already been implemented: verifies the code against its own
spec and against current library best practices, reconciles the spec files with reality, and
produces one dated, durable report - `signoff.md` - inside that phase's `specs/YYYY-MM-DD-*/`
folder.

This is the audit half of the lifecycle `spec-dev`/`spec-phase` drive: they write the spec and
implement it; `spec-signoff` is the checkpoint that confirms it actually landed the way the spec
said, before the phase is called done.

## Vocabulary

Same as `spec-dev`: the unit of work is a **phase** (`specs/roadmap.md`, its own dated folder).
"Feature" describes what a phase delivers to the reader/user - a named capability (the kind of
thing `specs/mission.md`'s "Key Features" lists), backed by one or more requirement IDs
(`R-xx`/`NFR-xx`) from the project's requirements contract (`README.md` or `spec.md`).
`spec-signoff` is what turns "the phase is implemented" into "the phase is signed off," with
evidence, and keeps the feature-to-phase-to-requirement chain traceable.

## Hard rules

1. **Never invent a phase.** Resolve against `specs/roadmap.md` and the `specs/YYYY-MM-DD-*/`
   folders that exist, the same way `spec-phase` Step 1 does. If the user names one, confirm the
   match before going further. If they name none, find every phase that looks implemented but has
   no `signoff.md` yet, or whose code has moved since its last one, and ask which to process -
   offer "all of them, oldest first" as an option, never assume it.
2. **Never fabricate test results, coverage, or a pass/fail.** Run the project's actual build,
   lint, type-check and test commands and report their real output. A check that could not be run
   is recorded as `Not Run` with the reason - never as a pass, never as an estimate, never
   silently omitted. See *Where the checks run* below: not being able to run them here is an
   ordinary outcome, not a failure of the signoff.
3. **Verify best-practice claims through context7, not memory.** For every library or framework
   the phase actually touches, pull current docs (`resolve-library-id` -> `get-library-docs`, or
   this project's `ctx7` CLI if it has one) before writing a recommendation, a "should be doing X"
   finding, or a fix. A stale training-data opinion about a framework's idioms is a defect here,
   not a shortcut.
4. **Reconcile the spec before writing the report.** If `plan.md`, `requirements.md` or
   `architecture.md` no longer match what the code does - a task group that shipped differently, a
   decision that changed under implementation - update those files first, say what changed and
   why, then write the report against the corrected spec. Never let `signoff.md` paper over a spec
   that has silently gone stale.
5. **Read-only git.** Propose `git add`, `git commit`, `git merge`, `git tag` as commands for the
   user to run. Never execute them. Reading git - `log`, `diff`, `status`, `rev-parse` - is not
   only allowed but required by Steps 1 and 6.
6. **One report per phase, in that phase's own folder.** `specs/YYYY-MM-DD-phase-name/signoff.md`
   - Markdown, matching the other four files: it renders on GitHub, diffs cleanly, and sits next
   to the spec it reports on. Do not create a separate reports directory, and do not repeat the
   full content of `requirements.md`/`plan.md`/`validation.md` - summarize and cross-reference.
7. **Keep the feature-to-phase map current.** Maintain `specs/feature-phase-map.md` (create it the
   first time this skill runs, if it does not exist) as the single table tying every key feature
   to its requirement IDs, the phase that delivers it, and its status. Every `signoff.md` derives
   its feature-progress section from this map, not from a fresh guess each run.
8. **Every `signoff.md` records the commit it was taken at.** The header block in Step 6 is what
   makes a signoff falsifiable later: without it, Step 1 cannot tell a phase that is still current
   from one whose code has moved on, and re-signoff detection silently degrades to "does the file
   exist."
9. **Match the file shapes below exactly.** Same house style as `spec-dev`/`spec-phase`: one `#`
   per file (`# {Phase-Name} - Signoff`), `##` sections, hyphen not em dash, Title Case headings,
   blank line after every heading, no HTML comment header.

## Where The Checks Run

The code being signed off often lives somewhere other than this session. Work down this ladder
and say in the report which rung was used:

1. **Here** - the repo is in this working directory. Run the commands directly.
2. **On the user's machine** - if a device shell tool is available and the project's folder is
   connected, run the build, lint, type-check and test commands there, in place. This is the
   normal path for a project the user develops locally, and it produces real output rather than an
   apology.
3. **Not runnable** - no repo here, no connected folder, or a toolchain this environment cannot
   install. Record each affected check as `Not Run` with the reason, list the exact commands for
   the user to run, and offer to finish the report when they paste the output back.

A Definition of Done cannot be called **Pass** on checks that were never run. With unrun checks
it is `Pass (Pending Verification)` at best, naming what is outstanding - or `Blocked` if the
unrun checks are the ones that would prove the phase's core claim.

## Step 1 - Find what needs signing off

Read `specs/roadmap.md` and list every `specs/YYYY-MM-DD-*/` folder.

- **User named a phase** - resolve it against the roadmap and the folder names, the way
  `spec-phase` Step 1 does. State the match before continuing.
- **User named nothing** - for each dated folder, classify it:
  - **No `signoff.md`** - candidate.
  - **Has `signoff.md` with a header block** - read the recorded commit and check whether the
    phase's paths have moved since:
    ```bash
    git log --oneline <recorded-sha>..HEAD -- <paths this phase touched>
    ```
    Any output means the signoff is stale - candidate for re-signoff, and say how many commits
    landed since. No output means it is still current - not a candidate.
  - **Has `signoff.md` with no header block** (written before this rule, or by hand) - staleness
    cannot be determined. Treat as a candidate and say why; the re-signoff will add the header.
  - **Zero candidates** - say so and stop; there is nothing to sign off.
  - **One candidate** - confirm it, then proceed.
  - **More than one** - list them with their apparent status (implemented per `TODO.md`/commit
    history, partially implemented, stale signoff, unclear) and ask which to process, offering
    "all, oldest first" as an option. Do not default to "all" without asking.

## Step 2 - Load the phase's context

For the phase being signed off:

- `requirements.md`, `plan.md`, `validation.md`, `architecture.md` in its folder.
- `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md` - the phase must still agree with
  all three; note it if it doesn't.
- The project's requirements contract (`README.md` or `spec.md`) for the exact text and current
  provenance tag (`[stated]`/`[agreed]`/`[inferred]`) of every requirement ID this phase claims.
- `architecture/model.c4` - whether the elements/relationships `architecture.md` promised for this
  phase actually exist, tagged correctly.
- The actual code the phase touched - not just the files `plan.md` names, but a real diff or
  directory listing, so drift shows up even where the plan didn't anticipate it.

## Step 3 - Refresh the feature-to-phase map

Open (or create) `specs/feature-phase-map.md`:

```markdown
# Feature - Phase Map

One row per key feature (see `specs/mission.md`'s Key Features). Refreshed by `spec-signoff`
every time a phase is signed off - this is the source `signoff.md`'s feature-progress section
reads from. Do not duplicate this per phase; it is a living, whole-project artifact, like
`architecture/model.c4`.

| Feature | Requirement IDs | Phase | Status | Notes |
| --- | --- | --- | --- | --- |
| {Feature name} | R-xx, NFR-xx | Phase N | Done / Partial / Not Started | ... |
```

- Seed the `Feature` column from `specs/mission.md`'s Key Features list (or ask the user for the
  key-feature breakdown if `mission.md` doesn't have one) - these are the "features," not
  individual requirement IDs, which is what the user actually tracks progress against.
- Populate `Requirement IDs` and `Phase` from `specs/roadmap.md`'s own annotations, where a
  checklist item already names a requirement ID against a phase number. Where the roadmap doesn't
  say, leave it blank and flag it rather than guessing.
- Update every row this phase touches from Step 4's actual findings - never from the spec's
  stated intent. Leave every other feature's row untouched.
- `Partial` means shipped but incomplete against its requirement IDs - say in `Notes` what is
  missing. It is not a softer word for `Done`, and it is not a softer word for `Not Started`.

## Step 4 - Verify the implementation

For the phase's own scope only:

1. **Run the real checks**, at the best rung of *Where The Checks Run*. Build, lint, type-check,
   test suite - whatever the project actually has. Capture pass/fail counts and any failing names
   verbatim. If the project has no test suite yet, say that plainly rather than treating "no
   tests" the same as "tests passed."
2. **Check each task group in `plan.md` against the code.** Shipped as planned, shipped
   differently (say how and why), or not shipped (say why not and whether that's a real gap or a
   deliberate, recorded deferral).
3. **Check each requirement `plan.md`/`requirements.md` claims for this phase against observed
   behavior**, not against the code's intent - if a requirement claims deep links survive a
   reload, load one and reload it, or point to the automated test that does.
4. **Verify technical choices against current best practice via context7.** For every library the
   phase actually uses (check what's actually imported, not just what `tech-stack.md` planned),
   pull current docs and compare against how the code uses it: a deprecated API, a config flag
   that changed shape, a pattern the library's own docs now recommend against. Cite the doc
   reference for every finding, not a bare opinion.
5. **Check `architecture.md`'s claims against `architecture/model.c4`** - did the model actually
   get updated as promised, with the right tags?

## Step 5 - Reconcile the spec files

Before writing the report, fix what Step 4 found:

- A plan that shipped differently - update `plan.md` to say what actually happened, and why.
- A requirement that turned out to need a different shape - update `requirements.md`'s Decisions
  section, don't just note it in the report and move on.
- A missed architecture update - update `architecture/model.c4` and `architecture.md` now, tagged
  for this phase.
- A best-practice gap Step 4 found - fix it in the code if it's small and clearly in scope for
  this phase; otherwise record it as a named follow-up in the report rather than letting it ride
  silently.

Say explicitly which files were changed and why - the same discipline `spec-dev`'s own Phase 5
uses ("update `plan.md` and `requirements.md` first, then continue").

## Step 6 - Write `signoff.md`

Capture the commit state first, at the same rung the checks ran on:

```bash
date +%F; git rev-parse --short HEAD; git rev-parse --abbrev-ref HEAD; git status --porcelain
```

If `git status --porcelain` is non-empty, the tree is dirty: say so in the header rather than
implying the recorded SHA is what was verified. If the project is not a git repository, write
`not a git repository` in the commit field - Step 1 will then treat future runs as undetermined
and re-check, which is the honest outcome.

```markdown
# {Phase-Name} - Signoff

**Signed Off:** YYYY-MM-DD at `<short-sha>` on `<branch>`{, with uncommitted changes present}
**Checks Run:** {here | user's machine | not run - reason}

## Scope Completed

What `plan.md` promised versus what shipped. Call out any deviation and why - cross-reference the
`plan.md`/`requirements.md` edits made in Step 5 rather than repeating them.

## Test Results

Real output from the project's build/lint/type-check/test commands, with pass/fail counts. Every
category gets a line, including `Not Run - {reason}` and `None yet` - a missing line reads as a
pass and must never be used for either.

## Best-Practice Review

Per library actually used in this phase: what was checked against current docs (context7), what
matched, what didn't, and what was fixed versus deferred. Cite the doc, not a recollection.

## Feature Progress

The rows of `specs/feature-phase-map.md` this phase owns, then the score. `Partial` counts as
half - a feature that shipped most of the way is not worth the same as one not started:

    (done + 0.5 x partial) / total features

Show the raw counts beside the percentage so it can be checked: `3 done, 1 partial, 1 not started
of 5 = 70%`. Round to whole percent. State the project-wide total separately, computed the same
way over the full map - this phase reaching 100% is not the project reaching 100%.

## Follow-Ups

Anything deferred rather than fixed, with where it now lives (a later phase, `TODO.md`, an open
question).

## Definition of Done

`validation.md`'s Definition of Done, restated, with the call and the evidence for it:
`Pass`, `Pass (Pending Verification)` naming the unrun checks, `Blocked`, or `Fail`.
```

## Step 7 - Close out

Same as `spec-dev`'s Phase 5 close-out, applied per phase:

- Mark the phase `Complete - YYYY-MM-DD` in `specs/roadmap.md` (use the real date, `date +%F`).
  A phase whose Definition of Done came back `Blocked` or `Fail` is not marked complete - say what
  is outstanding and leave it open.
- Add a dated entry to `CHANGELOG.md`.
- Update `TODO.md` so *Now* names the next phase and *Next* reflects what this signoff surfaced.
- Propose (never run):
  ```bash
  git add -A && git commit -m "chore: sign off {phase-name}"
  ```

## Step 8 - Report and stop

Present `signoff.md` in full, name every other file this run touched (`requirements.md`,
`plan.md`, `architecture.md`, `architecture/model.c4`, `specs/feature-phase-map.md`,
`specs/roadmap.md`, `TODO.md`, `CHANGELOG.md`), and stop. Signing off a phase is a checkpoint like
any other in this lifecycle - it does not chain into starting the next phase.
