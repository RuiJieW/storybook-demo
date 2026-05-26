/** Shared grid template: lane rail + seven handoff columns sized to widest cell in each track. */
export const journeyAtlasGridTemplateColumns =
  "minmax(8.75rem, max-content) repeat(7, minmax(10.5rem, max-content))"

export const journeyAtlasGridClassName = "grid min-w-max"

/** Cells stretch to the column track width set by the widest row in that column. */
export const journeyAtlasColumnCellClassName = "min-w-0 w-full max-w-50"
