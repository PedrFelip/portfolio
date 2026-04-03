"use client";

import type React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { FLICKER_CONFIG } from "@/lib/constants";
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
  squareSize = FLICKER_CONFIG.SQUARE_SIZE,
  gridGap = FLICKER_CONFIG.GRID_GAP,
  flickerChance = FLICKER_CONFIG.FLICKER_CHANCE,
  maxOpacity = FLICKER_CONFIG.MAX_OPACITY,
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
          "absolute inset-0 border-solid border-overlay-border pointer-events-none z-10",
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
        color={FLICKER_CONFIG.COLOR}
        maxOpacity={maxOpacity}
        className="h-full w-full"
      />
    </div>
  );
};

AlignedFlickeringGrid.displayName = "AlignedFlickeringGrid";
