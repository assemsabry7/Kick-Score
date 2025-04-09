"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Upload, RotateCw, ZoomIn, ZoomOut, X } from "lucide-react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"

export default function ProfilePhotoPage() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if we have the data from previous steps
    const email = sessionStorage.getItem("registerEmail")
    const firstName = sessionStorage.getItem("registerFirstName")
    const password = sessionStorage.getItem("registerPassword")

    if (!email || !firstName || !password) {
      router.push("/login/email")
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSkip = () => {
    // Skip photo upload and go to next step
    router.push("/login/complete")
  }

  const handleContinue = async () => {
    setIsLoading(true)

    try {
      // Store photo data in session storage
      if (image) {
        sessionStorage.setItem("registerPhoto", image)
        sessionStorage.setItem("registerPhotoRotation", rotation.toString())
        sessionStorage.setItem("registerPhotoZoom", zoom.toString())
      }

      // Redirect to next step
      router.push("/login/complete")
    } catch (error) {
      console.error("Error saving photo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleRemoveImage = () => {
    setImage(null)
    setRotation(0)
    setZoom(1)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-black">
      <motion.div
        className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Add a profile photo</h1>
          <p className="text-sm text-gray-400">This is optional, you can skip this step</p>
        </div>

        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden bg-[#111] border-2 border-[#333] flex items-center justify-center">
              {image ? (
                <>
                  <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${image})`,
                      transform: `rotate(${rotation}deg) scale(${zoom})`,
                      transformOrigin: "center",
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <Upload className="h-10 w-10 text-gray-500" />
              )}
            </div>

            {!image ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-photo"
                />
                <Label
                  htmlFor="profile-photo"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Upload Photo
                </Label>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="flex justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRotate}
                    className="border-[#333] bg-[#111] text-white hover:bg-[#222]"
                  >
                    <RotateCw className="h-4 w-4 mr-1" />
                    Rotate
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <ZoomOut className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={[zoom]}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={(values) => setZoom(values[0])}
                    className="flex-1"
                  />
                  <ZoomIn className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/login/password")}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="space-x-2">
              <Button type="button" variant="ghost" onClick={handleSkip} className="text-gray-400 hover:text-white">
                Skip
              </Button>

              <Button
                type="button"
                onClick={handleContinue}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Continue"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
