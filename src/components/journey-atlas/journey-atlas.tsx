"use client"

import { useCallback, useMemo, useRef, useState } from "react"

import { JourneyGrid } from "@/components/journey-atlas/journey-grid"
import { JourneyKpiBar } from "@/components/journey-atlas/journey-kpi-bar"
import { JourneyKpiDetailSheet } from "@/components/journey-atlas/journey-kpi-detail-sheet"
import { JourneyItemSheet } from "@/components/journey-atlas/journey-item-sheet"
import {
  JourneyToolbar,
  type JourneyFilter,
} from "@/components/journey-atlas/journey-toolbar"
import { useJourneyViewport } from "@/components/journey-atlas/hooks/use-journey-viewport"
import type {
  JourneyAtlasData,
  JourneyHandoff,
  JourneyItem,
  JourneyKpi,
  JourneyLane,
  JourneyLifecycleStage,
} from "@/components/journey-atlas/types"
import { cn } from "@/lib/utils"

type JourneyAtlasProps = Readonly<{
  data: JourneyAtlasData
  className?: string
  onSelectItem?: (item: JourneyItem) => void
  selectedItemId?: string | null
}>

function sortedHandoffs(handoffs: JourneyHandoff[]) {
  return [...handoffs].sort((a, b) => a.order - b.order)
}

function sortedLanes(lanes: JourneyLane[]) {
  return [...lanes].sort((a, b) => a.order - b.order)
}

function sortedStages(stages: JourneyLifecycleStage[]) {
  return [...stages].sort((a, b) => a.order - b.order)
}

function getKpi(kpis: JourneyKpi[], handoffId: string | null) {
  if (!handoffId) {
    return null
  }

  return kpis.find((entry) => entry.handoffId === handoffId) ?? null
}

function matchesFilter(item: JourneyItem, filter: JourneyFilter) {
  if (filter === "all") {
    return true
  }

  if (filter === "critical") {
    return item.laneId === "pain" && item.severity === "high"
  }

  if (filter === "opportunity") {
    return item.laneId === "opportunity"
  }

  return item.laneId === "initiatives" && item.status === "active"
}

export function JourneyAtlas({
  data,
  className,
  onSelectItem,
  selectedItemId,
}: JourneyAtlasProps) {
  const stages = useMemo(() => sortedStages(data.stages), [data.stages])
  const handoffs = useMemo(() => sortedHandoffs(data.handoffs), [data.handoffs])
  const lanes = useMemo(() => sortedLanes(data.lanes), [data.lanes])
  const [collapsedLaneIds, setCollapsedLaneIds] = useState<Set<string>>(new Set())
  const toggleLaneCollapse = useCallback((laneId: string) => {
    setCollapsedLaneIds((current) => {
      const next = new Set(current)
      if (next.has(laneId)) {
        next.delete(laneId)
      } else {
        next.add(laneId)
      }
      return next
    })
  }, [])
  const [filter, setFilter] = useState<JourneyFilter>("all")
  const [activeHandoffId, setActiveHandoffId] = useState<string | null>(handoffs[0]?.id ?? null)
  const [selectedLocalItemId, setSelectedLocalItemId] = useState<string | null>(null)
  const [kpiDetailOpen, setKpiDetailOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const {
    viewport,
    zoomStyle,
    zoomIn,
    zoomOut,
    fitToScreen,
    startDrag,
    onDrag,
    endDrag,
    setZoom,
  } = useJourneyViewport(scrollRef)

  const filteredItems = useMemo(
    () => data.items.filter((item) => matchesFilter(item, filter)),
    [data.items, filter]
  )

  const selectedItem = useMemo(
    () =>
      filteredItems.find(
        (item) => item.id === (selectedItemId ?? selectedLocalItemId)
      ) ?? null,
    [filteredItems, selectedItemId, selectedLocalItemId]
  )

  const kpi = getKpi(data.kpis, activeHandoffId)
  const sheetOpen = selectedItem !== null

  const activeHandoff =
    handoffs.find((entry) => entry.id === activeHandoffId) ?? null
  const activeStage =
    stages.find((entry) => entry.id === activeHandoff?.lifecycleStageId) ?? null
  // P2: add minimap parity and cross-handoff arrow detail pages.

  return (
    <div className={cn("flex h-full min-h-0 flex-col overflow-hidden", className)}>
      <div className="z-30 shrink-0 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.18)]">
        <JourneyToolbar
          title={`${data.meta.title} — ${data.meta.subtitle}`}
          subtitle={`${data.meta.version} · May 2026 synthesis`}
          lanes={lanes}
          collapsedLaneIds={collapsedLaneIds}
          onToggleLaneCollapse={toggleLaneCollapse}
          onCollapseAll={() => {
            setCollapsedLaneIds(new Set(lanes.map((lane) => lane.id)))
          }}
          onExpandAll={() => setCollapsedLaneIds(new Set())}
          filter={filter}
          onFilterChange={setFilter}
          zoom={viewport.zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onZoomFit={fitToScreen}
        />

        <JourneyKpiBar
          stages={stages}
          handoffs={handoffs}
          kpis={data.kpis}
          activeHandoffId={activeHandoffId}
          onSelectHandoff={(handoffId) => {
            setActiveHandoffId(handoffId)
            setKpiDetailOpen(true)
            setSelectedLocalItemId(null)
          }}
        />
      </div>

      <div
        ref={scrollRef}
        style={zoomStyle}
        className="relative min-h-0 flex-1 overflow-auto [background-color:var(--background)] [background-image:radial-gradient(circle_at_center,color-mix(in_oklab,var(--foreground)_10%,transparent)_1.25px,transparent_1.25px)] [background-size:20px_20px]"
        onMouseMove={(event) => {
          if ((event.buttons & 1) === 1) {
            onDrag(event.clientX, event.clientY)
          }
        }}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onWheel={(event) => {
          if (!event.shiftKey) {
            return
          }
          event.preventDefault()
          const delta = event.deltaY < 0 ? 0.06 : -0.06
          setZoom(viewport.zoom + delta)
        }}
      >
        <div
          className="inline-block min-w-max cursor-grab p-4 active:cursor-grabbing"
          onMouseDown={(event) => {
            if (event.button !== 0) {
              return
            }
            startDrag(event.clientX, event.clientY)
          }}
        >
          <JourneyGrid
            stages={stages}
            handoffs={handoffs}
            lanes={lanes}
            items={filteredItems}
            thoughtSentiments={data.thoughtSentiments}
            activeHandoffId={activeHandoffId}
            activeLaneId={selectedItem?.laneId ?? null}
            selectedItemId={selectedItemId ?? selectedLocalItemId}
            collapsedLaneIds={collapsedLaneIds}
            onToggleLaneCollapse={toggleLaneCollapse}
            ownership={data.ownership ?? []}
            onSelectItem={(item) => {
              setSelectedLocalItemId(item.id)
              setActiveHandoffId(item.handoffIds[0] ?? null)
              setKpiDetailOpen(false)
              onSelectItem?.(item)
            }}
          />
        </div>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-3 border-t border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <span>
          {stages.length} stages · {handoffs.length} handoffs
        </span>
        <span>
          {lanes.length} swim lanes · {collapsedLaneIds.size} collapsed
        </span>
        <span>{filteredItems.length} mapped items</span>
        <span className="ml-auto">Drag to pan · Shift + scroll to zoom</span>
      </footer>

      <JourneyItemSheet
        open={sheetOpen}
        item={selectedItem}
        handoffs={handoffs}
        lanes={lanes}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLocalItemId(null)
          }
        }}
      />

      <JourneyKpiDetailSheet
        open={kpiDetailOpen}
        kpi={kpi}
        stage={activeStage}
        handoff={activeHandoff}
        onOpenChange={(open) => {
          setKpiDetailOpen(open)
        }}
      />
    </div>
  )
}
