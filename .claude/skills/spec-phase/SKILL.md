---
name: spec-phase
description: "Spec and implement one specific roadmap phase in a spec-driven project: resolve the named phase, branch, interview via AskUserQuestion, then write specs/YYYY-MM-DD-feature-name/ with plan.md, requirements.md and validation.md. Use for \"work on phase N\" or /spec-phase; spec-dev takes the next phase automatically."
---

# Spec Phase

Specs and implements **one specific roadmap phase** - the one the user names.

This is the deliberate-choice half of the pair:

| Skill | Picks the phase |
| --- | --- |
| `spec-dev` | Automatically - the next unchecked phase, iterating through the roadmap |
| `spec-phase` | The user names it. Never auto-selected |

`spec-dev` also owns the full project lifecycle: project spec, constitution, MVP cut-off, brownfield onboarding. If the project has no `specs/mission.md` yet, stop and use `spec-dev` instead - there is no constitution to spec against.

## Hard rules

1. **Never auto-select the phase.** If the user did not name one, ask (Step 1). Taking the next phase silently is `spec-dev`'s behaviour, and doing it here defeats the reason this skill exists.
2. **Never write a spec file before an `AskUserQuestion` round.** One call, questions grouped on the three files being written.
3. **Never run git.** Print `git checkout -b ...`, `git commit`, `git merge`, `git branch -d` as commands for the user to run. Read-only git (`status`, `log`, `diff`) is fine and encouraged.
4. **Stop after writing the spec.** Sign-off comes before any implementation.
5. **Verify library facts through context7** (`resolve-library-id` -> `get-library-docs`) before pinning a version, API or config. Never from memory.
6. **Diagrams move with the code.** New component, service, datastore or integration -> update the LikeC4 model in `architecture/` in the same change set.
7. **Match the file shapes in Step 5 exactly.** Heading depth is house style, not decoration - a file one level off gets hand-fixed every time.

## File conventions

Every file this skill writes follows these:

- **One `#` per file, and it is the phase title**: `# Phase {N} Requirements — {Feature-Name}`. Never open with `# {Project}` - the project name lives in `spec.md`, not as a wrapper heading on every file.
- **Sections are `##`, sub-sections `###`.** Never deeper.
- **Em dash between the phase title and the feature name**, hyphen inside group names: `# Phase 2 Plan — user-auth` with `## Group 1 - schema`.
- **Blank line after every heading.**
- **Title Case for headings.**
- **No HTML comment header.** Reference templates carry one; generated files do not.

---

## Step 1 - Resolve the phase

Read `specs/roadmap.md` first. Then:

**If the user named a phase** - by number ("phase 2", "2.3"), by title, or by the feature it contains - resolve it against the roadmap and say which phase you matched, in full, before going further. A wrong match is expensive three files later.

**If the named phase does not exist in the roadmap**, stop. List the phases that do exist with their status and ask which was meant. Do not invent a phase, and do not quietly pick the closest one.

**If the user named nothing**, list the roadmap phases with their status - complete, in progress, not started - and ask which one to work on. Suggest the next unchecked phase as the likely answer, and note that `spec-dev` takes it automatically if that is all they want. Do not proceed on the suggestion alone.

### Working out of order

The point of this skill is that the user may deliberately jump the queue. Allow it - but never silently:

- Say which earlier unchecked phases are being skipped.
- Name any dependency the chosen phase has on work that has not happened yet, and what will have to be stubbed or deferred because of it.
- If `TODO.md`'s **Now** section points somewhere else, say so. Here the user's explicit choice wins over `TODO.md`; report the divergence rather than resolving it silently, and ask whether `TODO.md` should be updated.

That report is part of the deliverable, not a caveat. A phase specced out of order without its dependencies named is how a roadmap quietly stops being true.

## Step 2 - Load the context

Read before asking anything:

- `specs/mission.md` - the phase must serve it
- `specs/tech-stack.md` - the phase must use it, or explicitly amend it
- the two or three most recent `specs/YYYY-MM-DD-*/` directories - for conventions, open decisions and anything this phase depends on
- `architecture/*.c4` - what already exists structurally

## Step 3 - Propose the branch

```bash
git checkout -b feature/{feature-name}
```

Slug the phase's feature name in kebab-case. Do not run it.

## Step 4 - Interview (mandatory)

One `AskUserQuestion` call, questions grouped to mirror the three files:

- **Requirements** - where is the boundary? Offer concrete in/out splits, not an open prompt. Surface the decision that will be expensive to reverse. If the phase is being taken out of order, make the stub-versus-defer choice one of the questions.
- **Plan** - how should this be broken up and sequenced? Offer 2-4 real decompositions with trade-offs.
- **Validation** - what proves this is done? Automated tests, a manual walkthrough, a performance threshold, a demo.

Give concrete options with trade-offs, informed by the context you just read. "What do you want?" is a wasted question.

## Step 5 - Write the spec

Get today's real date (`date +%F`) - never guess it. Create `specs/YYYY-MM-DD-feature-name/`, using the phase's feature name.

**`requirements.md`**

```markdown
# Phase {N} Requirements — {Feature-Name}

## Scope

What this phase delivers. Specific enough to test.

## Out of Scope

- Explicitly deferred, so the boundary is on record

## Decisions

Configuration and architectural choices, each with the reason and the alternative rejected.

## Context

Why now, what it depends on, what depends on it. If this phase was taken out of roadmap order, say so here and name what was skipped.

## Stakeholder Notes

- **{User}** needs this to behave like X
- **{User}** has no requirements yet; this phase is plumbing only
```

**`plan.md`**

```markdown
# Phase {N} Plan — {Feature-Name}

## Group 1 - {name}

1. Step 1
2. Step 2
3. Step 3

## Group 2 - {name}

1. Step 1
2. Step 2
```

Each group is a coherent unit that leaves the project in a working state. Order them so work can stop cleanly at any group boundary. More than ~5 groups means the phase is too big - propose splitting it in the roadmap.

**`validation.md`**

```markdown
# Phase {N} Validation — {Feature-Name}

## Definition of Done

### 1. {Check}

Command to run, expected output.

### 2. {Check}

Command to run, expected output.

## Not Required

- What this phase does NOT have to prove
```

Checks must be executable or observable - "works correctly" is not a check.

Add a Mermaid sequence or flow diagram inline in `requirements.md` when the phase involves a non-obvious request flow, pipeline or state machine. Structure goes in the LikeC4 model, not here.

## Step 6 - Stop

Present the three files and ask for sign-off. No code until the user approves.

---

## After sign-off

**Implement one task group at a time.** After each: run the project's tests and linters, report what passed, tick the group in `plan.md`. If reality forces a deviation, update `plan.md` and `requirements.md` *first*, say so, then continue. If the user adds work mid-flight, add the task group and re-sync the other two files so all three stay consistent.

**Validate** against `validation.md` item by item, reporting pass/fail per item. Do not claim done on a partial pass.

**Deep review before merge.** Spawn subagents to review the branch diff from independent angles - correctness against `requirements.md`, architecture and maintainability, security and failure modes - and report what doesn't hold up.

**Close out:** refresh the LikeC4 model and run `npx likec4 validate`; add a dated entry to `CHANGELOG.md`; mark the phase complete in `specs/roadmap.md`; update `TODO.md` so it reflects what actually happened. Then propose:

```bash
git add -A && git commit -m "feat: {feature-name}"
git checkout main && git merge feature/{feature-name}
git branch -d feature/{feature-name}
```

Finally, check whether this work changed what remains - especially if the phase was taken out of order. If later roadmap phases should be combined, split or reordered, say so and propose the edit to `specs/roadmap.md`.