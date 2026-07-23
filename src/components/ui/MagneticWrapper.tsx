"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticWrapperProps {
  children: React.ReactElement;
  pull?: number; // How much the element follows the cursor (higher = more pull)
}

export function MagneticWrapper({ children, pull = 0.5 }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Use raw motion values for X/Y offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animation for smooth return and movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !ref.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      x.set(middleX * pull);
      y.set(middleY * pull);
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      x.set(0);
      y.set(0);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, x, y, pull, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => !shouldReduceMotion && setIsHovered(true)}
      onMouseLeave={() => !shouldReduceMotion && setIsHovered(false)}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
