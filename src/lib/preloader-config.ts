import { siteMetadata } from "./constants";

/**
 * Terminal line configuration for the preloader boot sequence.
 */
export interface TerminalLine {
  /** The text to display */
  text: string;
  /** Optional status badge (e.g. "OK"). Null for lines without status. */
  status?: string;
}

/**
 * Centralized configuration for the Preloader / Boot Sequence.
 * Edit these values to change timing, text content, and behavior
 * without modifying the Preloader component code.
 */
export const preloaderConfig = {
  /** Duration of the exit fade-out animation (seconds) */
  exitDuration: 1,

  /** Portrait image configuration */
  portrait: {
    /** Path to the portrait image in /public */
    src: "/images/portrait.png",
    alt: siteMetadata.developerName,
    /** Number of binary character columns in the overlay grid */
    binaryCols: 42,
    /** Number of binary character rows in the overlay grid */
    binaryRows: 55,
  },

  /** Header text shown at the top of the preloader */
  header: "SECURE ACCESS PROTOCOL v3.1.4",

  /**
   * Boot phase terminal lines.
   * These appear first, simulating a system initialization.
   */
  bootLines: [
    { text: "Initializing system...", status: "OK" },
    { text: "Process ID: PID-7742", status: "OK" },
    { text: "Loading binary stream...", status: "OK" },
    { text: "Memory scan: 512MB allocated", status: "OK" },
    { text: "Sector verification: 48/48 passed", status: "OK" },
    { text: "Network protocol: HTTPS/2.0 active", status: "OK" },
  ] as TerminalLine[],

  /**
   * Identity verification terminal lines.
   * These appear during the portrait reveal phase.
   */
  identityLines: [
    { text: "Identity scan initiated..." },
    { text: "Biometric verification...", status: "OK" },
    { text: `Subject: ${siteMetadata.developerName.toUpperCase()}` },
    { text: `Role: ${siteMetadata.developerTitle.toUpperCase()}` },
    { text: "Clearance: LEVEL 5" },
    { text: "Status: VERIFIED", status: "OK" },
  ] as TerminalLine[],

  /** Seed for deterministic binary text generation (SSR-safe) */
  binarySeed: 42,
};
