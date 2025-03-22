"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Filter, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for videos
const mockVideos = [
  {
    id: "1",
    title: "How to Start a YouTube Channel in 2025",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "raw",
    uploadDate: "2025-03-15",
    editor: null,
    duration: "15:42",
  },
  {
    id: "2",
    title: "10 Tips for Better Video Quality",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "assigned",
    uploadDate: "2025-03-10",
    editor: "John Editor",
    duration: "08:27",
  },
  {
    id: "3",
    title: "My Studio Tour 2025",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "completed",
    uploadDate: "2025-03-05",
    editor: "Sarah Editor",
    duration: "22:15",
  },
  {
    id: "4",
    title: "Camera Gear Review - Best Budget Options",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "raw",
    uploadDate: "2025-03-02",
    editor: null,
    duration: "18:33",
  },
  {
    id: "5",
    title: "How I Edit My Videos - Workflow Explained",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "assigned",
    uploadDate: "2025-02-28",
    editor: "Mike Editor",
    duration: "12:50",
  },
  {
    id: "6",
    title: "Q&A - Answering Your Questions About YouTube",
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: "completed",
    uploadDate: "2025-02-25",
    editor: "John Editor",
    duration: "25:18",
  },
]

export default function VideosPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [videos, setVideos] = useState(mockVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
            duration: "10:00",
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

  // Filter videos based on search query and status filter
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || video.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Videos</h2>
          <p className="text-muted-foreground">Manage all your video projects</p>
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

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Videos</SelectItem>
            <SelectItem value="raw">Raw Footage</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredVideos.map((video) => (
          <VideoListItem key={video.id} video={video} onAssign={assignEditor} />
        ))}

        {filteredVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No videos found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

interface VideoListItemProps {
  video: {
    id: string
    title: string
    thumbnail: string
    status: string
    uploadDate: string
    editor: string | null
    duration: string
  }
  onAssign: (videoId: string, editorName: string) => void
}

function VideoListItem({ video, onAssign }: VideoListItemProps) {
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
    <Card>
      <div className="flex flex-col md:flex-row">
        <Link href={`/youtuber/videos/${video.id}`} className="md:w-1/4 lg:w-1/5">
          <div className="relative aspect-video w-full overflow-hidden">
            <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="object-cover w-full h-full" />
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 text-xs text-white">
              {video.duration}
            </div>
          </div>
        </Link>
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link href={`/youtuber/videos/${video.id}`}>
                <h3 className="font-semibold text-lg hover:underline">{video.title}</h3>
              </Link>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>Uploaded on {video.uploadDate}</span>
                <span className="hidden md:inline">•</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs text-white ${statusColors[video.status as keyof typeof statusColors]}`}
                >
                  {statusText[video.status as keyof typeof statusText]}
                </span>
                {video.editor && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span>Assigned to: {video.editor}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2 self-end md:self-auto">
              <Link href={`/youtuber/videos/${video.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>

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
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

