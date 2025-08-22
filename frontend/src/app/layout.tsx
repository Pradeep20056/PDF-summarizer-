import "@/styles/globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
