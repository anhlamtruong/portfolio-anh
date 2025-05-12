"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = ({
  className,
  src = "/logo/logo-transparent-background.svg",
}: {
  className?: string;
  src?: string;
}) => {
  const router = useRouter();
  return (
    <motion.div
      onClick={() => router.push("/creata")}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(className, "cursor-pointer")}
    >
      <Image src={src} alt="Logo" width={40} height={40} priority />
    </motion.div>
  );
};

export default Logo;
