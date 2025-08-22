"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send chat message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input) return

    const newMessages = [...messages, { role: "user", text: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        "http://localhost:5000/api/chat/",
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setMessages(prev => [...prev, { role: "bot", text: res.data.reply }])
    } catch (err: any) {
      alert(err.response?.data?.error || "Chat error")
    } finally {
      setLoading(false)
    }
  }

  // Upload PDF & get summary
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    const formData = new FormData()
    formData.append("file", selectedFile)

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post("http://localhost:5000/api/chat/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Show PDF summary in chat as bot message
      setMessages(prev => [...prev, { role: "bot", text: `PDF Summary:\n${res.data.text}` }])
    } catch (err: any) {
      alert(err.response?.data?.error || "PDF upload error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">
      {/* PDF Upload */}
      <Input type="file" accept="application/pdf" onChange={uploadFile} />

      {/* Chat Box */}
      <Card className="h-[400px] overflow-y-auto p-4 bg-white shadow-md">
        <CardContent className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input Box */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </Button>
      </form>
    </div>
  )
}
