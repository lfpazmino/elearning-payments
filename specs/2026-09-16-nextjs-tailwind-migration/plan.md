# nextjs-tailwind-migration - Plan

## Tasks Group 1

1. Scaffold a Next.js App Router project at the repo root: TypeScript strict, `output: 'export'`,
   `basePath: '/elearning-payments'`, `images.unoptimized: true`.
2. Wire Tailwind CSS v4 and port the theme tokens (light/dark/auto, NFR-04) from
   `prototype/assets/css/style.css`.

## Tasks Group 2

1. Build the shell components: topbar, contents rail, progress gauge, theme toggle.
2. Generate real static routes `/module/unit/` via `generateStaticParams`, replacing hash routing
   (R-18).
3. Add prev/next unit navigation and a contents list available on every screen (R-02, R-03).

## Tasks Group 3

1. Port `course.js` content into typed data and define Zod schemas matching the Phase 1 schema
   (module/unit/block/resource, all eleven block types), including the non-empty `check` array
   rule from the Phase 1 closure pass.
2. Implement the block-type dispatch component for the eleven types.
3. Render each unit's objective, time estimate, framed resource list with checklist (R-09), and
   self-check prompts (R-13).
4. Add a content-validation script that runs the Zod schema against the ported content module and
   exits non-zero on violation; wire it into `next build` (e.g. a `prebuild` script) so a schema
   violation fails the build, not just local `tsc`.

## Tasks Group 4

1. Port completion state, per-module counts, whole-course gauge, and resume-at-first-incomplete
   (R-14) to a `localStorage`-backed hook.
2. Implement mark-complete-advances (R-04) and reset-all-progress (R-08).
3. Keep storage failures non-fatal (NFR-05).

## Tasks Group 5

1. Stand up Vitest + React Testing Library; cover the block renderer and progress calculation.
2. Add the GitHub Actions workflow: `next build` (static export) -> deploy to Pages on push to `main`.
3. Verify behavioral parity against the prototype (all 36 units, deep links, progress, theme).
