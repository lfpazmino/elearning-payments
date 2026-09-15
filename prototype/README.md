# Prototype

This directory is **evidence, not a foundation.** It is the code that came out of the conversation
that produced the requirements in [`../README.md`](../README.md), preserved exactly as it was
written — not refactored, renamed or tidied on the way in. Its job is to be an honest record of what
was proven to work.

It is deployed and in daily use at **https://lfpazmino.github.io/payments-academy/**.

## Running it

No dependencies, no build step, no package manager.

```bash
cd prototype
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works. Opening `index.html` directly via `file://` also mostly works, but
some browsers restrict `localStorage` on that scheme, so progress may not save.

## What it demonstrates

Each of these is a specific claim that was tested, not an aspiration:

- **Content renders from one data file with no build step.** 11 modules, 36 units and 86 resources
  live in `assets/js/course.js` (139 KB). `app.js` dispatches on a declared block type per piece of
  content. Adding a unit is a data edit.
- **Completion tracking works and survives.** Marking a unit complete advances to the next unit,
  updates the per-module counts and the whole-course gauge, and persists across a reload. Verified
  by walking all 36 units in a headless browser.
- **Deep links work on GitHub Pages.** Hash routing means `#/u/settlement/slas` is shareable and
  reload-safe with no server rewrites.
- **The resource library aggregates and filters.** All 86 resources in one view, grouped by module,
  filterable by four source families.
- **It reads at 390 px and in both themes.** No horizontal page scroll; wide tables scroll inside
  their own container.
- **Total payload is 176 KB uncompressed**, across four files.

## What is throwaway

Do not carry any of this forward without a decision:

- **No validation of the content data.** A mistyped block type renders nothing; a missing
  `objective` throws. There is no author-time signal and no deploy gate.
- **No tests.** Verification to date has been ad-hoc headless-browser runs, not a suite.
- **Module numbers are hardcoded in the data** (`n: "02"`) rather than derived from array order.
  They already drifted once when two modules were inserted mid-course.
- **Storage failures are silent.** The `try`/`catch` around `localStorage` is correct, but a reader
  in private browsing gets no indication their progress is not being saved.
- **No focus management on route change.** Arrow keys move between units; focus does not follow.
  There has been no accessibility audit.
- **Fonts come from a CDN** with only a CSS fallback stack. No offline story.
- **No search**, and no per-resource "already read" state.
- **Content freshness is manual.** The material contains specific regulatory dates that are known to
  be moving, with nothing in the system that tracks or surfaces that.

## Layout

```
index.html              application shell; the only HTML file
assets/css/style.css    all styles; theme tokens defined at the top
assets/js/course.js     all course content as data — the thing that actually matters
assets/js/app.js        hash routing, rendering, progress tracking
.nojekyll               stops GitHub Pages running the content through Jekyll
```

`course.js` assigns a single `window.COURSE` object. `app.js` reads it and owns everything else.
That separation is the one design decision in here worth keeping on purpose rather than by default.
