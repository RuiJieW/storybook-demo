"use client"

import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  useReactFlow,
} from "@xyflow/react"
import { useCallback, useMemo, useState } from "react"

import "@xyflow/react/dist/style.css"

import { MandateFlowNode } from "@/components/mandate-lifecycle/mandate-flow-node"
import { MandateLifecyclePanel } from "@/components/mandate-lifecycle/mandate-lifecycle-panel"
import { MandateLifecycleToolbar } from "@/components/mandate-lifecycle/mandate-lifecycle-toolbar"
import type { MandateFlowNodeData } from "@/components/mandate-lifecycle/types"
import {
  mandateFlowKeyHandoffs,
  mandateFlowNodeDetails,
} from "@/data/mandate-lifecycle/flow-data"
import { cn } from "@/lib/utils"

const nodeTypes = {
  mandateNode: MandateFlowNode,
}

const initialNodes: Node<MandateFlowNodeData>[] = [
  { id: "sales", type: "mandateNode", position: { x: 0, y: 220 }, data: { detail: mandateFlowNodeDetails.sales } },
  { id: "discovery", type: "mandateNode", position: { x: 220, y: 220 }, data: { detail: mandateFlowNodeDetails.discovery } },
  { id: "design", type: "mandateNode", position: { x: 460, y: 220 }, data: { detail: mandateFlowNodeDetails.design } },
  { id: "ai", type: "mandateNode", position: { x: 620, y: 40 }, data: { detail: mandateFlowNodeDetails.ai } },
  { id: "dev", type: "mandateNode", position: { x: 720, y: 220 }, data: { detail: mandateFlowNodeDetails.dev } },
  { id: "infra", type: "mandateNode", position: { x: 900, y: 380 }, data: { detail: mandateFlowNodeDetails.infra } },
  { id: "qa", type: "mandateNode", position: { x: 980, y: 220 }, data: { detail: mandateFlowNodeDetails.qa } },
  { id: "retro", type: "mandateNode", position: { x: 1220, y: 220 }, data: { detail: mandateFlowNodeDetails.retro } },
  { id: "upsell", type: "mandateNode", position: { x: 1460, y: 220 }, data: { detail: mandateFlowNodeDetails.upsell } },
  { id: "skills", type: "mandateNode", position: { x: 520, y: 420 }, data: { detail: mandateFlowNodeDetails.skills } },
  { id: "ops", type: "mandateNode", position: { x: 1080, y: 420 }, data: { detail: mandateFlowNodeDetails.ops } },
]

function buildEdges(): Edge[] {
  const main: Edge[] = [
    { id: "e-sales-discovery", source: "sales", target: "discovery", label: "Sales → Implementation", data: { keyHandoff: "sales-impl" } },
    { id: "e-discovery-design", source: "discovery", target: "design" },
    { id: "e-design-dev", source: "design", target: "dev", label: "Design → Dev", data: { keyHandoff: "design-dev" } },
    { id: "e-design-ai", source: "design", target: "ai", sourceHandle: "top", targetHandle: "top", label: "Design → AI", data: { keyHandoff: "design-ai" } },
    { id: "e-ai-dev", source: "ai", target: "dev", sourceHandle: "bottom", targetHandle: "top", label: "AI → Dev", data: { keyHandoff: "ai-dev" } },
    { id: "e-dev-infra", source: "dev", target: "infra", sourceHandle: "bottom", targetHandle: "top", label: "Dev → Infra", data: { keyHandoff: "dev-infra" } },
    { id: "e-dev-qa", source: "dev", target: "qa" },
    { id: "e-qa-retro", source: "qa", target: "retro", label: "Project → EOP", data: { keyHandoff: "project-eop" } },
    { id: "e-retro-upsell", source: "retro", target: "upsell" },
  ]

  const skillEdges: Edge[] = ["design", "dev", "ai", "infra", "ops"].map((target) => ({
    id: `e-skills-${target}`,
    source: "skills",
    target,
    sourceHandle: "bottom",
    targetHandle: target === "ai" || target === "infra" ? "top" : undefined,
    type: "smoothstep",
    animated: false,
    style: { strokeDasharray: "6 4", stroke: "var(--chart-5)" },
    label: target === "design" ? "Skill → Teammate" : undefined,
    data: { keyHandoff: target === "design" ? "skill-teammate" : undefined },
  }))

  return [...main, ...skillEdges].map((edge) => ({
    ...edge,
    type: edge.type ?? "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
    labelStyle: edge.data?.keyHandoff
      ? { fill: "var(--chart-1)", fontWeight: 600, fontSize: 10 }
      : { fill: "var(--muted-foreground)", fontSize: 10 },
    style: edge.data?.keyHandoff
      ? { stroke: "var(--chart-1)", strokeWidth: 2, ...edge.style }
      : { stroke: "var(--border)", strokeWidth: 1.5, ...edge.style },
  }))
}

function MandateLifecycleCanvasInner() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const { fitView, zoomIn, zoomOut } = useReactFlow()

  const edges = useMemo(() => buildEdges(), [])
  const nodes = useMemo(
    () =>
      initialNodes.map((node) => ({
        ...node,
        selected: node.id === selectedNodeId,
      })),
    [selectedNodeId]
  )
  const selectedDetail =
    selectedNodeId !== null ? mandateFlowNodeDetails[selectedNodeId] ?? null : null

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <MandateLifecycleToolbar
        zoom={zoom}
        keyHandoffs={mandateFlowKeyHandoffs}
        onZoomIn={() => zoomIn({ duration: 200 })}
        onZoomOut={() => zoomOut({ duration: 200 })}
        onZoomFit={() => fitView({ padding: 0.2, duration: 300 })}
      />

      <div className="relative min-h-0 flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onMove={(_, viewportState) => setZoom(viewportState.zoom)}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.35}
          maxZoom={1.75}
          panOnDrag
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          selectionOnDrag={false}
          proOptions={{ hideAttribution: true }}
          className="bg-background"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1.25}
            color="color-mix(in oklab, var(--foreground) 12%, transparent)"
          />
          <Controls
            className={cn(
              "gap-px overflow-hidden rounded-md border bg-card p-1 shadow-sm",
              "[&>button]:rounded-md [&>button]:border-none [&>button]:bg-transparent [&>button]:hover:bg-muted"
            )}
            showInteractive={false}
          />
        </ReactFlow>

        <MandateLifecyclePanel
          detail={selectedDetail}
          onClose={() => setSelectedNodeId(null)}
        />
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-3 border-t border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <span>{initialNodes.length} nodes · {mandateFlowKeyHandoffs.length} key handoffs</span>
        <span className="ml-auto">Drag to pan · Scroll to zoom · Click a node for details</span>
      </footer>
    </div>
  )
}

export function MandateLifecycleCanvas() {
  return (
    <ReactFlowProvider>
      <MandateLifecycleCanvasInner />
    </ReactFlowProvider>
  )
}
