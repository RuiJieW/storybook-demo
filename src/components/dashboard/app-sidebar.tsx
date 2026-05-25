"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import {
  BeakerIcon,
  BookOpenIcon,
  LayoutDashboardIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { storybookUrl } from "@/lib/lab"

const labItem = {
  title: "Lab",
  href: "/",
  icon: BeakerIcon,
} as const

const experimentItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
] as const

function isNavActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function AppSidebar() {
  const { pathname } = useRouter()

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default"
              render={<Link href="/" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-chart-2 text-primary-foreground">
                <BeakerIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Storybook demo</span>
                <span className="truncate text-xs text-muted-foreground">
                  Design lab
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href={labItem.href} />}
                  isActive={isNavActive(pathname, labItem.href)}
                  tooltip={labItem.title}
                  className="rounded-full data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold"
                >
                  <labItem.icon />
                  <span>{labItem.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Experiments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {experimentItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={isNavActive(pathname, item.href)}
                    tooltip={item.title}
                    className="rounded-full data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Design System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <a
                      href={storybookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  tooltip="Storybook"
                  className="rounded-full"
                >
                  <BookOpenIcon />
                  <span>Storybook</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default">
              <Avatar>
                <AvatarFallback className="bg-chart-3 text-foreground">
                  LB
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Lab workspace</span>
                <span className="truncate text-xs text-muted-foreground">
                  UI experiments
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
