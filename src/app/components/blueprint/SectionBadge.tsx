"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { FLICKER_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <div className={cn("relative", className)}>
      <FlickeringGrid
        squareSize={2}
        gridGap={3}
        flickerChance={0.3}
        color={FLICKER_CONFIG.COLOR}
        maxOpacity={0.15}
        className="absolute inset-0 overflow-hidden"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
