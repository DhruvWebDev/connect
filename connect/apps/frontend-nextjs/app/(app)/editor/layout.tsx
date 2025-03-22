import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar userType="editor" />
      <SidebarInset className="p-4 md:p-6">{children}</SidebarInset>
    </SidebarProvider>
  )
}

