export type JourneyHealth = "good" | "warn" | "bad"
export type JourneySeverity = "low" | "med" | "high"
export type JourneyImpact = "low" | "med" | "high"
export type JourneyStatus = "planned" | "active" | "shipped"
export type JourneyTier = "tier-1" | "tier-2" | "tier-3"
export type JourneyDevelopmentSubTrack = "design" | "dev" | "data-ai" | "infra"

export type JourneyMeta = Readonly<{
  id: string
  title: string
  subtitle: string
  version: string
  synthesisAsOf: string
  frozenAt: string
  sourceDoc: string
}>

export type JourneyLifecycleStage = Readonly<{
  id: string
  num: string
  name: string
  order: number
  meta?: string
}>

export type JourneyHandoff = Readonly<{
  id: string
  name: string
  order: number
  evidenceCount: number
  lifecycleStageId: string
  description?: string
}>

export type JourneyLane = Readonly<{
  id: string
  name: string
  order: number
  description?: string
}>

export type JourneyEvidence = Readonly<{
  mentionCount: number
  interviews?: string[]
  projects?: string[]
  sourceSections: string[]
}>

export type JourneyItem = Readonly<{
  id: string
  laneId: string
  handoffIds: string[]
  tag: string
  text: string
  severity?: JourneySeverity
  impact?: JourneyImpact
  status?: JourneyStatus
  tier?: JourneyTier | null
  archetypes?: string[]
  notionPageId?: string | null
  /** Sub-track within the Development stage column (design, dev, data/AI, infra). */
  developmentSubTrack?: JourneyDevelopmentSubTrack
  evidence: JourneyEvidence
}>

export type JourneyKpi = Readonly<{
  handoffId: string
  qualLabel: string
  qualValue: string
  quantLabel: string
  quantValue: string
  health: JourneyHealth
  detailBullets?: string[]
  spark?: number[]
}>

export type JourneyAtlasData = Readonly<{
  meta: JourneyMeta
  stages: JourneyLifecycleStage[]
  handoffs: JourneyHandoff[]
  lanes: JourneyLane[]
  items: JourneyItem[]
  kpis: JourneyKpi[]
  /** Per-handoff sentiment for the Thoughts lane (0 = negative, 1 = positive). Mirrors `emotion` bars in journey.html. */
  thoughtSentiments?: Readonly<Partial<Record<string, number>>>
}>
