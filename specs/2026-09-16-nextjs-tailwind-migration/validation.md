# nextjs-tailwind-migration - Validation

## Definition of Done

The Next.js static export renders all 36 units across 11 modules with behavior matching the
prototype (deep links, progress tracking, theme), deploys to GitHub Pages from this repo via GitHub
Actions, and passes a Vitest suite covering the block renderer and progress logic.

## Steps for Testing the Phase

1. `npm run build` — expect a successful static export under `out/` with one HTML file per unit
   route (`out/<module>/<unit>/index.html`). The build must run the Zod content-validation step
   first and fail (non-zero exit, no static export produced) if a unit is edited to violate the
   schema (e.g. an empty `check` array) — confirm this by temporarily breaking one unit, observing
   the build fail with a clear error, then reverting.
2. Serve the export (e.g. `npx serve out`) and open it — expect all 36 units to render with no
   console errors, and each unit's blocks, resources and self-checks visible.
3. Deep-link check: load a specific unit URL directly (e.g. `/elearning-payments/<module>/<unit>/`)
   — expect the page to load on a full reload (R-18).
4. Progress check: mark a unit complete — expect it advances to the next unit, per-module counts and
   the whole-course gauge update, and state survives a reload.
5. Theme check: toggle light/dark/auto — expect it follows the OS default and the manual override
   persists.
6. `npm test` — expect the Vitest suite passes (block renderer and progress logic).
7. CI check: push to `main` — expect the GitHub Actions workflow builds and deploys to
   `lfpazmino.github.io/elearning-payments/`.

## Not Required

- Supabase persistence (progress/notes) — Phase 3.
- The notes editor (R-19) — Phase 3.
- Content freshness or link-checking automation — Phase 5.
- Accessibility audit / focus management — Phase 5.
