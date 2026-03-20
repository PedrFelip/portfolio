"use client";

import type React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { cn } from "@/lib/utils";

interface AlignedFlickeringGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side: "left" | "right";
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  maxOpacity?: number;
}

/**
 * AlignedFlickeringGrid - Flickering grid aligned with blueprint rails
 * Spans from outer rail to the content area (card)
 * Uses --rail-offset CSS variable to align perfectly with page rails
 */
export const AlignedFlickeringGrid: React.FC<AlignedFlickeringGridProps> = ({
  side,
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  maxOpacity = 0.25,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative hidden sm:flex min-h-96 overflow-hidden",
        side === "left" ? "justify-end" : "justify-start",
        className,
      )}
      {...props}
    >
      {/* Solid border frame - blueprint style */}
      <div
        className={cn(
          "absolute inset-0 border-solid border-white/[0.08] pointer-events-none z-10",
          side === "left"
            ? "border-r border-t border-b"
            : "border-l border-t border-b",
        )}
      />

      {/* Flickering grid animation */}
      <FlickeringGrid
        squareSize={squareSize}
        gridGap={gridGap}
        flickerChance={flickerChance}
        color="rgba(255, 255, 255, 1)"
        maxOpacity={maxOpacity}
        className="h-full w-full"
      />
    </div>
  );
};

AlignedFlickeringGrid.displayName = "AlignedFlickeringGrid";
