import Link from "next/link";

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
 *
 * Spacing scale:
 * - mt-8 on mobile (32px) - matches SectionHeader spacing
 * - mt-12 on tablet/desktop (48px)
 * - Consistent spacing between content and link
 */
export const ViewAllLink = ({
  href,
  label,
  className = "",
}: ViewAllLinkProps) => {
  return (
    <div className={`mt-12 text-center ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
      >
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};
