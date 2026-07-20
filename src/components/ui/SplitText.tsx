"use client";

import { motion, Variants } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function SplitText({
  text,
  className = "",
  once = true,
  delay = 0,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split text into words, then words into characters.
  // We keep spaces by adding them after each word.
  const words = text.split(" ").map((word, i, arr) => {
    return word + (i !== arr.length - 1 ? " " : "");
  });

  const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const charVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      aria-label={text} // Screen readers read the full text
    >
      <span aria-hidden="true" className="inline-block">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-pre">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={charVariant}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </motion.div>
  );
}
