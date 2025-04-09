"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

export default function SocialLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loginWithGoogle, loginWithFacebook, loginWithApple } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const provider = searchParams.get("provider")

  useEffect(() => {
    if (!provider || !["google", "facebook", "apple"].includes(provider)) {
      router.push("/login")
    }
  }, [provider, router])

  useEffect(() => {
    const handleSocialLogin = async () => {
      if (!provider) return

      setIsLoading(true)
      try {
        switch (provider) {
          case "google":
            await loginWithGoogle()
            break
          case "facebook":
            await loginWithFacebook()
            break
          case "apple":
            await loginWithApple()
            break
        }

        // Redirect to welcome page
        router.push("/login/welcome")
      } catch (error: any) {
        setError(error.message || `${provider} login failed`)
      } finally {
        setIsLoading(false)
      }
    }

    handleSocialLogin()
  }, [provider, loginWithGoogle, loginWithFacebook, loginWithApple, router])

  const getProviderName = () => {
    switch (provider) {
      case "google":
        return "Google"
      case "facebook":
        return "Facebook"
      case "apple":
        return "Apple"
      default:
        return "Social"
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-black">
      <motion.div
        className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Signing in with {getProviderName()}</h1>
          <p className="text-sm text-gray-400">
            {isLoading ? `Connecting to ${getProviderName()}...` : "Redirecting you to the home page"}
          </p>
        </div>

        <div className="grid gap-4">
          {isLoading && (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
            </div>
          )}

          {error && <div className="rounded-md bg-red-500/20 p-4 text-center text-sm text-red-500">{error}</div>}

          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/login")}
            className="text-gray-400 hover:text-white"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
