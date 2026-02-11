interface TimelineIndicatorProps {
  isLast?: boolean;
}

/**
 * TimelineIndicator component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Timeline dot with pulse animation
 * - Gradient connecting line with hover effect
 * - Animation: 150-300ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 */
export const TimelineIndicator = ({
  isLast = false,
}: TimelineIndicatorProps) => {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      {/* Dot with pulse effect - 44px touch target for accessibility */}
      <div className="relative mt-1.5 sm:mt-2 h-10 w-10 flex items-center justify-center touch-manipulation">
        {/* Pulse ring on hover */}
        <div className="absolute inset-0 rounded-full bg-accent opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-20 group-hover:scale-[2.5]" />

        {/* Main dot */}
        <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-accent bg-background transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-125 group-hover:bg-accent" />
      </div>

      {/* Connecting Line with gradient */}
      {!isLast && (
        <div className="relative w-0.5 h-16 sm:h-20 lg:h-24 mt-2 sm:mt-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-border via-border to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-40" />
        </div>
      )}
    </div>
  );
};
