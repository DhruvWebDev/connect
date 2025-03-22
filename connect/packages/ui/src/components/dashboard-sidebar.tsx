import { Home, Video, Users2, Upload, History, Edit, Key } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r dark:bg-gray-950">
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home className="h-5 w-5" />
            Overview
          </Button>
        </Link>
        <Link href="/dashboard/videos">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Video className="h-5 w-5" />
            Videos
          </Button>
        </Link>
        <Link href="/dashboard/editors">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users2 className="h-5 w-5" />
            Editors
          </Button>
        </Link>
        <Link href="/dashboard/uploads">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Upload className="h-5 w-5" />
            Uploads
          </Button>
        </Link>
        <Link href="/dashboard/history">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <History className="h-5 w-5" />
            History
          </Button>
        </Link>
        <Link href="/dashboard/editor-access">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Key className="h-5 w-5" />
            Editor Access
          </Button>
        </Link>
      </div>
    </div>
  )
}

