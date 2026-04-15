"use client";

import { motion } from "framer-motion";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import type { FlickerPhase } from "@/hooks/useFlickerTransition";
import { flickerOverlayVariants } from "@/lib/animations";
import { FLICKER_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FlickerOverlayProps {
  phase: FlickerPhase;
  className?: string;
}

export function FlickerOverlay({ phase, className }: FlickerOverlayProps) {
  return (
    <motion.div
      variants={flickerOverlayVariants}
      animate={phase}
      initial="idle"
      className={cn(
        "absolute inset-0 z-10 pointer-events-none overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <FlickeringGrid
        squareSize={FLICKER_CONFIG.SQUARE_SIZE}
        gridGap={FLICKER_CONFIG.GRID_GAP}
        flickerChance={FLICKER_CONFIG.FLICKER_CHANCE}
        color={FLICKER_CONFIG.COLOR}
        maxOpacity={FLICKER_CONFIG.MAX_OPACITY}
        className="h-full w-full"
      />
    </motion.div>
  );
}
