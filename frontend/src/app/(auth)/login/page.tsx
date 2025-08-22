"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: any) {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem("token", data.token)
      alert("Login successful")
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle>Login</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}
