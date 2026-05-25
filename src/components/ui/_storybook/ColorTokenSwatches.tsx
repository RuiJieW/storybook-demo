const semanticSwatches = [
  { label: "background", className: "bg-background border border-border" },
  { label: "foreground", className: "bg-foreground" },
  { label: "primary", className: "bg-primary" },
  { label: "primary FG", className: "bg-primary-foreground" },
  { label: "secondary", className: "bg-secondary" },
  { label: "muted", className: "bg-muted" },
  { label: "accent FG", className: "bg-accent-foreground" },
  { label: "destructive", className: "bg-destructive" },
  { label: "border", className: "bg-border" },
  { label: "ring", className: "bg-ring" },
] as const

const aubergineSwatches = [
  { label: "50", className: "bg-[#f3f0f5]" },
  { label: "100", className: "bg-[#e6e1ea]" },
  { label: "200", className: "bg-[#cec2d6]" },
  { label: "300", className: "bg-[#b5a4c1]" },
  { label: "400", className: "bg-[#9d86ac]" },
  { label: "500", className: "bg-[#714f86]" },
  { label: "600", className: "bg-[#4d2368]" },
  { label: "700", className: "bg-[#3e1c53]" },
  { label: "800", className: "bg-[#2e153e]" },
  { label: "900", className: "bg-[#170b1f]" },
  { label: "950", className: "bg-[#0f0715]" },
] as const

const brandAccentSwatches = [
  {
    label: "primary",
    token: "brand-primary",
    hex: "#4d2368",
    className: "bg-primary",
    themeAware: true,
  },
  {
    label: "magenta",
    token: "brand-magenta",
    hex: "#ff197c",
    className: "bg-[#ff197c]",
  },
  {
    label: "violet",
    token: "brand-violet",
    hex: "#9c03c2",
    className: "bg-[#9c03c2]",
  },
  {
    label: "yellow",
    token: "brand-yellow",
    hex: "#ffb005",
    className: "bg-[#ffb005]",
  },
  {
    label: "cyan",
    token: "brand-cyan",
    hex: "#06fff0",
    className: "bg-[#06fff0]",
  },
] as const

export function ColorTokenSwatches() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 border-b border-border px-6 py-8 text-foreground">
      <section>
        <h2 className="mb-1 text-lg font-semibold tracking-tight">
          Token preview
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Toggle <strong>Theme</strong> in the toolbar for brand-light,
          brand-dark, or wireframe. Semantic tokens are theme-aware. Aubergine
          ramp and neon brand accent hex values are fixed at brand-light
          primitives. <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">brand-primary</code> follows{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">primary</code> per theme.
        </p>
        <h3 className="mb-3 text-sm font-semibold">Semantic</h3>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {semanticSwatches.map((s) => (
            <li
              key={s.label}
              className="overflow-hidden rounded-lg border border-border"
            >
              <div className={`h-14 ${s.className}`} />
              <p className="px-2 py-1.5 font-mono text-xs text-muted-foreground">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold">Aubergine primitives</h3>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {aubergineSwatches.map((s) => (
            <li
              key={s.label}
              className="overflow-hidden rounded-lg border border-border"
            >
              <div className={`h-10 ${s.className}`} />
              <p className="px-1.5 py-1 font-mono text-[10px] text-muted-foreground">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold">Brand accents</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Spec names: <code className="font-mono text-xs">colors.brand-*</code>.
          In code, map to <code className="font-mono text-xs">bg-chart-1</code>–
          <code className="font-mono text-xs">bg-chart-5</code> for Tailwind and
          Recharts.
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {brandAccentSwatches.map((s) => (
            <li
              key={s.token}
              className="overflow-hidden rounded-lg border border-border"
            >
              <div className={`h-14 ${s.className}`} />
              <p className="px-2 py-1.5 font-mono text-xs text-muted-foreground">
                {s.label}
              </p>
              <p className="border-t border-border px-2 py-1 font-mono text-[10px] text-muted-foreground/80">
                {s.token}
                {"themeAware" in s && s.themeAware
                  ? " · via primary"
                  : ` · ${s.hex}`}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
