"use client"

import { ChevronRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type {
  JourneyHandoff,
  JourneyKpi,
  JourneyLifecycleStage,
} from "@/components/journey-atlas/types"
import {
  journeyAtlasColumnCellClassName,
  journeyAtlasGridClassName,
  journeyAtlasGridTemplateColumns,
} from "@/components/journey-atlas/journey-atlas-layout"
import { cn } from "@/lib/utils"

type JourneyKpiBarProps = Readonly<{
  stages: JourneyLifecycleStage[]
  handoffs: JourneyHandoff[]
  kpis: JourneyKpi[]
  activeHandoffId: string | null
  onSelectHandoff: (handoffId: string) => void
}>

const healthClassByValue = {
  good: "bg-chart-5/15 text-foreground border-chart-5/40",
  warn: "bg-chart-4/20 text-foreground border-chart-4/40",
  bad: "bg-destructive/10 text-destructive border-destructive/30",
} as const

export function JourneyKpiBar({
  stages,
  handoffs,
  kpis,
  activeHandoffId,
  onSelectHandoff,
}: JourneyKpiBarProps) {
  return (
    <section
      className={cn(journeyAtlasGridClassName, "border-b border-border bg-muted/30")}
      style={{ gridTemplateColumns: journeyAtlasGridTemplateColumns }}
    >
      <div
        className={cn(
          journeyAtlasColumnCellClassName,
          "flex items-center border-r border-border bg-muted/30 px-3 py-2.5"
        )}
      >
        <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          Stages
        </p>
      </div>
      {handoffs.map((handoff) => {
        const kpi = kpis.find((entry) => entry.handoffId === handoff.id)
        const stage = stages.find((entry) => entry.id === handoff.lifecycleStageId)
        if (!kpi) {
          return null
        }

        return (
          <button
            key={handoff.id}
            type="button"
            onClick={() => onSelectHandoff(handoff.id)}
            className={cn(
              "group border-r border-border px-3 py-2.5 text-left transition-colors last:border-r-0 hover:bg-muted",
              journeyAtlasColumnCellClassName,
              activeHandoffId === handoff.id && "bg-background"
            )}
          >
            {stage ? (
              <p className="line-clamp-1 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                {stage.num} · {stage.name}
              </p>
            ) : null}
            <p className="line-clamp-1 text-[11px] font-medium text-foreground">
              {handoff.name}
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
              {kpi.quantValue}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <Badge
                variant="outline"
                className={cn("text-[10px] uppercase", healthClassByValue[kpi.health])}
              >
                {kpi.health}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
                Detail
                <ChevronRightIcon className="size-3" />
              </span>
            </div>
          </button>
        )
      })}
    </section>
  )
}
