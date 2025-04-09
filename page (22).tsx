"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { fallbackData } from "@/lib/api-football"
import { format } from "date-fns"

export default function LeagueDetailsPage() {
  const params = useParams()
  const leagueId = params.id as string

  const [league, setLeague] = useState<any>(null)
  const [standings, setStandings] = useState<any[]>([])
  const [fixtures, setFixtures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      setLoading(true)
      setError(false)

      try {
        // In a real app, we would fetch the league details from the API
        // const data = await getLeagueDetails(leagueId)

        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        // Find league in fallback data
        const mockLeague = fallbackData.leagues.find((l) => l.id.toString() === leagueId)

        if (mockLeague) {
          setLeague({
            ...mockLeague,
            country: mockLeague.country || "International",
            season: 2023,
            type: "League",
            start: "2023-08-11",
            end: "2024-05-19",
          })

          // Create mock standings
          setStandings([
            {
              rank: 1,
              team: { id: 50, name: "Manchester City", logo: "/placeholder.svg?height=24&width=24&text=MCI" },
              points: 35,
              goalsDiff: 24,
              group: "Premier League",
              form: "WWWDW",
              all: { played: 14, win: 11, draw: 2, lose: 1, goals: { for: 36, against: 12 } },
            },
            {
              rank: 2,
              team: { id: 40, name: "Liverpool", logo: "/placeholder.svg?height=24&width=24&text=LIV" },
              points: 34,
              goalsDiff: 20,
              group: "Premier League",
              form: "WWWWL",
              all: { played: 14, win: 10, draw: 4, lose: 0, goals: { for: 30, against: 10 } },
            },
            {
              rank: 3,
              team: { id: 42, name: "Arsenal", logo: "/placeholder.svg?height=24&width=24&text=ARS" },
              points: 33,
              goalsDiff: 17,
              group: "Premier League",
              form: "DWWWW",
              all: { played: 14, win: 10, draw: 3, lose: 1, goals: { for: 27, against: 10 } },
            },
            {
              rank: 4,
              team: { id: 47, name: "Tottenham", logo: "/placeholder.svg?height=24&width=24&text=TOT" },
              points: 27,
              goalsDiff: 8,
              group: "Premier League",
              form: "LLLWW",
              all: { played: 14, win: 8, draw: 3, lose: 3, goals: { for: 26, against: 18 } },
            },
            {
              rank: 5,
              team: { id: 66, name: "Aston Villa", logo: "/placeholder.svg?height=24&width=24&text=AVL" },
              points: 25,
              goalsDiff: 10,
              group: "Premier League",
              form: "WLWDW",
              all: { played: 14, win: 8, draw: 1, lose: 5, goals: { for: 29, against: 19 } },
            },
            {
              rank: 6,
              team: { id: 34, name: "Newcastle", logo: "/placeholder.svg?height=24&width=24&text=NEW" },
              points: 23,
              goalsDiff: 9,
              group: "Premier League",
              form: "LWWLD",
              all: { played: 14, win: 7, draw: 2, lose: 5, goals: { for: 27, against: 18 } },
            },
            {
              rank: 7,
              team: { id: 49, name: "Chelsea", logo: "/placeholder.svg?height=24&width=24&text=CHE" },
              points: 19,
              goalsDiff: 2,
              group: "Premier League",
              form: "WDLLW",
              all: { played: 14, win: 5, draw: 4, lose: 5, goals: { for: 24, against: 22 } },
            },
            {
              rank: 8,
              team: { id: 33, name: "Manchester United", logo: "/placeholder.svg?height=24&width=24&text=MUN" },
              points: 18,
              goalsDiff: -3,
              group: "Premier League",
              form: "LWLWL",
              all: { played: 14, win: 5, draw: 3, lose: 6, goals: { for: 16, against: 19 } },
            },
          ])

          // Create mock fixtures
          setFixtures([
            {
              id: 1,
              league: { id: leagueId, name: mockLeague.name, logo: mockLeague.logo },
              teams: {
                home: { id: 40, name: "Liverpool", logo: "/placeholder.svg?height=24&width=24&text=LIV" },
                away: { id: 33, name: "Manchester United", logo: "/placeholder.svg?height=24&width=24&text=MUN" },
              },
              goals: { home: null, away: null },
              fixture: { date: "2023-12-17T16:30:00+00:00", venue: { name: "Anfield", city: "Liverpool" } },
              status: { short: "NS" },
            },
            {
              id: 2,
              league: { id: leagueId, name: mockLeague.name, logo: mockLeague.logo },
              teams: {
                home: { id: 42, name: "Arsenal", logo: "/placeholder.svg?height=24&width=24&text=ARS" },
                away: { id: 51, name: "Brighton", logo: "/placeholder.svg?height=24&width=24&text=BHA" },
              },
              goals: { home: null, away: null },
              fixture: { date: "2023-12-17T14:00:00+00:00", venue: { name: "Emirates Stadium", city: "London" } },
              status: { short: "NS" },
            },
            {
              id: 3,
              league: { id: leagueId, name: mockLeague.name, logo: mockLeague.logo },
              teams: {
                home: { id: 49, name: "Chelsea", logo: "/placeholder.svg?height=24&width=24&text=CHE" },
                away: { id: 62, name: "Sheffield Utd", logo: "/placeholder.svg?height=24&width=24&text=SHU" },
              },
              goals: { home: null, away: null },
              fixture: { date: "2023-12-16T15:00:00+00:00", venue: { name: "Stamford Bridge", city: "London" } },
              status: { short: "NS" },
            },
            {
              id: 4,
              league: { id: leagueId, name: mockLeague.name, logo: mockLeague.logo },
              teams: {
                home: { id: 50, name: "Manchester City", logo: "/placeholder.svg?height=24&width=24&text=MCI" },
                away: { id: 52, name: "Crystal Palace", logo: "/placeholder.svg?height=24&width=24&text=CRY" },
              },
              goals: { home: null, away: null },
              fixture: { date: "2023-12-16T15:00:00+00:00", venue: { name: "Etihad Stadium", city: "Manchester" } },
              status: { short: "NS" },
            },
          ])
        } else {
          throw new Error("League not found")
        }
      } catch (error) {
        console.error("Error fetching league details:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLeagueDetails()
  }, [leagueId])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center mb-8">
            <Skeleton className="h-16 w-16 rounded-full mr-4" />
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <Skeleton className="h-10 w-full mb-6" />

          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (error || !league) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">League Not Found</h1>
          <p className="text-gray-400">The league you're looking for doesn't exist or couldn't be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl">
        {/* League Header */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 relative mr-4">
            <Image
              src={league.logo || "/placeholder.svg?height=64&width=64"}
              alt={league.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{league.name}</h1>
            <p className="text-gray-400">
              {league.country} • {league.season}/{league.season + 1}
            </p>
          </div>
        </div>

        {/* League Details Tabs */}
        <Tabs defaultValue="standings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#111]">
            <TabsTrigger
              value="standings"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Standings
            </TabsTrigger>
            <TabsTrigger
              value="fixtures"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Fixtures
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Stats
            </TabsTrigger>
          </TabsList>

          {/* Standings Tab */}
          <TabsContent value="standings" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-[#1a1a1a]">
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">MP</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">D</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">GF</TableHead>
                      <TableHead className="text-center">GA</TableHead>
                      <TableHead className="text-center">GD</TableHead>
                      <TableHead className="text-center">Pts</TableHead>
                      <TableHead className="text-center">Form</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {standings.map((team) => (
                      <TableRow key={team.team.id} className="hover:bg-[#1a1a1a]">
                        <TableCell className="text-center font-medium">{team.rank}</TableCell>
                        <TableCell>
                          <Link href={`/teams/${team.team.id}`} className="flex items-center">
                            <div className="w-6 h-6 relative mr-2">
                              <Image
                                src={team.team.logo || "/placeholder.svg?height=24&width=24"}
                                alt={team.team.name}
                                width={24}
                                height={24}
                                className="object-contain"
                              />
                            </div>
                            <span>{team.team.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">{team.all.played}</TableCell>
                        <TableCell className="text-center">{team.all.win}</TableCell>
                        <TableCell className="text-center">{team.all.draw}</TableCell>
                        <TableCell className="text-center">{team.all.lose}</TableCell>
                        <TableCell className="text-center">{team.all.goals.for}</TableCell>
                        <TableCell className="text-center">{team.all.goals.against}</TableCell>
                        <TableCell className="text-center">{team.goalsDiff}</TableCell>
                        <TableCell className="text-center font-bold">{team.points}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-1">
                            {team.form.split("").map((result, i) => (
                              <span
                                key={i}
                                className={`inline-block w-5 h-5 text-xs flex items-center justify-center rounded-full
                                  ${result === "W" ? "bg-green-600" : result === "D" ? "bg-gray-500" : "bg-red-600"}`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fixtures Tab */}
          <TabsContent value="fixtures" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {fixtures.map((match) => {
                    const matchDate = new Date(match.fixture.date)

                    return (
                      <Link
                        key={match.id}
                        href={`/matches/${match.id}`}
                        className="block bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#222] transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                          <span>{format(matchDate, "EEEE, MMMM d, yyyy")}</span>
                          <span>{format(matchDate, "h:mm a")}</span>
                        </div>

                        <div className="grid grid-cols-3 items-center">
                          <div className="flex flex-col items-center md:items-end">
                            <div className="flex items-center mb-1">
                              <div className="w-6 h-6 relative mr-2 md:order-2 md:ml-2 md:mr-0">
                                <Image
                                  src={match.teams.home.logo || "/placeholder.svg?height=24&width=24"}
                                  alt={match.teams.home.name}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                              <span className="md:text-right">{match.teams.home.name}</span>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-bold">
                              {match.goals.home !== null ? `${match.goals.home} - ${match.goals.away}` : "vs"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {match.status.short === "NS" ? "Not Started" : match.status.short}
                            </div>
                          </div>

                          <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center mb-1">
                              <div className="w-6 h-6 relative mr-2">
                                <Image
                                  src={match.teams.away.logo || "/placeholder.svg?height=24&width=24"}
                                  alt={match.teams.away.name}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                              <span>{match.teams.away.name}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center text-xs text-gray-500 mt-2">
                          {match.fixture.venue.name}, {match.fixture.venue.city}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4 text-center">
                <p className="text-gray-400">League statistics will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
