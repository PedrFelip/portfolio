"use client";

import { m } from "framer-motion";
import type { FlickerPhase } from "@/hooks/useFlickerTransition";
import { flickerOverlayVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FlickerOverlayProps {
  phase: FlickerPhase;
  className?: string;
}

export function FlickerOverlay({ phase, className }: FlickerOverlayProps) {
  return (
    <m.div
      variants={flickerOverlayVariants}
      animate={phase}
      initial="idle"
      className={cn(
        "absolute inset-0 z-10 pointer-events-none overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="h-full w-full bg-background" />
    </m.div>
  );
}
