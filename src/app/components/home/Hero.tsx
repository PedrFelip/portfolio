import Link from "next/link";
import { memo } from "react";
import { CornerBrackets, DotPattern } from "@/components/blueprint";
import { CodeBlockTechStack } from "@/components/home/CodeBlockTechStack";
import { CodeQualityBadge } from "@/components/home/CodeQualityBadge";
import { SyntaxHighlightedH1 } from "@/components/home/SyntaxHighlightedH1";
import { TypeAnnotatedGreeting } from "@/components/home/TypeAnnotatedGreeting";
import { Button, P } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";

interface HeroProps {
  greetingTexts: string[];
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  primaryHref: string;
  secondaryHref: string;
  techStack: readonly string[];
  keywords: string[];
  badge: {
    label: string;
    percentage: number;
    status: string;
  };
}

/**
 * Hero section component - Integrated with Structural Grid
 *
 * Two-column layout within the blueprint rails:
 * - Left: Main Content (Greeting, Title, Description, CTAs)
 * - Right: Code block with tech stack
 *
 * Design principles:
 * - Rail-bounded content
 * - Blueprint details (CornerBrackets, DotPattern)
 * - 4px grid spacing
 * - Code-editor personality
 */
export const Hero = memo(
  ({
    greetingTexts,
    title,
    description,
    ctaPrimary,
    ctaSecondary,
    primaryHref,
    secondaryHref,
    techStack,
    keywords,
    badge,
  }: HeroProps) => {
    return (
      <section className="relative">
        <div className="rail-bounded">
          <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-0 border-x border-white/[0.08] bg-white/[0.01]">
            <DotPattern className="opacity-20 pointer-events-none" />

            {/* Left Column: Main Content */}
            <div className="relative flex flex-col px-6 py-12 sm:px-8 sm:py-16 md:border-r md:border-dashed md:border-white/[0.08]">
              <CornerBrackets size={12} className="border-white/10" />

              {/* Type-Annotated Greeting */}
              <TypeAnnotatedGreeting texts={greetingTexts} />

              {/* Syntax-Highlighted Title */}
              <SyntaxHighlightedH1 title={title} keywords={keywords} />

              {/* Description */}
              <P className="mb-6 sm:mb-8 max-w-full sm:max-w-2xl animate-in-up animate-delay-150 text-sm sm:text-base leading-relaxed">
                {description}
              </P>

              {/* CTAs */}
              <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:gap-4 sm:items-center animate-in-up animate-delay-200">
                <Button
                  asChild
                  size="lg"
                  className="touch-manipulation w-full sm:w-auto"
                >
                  <Link href={primaryHref} className="group">
                    {ctaPrimary}
                    <ArrowRight
                      className="ml-2 h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-active:translate-x-0.5 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="touch-manipulation w-full sm:w-auto"
                >
                  <Link href={secondaryHref}>{ctaSecondary}</Link>
                </Button>
              </div>

              {/* Code Quality Badge */}
              <CodeQualityBadge
                label={badge.label}
                percentage={badge.percentage}
                status={badge.status as "success" | "warning" | "neutral"}
              />
            </div>

            {/* Right Column: Code Block */}
            <div className="relative flex items-center justify-center p-6 sm:p-8 overflow-hidden">
              <CodeBlockTechStack techStack={techStack} />
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  System.Log
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Hero.displayName = "Hero";
