"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneConfig } from "@/lib/scene-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Generates particle positions and colors in a spherical distribution.
 * Extracted as a pure function (not called during render) to satisfy
 * React's strict purity rules around Math.random().
 */
function generateParticles(count: number, spread: number, colorStart: string, colorEnd: string) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const startColor = new THREE.Color(colorStart);
  const endColor = new THREE.Color(colorEnd);
  const tempColor = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * spread;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const t = radius / spread;
    tempColor.copy(startColor).lerp(endColor, t);
    colors[i3] = tempColor.r;
    colors[i3 + 1] = tempColor.g;
    colors[i3 + 2] = tempColor.b;
  }

  return { positions, colors };
}

/**
 * ParticleField — the central 3D element for the hero section.
 *
 * Renders a cloud of particles using Points + BufferGeometry.
 * Particles are colored with a gradient from primary → secondary.
 * The field slowly rotates and responds to mouse position with parallax.
 */
export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { mouse } = useThree();

  const { count, spread, size, colorStart, colorEnd, mouseInfluence, rotationSpeed } =
    sceneConfig.particles;

  const particleCount = isDesktop ? count.desktop : count.mobile;

  // Generate particle data in an effect (not during render) to keep render pure
  useEffect(() => {
    if (!geometryRef.current) return;

    const { positions, colors } = generateParticles(particleCount, spread, colorStart, colorEnd);

    geometryRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometryRef.current.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  }, [particleCount, spread, colorStart, colorEnd]);

  // Animate: rotate + parallax from mouse
  useFrame(() => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += rotationSpeed;
    pointsRef.current.rotation.x += rotationSpeed * 0.5;

    // Smooth mouse parallax
    pointsRef.current.position.x +=
      (mouse.x * mouseInfluence - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y +=
      (mouse.y * mouseInfluence - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
