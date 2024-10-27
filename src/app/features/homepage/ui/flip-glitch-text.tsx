// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// export const FlipGlitchText = ({
//   words,
//   duration = 3000,
//   className,
// }: {
//   words: string[];
//   duration?: number;
//   className?: string;
// }) => {
//   const [currentWord, setCurrentWord] = useState(words[0]);
//   const [isAnimating, setIsAnimating] = useState<boolean>(false);
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:'<>?,./";

//   const startAnimation = useCallback(() => {
//     const nextWord = words[words.indexOf(currentWord) + 1] || words[0];
//     setCurrentWord(nextWord);
//     setIsAnimating(true);
//   }, [currentWord, words]);

//   useEffect(() => {
//     if (!isAnimating)
//       setTimeout(() => {
//         startAnimation();
//       }, duration);
//   }, [isAnimating, duration, startAnimation]);

//   // Utility to generate random characters for glitch effect
//   const getRandomCharacter = () => characters.charAt(Math.floor(Math.random() * characters.length));

//   return (
//     <AnimatePresence
//       onExitComplete={() => {
//         setIsAnimating(false);
//       }}
//     >
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 100,
//           damping: 10,
//         }}
//         exit={{
//           opacity: 0,
//           y: -40,
//           x: 40,
//           filter: "blur(8px)",
//           scale: 2,
//           position: "absolute",
//         }}
//         className={cn(
//           "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
//           className
//         )}
//         key={currentWord}
//       >
//         {currentWord.split(" ").map((word, wordIndex) => (
//           <motion.span
//             key={word + wordIndex}
//             initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             transition={{
//               delay: wordIndex * 0.3,
//               duration: 0.3,
//             }}
//             className="inline-block whitespace-nowrap"
//           >
//             {word.split("").map((letter, letterIndex) => (
//               <GlitchLetter
//                 key={word + letterIndex}
//                 letter={letter}
//                 wordIndex={wordIndex}
//                 letterIndex={letterIndex}
//               />
//             ))}
//             <span className="inline-block">&nbsp;</span>
//           </motion.span>
//         ))}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // Sub-component to handle the glitch effect for individual letters
// const GlitchLetter = ({
//   letter,
//   wordIndex,
//   letterIndex,
// }: {
//   letter: string;
//   wordIndex: number;
//   letterIndex: number;
// }) => {
//   const [displayLetter, setDisplayLetter] = useState(letter);
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:'<>?,./";

//   useEffect(() => {
//     const glitchInterval = setInterval(() => {
//       // Randomly show glitchy characters
//       if (Math.random() > 0.5) {
//         setDisplayLetter(characters.charAt(Math.floor(Math.random() * characters.length)));
//       } else {
//         setDisplayLetter(letter);
//       }
//     }, 50);

//     // Stop glitch effect after a short delay
//     const clearGlitch = setTimeout(() => {
//       clearInterval(glitchInterval);
//       setDisplayLetter(letter);
//     }, 500 + letterIndex * 100);

//     return () => {
//       clearInterval(glitchInterval);
//       clearTimeout(clearGlitch);
//     };
//   }, [letter, letterIndex]);

//   return (
//     <motion.span
//       initial={{ opacity: 0, y: 10, rotateX: 90 }}
//       animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
//       transition={{
//         delay: wordIndex * 0.3 + letterIndex * 0.05,
//         duration: 0.5,
//         ease: "easeInOut",
//       }}
//       className="inline-block"
//     >
//       {displayLetter}
//     </motion.span>
//   );
// };
