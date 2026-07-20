"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText as GSAPSplitText } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const element = containerRef.current;
      if (!element) return;

      // Wrap lines for overflow hidden reveal
      const split = new GSAPSplitText(element, { type: "lines", linesClass: "overflow-hidden" });
      const splitInner = new GSAPSplitText(split.lines, { type: "lines", linesClass: "reveal-inner" });

      gsap.from(splitInner.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, delay] }
  );

  return (
    <div
      ref={containerRef}
      className={cn(shouldReduceMotion ? "opacity-100" : "", className)}
    >
      {children}
    </div>
  );
}
