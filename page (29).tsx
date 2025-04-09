"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"

export default function WelcomePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const firstName = user.name.split(" ")[0]

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-black">
      <motion.div
        className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[500px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="h-24 w-24 overflow-hidden rounded-full">
            {user.photoURL ? (
              <Image
                src={user.photoURL || "/placeholder.svg"}
                alt={user.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-600 text-3xl font-bold text-white">
                {firstName.charAt(0)}
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">Welcome, {firstName}!</h1>

          <p className="text-xl text-gray-400">Your Kick Score journey begins now</p>
        </div>

        <div className="space-y-6">
          <p className="text-center text-gray-400">
            Get ready to experience football like never before. Stay updated with live scores, stats, and news about
            your favorite teams and players.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-[#333] bg-[#111] p-4 text-center">
              <h3 className="font-medium text-white">Live Scores</h3>
              <p className="text-sm text-gray-500">Real-time updates</p>
            </div>
            <div className="rounded-lg border border-[#333] bg-[#111] p-4 text-center">
              <h3 className="font-medium text-white">Stats</h3>
              <p className="text-sm text-gray-500">Detailed analytics</p>
            </div>
            <div className="rounded-lg border border-[#333] bg-[#111] p-4 text-center">
              <h3 className="font-medium text-white">News</h3>
              <p className="text-sm text-gray-500">Latest updates</p>
            </div>
          </div>

          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700 w-full" size="lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
