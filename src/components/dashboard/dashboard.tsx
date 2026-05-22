"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { DashboardOverview } from "@/components/dashboard/overview"

export function Dashboard() {
  return (
    <AppShell title="Clay dashboard">
      <DashboardOverview />
    </AppShell>
  )
}
