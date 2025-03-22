"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileVideo, Home, LogOut, Settings, User, Video } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  userType: "youtuber" | "editor"
}

export function AppSidebar({ userType }: AppSidebarProps) {
  const pathname = usePathname()

  const basePath = userType === "youtuber" ? "/youtuber" : "/editor"

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: `${basePath}/dashboard`,
    },
    {
      title: "Videos",
      icon: FileVideo,
      href: `${basePath}/videos`,
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: `${basePath}/analytics`,
    },
    {
      title: userType === "youtuber" ? "My Editors" : "My YouTubers",
      icon: User,
      href: `${basePath}/collaborators`,
    },
    {
      title: "Settings",
      icon: Settings,
      href: `${basePath}/settings`,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Video className="h-6 w-6" />
          <span className="font-bold text-xl">VideoCollab</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

