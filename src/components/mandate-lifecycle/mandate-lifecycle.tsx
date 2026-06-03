"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { MandateLifecycleCanvas } from "@/components/mandate-lifecycle/mandate-lifecycle-canvas"

export function MandateLifecycle() {
  return (
    <AppShell
      title="Mandate Lifecycle"
      contentClassName="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <MandateLifecycleCanvas />
    </AppShell>
  )
}
