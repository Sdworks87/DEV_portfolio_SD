"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, siteMetadata } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "../ui/MagneticWrapper";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 transition-all duration-300",
        isScrolled ? "glass" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <MagneticWrapper pull={0.2}>
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          {siteMetadata.developerName.toUpperCase()}
        </a>
      </MagneticWrapper>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <MagneticWrapper key={item.name} pull={0.4}>
            <a
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.name}
            </a>
          </MagneticWrapper>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-text-primary z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav Overlay */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? "0%" : "-100%",
        }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg md:hidden"
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
