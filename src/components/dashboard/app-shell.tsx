"use client"

import type { ReactNode } from "react"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { ThemeSwitcher } from "@/components/dashboard/theme-switcher"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AppShellProps = Readonly<{
  title: string
  children: ReactNode
  contentClassName?: string
}>

export function AppShell({ title, children, contentClassName }: AppShellProps) {
  return (
    <SidebarProvider className="max-h-[100svh] min-h-0 h-[100svh] overflow-hidden overflow-x-hidden">
      <AppSidebar />
      <SidebarInset className="min-h-0 overflow-hidden bg-background">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-6">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </header>
        <div
          className={
            contentClassName ??
            "flex min-h-0 flex-1 flex-col overflow-hidden"
          }
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
