"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, User } from "lucide-react"
import { motion } from "framer-motion"

export default function NamePage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if we have the email from previous step
    const email = sessionStorage.getItem("registerEmail")
    if (!email) {
      router.push("/login/email")
    }
  }, [router])

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName) {
      setError("First name is required")
      return
    }

    setIsLoading(true)

    try {
      // Store name in session storage for the next steps
      sessionStorage.setItem("registerFirstName", firstName)
      sessionStorage.setItem("registerLastName", lastName)

      // Redirect to next step
      router.push("/login/password")
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-black">
      <motion.div
        className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">What's your name?</h1>
          <p className="text-sm text-gray-400">Tell us how we should address you</p>
        </div>

        <form onSubmit={handleContinue} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName" className="text-white">
              First Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="firstName"
                placeholder="John"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  setError("")
                }}
                className="pl-10 bg-[#111] border-[#333] text-white"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName" className="text-white">
              Last Name <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#111] border-[#333] text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/login/email")}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Processing..." : "Continue"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
