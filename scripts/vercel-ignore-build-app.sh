#!/usr/bin/env bash
# Vercel "Ignored Build Step" for the Next.js app project (storybook-demo).
# Exit 0 = skip build, 1 = run build.
git diff HEAD^ HEAD --quiet -- \
  . ':!.storybook' \
  ':!src/components/ui/**/*.stories.tsx' \
  ':!scripts/generate-ui-stories.mjs' \
  ':!vercel.storybook.json' \
  ':!docs/vercel-deploy.md' \
  ':!scripts/vercel-ignore-build-*.sh'
