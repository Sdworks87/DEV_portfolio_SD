"use client";

import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ReactNode, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";
import { gsap } from "gsap";

export default function LenisProvider({ children }: { children: ReactNode }) {
  // Sync GSAP ticker with Lenis requestAnimationFrame
  useEffect(() => {
    function update(time: number) {
      gsap.updateRoot(time / 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0, 0);
    
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ lerp: 0.1, duration: 1.5, syncTouch: true }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  );
}

// Inner component to hook into Lenis events
function GSAPSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}
