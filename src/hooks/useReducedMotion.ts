import { useMediaQuery } from "./useMediaQuery";

/**
 * Custom hook to detect if the user prefers reduced motion.
 * Uses the SSR-safe useMediaQuery hook under the hood.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
