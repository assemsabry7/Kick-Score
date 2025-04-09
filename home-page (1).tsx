"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter, Tv, Clock, ChevronUp } from "lucide-react"
import LeaguesList from "@/components/leagues-list"
import MatchesList from "@/components/matches-list"
import NewsFeed from "@/components/news-feed"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("today")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const matchesRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Left sidebar - Leagues */}
        <div className="md:col-span-1">
          <LeaguesList />
        </div>

        {/* Center - Matches */}
        <div className="md:col-span-2" ref={matchesRef}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-[#111] border-[#222]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Matches</CardTitle>
                <CardDescription>Follow the latest matches and results</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-[#222]">
                    <TabsTrigger
                      value="live"
                      className="data-[state=active]:bg-[#333] text-gray-300 data-[state=active]:text-white"
                    >
                      Live
                    </TabsTrigger>
                    <TabsTrigger
                      value="today"
                      className="data-[state=active]:bg-[#333] text-gray-300 data-[state=active]:text-white"
                    >
                      Today
                    </TabsTrigger>
                    <TabsTrigger
                      value="tomorrow"
                      className="data-[state=active]:bg-[#333] text-gray-300 data-[state=active]:text-white"
                    >
                      Tomorrow
                    </TabsTrigger>
                    <TabsTrigger
                      value="yesterday"
                      className="data-[state=active]:bg-[#333] text-gray-300 data-[state=active]:text-white"
                    >
                      Yesterday
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin mt-4">
                    <Button
                      variant={activeTab === "live" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("live")}
                      className={
                        activeTab === "live"
                          ? "bg-red-600 hover:bg-red-700"
                          : "border-[#333] bg-[#111] text-gray-300 hover:bg-[#222] hover:text-white"
                      }
                    >
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      Live Matches
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333] bg-[#111] text-gray-300 hover:bg-[#222] hover:text-white"
                    >
                      <Tv className="h-4 w-4 mr-2" />
                      On TV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333] bg-[#111] text-gray-300 hover:bg-[#222] hover:text-white"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      By Time
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </div>

                  <TabsContent value="live" className="mt-0">
                    <MatchesList day="live" />
                  </TabsContent>
                  <TabsContent value="today" className="mt-0">
                    <MatchesList day="today" />
                  </TabsContent>
                  <TabsContent value="tomorrow" className="mt-0">
                    <MatchesList day="tomorrow" />
                  </TabsContent>
                  <TabsContent value="yesterday" className="mt-0">
                    <MatchesList day="yesterday" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right sidebar - News */}
        <div className="md:col-span-3 lg:col-span-1">
          <div className="space-y-6">
            {/* User Welcome or Login */}
            <Card className="bg-[#111] border-[#222]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">
                  {user ? `Welcome, ${user.name || "User"}` : "Welcome"}
                </CardTitle>
                <CardDescription>
                  {user ? "Enjoy your personalized experience on Kick Score" : "Sign in for a personalized experience"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!user && (
                  <Button asChild className="w-full bg-[#222] hover:bg-[#333] text-white">
                    <Link href="/login">Sign In</Link>
                  </Button>
                )}
                {user && (
                  <Button asChild className="w-full bg-[#222] hover:bg-[#333] text-white">
                    <Link href="/profile">View Profile</Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* News Feed */}
            <Card className="bg-[#111] border-[#222]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Latest News</CardTitle>
                <CardDescription>Football news and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <NewsFeed />
              </CardContent>
            </Card>

            {/* World Cup 2034 Promo */}
            <Card className="bg-[#111] border-[#222] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">World Cup 2034</CardTitle>
                <CardDescription>Saudi Arabia to host the 2034 World Cup</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Link href="/worldcup2034" className="block">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img
                      src="/worldcup2034-saudi-arabia.png"
                      alt="World Cup 2034 Saudi Arabia"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-4 z-20">
                      <p className="text-white font-bold">Learn More</p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors z-30"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
