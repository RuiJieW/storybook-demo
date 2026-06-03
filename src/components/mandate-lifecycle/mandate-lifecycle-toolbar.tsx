"use client"

import { MinusIcon, PlusIcon, ScanIcon } from "lucide-react"

import { TobogganLogo } from "@/components/brand/toboggan-logo"
import type { MandateFlowKeyHandoff } from "@/components/mandate-lifecycle/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MandateLifecycleToolbarProps = Readonly<{
  zoom: number
  keyHandoffs: readonly MandateFlowKeyHandoff[]
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomFit: () => void
}>

export function MandateLifecycleToolbar({
  zoom,
  keyHandoffs,
  onZoomIn,
  onZoomOut,
  onZoomFit,
}: MandateLifecycleToolbarProps) {
  return (
    <header className="z-30 shrink-0 border-b border-border bg-primary text-primary-foreground shadow-[0_6px_16px_-8px_rgba(0,0,0,0.18)]">
      <div className="flex min-h-16 items-center gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <TobogganLogo variant="icon" color="white" className="size-5" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Mandate Lifecycle</p>
            <p className="truncate text-xs text-primary-foreground/80">
              Seven handoffs · May 2026 synthesis
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
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
        <span className="text-[11px] tracking-wide text-primary-foreground/70 uppercase">
          Key handoffs
        </span>
        {keyHandoffs.map((handoff) => (
          <span
            key={handoff.id}
            className={cn(
              "rounded-md border border-primary-foreground/35 px-2 py-1 text-xs text-primary-foreground/90"
            )}
            title={handoff.example}
          >
            {handoff.label}
            <span className="ml-1.5 tabular-nums text-primary-foreground/60">
              ({handoff.evidenceCount})
            </span>
          </span>
        ))}
      </div>
    </header>
  )
}
