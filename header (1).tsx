"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Ticket, Trophy, Menu, X, LogIn, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-black shadow-md" : "bg-black/90 backdrop-blur-sm",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/kick-score-logo.png"
                alt="Kick Score"
                width={200}
                height={50}
                className="h-12 w-auto"
                priority
              />
              <span className="sr-only">Kick Score</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex md:w-1/3 lg:w-1/4">
          <div className="relative w-full">
            <Search
              className={cn(
                "absolute left-2.5 top-2.5 h-4 w-4 transition-colors duration-200",
                searchFocused ? "text-white" : "text-gray-500",
              )}
            />
            <Input
              type="search"
              placeholder="Search teams, players..."
              className="w-full pl-8 bg-[#111] border-[#333] text-white focus:border-blue-600 transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <nav
          className={cn(
            "absolute left-0 right-0 top-16 z-50 bg-black border-b border-[#222] md:static md:top-0 md:border-0 md:bg-transparent",
            isMenuOpen ? "block" : "hidden md:block",
          )}
        >
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <ul className="container flex flex-col items-start py-2">
                  <NavItem href="/matches" label="Matches" pathname={pathname} />
                  <NavItem href="/leagues" label="Leagues" pathname={pathname} hasDropdown />
                  <NavItem
                    href="/tickets"
                    label="Tickets"
                    pathname={pathname}
                    icon={<Ticket className="mr-2 h-4 w-4" />}
                  />
                  <NavItem
                    href="/worldcup2034"
                    label="World Cup 2034"
                    pathname={pathname}
                    icon={<Trophy className="mr-2 h-4 w-4" />}
                  />
                  <NavItem href="/about" label="About Us" pathname={pathname} />
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="hidden md:flex md:items-center md:justify-end md:gap-1">
            <NavItem href="/matches" label="Matches" pathname={pathname} />
            <NavItem href="/leagues" label="Leagues" pathname={pathname} hasDropdown />
            <NavItem href="/tickets" label="Tickets" pathname={pathname} icon={<Ticket className="mr-2 h-4 w-4" />} />
            <NavItem
              href="/worldcup2034"
              label="World Cup 2034"
              pathname={pathname}
              icon={<Trophy className="mr-2 h-4 w-4" />}
            />
            <NavItem href="/about" label="About Us" pathname={pathname} />

            <li>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL || "/placeholder.svg"}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#111] border-[#333] text-white">
                    <DropdownMenuItem className="hover:bg-[#222]">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#222]">Settings</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#222]" onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="default" size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

interface NavItemProps {
  href: string
  label: string
  pathname: string
  icon?: React.ReactNode
  hasDropdown?: boolean
}

function NavItem({ href, label, pathname, icon, hasDropdown }: NavItemProps) {
  const isActive = pathname === href || pathname.startsWith(href)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li className="w-full md:w-auto">
      {hasDropdown ? (
        <div className="relative group">
          <button
            className={cn(
              "flex h-12 w-full items-center px-3 text-sm font-medium transition-colors hover:text-white md:h-10 rounded-md nav-link",
              isActive ? "text-white bg-[#222]" : "text-gray-400",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {icon}
            {label}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <div className="absolute left-0 mt-1 w-48 origin-top-left rounded-md bg-[#111] shadow-lg ring-1 ring-[#333] hidden group-hover:block">
            <div className="py-1">
              <Link href="/leagues/premier-league" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222]">
                Premier League
              </Link>
              <Link href="/leagues/laliga" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222]">
                LaLiga
              </Link>
              <Link href="/leagues/bundesliga" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222]">
                Bundesliga
              </Link>
              <Link href="/leagues/serie-a" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222]">
                Serie A
              </Link>
              <Link href="/leagues" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#222] font-medium">
                All Leagues
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={href}
          className={cn(
            "flex h-12 w-full items-center px-3 text-sm font-medium transition-colors hover:text-white md:h-10 rounded-md nav-link",
            isActive ? "text-white bg-[#222] active" : "text-gray-400",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {icon}
          {label}
          {isHovered && !isActive && (
            <motion.span
              layoutId="hoverIndicator"
              className="absolute bottom-0 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.2 }}
            />
          )}
        </Link>
      )}
    </li>
  )
}
