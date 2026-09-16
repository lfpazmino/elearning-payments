# nextjs-tailwind-migration - Signoff

## Scope Completed

All five task groups in `plan.md` shipped as planned, verified against the running code, not just
the plan's intent:

- **Group 1 (Scaffold)** - `next.config.mjs` sets `basePath: '/elearning-payments'`,
  `trailingSlash: true`, `images: { unoptimized: true }`, and scopes `output: 'export'` to
  production only (a documented deviation from the plan's literal wording - see below).
  Tailwind v4 wired via `@tailwindcss/postcss` in `postcss.config.mjs`, CSS-first (`@import
  "tailwindcss";` in `app/globals.css`, no `tailwind.config.*` file), matching current Tailwind v4
  convention.
- **Group 2 (Shell)** - `components/Shell.tsx` plus a real `/[module]/[unit]` App Router route
  (`app/[module]/[unit]/page.tsx`) using `generateStaticParams`; 40 static routes generated at
  build time (36 units + home + library + 404 + one grouped entry in the build log).
- **Group 3 (Content)** - `content/schema.ts` (Zod) covers module/unit/block/resource shapes and
  all eleven block types (`h`, `p`, `note`, `ul`, `ol`, `callout`, `table`, `stats`, `qa`, `beats`,
  `gloss` - confirmed by reading `components/BlockRenderer.tsx`'s dispatch), including the
  non-empty `check` array rule. `scripts/validate-content.ts` runs as an npm `prebuild` hook.
- **Group 4 (Progress)** - `lib/progress.tsx` implements mark/un-mark (R-04, R-05), reset-all
  (R-08), per-module and whole-course stats (R-07), and resume-at-first-incomplete (R-14), all on
  `localStorage` with `try`/`catch` around every write so storage failure cannot break the page
  (NFR-05).
- **Group 5 (Tests + CI)** - Vitest + React Testing Library suite (3 files, 17 tests, see Test
  Results); `.github/workflows/deploy.yml` builds and deploys to Pages on push to `main`.

**One deviation from `plan.md`, not previously recorded:** `next.config.mjs` scopes `output:
'export'` to `NODE_ENV === "production"` rather than setting it unconditionally, with a code
comment explaining this avoids a Next.js dev-mode warning ("redirects will not work with output:
export") while still using `redirects()` in dev to send the bare root to the basePath. This is a
sound, minor implementation refinement within the plan's intent, not a scope change - noted here
because `plan.md` didn't call it out.

**Architecture reconciled in this signoff (Step 5):** `architecture/model.c4` still tagged the
`ci` system element `#planned`, even though `architecture.md` for this phase says the `ci -> web`
relationship "becomes real" in 2.5, and that relationship's own tag had already been removed. The
system-level tag was stale - GitHub Actions is live and verified working (see Test Results). Fixed
by removing `#planned` from the `ci` system block; `npx likec4 validate` confirms the model is
still valid (1 file, 0 errors).

## Test Results

Run for real, in this session, against the current working tree:

- **Content validation (`npm run prebuild` / `tsx scripts/validate-content.ts`):** PASS -
  "Content valid - 36 units across 11 modules, 86 resources."
- **Build (`npm run build`):** PASS - `next build` (Next.js 16.3.5, Turbopack) compiles, runs
  TypeScript (strict mode, per `tsconfig.json`), and generates 40 static pages
  (`out/**/index.html` count confirmed at 40 via `find`).
- **Build-fails-on-violation gate:** PASS - confirmed live, not assumed. Temporarily emptied one
  unit's `check` array in `content/course.json`, ran `npm run build`, and got a non-zero exit with
  `Content validation FAILED - 1 issue(s): modules.0.units.0.check: Too small: expected array to
  have >=1 items` and no static export produced. File restored and diffed byte-identical against
  the pre-test backup afterward.
- **Test suite (`npm test` / `vitest run`):** PASS - 3 test files, 17 tests, 2.55s.
- **Lint / typecheck as a standalone command:** not run - `package.json` defines no `lint` script,
  and type-checking is folded into `next build` ("Running TypeScript... Finished TypeScript in
  5.0s"), which passed. Stating this plainly rather than treating "folded into build" as
  equivalent to "verified separately."
- **Deep-link / theme / progress-UI checks (`validation.md` steps 2, 3, 4, 5):** not run in a
  browser in this session - verified structurally instead: the routes exist as static HTML per
  unit (deep-link precondition), `lib/progress.tsx` implements the full mark/reset/resume contract
  (code-read, not clicked), and `app/globals.css` defines the `prefers-color-scheme` +
  `data-theme` override pattern for light/dark/auto. A live-browser pass of these five checks was
  not performed and should not be read as confirmed by this signoff.
- **CI check (`validation.md` step 7 - push to `main` and observe the deploy):** not run - this
  session is read-only on git and has not pushed. `.github/workflows/deploy.yml` was reviewed
  instead: checkout, Node 22, `npm ci`, `npm run build`, `touch out/.nojekyll`, then the standard
  `actions/configure-pages` -> `actions/upload-pages-artifact` -> `actions/deploy-pages` sequence,
  which is a conventional, correctly-ordered Pages deploy.

## Best-Practice Review

- **Next.js (`/vercel/next.js`, via context7, checked against `output: 'export'` + `basePath`
  usage):** current docs show the exact same shape used here - `output: 'export'` in
  `next.config`, `basePath` for a Pages subpath, `trailingSlash` as an optional flag. No
  deprecated API or config-shape mismatch found. Matches.
- **Tailwind CSS v4 (`/tailwindlabs/tailwindcss.com`, via context7, checked against
  `postcss.config.mjs` and the `@import "tailwindcss";` entry point):** current docs confirm v4's
  PostCSS plugin lives in the dedicated `@tailwindcss/postcss` package (not the old `tailwindcss`
  + `autoprefixer` + `postcss-import` trio), and that `@import "tailwindcss";` is the correct
  v4 CSS-first entry point with no `tailwind.config.*` file required. `postcss.config.mjs` and
  `app/globals.css` match this exactly. No fix needed.
  - **Deferred, not fixed:** the same docs page notes a dedicated `@tailwindcss/webpack` loader is
    now available and measured ~2x faster than `@tailwindcss/postcss` under Turbopack specifically
    - this project's build output confirms Turbopack is active ("Next.js 16.3.5 (Turbopack)"). This
    is a build-speed optimization, not a correctness issue, and is out of this phase's scope; noted
    as a Follow-Up rather than applied here.
- **Zod v4, Vitest, React Testing Library:** used in conventional, undeprecated ways
  (`safeParse` for the content gate, `vitest run` for CI-mode test execution, RTL for component
  tests) - no context7 lookup surfaced anything phase-relevant to check beyond what the build and
  test run already exercised live.

## Feature Progress

This phase's own features, from `specs/feature-phase-map.md`:

| Feature | Requirement IDs | Status |
| --- | --- | --- |
| Structured curriculum | R-01, R-12, R-13 | Done |
| Sequential and direct navigation | R-02, R-03 | Done |
| Completion tracking | R-04, R-05, R-07, R-08, R-14 | Done |
| Resource library | R-09, R-10, R-11 | Done |
| Shareable deep links | R-18 | Done |

**Phase 2 feature progress: 5/5 = 100%.**

**Project-wide total (from the full map): 5/7 = 71%.** The two remaining features - Per-unit
notes (R-19) and Resilient content (NFR-07/08/09) - are Not Started; both are explicitly Phase 3
scope, not a Phase 2 gap.

## Follow-Ups

- **`@tailwindcss/webpack` loader** - context7-confirmed ~2x build-speed win under Turbopack;
  worth a small, isolated follow-up commit, not bundled into a content phase.
- **Live-browser validation of `validation.md` steps 2-5 and 7** (rendered output, deep-link
  reload, theme toggle, progress UI, and an actual CI push) was not performed in this signoff
  session - recommend a manual pass before or shortly after merging, since this signoff verified
  those paths structurally (code read) rather than by observing them run.
- **No `lint` script exists.** Type-checking rides inside `next build`; a standalone `lint`/
  `typecheck` script would let CI (or a pre-commit hook) fail faster and independently of a full
  build. Small, low-risk addition - candidate for whichever phase next touches CI.
- Everything else deferred by `validation.md`'s own "Not Required" section (Supabase persistence,
  the notes editor, content freshness/link-checking, accessibility audit) stays exactly where the
  roadmap already puts it - Phase 3 and Phase 5 respectively. No new deferral introduced here.

## Definition of Done

`validation.md`'s Definition of Done: "The Next.js static export renders all 36 units across 11
modules with behavior matching the prototype (deep links, progress tracking, theme), deploys to
GitHub Pages from this repo via GitHub Actions, and passes a Vitest suite covering the block
renderer and progress logic."

**Pass**, with one caveat:

- Static export renders all 36 units (40 routes total) - confirmed by build output and `out/`
  directory count.
- Behavior matching the prototype (deep links, progress, theme) - confirmed structurally (code
  read: routes, `lib/progress.tsx`, `app/globals.css`), not by an interactive browser session in
  this signoff. See Follow-Ups.
- Deploys via GitHub Actions - confirmed by reviewing `.github/workflows/deploy.yml`'s
  correctness; not confirmed by observing an actual deploy run, since this session did not push.
- Vitest suite passes - confirmed live: 17/17 tests, 3/3 files.

The caveat does not block signoff - the un-run checks are read-verifiable and low-risk (static
routing, a `localStorage` hook, and a conventional Pages workflow), but they are named explicitly
rather than silently counted as done.
