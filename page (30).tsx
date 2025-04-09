"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Facebook, Mail, Apple, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-black">
      <motion.div
        className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome to Kick Score</h1>
          <p className="text-sm text-gray-400">Choose how you want to sign in</p>
        </div>

        <div className="grid gap-4">
          <Link href="/login/email">
            <Button
              variant="outline"
              className="w-full border-[#333] bg-[#111] text-white hover:bg-[#222] hover:text-white flex justify-between items-center"
            >
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Continue with Email
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/login/social?provider=google">
            <Button
              variant="outline"
              className="w-full border-[#333] bg-[#111] text-white hover:bg-[#222] hover:text-white flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 relative">
                  <Image src="/placeholder.svg?height=16&width=16&text=G" width={16} height={16} alt="Google" />
                </div>
                Continue with Google
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/login/social?provider=facebook">
            <Button
              variant="outline"
              className="w-full border-[#333] bg-[#111] text-white hover:bg-[#222] hover:text-white flex justify-between items-center"
            >
              <div className="flex items-center">
                <Facebook className="mr-2 h-4 w-4" />
                Continue with Facebook
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/login/social?provider=apple">
            <Button
              variant="outline"
              className="w-full border-[#333] bg-[#111] text-white hover:bg-[#222] hover:text-white flex justify-between items-center"
            >
              <div className="flex items-center">
                <Apple className="mr-2 h-4 w-4" />
                Continue with Apple
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#333]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => router.push("/")}>
            Continue as Guest
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  )
}
