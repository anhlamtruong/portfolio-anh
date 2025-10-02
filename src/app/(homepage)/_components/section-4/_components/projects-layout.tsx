"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title: string;
};

export const ProjectLayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3   mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? " rounded-lg cursor-pointer absolute inset-0 h-5/6 w-11/12 md:w-5/6 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-xl h-full w-full"
                  : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent
              className={cn(selected?.id ? "blur-sm  " : "")}
              card={card}
            />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({
  card,
  className,
}: {
  card: Card;
  className?: string;
}) => {
  return (
    <div className="group ">
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="auto"
        width="auto"
        className={cn(
          className,
          "object-cover object-left absolute inset-0 h-full w-full transition duration-200"
        )}
        alt="thumbnail"
      />
      {/* Add a dark gradient overlay for text readability */}
      <div
        className={cn(
          className,
          "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
        )}
      />

      {/* The Title with hover animation */}
      <motion.h3
        layoutId={`title-${card.id}`}
        className="z-10 absolute bottom-4 p-5 left-4 text-white text-lg md:text-xl font-semibold transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2 "
      >
        {card.title}
      </motion.h3>
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-top shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full rounded-lg bg-black opacity-95 z-20"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative py-9 px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
