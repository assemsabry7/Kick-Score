"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"

export default function TicketsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Match Tickets</h1>
          <p className="text-muted-foreground mt-2">Book tickets for upcoming football matches</p>
        </div>

        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative mt-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search for matches, teams or tournaments..." className="pl-8" />
              </div>
            </div>

            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Competition</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All competitions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All competitions</SelectItem>
                  <SelectItem value="pl">Premier League</SelectItem>
                  <SelectItem value="cl">Champions League</SelectItem>
                  <SelectItem value="wc">World Cup</SelectItem>
                  <SelectItem value="laliga">LaLiga</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Premier League</CardTitle>
                      <CardDescription>Dec 10, 2023 • 20:00</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="text-center">
                          <div className="font-semibold">Arsenal</div>
                        </div>
                        <div className="text-center text-sm">vs</div>
                        <div className="text-center">
                          <div className="font-semibold">Liverpool</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center text-sm text-muted-foreground">Emirates Stadium, London</div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Book Tickets</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Champions League</CardTitle>
                      <CardDescription>Dec 15, 2023 • 20:45</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="text-center">
                          <div className="font-semibold">Real Madrid</div>
                        </div>
                        <div className="text-center text-sm">vs</div>
                        <div className="text-center">
                          <div className="font-semibold">Bayern Munich</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center text-sm text-muted-foreground">Santiago Bernabéu, Madrid</div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Book Tickets</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="international" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">World Cup 2034 Qualifier</CardTitle>
                      <CardDescription>Jan 20, 2024 • 18:00</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="text-center">
                          <div className="font-semibold">Brazil</div>
                        </div>
                        <div className="text-center text-sm">vs</div>
                        <div className="text-center">
                          <div className="font-semibold">Argentina</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center text-sm text-muted-foreground">Maracanã, Rio de Janeiro</div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Book Tickets</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
