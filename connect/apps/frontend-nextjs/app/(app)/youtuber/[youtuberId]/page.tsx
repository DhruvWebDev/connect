"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, FileVideo, Plus, Upload, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for videos
const mockVideos = [
  {
    id: "1",
    title: "How to Start a YouTube Channel in 2025",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "raw",
    uploadDate: "2025-03-15",
    editor: null,
  },
  {
    id: "2",
    title: "10 Tips for Better Video Quality",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "assigned",
    uploadDate: "2025-03-10",
    editor: "John Editor",
  },
  {
    id: "3",
    title: "My Studio Tour 2025",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "completed",
    uploadDate: "2025-03-05",
    editor: "Sarah Editor",
  },
]

export default function YouTuberDashboard() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [videos, setVideos] = useState(mockVideos)

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add new video to the list
          const newVideo = {
            id: `${videos.length + 1}`,
            title: "New Uploaded Video",
            thumbnail: "/placeholder.svg?height=120&width=213",
            status: "raw",
            uploadDate: new Date().toISOString().split("T")[0],
            editor: null,
          }

          setVideos([newVideo, ...videos])
          return 0
        }
        return prev + 5
      })
    }, 200)
  }

  const assignEditor = (videoId: string, editorName: string) => {
    setVideos(
      videos.map((video) => (video.id === videoId ? { ...video, status: "assigned", editor: editorName } : video)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Manage your videos and collaborations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Upload className="h-4 w-4" />
              Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Video</DialogTitle>
              <DialogDescription>Upload your raw footage to assign to an editor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input id="title" placeholder="Enter video title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Video File</Label>
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" />
                </div>
              </div>
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Upload Progress</Label>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploading(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <FileVideo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Edits</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.filter((v) => v.status === "assigned").length}</div>
            <p className="text-xs text-muted-foreground">-1 from last week</p>
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
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Editors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 new editor this month</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="raw">Raw Footage</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Link href="/youtuber/videos">
            <Button variant="outline" size="sm">
              View All
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onAssign={assignEditor} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="raw" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos
              .filter((video) => video.status === "raw")
              .map((video) => (
                <VideoCard key={video.id} video={video} onAssign={assignEditor} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="assigned" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos
              .filter((video) => video.status === "assigned")
              .map((video) => (
                <VideoCard key={video.id} video={video} onAssign={assignEditor} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos
              .filter((video) => video.status === "completed")
              .map((video) => (
                <VideoCard key={video.id} video={video} onAssign={assignEditor} />
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
    editor: string | null
  }
  onAssign: (videoId: string, editorName: string) => void
}

function VideoCard({ video, onAssign }: VideoCardProps) {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  const statusColors = {
    raw: "bg-yellow-500",
    assigned: "bg-blue-500",
    completed: "bg-green-500",
  }

  const statusText = {
    raw: "Raw Footage",
    assigned: "Assigned",
    completed: "Completed",
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/youtuber/videos/${video.id}`}>
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
          <Link href={`/youtuber/videos/${video.id}`}>{video.title}</Link>
        </CardTitle>
        <CardDescription>
          Uploaded on {video.uploadDate}
          {video.editor && <div>Assigned to: {video.editor}</div>}
        </CardDescription>
      </CardHeader>
      <div className="p-4 pt-0 flex justify-end">
        {video.status === "raw" && (
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Assign Editor</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Editor</DialogTitle>
                <DialogDescription>Select an editor to work on this video</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="editor">Select Editor</Label>
                  <select
                    id="editor"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="John Editor">John Editor</option>
                    <option value="Sarah Editor">Sarah Editor</option>
                    <option value="Mike Editor">Mike Editor</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onAssign(video.id, "John Editor")
                    setIsAssignDialogOpen(false)
                  }}
                >
                  Assign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {video.status === "assigned" && (
          <Button size="sm" variant="outline" disabled>
            In Progress
          </Button>
        )}
        {video.status === "completed" && (
          <Link href={`/youtuber/videos/${video.id}`}>
            <Button size="sm" variant="outline">
              View Final
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

