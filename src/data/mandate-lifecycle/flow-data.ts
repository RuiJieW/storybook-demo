import type {
  MandateFlowKeyHandoff,
  MandateFlowNodeDetail,
  MandateFlowTool,
} from "@/components/mandate-lifecycle/types"
import { mandateLifecycleV05 } from "@/data/journey-atlas"
import type { JourneyItem } from "@/components/journey-atlas/types"

const tools = {
  figma: { id: "figma", name: "Figma", slug: "figma" },
  storybook: { id: "storybook", name: "Storybook", slug: "storybook" },
  vercel: { id: "vercel", name: "Vercel", slug: "vercel" },
  notion: { id: "notion", name: "Notion", slug: "notion" },
  linear: { id: "linear", name: "Linear", slug: "linear" },
  slack: { id: "slack", name: "Slack", slug: "slack" },
  github: { id: "github", name: "GitHub", slug: "github" },
  cursor: { id: "cursor", name: "Cursor", slug: "cursor" },
  anthropic: { id: "anthropic", name: "Claude", slug: "anthropic" },
  posthog: { id: "posthog", name: "PostHog", slug: "posthog" },
  hubspot: { id: "hubspot", name: "HubSpot", slug: "hubspot" },
  obsidian: { id: "obsidian", name: "Obsidian", slug: "obsidian" },
  gmail: { id: "gmail", name: "Gmail", slug: "gmail" },
  googledrive: { id: "googledrive", name: "Google Drive", slug: "googledrive" },
  miro: { id: "miro", name: "Miro", slug: "miro" },
  fathom: { id: "fathom", name: "Fathom", slug: "fathom" },
  googlecloud: { id: "googlecloud", name: "GCP", slug: "googlecloud" },
  jupyter: { id: "jupyter", name: "Jupyter", slug: "jupyter" },
  openai: { id: "openai", name: "ChatGPT", slug: "openai" },
  terraform: { id: "terraform", name: "Terraform", slug: "terraform" },
} as const satisfies Record<string, MandateFlowTool>

type NodeFilter = Readonly<{
  handoffIds?: string[]
  developmentSubTrack?: string
  laneIds?: string[]
}>

const workflowArchetypes = [
  {
    id: "greenfield",
    name: "Greenfield prototype-first",
    description:
      "Designer builds in Cursor + Vercel; dev adds APIs on demand; same repo, no environment split.",
  },
  {
    id: "brownfield",
    name: "Brownfield designer-in-prod",
    description:
      "Engineer authors CLAUDE.md / setup skill; designer onboards into client branch; PR-back cycle.",
  },
  {
    id: "ai-loop",
    name: "AI experimentation loop",
    description:
      "Notebook calibration → prompt → architecture axes; stable API contract ships early for FE.",
  },
  {
    id: "skill-ops",
    name: "Skill-based ops automation",
    description:
      "Composable skill reads Notion, Linear, Slack, Gmail, calendar, Fathom → draft artifact + Slack ping.",
  },
  {
    id: "locked-down",
    name: "Locked-down environment",
    description:
      "Client policy severs skill graph; every cross-boundary artifact becomes manual copy-paste.",
  },
] as const

function filterItems(filter: NodeFilter): JourneyItem[] {
  return mandateLifecycleV05.items.filter((item) => {
    if (filter.handoffIds?.length) {
      const matchesHandoff = item.handoffIds.some((id) => filter.handoffIds?.includes(id))
      if (!matchesHandoff) {
        return false
      }
    }
    if (filter.developmentSubTrack !== undefined) {
      const inDevelopment = item.handoffIds.includes("development")
      if (inDevelopment && item.developmentSubTrack !== filter.developmentSubTrack) {
        return false
      }
    }
    if (filter.laneIds?.length && !filter.laneIds.includes(item.laneId)) {
      return false
    }
    return true
  })
}

function toListItems(items: JourneyItem[]): MandateFlowNodeDetail["actions"] {
  return items.map((item) => ({
    id: item.id,
    text: item.text,
    tag: item.tag,
    mentionCount: item.evidence.mentionCount,
  }))
}

function getKpi(handoffId: string) {
  return mandateLifecycleV05.kpis.find((entry) => entry.handoffId === handoffId) ?? null
}

function getSentiment(handoffId: string) {
  const value = mandateLifecycleV05.thoughtSentiments?.[handoffId]
  if (value === undefined) {
    return null
  }
  return {
    label: "Interview sentiment",
    value,
    summary:
      value >= 0.7
        ? "Generally positive signals in interviews"
        : value >= 0.45
          ? "Mixed — tensions surfaced alongside progress"
          : "Friction-heavy — recurring pain in this phase",
  }
}

function buildDetail(
  id: string,
  title: string,
  subtitle: string,
  kind: MandateFlowNodeDetail["kind"],
  filter: NodeFilter,
  options?: Readonly<{
    evidenceCount?: number
    workflowIds?: string[]
    extraTouchpoints?: MandateFlowNodeDetail["touchpoints"]
    handoffIdForKpi?: string
    handoffIdForSentiment?: string
  }>
): MandateFlowNodeDetail {
  const items = filterItems(filter)
  const byLane = (laneId: string) => items.filter((item) => item.laneId === laneId)

  const touchpointItems = byLane("touchpoints")
  const touchpoints: MandateFlowNodeDetail["touchpoints"] = [
    ...(options?.extraTouchpoints ?? []),
    ...touchpointItems.map((item) => ({
      id: item.id,
      text: item.text,
      tools: inferTools(item.text),
    })),
  ]

  const kpi = options?.handoffIdForKpi ? getKpi(options.handoffIdForKpi) : null
  const sentiment = options?.handoffIdForSentiment
    ? getSentiment(options.handoffIdForSentiment)
    : null

  const metrics: MandateFlowNodeDetail["metrics"] = kpi
    ? [
        { label: kpi.qualLabel, value: kpi.qualValue, health: kpi.health },
        { label: kpi.quantLabel, value: kpi.quantValue, health: kpi.health },
      ]
    : []

  const sentiments = sentiment ? [sentiment] : byLane("thoughts").map((item) => ({
    label: item.tag,
    value: 0.5,
    summary: item.text,
  }))

  const workflows = (options?.workflowIds ?? [])
    .map((workflowId) => workflowArchetypes.find((entry) => entry.id === workflowId))
    .filter((entry): entry is (typeof workflowArchetypes)[number] => entry !== undefined)

  return {
    id,
    title,
    subtitle,
    kind,
    evidenceCount: options?.evidenceCount,
    actions: toListItems(byLane("actions")),
    touchpoints,
    sentiments,
    metrics,
    painPoints: toListItems(byLane("pain")),
    opportunities: toListItems(byLane("opportunity")),
    recommendations: toListItems(byLane("initiatives")),
    workflows,
  }
}

function inferTools(text: string): MandateFlowTool[] {
  const lower = text.toLowerCase()
  const matched: MandateFlowTool[] = []
  const entries = Object.values(tools)

  for (const tool of entries) {
    if (lower.includes(tool.name.toLowerCase()) || lower.includes(tool.id)) {
      matched.push(tool)
    }
  }

  if (lower.includes("claude") || lower.includes("agents.md")) {
    matched.push(tools.anthropic, tools.cursor)
  }
  if (lower.includes("chatgpt")) {
    matched.push(tools.openai)
  }
  if (lower.includes("prototype repo") || lower.includes("github")) {
    matched.push(tools.github)
  }
  if (lower.includes("notebook")) {
    matched.push(tools.jupyter)
  }
  if (lower.includes("terraform") || lower.includes("gcp")) {
    matched.push(tools.terraform, tools.googlecloud)
  }

  const seen = new Set<string>()
  return matched.filter((tool) => {
    if (seen.has(tool.id)) {
      return false
    }
    seen.add(tool.id)
    return true
  })
}

export const mandateFlowKeyHandoffs: readonly MandateFlowKeyHandoff[] = [
  {
    id: "design-dev",
    label: "Design → Dev",
    evidenceCount: 9,
    example: "Birches: Cadel pointed AI at prototype + prod repo; Ian rebuilt from screenshots",
  },
  {
    id: "ai-dev",
    label: "AI / Data → Dev",
    evidenceCount: 6,
    example: "Gates: Adel hands API to Elodie after notebook calibration on 135 criteria",
  },
  {
    id: "dev-infra",
    label: "Dev → Infra / DevOps",
    evidenceCount: 3,
    example: "JScreen: Rob writes GCP Terraform almost entirely with Claude",
  },
  {
    id: "skill-teammate",
    label: "AI Skill → Teammate",
    evidenceCount: 5,
    example: "LP's weekly-report skill composes PDF + Linear + Fathom sub-skills",
  },
  {
    id: "design-ai",
    label: "Design → AI / Data",
    evidenceCount: 2,
    example: "Gates: Adel learned about AI feedback feature from UI prototype after the fact",
  },
  {
    id: "sales-impl",
    label: "Sales → Implementation",
    evidenceCount: 1,
    example: "Convoy: founder ChatGPT financials treated as raw input, not spec",
  },
  {
    id: "project-eop",
    label: "Project → EOP / Retro / Upsell",
    evidenceCount: 1,
    example: "Chris flags EOP checklist as unfunded, post-billing-cycle workload",
  },
] as const

export const mandateFlowNodeDetails: Record<string, MandateFlowNodeDetail> = {
  sales: buildDetail("sales", "Sales", "Scoping, pitching, contract shape", "stage", {
    handoffIds: ["sales"],
  }, {
    evidenceCount: 1,
    handoffIdForKpi: "sales",
    handoffIdForSentiment: "sales",
    workflowIds: ["locked-down"],
    extraTouchpoints: [{
      id: "tp-hubspot-notion",
      text: "HubSpot deal context → Notion project charter before discovery begins.",
      tools: [tools.hubspot, tools.notion],
    }],
  }),
  discovery: buildDetail(
    "discovery",
    "Discovery",
    "Research, scope alignment, SME vocabulary",
    "stage",
    { handoffIds: ["discovery"] },
    {
      evidenceCount: 4,
      handoffIdForKpi: "discovery",
      handoffIdForSentiment: "discovery",
      extraTouchpoints: [{
        id: "tp-discovery-artifacts",
        text: "Fathom recordings, Miro board, and Google deck for interviews and synthesis.",
        tools: [tools.fathom, tools.miro, tools.googledrive],
      }],
    }
  ),
  design: buildDetail(
    "design",
    "Design / Prototype",
    "Prototype-first handoff bundle",
    "stage",
    { handoffIds: ["development", "start-mandate"], developmentSubTrack: "design" },
    {
      evidenceCount: 9,
      handoffIdForKpi: "development",
      handoffIdForSentiment: "development",
      workflowIds: ["greenfield", "brownfield"],
      extraTouchpoints: [{
        id: "tp-design-chain",
        text: "Figma, Storybook, Vercel previews, and prototype repo as the design-to-dev chain.",
        tools: [tools.figma, tools.storybook, tools.vercel, tools.github],
      }],
    }
  ),
  ai: buildDetail(
    "ai",
    "AI / Data Science",
    "Notebook → API calibration loop",
    "stage",
    { handoffIds: ["development"], developmentSubTrack: "data-ai" },
    {
      evidenceCount: 6,
      workflowIds: ["ai-loop"],
      extraTouchpoints: [{
        id: "tp-notebooks-api",
        text: "Jupyter notebooks, eval datasets, and API contract docs bridging data science to prod.",
        tools: [tools.jupyter, tools.github],
      }],
    }
  ),
  dev: buildDetail(
    "dev",
    "Production Dev",
    "Integration, PR review, feasibility validation",
    "stage",
    { handoffIds: ["development"], developmentSubTrack: "dev" },
    {
      evidenceCount: 9,
      workflowIds: ["greenfield", "brownfield"],
      extraTouchpoints: [{
        id: "tp-dev-stack",
        text: "Cursor + Claude Code in client repo; Storybook-MCP for component lookup.",
        tools: [tools.cursor, tools.anthropic, tools.storybook, tools.github],
      }],
    }
  ),
  infra: buildDetail(
    "infra",
    "Infra / DevOps",
    "Terraform, cloud functions, agent-built infra",
    "stage",
    { handoffIds: ["development"], developmentSubTrack: "infra" },
    {
      evidenceCount: 3,
      extraTouchpoints: [{
        id: "tp-infra-stack",
        text: "GCP Terraform authored via Claude; cost guardrails before apply.",
        tools: [tools.terraform, tools.googlecloud, tools.anthropic],
      }],
    }
  ),
  qa: buildDetail(
    "qa",
    "QA / Live",
    "Staging, e2e, instrumentation, rollout",
    "stage",
    { handoffIds: ["deploy"] },
    {
      evidenceCount: 3,
      handoffIdForKpi: "deploy",
      handoffIdForSentiment: "deploy",
      extraTouchpoints: [{
        id: "tp-qa-stack",
        text: "Staging, e2e suite, PostHog instrumentation, internal cohort as proxy QA.",
        tools: [tools.posthog, tools.vercel],
      }],
    }
  ),
  retro: buildDetail(
    "retro",
    "Retro + EOP",
    "Learning loop, SR&ED evidence, checklist",
    "stage",
    { handoffIds: ["end-of-mandate"] },
    {
      evidenceCount: 1,
      handoffIdForKpi: "end-of-mandate",
      handoffIdForSentiment: "end-of-mandate",
      extraTouchpoints: [{
        id: "tp-eop",
        text: "EOP checklist, retro notes, SR&ED pack in Notion and Linear.",
        tools: [tools.notion, tools.linear],
      }],
    }
  ),
  upsell: buildDetail(
    "upsell",
    "Upsell / Next Phase",
    "Commercial continuation and mandate renewal",
    "stage",
    { handoffIds: ["end-of-mandate"], laneIds: ["opportunity", "initiatives"] },
    {
      evidenceCount: 1,
      extraTouchpoints: [{
        id: "tp-upsell",
        text: "Upsell brief and next-phase scope in HubSpot + Notion.",
        tools: [tools.hubspot, tools.notion],
      }],
    }
  ),
  skills: buildDetail(
    "skills",
    "Glide Skills + Context Registry",
    "Cross-cutting skill graph and project artifacts",
    "support",
    { handoffIds: ["start-mandate", "development"] },
    {
      evidenceCount: 7,
      workflowIds: ["skill-ops"],
      extraTouchpoints: [{
        id: "tp-skills",
        text: "AGENTS.md, DESIGN.md, DATA.MD plus composable Glide Skills repo.",
        tools: [tools.github, tools.cursor, tools.anthropic],
      }],
    }
  ),
  ops: buildDetail(
    "ops",
    "Ops / HR / Marketing",
    "Internal automation and reporting pipelines",
    "support",
    {
      handoffIds: ["start-mandate", "end-of-mandate", "sales"],
      laneIds: ["actions", "touchpoints", "opportunity"],
    },
    {
      evidenceCount: 4,
      workflowIds: ["skill-ops"],
      extraTouchpoints: [{
        id: "tp-ops-stack",
        text: "Notion, Linear, Slack, Gmail, Fathom, Obsidian for daily ops and reporting skills.",
        tools: [tools.notion, tools.linear, tools.slack, tools.gmail, tools.fathom, tools.obsidian],
      }],
    }
  ),
}

export { tools as mandateFlowTools }
