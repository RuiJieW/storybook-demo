"use client"

import { cn } from "@/lib/utils"

/** 0 = negative pole, 1 = positive pole; values outside range are clamped. */
export function JourneyThoughtSentimentBar({
  value,
  handoffLabel,
}: Readonly<{ value: number | null; handoffLabel?: string }>) {
  const hasScore = typeof value === "number" && !Number.isNaN(value)
  const pct = hasScore ? Math.min(100, Math.max(0, Math.round(value * 100))) : null
  const positionPct = hasScore ? Math.min(100, Math.max(0, value! * 100)) : null

  return (
    <div
      role="group"
      className={cn("relative mb-2 w-full shrink-0 select-none border border-border")}
      aria-label={
        hasScore && handoffLabel
          ? `Thought sentiment for ${handoffLabel}: ${pct} out of 100`
          : hasScore
            ? `Thought sentiment: ${pct} out of 100`
            : "Thought sentiment not scored for this handoff column"
      }
    >
      <div className="relative h-[26px] w-full overflow-visible rounded-[2px]">
        <div
          className="absolute inset-0 rounded-[2px]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--destructive) 0%, var(--chart-4) 35%, var(--chart-4) 65%, #2f6f3e 100%)",
          }}
        />
        {hasScore ? (
          <div
            className="pointer-events-none absolute top-[-3px] bottom-[-3px] w-[3px] -translate-x-1/2 bg-foreground"
            style={{
              left: `${positionPct}%`,
            }}
          >
            <span className="absolute bottom-[calc(100%+2px)] left-1/2 -translate-x-1/2 bg-foreground px-1 py-px font-mono text-[9px] leading-none whitespace-nowrap text-background tabular-nums">
              {pct}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center rounded-[2px] bg-background/65 backdrop-blur-[1px]">
            <span className="text-[10px] text-muted-foreground">No sentiment score</span>
          </div>
        )}
      </div>
    </div>
  )
}
