"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignup(e: any) {
    e.preventDefault()
    await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    alert("Signup successful")
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle>Sign Up</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button className="w-full">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  )
}
