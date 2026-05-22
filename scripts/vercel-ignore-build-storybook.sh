#!/usr/bin/env bash
# Vercel "Ignored Build Step" for the Storybook project (storybook-demo-ui).
# Exit 0 = skip build, 1 = run build.
git diff HEAD^ HEAD --quiet -- \
  . ':!src/components/ui' \
  ':!storybook-static' \
  ':!.storybook' \
  ':!scripts/generate-ui-stories.mjs' \
  ':!vercel.storybook.json' \
  ':!docs/vercel-deploy.md' \
  ':!scripts/vercel-ignore-build-*.sh'
