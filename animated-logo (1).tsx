"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function AnimatedLogo({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 160
    canvas.height = 50

    // Load grass texture
    const grassTexture = new Image()
    grassTexture.src = "/grass-texture.png"

    // Ball properties
    const ball = {
      x: 20,
      y: 25,
      radius: 4,
      speedX: 1.2,
      speedY: 0.8,
      draw: () => {
        // White ball
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()

        // Ball details (simple black pentagon pattern)
        ctx.strokeStyle = "black"
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(ball.x, ball.y - ball.radius)
        ctx.lineTo(ball.x + ball.radius * 0.8, ball.y - ball.radius * 0.5)
        ctx.lineTo(ball.x + ball.radius * 0.5, ball.y + ball.radius * 0.8)
        ctx.lineTo(ball.x - ball.radius * 0.5, ball.y + ball.radius * 0.8)
        ctx.lineTo(ball.x - ball.radius * 0.8, ball.y - ball.radius * 0.5)
        ctx.closePath()
        ctx.stroke()
      },
      update: () => {
        ball.x += ball.speedX
        ball.y += ball.speedY

        // Bounce off edges
        if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
          ball.speedX = -ball.speedX
        }

        if (ball.y > canvas.height - ball.radius || ball.y < ball.radius) {
          ball.speedY = -ball.speedY
        }
      },
    }

    // Create text mask
    const createTextMask = () => {
      ctx.font = "bold 28px sans-serif"
      ctx.fillStyle = "white"
      ctx.fillText("Kick Score", 5, 35)
      return ctx.getImageData(0, 0, canvas.width, canvas.height)
    }

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw text to create a mask
      const textMask = createTextMask()

      // Save the current state
      ctx.save()

      // Apply the text mask
      ctx.globalCompositeOperation = "destination-in"
      ctx.putImageData(textMask, 0, 0)

      // Draw grass pattern inside text
      if (grassTexture.complete) {
        const pattern = ctx.createPattern(grassTexture, "repeat")
        if (pattern) {
          ctx.fillStyle = pattern
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
      }

      // Draw ball
      ball.draw()
      ball.update()

      // Restore the original state
      ctx.restore()

      // Add grass blades extending from text
      ctx.globalCompositeOperation = "source-over"

      // Get mask data to check where text is
      const maskData = textMask.data

      // Add random grass blades extending from the text
      ctx.strokeStyle = "#0d9d0d"
      ctx.lineWidth = 1

      for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        // Check if this pixel is part of the text (not fully transparent)
        const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3
        if (maskData[pixelIndex] > 100) {
          // If alpha > 100, it's part of the text
          const length = Math.random() * 5 + 3
          const angle = Math.random() * Math.PI - Math.PI / 2 // Mostly upward

          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    // Start animation when texture is loaded
    grassTexture.onload = () => {
      animate()
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div className={cn("relative h-10 w-40", className)}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <span className="sr-only">Kick Score</span>
    </div>
  )
}
