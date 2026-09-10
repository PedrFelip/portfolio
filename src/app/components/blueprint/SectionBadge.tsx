import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { FLICKER_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  line?: "none" | "bottom";
}

export function SectionBadge({
  children,
  className,
  line = "none",
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "relative",
        line === "bottom" && "screen-line-bottom after:z-1",
        className,
      )}
    >
      <FlickeringGrid
        squareSize={2}
        gridGap={3}
        flickerChance={0.3}
        color={FLICKER_CONFIG.COLOR}
        maxOpacity={0.28}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
