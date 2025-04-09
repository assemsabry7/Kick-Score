"use client"

import { useEffect, useState, useRef } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Random increment between 5-15% to simulate variable loading speed
        return Math.min(prev + Math.random() * 10 + 5, 100)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 80

    // Text properties
    const text = "Kick Score"
    const fontSize = 48
    ctx.font = `bold ${fontSize}px sans-serif`

    // Calculate text width for centering
    const textWidth = ctx.measureText(text).width
    const x = (canvas.width - textWidth) / 2
    const y = canvas.height / 2 + fontSize / 3

    // Animation properties
    let lightPosition = -50

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw text
      ctx.fillStyle = "#333"
      ctx.fillText(text, x, y)

      // Calculate how many letters should be lit based on progress
      const textLength = text.length
      const lettersToLight = Math.ceil((textLength * progress) / 100)

      // Get the positions of each character
      const charPositions = []
      let currentX = x

      for (let i = 0; i < text.length; i++) {
        const charWidth = ctx.measureText(text[i]).width
        charPositions.push({
          start: currentX,
          end: currentX + charWidth,
          char: text[i],
        })
        currentX += charWidth
      }

      // Draw light effect moving through text
      ctx.save()

      // Create gradient for light effect
      const gradient = ctx.createLinearGradient(lightPosition - 30, 0, lightPosition + 30, 0)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      // Apply gradient to text
      ctx.fillStyle = gradient
      ctx.fillText(text, x, y)

      // Draw lit letters
      ctx.fillStyle = "white"

      for (let i = 0; i < lettersToLight; i++) {
        if (charPositions[i]) {
          ctx.fillText(charPositions[i].char, charPositions[i].start, y)
        }
      }

      ctx.restore()

      // Move light
      lightPosition += 3
      if (lightPosition > canvas.width + 50) {
        lightPosition = -50
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [progress])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="text-center">
        <canvas ref={canvasRef} className="h-20 w-80" />
      </div>

      <div className="absolute bottom-10 text-sm text-white/70">By Assem Sabry & Reality AI</div>
    </div>
  )
}
