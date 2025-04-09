"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { getLiveFixtures, getFixtures, getTodayDate, getTomorrowDate, getYesterdayDate } from "@/lib/api-football"
import { format } from "date-fns"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { Loader2 } from "lucide-react"

type MatchesListProps = {
  day: "today" | "tomorrow" | "yesterday" | "live"
}

export default function MatchesList({ day }: MatchesListProps) {
  const [fixtures, setFixtures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true)

      try {
        let data
        let date = ""

        if (day === "live") {
          console.log("Fetching live fixtures")
          data = await getLiveFixtures()
        } else {
          switch (day) {
            case "today":
              date = getTodayDate()
              break
            case "tomorrow":
              date = getTomorrowDate()
              break
            case "yesterday":
              date = getYesterdayDate()
              break
            default:
              date = getTodayDate()
          }

          console.log(`Fetching fixtures for date: ${date}`)
          data = await getFixtures(date)
        }

        // Process fixtures data
        let filteredFixtures = data.response || []

        // Filter fixtures based on user preferences if user is logged in
        if (user?.preferences?.leagues && user.preferences.leagues.length > 0) {
          filteredFixtures = filteredFixtures.filter((fixture: any) => {
            // Check if fixture is from a preferred league
            return user.preferences?.leagues.includes(fixture.league?.id.toString())
          })
        }

        // Group fixtures by league
        const fixturesByLeague = filteredFixtures.reduce((acc: any, fixture: any) => {
          if (!fixture.league?.id) return acc

          const leagueId = fixture.league.id

          if (!acc[leagueId]) {
            acc[leagueId] = {
              id: leagueId,
              name: fixture.league.name || `League ${leagueId}`,
              logo: fixture.league.logo || `/placeholder.svg?height=24&width=24&text=${leagueId}`,
              matches: [],
            }
          }

          acc[leagueId].matches.push(fixture)

          return acc
        }, {})

        setFixtures(Object.values(fixturesByLeague))
      } catch (error) {
        console.error("Error in fetchFixtures:", error)
        // In case of any error, use empty fixtures array
        setFixtures([])
      } finally {
        setLoading(false)
      }
    }

    fetchFixtures()
  }, [day, user])

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (fixtures.length === 0) {
    return (
      <div className="rounded-lg border border-[#222] bg-[#111] p-8 text-center text-gray-400">
        {user?.preferences?.leagues && user.preferences.leagues.length > 0
          ? "No matches found for your preferred leagues."
          : "No matches scheduled for this day."}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {fixtures.map((competition, index) => (
        <MatchCompetition key={competition.id} competition={competition} index={index} />
      ))}
    </div>
  )
}

// Extracted MatchCompetition component for better organization
function MatchCompetition({ competition, index }: { competition: any; index: number }) {
  return (
    <motion.div
      className="rounded-lg border border-[#222] bg-[#111] text-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="p-3 font-medium bg-[#181818] flex items-center">
        <div className="w-5 h-5 mr-2 relative">
          <Image
            src={competition.logo || "/placeholder.svg?height=20&width=20"}
            alt={competition.name}
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <span className="text-gray-200">{competition.name}</span>
      </div>
      <div className="divide-y divide-[#222]">
        {competition.matches.map((match: any) => {
          // Extract match data
          const fixture = match.fixture || match
          const teams = match.teams || {
            home: match.homeTeam || {},
            away: match.awayTeam || {},
          }
          const goals = match.goals || { home: null, away: null }

          // Get status
          const status = fixture.status?.short || match.status?.short || "NS"
          const elapsed = fixture.status?.elapsed || match.status?.elapsed

          // Determine if the match is live
          const isLive = ["LIVE", "1H", "2H", "HT"].includes(status)

          // Format match time
          let matchTime = ""
          if (fixture.date) {
            try {
              const matchDate = new Date(fixture.date)
              matchTime = format(matchDate, "HH:mm")
            } catch (e) {
              console.error("Error formatting date:", e)
              matchTime = "TBD"
            }
          }

          return (
            <Link
              key={fixture.id}
              href={`/matches/${fixture.id}`}
              className="block p-3 hover:bg-[#181818] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 text-xs text-center">
                  {isLive ? (
                    <Badge variant="destructive" className="text-[10px]">
                      LIVE
                    </Badge>
                  ) : (
                    <span className="text-gray-500">{status === "NS" ? matchTime : status}</span>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                  {/* Home team */}
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-300">{teams.home?.name || "TBD"}</span>
                    <div className="w-6 h-6 relative">
                      <Image
                        src={teams.home?.logo || "/placeholder.svg?height=24&width=24"}
                        alt={teams.home?.name || "Home Team"}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className={cn("px-2 py-1 text-center font-medium", isLive && "text-red-500")}>
                    {goals.home !== null && goals.home !== undefined && goals.away !== null && goals.away !== undefined
                      ? `${goals.home} - ${goals.away}`
                      : "vs"}
                  </div>

                  {/* Away team */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 relative">
                      <Image
                        src={teams.away?.logo || "/placeholder.svg?height=24&width=24"}
                        alt={teams.away?.name || "Away Team"}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-gray-300">{teams.away?.name || "TBD"}</span>
                  </div>
                </div>

                <div className="w-10 text-xs text-center text-gray-500">
                  {isLive && status !== "HT" && elapsed && `${elapsed}'`}
                  {status === "HT" && "HT"}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
