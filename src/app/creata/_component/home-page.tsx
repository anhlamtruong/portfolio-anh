"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ComponentLoading } from "@/components/ui/loading"
import { motion } from "framer-motion"
import { Thumbnail } from "../_component/thumbnail"
import { useTRPC } from "../_trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

import { CreateButton } from "../_component/create-button"
import NavigationBar from "../_component/navigation-bar"

export default function HomePageComponent() {
  // ====== Data Fetching ======
  const trpc = useTRPC()
  const { data: cards } = useSuspenseQuery(
    trpc.creata.getComponentsMetaData.queryOptions()
  ) // Fetch video data from the server

  const router = useRouter()

  const [clickedCardId, setClickedCardId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleCardClick = (id: string) => {
    setClickedCardId(id)
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/creata/comp/${id}`)
    }, 150)
  }

  useEffect(() => {
    setClickedCardId(null)
    setIsLoading(false)
  }, [])

  return (
    <div className="relative group h-screen px-8 py-24 overflow-auto">
      <NavigationBar />
      <CreateButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const isDisabled = clickedCardId !== card.id && clickedCardId !== null

          return (
            <motion.div
              className="relative"
              key={card.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => handleCardClick(card.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 8 }}
            >
              {/* Overlay for dimming the card */}
              {isLoading && !isDisabled && (
                <>
                  <div className="absolute inset-0 bg-black blur-sm bg-opacity-50 flex items-center pointer-events-auto justify-center invert z-20">
                    <ComponentLoading loading={isLoading} />
                  </div>
                </>
              )}
              <Card
                className={cn(
                  "transition-transform duration-300 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  isDisabled && "opacity-50 pointer-events-none scale-95"
                )}
              >
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Thumbnail src={card.thumbnails} alt={card.name} />
                </CardContent>
                <CardFooter>
                  <p className=" text-sm font-extralight">{`created by ${card.author}`}</p>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
