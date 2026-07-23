"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { preloaderConfig, TerminalLine } from "@/lib/preloader-config";

// Create a simple seeded random generator for SSR-safe deterministic binary
const pseudoRandom = (seed: number) => {
  let value = seed;
  return function () {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

gsap.registerPlugin(useGSAP);

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);
  
  // Track if preloader should be removed from DOM
  const [isComplete, setIsComplete] = useState(false);


  useGSAP(() => {
    if (!isClient) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Wait a bit, then remove from DOM
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: preloaderConfig.exitDuration,
          ease: "power2.inOut",
          onComplete: () => setIsComplete(true),
        });
      },
    });

    // 1. Initial boot header fade in
    tl.to(".preloader-header", { opacity: 1, duration: 0.5, ease: "power1.inOut" }, "+=0.2");

    // 2. Animate boot lines sequence
    tl.to(".boot-line", {
      opacity: 1,
      duration: 0.1,
      stagger: 0.2,
    });

    // 3. Show portrait binary mask container
    tl.to(".portrait-container", { opacity: 1, duration: 0.3 }, "+=0.5");

    // 4. Animate identity lines sequence
    tl.to(".identity-line", {
      opacity: 1,
      duration: 0.1,
      stagger: 0.2,
    });

    // 5. Scanline effect over portrait
    tl.to(".scanline", {
      top: "100%",
      duration: 1.5,
      ease: "power1.inOut",
    });

    // 6. Reveal actual image and hide binary mask
    tl.to(".portrait-binary-mask", { opacity: 0, duration: 0.5 }, "-=0.2");
    tl.to(".portrait-image", { opacity: 1, duration: 0.5 }, "-=0.5");

    // 7. Access granted final flash
    tl.to(".access-granted", { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 }, "+=0.2");
    tl.to(".access-granted", { opacity: 1, duration: 0.5 });
    
  }, { scope: containerRef, dependencies: [isClient] });

  // Generate deterministic binary grid
  const prng = pseudoRandom(preloaderConfig.binarySeed);
  const binaryGrid = Array.from({ length: preloaderConfig.portrait.binaryRows }).map(() =>
    Array.from({ length: preloaderConfig.portrait.binaryCols })
      .map(() => (prng() > 0.5 ? "1" : "0"))
      .join(" ")
  );

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background font-mono text-zinc-300 overflow-hidden"
    >
      {/* Background Binary Rain (CSS animated) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden text-[10px] leading-none whitespace-pre select-none text-primary/40 flex">
         <div className="animate-preloader-rain h-[200%] w-full flex flex-wrap content-start">
            {/* Just filling some space with binary text for the rain effect */}
            {Array.from({ length: 150 }).map((_, i) => (
              <span key={i} className="mr-2 mb-2">
                {Array.from({ length: 50 }).map(() => (prng() > 0.5 ? "1" : "0")).join("")}
              </span>
            ))}
         </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col gap-12 sm:flex-row sm:justify-between items-center sm:items-start">
        
        {/* Left Column: Terminal Output */}
        <div className="flex-1 w-full flex flex-col gap-8 text-sm sm:text-base">
          <div className="preloader-header opacity-0 text-primary border-b border-primary/30 pb-2 uppercase tracking-widest font-semibold">
            {preloaderConfig.header}
          </div>

          <div className="flex flex-col gap-2">
            {preloaderConfig.bootLines.map((line: TerminalLine, i: number) => (
              <div key={i} className="boot-line opacity-0 flex justify-between">
                <span>{line.text}</span>
                {line.status && <span className="text-primary">[{line.status}]</span>}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {preloaderConfig.identityLines.map((line: TerminalLine, i: number) => (
              <div key={i} className="identity-line opacity-0 flex justify-between">
                <span>{line.text}</span>
                {line.status && <span className="text-secondary">[{line.status}]</span>}
              </div>
            ))}
          </div>
          
          <div className="access-granted opacity-0 text-2xl sm:text-4xl font-bold text-white tracking-widest mt-8 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Access Granted
          </div>
        </div>

        {/* Right Column: Portrait Reveal */}
        <div className="portrait-container opacity-0 relative w-64 h-80 sm:w-80 sm:h-96 border border-border bg-surface overflow-hidden shrink-0">
          
          {/* Scanline */}
          <div className="scanline absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(76,201,240,0.8)] z-30" />

          {/* Binary Mask */}
          <div className="portrait-binary-mask absolute inset-0 z-20 flex flex-col items-center justify-center text-[6px] leading-[6px] sm:text-[8px] sm:leading-[8px] text-zinc-600 tracking-tighter opacity-80 overflow-hidden select-none">
            {binaryGrid.map((row, i) => (
              <div key={i} className="whitespace-nowrap">{row}</div>
            ))}
          </div>

          {/* Actual Image */}
          <div className="portrait-image opacity-0 absolute inset-0 z-10">
            {isClient && (
              <Image
                src={preloaderConfig.portrait.src}
                alt={preloaderConfig.portrait.alt}
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover grayscale contrast-125 mix-blend-screen"
                priority
              />
            )}
            {/* Overlay grid for cyber feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
          </div>
          
          {/* Framing corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50 z-30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50 z-30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50 z-30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50 z-30" />
        </div>

      </div>
    </div>
  );
}
