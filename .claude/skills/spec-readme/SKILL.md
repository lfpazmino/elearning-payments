---
name: spec-readme
description: "Turn a conversation that produced a working prototype into a spec-dev entry point: mine the transcript for requirements and decisions, extract the generated code to prototype/, and write README.md plus TODO.md. Use for \"write the README\", \"capture this as requirements\", or /spec-readme."
---

# Spec README

A conversation that ends in a working prototype holds a project's requirements, scattered across dozens of turns and mixed in with throwaway implementation. This skill harvests that conversation into the two files `spec-dev` reads first - a `README.md` written as **requirements** and a `TODO.md` of what's left - then publishes them to GitHub with the prototype code.

This is the on-ramp. Output feeds `/spec-dev` Phase 1, which turns `README.md` into `spec.md`.

## The one hard distinction

**What the user asked for is a requirement. What Claude built is one solution among many.**

A prototype is full of choices nobody ever decided - a library picked to move fast, an in-memory store because there was no database, a hardcoded value that stood in for config. If those land in the README as requirements, they become permanent by accident and the whole downstream spec inherits them.

So every line in the generated README carries provenance:

| Tag | Meaning |
| --- | --- |
| `[stated]` | The user said this, in some turn. Quote or paraphrase closely. |
| `[agreed]` | Claude proposed it, the user accepted it explicitly. |
| `[inferred]` | Neither - you are reading it off the prototype's behaviour. **Must be confirmed before it stays.** |

Nothing goes in untagged. An `[inferred]` line that survives the confirmation round gets re-tagged; one that doesn't gets deleted or demoted to an open question.

## Hard rules

1. **Never invent a requirement.** If the conversation doesn't establish it, it's an open question, not a requirement.
2. **Extract prototype code verbatim.** Do not refactor, rename, improve or "clean up" while extracting. The prototype's job is to be an honest record of what was proven to work. Fixes belong in the spec-driven build, not here.
3. **`AskUserQuestion` before writing to disk** - one round, on the inferred requirements and the scope boundary.
4. **Requirements get stable IDs** (`R-01`, `NFR-01`). `spec-dev` traces each one into `spec.md`, and traceability breaks without them.
5. **Git exception.** Unlike `spec-dev` and `feature-spec`, which only ever *propose* git commands, this skill runs git and pushes - but only to seed a baseline: a new repo, or a branch-and-PR on an existing one. It never pushes to the default branch of a repo that already has commits, and never force-pushes. Seeding a fresh repo is not the same risk as merging into an established one; do not carry this exception into the other skills.

---

## Step 1 - Sweep the conversation

Read the whole thread chronologically, oldest first. Do not summarize from the final state - the final state hides everything that was tried, rejected and corrected, and rejections are requirements too ("no, it has to work offline" is a requirement).

Collect as you go:

- **Asks** - anything the user wanted the thing to do.
- **Corrections** - every "no, actually..." and "that's not what I meant". These are the highest-signal requirements in the thread; the user only pushed back because something mattered.
- **Constraints** - performance, data volumes, latency, compliance, cost, existing systems, hosting limits.
- **Decisions** - who chose what, and whether the user actually weighed in or just let it pass.
- **Rejected paths** - what was tried and abandoned, and why. This prevents the rebuild from re-walking a dead end.
- **Domain context** - vocabulary, actors, real-world workflow the software models.
- **Artifacts** - every code block, file, artifact and attachment produced.

If the prototype was built in a *different* conversation, say so plainly: you cannot read another chat's transcript. Ask the user to run this skill inside that conversation, or to paste the key exchanges and attach the artifacts.

## Step 2 - Classify

Sort what you collected into:

- **Functional requirements** - what the system must do. Testable, one behaviour per line.
- **Non-functional requirements** - throughput, latency, availability, security, cost ceiling, operability.
- **Decisions already made** - with the reason, and whether they're still open to challenge.
- **Out of scope** - anything the user explicitly ruled out. Record it; an unstated exclusion gets rebuilt by accident.
- **Open questions** - what the prototype dodged and a real build cannot.

Then apply the honest test to every implementation detail in the prototype: *did the user ask for this, or did it just happen?* Tag accordingly. Expect most of the stack to be `[inferred]`.

## Step 3 - Extract the prototype

Write the generated code into `prototype/`, preserving file structure. Add `prototype/README.md`:

- how to run it (exact commands, actual dependency versions)
- what it demonstrates - the specific claims it proves
- what is throwaway: hardcoded values, mocked data, absent error handling, missing auth, no persistence
- what must **not** carry forward into the real build

This directory is evidence, not a foundation. Say so in the file.

### Secret scan - blocking

Before anything is committed, scan every extracted file for credentials: API keys, bearer tokens, connection strings with passwords, private keys, `.env` contents, cloud access keys, webhook URLs. Chat prototypes are full of them because nothing was ever meant to leave the conversation.

If you find one, **stop**. Name the file and line, replace the value with a placeholder, add the variable name to `.env.example`, and tell the user what you removed. Never commit a secret and never push "just this once" - a push to GitHub is effectively permanent even from a private repo.

Write a `.gitignore` covering `.env`, credential files, and the language's build and dependency directories.

## Step 4 - Confirm (mandatory)

One `AskUserQuestion` call, grouped:

- **Inferred requirements** - present the `[inferred]` lines that would most constrain the build and ask which are real requirements vs. prototype accidents. Offer concrete alternatives, not open prompts.
- **Scope boundary** - what's in v1 vs. deferred, given everything the conversation surfaced.
- **Continuation mode** - does the real build start clean with the prototype as reference only (greenfield), or grow out of the prototype code (brownfield)? This sets which `spec-dev` path runs next.

## Step 5 - Write the files

### `README.md`

```markdown
# {Project Name}

{One paragraph: what this is and who it's for. No implementation.}

## Input from stakeholders

- {Ask, close to the user's own words} `[stated]`
- {Another} `[stated]`

## Requirements

### Functional

| ID | Requirement | Provenance |
| --- | --- | --- |
| R-01 | The system MUST ... | `[stated]` |
| R-02 | Given X, when Y, then Z | `[agreed]` |

### Non-functional

| ID | Requirement | Provenance |
| --- | --- | --- |
| NFR-01 | Handles {volume} at {latency} | `[stated]` |

### Out of Scope

- {Explicitly ruled out, and by whom}

## Decisions already made

| Decision | Rationale | Settled? |
| --- | --- | --- |
| {choice} | {why} | Firm / Revisit at spec time |

## Rejected approaches

- **{Approach}** - tried, abandoned because {reason}. Do not revisit without new information.

## Prototype baseline

A working prototype exists in `prototype/`. It proves:

- {specific claim it validated}

It is **not** production scaffolding. Known gaps: {hardcoded config, no auth, mocked data, no persistence, no error handling}.

Run it: `{command}`

## Open questions

- {What a real build must settle that the conversation never did}

## Domain glossary

- **{Term}** - {what it means here}

## Next step

Build this with `/spec-dev` in **{greenfield | brownfield}** mode. `spec.md` traces every R-xx and NFR-xx above.
```

Write the requirement lines in testable language - specific enough that each one passes or fails a test. "Fast" is not a requirement; "p95 under 200ms at 1k req/s" is. Where the conversation only produced "fast", make it an open question rather than inventing a number.

### `TODO.md`

```markdown
# {Project Name}

## TODO

### Now

- {The single most valuable next piece of work}

### Next

- {Ordered, each traceable to an R-xx or an open question}
```

Seed *Now* from the largest gap between what the prototype proves and what the requirements demand - usually the thing the prototype faked.

---

## Step 6 - Publish to GitHub

### 6a. Resolve the target repo

Ask the user, with `AskUserQuestion`, for the destination: an existing `owner/name`, or a new repo to create. Never guess a repo, and never push to one the user did not name. New repos default to **private** - offer public as an explicit choice, never as a default.

### 6b. Find a credential path

Work down this ladder and stop at the first rung that works. Say which rung you landed on.

**Rung 1 - the user's own machine (preferred).** If a device shell tool (`mcp__remote-devices__device_bash`) is available and a folder is connected, check for existing credentials:

```bash
gh auth status 2>&1; git config --get user.email
```

If `gh` reports an authenticated account, do all the git work there. This is the best path: it uses credentials that already exist, no token ever enters the conversation, and the commit carries the user's real identity. Work inside the connected folder so the user ends up with the repo on their own disk.

**Rung 2 - the cloud workspace with a supplied token.** If there is no linked machine, or `gh` is not authenticated there, install the CLI and use a token the user provides:

```bash
sudo apt-get install -y gh          # or fetch a current release from cli/cli
export GH_TOKEN="<token>"
gh auth status
```

Pass the token via environment variable only. Never write it into a file, a remote URL, or `.git/config`, and never echo it back.

**Rung 3 - request access.** If neither rung works, stop and ask for exactly what is needed. A vague ask gets an over-scoped token, so name the permissions:

> To push this I need a **fine-grained personal access token** scoped to just this one repository:
>
> - **Contents:** Read and write - commit the files
> - **Metadata:** Read - mandatory on every fine-grained token
> - **Pull requests:** Read and write - only if pushing to an existing repo, to open the PR
> - **Administration:** Read and write - only if I need to create the repo
>
> Set the shortest expiry that covers this session, and revoke it afterwards at
> github.com/settings/personal-access-tokens.
>
> Alternative with no token at all: connect the project folder in the Claude desktop app and
> run `gh auth login` on your machine - I'll use those credentials instead.

If the user declines, or the token lacks the scope, do not improvise another route. Report what is blocked, leave the files on disk, and print the commands for them to run by hand.

### 6c. Push

Show the exact file list and the commit message, and get confirmation before the first push. Then branch by repo state:

**New repo:**

```bash
gh repo create <owner>/<name> --private --source=. --remote=origin
git add README.md TODO.md prototype/ .gitignore
git commit -m "docs: capture requirements and prototype baseline"
git push -u origin main
```

**Existing repo, no commits:** add the remote and push to the default branch as above.

**Existing repo with commits:** never touch the default branch.

```bash
git checkout -b spec-readme/baseline
git add README.md TODO.md prototype/ .gitignore
git commit -m "docs: capture requirements and prototype baseline"
git push -u origin spec-readme/baseline
gh pr create --title "Requirements and prototype baseline" --body "..."
```

The PR body summarises what was harvested: requirement count, how many are still `[inferred]`, the open questions, and what the prototype does and does not prove. If a `README.md` already exists in that repo, do not overwrite it - write `README.spec.md` alongside it and say so in the PR.

**Never:** force-push, push to a repo the user did not name, rewrite history, or commit anything the secret scan flagged.

### 6d. Report

Give the repo or PR URL, say which credential rung was used, and - if a token was supplied - remind the user to revoke it now.

---

## Step 7 - Hand off

Report: how many requirements, how many still `[inferred]`, how many open questions, and which requirement you consider the riskiest. Tell the user to run `/spec-dev` next, in the mode settled at Step 4.

## What good output looks like

Someone who was never in the conversation can clone the repo, read `README.md`, and know what to build, what was already decided and why, what not to build, and what still needs answering - without reading a single line of prototype code.

If the README only makes sense to someone who saw the chat, it isn't done.
