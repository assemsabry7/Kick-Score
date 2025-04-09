"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import HomePage from "@/components/home-page"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem("hasVisited")

    if (hasVisited) {
      // If already visited, skip loading screen
      setLoading(false)
    } else {
      // First visit, show loading screen
      const timer = setTimeout(() => {
        setLoading(false)
        // Mark as visited for this session
        sessionStorage.setItem("hasVisited", "true")
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [])

  return <>{loading ? <LoadingScreen /> : <HomePage />}</>
}
