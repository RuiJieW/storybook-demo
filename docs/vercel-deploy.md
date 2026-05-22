# Deploy app + Storybook on Vercel (two projects)

One Git repo, **two Vercel projects**. Each push can build both, or you can skip irrelevant builds with [Ignored Build Step](#optional-avoid-double-builds).

| Site | Vercel project | Production URL |
|------|----------------|----------------|
| Next.js app | `storybook-demo` | https://storybook-demo-pi.vercel.app/ |
| Storybook | `storybook-demo-ui` | https://storybook-demo-ui.vercel.app/ |

## Git deploys (push to main)

### App — `storybook-demo`

- **Framework:** Next.js
- **Build command:** `npm run build` (default)
- **Output:** Next.js default (do not set a static output directory)

### Storybook — `storybook-demo-ui`

- **Framework:** Other
- **Build command:** `npm run build-storybook`
- **Output directory:** `storybook-static`

Repo config for Storybook CLI deploys: `vercel.storybook.json`.

## Local build + deploy

| Goal | Command |
|------|---------|
| Build app only | `npm run build` |
| Build Storybook only | `npm run build-storybook` |
| Build + deploy app | `npm run release:app` |
| Build + deploy Storybook | `npm run release:storybook` |
| Deploy app (remote build) | `npm run deploy:app` |
| Deploy Storybook (remote build) | `npm run deploy:storybook` |

Deploy scripts target the projects above on team `ruijiews-projects`. Override scope if needed:

```bash
VERCEL_SCOPE=your-team npm run deploy:storybook
```

## Optional: avoid double builds

In each Vercel project: **Settings → Git → Ignored Build Step**.

**App** (`storybook-demo`):

```bash
bash scripts/vercel-ignore-build-app.sh
```

**Storybook** (`storybook-demo-ui`):

```bash
bash scripts/vercel-ignore-build-storybook.sh
```

Exit `0` = skip, `1` = build. Adjust paths if your workflow differs.

## Summary

| | App | Storybook |
|---|-----|-----------|
| Script | `npm run build` | `npm run build-storybook` |
| Output | `.next` (serverless) | `storybook-static/` |
| Vercel project | `storybook-demo` | `storybook-demo-ui` |
| URL | storybook-demo-pi.vercel.app | storybook-demo-ui.vercel.app |
