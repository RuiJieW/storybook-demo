"use client"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type {
  JourneyHandoff,
  JourneyKpi,
  JourneyLifecycleStage,
} from "@/components/journey-atlas/types"
import { cn } from "@/lib/utils"

type JourneyKpiDetailSheetProps = Readonly<{
  open: boolean
  kpi: JourneyKpi | null
  stage: JourneyLifecycleStage | null
  handoff: JourneyHandoff | null
  onOpenChange: (open: boolean) => void
}>

const healthClassByValue = {
  good: "bg-chart-5/15 text-foreground border-chart-5/40",
  warn: "bg-chart-4/20 text-foreground border-chart-4/40",
  bad: "bg-destructive/10 text-destructive border-destructive/30",
} as const

export function JourneyKpiDetailSheet({
  open,
  kpi,
  stage,
  handoff,
  onOpenChange,
}: JourneyKpiDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="gap-0 p-0 sm:max-w-md">
        <div className="flex min-h-0 flex-1 flex-col">
          <SheetHeader className="shrink-0 border-b border-border py-4 pr-12">
            {stage ? (
              <p className="mb-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {stage.num} · {stage.name}
              </p>
            ) : null}
            <SheetTitle>{handoff?.name ?? "Handoff"}</SheetTitle>
            <SheetDescription>
              {handoff
                ? `${handoff.evidenceCount} interviews${stage?.meta ? ` · ${stage.meta}` : ""}`
                : null}
            </SheetDescription>
            {kpi ? (
              <div className="mt-3">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] uppercase", healthClassByValue[kpi.health])}
                >
                  {kpi.health}
                </Badge>
              </div>
            ) : null}
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm">
            <section>
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Governance signal
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">Speed to alignment</p>
            </section>

            {kpi ? (
              <section className="grid gap-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">{kpi.qualLabel}:</span>{" "}
                  {kpi.qualValue}
                </p>
                <p>
                  <span className="font-medium text-foreground">{kpi.quantLabel}:</span>{" "}
                  {kpi.quantValue}
                </p>
                {kpi.detailBullets?.map((bullet) => (
                  <p key={bullet}>• {bullet}</p>
                ))}
              </section>
            ) : (
              <p className="text-muted-foreground">No KPI mapped for this handoff.</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
