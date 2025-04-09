"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import confetti from "canvas-confetti"

export default function RegistrationCompletePage() {
  const router = useRouter()
  const { register } = useAuth()
  const [firstName, setFirstName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if we have the data from previous steps
    const email = sessionStorage.getItem("registerEmail")
    const firstName = sessionStorage.getItem("registerFirstName")
    const lastName = sessionStorage.getItem("registerLastName")
    const password = sessionStorage.getItem("registerPassword")

    if (!email || !firstName || !password) {
      router.push("/login/email")
      return
    }

    setFirstName(firstName)

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [router])

  const handleContinue = async () => {
    setIsLoading(true)

    try {
      const email = sessionStorage.getItem("registerEmail") || ""
      const firstName = sessionStorage.getItem("registerFirstName") || ""
      const lastName = sessionStorage.getItem("registerLastName") || ""
      const password = sessionStorage.getItem("registerPassword") || ""
      const photo = sessionStorage.getItem("registerPhoto") || undefined

      // Register the user
      await register(`${firstName} ${lastName}`.trim(), email, password, photo)

      // Clear registration data from session storage
      sessionStorage.removeItem("registerEmail")
      sessionStorage.removeItem("registerFirstName")
      sessionStorage.removeItem("registerLastName")
      sessionStorage.removeItem("registerPassword")
      sessionStorage.removeItem("registerPhoto")
      sessionStorage.removeItem("registerPhotoRotation")
      sessionStorage.removeItem("registerPhotoZoom")

      // Redirect to preferences page
      router.push("/customize")
    } catch (error) {
      console.error("Error completing registration:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-black">
      <motion.div
        className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-green-600/20 p-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">All set!</h1>
          <p className="text-lg text-gray-400">Your account has been created successfully</p>
        </div>

        <div className="grid gap-6">
          <p className="text-center text-gray-400">
            Welcome to Kick Score, {firstName}! Let's customize your experience by selecting your favorite leagues,
            teams, and players.
          </p>

          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 w-full"
            size="lg"
          >
            {isLoading ? "Setting up your account..." : "Continue to Preferences"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
