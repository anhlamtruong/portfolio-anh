"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const characters = "█▓▒░<>/|\\=+-!?@#$%&*";

const randomize = (length: number) =>
  Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

export const GlitchText = ({
  text,
  duration = 2000,
}: {
  text: string;
  duration: number;
}) => {
  const [glitchedChars, setGlitchedChars] = useState<string[]>([]);

  useEffect(() => {
    const steps = Math.floor(duration / 50);
    let frame = 0;

    const interval = setInterval(() => {
      const progress = Math.min(1, frame / steps);
      const revealCount = Math.floor(progress * text.length);

      const newChars = text
        .split("")
        .map((char, i) =>
          i < revealCount
            ? char
            : characters[Math.floor(Math.random() * characters.length)]
        );

      setGlitchedChars(newChars);
      if (progress === 1) clearInterval(interval);

      frame++;
    }, 50);

    return () => clearInterval(interval);
  }, [text, duration]);

  return (
    <motion.div
      className="text__glitch flex gap-[0.05em]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {glitchedChars.map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ y: 0 }}
          animate={{ y: [0, -2, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1, delay: idx * 0.03 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};
