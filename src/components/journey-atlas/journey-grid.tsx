"use client"

import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import {
  journeyAtlasColumnCellClassName,
  journeyAtlasGridClassName,
  journeyAtlasGridTemplateColumns,
} from "@/components/journey-atlas/journey-atlas-layout"
import { JourneyThoughtSentimentBar } from "@/components/journey-atlas/journey-thought-sentiment-bar"
import type {
  JourneyHandoff,
  JourneyItem,
  JourneyLane,
  JourneyLifecycleStage,
  JourneyTier,
} from "@/components/journey-atlas/types"
import { cn } from "@/lib/utils"

type JourneyGridProps = Readonly<{
  stages: JourneyLifecycleStage[]
  handoffs: JourneyHandoff[]
  lanes: JourneyLane[]
  items: JourneyItem[]
  thoughtSentiments?: Readonly<Partial<Record<string, number>>>
  activeHandoffId: string | null
  activeLaneId: string | null
  selectedItemId: string | null
  onSelectItem: (item: JourneyItem) => void
  collapsedLaneIds: ReadonlySet<string>
  onToggleLaneCollapse: (laneId: string) => void
}>

const toneByLaneId: Record<string, string> = {
  actions: "bg-chart-1/7 border-chart-1/25",
  touchpoints: "bg-chart-5/10 border-chart-5/25",
  thoughts: "bg-chart-3/10 border-chart-3/25",
  backend: "bg-chart-2/10 border-chart-2/25",
  team: "bg-chart-4/10 border-chart-4/25",
  pain: "bg-destructive/5 border-destructive/25",
  opportunity: "bg-chart-5/8 border-chart-5/30",
  initiatives: "bg-primary/6 border-primary/20",
}

function getCellItems(items: JourneyItem[], laneId: string, handoffId: string) {
  return items.filter(
    (item) => item.laneId === laneId && item.handoffIds.includes(handoffId)
  )
}

function LaneRailToggle({
  laneId,
  laneName,
  collapsed,
  onToggle,
  children,
}: Readonly<{
  laneId: string
  laneName: string
  collapsed: boolean
  onToggle: (laneId: string) => void
  children: ReactNode
}>) {
  return (
    <button
      type="button"
      onClick={() => onToggle(laneId)}
      aria-expanded={!collapsed}
      aria-label={`${collapsed ? "Expand" : "Collapse"} swim lane ${laneName}`}
      className={cn(
        "w-full rounded-md text-left outline-none transition-colors",
        "hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <span className="flex items-start gap-2">
        <ChevronDown
          className={cn(
            "mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-150",
            collapsed && "-rotate-90"
          )}
          aria-hidden
        />
        <span className="min-w-0 flex-1">{children}</span>
      </span>
    </button>
  )
}

function CollapsedLaneHandoffPlaceholder({
  handoffs,
  laneId,
  activeLaneId,
  activeHandoffId,
}: Readonly<{
  handoffs: JourneyHandoff[]
  laneId: string
  activeLaneId: string | null
  activeHandoffId: string | null
}>) {
  return (
    <>
      {handoffs.map((handoff, handoffIndex) => {
        const isFocusCell =
          (activeLaneId ? laneId === activeLaneId : false) ||
          (activeHandoffId ? handoff.id === activeHandoffId : false)
        return (
          <div
            key={`collapsed-${laneId}-${handoff.id}`}
            className={cn(
              journeyAtlasColumnCellClassName,
              "border-r border-b border-border px-2 py-2 align-top last:border-r-0",
              toneByLaneId[laneId],
              isFocusCell && "ring-1 ring-ring/35 ring-inset",
              handoffIndex === handoffs.length - 1 && "!border-r-0"
            )}
          >
            <p className="text-center text-[10px] text-muted-foreground">—</p>
          </div>
        )
      })}
    </>
  )
}

function ItemMeta({
  item,
  hideTierBadge = false,
}: Readonly<{ item: JourneyItem; hideTierBadge?: boolean }>) {
  const isCritical = item.severity === "high"
  const isActiveInitiative = item.status === "active"

  return (
    <div className="flex flex-wrap items-center gap-1 pt-1">
      <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
        {item.tag}
      </Badge>
      {item.evidence.mentionCount > 0 ? (
        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
          {item.evidence.mentionCount} mentions
        </Badge>
      ) : null}
      {item.tier && !hideTierBadge ? (
        <Badge variant="outline" className="h-5 px-1.5 text-[10px] uppercase">
          {item.tier.replace("-", " ")}
        </Badge>
      ) : null}
      {isCritical ? (
        <Badge className="h-5 bg-destructive/90 px-1.5 text-[10px] text-destructive-foreground">
          Critical
        </Badge>
      ) : null}
      {isActiveInitiative ? (
        <Badge className="h-5 bg-chart-5/20 px-1.5 text-[10px] text-foreground">
          Active
        </Badge>
      ) : null}
    </div>
  )
}

const OPPORTUNITY_TIER_SWIM_LABELS = {
  "tier-1": "Tier 1 — recommendations",
  "tier-2": "Tier 2 — recommendations",
  "tier-3": "Tier 3 — recommendations",
} satisfies Record<JourneyTier, string>

const OPPORTUNITY_TIER_ORDER = [
  "tier-1",
  "tier-2",
  "tier-3",
] as const satisfies readonly JourneyTier[]

function getOpportunityCellItemsForTier(
  items: JourneyItem[],
  handoffId: string,
  tier: JourneyTier
) {
  return items.filter(
    (item) =>
      item.laneId === "opportunity" &&
      item.handoffIds.includes(handoffId) &&
      item.tier === tier
  )
}

function getOpportunityUntieredCellItems(items: JourneyItem[], handoffId: string) {
  return items.filter(
    (item) =>
      item.laneId === "opportunity" &&
      item.handoffIds.includes(handoffId) &&
      item.tier !== "tier-1" &&
      item.tier !== "tier-2" &&
      item.tier !== "tier-3"
  )
}

function hasAnyOpportunityUntieredAcrossHandoffs(
  items: JourneyItem[],
  handoffs: readonly JourneyHandoff[]
) {
  return handoffs.some((h) => getOpportunityUntieredCellItems(items, h.id).length > 0)
}

type OpportunityTierBand =
  | { key: string; tier: JourneyTier; label: string; hideTierBadge: true }
  | { key: string; tier: null; label: string; hideTierBadge: false }

function opportunityTierBands(showOtherRow: boolean): OpportunityTierBand[] {
  const tiers = OPPORTUNITY_TIER_ORDER.map((tier) => ({
    key: `opportunity-${tier}`,
    tier,
    label: OPPORTUNITY_TIER_SWIM_LABELS[tier],
    hideTierBadge: true as const,
  }))
  const other: OpportunityTierBand[] = showOtherRow
    ? [
        {
          key: "opportunity-other",
          tier: null,
          label: "Other — untiered recommendations",
          hideTierBadge: false,
        },
      ]
    : []
  return [...tiers, ...other]
}

function OpportunityContinuationRail({
  lane,
  bandLabel,
  onToggleLaneCollapse,
}: Readonly<{
  lane: JourneyLane
  bandLabel: string
  onToggleLaneCollapse: (laneId: string) => void
}>) {
  return (
    <button
      type="button"
      onClick={() => onToggleLaneCollapse(lane.id)}
      aria-label={`Toggle collapsing swim lane ${lane.name}`}
      className={cn(
        "w-full rounded-md text-left outline-none transition-colors",
        "hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{lane.name}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">{bandLabel}</p>
    </button>
  )
}

function OpportunityLaneTierRows({
  lane,
  handoffs,
  items,
  activeLaneId,
  activeHandoffId,
  selectedItemId,
  onSelectItem,
  showOtherRow,
  collapsed,
  onToggleLaneCollapse,
}: Readonly<{
  lane: JourneyLane
  handoffs: JourneyHandoff[]
  items: JourneyItem[]
  activeLaneId: string | null
  activeHandoffId: string | null
  selectedItemId: string | null
  onSelectItem: (item: JourneyItem) => void
  showOtherRow: boolean
  collapsed: boolean
  onToggleLaneCollapse: (laneId: string) => void
}>) {
  if (collapsed) {
    return (
      <div className="contents">
        <div
          className={cn(
            journeyAtlasColumnCellClassName,
            "sticky left-0 z-20 border-r border-b border-border bg-background px-3 py-2",
            activeLaneId === lane.id && "bg-primary/8"
          )}
        >
          <LaneRailToggle
            laneId={lane.id}
            laneName={lane.name}
            collapsed
            onToggle={onToggleLaneCollapse}
          >
            <>
              <p className="text-sm font-semibold text-foreground">{lane.name}</p>
              {lane.description ? (
                <p className="mt-0.5 text-xs text-muted-foreground">{lane.description}</p>
              ) : null}
              <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Opportunity tiers · collapsed
              </p>
            </>
          </LaneRailToggle>
        </div>

        <CollapsedLaneHandoffPlaceholder
          handoffs={handoffs}
          laneId={lane.id}
          activeLaneId={activeLaneId}
          activeHandoffId={activeHandoffId}
        />
      </div>
    )
  }

  const bands = opportunityTierBands(showOtherRow)

  return (
    <>
      {bands.map((band, bandIndex) => (
        <div key={band.key} className="contents">
          <div
            className={cn(
              journeyAtlasColumnCellClassName,
              "sticky left-0 z-20 border-r border-b border-border bg-background px-3 py-3",
              bandIndex > 0 && "border-t border-border",
              activeLaneId === lane.id && "bg-primary/8"
            )}
          >
            {bandIndex === 0 ? (
              <LaneRailToggle
                laneId={lane.id}
                laneName={lane.name}
                collapsed={false}
                onToggle={onToggleLaneCollapse}
              >
                <>
                  <p className="text-sm font-semibold text-foreground">{lane.name}</p>
                  {lane.description ? (
                    <p className="mt-1 text-xs text-muted-foreground">{lane.description}</p>
                  ) : null}
                  <p className="mt-2 border-t border-border/70 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {band.label}
                  </p>
                </>
              </LaneRailToggle>
            ) : (
              <OpportunityContinuationRail
                lane={lane}
                bandLabel={band.label}
                onToggleLaneCollapse={onToggleLaneCollapse}
              />
            )}
          </div>

          {handoffs.map((handoff, handoffIndex) => {
            const allOpp = getCellItems(items, lane.id, handoff.id)
            const tierItems =
              band.tier === null
                ? getOpportunityUntieredCellItems(items, handoff.id)
                : getOpportunityCellItemsForTier(items, handoff.id, band.tier)
            const isFocusCell =
              (activeLaneId ? lane.id === activeLaneId : false) ||
              (activeHandoffId ? handoff.id === activeHandoffId : false)

            return (
              <div
                key={`${band.key}-${handoff.id}`}
                className={cn(
                  journeyAtlasColumnCellClassName,
                  "border-r border-b border-border p-2.5 align-top last:border-r-0",
                  toneByLaneId[lane.id],
                  bandIndex > 0 && "border-t border-border",
                  isFocusCell && "ring-1 ring-ring/35 ring-inset",
                  handoffIndex === handoffs.length - 1 && "!border-r-0"
                )}
              >
                {allOpp.length === 0 ? (
                  bandIndex === 0 ? (
                    <p className="text-xs text-muted-foreground">No mapped evidence yet.</p>
                  ) : (
                    <p className="py-1 text-[11px] leading-snug text-muted-foreground">—</p>
                  )
                ) : (
                  <OpportunityTierBandCell
                    tierItems={tierItems}
                    selectedItemId={selectedItemId}
                    onSelectItem={onSelectItem}
                    hideTierBadge={band.hideTierBadge}
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}

function OpportunityTierBandCell({
  tierItems,
  selectedItemId,
  onSelectItem,
  hideTierBadge,
}: Readonly<{
  tierItems: readonly JourneyItem[]
  selectedItemId: string | null
  onSelectItem: (item: JourneyItem) => void
  hideTierBadge: boolean
}>) {
  if (tierItems.length === 0) {
    return (
      <p className="py-1 text-[11px] leading-snug text-muted-foreground">—</p>
    )
  }
  return (
    <div className="flex w-full flex-col gap-2">
      {tierItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectItem(item)}
          className={cn(
            "w-full rounded-md border border-border bg-card p-2 text-left text-card-foreground transition-colors hover:bg-muted/40",
            selectedItemId === item.id && "border-ring ring-1 ring-ring/45"
          )}
        >
          <p className="line-clamp-3 text-xs leading-5 text-foreground">{item.text}</p>
          <ItemMeta hideTierBadge={hideTierBadge} item={item} />
        </button>
      ))}
    </div>
  )
}

function thoughtSentimentFromMap(
  map: Readonly<Partial<Record<string, number>>> | undefined,
  handoffId: string
): number | null {
  const raw = map?.[handoffId]
  if (typeof raw !== "number" || Number.isNaN(raw)) {
    return null
  }
  return Math.min(1, Math.max(0, raw))
}

function stageById(stages: JourneyLifecycleStage[], stageId: string) {
  return stages.find((stage) => stage.id === stageId)
}

const headerInnerRule = "border-b border-r border-primary-foreground/20"
const stageHeaderTone = cn(
  "px-4 py-4 md:py-5",
  headerInnerRule,
  "bg-primary text-primary-foreground"
)

export function JourneyGrid({
  stages,
  handoffs,
  lanes,
  items,
  thoughtSentiments,
  activeHandoffId,
  activeLaneId,
  selectedItemId,
  onSelectItem,
  collapsedLaneIds,
  onToggleLaneCollapse,
}: JourneyGridProps) {
  const opportunityOtherBandVisible =
    hasAnyOpportunityUntieredAcrossHandoffs(items, handoffs)

  return (
    <div
      className={cn(
        journeyAtlasGridClassName,
        "overflow-hidden rounded-xl border-2 border-border bg-background shadow-sm"
      )}
      style={{ gridTemplateColumns: journeyAtlasGridTemplateColumns }}
    >
      <div
        className={cn(
          journeyAtlasColumnCellClassName,
          "sticky left-0 z-[30] flex items-end md:min-h-[9.25rem]",
          stageHeaderTone
        )}
      >
        <p className="pb-0.5 text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-primary-foreground/75">
          Mandate Lifecycle Stages
        </p>
      </div>

      {handoffs.map((handoff, index) => {
        const stage = stageById(stages, handoff.lifecycleStageId)
        const isActive = activeHandoffId === handoff.id

        return (
          <div
            key={handoff.id}
            className={cn(
              journeyAtlasColumnCellClassName,
              stageHeaderTone,
              "relative md:min-h-[9.25rem]",
              index === handoffs.length - 1 && "!border-r-0",
              isActive && "ring-2 ring-inset ring-primary-foreground/35"
            )}
          >
            {isActive ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-foreground/[0.12] to-transparent"
              />
            ) : null}
            <div className="relative z-[1]">
              {stage ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/55">
                    {stage.num}
                  </p>
                  <p className="mt-1.5 font-heading text-lg font-semibold leading-snug tracking-tight text-primary-foreground sm:text-xl">
                    {stage.name}
                  </p>
                </>
              ) : (
                <p className="font-heading text-lg font-semibold tracking-tight text-primary-foreground sm:text-xl">
                  Handoff
                </p>
              )}
              <p className="mt-3 border-t border-primary-foreground/25 pt-3 text-[13px] font-medium leading-snug text-primary-foreground/95">
                {handoff.name}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-primary-foreground/65">
                {handoff.evidenceCount} interviews
                {stage?.meta ? (
                  <>
                    <span aria-hidden className="text-primary-foreground/35">
                      {" "}
                      ·{" "}
                    </span>
                    {stage.meta}
                  </>
                ) : null}
              </p>
            </div>
          </div>
        )
      })}

      {lanes.map((lane) => {
        const collapsed = collapsedLaneIds.has(lane.id)
        return lane.id === "opportunity" ? (
          <OpportunityLaneTierRows
            key={lane.id}
            lane={lane}
            handoffs={handoffs}
            items={items}
            activeLaneId={activeLaneId}
            activeHandoffId={activeHandoffId}
            selectedItemId={selectedItemId}
            onSelectItem={onSelectItem}
            showOtherRow={opportunityOtherBandVisible}
            collapsed={collapsed}
            onToggleLaneCollapse={onToggleLaneCollapse}
          />
        ) : collapsed ? (
          <div key={lane.id} className="contents">
            <div
              className={cn(
                journeyAtlasColumnCellClassName,
                "sticky left-0 z-20 border-r border-b border-border bg-background px-3 py-2",
                activeLaneId === lane.id && "bg-primary/8"
              )}
            >
              <LaneRailToggle
                laneId={lane.id}
                laneName={lane.name}
                collapsed
                onToggle={onToggleLaneCollapse}
              >
                <>
                  <p className="text-sm font-semibold text-foreground">{lane.name}</p>
                  {lane.description ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">{lane.description}</p>
                  ) : null}
                </>
              </LaneRailToggle>
            </div>

            <CollapsedLaneHandoffPlaceholder
              handoffs={handoffs}
              laneId={lane.id}
              activeLaneId={activeLaneId}
              activeHandoffId={activeHandoffId}
            />
          </div>
        ) : (
          <div key={lane.id} className="contents">
            <div
              className={cn(
                journeyAtlasColumnCellClassName,
                "sticky left-0 z-20 border-r border-b border-border bg-background px-3 py-3",
                activeLaneId === lane.id && "bg-primary/8"
              )}
            >
              <LaneRailToggle
                laneId={lane.id}
                laneName={lane.name}
                collapsed={false}
                onToggle={onToggleLaneCollapse}
              >
                <>
                  <p className="text-sm font-semibold text-foreground">{lane.name}</p>
                  {lane.description ? (
                    <p className="mt-1 text-xs text-muted-foreground">{lane.description}</p>
                  ) : null}
                </>
              </LaneRailToggle>
            </div>

            {handoffs.map((handoff, handoffIndex) => {
              const cellItems = getCellItems(items, lane.id, handoff.id)
              const isFocusCell =
                (activeLaneId ? lane.id === activeLaneId : false) ||
                (activeHandoffId ? handoff.id === activeHandoffId : false)

              return (
                <div
                  key={`${lane.id}-${handoff.id}`}
                  className={cn(
                    journeyAtlasColumnCellClassName,
                    "border-r border-b border-border p-2.5 align-top last:border-r-0",
                    toneByLaneId[lane.id],
                    isFocusCell && "ring-1 ring-ring/35 ring-inset",
                    handoffIndex === handoffs.length - 1 && "!border-r-0"
                  )}
                >
                  {lane.id === "thoughts" ? (
                    <JourneyThoughtSentimentBar
                      handoffLabel={handoff.name}
                      value={thoughtSentimentFromMap(thoughtSentiments, handoff.id)}
                    />
                  ) : null}

                  {cellItems.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No mapped evidence yet.</p>
                  ) : (
                    <div className="flex w-full flex-col gap-2">
                      {cellItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onSelectItem(item)}
                          className={cn(
                            "w-full rounded-md border border-border bg-card p-2 text-left text-card-foreground transition-colors hover:bg-muted/40",
                            selectedItemId === item.id && "border-ring ring-1 ring-ring/45"
                          )}
                        >
                          <p className="line-clamp-3 text-xs leading-5 text-foreground">
                            {item.text}
                          </p>
                          <ItemMeta item={item} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
