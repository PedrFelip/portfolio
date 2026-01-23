import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

interface ViewAllLinkProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * ViewAllLink component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Typography hierarchy: proper sizing and spacing
 * - Uses ArrowRight icon for consistency
 * - Responsive spacing: matches SectionHeader pattern
 *
 * Spacing scale:
 * - mt-8 on mobile (32px)
 * - mt-12 on tablet (sm: 640px) (48px)
 * - mt-16 on desktop (lg: 1024px) (64px)
 * - Consistent spacing between content and link
 */
export const ViewAllLink = ({
  href,
  label,
  className = "",
}: ViewAllLinkProps) => {
  return (
    <div className={`mt-8 sm:mt-12 lg:mt-16 text-center ${className}`}>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
      >
        {label}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
};
