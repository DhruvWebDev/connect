"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Youtube, Users, Video, MessageSquare, CheckSquare, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCreator?: boolean
}

export function Sidebar({ className, isCreator = true }: SidebarProps) {
  const pathname = usePathname()

  const creatorItems = [
    {
      title: "Videos",
      icon: Video,
      href: "/creator/videos"
    },
    {
      title: "Editors",
      icon: Users,
      href: "/creator/editors"
    },
    {
      title: "Chats",
      icon: MessageSquare,
      href: "/creator/chats"
    }
  ]

  const editorItems = [
    {
      title: "Assigned Videos",
      icon: Video,
      href: "/editor/videos"
    },
    {
      title: "Tasks",
      icon: CheckSquare,
      href: "/editor/tasks"
    },
    {
      title: "Chats",
      icon: MessageSquare,
      href: "/editor/chats"
    }
  ]

  const items = isCreator ? creatorItems : editorItems

  return (
    <div className={cn("pb-12 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-8">
            <Youtube className="h-6 w-6 text-red-600" />
            <h2 className="text-lg font-semibold">CreatorFlow</h2>
          </div>
          <div className="space-y-1">
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 px-4 w-full">
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-600">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}