import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: "sm" | "md" | "lg";
  withBorder?: boolean;
}

/**
 * A reusable glassmorphism container component.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { children, className, blur = "md", withBorder = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass rounded-2xl p-6 transition-colors duration-300",
          {
            "backdrop-blur-sm": blur === "sm",
            "backdrop-blur-md": blur === "md",
            "backdrop-blur-lg": blur === "lg",
            "border border-[var(--border)]": withBorder,
            "border-transparent": !withBorder,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
