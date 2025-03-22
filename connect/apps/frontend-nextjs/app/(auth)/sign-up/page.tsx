import Link from "next/link"
import { Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Video className="h-6 w-6" />
              <span>VideoCollab</span>
            </Link>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup defaultValue="youtuber" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="youtuber" id="youtuber" />
                  <Label htmlFor="youtuber">YouTuber</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="editor" id="editor" />
                  <Label htmlFor="editor">Editor</Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full" type="submit" asChild>
              <Link href="/youtuber/dashboard">Create Account</Link>
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

