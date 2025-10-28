// app/links/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import { FaGlobe, FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

const links = [
  {
    title: "My Portfolio Website",
    url: "https://lamanhtruong.com",
    icon: FaGlobe,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/lam-anh-truong-b84724224/",
    icon: FaLinkedin,
  },
  { title: "GitHub", url: "https://github.com/anhlamtruong", icon: FaGithub },
  {
    title: "Threads Tech",
    url: "https://www.threads.com/@lam.anh.truong",
    icon: SiThreads,
  },
  {
    title: "Projects",
    url: "https://lamanhtruong.com/?section=4",
    icon: FaCode,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const LinkPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pt-12 md:pt-4">
      <div className="w-full max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Image
            src="/assets/img/ava.jpg"
            alt="My Name"
            priority={false}
            quality={75}
            width={96}
            height={96}
            className="rounded-full mx-auto mb-4 border-2 border-gray-300 dark:border-gray-600 shadow-md"
            placeholder="blur"
            blurDataURL="/assets/img/ava.webp"
          />
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Lam Anh Truong
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-8">
            Web Developer | Software Engineer | Tech Enthusiast
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link, index) => (
            <motion.div key={index} variants={itemVariants}>
              <LinkButton title={link.title} url={link.url} Icon={link.icon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LinkPage;

const LinkButton = ({
  title,
  url,
  Icon,
}: {
  title: string;
  url: string;
  Icon?: React.ElementType;
}) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-700"
    >
      {Icon && <Icon className="mr-3 h-5 w-5" />} {title}
    </Link>
  );
};
