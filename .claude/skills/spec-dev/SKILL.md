---
name: spec-dev
description: "Run a project with spec-driven development: README to spec.md, a mission/tech-stack/roadmap constitution, then dated feature specs (plan/requirements/validation) implemented one small phase at a time, with LikeC4 + Mermaid architecture docs kept in sync. Greenfield or brownfield."
---

# Spec-Driven Development

## Role

Act as a senior software architect and engineer. Own the design, not just the code.

Two things follow from that:

- **Specs are the project's memory.** Code is derived. If a decision is not written in `specs/`, it does not exist. Before answering any question about the project, read the specs; when reality and the specs diverge, fix the specs in the same turn as the code.
- **The user never loses control of what gets generated.** Every phase boundary is a checkpoint the user signs off on. Architecture is documented visually and kept current. No silent scope expansion, no undocumented components.

## Relationship to `spec-phase`

This skill **iterates**: it takes the next unchecked roadmap phase automatically and works through the roadmap in order. When the user wants a *specific* phase instead - out of order, or chosen deliberately - that is `spec-phase`. If the user names a phase, hand off to `spec-phase` when it is available.

## Non-negotiable rules

1. **AskUserQuestion before writing.** Every `spec.md`, constitution file and feature spec is preceded by an `AskUserQuestion` round. Group the questions to mirror the files being written (3 files -> 3 grouped questions). Never write these to disk from assumptions alone.
2. **Small phases.** A roadmap phase is a shippable, independently reviewable slice - days, not weeks. If a phase has more than ~5 task groups, split it.
3. **Propose git, never run it.** Do not run `git checkout -b`, `commit`, `merge`, `branch -d` or `push`. Print the exact commands in a fenced block and let the user run them. Read-only git (`git status`, `git log`, `git diff`) is fine and preferred for understanding state.
4. **Verify library facts, don't recall them.** Before pinning a version, an API shape or a config, pull current docs with **context7** (`resolve-library-id` -> `get-library-docs`). Fall back to web search if context7 is unavailable. Training-memory version numbers are a defect.
5. **Diagrams ship with code.** Any change that adds, removes or rewires a component updates the LikeC4 model in the same change set. A PR that changes architecture without changing `architecture/` is incomplete.
6. **`TODO.md` overrides `roadmap.md` ordering.** The roadmap is the plan; `TODO.md` is what's next *now*. When they disagree, follow `TODO.md` and tell the user the roadmap is drifting.
7. **Match the file shapes below exactly.** Heading depth is not cosmetic - it is the house style, and a file one level off has to be hand-fixed every time.

## Repository layout this skill maintains

```
README.md                 stakeholder input (user-authored, the raw requirement)
TODO.md                   Now / Next - what to pick up, overrides roadmap order
spec.md                   project summary: goals, functional specs, constraints, acceptance
CHANGELOG.md              dated headings, updated before each merge
specs/
  mission.md              core idea, audience, what success looks like
  tech-stack.md           chosen stack + rationale + what we are NOT using
  roadmap.md              small numbered phases, checkboxes, completion marks
  YYYY-MM-DD-feature-name/
    requirements.md       scope, out of scope, decisions, context, stakeholder notes
    plan.md               numbered task groups
    validation.md         definition of done - how we know it can merge
architecture/
  *.c4                    LikeC4 model - single source of truth for structure
  README.md               how to run/build the diagrams
```

## Generated file conventions

These apply to every file this skill writes. They are the difference between output the user keeps and output the user reformats.

- **One `#` per file, and it is the file's own title** - `# Mission`, `# Roadmap`, `# Tech Stack`, `# Phase 1 Plan — {Feature-Name}`. Never open a spec file with `# {Project}`; the project name belongs in `spec.md`, not repeated as a wrapper heading.
- **Top-level sections are `##`. Sub-sections are `###`.** Do not nest deeper than `###` in any generated spec file.
- **No HTML comment header.** The template files in the reference repo carry a `<!-- Template for spec-driven development -->` block; that marks the *template*, not generated output. Do not reproduce it.
- **Em dash in feature-file titles**, hyphen in roadmap phase headings: `# Phase 1 Requirements — {Feature-Name}` but `## Phase 1 - Project Foundation (Week 1)`.
- **Blank line after every heading**, before the content that follows it.
- **Title Case for headings.**

## Workflow

Start by determining the mode: **greenfield** if there is no meaningful source code, **brownfield** if there is. Check with `git log --oneline | head`, a directory listing, and the presence of manifests (`package.json`, `pyproject.toml`, `pom.xml`). State which mode you're in before proceeding.

---

### Phase 0 - Brownfield only: reverse-engineer the context

Skip for greenfield. Work in a clean session.

1. Map the existing codebase: entry points, modules, data stores, external calls, build and deploy config, test setup.
2. Read `README.md` and `TODO.md` for stakeholder input and pending work.
3. Build the initial LikeC4 model from what actually exists (see *Architecture documentation*), so the constitution is written against reality rather than intent.
4. **Interview the user** with `AskUserQuestion` about: mission (what is this for, who uses it), target audience, and tech-stack gaps (what's legacy vs. what's intentional, what they want to move off).

Then continue at Phase 2 - the roadmap is derived from `TODO.md` rather than invented.

---

### Phase 1 - Project spec (`spec.md`)

Trigger: a new project whose `README.md` holds the stakeholder input.

1. Read `README.md` in full. Treat each stakeholder bullet as a requirement to be traced.
2. `AskUserQuestion` on whatever the README leaves ambiguous - typically: primary business goal, hard technical constraints, in-scope vs. out-of-scope for v1, what "done" looks like.
3. Write `spec.md`:

```markdown
# {Project Name}

## Project Definition

### Business Goals

Why this exists. One paragraph per goal, traceable to a stakeholder bullet in README.md.

### Functional Specs

Stated in highly testable language - specific enough that each line passes or fails a test.

- The system MUST ...
- Given X, when Y, then Z.

### Tech Stack / Rules

Technical constraints that bound the solution space. Not the full stack (that's tech-stack.md) -
the non-negotiables: languages, hosting limits, compliance, budget, existing systems to integrate.

### I/O Data & Edge Cases

Explicit acceptance criteria. Inputs, outputs, boundary conditions, failure modes.

## Tactical Steps

1. Explore the repo - map the architecture
2. Clarify specs - resolve ambiguous requirements
3. Create spec - formal specification
4. Generate plan - translate spec to plan
5. Implement - code and test in increments
6. Review diff - review the diff against the spec

## Best Practices

- Test mapping - every functional spec line maps to a test
- Validation hooks
- Task agents for parallel work
- AI review before merge
```

4. **Stop. Present `spec.md` and ask for sign-off.** Do not start the constitution until the user approves.

---

### Phase 2 - The constitution (`specs/`)

Trigger: `spec.md` signed off, or "create the constitution".

**Mandatory:** one `AskUserQuestion` call with questions grouped on the three files, before writing anything.

- *Mission* - core idea, who we serve, target audience, what success looks like.
- *Tech stack* - the real choices. Offer 2-4 concrete options per layer with trade-offs, not open-ended prompts. Consult context7 for current versions and compatibility before presenting options.
- *Roadmap* - phase granularity and ordering, what belongs in Phase 1 vs. deferred.

Then write the three files, in these exact shapes.

**`specs/mission.md`**

```markdown
# Mission

{Project}'s top mission.

## Core Concept

The core concept behind the app.

## Key Features

- **Feature 1** - Capability 1
- **Feature 2** - Capability 2
- **Feature 3** - Capability 3

### Samples

Examples.

<!-- Generated section -->

## What We Do

**{Project}** goal.

## Who We Serve

- **User type 1** — profile description.
- **User type 2** — profile description.

## Target Audience

- **User group 1** behaviour.
- **User group 2** behaviour.

## What Success Looks Like

Ultimate goal.
```

Note: `### Samples` nests **under** Key Features. The `<!-- Generated section -->` marker separates the human-authored top from the part this skill derives - keep it.

**`specs/tech-stack.md`**

```markdown
# Tech Stack

## Overview

One paragraph on the shape of the system.

## Core

| Layer | Choice | Rationale |
| --- | --- | --- |

## FrontEnd

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | ... | ... |
| Meta-framework | ... | ... |
| Language | ... | ... |
| Styling | ... | ... |
| Component Library | ... | ... |
| State Management | ... | ... |
| Data Fetching | ... | ... |

## Backend

| Layer | Choice | Rationale |
| --- | --- | --- |
| Runtime | ... | ... |
| API | ... | ... |
| Language | ... | ... |
| Validation | ... | ... |

## Data

- **{Store}** (via `{driver}`) for {use} — {why}
- Migration approach

## Testing

- Testing tools

## Tooling

- `{tool}` for {purpose}

## What We Are Not Using

- No {thing} — {why not, and when it would become relevant}
```

Three things to get right here: the section is spelled **`## FrontEnd`**; **Core, FrontEnd and Backend are tables**, while **Data, Testing, Tooling and What We Are Not Using are bullet lists**; and the **Rationale column is always filled in** - an empty rationale is a missing decision. Add only the sections the project actually has, and extend with AI/ML, Orchestration, Pipelines, Streaming or Infra/Deploy as tables when they apply.

**`specs/roadmap.md`**

```markdown
# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

---

## Phase 1 - Project Foundation (Week 1)

### 1.1 {Task group}

- [ ] Concrete, checkable item
- [ ] ...

---

Later phases (not yet planned): {list}.
```

Phases are `##`, task groups are `###`, and a blank line follows every heading. Mark completed phases `Complete - YYYY-MM-DD` rather than deleting them.

Then: build the first LikeC4 model from the constitution, propose the commit commands, and **stop for sign-off**.

---

### Phase 3 - Feature spec

Trigger: "next feature", "next phase", or the user names one.

**If the user named a specific phase and the `spec-phase` skill is available, hand off to it** - deliberate, out-of-order phase selection is what it exists for. Otherwise continue here, taking the next phase automatically.

1. Read `TODO.md` first, then `specs/roadmap.md`. `TODO.md`'s *Now* section wins. If `TODO.md` is empty, take the next unchecked roadmap phase.
2. Read `specs/mission.md` and `specs/tech-stack.md` - the feature must be consistent with both.
3. Propose the branch command:
   ```bash
   git checkout -b feature/{feature-name}
   ```
4. **Mandatory `AskUserQuestion`**, grouped on the three files: scope & out-of-scope boundaries (requirements), task-group breakdown and sequencing (plan), and what proves it's done (validation).
5. Get today's real date (`date +%F`) - never guess it. Create `specs/YYYY-MM-DD-feature-name/` and write the three files in these exact shapes:

```markdown
# Phase {N} Requirements — {Feature-Name}

## Scope

What this feature delivers. Specific enough to test.

## Out of Scope

- Explicitly deferred, so the boundary is on record

## Decisions

Configuration and architectural choices, each with the reason and the alternative rejected.

## Context

Why now, what it depends on, what depends on it.

## Stakeholder Notes

- **{User}** needs this to behave like X
- **{User}** has no requirements yet; this phase is plumbing only
```

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

```markdown
# Phase {N} Validation — {Feature-Name}

## Definition of Done

### 1. {Check}

Command to run, expected output.

### 2. {Check}

## Not Required

- What this phase does NOT have to prove
```

6. **Stop for sign-off** before implementing.

---

### Phase 4 - Implementation

1. Implement **one task group at a time**. After each group: run the project's tests/linters, report what passed, and tick the group in `plan.md`.
2. Update the LikeC4 model as soon as a new component, service, datastore or integration appears - not at the end.
3. If reality forces a deviation from the plan, **update `plan.md` and `requirements.md` first**, say so, then continue. Never let the code silently diverge from the spec.
4. When the user asks to add work mid-flight, add the task group *and* re-sync the rest of the feature spec so all three files stay consistent.

---

### Phase 5 - Validation & replanning

1. Work through `validation.md` item by item. Report pass/fail per item; do not claim done on a partial pass.
2. **Deep review before merge.** Spawn subagents to review the branch's full diff from independent angles - correctness vs. `requirements.md`, architecture and maintainability, security and failure modes - and report what doesn't hold up. This is what keeps review from becoming a rubber stamp.
3. Refresh the LikeC4 model and run `npx likec4 validate`.
4. Update `CHANGELOG.md` under a heading for today's date. If no changelog exists, build one from `git log` first.
5. Re-check the roadmap: if the work changed what remains, propose combining, splitting or reordering the later phases and update `specs/roadmap.md`.
6. Mark the phase complete in `specs/roadmap.md`, move the item out of `TODO.md`'s *Now*, and propose the merge commands:
   ```bash
   git add -A && git commit -m "feat: {feature-name}"
   git checkout main && git merge feature/{feature-name}
   git branch -d feature/{feature-name}
   ```

Cross-cutting changes (a new test framework, a responsive-design mandate, a swapped dependency) are handled the same way: update `specs/tech-stack.md`, then **all** affected feature specs, then the code, then the diagrams. Say explicitly which specs you touched.

---

### Phase 6 - MVP cut-off

Trigger: "cut an MVP".

1. Read every phase in `specs/roadmap.md` and every existing feature spec.
2. Propose `git checkout -b mvp`.
3. `AskUserQuestion` on what must be in the MVP vs. what ships later - grouped, as always, on requirements / plan / validation.
4. Write a single `specs/YYYY-MM-DD-mvp/` spec set covering the gap to a stable release.
5. Implement, validate, and then ask the closing question: **"Based on building the MVP, what needs clarification in the specs?"** Fold the answers back into the constitution - that is what makes the specs durable.

---

## Architecture documentation

The user must be able to see everything that was built. Two layers, both in git:

### LikeC4 - the interactive model (structure, always)

One `.c4` model in `architecture/` is the single source of truth. It renders to an interactive, navigable site where the user can drill from context down to components.

```bash
npx likec4 serve          # live preview with hot reload, http://localhost:5173
npx likec4 build          # static interactive site for sharing
npx likec4 validate       # syntax + layout drift - run in CI
npx likec4 export png     # stills for slides/READMEs
```

Model shape:

```
specification {
  element actor
  element system
  element container
  element component
  element datastore
  relationship async
  tag mvp
}

model {
  customer = actor 'Customer'
  app = system 'MyProject' {
    web = container 'Web App' { technology 'Next.js 15' }
    api = container 'API' { technology 'FastAPI' }
    db = datastore 'Primary DB' { technology 'PostgreSQL 17' }

    web -> api 'calls'
    api -> db 'reads/writes'
  }
  customer -> web 'uses'
}

views {
  view index { include * }
  view ofApp of app { include * }
}
```

Rules:

- Every container, datastore and external integration that exists in code exists in the model.
- Element `technology` values must match `specs/tech-stack.md` exactly.
- Tag elements by the feature spec that introduced them, so a view can show what a feature touched.
- Run `likec4 validate` as part of Phase 5 validation.
- If the project is not Node-based, LikeC4 still runs via `npx` - no runtime coupling to the app's stack.

### Mermaid - inline flows (behaviour, per feature)

Sequence, flow and state diagrams go **inline in the feature spec markdown**, where they render natively on GitHub and in VS Code. Use Mermaid for request flows, data pipelines, state machines and decision logic; use LikeC4 for structure. Don't duplicate structure in Mermaid.

### Keeping it honest

At the end of every implementation phase, diff the model against the code and report any component in one but not the other. Drift discovered later is a defect, not a chore.

---

## Tech stack reference

A starting palette, **not a constraint**. Choose what fits the use case, justify it in `tech-stack.md`, and verify versions and APIs through context7 before committing to them. Recommending something outside this list is expected when it's the better fit - say why.

| Area | Familiar ground |
| --- | --- |
| Web frontend | React, Next.js, TypeScript strict, Tailwind, shadcn/ui, TanStack Query |
| Mobile | Flutter |
| Backend | Python (FastAPI), Java (Spring Boot) - API-driven throughout |
| Data | PostgreSQL, MongoDB, Supabase, DuckDB (+ Parquet), vector DBs |
| ML/DL | Python frameworks; feature and training code versioned with the specs |
| Model lifecycle | MLflow |
| Orchestration / deployment control | Prefect |
| Batch pipelines | Apache Airflow |
| Streaming ingestion | Apache Kafka |
| Packaging & environments | Docker / Compose, targeting free-tier-friendly hosts such as Oracle Cloud Infrastructure (ARM Ampere) |

When the target is OCI free tier, treat its limits as first-class constraints in `spec.md`: ARM64 images, bounded memory, no managed-service assumptions.

---

## Checkpoint discipline

Stop and hand control back at each of these, every time:

- `spec.md` written -> sign-off
- constitution written -> sign-off + proposed commit
- feature spec written -> sign-off before any code
- each task group implemented -> test results reported
- validation complete -> deep review, then proposed merge commands

Never cross two checkpoints in one turn.