/** Elevated panels (menus, modals) — card surface, not inverted popover tokens. */
export const elevatedSurfaceClasses =
  "border border-border bg-card text-card-foreground" as const

/** @alias elevatedSurfaceClasses */
export const menuSurfaceClasses = elevatedSurfaceClasses
