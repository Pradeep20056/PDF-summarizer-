"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">AI Research Assistant 🤖</h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/chat" className="hover:text-blue-600">Chatbot</Link>
        <Link href="/history" className="hover:text-blue-600">History</Link>
        <Link href="/profile" className="hover:text-blue-600">Profile</Link>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
              <Link href="/chat" onClick={() => setOpen(false)}>Chatbot</Link>
              <Link href="/history" onClick={() => setOpen(false)}>History</Link>
              <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
