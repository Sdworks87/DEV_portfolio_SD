import { colors } from "./constants";

/**
 * Centralized configuration for the 3D scene.
 * Edit these values to tweak the hero particle field,
 * floating grid, and camera without touching component code.
 */
export const sceneConfig = {
  /** Camera defaults */
  camera: {
    fov: 75,
    near: 0.1,
    far: 100,
    position: [0, 0, 5] as [number, number, number],
  },

  /** Adaptive device pixel ratio range */
  dpr: [1, 2] as [number, number],

  /** Particle field settings */
  particles: {
    /** Particle counts per device tier */
    count: {
      desktop: 2500,
      mobile: 1000,
    },
    /** Spread radius for particle positions */
    spread: 6,
    /** Base particle size */
    size: 2.5,
    /** Colors (start → end of gradient) */
    colorStart: colors.primary,
    colorEnd: colors.secondary,
    /** Mouse parallax strength (0 = none, 1 = full follow) */
    mouseInfluence: 0.3,
    /** Rotation speed (radians per frame) */
    rotationSpeed: 0.0003,
  },

  /** Floating grid settings */
  grid: {
    size: 20,
    divisions: 20,
    opacity: 0.04,
    color: colors.primary,
    rotationSpeed: 0.0002,
  },

  /** Fallback gradient for non-WebGL browsers */
  fallback: {
    gradientFrom: colors.background,
    gradientVia: colors.surface,
    gradientTo: colors.background,
  },
};
