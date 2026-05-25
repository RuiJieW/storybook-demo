---
version: alpha
name: Toboggan-design-system
description: Toboggan Labs design system — aubergine-forward product UI on shadcn semantic tokens. Anchors on white canvas, deep aubergine primary, violet accent, and four brand chart accents (magenta, violet, yellow, cyan). Synced from Figma (`docs/Toboggan Labs Design System-variables-full.json`) and implemented in `src/styles/globals.css`.

figma-source: docs/Toboggan Labs Design System-variables-full.json

colors:
  background: "#ffffff"
  foreground: "#0f0715"
  primary: "#4d2368"
  primary-foreground: "#f3f0f5"
  secondary: "#e6e1ea"
  secondary-foreground: "#2e153e"
  muted: "#f5f5f5"
  muted-foreground: "#737373"
  accent: "#f5f5f5"
  accent-foreground: "#9c03c2"
  destructive: "#dc2626"
  border: "#e5e5e5"
  input: "#e5e5e5"
  card: "#ffffff"
  card-foreground: "#0a0a0a"
  popover: "#000000"
  popover-foreground: "#ffffff"
  ring: "#b5a4c1"
  chart-1: "#4d2368"
  chart-2: "#ff197c"
  chart-3: "#9c03c2"
  chart-4: "#ffb005"
  chart-5: "#06fff0"
  brand-primary: "#4d2368"
  brand-violet: "#9c03c2"
  brand-magenta: "#ff197c"
  brand-yellow: "#ffb005"
  brand-cyan: "#06fff0"

primitives:
  aubergine-50: "#f3f0f5"
  aubergine-100: "#e6e1ea"
  aubergine-200: "#cec2d6"
  aubergine-300: "#b5a4c1"
  aubergine-400: "#9d86ac"
  aubergine-500: "#714f86"
  aubergine-600: "#4d2368"
  aubergine-700: "#3e1c53"
  aubergine-800: "#2e153e"
  aubergine-900: "#170b1f"
  aubergine-950: "#0f0715"
  white: "#ffffff"
  black: "#000000"

themes:
  brand-light:
    class: null
    description: Figma Theme / light — default product palette
    figma-mode: light
  brand-dark:
    class: dark
    description: Figma Theme / dark — inverted surfaces, aubergine primary flips to light
    figma-mode: dark
    colors:
      background: "#000000"
      foreground: "#f3f0f5"
      primary: "#e6e1ea"
      primary-foreground: "#0f0715"
      secondary: "#2e153e"
      secondary-foreground: "#e6e1ea"
      muted: "#171717"
      muted-foreground: "#a3a3a3"
      accent: "#171717"
      accent-foreground: "#9c03c2"
      destructive: "#9e4042"
      border: "#404040"
      input: "#ffffff26"
      card: "#171717"
      card-foreground: "#ffffff"
      popover: "#ffffff"
      popover-foreground: "#000000"
      ring: "#b5a4c1"
      chart-1: "#e6e1ea"
      chart-2: "#ff197c"
      chart-3: "#9c03c2"
      chart-4: "#ffb005"
      chart-5: "#06fff0"
      brand-primary: "#e6e1ea"
  wireframe:
    class: wireframe
    description: shadcn neutral grayscale — layout and structure without brand color
    colors:
      background: "#ffffff"
      foreground: "#0a0a0a"
      primary: "#171717"
      primary-foreground: "#fafafa"
      secondary: "#f5f5f5"
      secondary-foreground: "#171717"
      muted: "#f5f5f5"
      muted-foreground: "#737373"
      accent: "#f5f5f5"
      accent-foreground: "#171717"
      destructive: "#dc2626"
      border: "#e5e5e5"
      input: "#e5e5e5"
      card: "#ffffff"
      card-foreground: "#0a0a0a"
      chart-1: "#404040"
      chart-2: "#525252"
      chart-3: "#737373"
      chart-4: "#a3a3a3"
      chart-5: "#d4d4d4"
      brand-primary: "#404040"
      brand-violet: "#525252"
      brand-magenta: "#404040"
      brand-yellow: "#737373"
      brand-cyan: "#a3a3a3"
    component-mapping:
      feature-card-violet: feature-card-tone-1
      feature-card-magenta: feature-card-tone-2
      feature-card-yellow: feature-card-tone-3
      feature-card-cyan: feature-card-tone-4

css-variables:
  semantic-to-shadcn:
    general/background: "--background"
    general/foreground: "--foreground"
    general/primary: "--primary"
    general/primary foreground: "--primary-foreground"
    general/secondary: "--secondary"
    general/secondary foreground: "--secondary-foreground"
    general/muted: "--muted"
    general/muted foreground: "--muted-foreground"
    general/accent: "--accent"
    general/accent foreground: "--accent-foreground"
    general/destructive: "--destructive"
    general/border: "--border"
    general/input: "--input"
    card/card: "--card"
    card/card foreground: "--card-foreground"
    popover/popover: "--popover"
    popover/popover foreground: "--popover-foreground"
    chart/legacy/chart 1: "--chart-1"
    chart/legacy/chart 2: "--chart-2"
    chart/legacy/chart 3: "--chart-3"
    chart/legacy/chart 4: "--chart-4"
    chart/legacy/chart 5: "--chart-5"
    focus/ring: "--ring"
    sidebar/sidebar: "--sidebar"
    sidebar/sidebar foreground: "--sidebar-foreground"
    sidebar/sidebar primary: "--sidebar-primary"
    sidebar/sidebar primary foreground: "--sidebar-primary-foreground"
    sidebar/sidebar accent: "--sidebar-accent"
    sidebar/sidebar accent foreground: "--sidebar-accent-foreground"
    sidebar/sidebar border: "--sidebar-border"
    sidebar/sidebar ring: "--sidebar-ring"

typography:
  display-xl:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -1.5px
  display-lg:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -1px
  display-md:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.5px
  display-sm:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.25px
  title-lg:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "SUSE, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  button:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Atkinson Hyperlegible, ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 10px
  2xl: 12px
  pill: 9999px
  full: 9999px
  base-token: 8px

spacing:
  "0": 0px
  "0.5": 2px
  "1": 4px
  "1.5": 6px
  "2": 8px
  "2.5": 10px
  "3": 12px
  "4": 16px
  "5": 20px
  "6": 24px
  "8": 32px
  "10": 40px
  "12": 48px
  "16": 64px
  "20": 80px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: 8px 16px
    height: 36px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
  feature-card-violet:
    backgroundColor: "{colors.chart-3}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.2xl}"
    padding: 24px
  feature-card-magenta:
    backgroundColor: "{colors.chart-2}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.2xl}"
    padding: 24px
  feature-card-yellow:
    backgroundColor: "{colors.chart-4}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
    padding: 24px
  feature-card-cyan:
    backgroundColor: "{colors.chart-5}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
    padding: 24px
  sidebar-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.nav-link}"
---

## Themes

Three appearance modes ship with this spec. Top-level `{colors.*}` tokens are **brand-light** (Figma `Theme` / `light`). Override via CSS class on `<html>`:

| Theme | HTML class | Figma mode | Purpose |
|---|---|---|---|
| **brand-light** | _(none)_ | `light` | Default — white canvas, aubergine primary |
| **brand-dark** | `dark` | `dark` | Inverted surfaces; primary becomes `aubergine/100` |
| **wireframe** | `wireframe` | — | shadcn **neutral** grayscale for structure-only work |

Implementation lives in `src/styles/globals.css` (`:root`, `.dark`, `.wireframe`). The theme switcher maps `brand-light` → `light`, `brand-dark` → `dark`, `wireframe` → `wireframe` via `next-themes`.

### Figma → CSS mapping

Semantic Figma variables (collection **Theme**) map to shadcn CSS custom properties:

| Figma token | CSS variable | brand-light |
|---|---|---|
| `general/background` | `--background` | `#ffffff` |
| `general/foreground` | `--foreground` | `#0f0715` |
| `general/primary` | `--primary` | `#4d2368` (`aubergine/600`) |
| `general/primary foreground` | `--primary-foreground` | `#f3f0f5` (`aubergine/50`) |
| `general/secondary` | `--secondary` | `#e6e1ea` (`aubergine/100`) |
| `general/secondary foreground` | `--secondary-foreground` | `#2e153e` (`aubergine/800`) |
| `general/muted` | `--muted` | `#f5f5f5` |
| `general/muted foreground` | `--muted-foreground` | `#737373` |
| `general/accent` | `--accent` | `#f5f5f5` |
| `general/accent foreground` | `--accent-foreground` | `#9c03c2` (`brand/violet`) |
| `general/destructive` | `--destructive` | `#dc2626` |
| `general/border` | `--border` | `#e5e5e5` |
| `card/card` | `--card` | `#ffffff` |
| `card/card foreground` | `--card-foreground` | `#0a0a0a` |
| `popover/popover` | `--popover` | `#000000` |
| `popover/popover foreground` | `--popover-foreground` | `#ffffff` |
| `chart/legacy/chart 1`–`5` | `--chart-1`–`--chart-5` | see `{colors.chart-*}` |
| `focus/ring` | `--ring` | `#b5a4c1` (`aubergine/300`) |

Tailwind aliases (`bg-background`, `text-primary`, `bg-chart-2`, etc.) are wired in the `@theme inline` block in `globals.css`.

### Wireframe mode

Use `{themes.wireframe}` when exploring layout without brand color:

- Canvas is pure white; primaries use neutral `#171717`.
- Chart and brand accent slots map to neutral steps so `bg-chart-*` keys stay stable but render gray.
- Semantic destructive stays colored for state clarity.
- Do not combine `wireframe` with `dark` unless you define a separate dark-wireframe palette.

## Overview

Toboggan Labs pairs a **white, editorial canvas** with an **aubergine brand spine** and **controlled neon accents**. Color and layout rules for [tobogganlabs.com](https://tobogganlabs.com/en) and in-app UI are documented in **Visual language** and **Color & accent usage** below; token values live in the YAML frontmatter and **Color primitives**.

## Visual language

Reference: [tobogganlabs.com/en](https://tobogganlabs.com/en) — healthcare technology partner positioning (interoperability, clinical operations, compliance, AI).

### Atmosphere

| Layer | Treatment |
|---|---|
| **Canvas** | White (`{colors.background}`). Airy, clinical-trustworthy — not warm cream or cool corporate gray-only. |
| **Ink** | Near-black violet (`{colors.foreground}` / `aubergine/950`). Headlines and body stay high-contrast on white. |
| **Structure** | Aubergine-tinted neutrals (`secondary`, `muted`, `border`) for bands and cards — lavender-gray, not flat gray. |
| **Energy** | Magenta, violet, yellow, cyan accents used **sparingly** for proof, data, and hero moments — never as the default page wash. |

### Color hierarchy on the page

1. **Floor** — white background, aubergine ink.
2. **Structure** — `secondary` / `muted` bands, hairline `border`, optional `card` elevation.
3. **Action** — `primary` (aubergine) CTAs; `accent-foreground` (violet) for inline emphasis links and highlights.
4. **Proof & differentiation** — `{colors.brand-magenta}` through `{colors.brand-cyan}` on carousel slides, case-study cards, charts, and feature tiles.
5. **Focus** — `ring` (`aubergine/300`) on interactive controls.

### Marketing vs product surfaces

| Surface | Color behavior |
|---|---|
| **Marketing** ([tobogganlabs.com](https://tobogganlabs.com/en)) | Long-scroll bands; hero carousel; logo marquee on white/muted; capability cards may use full `{colors.brand-*}` fills; stat labels on muted backgrounds. |
| **Product / dashboard** (this repo) | Restrained palette: `background`, `primary`, `secondary`, `muted`, sidebar tokens; brand accents for data viz and lab demos only — not full-bleed marketing blocks on every screen. |

### Imagery & media

- **Case-study-led** — product UI, clinical workflows, and real outcomes (FHIR, crisis support, edtech, etc.) — not abstract mascot illustration.
- **Photography and screenshots** sit on white or `secondary` panels; accents frame content, they do not replace it.
- **Logo marquee** stays neutral (muted foreground on white) so client marks read clearly.

### Motion (color-related)

- Hero **carousel** rotates accent-forward slides — each slide may lean on a different `{colors.brand-*}` accent.
- **Logo strip** motion is neutral; do not animate accent colors in the marquee.
- Avoid pulsing or flashing accent fills; motion carries the slide change, not the palette.

## Color & accent usage

### Role model

| Role | Token(s) | When to use |
|---|---|---|
| **Brand spine** | `{colors.brand-primary}`, `primary`, `primary-foreground`, `aubergine/600`–`950` | Primary buttons, key links, brand bars, first data series, “Toboggan” identity |
| **Tinted UI** | `secondary`, `muted`, `card`, `border` | Section bands, sidebars, testimonial backgrounds, capability rows |
| **Readable emphasis** | `accent-foreground` (`{colors.brand-violet}`) | Eyebrows, inline highlights, “Explore” links — one accent per block |
| **Energy accents** | `{colors.brand-magenta}`, `{colors.brand-violet}`, `{colors.brand-yellow}`, `{colors.brand-cyan}` | Carousel slides, feature cards, multi-series charts — **one dominant accent per composed block** |
| **State** | `destructive`, `ring` | Errors; focus only |
| **Inverted overlay** | `popover` + `popover-foreground` | Menus/tooltips in light mode (black surface) — do not reuse for marketing heroes |

### Brand accents

| Token | Hex | Figma | Typical use |
|---|---|---|---|
| `{colors.brand-primary}` | `#4d2368` (light) | `aubergine/600` | Brand bar, primary CTA, first data series, “anchor” slide |
| `{colors.brand-magenta}` | `#ff197c` | `brand/magenta` | High-energy hero slide, outbound / engagement stories |
| `{colors.brand-violet}` | `#9c03c2` | `brand/violet` | AI / platform highlights; matches `accent-foreground` |
| `{colors.brand-yellow}` | `#ffb005` | `brand/yellow` | Warnings-in-charts, warmth, edtech / outcomes tiles — use dark `foreground` text |
| `{colors.brand-cyan}` | `#06fff0` | `brand/cyan` | Tech / interoperability motifs — use dark `foreground` text |

In **dark** mode, `{colors.brand-primary}` resolves to `{colors.primary}` (`#e6e1ea`, `aubergine/100`) on black canvas; `{colors.brand-magenta}`, `{colors.brand-violet}`, `{colors.brand-yellow}`, and `{colors.brand-cyan}` stay constant for recognition.

### Accent pairing rules

- **Do** cycle accents across sequential marketing blocks (carousel slide → capability card → chart series) so no two adjacent full-bleed blocks share the same brand accent token.
- **Do** pair `{colors.brand-magenta}` and `{colors.brand-violet}` fills with `primary-foreground` text; pair `{colors.brand-yellow}` and `{colors.brand-cyan}` with `foreground` text for contrast.
- **Do** keep body copy and nav in `foreground` / `muted-foreground` — never magenta or cyan body text on white.
- **Don't** use more than one neon accent in a single card or CTA cluster.
- **Don't** use `{colors.brand-magenta}` / `{colors.brand-violet}` / `{colors.brand-yellow}` / `{colors.brand-cyan}` fills for app chrome (sidebar, inputs, tables) — use semantic `background`, `muted`, `sidebar*`.
- **Don't** substitute legacy Clay pinks/teals/ochres; the Toboggan palette is `{colors.brand-primary}` + four neon brand accents only.

### Semantic colors (shadcn)

Prefer semantic Tailwind classes over raw aubergine primitives:

- `bg-background` / `text-foreground` — page floor and default text
- `bg-primary` / `text-primary-foreground` — primary CTAs and brand actions
- `bg-secondary` / `text-secondary-foreground` — tinted panels (e.g. “Ready to build?” bands)
- `bg-muted` / `text-muted-foreground` — subdued UI, stat labels, logo strip context
- `bg-accent` / `text-accent-foreground` — subtle highlight surfaces; violet emphasis text
- `bg-destructive` — errors only
- `bg-card` / `text-card-foreground` — elevated cards on white
- `border-border` / `ring-ring` — borders and focus

### Chart tokens in UI

In code, `{colors.brand-primary}` and `{colors.brand-magenta}` / `{colors.brand-violet}` / `{colors.brand-yellow}` / `{colors.brand-cyan}` are wired to shadcn `--chart-1` through `--chart-5` for Recharts and Tailwind (`bg-chart-*`). Prefer **brand token names** in specs and copy; use `bg-chart-*` only in implementation. Figma also defines `chart/area/*` and `chart/static/*` for richer dashboards.

### Wireframe accent behavior

In `{themes.wireframe}`, `{colors.brand-primary}` and all neon brand accent tokens map to neutral steps so layout stories keep stable semantics without brand hue. Semantic `destructive` stays red for state clarity.

## Color primitives

### Aubergine scale

| Token | Hex | Use |
|---|---|---|
| `{primitives.aubergine-50}` | `#f3f0f5` | Primary foreground, dark-mode foreground tint |
| `{primitives.aubergine-100}` | `#e6e1ea` | Secondary surfaces, dark primary |
| `{primitives.aubergine-200}` | `#cec2d6` | Borders on tinted panels |
| `{primitives.aubergine-300}` | `#b5a4c1` | Focus ring |
| `{primitives.aubergine-400}` | `#9d86ac` | Illustration accents |
| `{primitives.aubergine-500}` | `#714f86` | Mid brand |
| `{primitives.aubergine-600}` | `#4d2368` | **Primary** (light mode) |
| `{primitives.aubergine-700}` | `#3e1c53` | Hover / pressed primary |
| `{primitives.aubergine-800}` | `#2e153e` | Secondary foreground (light) |
| `{primitives.aubergine-900}` | `#170b1f` | Deep surfaces |
| `{primitives.aubergine-950}` | `#0f0715` | **Foreground** (light mode) |

Figma collection: **Color Primitives**. Full export: `docs/Toboggan Labs Design System-variables-full.json`.

See **Color & accent usage** for when to apply brand accent and chart tokens.

## Typography

### Font family

**Atkinson Hyperlegible** for body and UI (`font-sans` / `--font-atkinson`). **SUSE** for headings (`font-heading` / `--font-suse`; also applied to `h1`–`h6` in `globals.css`). **Geist Mono** for code (`--font-mono`). Loaded via `next/font/google` in `src/lib/fonts.ts`.

### Hierarchy

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `{typography.display-xl}` | 48px | 600 | 1.1 | Page heroes |
| `{typography.display-lg}` | 36px | 600 | 1.15 | Section heads |
| `{typography.display-md}` | 30px | 600 | 1.2 | Panel titles |
| `{typography.display-sm}` | 24px | 600 | 1.25 | Card headlines |
| `{typography.title-lg}` | 20px | 600 | 1.3 | Subsection titles |
| `{typography.title-md}` | 16px | 600 | 1.4 | Component titles |
| `{typography.title-sm}` | 14px | 600 | 1.4 | Compact labels |
| `{typography.body-md}` | 16px | 400 | 1.5 | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.5 | Secondary body |
| `{typography.caption}` | 12px | 500 | 1.4 | Meta, badges |
| `{typography.button}` | 14px | 500 | 1.0 | Buttons |
| `{typography.nav-link}` | 14px | 500 | 1.4 | Sidebar / nav |

## Layout

### Spacing

Figma **Spacing Primitives** (4px base):

| Token | px |
|---|---|
| `{spacing.0}` | 0 |
| `{spacing.0.5}` | 2 |
| `{spacing.1}` | 4 |
| `{spacing.2}` | 8 |
| `{spacing.3}` | 12 |
| `{spacing.4}` | 16 |
| `{spacing.5}` | 20 |
| `{spacing.6}` | 24 |
| `{spacing.8}` | 32 |
| `{spacing.10}` | 40 |
| `{spacing.12}` | 48 |
| `{spacing.16}` | 64 |
| `{spacing.20}` | 80 |
| `{spacing.section}` | 96 |

**Spacing Tokens** in Figma alias these primitives to `Padding/p-*`, `Margin/m-*`, and `Gap/gap-*`. Prefer Tailwind spacing that matches (`p-4` = 16px, `gap-6` = 24px).

### Radius

Figma **Radius Primitives**:

| Token | px | Tailwind / CSS |
|---|---|---|
| `{rounded.sm}` | 4 | `rounded-sm` |
| `{rounded.md}` | 6 | — |
| `{rounded.lg}` | 8 | `--radius` base |
| `{rounded.xl}` | 10 | `rounded-lg` (1.33×) |
| `{rounded.2xl}` | 12 | feature cards |
| `{rounded.pill}` | 9999 | `rounded-full` |

Derived in CSS: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` from `--radius` in `@theme inline`.

## Components

### Buttons

**`button-primary`** — `bg-primary text-primary-foreground`, `{rounded.lg}`, height 36px.

**`button-secondary`** — `bg-secondary text-secondary-foreground`.

**`button-destructive`** — `bg-destructive`.

Use shadcn `<Button>` variants; do not hardcode aubergine hex.

### Feature cards

Four brand-surface variants for marketing / lab demos:

| Component key | Background | Text |
|---|---|---|
| `feature-card-violet` | `{colors.brand-violet}` | `primary-foreground` |
| `feature-card-magenta` | `{colors.brand-magenta}` | `primary-foreground` |
| `feature-card-yellow` | `{colors.brand-yellow}` | `foreground` |
| `feature-card-cyan` | `{colors.brand-cyan}` | `foreground` |

In wireframe mode, chart slots map to neutral tones (see `{themes.wireframe.component-mapping}`).

### Sidebar

**`sidebar-shell`** — Uses `--sidebar*` tokens from Figma `sidebar/*`. Light: `#fafafa` sidebar on white app background; dark: `#0a0a0a` sidebar on black canvas.

## Do's and Don'ts

### Do
- Use semantic tokens (`bg-primary`, `text-muted-foreground`) in components.
- Follow **Color & accent usage** — one dominant brand accent per marketing block; `{colors.brand-primary}` for brand spine.
- Keep marketing accents on [tobogganlabs.com](https://tobogganlabs.com/en) patterns (carousel, case-study cards); keep dashboard chrome neutral.
- Reference `{colors.*}` or CSS variables in docs — not ad hoc hex in code.
- Switch to `wireframe` class for layout-only iteration.
- Pull new values from `docs/Toboggan Labs Design System-variables-full.json` when Figma changes.

### Don't
- Don't use legacy Clay cream canvas (`#fffaf0`) or saturated Clay feature-card palettes — superseded by aubergine + four brand accents.
- Don't stack multiple neon accents in one card or CTA group.
- Don't use brand accent (`{colors.brand-magenta}` etc.) backgrounds for sidebar, inputs, or table chrome.
- Don't hardcode `aubergine/*` primitives when a semantic token exists.
- Don't combine `wireframe` + `dark` without defining overrides.
- Don't document hover states in this spec (handle in component stories).

## Iteration guide

1. Export or refresh `docs/Toboggan Labs Design System-variables-full.json` from Figma.
2. Update `{colors.*}` in this file's YAML frontmatter to match resolved **Theme** / `light` values.
3. Mirror changes in `src/styles/globals.css` (`:root`, `.dark`, `.wireframe`).
4. Verify in Storybook Design System doc and app theme switcher.
5. Use `{themes.wireframe}` before polishing brand color.

## Known gaps

- Figma **Spacing Tokens** and **Radius** component tokens are not yet exported as CSS utility classes (only primitives + shadcn semantics in `globals.css`).
- `chart/area/*` and `chart/static/*` color families are in Figma but not wired to CSS variables.
- `general/unofficial/*` tokens (ghost, outline, border steps) are documented in Figma only — add to CSS when components need them.
- Typography scale in this doc is product-oriented; Figma text styles may differ — align in a future typography export.
