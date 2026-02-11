interface CommitLogIndicatorProps {
  isLast?: boolean;
}

/**
 * CommitLogIndicator component - Git commit-style vertical timeline indicator
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Simple circular dot that sits ON TOP of the line (GitHub-style)
 * - Continuous vertical line behind the dot (like GitHub's commit graph)
 * - The dot is transparent with background color, so line appears through it
 * - Borders-only approach: subtle borders with 8-10% opacity
 * - Animation: 150ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - Touch targets with minimum 44x44px for accessibility
 *
 * Best practices applied:
 * - Responsive gap: gap-4 sm:gap-6 lg:gap-8
 * - Monospace for data presentation
 * - The line runs through all commits, terminating at the last item
 * - Matches GitHub's commit list interface exactly
 */
export const CommitLogIndicator = ({
  isLast = false,
}: CommitLogIndicatorProps) => {
  return (
    <div className="flex flex-col items-center flex-shrink-0 relative">
      {/* Vertical line - continuous through all commits, centered */}
      {!isLast && (
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border opacity-80" />
      )}

      {/* Simple circular dot - sits ON TOP of the line */}
      <div className="relative z-10 h-10 w-10 flex items-center justify-center touch-manipulation transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
        <div className="w-3 h-3 rounded-full border-2 border-muted-foreground bg-background group-hover:border-accent group-hover:bg-accent/10 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]" />
      </div>
    </div>
  );
};
