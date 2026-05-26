"use client"

import Link from "next/link"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type {
  JourneyHandoff,
  JourneyItem,
  JourneyLane,
} from "@/components/journey-atlas/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type JourneyItemSheetProps = Readonly<{
  open: boolean
  item: JourneyItem | null
  handoffs: JourneyHandoff[]
  lanes: JourneyLane[]
  onOpenChange: (open: boolean) => void
}>

function formatTier(tier: JourneyItem["tier"]) {
  if (!tier) {
    return null
  }

  return tier.replace("-", " ").toUpperCase()
}

export function JourneyItemSheet({
  open,
  item,
  handoffs,
  lanes,
  onOpenChange,
}: JourneyItemSheetProps) {
  const lane = item ? lanes.find((entry) => entry.id === item.laneId) : null
  const linkedHandoffs =
    item?.handoffIds
      .map((handoffId) => handoffs.find((entry) => entry.id === handoffId))
      .filter((entry): entry is JourneyHandoff => entry !== undefined) ?? []

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 p-0 sm:max-w-md">
        {item ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <SheetHeader className="shrink-0 border-b border-border py-4 pr-12">
              <SheetTitle>{item.text}</SheetTitle>
              <SheetDescription>
                {lane?.name ?? "Unmapped lane"} · {linkedHandoffs.map((entry) => entry.name).join(" • ")}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 text-sm">
              <section className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Summary
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{item.tag}</Badge>
                  {item.severity ? <Badge variant="secondary">Severity: {item.severity}</Badge> : null}
                  {item.impact ? <Badge variant="secondary">Impact: {item.impact}</Badge> : null}
                  {item.status ? <Badge variant="secondary">Status: {item.status}</Badge> : null}
                  {item.tier ? <Badge variant="secondary">{formatTier(item.tier)}</Badge> : null}
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Evidence
                </h3>
                <p className="text-foreground">{item.evidence.mentionCount} interview mentions</p>
                {item.evidence.interviews?.length ? (
                  <p className="text-muted-foreground">
                    Interviews: {item.evidence.interviews.join(", ")}
                  </p>
                ) : null}
                {item.evidence.projects?.length ? (
                  <p className="text-muted-foreground">Projects: {item.evidence.projects.join(", ")}</p>
                ) : null}
                <p className="text-muted-foreground">
                  Source sections: {item.evidence.sourceSections.join(", ")}
                </p>
              </section>

              {item.archetypes?.length ? (
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Workflow archetypes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.archetypes.map((archetype) => (
                      <Badge key={archetype} variant="outline">
                        {archetype}
                      </Badge>
                    ))}
                  </div>
                </section>
              ) : null}

              {item.laneId === "initiatives" ? (
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Workflow detail
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed initiative flow pages are stubbed for V05 and scoped for P2.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    render={<Link href={`/user-journey/flow/${item.id}`} />}
                  >
                    Open flow stub
                  </Button>
                </section>
              ) : null}
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
