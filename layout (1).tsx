import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatBot from "@/components/chat-bot"
import ChatScripts from "@/components/chat-scripts"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kick Score - Football Live Scores, Fixtures & Results",
  description:
    "Live football scores, fixtures, match results, player stats, and news for all major football leagues and tournaments.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-black">
            <Header />
            <main className="flex-1 w-full max-w-[1920px] mx-auto">{children}</main>
            <Footer />
            <ChatBot />
            <ChatScripts />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
