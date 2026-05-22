export const designThemes = ["brand-light", "brand-dark", "wireframe"] as const

export type DesignTheme = (typeof designThemes)[number]

/** Maps DESIGN.md theme keys to the class applied on `<html>`. */
export const themeHtmlClass: Record<DesignTheme, string | null> = {
  "brand-light": null,
  "brand-dark": "dark",
  wireframe: "wireframe",
}

export const featureCardSurfaces = [
  {
    surface: "border-0 bg-chart-1 text-primary-foreground",
    muted: "text-primary-foreground/80",
    icon: "text-primary-foreground/90",
  },
  {
    surface: "border-0 bg-chart-2 text-primary-foreground",
    muted: "text-primary-foreground/80",
    icon: "text-primary-foreground/90",
  },
  {
    surface: "border-0 bg-chart-3 text-foreground",
    muted: "text-foreground/70",
    icon: "text-foreground/80",
  },
  {
    surface: "border-0 bg-chart-4 text-foreground",
    muted: "text-foreground/70",
    icon: "text-foreground/80",
  },
] as const
