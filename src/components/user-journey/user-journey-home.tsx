"use client"

import Link from "next/link"
import { MapIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function UserJourneyHome() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6 md:gap-10 md:p-8 lg:p-10">
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapIcon className="size-4" />
          <span>Experiment</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          User Journey
        </h1>
        <p className="text-base text-muted-foreground">
          Map interdisciplinary handoffs and workflow archetypes from interview
          synthesis into journey views.
        </p>
      </div>

      <Card className="max-w-2xl rounded-xl">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-2">
            <CardTitle>Getting started</CardTitle>
            <Badge variant="secondary">Draft</Badge>
          </div>
          <CardDescription>
            Source material lives in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              docs/toboggan-workflow-discovery-interview-synthesis.md
            </code>
            . Journey diagrams and interactive maps will ship here next.
          </CardDescription>
        </CardHeader>
      </Card>

      <p className="text-sm text-muted-foreground">
        <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
          Back to lab
        </Link>
      </p>
    </div>
  )
}
