"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Flag, Calendar, Ruler, Weight, Award, Shirt, MapPin } from "lucide-react"

export default function PlayerDetailsPage() {
  const params = useParams()
  const playerId = params.id as string

  const [player, setPlayer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      setLoading(true)
      setError(false)

      try {
        // In a real app, we would fetch the player details from the API
        // const data = await getPlayer(playerId)

        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        // Create mock player data
        setPlayer({
          id: playerId,
          name: "Mohamed Salah",
          firstname: "Mohamed",
          lastname: "Salah",
          age: 31,
          birth: {
            date: "1992-06-15",
            place: "Nagrig",
            country: "Egypt",
          },
          nationality: "Egypt",
          height: "175 cm",
          weight: "71 kg",
          photo: "/placeholder.svg?height=200&width=200&text=Salah",
          team: {
            id: 40,
            name: "Liverpool",
            logo: "/placeholder.svg?height=40&width=40&text=LIV",
          },
          position: "Attacker",
          number: 11,
          statistics: [
            {
              league: {
                id: 39,
                name: "Premier League",
                country: "England",
                logo: "/placeholder.svg?height=24&width=24&text=PL",
                season: 2023,
              },
              games: {
                appearences: 15,
                lineups: 15,
                minutes: 1350,
                position: "Attacker",
                rating: "7.8",
              },
              goals: {
                total: 12,
                assists: 7,
                conceded: 0,
                saves: 0,
              },
              shots: {
                total: 45,
                on: 28,
              },
              passes: {
                total: 420,
                key: 35,
                accuracy: 78,
              },
              tackles: {
                total: 15,
                blocks: 2,
                interceptions: 8,
              },
              cards: {
                yellow: 2,
                yellowred: 0,
                red: 0,
              },
            },
            {
              league: {
                id: 2,
                name: "Champions League",
                country: "World",
                logo: "/placeholder.svg?height=24&width=24&text=CL",
                season: 2023,
              },
              games: {
                appearences: 6,
                lineups: 6,
                minutes: 540,
                position: "Attacker",
                rating: "8.1",
              },
              goals: {
                total: 5,
                assists: 3,
                conceded: 0,
                saves: 0,
              },
              shots: {
                total: 18,
                on: 12,
              },
              passes: {
                total: 180,
                key: 15,
                accuracy: 82,
              },
              tackles: {
                total: 6,
                blocks: 1,
                interceptions: 3,
              },
              cards: {
                yellow: 1,
                yellowred: 0,
                red: 0,
              },
            },
          ],
          trophies: [
            { title: "Premier League", season: "2019-20" },
            { title: "Champions League", season: "2018-19" },
            { title: "FIFA Club World Cup", season: "2019" },
            { title: "UEFA Super Cup", season: "2019" },
            { title: "FA Cup", season: "2021-22" },
            { title: "League Cup", season: "2021-22" },
          ],
        })
      } catch (error) {
        console.error("Error fetching player details:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayerDetails()
  }, [playerId])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Skeleton className="h-80 w-full rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-6 w-1/3 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-full mt-8 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (error || !player) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Player Not Found</h1>
          <p className="text-gray-400">The player you're looking for doesn't exist or couldn't be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        {/* Player Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/3">
            <div className="bg-[#111] border border-[#222] rounded-lg p-4 flex flex-col items-center">
              <div className="w-full h-64 relative mb-4">
                <Image
                  src={player.photo || "/placeholder.svg?height=256&width=256"}
                  alt={player.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 relative mr-2">
                  <Image
                    src={player.team.logo || "/placeholder.svg?height=32&width=32"}
                    alt={player.team.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-medium">{player.team.name}</h3>
              </div>
              <Badge className="bg-[#222] text-white hover:bg-[#333]">{player.position}</Badge>
            </div>
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-1">{player.name}</h1>
            <div className="flex items-center mb-4">
              <Flag className="h-4 w-4 mr-1 text-gray-400" />
              <span className="text-gray-300">{player.nationality}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#111] border border-[#222] rounded-lg p-4">
                <div className="flex items-center mb-1 text-gray-400">
                  <Shirt className="h-4 w-4 mr-1" />
                  <span className="text-sm">Number</span>
                </div>
                <div className="text-xl font-bold">{player.number}</div>
              </div>

              <div className="bg-[#111] border border-[#222] rounded-lg p-4">
                <div className="flex items-center mb-1 text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Age</span>
                </div>
                <div className="text-xl font-bold">{player.age}</div>
              </div>

              <div className="bg-[#111] border border-[#222] rounded-lg p-4">
                <div className="flex items-center mb-1 text-gray-400">
                  <Ruler className="h-4 w-4 mr-1" />
                  <span className="text-sm">Height</span>
                </div>
                <div className="text-xl font-bold">{player.height}</div>
              </div>

              <div className="bg-[#111] border border-[#222] rounded-lg p-4">
                <div className="flex items-center mb-1 text-gray-400">
                  <Weight className="h-4 w-4 mr-1" />
                  <span className="text-sm">Weight</span>
                </div>
                <div className="text-xl font-bold">{player.weight}</div>
              </div>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                <h3 className="font-medium">Birth Information</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 pl-6">
                <div>
                  <div className="text-sm text-gray-400">Date</div>
                  <div>{player.birth.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Place</div>
                  <div>{player.birth.place}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Country</div>
                  <div>{player.birth.country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Details Tabs */}
        <Tabs defaultValue="statistics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#111]">
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="trophies"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Trophies
            </TabsTrigger>
            <TabsTrigger
              value="transfers"
              className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
            >
              Transfers
            </TabsTrigger>
          </TabsList>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="mt-6">
            <div className="space-y-6">
              {player.statistics.map((stat: any, index: number) => (
                <Card key={index} className="bg-[#111] border-[#222]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 relative mr-2">
                        <Image
                          src={stat.league.logo || "/placeholder.svg?height=24&width=24"}
                          alt={stat.league.name}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <CardTitle className="text-lg">
                        {stat.league.name} - {stat.league.season}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Appearances</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Games</span>
                            <span>{stat.games.appearences}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Minutes</span>
                            <span>{stat.games.minutes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Rating</span>
                            <span>{stat.games.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Goals</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Scored</span>
                            <span>{stat.goals.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Assists</span>
                            <span>{stat.goals.assists}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Shots</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total</span>
                            <span>{stat.shots.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">On Target</span>
                            <span>{stat.shots.on}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Cards</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Yellow</span>
                            <span>{stat.cards.yellow}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Red</span>
                            <span>{stat.cards.red}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trophies Tab */}
          <TabsContent value="trophies" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {player.trophies.map((trophy: any, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-[#1a1a1a] rounded-lg">
                      <Award className="h-6 w-6 mr-3 text-yellow-500" />
                      <div>
                        <div className="font-medium">{trophy.title}</div>
                        <div className="text-sm text-gray-400">{trophy.season}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transfers Tab */}
          <TabsContent value="transfers" className="mt-6">
            <Card className="bg-[#111] border-[#222]">
              <CardContent className="p-4 text-center">
                <p className="text-gray-400">Transfer history will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
