import { Variants } from "motion/react";
import { gsap } from "./gsap-config";

/**
 * Custom Easing Curves
 * Cinematic, smooth, and weighty feeling.
 */
export const easings = {
  // A very smooth, drawn-out exponential curve.
  cinematic: [0.76, 0, 0.24, 1] as const,
  // A slightly snappier entrance curve.
  snappy: [0.25, 1, 0.5, 1] as const,
  // GSAP equivalent strings
  gsapCinematic: "power4.inOut",
  gsapSnappy: "back.out(1.2)",
};

/**
 * Motion Variants
 * Used for standard Framer Motion elements.
 */
export const motionVariants = {
  // Simple fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, ease: easings.cinematic } 
    },
  } as Variants,

  // Fade in and slide up
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: easings.cinematic } 
    },
  } as Variants,

  // Parent stagger container
  staggerContainer: (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  } as Variants),
};

/**
 * GSAP Utility: Scroll Parallax
 * Attaches a parallax effect to a target element tied to scroll.
 * 
 * @param element The target DOM element or selector string (scoped).
 * @param trigger The scroll trigger element (usually the container).
 * @param yOffset The distance (e.g., "100px", "-50%") to move during the scroll timeline.
 */
export function createScrollParallax(
  element: Element | string,
  trigger: Element | string,
  yOffset: string | number = "20%"
) {
  return gsap.to(element, {
    y: yOffset,
    ease: "none",
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}
