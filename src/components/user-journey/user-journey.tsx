"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { JourneyAtlas } from "@/components/journey-atlas/journey-atlas"
import { mandateLifecycleV05 } from "@/data/journey-atlas"

export function UserJourney() {
  return (
    <AppShell
      title="Journey Atlas"
      contentClassName="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <JourneyAtlas data={mandateLifecycleV05} className="min-h-0 flex-1" />
    </AppShell>
  )
}
