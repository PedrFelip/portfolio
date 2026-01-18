import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface HeroProps {
  greeting: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  primaryHref: string;
  secondaryHref: string;
  techStack: string[];
}

/**
 * TechBadge component
 *
 * Memoized to prevent re-renders when techStack array changes reference
 * (Vercel: rerender-memo - Extract expensive work into memoized components)
 */
interface TechBadgeProps {
  tech: string;
  index: number;
}

const TechBadge = memo(({ tech, index }: TechBadgeProps) => (
  <span
    className="rounded border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/80"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {tech}
  </span>
));

TechBadge.displayName = "TechBadge";

/**
 * Hero section component
 *
 * Fully memoized with proper prop typing to prevent unnecessary re-renders
 * when parent component updates (Vercel: rerender-memo)
 *
 * Design principles (AGENTS.md):
 * - 4px grid: all spacing follows base grid
 * - Symmetrical padding: consistent padding throughout
 * - Typography hierarchy: proper sizing and spacing
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: optimized for small screens
 * - Consistent spacing: matches Section component padding EXACTLY
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when props don't change
 * - Child components (TechBadge) are memoized separately
 * - displayName for DevTools debugging
 * - Proper TypeScript interfaces for all props
 */
export const Hero = memo(
  ({
    greeting,
    title,
    description,
    ctaPrimary,
    ctaSecondary,
    primaryHref,
    secondaryHref,
    techStack,
  }: HeroProps) => {
    return (
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Greeting */}
          <div className="mb-3 font-mono text-xs text-muted-foreground animate-in-up">
            {greeting}
          </div>

          {/* Main Title */}
          <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl animate-in-up animate-delay-100">
            {title}
          </h1>

          {/* Subtitle/Description */}
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-8 sm:text-base md:text-lg animate-in-up animate-delay-150">
            {description}
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:gap-4 animate-in-up animate-delay-200">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-2 rounded border border-foreground bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-background hover:text-foreground sm:px-6 sm:py-3 sm:text-sm"
            >
              {ctaPrimary}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted sm:px-6 sm:py-3 sm:text-sm"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex flex-wrap gap-2 animate-in-up animate-delay-250">
            {techStack.map((tech, index) => (
              <TechBadge key={tech} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  },
);

Hero.displayName = "Hero";
