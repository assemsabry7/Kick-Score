"use client"

import { cn } from "@/lib/utils"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <h1 className="text-2xl font-bold text-white tracking-tight">Kick Score</h1>
      <span className="sr-only">Kick Score</span>
    </div>
  )
}
