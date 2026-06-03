"use client"

import { cn } from "@/lib/utils"
import type { MandateFlowTool } from "@/components/mandate-lifecycle/types"

type ToolLogoProps = Readonly<{
  tool: MandateFlowTool
  size?: number
  className?: string
}>

export function ToolLogo({ tool, size = 18, className }: ToolLogoProps) {
  return (
    <span
      title={tool.name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm bg-background ring-1 ring-border",
        className
      )}
      style={{ width: size + 6, height: size + 6 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${tool.slug}`}
        alt=""
        width={size}
        height={size}
        className="opacity-90 dark:invert"
        loading="lazy"
      />
    </span>
  )
}

type ToolLogoRowProps = Readonly<{
  tools: readonly MandateFlowTool[]
  size?: number
}>

export function ToolLogoRow({ tools, size = 18 }: ToolLogoRowProps) {
  if (tools.length === 0) {
    return null
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {tools.map((tool) => (
        <ToolLogo key={tool.id} tool={tool} size={size} />
      ))}
    </span>
  )
}
