"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, FileVideo, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for assigned videos
const mockVideos = [
  {
    id: "1",
    title: "10 Tips for Better Video Quality",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "assigned",
    uploadDate: "2025-03-10",
    youtuber: "TechTalks",
    deadline: "2025-03-20",
  },
  {
    id: "2",
    title: "How I Edit My Videos - Workflow Explained",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "in-progress",
    uploadDate: "2025-02-28",
    youtuber: "CreativeCorner",
    deadline: "2025-03-15",
  },
  {
    id: "3",
    title: "My Studio Tour 2025",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "completed",
    uploadDate: "2025-03-05",
    youtuber: "TechTalks",
    deadline: "2025-03-12",
  },
]

export default function EditorDashboard() {
  const [videos, setVideos] = useState(mockVideos)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter videos based on search query
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.youtuber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateVideoStatus = (videoId: string, newStatus: string) => {
    setVideos(videos.map((video) => (video.id === videoId ? { ...video, status: newStatus } : video)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Editor Dashboard</h2>
          <p className="text-muted-foreground">Manage your assigned video projects</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Videos</CardTitle>
            <FileVideo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.filter((v) => v.status === "assigned").length}</div>
            <p className="text-xs text-muted-foreground">New assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.filter((v) => v.status === "in-progress").length}</div>
            <p className="text-xs text-muted-foreground">Currently editing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.filter((v) => v.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Finished this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YouTubers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Active collaborations</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} onUpdateStatus={updateVideoStatus} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="assigned" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos
              .filter((video) => video.status === "assigned")
              .map((video) => (
                <VideoCard key={video.id} video={video} onUpdateStatus={updateVideoStatus} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos
              .filter((video) => video.status === "in-progress")
              .map((video) => (
                <VideoCard key={video.id} video={video} onUpdateStatus={updateVideoStatus} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos
              .filter((video) => video.status === "completed")
              .map((video) => (
                <VideoCard key={video.id} video={video} onUpdateStatus={updateVideoStatus} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail: string
    status: string
    uploadDate: string
    youtuber: string
    deadline: string
  }
  onUpdateStatus: (videoId: string, newStatus: string) => void
}

function VideoCard({ video, onUpdateStatus }: VideoCardProps) {
  const statusColors = {
    assigned: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
  }

  const statusText = {
    assigned: "Assigned",
    "in-progress": "In Progress",
    completed: "Completed",
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/editor/videos/${video.id}`}>
        <div className="relative aspect-video w-full overflow-hidden">
          <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="object-cover w-full h-full" />
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${statusColors[video.status as keyof typeof statusColors]}`}
          >
            {statusText[video.status as keyof typeof statusText]}
          </div>
        </div>
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">
          <Link href={`/editor/videos/${video.id}`}>{video.title}</Link>
        </CardTitle>
        <CardDescription>
          From: {video.youtuber}
          <div>Deadline: {video.deadline}</div>
        </CardDescription>
      </CardHeader>
      <div className="p-4 pt-0 flex justify-end">
        {video.status === "assigned" && (
          <Button size="sm" onClick={() => onUpdateStatus(video.id, "in-progress")}>
            Start Editing
          </Button>
        )}
        {video.status === "in-progress" && (
          <Link href={`/editor/videos/${video.id}`}>
            <Button size="sm">Continue Editing</Button>
          </Link>
        )}
        {video.status === "completed" && (
          <Link href={`/editor/videos/${video.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

