"use client"

import type { ReactNode } from "react"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { ThemeSwitcher } from "@/components/dashboard/theme-switcher"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AppShellProps = Readonly<{
  title: string
  children: ReactNode
}>

export function AppShell({ title, children }: AppShellProps) {
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
            {title}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
