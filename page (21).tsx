"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-provider"
import { SUPPORTED_LEAGUES } from "@/lib/api-football"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export default function CustomizePage() {
  const router = useRouter()
  const { user, updatePreferences, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }

    // Load user preferences if available
    if (user?.preferences) {
      setSelectedLeagues(user.preferences.leagues || [])
    }
  }, [user, loading, router])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updatePreferences({
        leagues: selectedLeagues,
      })
      router.push("/")
    } catch (error) {
      console.error("Failed to save preferences", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLeague = (leagueId: string) => {
    setSelectedLeagues((prev) => (prev.includes(leagueId) ? prev.filter((id) => id !== leagueId) : [...prev, leagueId]))
  }

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Customize Your Experience</h1>
          <p className="text-muted-foreground mt-2">Select your favorite leagues to personalize your feed</p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Leagues</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SUPPORTED_LEAGUES.map((league) => (
              <div
                key={league.id}
                className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedLeagues.includes(league.id.toString())
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-[#333] hover:border-[#555]"
                }`}
                onClick={() => toggleLeague(league.id.toString())}
              >
                <div className="w-16 h-16 relative mb-3 flex items-center justify-center">
                  <Image
                    src={league.logo || "/placeholder.svg"}
                    alt={league.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium">{league.name}</p>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-gray-400">{league.country}</span>
                    <Checkbox
                      checked={selectedLeagues.includes(league.id.toString())}
                      className="ml-2 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Skip
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
