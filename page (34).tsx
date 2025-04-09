"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Globe, Lock, User, LogOut, Save, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout, loading, updateUser } = useAuth()
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
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

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }

    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      })
    }
  }, [user, loading, router])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      await updateUser({
        name: profileData.name,
        bio: profileData.bio,
      })
      // Show success message
    } catch (error) {
      console.error("Failed to update profile", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    try {
      await updateUser({
        notificationSettings,
      })
      // Show success message
    } catch (error) {
      console.error("Failed to update notification settings", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveDisplay = async () => {
    setIsSaving(true)
    try {
      await updateUser({
        displaySettings,
      })
      // Show success message
    } catch (error) {
      console.error("Failed to update display settings", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/login")
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
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card className="bg-[#111] border-[#333]">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.name || ""} />
                    <AvatarFallback className="bg-blue-600 text-white text-xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white">{user?.name}</CardTitle>
                    <CardDescription className="text-gray-400">{user?.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-[#333] bg-[#1a1a1a] text-white hover:bg-[#222]"
                    asChild
                  >
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </Button>
                  <Button variant="destructive" className="w-full mt-4" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#111]">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="display"
                  className="data-[state=active]:bg-[#222] text-gray-300 data-[state=active]:text-white"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Display
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6">
                <Card className="bg-[#111] border-[#333]">
                  <CardHeader>
                    <CardTitle className="text-white">Account Information</CardTitle>
                    <CardDescription className="text-gray-400">Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333] text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        disabled
                        className="bg-[#1a1a1a] border-[#333] text-gray-400"
                      />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#111] border-[#333] mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">Password</CardTitle>
                    <CardDescription className="text-gray-400">Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-white">
                        Current Password
                      </Label>
                      <Input id="current-password" type="password" className="bg-[#1a1a1a] border-[#333] text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-white">
                        New Password
                      </Label>
                      <Input id="new-password" type="password" className="bg-[#1a1a1a] border-[#333] text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" className="bg-[#1a1a1a] border-[#333] text-white" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
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
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Preferences"}
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
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Settings"}
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
