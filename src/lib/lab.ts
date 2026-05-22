export const storybookUrl =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ??
  "https://storybook-demo-ui.vercel.app"

export type ExperimentStatus = "live" | "draft"

export type LabExperiment = Readonly<{
  id: string
  title: string
  description: string
  href: string
  external?: boolean
  status: ExperimentStatus
  accentIndex: number
}>

export const labExperiments: readonly LabExperiment[] = [
  {
    id: "storybook",
    title: "UI Storybook",
    description:
      "shadcn / Base UI primitives, themes, and the DESIGN.md spec in isolation.",
    href: storybookUrl,
    external: true,
    status: "live",
    accentIndex: 0,
  },
  {
    id: "dashboard",
    title: "Clay dashboard",
    description:
      "Full dashboard shell — charts, tables, and saturated feature cards on the cream canvas.",
    href: "/dashboard",
    status: "live",
    accentIndex: 1,
  },
  {
    id: "design-spec",
    title: "Design system docs",
    description:
      "Token reference and component rules from DESIGN.md inside Storybook.",
    href: `${storybookUrl}/?path=/docs/docs-design-system--docs`,
    external: true,
    status: "live",
    accentIndex: 2,
  },
] as const
