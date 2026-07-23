"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/components/ui/SplitText";
import { GlassCard } from "@/components/ui/GlassCard";
import { philosophyContent } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        // If reduced motion, elements are statically visible in their CSS
        gsap.set(".values-layer", { opacity: 1, y: 0 });
        gsap.set(".statement-layer", { opacity: 1, scale: 1 });
        return;
      }

      // We want to create a cinematic scroll-scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Scroll distance for the pin
          pin: true,
          scrub: 1, // Smooth scrubbing
          anticipatePin: 1,
        },
      });

      // 1. The statement scales down slightly and blurs/fades
      tl.to(".statement-layer", {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "none",
      });

      // 2. The values glide in from below
      tl.fromTo(
        ".values-layer",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5" // Overlap with statement fade
      );
      
      // Add a small pause at the end of the scroll before unpinning
      tl.to({}, { duration: 0.2 });

    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className={cn(
        "relative w-full z-10",
        // If not reducing motion, give it extra scroll height for the pin
        !shouldReduceMotion ? "min-h-[150vh]" : "py-32"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "flex w-full flex-col items-center px-6 md:px-12",
          // If pinning, it needs to be h-screen and sticky
          !shouldReduceMotion
            ? "h-screen justify-center overflow-hidden"
            : "gap-24"
        )}
      >
        {/* STATEMENT LAYER */}
        <div
          className={cn(
            "statement-layer flex w-full max-w-5xl flex-col items-center justify-center text-center",
            !shouldReduceMotion && "absolute inset-0 m-auto h-fit"
          )}
        >
          <SplitText
            text={philosophyContent.heading}
            className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-7xl lg:text-8xl"
            // If reducing motion, no scroll delay needed. If pinning, we let the user see it instantly upon arrival.
            delay={0.1}
          />
          <SplitText
            text={philosophyContent.subheading}
            className="mt-6 font-sans text-lg font-light text-text-secondary sm:text-xl md:text-3xl"
            delay={0.3}
          />
        </div>

        {/* VALUES LAYER */}
        <div
          className={cn(
            "values-layer flex w-full max-w-7xl flex-col gap-6 md:flex-row md:justify-center",
            // If pinning, start invisible for GSAP to animate
            !shouldReduceMotion && "absolute inset-0 m-auto h-fit opacity-0 translate-y-[100px]"
          )}
        >
          {philosophyContent.principles.map((principle) => (
            <GlassCard
              key={principle.id}
              blur="lg"
              className="group relative flex flex-1 flex-col justify-between overflow-hidden p-8 transition-colors duration-500 hover:border-primary/50"
            >
              {/* Subtle accent glow on hover */}
              <div className="absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <div className="font-mono text-xs tracking-widest text-primary sm:text-sm">
                  [{principle.id}]
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  {principle.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-text-secondary sm:text-base">
                  {principle.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
