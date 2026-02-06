import Link from "next/link";
import { memo } from "react";
import { Section } from "@/components/common/Section";
import { CodeBlockTechStack } from "@/components/home/CodeBlockTechStack";
import { CodeQualityBadge } from "@/components/home/CodeQualityBadge";
import { SyntaxHighlightedH1 } from "@/components/home/SyntaxHighlightedH1";
import { TypeAnnotatedGreeting } from "@/components/home/TypeAnnotatedGreeting";
import { Button, P } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";

interface HeroProps {
  greeting: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  primaryHref: string;
  secondaryHref: string;
  techStack: readonly string[];
}

/**
 * Hero section component
 *
 * Two-column layout with code-editor style:
 * - Left: Type-annotated greeting, syntax-highlighted title, description, CTAs, quality badge
 * - Right: Code block with tech stack imports and line numbers
 *
 * Design principles (AGENTS.md):
 * - 4px grid: all spacing follows base grid
 * - Symmetrical padding: consistent padding throughout
 * - Typography hierarchy: proper sizing and spacing
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: single column on mobile, two columns on desktop
 * - Code-editor personality: monospace, syntax highlighting, line numbers
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when props don't change
 * - Child components are memoized separately
 * - displayName for DevTools debugging
 * - Proper TypeScript interfaces for all props
 * - Uses shadcn/ui components: Button, P
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
    const keywords = [
      "Backend",
      "DevOps",
      "Engineer",
      "Infrastructure",
      "API",
      "System",
    ];

    return (
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column: Main Content */}
          <div className="flex flex-col">
            {/* Type-Annotated Greeting */}
            <TypeAnnotatedGreeting greeting={greeting} />

            {/* Syntax-Highlighted Title */}
            <SyntaxHighlightedH1 title={title} keywords={keywords} />

            {/* Description */}
            <P className="mb-8 max-w-2xl animate-in-up animate-delay-150">
              {description}
            </P>

            {/* CTAs */}
            <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:gap-4 sm:items-center animate-in-up animate-delay-200">
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

            {/* Code Quality Badge */}
            <CodeQualityBadge
              label="TypeScript"
              percentage={100}
              status="success"
            />
          </div>

          {/* Right Column: Code Block */}
          <div className="flex items-center justify-center">
            <CodeBlockTechStack techStack={techStack} />
          </div>
        </div>
      </Section>
    );
  },
);

Hero.displayName = "Hero";
