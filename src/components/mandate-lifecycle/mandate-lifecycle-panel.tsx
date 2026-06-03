"use client"

import type { ReactNode } from "react"
import { XIcon } from "lucide-react"

import { ToolLogoRow } from "@/components/mandate-lifecycle/tool-logo"
import type { MandateFlowNodeDetail } from "@/components/mandate-lifecycle/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MandateLifecyclePanelProps = Readonly<{
  detail: MandateFlowNodeDetail | null
  onClose: () => void
  className?: string
}>

function healthClass(health?: "good" | "warn" | "bad") {
  if (health === "good") {
    return "border-chart-1/30 bg-chart-1/10 text-chart-1"
  }
  if (health === "warn") {
    return "border-chart-4/30 bg-chart-4/10 text-chart-4"
  }
  if (health === "bad") {
    return "border-destructive/30 bg-destructive/10 text-destructive"
  }
  return "border-border bg-muted/40 text-muted-foreground"
}

function Section({
  title,
  children,
  empty,
}: Readonly<{
  title: string
  children: ReactNode
  empty?: boolean
}>) {
  if (empty) {
    return null
  }

  return (
    <section className="space-y-2">
      <h3 className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

function ListBlock({
  items,
  variant = "default",
}: Readonly<{
  items: readonly { id: string; text: string; tag?: string; mentionCount?: number }[]
  variant?: "default" | "pain" | "opportunity" | "recommendation"
}>) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "rounded-md border px-3 py-2 text-sm leading-snug",
            variant === "pain" && "border-destructive/20 bg-destructive/5",
            variant === "opportunity" && "border-chart-5/25 bg-chart-5/8",
            variant === "recommendation" && "border-primary/20 bg-primary/5",
            variant === "default" && "border-border bg-muted/20"
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            {item.tag ? (
              <Badge variant="outline" className="text-[10px]">
                {item.tag}
              </Badge>
            ) : null}
            {item.mentionCount !== undefined ? (
              <span className="text-[10px] text-muted-foreground">
                {item.mentionCount} mentions
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-foreground">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function MandateLifecyclePanel({
  detail,
  onClose,
  className,
}: MandateLifecyclePanelProps) {
  if (!detail) {
    return null
  }

  return (
    <aside
      className={cn(
        "pointer-events-auto absolute top-3 right-3 z-20 flex max-h-[calc(100%-1.5rem)] w-[min(420px,calc(100%-1.5rem))] flex-col overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-sm",
        className
      )}
    >
      <header className="flex shrink-0 items-start gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-foreground">{detail.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{detail.subtitle}</p>
          {detail.evidenceCount !== undefined ? (
            <p className="mt-1 text-xs text-chart-1">
              {detail.evidenceCount} cross-interview mentions
            </p>
          ) : null}
        </div>
        <Button size="icon-sm" variant="ghost" onClick={onClose} aria-label="Close panel">
          <XIcon />
        </Button>
      </header>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <Section title="Actions" empty={detail.actions.length === 0}>
          <ListBlock items={detail.actions} />
        </Section>

        <Section title="Touchpoints" empty={detail.touchpoints.length === 0}>
          <ul className="space-y-2">
            {detail.touchpoints.map((touchpoint) => (
              <li
                key={touchpoint.id}
                className="rounded-md border border-border bg-muted/20 px-3 py-2 text-sm"
              >
                <ToolLogoRow tools={touchpoint.tools} />
                <p className="mt-2 leading-snug text-foreground">{touchpoint.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Sentiments" empty={detail.sentiments.length === 0}>
          <ul className="space-y-2">
            {detail.sentiments.map((sentiment, index) => (
              <li
                key={`${sentiment.label}-${index}`}
                className="rounded-md border border-border bg-muted/20 px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {sentiment.label}
                  </span>
                  <span className="text-xs tabular-nums text-foreground">
                    {Math.round(sentiment.value * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-chart-3 transition-all"
                    style={{ width: `${Math.round(sentiment.value * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-muted-foreground">{sentiment.summary}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Metrics" empty={detail.metrics.length === 0}>
          <div className="grid gap-2">
            {detail.metrics.map((metric) => (
              <div
                key={metric.label}
                className={cn("rounded-md border px-3 py-2", healthClass(metric.health))}
              >
                <p className="text-[11px] font-medium uppercase opacity-80">{metric.label}</p>
                <p className="mt-0.5 text-sm font-medium">{metric.value}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Pain points" empty={detail.painPoints.length === 0}>
          <ListBlock items={detail.painPoints} variant="pain" />
        </Section>

        <Section title="Opportunities" empty={detail.opportunities.length === 0}>
          <ListBlock items={detail.opportunities} variant="opportunity" />
        </Section>

        <Section title="Recommendations" empty={detail.recommendations.length === 0}>
          <ListBlock items={detail.recommendations} variant="recommendation" />
        </Section>

        <Section title="Workflows" empty={detail.workflows.length === 0}>
          <ul className="space-y-2">
            {detail.workflows.map((workflow) => (
              <li
                key={workflow.id}
                className="rounded-md border border-chart-2/25 bg-chart-2/8 px-3 py-2 text-sm"
              >
                <p className="font-medium text-foreground">{workflow.name}</p>
                <p className="mt-1 text-muted-foreground">{workflow.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </aside>
  )
}
