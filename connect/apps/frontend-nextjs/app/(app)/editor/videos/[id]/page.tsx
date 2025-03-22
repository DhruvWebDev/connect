"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Download, MessageSquare, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function EditorVideoDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("raw")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [videoStatus, setVideoStatus] = useState("in-progress")
  const [comments, setComments] = useState([
    {
      id: "1",
      author: "TechTalks",
      text: "Please focus on improving the intro section and color grading.",
      timestamp: "2025-03-15 14:30",
    },
    {
      id: "2",
      author: "You",
      text: "I'll work on the intro. Do you have any specific color palette in mind?",
      timestamp: "2025-03-15 15:45",
    },
  ])
  const [newComment, setNewComment] = useState("")

  // Mock video data
  const video = {
    id: params.id,
    title: "10 Tips for Better Video Quality",
    description: "A comprehensive guide to improving video quality for YouTube creators.",
    rawVideo: "/placeholder.svg?height=400&width=800",
    editedVideo: videoStatus === "completed" ? "/placeholder.svg?height=400&width=800" : null,
    thumbnail: "/placeholder.svg?height=120&width=213",
    status: videoStatus,
    uploadDate: "2025-03-10",
    youtuber: "TechTalks",
    deadline: "2025-03-20",
    duration: "08:27",
    notes: "Please improve the intro section and work on color grading throughout the video.",
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: `${comments.length + 1}`,
      author: "You",
      text: newComment,
      timestamp: new Date().toLocaleString(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setVideoStatus("completed")
          return 0
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/editor/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{video.title}</h2>
          <p className="text-muted-foreground">Edit this video for {video.youtuber}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="raw" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="raw">Raw Footage</TabsTrigger>
              <TabsTrigger value="edited" disabled={!video.editedVideo}>
                Your Edit
              </TabsTrigger>
            </TabsList>
            <TabsContent value="raw" className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto h-12 w-12 text-muted-foreground"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                    </svg>
                    <p className="mt-2 text-sm text-muted-foreground">Click to play raw footage</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Raw Footage
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="edited" className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto h-12 w-12 text-muted-foreground"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                    </svg>
                    <p className="mt-2 text-sm text-muted-foreground">Click to play your edit</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Discuss the video with the YouTuber</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddComment}>Add Comment</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[20px_1fr] gap-1">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">YouTuber</div>
                  <div className="text-muted-foreground">{video.youtuber}</div>
                </div>
              </div>

              <div className="grid grid-cols-[20px_1fr] gap-1">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">Upload Date</div>
                  <div className="text-muted-foreground">{video.uploadDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-[20px_1fr] gap-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">Deadline</div>
                  <div className="text-muted-foreground">{video.deadline}</div>
                </div>
              </div>

              <div className="grid grid-cols-[20px_1fr] gap-1">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <div className="font-medium">Notes</div>
                  <div className="text-muted-foreground">{video.notes}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {video.status !== "completed" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Edited Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Edited Video</DialogTitle>
                      <DialogDescription>Upload your edited version of the video</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Upload Progress</span>
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
              )}

              {video.status === "completed" && (
                <Button className="w-full" variant="outline" disabled>
                  Waiting for Approval
                </Button>
              )}

              <Button className="w-full" variant="outline">
                Download Raw Footage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

