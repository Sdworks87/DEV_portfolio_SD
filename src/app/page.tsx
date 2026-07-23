import { Scene } from "@/components/three/Scene";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";

export default function Home() {
  return (
    <>
      {/* The main content that appears after preloader */}
      <main className="relative min-h-screen w-full flex flex-col">
        {/* Background 3D Scene */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Scene />
        </div>
        {/* Narrative Section 1: Hero */}
        <Hero />
        
        {/* Narrative Section 2: Philosophy */}
        <Philosophy />
        
        {/* We will add more sections below in future phases */}
        <div className="relative z-10 w-full min-h-[50svh]">
          {/* Placeholder for future sections */}
        </div>
      </main>
    </>
  );
}
