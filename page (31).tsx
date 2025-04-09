"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { fallbackData } from "@/lib/api-football"
import { Clock, MapPin, Calendar, User, Award } from "lucide-react"

export default function MatchDetailsPage() {
  const params = useParams()
  const matchId = params.id as string

  const [match, setMatch] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMatchDetails = async () => {
      setLoading(true)
      setError(false)

      try {
        // In a real app, we would fetch the match details from the API
        // const response = await fetch(`/api/matches/${matchId}`)
        // const data = await response.json()

        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        // Find a match in fallback data or create mock data
        const mockMatch =
          fallbackData.fixtures.find((f) => f.id.toString() === matchId) ||
          fallbackData.liveFixtures.find((f) => f.id.toString() === matchId)

        if (mockMatch) {
          // Enhance the mock data with additional details
          setMatch({
            ...mockMatch,
            venue: {
              name: "Emirates Stadium",
              city: "London",
              capacity: 60704,
            },
            lineups: {
              home: {
                formation: "4-3-3",
                startXI: [
                  { player: { id: 1, name: "Ramsdale", number: 1, pos: "GK" } },
                  { player: { id: 2, name: "White", number: 4, pos: "RB" } },
                  { player: { id: 3, name: "Saliba", number: 12, pos: "CB" } },
                  { player: { id: 4, name: "Gabriel", number: 6, pos: "CB" } },
                  { player: { id: 5, name: "Timber", number: 15, pos: "LB" } },
                  { player: { id: 6, name: "Partey", number: 5, pos: "CM" } },
                  { player: { id: 7, name: "Rice", number: 41, pos: "CM" } },
                  { player: { id: 8, name: "Odegaard", number: 8, pos: "CAM" } },
                  { player: { id: 9, name: "Saka", number: 7, pos: "RW" } },
                  { player: { id: 10, name: "Havertz", number: 29, pos: "ST" } },
                  { player: { id: 11, name: "Martinelli", number: 11, pos: "LW" } },
                ],
                bench: [
                  { player: { id: 12, name: "Nketiah", number: 14, pos: "ST" } },
                  { player: { id: 13, name: "Trossard", number: 19, pos: "LW" } },
                  { player: { id: 14, name: "Smith Rowe", number: 10, pos: "CAM" } },
                  { player: { id: 15, name: "Jorginho", number: 20, pos: "CM" } },
                  { player: { id: 16, name: "Kiwior", number: 23, pos: "CB" } },
                ],
                coach: { id: 1, name: "Mikel Arteta" },
              },
              away: {
                formation: "4-3-3",
                startXI: [
                  { player: { id: 101, name: "Alisson", number: 1, pos: "GK" } },
                  { player: { id: 102, name: "Alexander-Arnold", number: 66, pos: "RB" } },
                  { player: { id: 103, name: "Van Dijk", number: 4, pos: "CB" } },
                  { player: { id: 104, name: "Konate", number: 5, pos: "CB" } },
                  { player: { id: 105, name: "Robertson", number: 26, pos: "LB" } },
                  { player: { id: 106, name: "Mac Allister", number: 10, pos: "CM" } },
                  { player: { id: 107, name: "Szoboszlai", number: 8, pos: "CM" } },
                  { player: { id: 108, name: "Jones", number: 17, pos: "CM" } },
                  { player: { id: 109, name: "Salah", number: 11, pos: "RW" } },
                  { player: { id: 110, name: "Nunez", number: 9, pos: "ST" } },
                  { player: { id: 111, name: "Diaz", number: 7, pos: "LW" } },
                ],
                bench: [
                  { player: { id: 112, name: "Gakpo", number: 18, pos: "ST" } },
                  { player: { id: 113, name: "Jota", number: 20, pos: "ST" } },
                  { player: { id: 114, name: "Elliott", number: 19, pos: "RW" } },
                  { player: { id: 115, name: "Endo", number: 3, pos: "CM" } },
                  { player: { id: 116, name: "Gomez", number: 2, pos: "CB" } },
                ],
                coach: { id: 2, name: "Jurgen Klopp" },
              },
            },
            events: [
              {
                time: { elapsed: 23 },
                team: { name: mockMatch.teams.home.name },
                player: { name: "Saka" },
                type: "Goal",
                detail: "Normal Goal",
                assist: { name: "Odegaard" },
              },
              {
                time: { elapsed: 45 },
                team: { name: mockMatch.teams.away.name },
                player: { name: "Salah" },
                type: "Goal",
                detail: "Normal Goal",
                assist: { name: "Alexander-Arnold" },
              },
              {
                time: { elapsed: 67 },
                team: { name: mockMatch.teams.home.name },
                player: { name: "Havertz" },
                type: "Goal",
                detail: "Normal Goal",
                assist: { name: "Martinelli" },
              },
            ],
            statistics: [
              {
                team: { name: mockMatch.teams.home.name },
                statistics: [
                  { type: "Shots on Goal", value: 6 },
                  { type: "Shots off Goal", value: 8 },
                  { type: "Total Shots", value: 14 },
                  { type: "Blocked Shots", value: 2 },
                  { type: "Possession", value: "55%" },
                  { type: "Passes", value: 423 },
                  { type: "Corners", value: 7 },
                  { type: "Fouls", value: 10 },
                  { type: "Yellow Cards", value: 2 },
                  { type: "Red Cards", value: 0 },
                  { type: "Offsides", value: 3 },
                ],
              },
              {
                team: { name: mockMatch.teams.away.name },
                statistics: [
                  { type: "Shots on Goal", value: 4 },
                  { type: "Shots off Goal", value: 6 },
                  { type: "Total Shots", value: 10 },
                  { type: "Blocked Shots", value: 3 },
                  { type: "Possession", value: "45%" },
                  { type: "Passes", value: 347 },
                  { type: "Corners", value: 5 },
                  { type: "Fouls", value: 12 },
                  { type: "Yellow Cards", value: 3 },
                  { type: "Red Cards", value: 0 },
                  { type: "Offsides", value: 2 },
                ],
              },
            ],
          })
        } else {
          throw new Error("Match not found")
        }
      } catch (error) {
        console.error("Error fetching match details:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchMatchDetails()
  }, [matchId])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center">
              <Skeleton className="h-20 w-20 rounded-full mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-10 w-24 mb-2" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-20 w-20 rounded-full mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-full mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (error || !match) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Match Not Found</h1>
          <p className="text-gray-400">The match you're looking for doesn't exist or couldn't be loaded.</p>
        </div>
      </div>
    )
  }

  // Extract data for easier access
  const { teams, goals, status, venue, lineups, events, statistics } = match
  const isLive = status.short === "LIVE" || status.short === "1H" || status.short === "2H" || status.short === "HT"

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        {/* Match Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Badge className="bg-[#222] text-white hover:bg-[#333]">{match.league.name}</Badge>
              {isLive && (
                <Badge variant="destructive" className="ml-2">
                  LIVE
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Dec 10, 2023</span>
              <Clock className="h-4 w-4 ml-4 mr-1" />
              <span>20:00</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-[#111] rounded-lg p-6 border border-[#222]">
            {/* Home Team */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 relative mb-2">
                <Image
                  src={teams.home.logo || "/placeholder.svg?height=80&width=80"}
                  alt={teams.home.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-center">{teams.home.name}</h2>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold mb-2 ${isLive ? "text-red-500" : "text-white"}`}>
                {goals.home} - {goals.away}
              </div>
              <div className="text-sm text-gray-400">
                {status.short === "FT" ? "Full Time" : status.short === "HT" ? "Half Time" : `${status.elapsed}'`}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 relative mb-2">
                <Image
                  src={teams.away.logo || "/placeholder.svg?height=80&width=80"}
                  alt={teams.away.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-center">{teams.away.name}</h2>
            </div>
          </div>

          {/* Venue Info */}
          <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {venue.name}, {venue.city}
            </span>
          </div>
        </div>

        {/* Match Details Tabs */}
        <Tabs defaultValue="lineups" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#111]">
            <TabsTrigger
              value="lineups"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Lineups
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="h2h"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              H2H
            </TabsTrigger>
          </TabsList>

          {/* Lineups Tab */}
          <TabsContent value="lineups" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Team Lineup */}
              <Card className="bg-[#111] border-[#222]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 relative mr-2">
                        <Image
                          src={teams.home.logo || "/placeholder.svg?height=32&width=32"}
                          alt={teams.home.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-bold">{teams.home.name}</h3>
                    </div>
                    <div className="text-sm text-gray-400">Formation: {lineups.home.formation}</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <h4 className="font-medium">Coach</h4>
                    </div>
                    <div className="pl-6 text-gray-300">{lineups.home.coach.name}</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Award className="h-4 w-4 mr-2 text-gray-400" />
                      <h4 className="font-medium">Starting XI</h4>
                    </div>
                    <div className="space-y-2 pl-6">
                      {lineups.home.startXI.map((item) => (
                        <div key={item.player.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-6 text-center text-gray-500">{item.player.number}</span>
                            <span className="ml-2">{item.player.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.player.pos}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <h4 className="font-medium">Substitutes</h4>
                    </div>
                    <div className="space-y-2 pl-6">
                      {lineups.home.bench.map((item) => (
                        <div key={item.player.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-6 text-center text-gray-500">{item.player.number}</span>
                            <span className="ml-2">{item.player.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.player.pos}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Away Team Lineup */}
              <Card className="bg-[#111] border-[#222]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 relative mr-2">
                        <Image
                          src={teams.away.logo || "/placeholder.svg?height=32&width=32"}
                          alt={teams.away.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-bold">{teams.away.name}</h3>
                    </div>
                    <div className="text-sm text-gray-400">Formation: {lineups.away.formation}</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <h4 className="font-medium">Coach</h4>
                    </div>
                    <div className="pl-6 text-gray-300">{lineups.away.coach.name}</div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Award className="h-4 w-4 mr-2 text-gray-400" />
                      <h4 className="font-medium">Starting XI</h4>
                    </div>
                    <div className="space-y-2 pl-6">
                      {lineups.away.startXI.map((item) => (
                        <div key={item.player.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-6 text-center text-gray-500">{item.player.number}</span>
                            <span className="ml-2">{item.player.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.player.pos}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <h4 className="font-medium">Substitutes</h4>
                    </div>
                    <div className="space-y-2 pl-6">
                      {lineups.away.bench.map((item) => (
                        <div key={item.player.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-6 text-center text-gray-500">{item.player.number}</span>
                            <span className="ml-2">{item.player.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.player.pos}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start border-b border-[#222] pb-4 last:border-0 last:pb-0">
                      <div className="w-12 text-center">
                        <span className="inline-block bg-[#222] px-2 py-1 rounded text-sm">{event.time.elapsed}'</span>
                      </div>

                      <div className="flex-1 ml-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 relative mr-2">
                            <Image
                              src={event.team.name === teams.home.name ? teams.home.logo : teams.away.logo}
                              alt={event.team.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium">{event.team.name}</span>
                        </div>

                        <div className="mt-1 pl-8">
                          <div className="flex items-center">
                            <span className="font-medium">{event.player.name}</span>
                            <Badge className="ml-2 bg-green-600 text-white">{event.type}</Badge>
                          </div>

                          {event.assist && <div className="text-sm text-gray-400">Assist: {event.assist.name}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {statistics[0].statistics.map((stat, index) => (
                    <div key={index} className="grid grid-cols-3 items-center">
                      <div className="text-right pr-4">{statistics[0].statistics[index].value}</div>
                      <div className="text-center text-sm text-gray-400">{stat.type}</div>
                      <div className="pl-4">{statistics[1].statistics[index].value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* H2H Tab */}
          <TabsContent value="h2h" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4 text-center">
                <p className="text-gray-400">Head-to-head statistics will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
