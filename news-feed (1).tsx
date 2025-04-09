"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function NewsFeed() {
  const news = [
    {
      id: "n1",
      title: "Football transfer rumours: Arsenal's Gyokeres plan; Man Utd consider Garnacho swap bid",
      image: "/placeholder.svg?height=60&width=80&text=Transfer",
      time: "4 hr. ago",
    },
    {
      id: "n2",
      title: "Argentina qualify for World Cup after Bolivia draw",
      image: "/placeholder.svg?height=60&width=80&text=Argentina",
      time: "6 hr. ago",
    },
    {
      id: "n3",
      title: "Champions League: Predictions for this week's matches",
      image: "/placeholder.svg?height=60&width=80&text=UCL",
      time: "8 hr. ago",
    },
  ]

  return (
    <motion.div
      className="rounded-lg border border-[#333] bg-[#1e1e1e] text-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="p-4 font-semibold border-b border-[#333]">News</div>

      <div className="p-2">
        <Badge
          variant="outline"
          className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-400 border-green-800"
        >
          New
        </Badge>
        <p className="text-sm mt-2 text-gray-300">A redesigned News page</p>
        <div className="mt-2 rounded-md border border-[#333] p-2 bg-[#252525]">
          <div className="h-20 w-full bg-[#333] rounded-md"></div>
        </div>
      </div>

      <div className="divide-y divide-[#333]">
        {news.map((item, index) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <motion.div
              className="p-4 hover:bg-[#252525] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex gap-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  width={80}
                  height={60}
                  alt=""
                  className="rounded-md object-cover"
                />
                <div className="space-y-1">
                  <h3 className="font-medium line-clamp-2 text-gray-200">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
