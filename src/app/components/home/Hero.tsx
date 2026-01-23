import Link from "next/link";
import { memo } from "react";
import { Badge, Button, H1, P } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";

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
 *
 * Refactored to use shadcn/ui Badge component with custom animation styles
 */
interface TechBadgeProps {
  tech: string;
  index: number;
}

const TechBadge = memo(({ tech, index }: TechBadgeProps) => (
  <Badge
    className="transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/60"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {tech}
  </Badge>
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
 * - Uses shadcn/ui components: H1, P, Badge, Button
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
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Greeting */}
          <div className="mb-4 font-mono text-sm text-muted-foreground animate-in-up">
            {greeting}
          </div>

          {/* Main Title */}
          <H1 className="mb-6 animate-in-up animate-delay-100">{title}</H1>

          {/* Subtitle/Description */}
          <P className="mb-8 max-w-2xl sm:mb-10 animate-in-up animate-delay-150">
            {description}
          </P>

          {/* CTAs */}
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:gap-4 animate-in-up animate-delay-200">
            <Button asChild size="lg">
              <Link href={primaryHref} className="group">
                {ctaPrimary}
                <ArrowRight
                  className="ml-2 h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href={secondaryHref}>{ctaSecondary}</Link>
            </Button>
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
