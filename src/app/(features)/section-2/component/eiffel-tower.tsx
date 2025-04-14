"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useCompaniesLogos } from "@/services/image-loader.ts/hooks/use-get-companies-logos";

const skillIcons = [
  { path: "/assets/logos/javascript.svg", name: "JavaScript" },
  { path: "/assets/logos/typescript.svg", name: "TypeScript" },
];

const EiffelTower = () => {
  const { data: logos, isLoading, isError } = useCompaniesLogos();
  const levels = [1, 2, 3, 3, 4, 5, 6, 7, 8, 10];
  let iconIndex = 0;
  if (isLoading) return <div>Loading ... </div>;
  if (isError) return <div>Error loading logos</div>;

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

const TowerLevel = ({
  icons,
}: {
  icons?: { path: string; name: string }[];
}) => {
  return (
    <motion.div
      className={`flex justify-center items-center space-x-5 mb-5 transition-all`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 8 }}
    >
      {icons?.map((icon, index) => (
        <WiggleBlock key={index} icon={icon} />
      ))}
    </motion.div>
  );
};

// Component for each block to add wiggle effect
const WiggleBlock = ({ icon }: { icon: { path: string; name: string } }) => {
  return (
    <motion.div
      className={cn(
        `h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-md cursor-pointer flex items-center justify-center` // Adjust size to fit more blocks
      )}
      whileHover={{ scale: 1.2, rotate: 90 }}
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
        style={{
          width: "auto", // Fixed width
          height: "auto", // Maintain aspect ratio
        }}
      />
    </motion.div>
  );
};

export default EiffelTower;
