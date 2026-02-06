import { memo, type ReactNode } from "react";
import { ExternalLink } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface ExternalLinkAnchorProps {
  href: string;
  children: ReactNode;
  size?: "sm" | "base" | "lg";
  weight?: "medium" | "semibold";
  ariaLabel?: string;
  className?: string;
}

const sizeClasses = {
  sm: "text-sm",
  base: "text-base sm:text-lg",
  lg: "text-lg",
};

const weightClasses = {
  medium: "font-medium",
  semibold: "font-semibold",
};

const gapClasses = {
  sm: "gap-1.5",
  base: "gap-2",
  lg: "gap-2",
};

const iconSizes = {
  sm: "h-3 w-3",
  base: "h-4 w-4",
  lg: "h-4 w-4",
};

/**
 * ExternalLinkAnchor component - External link with icon and underline animation
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - External link pattern with icon
 * - Underline animation on hover
 * - Icon appears/scales on hover
 * - Animation: 150-200ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Accessible with proper aria-label
 * - Consistent styling across all external links
 */
export const ExternalLinkAnchor = memo(
  ({
    href,
    children,
    size = "base",
    weight = "medium",
    ariaLabel,
    className,
  }: ExternalLinkAnchorProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group/link inline-flex items-center",
          gapClasses[size],
          sizeClasses[size],
          weightClasses[weight],
          "text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent",
          className,
        )}
        aria-label={ariaLabel}
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:w-full" />
        </span>
        <ExternalLink
          className={cn(
            iconSizes[size],
            "flex-shrink-0 text-muted-foreground/60 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:translate-x-0.5 group-hover/link:scale-110 opacity-0 group-hover/link:opacity-100",
          )}
          aria-hidden="true"
        />
      </a>
    );
  },
);

ExternalLinkAnchor.displayName = "ExternalLinkAnchor";
