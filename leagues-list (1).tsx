"use client"

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fallbackData, SUPPORTED_LEAGUES } from "@/lib/api-football"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

export default function LeaguesList() {
  const [leagues, setLeagues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true)

      try {
        // Filter leagues based on user preferences
        let userLeagues = SUPPORTED_LEAGUES

        if (user?.preferences?.leagues && user.preferences.leagues.length > 0) {
          userLeagues = SUPPORTED_LEAGUES.filter((league) => user.preferences?.leagues.includes(league.id.toString()))
        }

        // Map leagues to the format we need
        const formattedLeagues = userLeagues.map((league) => ({
          id: league.id,
          name: league.name,
          country: league.country,
          logo: league.logo,
          path: `/leagues/${league.id}`,
        }))

        setLeagues(formattedLeagues)
      } catch (error) {
        console.error("Error fetching leagues:", error)

        // Use fallback data filtered by user preferences
        let filteredLeagues = fallbackData.leagues

        if (user?.preferences?.leagues && user.preferences.leagues.length > 0) {
          filteredLeagues = fallbackData.leagues.filter((league) =>
            user.preferences?.leagues.includes(league.id.toString()),
          )
        }

        setLeagues(
          filteredLeagues.map((league) => ({
            ...league,
            path: `/leagues/${league.id}`,
          })),
        )
      } finally {
        setLoading(false)
      }
    }

    fetchLeagues()
  }, [user])

  return (
    <div className="rounded-lg border border-[#222] bg-[#111] text-white shadow-sm">
      <div className="p-4 font-semibold flex items-center border-b border-[#222]">
        <Trophy className="h-4 w-4 mr-2" />
        {user?.preferences?.leagues && user.preferences.leagues.length > 0 ? "Your Leagues" : "All Leagues"}
      </div>

      {loading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {leagues.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No leagues selected. Go to settings to customize your preferences.
            </div>
          ) : (
            <ul className="divide-y divide-[#222]">
              {leagues.map((league) => (
                <li key={league.id}>
                  <Link href={league.path} className="flex items-center p-3 hover:bg-[#222] transition-colors">
                    <div className="w-6 h-6 mr-3 relative flex-shrink-0">
                      <Image
                        src={league.logo || "/placeholder.svg"}
                        alt={league.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-gray-300">{league.name}</span>
                      <span className="text-xs text-gray-500 block">{league.country}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="p-3 border-t border-[#222]">
            <Link
              href="/leagues"
              className="flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors"
            >
              All leagues
              <span>▼</span>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
