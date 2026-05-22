"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardOverview } from "@/components/dashboard/overview"
import { ThemeSwitcher } from "@/components/dashboard/theme-switcher"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-1 data-[orientation=vertical]:h-4"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Overview
          </span>
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">Try free</Button>
          </div>
        </header>
        <DashboardOverview />
      </SidebarInset>
    </SidebarProvider>
  )
}
