/** Shared grid template: lane rail + six lifecycle stage columns (Development is wider). */
export const journeyAtlasGridTemplateColumns =
  "minmax(8.75rem, max-content) minmax(10.5rem, max-content) minmax(10.5rem, max-content) minmax(10.5rem, max-content) minmax(54rem, max-content) minmax(10.5rem, max-content) minmax(10.5rem, max-content)"

export const journeyAtlasDevelopmentStageId = "development"

export const journeyAtlasDevelopmentSubTracks = [
  { id: "design", label: "Design / Prototype", tone: "bg-chart-1/12 border-chart-1/30" },
  { id: "dev", label: "Dev", tone: "bg-chart-2/12 border-chart-2/30" },
  { id: "data-ai", label: "AI / Data Science", tone: "bg-chart-3/12 border-chart-3/30" },
  { id: "infra", label: "Infra / DevOps", tone: "bg-chart-4/12 border-chart-4/30" },
] as const

export const journeyAtlasGridClassName = "grid min-w-max"

/** Cells stretch to the column track width set by the widest row in that column. */
export const journeyAtlasColumnCellClassName = "min-w-0 w-full"

/** Stage columns can expand to fill wide tracks (especially Development). */
export const journeyAtlasStageColumnCellClassName = "min-w-0 w-full"

/** First-column lane rail — sticks on horizontal scroll inside the atlas viewport. */
export const journeyAtlasLaneRailStickyClassName =
  "sticky left-0 shrink-0 border-r border-border bg-background shadow-[6px_0_12px_-6px_rgba(0,0,0,0.1)]"
