"use client";

import { motion } from "framer-motion";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useTRPC } from "../../_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HomePageGetLogosOutput } from "../../_types/init";

const skillIcons = [
  { path: "/assets/logos/javascript.svg", name: "JavaScript" },
  { path: "/assets/logos/typescript.svg", name: "TypeScript" },
];

const EiffelTower = () => {
  const trpc = useTRPC();
  const { data: logos } = useSuspenseQuery(
    trpc.homepage.getLogos.queryOptions()
  ); // Fetch video data from the server

  const levels = [1, 2, 3, 3, 4, 5, 6, 7, 8, 10];
  let iconIndex = 0;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="relative">
        {levels.map((count, levelIndex) => {
          const levelIcons = logos
            ? logos.slice(iconIndex, iconIndex + count)
            : skillIcons.slice(iconIndex, iconIndex + count);
          iconIndex += count;
          return <TowerLevel key={levelIndex} icons={levelIcons} />;
        })}
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // This creates the staggered effect. Each child animation will
      // start 0.07 seconds after the previous one.
      staggerChildren: 0.07,
    },
  },
};
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};
const TowerLevel = ({ icons }: { icons?: HomePageGetLogosOutput }) => {
  return (
    <motion.div
      className={`flex justify-center items-center space-x-5 mb-5`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // viewport={{ once: true }}
    >
      {icons?.map((icon, index) => <WiggleBlock key={index} icon={icon} />)}
    </motion.div>
  );
};

// Component for each block to add wiggle effect
const WiggleBlock = ({ icon }: { icon: { path: string; name: string } }) => {
  return (
    <motion.div
      className="overflow-auto h-8 w-auto sm:h-9 sm:w-auto md:h-10 md:w-auto rounded-md cursor-pointer flex items-center justify-center"
      whileHover={{ scale: 1.2, rotate: 90 }}
      variants={itemVariants}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: "100%",
      }}
      onTap={() => toast(`This skill is ${icon.name}`)}
    >
      <Image
        src={icon.path}
        alt={icon.name}
        width={32}
        height={32}
        className="h-8 w-auto sm:h-9 sm:w-auto md:h-10 md:w-auto"
      />
    </motion.div>
  );
};

export default EiffelTower;
