# Architecture

`model.c4` is the single source of truth for structure. It is a [LikeC4](https://likec4.dev) model,
kept current as of every change that adds, removes or rewires a component.

Elements tagged `prototype` reflect what exists today in [`../prototype/`](../prototype/) — a static
site with no backend and no database. As the build adds a framework, a database and a notes/persistence
layer, this file grows alongside the code in the same change set (see the root `spec-dev` workflow).

## Running it

```bash
npx likec4 serve --listen 0.0.0.0         # live preview with hot reload, http://localhost:5173
npx likec4 build          # static interactive site for sharing
npx likec4 validate       # syntax + layout drift
npx likec4 export png     # stills for slides/READMEs
```

No local Node project is required — everything runs via `npx`.
