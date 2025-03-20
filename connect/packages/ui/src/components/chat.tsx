'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Message, User, Editor } from '@prisma/client'
import { createClient } from '../../utils/supabase/client'

type MessageWithUser = Message & { senderUser?: User, senderEditor?: Editor }

export function Chat() {
  const [messages, setMessages] = useState<MessageWithUser[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const {user} = useUser();
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
    }

    fetchMessages()

    const subscription = supabase
      .channel('message')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Message' }, async (payload) => {
        const newMessage = payload.new as Message
        // Fetch user or editor based on the senderId
        const senderUser = newMessage.senderUserId ? await fetch(`/api/users/${newMessage.senderUserId}`).then(res => res.json()) : null
        const senderEditor = newMessage.senderEditorId ? await fetch(`/api/editors/${newMessage.senderEditorId}`).then(res => res.json()) : null
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, senderUser, senderEditor }
        ])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newMessage.trim()) return

    // Determine if the sender is a User or Editor
    const senderUserId = user.id
    const senderEditorId = null // You can add logic to get Editor's ID if needed

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newMessage.trim(),
        senderUserId, // Use userId for YouTuber
        senderEditorId, // Use editorId for Editor
      }),
    })

    if (response.ok) {
      setNewMessage('')
    } else {
      console.error('Error sending message')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {messages.map((message) => {
            const sender = message.senderUser || message.senderEditor
            return (
              <div key={message.id} className="flex items-start space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={sender?.avatarUrl || undefined} alt={sender?.name || ''} />
                  <AvatarFallback>{sender?.name ? sender.name.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{sender?.name}</p>
                  <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                  <p className="mt-1">{message.content}</p>
                </div>
              </div>
            )
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
