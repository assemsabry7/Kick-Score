"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="border-t border-[#333] py-10 bg-[#121212]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Kick Score</h2>
            <p className="text-gray-400 mb-6">
              Kick Score is a comprehensive football platform providing real-time scores, statistics, and news for
              football fans around the world.
            </p>
          </div>

          {/* Middle Column */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Link href="/matches" className="block text-gray-400 hover:text-white mb-2">
                Matches
              </Link>
              <Link href="/news" className="block text-gray-400 hover:text-white mb-2">
                News
              </Link>
              <Link href="/transfers" className="block text-gray-400 hover:text-white mb-2">
                Transfer Center
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white mb-2">
                About us
              </Link>
              <Link href="/careers" className="block text-gray-400 hover:text-white mb-2">
                Careers
              </Link>
              <Link href="/advertise" className="block text-gray-400 hover:text-white mb-2">
                Advertise
              </Link>
            </div>
            <div>
              <Link href="/lineup-builder" className="block text-gray-400 hover:text-white mb-2">
                Lineup Builder
              </Link>
              <Link href="/faq" className="block text-gray-400 hover:text-white mb-2">
                FAQ
              </Link>
              <Link href="/fifa-rankings-men" className="block text-gray-400 hover:text-white mb-2">
                FIFA Rankings Men
              </Link>
              <Link href="/fifa-rankings-women" className="block text-gray-400 hover:text-white mb-2">
                FIFA Rankings Women
              </Link>
              <Link href="/predictor" className="block text-gray-400 hover:text-white mb-2">
                Predictor
              </Link>
              <Link href="/newsletter" className="block text-gray-400 hover:text-white mb-2">
                Newsletter
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-white font-medium mb-4">Follow the Developer</h3>
            <div className="flex space-x-4 mb-6">
              <motion.a
                href="https://www.facebook.com/SoyAssem/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="https://x.com/assemsabryy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/assemsbry/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#E1306C] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#222]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">© Copyright 2025 Reality AI. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-white">
                Terms of use
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-white">
                Cookie policy
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-white">
                Privacy policy
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center md:text-left">
            The use of automatic services (robots, crawler, indexing etc.) as well as other methods for systematic or
            regular use is not permitted.
          </p>
        </div>
      </div>
    </footer>
  )
}
