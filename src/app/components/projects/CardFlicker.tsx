"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { EASE } from "@/lib/animations";
import { FLICKER_CONFIG } from "@/lib/constants";

interface CardFlickerProps {
  duration?: number;
}

export function CardFlicker({ duration = 400 }: CardFlickerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
          transition={{ duration: 0.1, ease: EASE }}
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 opacity-70">
            <FlickeringGrid
              squareSize={FLICKER_CONFIG.SQUARE_SIZE}
              gridGap={FLICKER_CONFIG.GRID_GAP}
              flickerChance={FLICKER_CONFIG.FLICKER_CHANCE}
              color={FLICKER_CONFIG.COLOR}
              maxOpacity={FLICKER_CONFIG.MAX_OPACITY}
              className="h-full w-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
