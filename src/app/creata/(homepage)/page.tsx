"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoDisplay } from "../_component/videos-display";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ComponentLoading } from "@/components/ui/loading";
import { motion } from "framer-motion";

const cards = [
  {
    id: "k6I8MYN8fV0bSVYQN3A9",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardThumbnail: "",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "Ll5hGGaqIBGja9tg30h2",
    cardTitle: "Award Winning 2024",
    cardDescription: "🤷‍♂️",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid2.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "3",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "4",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
  {
    id: "5",
    cardTitle: "Doodle-Meme-Video",
    cardDescription: "ヾ(≧▽≦*)o     (●'◡'●)    ヾ(•ω•`)o",
    cardFooter: "Author Creata",
    cardContent: (
      <VideoDisplay
        key={"1"}
        src={"/videos/creata-doodle-meme-video/vid1.mp4"}
        title={""}
      />
    ),
  },
];

export default function CreataDashboardLayout() {
  const router = useRouter();
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleCardClick = (id: string) => {
    setClickedCardId(id);
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/creata/${id}`);
    }, 150);
  };

  useEffect(() => {
    setClickedCardId(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const isDisabled =
            clickedCardId !== card.id && clickedCardId !== null;

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
                  <CardTitle>{card.cardTitle}</CardTitle>
                  <CardDescription>{card.cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>{card.cardContent}</CardContent>
                <CardFooter>
                  <p className=" text-sm font-extralight">{card.cardFooter}</p>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
