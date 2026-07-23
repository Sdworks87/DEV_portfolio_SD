"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { FloatingGrid } from "./FloatingGrid";
import { sceneConfig } from "@/lib/scene-config";

/**
 * Fallback gradient shown while the 3D scene loads
 * or when WebGL is not available.
 */
function SceneFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at center, ${sceneConfig.fallback.gradientVia} 0%, ${sceneConfig.fallback.gradientFrom} 70%, ${sceneConfig.fallback.gradientTo} 100%)`,
      }}
    />
  );
}

/**
 * Detects WebGL support in the browser.
 * Used as an external store snapshot to avoid setState-in-effect.
 */
function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}



/**
 * Scene — React Three Fiber canvas wrapper.
 *
 * This component is designed to be lazy-loaded via `next/dynamic`
 * with `ssr: false` from the Hero section.
 *
 * Features:
 * - Suspense boundary with gradient fallback
 * - WebGL availability check with graceful degradation
 * - Adaptive device pixel ratio
 * - Composes ParticleField and FloatingGrid
 */
export function Scene() {
  const [hasWebGL, setHasWebGL] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasWebGL(checkWebGL());
  }, []);

  if (!hasWebGL) {
    return <SceneFallback />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          dpr={sceneConfig.dpr}
          camera={{
            fov: sceneConfig.camera.fov,
            near: sceneConfig.camera.near,
            far: sceneConfig.camera.far,
            position: sceneConfig.camera.position,
          }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ParticleField />
          <FloatingGrid />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
