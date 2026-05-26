"use client"

import Link from "next/link"
import {
  ArrowUpRightIcon,
  BeakerIcon,
  BookOpenIcon,
  LayoutDashboardIcon,
  MapIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { featureCardSurfaces } from "@/lib/design"
import { labExperiments, storybookUrl, type LabExperiment } from "@/lib/lab"
import { cn } from "@/lib/utils"

const experimentIcons: Record<string, typeof BeakerIcon> = {
  storybook: BookOpenIcon,
  dashboard: LayoutDashboardIcon,
  "user-journey": MapIcon,
  "design-spec": BookOpenIcon,
}

function ExperimentCard({ experiment }: { experiment: LabExperiment }) {
  const accent =
    featureCardSurfaces[
      experiment.accentIndex % featureCardSurfaces.length
    ]
  const Icon = experimentIcons[experiment.id] ?? BeakerIcon
  const linkProps = experiment.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {}

  return (
    <Link
      href={experiment.href}
      className={cn(
        "group flex flex-col gap-4 rounded-xl p-6 transition-opacity hover:opacity-95 md:p-8",
        accent.surface,
      )}
      {...linkProps}
    >
      <div className="flex items-start justify-between gap-3">
        <Icon className={cn("size-5 shrink-0", accent.icon)} />
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="border-0 bg-black/10 text-inherit capitalize"
          >
            {experiment.status}
          </Badge>
          <ArrowUpRightIcon
            className={cn(
              "size-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              accent.icon,
            )}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          {experiment.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed", accent.muted)}>
          {experiment.description}
        </p>
      </div>
    </Link>
  )
}

export function LabHome() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-6 md:gap-12 md:p-8 lg:p-10">
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <BeakerIcon className="size-4" />
          <span>Design lab</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Experiments for UI, tokens, and product shells
        </h1>
        <p className="text-base text-muted-foreground">
          This app is the lab hub. Open Storybook for the component catalog,
          or jump into a live experiment below.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Experiments</h2>
            <p className="text-sm text-muted-foreground">
              Prototypes and references shipped from this repo.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {labExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </section>

      <Card className="rounded-xl border-dashed">
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Storybook deployment</CardTitle>
            <CardDescription className="font-mono text-xs break-all">
              {storybookUrl}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="shrink-0"
            nativeButton={false}
            render={
              <a
                href={storybookUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            View live catalog
            <ArrowUpRightIcon className="size-4" />
          </Button>
        </CardHeader>
      </Card>
    </div>
  )
}
