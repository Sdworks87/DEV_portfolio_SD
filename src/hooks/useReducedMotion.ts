import { useReducedMotion as useFramerReducedMotion } from "motion/react";

/**
 * Custom hook to detect if the user prefers reduced motion.
 * Uses Framer Motion's hook under the hood.
 */
export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion();
  return prefersReduced === true;
}
