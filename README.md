# Payments eLearning

A self-paced eLearning site covering the payments industry, from how a payment moves to the
architecture and data platform underneath it. Built as personal enablement for a speaking slot at
Sibos 2026 — one reader, one browser, no accounts. A working prototype is deployed and in use; this
repository is where it becomes a specified build.

## Input from stakeholders

- "Create a lightweight eLearning website using all these generated information" `[stated]`
- "A way to navigate through the sections described, and to checkout the resources in a
  user-friendly way" `[stated]`
- "A feature to mark as completed each unit as long as I move forward" `[stated]`
- "Use my Github account to deploy the website" `[stated]`
- "add the most useful, complete and free resources" `[stated]`
- "Once you finish, update the site and deploy with the latest changes" `[stated]`
- The syllabus was extended mid-build with a specific list of payments topics — see
  [Appendix A](#appendix-a--required-syllabus) `[stated]`
- "We need to store the progress in a database, so it can persist" `[stated]`
- "We want to add a note taking editor on the side for each lesson. We want to add and store some notes for each unit, including a feature to paste a copied image coming from the windows copy buffer" `[stated]`

## Requirements

### Functional

| ID | Requirement | Provenance |
| --- | --- | --- |
| R-01 | Content MUST be organised as modules, each containing an ordered sequence of units | `[stated]` |
| R-02 | The reader MUST be able to jump to any unit from a contents list available on every screen | `[stated]` |
| R-03 | The reader MUST be able to move to the previous or next unit sequentially | `[stated]` |
| R-04 | The reader MUST be able to mark a unit complete; doing so advances to the next unit in one action | `[stated]` |
| R-05 | The reader MUST be able to un-mark a unit previously marked complete | `[inferred]` |
| R-06 | Completion MUST persist across visits even after clearing the browser's cache | `[agreed]` |
| R-07 | Completion MUST be visible per module (n of m) and as a whole-course figure | `[inferred]` |
| R-08 | The reader MUST be able to reset all progress | `[inferred]` |
| R-09 | Each unit MUST list its linked resources with a title, a source type and a one-line note on why it is worth reading. Place all these linked resources in a framed section with a checklist to mark as completed when a resource has been reviewed | `[stated]` |
| R-10 | Every linked resource MUST be free to access without a paid subscription | `[stated]` |
| R-11 | Resources MUST also be browsable in one aggregated view across all modules, filterable by source type | `[inferred]` |
| R-12 | Each unit MUST state a learning objective and an estimated time | `[inferred]` |
| R-13 | Each unit MUST end with self-check prompts the reader can test themselves against | `[inferred]` |
| R-14 | The home screen MUST offer resume-at-first-incomplete-unit | `[inferred]` |
| R-15 | Content MUST cover the syllabus in Appendix A | `[stated]` |
| R-16 | A unit's content MUST support headings, prose, lists, tables, callouts, statistic tiles, question-and-answer blocks, timelines and glossaries | `[inferred]` |
| R-17 | The site MUST be deployed to GitHub Pages from a public repository under the stakeholder's account | `[stated]` / `[agreed]` |
| R-18 | A link to a specific unit MUST be shareable and MUST survive a page reload | `[inferred]` |
| R-19 | Each unit should have sidebar with a note editor that will support adding free text to the unit as notes. I shouljd have the basic text processor capabilities such as mark a highlighted text as bold, italic or striked. Also include a capability to paste images in line with the text coming from the copy/paste buffer from the underlying operative system | `[stated]` |

### Non-functional

| ID | Requirement | Provenance |
| --- | --- | --- |
| NFR-01 | Static site only: no server-side runtime, deployable as files to GitHub Pages | `[inferred]` |
| NFR-02 | Use React NextJS Web technology for a responsive Website with a best of class, state-of-the-art best elearning look and feel, with a fancy oustanding, easy to navigate UI | `[stated]` |
| NFR-03 | Total page payload SHOULD stay lightweight; target ≤200 KB uncompressed (prototype baseline: 176 KB across four files) | `[inferred]` |
| NFR-04 | Light and dark presentation, following the operating system with a manual override | `[inferred]` |
| NFR-05 | Failure of browser storage (private mode, blocked site data) MUST NOT break the page | `[inferred]` |
| NFR-06 | Course content MUST be editable as a single data file by a developer, and MUST be validated before deploy | `[agreed]` |
| NFR-07 | A database should be included to persist the progress, units completed, and for the free text/images associated for each unit | `[inferred]` |
| NFR-08 | Initially the database used should be free accessible as a service (like Supabase). In future iterations, a more advanced data layer will be considered | `[inferred]` |
| NFR-09 | The elearning content is for now static hardcoded in the prototype. It should be migrated to a database | `[inferred]` |

> **Sixteen of these are still `[inferred]`** — nine functional (R-05, R-07, R-08, R-11, R-12,
> R-13, R-14, R-16, R-18) and seven non-functional (NFR-01, NFR-03, NFR-04, NFR-05, NFR-07, NFR-08,
> NFR-09), with NFR-02 part-stated. They describe how the prototype behaves, not something
> the stakeholder asked for. `spec-dev` Phase 1 must confirm or drop each one before it becomes
> binding. The four largest inferences — progress storage, audience, authoring model and
> continuation mode — were already put to the stakeholder and are recorded as `[agreed]` above and
> in Decisions below.

### Out of Scope

Confirmed with the stakeholder, not assumed:

- **Accounts, authentication and cross-device progress sync.** Progress is deliberately
  per-browser.
- **Multi-learner tracking or completion reporting.** Audience is one reader.
- **A headless CMS or any non-developer authoring path.** Content edits are a git task.
- **Hosting the site as a Claude artifact.** Offered and declined in favour of GitHub Pages.

## Decisions already made

| Decision | Rationale | Settled? |
| --- | --- | --- |
| Deploy to GitHub Pages from a public repo | Stakeholder chose GitHub over artifact hosting; public because Pages on a private repo requires a paid plan | Firm |
| Progress in database storage | Keeps the progress and unit notes stored in a database | **Revisit at spec time** — never explicitly decided |
| Course content stored in a database | Generated/researched eLearning content should be stored in a database | **Revisit at spec time** — never explicitly decided |
| Hash-based routing | GitHub Pages cannot rewrite paths for a single-page app | Firm — technical necessity |
| React NextJS, TailwindCSS as UI frmeworks | Web responsive | **Revisit at spec time** — never explicitly decided |
| Two-level hierarchy, module → unit | Mirrors the shape of the source study plan | Revisit |
| Archivo / Source Serif 4 / IBM Plex Mono via Google Fonts | Design choice, never discussed. Use tailwindCSS best practice for ealearning websites | Revisit |
| Resource source-types grouped into four families for filtering | 21 raw tags produced an unreadable two-row filter | Revisit |

## Rejected approaches

- **Hosting as a Claude artifact.** Offered explicitly as an alternative to GitHub. The stakeholder
  chose GitHub Pages. Do not revisit.
- **Creating the repository and pushing from a Cowork session.** Attempted. The session's GitHub
  token is proxy-scoped to already-attached repositories, refuses repository creation, and is
  rejected for git transport. Deployment is either a manual upload or a Claude Code session bound to
  the repo. Do not retry from Cowork without new information.
- **One filter chip per resource source-type.** Produced 21 chips across two rows in the resource
  library. Replaced by four families, with each resource still showing its own precise type.

## Prototype baseline

A working prototype is in [`prototype/`](prototype/) and is deployed at
**[https://lfpazmino.github.io/payments-academy/]** (repo: `lfpazmino/payments-academy`).

It proves:

- 36 units across 11 modules render from a single data file with no build step
- Completion tracking, resume, per-module counts and a whole-course gauge work and survive reload
- 86 resources aggregate into one filterable library view
- The whole thing deploys to GitHub Pages as static files and serves correctly
- It reads at 390 px and in both light and dark

It is **not** production scaffolding. Known gaps:

- No schema validation on the content file — a malformed unit fails silently or throws at runtime
- No tests of any kind
- No accessibility audit; focus is not managed on route change
- Storage failures are caught but never surfaced to the reader
- No mechanism for keeping dated regulatory content from going stale, which this content is full of
- Fonts load from a CDN with no offline story
- No search
- Module numbers are hand-maintained in the data and can drift from actual order

Run it: `cd prototype && python3 -m http.server 8000`, then open `http://localhost:8000`.

## Open questions

- Should the elearning content be stored in the database?
- What testable number defines "lightweight"? NFR-03 proposes ≤200 KB uncompressed; unconfirmed.
- What accessibility target applies? Keyboard navigation between units exists; focus management on
  route change does not.
- Does the content need search? It is at 36 units and growing.
- How is dated regulatory content prevented from going stale — a per-unit review date, a flag, a
  scheduled check? The content contains specific compliance dates that move.
- Are the per-unit time estimates meant to be accurate, or should they be dropped?
- Should the self-check prompts be interactive, or is prose sufficient?
- Should the reader be able to see which resources they have already opened?

## Domain glossary

- **Module** — a top-level grouping of units, numbered and titled, with a one-line subtitle.
- **Unit** — the atomic learning item and the thing completion is tracked against. Carries a title,
  objective, time estimate, content blocks, resources and self-check prompts.
- **Block** — one piece of unit content of a declared type (prose, table, callout, statistic tiles,
  and so on). The renderer dispatches on the type.
- **Resource** — an external free link attached to a unit, with a source type and a note.
- **Family** — a grouping of resource source-types, used only to keep the library filter readable.
- **Completion** — the per-unit boolean the reader sets, stored per browser.
- **Resume** — the first unit, in course order, that is not yet complete.

Payments terminology is content, not product vocabulary; the course carries its own glossary in
module 10.

## Next step

Build this with `/spec-dev` in **brownfield** mode — the prototype is deployed and in use, so the
real build evolves it rather than restarting. `spec.md` traces every R-xx and NFR-xx above.

---

## Appendix A — required syllabus

The stakeholder specified this content scope across two turns. It is a requirement (R-15), not an
implementation detail.

| Module | Coverage |
| --- | --- |
| 00 Orientation | Framing, and the figures that must be recalled without notes |
| 01 Anatomy of a payment | Lifecycle; the concept of rails; real-time vs instant vs account-to-account; clearing vs settlement; ISO 20022 messages and identifiers; inbound and outbound flows |
| 02 Settlement and scheme mechanics | Net settlement vs instant schemes; direct debits vs request to pay; SEPA Inst and FedNow implementations including SLAs |
| 03 The rails | Europe; the United States; payment gateways and where RTGS, ACH, RT1, STEP2 and TIPS sit; cross-border |
| 04 Business models | Revenue lines; institution types per business model — banks, PSPs, third-party providers, acquirers, schemes, payfacs; EU vs US divergence |
| 05 Regulation | Compliance timeline; instant payments regulation and Verification of Payee; PSD3, PSR, FIDA, DORA; stablecoins and digital currency |
| 06 Payment hub architecture | Hub anatomy; architectural patterns following Icon's IPF design — event-driven, event sourcing, CQRS; canonical model vs ISO 20022 and XML vs JSON; Icon IPF, Temenos and Oracle compared |
| 07 Distributed architecture | Horizontal sharding principles; integrity and consistency; idempotency |
| 08 Infrastructure and data layer | Non-functional requirements; the data-platform argument; benchmark analysis |
| 09 AI and agentic AI | AI in and around the payment flow; agentic payment protocols; agentic AI on the cross-border exception path |
| 10 Stage readiness | Anticipated challenges; delivery; terms of art |

Named sources the stakeholder required be used: Icon Solutions IPF design, MongoDB's cross-border
agentic payments material, and Stripe's free payments resources for per-section reading.

## Appendix B - running prototype

```bash
python -m http.server 8000
# then open http://localhost:8000
```