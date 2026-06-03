"use client"

import { memo } from "react"
import type { Node, NodeProps } from "@xyflow/react"
import { Handle, Position } from "@xyflow/react"

import type { MandateFlowNodeData } from "@/components/mandate-lifecycle/types"
import { cn } from "@/lib/utils"

export type MandateLifecycleFlowNode = Node<MandateFlowNodeData, "mandateNode">

function MandateFlowNodeComponent({ data, selected }: NodeProps<MandateLifecycleFlowNode>) {
  const { detail } = data
  const isSupport = detail.kind === "support"

  return (
    <div
      className={cn(
        "min-w-[148px] max-w-[180px] rounded-lg border-2 bg-card px-3 py-2.5 shadow-sm transition-shadow",
        isSupport
          ? "border-dashed border-chart-5/50 bg-chart-5/5"
          : "border-border bg-card",
        selected && "border-primary shadow-md ring-2 ring-primary/20"
      )}
    >
      <Handle type="target" position={Position.Left} className="!size-2 !border-background !bg-muted-foreground" />
      <Handle type="source" position={Position.Right} className="!size-2 !border-background !bg-muted-foreground" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!size-2 !border-background !bg-muted-foreground"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!size-2 !border-background !bg-muted-foreground"
      />

      <p className="text-sm leading-snug font-semibold text-foreground">{detail.title}</p>
      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
        {detail.subtitle}
      </p>
      {detail.evidenceCount !== undefined ? (
        <p className="mt-2 text-[10px] font-medium tracking-wide text-chart-1 uppercase">
          {detail.evidenceCount} interview mentions
        </p>
      ) : null}
    </div>
  )
}

export const MandateFlowNode = memo(MandateFlowNodeComponent)
