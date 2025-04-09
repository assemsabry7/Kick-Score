"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function LogoSvg({ className, animated = false }: { className?: string; animated?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animated || !svgRef.current) return

    // Animation for the light effect moving through the logo
    const animateLight = () => {
      const svg = svgRef.current
      if (!svg) return

      const lightEffect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      lightEffect.setAttribute("width", "30")
      lightEffect.setAttribute("height", "40")
      lightEffect.setAttribute("fill", "white")
      lightEffect.setAttribute("opacity", "0.3")
      lightEffect.setAttribute("x", "-30")
      lightEffect.setAttribute("y", "0")
      lightEffect.setAttribute("filter", "blur(10px)")

      svg.appendChild(lightEffect)

      // Animate the light effect
      let position = -30
      const animate = () => {
        position += 2
        lightEffect.setAttribute("x", position.toString())

        if (position > svg.getBoundingClientRect().width + 30) {
          position = -30
        }

        requestAnimationFrame(animate)
      }

      animate()

      return () => {
        if (svg.contains(lightEffect)) {
          svg.removeChild(lightEffect)
        }
      }
    }

    const cleanup = animateLight()
    return cleanup
  }, [animated])

  return (
    <svg ref={svgRef} className={cn("h-10 w-auto", className)} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
      {/* Kick */}
      <path d="M10 8h5v10l8-10h6l-9 10 9 14h-6l-6-10-2 2v8h-5V8z" fill="currentColor" />
      <path d="M35 8h5v10h8V8h5v24h-5V22h-8v10h-5V8z" fill="currentColor" />
      <path d="M60 8h5v24h-5V8z" fill="currentColor" />
      <path
        d="M70 20c0-7 5-13 13-13 7 0 12 5 12 13 0 7-5 13-12 13-8 0-13-6-13-13zm20 0c0-4-3-8-7-8s-8 4-8 8c0 5 4 8 8 8s7-3 7-8z"
        fill="currentColor"
      />

      {/* Score */}
      <path
        d="M105 14c0-4 3-7 8-7 4 0 7 2 8 5l-4 2c-1-2-2-3-4-3-2 0-3 1-3 3 0 2 1 3 4 3h2v4h-2c-3 0-4 1-4 3s1 3 3 3c2 0 4-1 4-3l5 1c-1 4-4 6-9 6-5 0-8-3-8-7 0-3 1-5 4-6-3-1-4-3-4-6z"
        fill="currentColor"
      />
      <path
        d="M125 20c0-7 5-13 13-13 7 0 12 5 12 13 0 7-5 13-12 13-8 0-13-6-13-13zm20 0c0-4-3-8-7-8s-8 4-8 8c0 5 4 8 8 8s7-3 7-8z"
        fill="currentColor"
      />

      {/* Football in the "O" of Score */}
      <circle cx="138" cy="20" r="7" fill="#ffffff" />
      <path d="M138 13a7 7 0 100 14 7 7 0 000-14zm0 1a6 6 0 110 12 6 6 0 010-12z" fill="#000000" />

      {/* Football pattern */}
      <path d="M134 17l4-3 4 3-1 4h-6l-1-4z" fill="#000000" />
      <path d="M134 23l4 3 4-3-1-4h-6l-1 4z" fill="#000000" />
      <path d="M133 20h10" stroke="#000000" strokeWidth="0.5" />
      <path d="M138 15v10" stroke="#000000" strokeWidth="0.5" />

      <path d="M155 8h5v19c0 2 1 2 3 2h1v4h-2c-4 0-7-2-7-6V8z" fill="currentColor" />
      <path d="M170 8h13v4h-8v6h7v4h-7v6h8v4h-13V8z" fill="currentColor" />
    </svg>
  )
}
