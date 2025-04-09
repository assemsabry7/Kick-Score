"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion } from "framer-motion"

export default function WorldCup2034Page() {
  return (
    <div className="container py-10">
      <motion.div
        className="relative rounded-lg overflow-hidden mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <Image
          src="/worldcup2034-saudi-arabia.png"
          width={1200}
          height={400}
          alt="World Cup 2034 Saudi Arabia"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">FIFA World Cup 2034</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">Saudi Arabia - Host Nation</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Tournament Info
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              Book Tickets
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex bg-[#111]">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
          >
            Teams
          </TabsTrigger>
          <TabsTrigger
            value="venues"
            className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
          >
            Venues
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
          >
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">About the Tournament</h2>
              <p className="text-gray-300 mb-4">
                The 2034 FIFA World Cup will be the 25th FIFA World Cup, the quadrennial international men's football
                championship contested by the national teams of the member associations of FIFA. Saudi Arabia will host
                the tournament, marking the first time the World Cup will be held in the country.
              </p>
              <p className="text-gray-300 mb-4">
                This will be the second World Cup to feature 48 teams, following the expansion from 32 teams for the
                2026 tournament.
              </p>
              <h3 className="text-xl font-bold mb-2">Key Dates</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Opening Match: June 10, 2034</li>
                <li>Group Stage: June 10-25, 2034</li>
                <li>Round of 16: June 26-29, 2034</li>
                <li>Quarter-finals: July 2-3, 2034</li>
                <li>Semi-finals: July 6-7, 2034</li>
                <li>Final: July 10, 2034</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Host Nation: Saudi Arabia</h2>
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=90&text=Saudi+Flag"
                  width={90}
                  height={60}
                  alt="Saudi Arabia Flag"
                  className="mr-4 border border-gray-700"
                />
                <div>
                  <h3 className="font-bold">Saudi Arabia</h3>
                  <p className="text-gray-400">Official Host of FIFA World Cup 2034</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Saudi Arabia was confirmed as the host nation for the 2034 FIFA World Cup after being the only bidder
                for the tournament. This will be the first time the World Cup is held in Saudi Arabia, continuing FIFA's
                mission to bring the tournament to new territories.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card className="bg-[#111] border-[#333] text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">48</CardTitle>
                    <CardDescription className="text-gray-400">Teams</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-[#111] border-[#333] text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">12</CardTitle>
                    <CardDescription className="text-gray-400">Stadiums</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-[#111] border-[#333] text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">104</CardTitle>
                    <CardDescription className="text-gray-400">Matches</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-[#111] border-[#333] text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">31</CardTitle>
                    <CardDescription className="text-gray-400">Days</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <Card className="bg-[#111] border-[#333]">
            <CardHeader>
              <CardTitle className="text-white">Qualified Teams</CardTitle>
              <CardDescription className="text-gray-400">
                Teams that have qualified for the 2034 FIFA World Cup
              </CardDescription>
            </CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=60&text=Saudi+Flag"
                    width={60}
                    height={40}
                    alt="Saudi Arabia Flag"
                    className="mr-3 border border-gray-700"
                  />
                  <div>
                    <p className="font-medium">Saudi Arabia</p>
                    <p className="text-xs text-gray-400">Host Nation</p>
                  </div>
                </div>
                {/* More teams will be added as they qualify */}
                <div className="bg-[#1a1a1a] p-4 rounded-lg flex items-center opacity-50">
                  <div className="w-[60px] h-[40px] bg-[#222] mr-3 flex items-center justify-center text-xs text-gray-500">
                    TBD
                  </div>
                  <p className="text-gray-500">Qualifying</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Other tab contents remain similar but with updated styling */}
      </Tabs>
    </div>
  )
}
