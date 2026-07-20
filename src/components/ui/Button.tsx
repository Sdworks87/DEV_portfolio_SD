"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "./MagneticWrapper";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", magnetic = true, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-primary text-background hover:bg-primary/90",
      secondary: "bg-surface text-text-primary hover:bg-surface/80 border border-border",
      ghost: "hover:bg-surface/50 text-text-secondary hover:text-text-primary",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    const buttonElement = (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      />
    );

    if (magnetic) {
      return <MagneticWrapper>{buttonElement}</MagneticWrapper>;
    }

    return buttonElement;
  }
);
Button.displayName = "Button";
