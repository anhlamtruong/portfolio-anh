"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ComponentLoading } from "@/components/ui/loading";
import { motion } from "framer-motion";
import { Thumbnail } from "../_component/thumbnail";
import { useTRPC } from "../_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import HomeIconComponent from "../(slug)/_component/home-icon";
import StepBackIconComponent from "../(slug)/_component/step-back-icon";
import Logo from "../_component/logo";

export default function CreataDashboardLayout() {
  // ====== Data Fetching ======
  const trpc = useTRPC();
  const { data: cards } = useSuspenseQuery(
    trpc.creata.getComponentsMetaData.queryOptions()
  ); // Fetch video data from the server

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
    <div className="relative group h-screen px-8 py-24 overflow-auto">
      <div className="flex md:justify-between justify-around items-center top-0 left-0 transform md:-translate-y-full group-hover:translate-y-0 duration-500 group-hover:opacity-100 md:pointer-events-auto pointer-events-none absolute z-50 text-white p-4 w-full bg-black bg-opacity-50 md:opacity-0 hover:opacity-100 transition-all ">
        <Logo className="invert " />
        <div className="mr-4 flex items-center justify-center md:justify-end gap-6">
          <HomeIconComponent />
          <StepBackIconComponent />
        </div>
      </div>
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
                  <CardTitle>{card.props.title}</CardTitle>
                  <CardDescription>{card.props.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Thumbnail
                    src={card.props.thumbnails}
                    alt={card.props.title}
                  />
                </CardContent>
                <CardFooter>
                  <p className=" text-sm font-extralight">{`created by ${card.props.author}`}</p>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
