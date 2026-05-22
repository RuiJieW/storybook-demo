"use client"

import { AppShell } from "@/components/dashboard/app-shell"
import { LabHome } from "@/components/lab/lab-home"

export function Lab() {
  return (
    <AppShell title="Lab">
      <LabHome />
    </AppShell>
  )
}
