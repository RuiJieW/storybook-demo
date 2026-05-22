# Deploy app + Storybook on Vercel (two subdomains)

Yes — this works with **two Vercel projects** pointing at the **same Git repository**, each with different build settings and its own domain.

Example:

| Site | Vercel project | Domain (example) |
|------|----------------|------------------|
| Next.js app | `storybook-demo` | `demo.vercel.app` or `demo.yourdomain.com` |
| Storybook | `storybook-demo-ui` | `storybook.demo.vercel.app` or `storybook.demo.yourdomain.com` |

Vercel does **not** deploy both from a single project with one `npm run build`. Use two projects.

## 1. App project (Next.js)

1. Import the repo in [Vercel](https://vercel.com/new).
2. Leave **Framework Preset** as **Next.js** (auto-detected).
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** (leave empty — Next handles this)
5. Deploy.

Assign your app domain under **Project → Settings → Domains**, e.g. `demo.yourdomain.com`.

## 2. Storybook project (static)

1. Import the **same repository** again as a **new** Vercel project (different name, e.g. `storybook-demo-ui`).
2. **Framework Preset:** Other
3. **Build Command:** `npm run build-storybook`
4. **Output Directory:** `storybook-static`
5. **Install Command:** `npm install` (default)

Optional: this repo includes `vercel.storybook.json` at the root. For CLI deploys:

```bash
vercel link   # link the Storybook project
vercel deploy --prod --local-config vercel.storybook.json
```

For Git deploys, set the same build/output values in the dashboard (they override or match that file).

Assign a subdomain under **Domains**, e.g. `storybook.demo.yourdomain.com`.

### DNS (custom domain)

If the app lives at `demo.yourdomain.com`:

| Type | Name | Value |
|------|------|--------|
| CNAME | `demo` | Vercel DNS target from the app project |
| CNAME | `storybook.demo` | Vercel DNS target from the Storybook project |

Add both domains in the correct Vercel project; Vercel will issue SSL for each.

> **Note:** `something.vercel.app` subdomains are usually the default `*.vercel.app` URLs per project (e.g. `storybook-demo-ui.vercel.app`). A hostname like `storybook.demo.vercel.app` typically requires a **custom domain** you control, not a nested `*.vercel.app` name.

## 3. Avoid double builds (optional)

On the **Storybook** project, **Settings → Git → Ignored Build Step**, you can skip builds when only app code changed:

```bash
git diff HEAD^ HEAD --quiet -- . ':!src/components/ui' ':!storybook-static' ':!.storybook' ':!scripts/generate-ui-stories.mjs' ':!vercel.storybook.json'
```

Exit `0` = skip build, `1` = run build. Tune paths to match how you work.

On the **app** project, you can skip when only Storybook files changed:

```bash
git diff HEAD^ HEAD --quiet -- . ':!.storybook' ':!src/components/ui/**/*.stories.tsx' ':!scripts/generate-ui-stories.mjs' ':!vercel.storybook.json' ':!docs/vercel-deploy.md'
```

## 4. Local check before deploy

```bash
npm run build              # Next.js app
npm run build-storybook    # → storybook-static/
npx serve storybook-static # preview static Storybook
```

## Summary

| | App | Storybook |
|---|-----|-----------|
| Script | `npm run build` | `npm run build-storybook` |
| Output | Next default (`.next` → serverless) | `storybook-static/` |
| Runtime | Node (SSR/API) | Static files only |
