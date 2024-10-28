"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";

// Define skill icons
const skillIcons = [
  { path: "/assets/logos/javascript.svg", name: "JavaScript" },
  { path: "/assets/logos/typescript.svg", name: "TypeScript" },
  { path: "/assets/logos/python.svg", name: "Python" },
  { path: "/assets/logos/c-plusplus.svg", name: "C++" },
  { path: "/assets/logos/java.svg", name: "Java" },
  { path: "/assets/logos/dart.svg", name: "Dart" },
  { path: "/assets/logos/react.svg", name: "React" },
  { path: "/assets/logos/graphql.svg", name: "GraphQL" },
  { path: "/assets/logos/nodejs-icon.svg", name: "Node.js" },
  { path: "/assets/logos/nextjs-icon.svg", name: "Next.js" },
  { path: "/assets/logos/flutter.svg", name: "Flutter" },
  { path: "/assets/logos/html-5.svg", name: "HTML5" },
  { path: "/assets/logos/css-3.svg", name: "CSS3" },
  { path: "/assets/logos/sass.svg", name: "SASS" },
  { path: "/assets/logos/redux.svg", name: "Redux" },
  { path: "/assets/logos/redux-saga.svg", name: "Redux Saga" },
  { path: "/assets/logos/material-ui.svg", name: "Material UI" },
  { path: "/assets/logos/tailwindcss-icon.svg", name: "Tailwind CSS" },
  { path: "/assets/logos/prisma.svg", name: "Prisma" },
  { path: "/assets/logos/aws.svg", name: "AWS" },
  { path: "/assets/logos/firebase.svg", name: "Firebase" },
  { path: "/assets/logos/mongodb-icon.svg", name: "MongoDB" },
  { path: "/assets/logos/planetscale.svg", name: "PlanetScale" },
  { path: "/assets/logos/neon-icon.svg", name: "Neon DB" },
  { path: "/assets/logos/google-cloud.svg", name: "Google Cloud" },
  {
    path: "/assets/logos/google-cloud-functions.svg",
    name: "Google Cloud Functions",
  },
  { path: "/assets/logos/google-cloud-run.svg", name: "Google Cloud Run" },
  { path: "/assets/logos/rabbitmq-icon.svg", name: "RabbitMQ" },
  { path: "/assets/logos/serverless.svg", name: "Serverless" },
  { path: "/assets/logos/mysql-icon.svg", name: "MySQL" },
  { path: "/assets/logos/postgresql.svg", name: "PostgreSQL" },
  { path: "/assets/logos/oracle.svg", name: "Oracle" },
  { path: "/assets/logos/linux-tux.svg", name: "Linux" },
  { path: "/assets/logos/ubuntu.svg", name: "Ubuntu" },
  { path: "/assets/logos/git-icon.svg", name: "Git" },
  { path: "/assets/logos/github-icon.svg", name: "GitHub" },
  { path: "/assets/logos/salesforce.svg", name: "Salesforce" },
  { path: "/assets/logos/stripe.svg", name: "Stripe" },
  { path: "/assets/logos/figma.svg", name: "Figma" },
  { path: "/assets/logos/adobe-photoshop.svg", name: "Adobe Photoshop" },
  { path: "/assets/logos/adobe-lightroom.svg", name: "Adobe Lightroom" },
  {
    path: "/assets/logos/adobe-after-effects.svg",
    name: "Adobe After Effects",
  },
  { path: "/assets/logos/adobe-xd.svg", name: "Adobe XD" },
  { path: "/assets/logos/adobe-premiere.svg", name: "Adobe Premiere" },
];

const EiffelTower = () => {
  // Flatten the icons across all levels to use up all icons
  const levels = [1, 2, 3, 3, 4, 5, 6, 7, 8, 10];
  let iconIndex = 0;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="relative">
        {levels.map((count, levelIndex) => {
          const levelIcons = skillIcons.slice(iconIndex, iconIndex + count);
          iconIndex += count;
          return <TowerLevel key={levelIndex} icons={levelIcons} />;
        })}
      </div>
    </div>
  );
};

const TowerLevel = ({ icons }: { icons: { path: string; name: string }[] }) => {
  return (
    <motion.div
      className={`flex justify-center items-center space-x-5 mb-5 transition-all`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 8 }}
    >
      {icons.map((icon, index) => (
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
        className=" w-auto object-contain"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
        }}
      />
    </motion.div>
  );
};

export default EiffelTower;
