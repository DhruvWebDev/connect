"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart, FileVideo, Home, LogOut, Menu, Settings, User, Video, X } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

interface SidebarProps {
  userType: "youtuber" | "editor"
}

export function Sidebar({ userType }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

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
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-background/80 backdrop-blur-sm transition-all duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-card border-r shadow-lg transition-transform duration-200 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Video className="h-6 w-6 text-accent" />
              <span>VideoCollab</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-0 w-full p-4 border-t">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r bg-card">
          <div className="flex items-center h-16 px-4 border-b">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Video className="h-6 w-6 text-accent" />
              <span>VideoCollab</span>
            </Link>
          </div>
          <div className="flex-grow flex flex-col p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="p-4 border-t">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

