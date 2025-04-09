import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">About Kick Score</h1>
        <p className="text-muted-foreground">
          Kick Score is your ultimate destination for football scores, stats, news, and ticket booking. We provide
          comprehensive coverage of football leagues and tournaments from around the world.
        </p>
      </div>

      <div className="grid gap-10">
        <section className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At Kick Score, we're passionate about football and committed to providing fans with the most
              comprehensive, accurate, and up-to-date information about their favorite sport.
            </p>
            <p className="text-muted-foreground mb-4">
              Our mission is to connect football fans with the game they love through innovative technology and
              exceptional user experience. Whether you're tracking live scores, reading the latest news, or booking
              tickets to see your favorite team, Kick Score is your trusted companion.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="Football stadium"
              className="w-full h-auto"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Scores</CardTitle>
                <CardDescription>Real-time updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Follow matches in real-time with our live score updates, complete with detailed statistics and
                  play-by-play commentary.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Stats</CardTitle>
                <CardDescription>Detailed analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dive deep into player and team statistics, historical data, and performance analytics for all major
                  leagues and tournaments.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Latest News</CardTitle>
                <CardDescription>Breaking stories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Stay informed with the latest football news, transfer rumors, injury updates, and pre/post-match
                  analysis.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Booking</CardTitle>
                <CardDescription>Secure and convenient</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Book tickets for upcoming matches with our secure and user-friendly ticket booking platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-4">
              Kick Score is powered by a team of passionate football fans, experienced developers, and sports data
              analysts who work tirelessly to provide you with the best football experience.
            </p>
            <p className="text-muted-foreground">
              Our diverse team brings together expertise from the worlds of sports journalism, software development, and
              user experience design to create a platform that truly serves the needs of football fans.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">123 Football Street, Sports City, 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@kickscore.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
