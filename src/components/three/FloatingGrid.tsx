"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneConfig } from "@/lib/scene-config";

/**
 * FloatingGrid — a subtle wireframe grid in the background.
 *
 * Adds visual depth without distraction.
 * Slowly rotates and sits behind the particle field.
 */
export function FloatingGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const { size, divisions, opacity, color, rotationSpeed } = sceneConfig.grid;

  useFrame(() => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x += rotationSpeed;
    gridRef.current.rotation.y += rotationSpeed * 0.7;
  });

  return (
    <group ref={gridRef} position={[0, 0, -3]}>
      <gridHelper
        args={[size, divisions, color, color]}
        rotation={[Math.PI / 4, 0, 0]}
        material-opacity={opacity}
        material-transparent={true}
        material-depthWrite={false}
      />
    </group>
  );
}
