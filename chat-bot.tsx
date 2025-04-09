"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void
      open: () => void
      close: () => void
      isOpen: boolean
    }
  }
}

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if the botpress webchat is already initialized
    if (typeof window !== "undefined" && !isInitialized) {
      // Wait for botpressWebChat to be available
      const checkBotpress = setInterval(() => {
        if (window.botpressWebChat) {
          clearInterval(checkBotpress)
          setIsInitialized(true)
        }
      }, 500)

      return () => clearInterval(checkBotpress)
    }
  }, [isInitialized])

  const toggleChat = () => {
    if (window.botpressWebChat) {
      if (window.botpressWebChat.isOpen) {
        window.botpressWebChat.close()
        setIsChatOpen(false)
      } else {
        window.botpressWebChat.open()
        setIsChatOpen(true)
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
