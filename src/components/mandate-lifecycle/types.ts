export type MandateFlowNodeKind = "stage" | "support"

export type MandateFlowTool = Readonly<{
  id: string
  name: string
  slug: string
}>

export type MandateFlowListItem = Readonly<{
  id: string
  text: string
  tag?: string
  mentionCount?: number
}>

export type MandateFlowTouchpoint = Readonly<{
  id: string
  text: string
  tools: readonly MandateFlowTool[]
}>

export type MandateFlowSentiment = Readonly<{
  label: string
  value: number
  summary: string
}>

export type MandateFlowMetric = Readonly<{
  label: string
  value: string
  health?: "good" | "warn" | "bad"
}>

export type MandateFlowWorkflowArchetype = Readonly<{
  id: string
  name: string
  description: string
}>

export type MandateFlowNodeDetail = Readonly<{
  id: string
  title: string
  subtitle: string
  kind: MandateFlowNodeKind
  evidenceCount?: number
  actions: readonly MandateFlowListItem[]
  touchpoints: readonly MandateFlowTouchpoint[]
  sentiments: readonly MandateFlowSentiment[]
  metrics: readonly MandateFlowMetric[]
  painPoints: readonly MandateFlowListItem[]
  opportunities: readonly MandateFlowListItem[]
  recommendations: readonly MandateFlowListItem[]
  workflows: readonly MandateFlowWorkflowArchetype[]
}>

export type MandateFlowNodeData = Readonly<{
  detail: MandateFlowNodeDetail
  selected?: boolean
}>

export type MandateFlowKeyHandoff = Readonly<{
  id: string
  label: string
  evidenceCount: number
  example: string
}>
