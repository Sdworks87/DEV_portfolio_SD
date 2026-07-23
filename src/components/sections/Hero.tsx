"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { siteMetadata } from "@/lib/constants";
import { preloaderConfig } from "@/lib/preloader-config";
import { SplitText } from "../ui/SplitText";
import { Button } from "../ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { easings } from "@/lib/animations";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) {
        gsap.set(".hero-portrait", { opacity: 0.12 });
        gsap.set(".hero-status", { opacity: 1, y: 0 });
        gsap.set(".hero-action", { opacity: 1, y: 0 });
        gsap.set(".hero-scroll", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        delay: 0.5, // Give preloader time to fade out before starting heavy animation
      });

      // 1. Subtle zoom out and fade in for the portrait background
      tl.fromTo(
        ".hero-portrait",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 0.12, duration: 2.5, ease: "power2.out" }
      );

      // 2. Fade in the system status badge
      tl.fromTo(
        ".hero-status",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=1.5"
      );

      // Note: SplitText handles its own character reveal via Framer Motion, 
      // but we wait for it to finish before bringing in buttons.
      
      // 3. Reveal buttons
      tl.fromTo(
        ".hero-action",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "+=1.0"
      );

      // 4. Reveal scroll indicator
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

      // --- Scroll Parallax Effects ---

      // As we scroll down, the text moves up faster and fades/blurs out
      gsap.to(".hero-content", {
        y: "-30%",
        opacity: 0,
        filter: "blur(12px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // The portrait parallax moves downward slightly to create deep depth
      gsap.to(".hero-portrait", {
        y: "15%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background Portrait Integration */}
      <div className="hero-portrait pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-screen">
        <Image
          src={preloaderConfig.portrait.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center grayscale contrast-125"
        />
        {/* Gradients to fade edges smoothly into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]/40" />
      </div>

      {/* Main Content */}
      <div className="hero-content relative z-10 flex w-full max-w-6xl flex-col items-center text-center">
        
        {/* Status Badge */}
        <div className="hero-status mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-[10px] sm:text-xs text-primary backdrop-blur-md uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          System Online // Awaits Input
        </div>

        {/* Cinematic Name Reveal */}
        <SplitText
          text={siteMetadata.developerName}
          className="font-display text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-[10rem] leading-none text-text-primary"
          delay={1.2} // Syncs with GSAP timeline
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: easings.cinematic }}
          className="mt-6 max-w-2xl text-lg font-light text-text-secondary sm:text-xl md:text-2xl"
        >
          {siteMetadata.developerTitle} bridging the gap between <span className="text-text-primary font-medium">design</span> and <span className="text-text-primary font-medium">engineering</span>.
        </motion.p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <div className="hero-action opacity-0">
            <Button variant="primary" size="lg">
              Explore Projects
            </Button>
          </div>
          <div className="hero-action opacity-0">
            <Button variant="ghost" size="lg">
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0">
        <span className="font-mono text-[10px] sm:text-xs tracking-widest text-text-secondary">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-text-secondary"
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}
