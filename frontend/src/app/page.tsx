"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function LandingPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleGetStarted = () => {
    router.push("/signup")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF")
    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    try {
      // Replace with your backend URL
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "Content-Type": "multipart/form-data",
        },
      })
      setSummary(res.data.text)
    } catch (err: any) {
      alert(err.response?.data?.error || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <Card className="max-w-xl w-full p-6 shadow-lg">
        <CardTitle className="text-2xl text-center mb-4">Welcome to AI Research Assistant 🤖</CardTitle>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleGetStarted} className="w-full">
            Get Started
          </Button>

          <div className="flex flex-col gap-2">
            <Input type="file" accept="application/pdf" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload PDF & Summarize"}
            </Button>
          </div>

          {summary && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">PDF Summary:</h3>
              <p className="text-sm whitespace-pre-line">{summary}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
