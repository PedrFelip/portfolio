import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ExternalLinkAnchor } from "./ExternalLinkAnchor";

interface OrganizationWithLocationProps {
  name: string;
  href?: string;
  location: string;
  size?: "sm" | "base";
  weight?: "medium" | "semibold";
  className?: string;
}

const sizeClasses = {
  sm: "text-sm",
  base: "text-base sm:text-lg",
};

/**
 * OrganizationWithLocation component - Organization name/link with location separator
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Organization link with ExternalLinkAnchor
 * - Location label with separator (•)
 * - Mobile-first: optimized for small screens
 *
 * Best practices applied:
 * - Reusable for work experience and similar contexts
 * - Consistent styling with ExternalLinkAnchor
 */
export const OrganizationWithLocation = ({
  name,
  href,
  location,
  size = "base",
  weight = "semibold",
  className,
}: OrganizationWithLocationProps) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {href ? (
        <ExternalLinkAnchor
          href={href}
          size={size}
          weight={weight}
          ariaLabel={`${name} - Visit website`}
        >
          {name}
        </ExternalLinkAnchor>
      ) : (
        <span
          className={cn(
            sizeClasses[size],
            weight === "semibold" ? "font-semibold" : "font-medium",
            "text-foreground",
          )}
        >
          {name}
        </span>
      )}
      <span className="text-muted-foreground/40">•</span>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground/70">
        {location}
      </Label>
    </div>
  );
};
