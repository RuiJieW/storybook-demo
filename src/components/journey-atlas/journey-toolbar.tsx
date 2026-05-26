"use client"

import { MinusIcon, PlusIcon, ScanIcon } from "lucide-react"

import { TobogganLogo } from "@/components/brand/toboggan-logo"
import { Button } from "@/components/ui/button"
import type { JourneyLane } from "@/components/journey-atlas/types"
import { cn } from "@/lib/utils"

export type JourneyFilter = "all" | "critical" | "opportunity" | "active-initiatives"

type JourneyToolbarProps = Readonly<{
  title: string
  subtitle: string
  lanes: JourneyLane[]
  collapsedLaneIds: Set<string>
  onToggleLaneCollapse: (laneId: string) => void
  filter: JourneyFilter
  onFilterChange: (filter: JourneyFilter) => void
  onCollapseAll: () => void
  onExpandAll: () => void
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomFit: () => void
}>

const FILTERS: ReadonlyArray<Readonly<{ id: JourneyFilter; label: string }>> = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical pain" },
  { id: "opportunity", label: "Opportunities" },
  { id: "active-initiatives", label: "Active initiatives" },
]

export function JourneyToolbar({
  title,
  subtitle,
  lanes,
  collapsedLaneIds,
  onToggleLaneCollapse,
  filter,
  onFilterChange,
  onCollapseAll,
  onExpandAll,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomFit,
}: JourneyToolbarProps) {
  const allExpanded = collapsedLaneIds.size === 0

  return (
    <header className="border-b border-border bg-primary text-primary-foreground">
      <div className="flex min-h-16 items-center gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <TobogganLogo variant="icon" color="white" className="size-5" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="truncate text-xs text-primary-foreground/80">{subtitle}</p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="on-color"
            onClick={allExpanded ? onCollapseAll : onExpandAll}
          >
            {allExpanded ? "Collapse all lanes" : "Expand all lanes"}
          </Button>

          <Button size="icon-sm" variant="on-color" onClick={onZoomOut} aria-label="Zoom out">
            <MinusIcon />
          </Button>
          <span className="w-12 text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
          <Button size="icon-sm" variant="on-color" onClick={onZoomIn} aria-label="Zoom in">
            <PlusIcon />
          </Button>
          <Button size="sm" variant="on-color" onClick={onZoomFit}>
            <ScanIcon />
            Fit
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-primary-foreground/20 px-4 py-3">
        <span className="text-[11px] tracking-wide text-primary-foreground/70 uppercase">Lanes</span>
        {lanes.map((lane) => {
          const collapsed = collapsedLaneIds.has(lane.id)
          return (
            <button
              key={lane.id}
              type="button"
              onClick={() => onToggleLaneCollapse(lane.id)}
              className={cn(
                "rounded-md border px-2 py-1 text-xs transition-colors",
                collapsed
                  ? "border-primary-foreground/35 text-primary-foreground/70"
                  : "border-primary-foreground bg-primary-foreground text-primary"
              )}
            >
              {lane.name}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-primary-foreground/20 px-4 py-3">
        <span className="text-[11px] tracking-wide text-primary-foreground/70 uppercase">Filter</span>
        {FILTERS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onFilterChange(entry.id)}
            className={cn(
              "rounded-md border px-2 py-1 text-xs transition-colors",
              filter === entry.id
                ? "border-primary-foreground bg-primary-foreground text-primary"
                : "border-primary-foreground/35 text-primary-foreground/70"
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>
    </header>
  )
}
