# Tech Stack

## Overview

The prototype proved the content model and the interaction design as static HTML/CSS/JS
with zero build step. The constitution keeps that deployment target (static files on
GitHub Pages, no server runtime — NFR-01) but replaces the hand-rolled DOM/hash-routing
layer with Next.js so that a rich-text notes editor, Supabase reads/writes, and future
content-authoring UI have somewhere real to live. Versions and static-export behavior were
verified against current docs via `context7` on 2026-09-15, not recalled from training data.

## Frontend

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | React 19 (via Next.js) | Matches NFR-02 as stated by the stakeholder. Component structure is what makes the notes editor and per-unit Supabase calls tractable — the prototype's single 541-line `app.js` doing routing, rendering and storage together was already at the edge of what hand-rolled DOM code should carry. |
| Meta-framework | Next.js, App Router, `output: 'export'` | Verified via context7 (`/vercel/next.js`): `output: 'export'` produces a fully static site with no server runtime, satisfying NFR-01. Each route exports as a real static HTML file, which means deep links (R-18) no longer need hash routing — a GitHub Pages technical constraint that static export removes outright. Requires `basePath` set to `/elearning-payments` (this repo's Pages subpath) and `images.unoptimized: true` since there is no image server. |
| Language | TypeScript, strict mode | Course content becomes typed data (module/unit/block/resource shapes) instead of validated-at-runtime-only JS objects — the schema validation TODO item and the framework migration reinforce each other. |
| Styling | Tailwind CSS v4 | Matches NFR-02 as stated. Utility classes replace the prototype's single 318-line `style.css`; theme tokens (light/dark, NFR-04) map to Tailwind's CSS-variable theming. |
| Components | Local components, no external UI kit | The design (topbar, rail, gauge, block renderer, notes editor) is specific enough that a generic kit would fight it more than help. Revisit only if a real component need (e.g. a rich-text base) argues for one. |
| Rich text (notes) | A lightweight contentEditable-based editor with a minimal command set (bold/italic/strike) plus a clipboard `paste` handler for images | R-19 asks for exactly three inline styles and image paste — not a full document editor. A dependency like Tiptap/Lexical is worth evaluating only if the minimal approach proves fragile; default to the smaller surface area. |
| Data fetching | Server Components read Supabase at build time (`next build`) for course content; Client Components call the Supabase JS client directly for progress and notes | Content is the same for every visit and should be baked into the static export, not fetched per-reader. Progress and notes are per-reader, mutable, and must happen at runtime in the browser. |

## Data

| Layer | Choice | Rationale |
| --- | --- | --- |
| Primary store | Supabase (Postgres) | Stakeholder decision: Supabase holds course content, completion state, and notes together, not split across a static file and a database. Free tier verified via context7 (`/supabase/supabase`): 500 MB database, 1 GB file storage, 5 GB egress/month, 2 active projects — comfortable for 36 units / 86 resources / one reader's notes. |
| File storage | Supabase Storage | Images pasted into the notes editor. Same free-tier allowance as above (1 GB, 50 MB max file size). |
| Access control | Supabase Row Level Security, single-reader policies | No accounts exist (mission: no auth), so access is scoped by a fixed anon key with RLS limiting writes to the expected tables rather than by user identity. |
| Backup / reseed path | Scheduled GitHub Actions job exports Supabase content, progress and notes to a committed `course-export.json` | Free-tier Supabase projects pause after 1 week of inactivity (verified via context7) and can be deleted after extended inactivity. This is a real risk for a self-paced, gappy-use site. The export is a **reseed artifact**, not a runtime fallback — the live app always reads Supabase; the JSON exists to repopulate a fresh or reactivated project. Decided over automatic runtime failover to avoid a second, harder-to-test data-access path in the app. |
| Validation | Zod schemas shared between the Supabase seed/export scripts and the Next.js data layer | Directly answers TODO.md's current "Now" item (NFR-06): a malformed unit must fail at author/seed time, not render nothing at runtime. |

## Infra / Deploy

| Layer | Choice | Rationale |
| --- | --- | --- |
| Hosting | GitHub Pages, public repo | Firm stakeholder decision (README): chosen over Claude artifact hosting; public because Pages on a private repo needs a paid plan. |
| CI/CD | GitHub Actions | Replaces the prototype's manual upload. One workflow builds (`next build`, static export) and deploys to Pages on push to `main`; a second, scheduled workflow runs the Supabase → JSON backup export. |
| Environments | Single environment (production) | One reader, one deployment target. No staging environment is justified at this scale. |

## Testing

| Layer | Choice | Rationale |
| --- | --- | --- |
| Content validation | Zod schema checks that fail `next build` on violation, ported from the Phase 1 schema (`schema.js`) and run against the typed content module | Matches NFR-06 exactly: "validated before deploy." Confirmed in Phase 2 (`specs/2026-09-16-nextjs-tailwind-migration/`) as an explicit build-time gate, not left to TypeScript type-checking alone — closes the gap Phase 1's spec deferred here. |
| Link checking | A CI job over the 86 resource URLs (R-10) | Currently manual; TODO.md records one link that already 404'd and was caught by hand. Does not scale further without automation. Deferred to Phase 5 (`specs/roadmap.md` 5.2). |
| Unit/integration tests | Vitest + React Testing Library, covering the block renderer and progress calculation | The prototype has none; the migration is the point at which adding them becomes worthwhile, since there's finally a framework with a real test story. Tool choice confirmed in Phase 2 (`specs/2026-09-16-nextjs-tailwind-migration/`). |

## What We Are NOT Using

- **A headless CMS or any non-developer authoring path** — confirmed out of scope in
  `README.md`. Content edits go through the Supabase seed script or direct table edits,
  both developer tasks.
- **Server-side rendering / a Node runtime in production** — `output: 'export'` rules this
  out by construction; the site stays static files on Pages.
- **Automatic runtime failover to the JSON backup** — considered and declined; see the
  Data table above.
- **Accounts or auth of any kind** — no multi-learner tracking, no login, per the mission.
- **A UI component kit** (MUI, Chakra, shadcn, etc.) — the surface area doesn't justify one
  yet.
- **A full rich-text editor library** for the notes feature, unless the minimal
  contentEditable approach proves insufficient.
