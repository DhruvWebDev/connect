"use client"
import Link from "next/link"
import { Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { registerUser } from "@/lib/utils"

export default function SignInPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword]  = useState("");
  const [role, setRole] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Video className="h-6 w-6" />
              <span>VideoCollab</span>
            </Link>
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your email and password to access your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" type="email" onChange={e => se}/>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full" type="submit" asChild onClick={() => registerUser({fullName, email, password, role})}>
              <Link href="/youtuber/dashboard">Sign In</Link>
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline" >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

