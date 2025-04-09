"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Camera, Save, Check, Loader2, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { SUPPORTED_LEAGUES } from "@/lib/api-football"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, loading, updateUser, updatePreferences, authError } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    photoURL: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    matchAlerts: true,
    goalAlerts: true,
    teamNews: true,
    transferNews: false,
  })

  const [displaySettings, setDisplaySettings] = useState({
    darkMode: true,
    compactView: false,
    showScores: true,
    language: "en",
  })

  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }

    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        photoURL: user.photoURL || "",
      })

      if (user.notificationSettings) {
        setNotificationSettings(user.notificationSettings)
      }

      if (user.displaySettings) {
        setDisplaySettings(user.displaySettings)
      }

      if (user.preferences?.leagues) {
        setSelectedLeagues(user.preferences.leagues)
      }
    }
  }, [user, loading, router])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSuccessMessage("")

    try {
      await updateUser({
        name: profileData.name,
        bio: profileData.bio,
      })

      setSuccessMessage("Profile updated successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Failed to update profile", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    setSuccessMessage("")

    try {
      await updateUser({
        notificationSettings,
      })

      setSuccessMessage("Notification settings updated successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Failed to update notification settings", error)
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveDisplay = async () => {
    setIsSaving(true)
    setSuccessMessage("")

    try {
      await updateUser({
        displaySettings,
      })

      setSuccessMessage("Display settings updated successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Failed to update display settings", error)
      toast({
        title: "Error",
        description: "Failed to update display settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveLeagues = async () => {
    setIsSaving(true)
    setSuccessMessage("")

    try {
      await updatePreferences({
        leagues: selectedLeagues,
      })

      setSuccessMessage("League preferences updated successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Failed to update league preferences", error)
      toast({
        title: "Error",
        description: "Failed to update league preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      if (event.target?.result) {
        const photoURL = event.target.result as string

        setProfileData((prev) => ({
          ...prev,
          photoURL,
        }))

        try {
          setIsSaving(true)
          await updateUser({ photoURL })
          toast({
            title: "Success",
            description: "Profile photo updated successfully",
          })
        } catch (error) {
          console.error("Failed to update profile photo", error)
          toast({
            title: "Error",
            description: "Failed to update profile photo. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsSaving(false)
        }
      }
    }
    reader.readAsDataURL(file)
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
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your profile settings and preferences</p>
        </div>

        {authError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card className="bg-[#111] border-[#333]">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.photoURL || ""} alt={profileData.name || ""} />
                      <AvatarFallback className="bg-blue-600 text-white text-2xl">
                        {profileData.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <CardTitle className="mt-4 text-white">{profileData.name}</CardTitle>
                  <CardDescription className="text-gray-400">{profileData.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {successMessage && (
                  <div className="bg-green-500/20 text-green-500 p-2 rounded-md mb-4 flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    {successMessage}
                  </div>
                )}
                <div className="space-y-2 mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-[#333] bg-[#1a1a1a] text-white hover:bg-[#222]"
                    onClick={() => router.push("/")}
                  >
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#111]">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="leagues"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  Leagues
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="display"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  Display
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card className="bg-[#111] border-[#333]">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="pl-10 bg-[#1a1a1a] border-[#333] text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="email"
                          value={profileData.email}
                          disabled
                          className="pl-10 bg-[#1a1a1a] border-[#333] text-gray-400"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-white">
                        Bio
                      </Label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full rounded-md bg-[#1a1a1a] border border-[#333] p-2 text-white"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="leagues" className="mt-6">
                <Card className="bg-[#111] border-[#333]">
                  <CardHeader>
                    <CardTitle className="text-white">League Preferences</CardTitle>
                    <CardDescription className="text-gray-400">
                      Select your favorite leagues to personalize your feed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                          <div className="w-12 h-12 relative mb-3 flex items-center justify-center">
                            <Image
                              src={league.logo || "/placeholder.svg"}
                              alt={league.name}
                              width={48}
                              height={48}
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
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveLeagues} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <Card className="bg-[#111] border-[#333]">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Preferences</CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Match Alerts</p>
                        <p className="text-sm text-gray-400">Get notified when your favorite teams are playing</p>
                      </div>
                      <Switch
                        checked={notificationSettings.matchAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, matchAlerts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Goal Alerts</p>
                        <p className="text-sm text-gray-400">Get notified when goals are scored</p>
                      </div>
                      <Switch
                        checked={notificationSettings.goalAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, goalAlerts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Team News</p>
                        <p className="text-sm text-gray-400">Get updates about your favorite teams</p>
                      </div>
                      <Switch
                        checked={notificationSettings.teamNews}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, teamNews: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Transfer News</p>
                        <p className="text-sm text-gray-400">Get updates about player transfers</p>
                      </div>
                      <Switch
                        checked={notificationSettings.transferNews}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, transferNews: checked })
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSaveNotifications}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="display" className="mt-6">
                <Card className="bg-[#111] border-[#333]">
                  <CardHeader>
                    <CardTitle className="text-white">Display Settings</CardTitle>
                    <CardDescription className="text-gray-400">Customize how Kick Score looks for you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Dark Mode</p>
                        <p className="text-sm text-gray-400">Use dark theme</p>
                      </div>
                      <Switch
                        checked={displaySettings.darkMode}
                        onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, darkMode: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Compact View</p>
                        <p className="text-sm text-gray-400">Show more content with less spacing</p>
                      </div>
                      <Switch
                        checked={displaySettings.compactView}
                        onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, compactView: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Show Scores</p>
                        <p className="text-sm text-gray-400">Show match scores in listings</p>
                      </div>
                      <Switch
                        checked={displaySettings.showScores}
                        onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, showScores: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-white">
                        Language
                      </Label>
                      <select
                        id="language"
                        value={displaySettings.language}
                        onChange={(e) => setDisplaySettings({ ...displaySettings, language: e.target.value })}
                        className="w-full rounded-md bg-[#1a1a1a] border border-[#333] p-2 text-white"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveDisplay} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Settings
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
