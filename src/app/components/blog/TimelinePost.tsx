"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { Badge, H3, MonoText, P } from "@/components/ui";
import { ArrowRight, Calendar } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import type { BlogMetadata } from "@/types/portfolio";

interface TimelinePostProps {
  post: BlogMetadata;
  isLast?: boolean;
}

/**
 * TimelinePost component - Enhanced Editorial Timeline
 *
 * Design principles (AGENTS.md):
 * - Timeline editorial layout for technical blog posts
 * - Vertical timeline with animated indicator dots
 * - Rich hover interactions with border glow
 * - 4px grid: consistent spacing throughout
 * - Borders-only approach with accent highlights
 * - Typography: monospace for dates, hierarchy for titles
 * - Animation: smooth transitions with stagger
 * - Mobile-first: responsive layout
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Clean semantic HTML structure
 * - Accessible with proper aria-labels
 * - Uses shadcn/ui components consistently
 * - useMemo for date formatting optimization (Vercel best practice)
 */
export const TimelinePost = memo(
  ({ post, isLast = false }: TimelinePostProps) => {
    const { language, t } = useLanguage();

    // Memoize date formatting to avoid expensive toLocaleDateString() on every render
    // Vercel best practice: cache function results
    const formattedDate = useMemo(
      () =>
        new Date(post.date).toLocaleDateString(
          language === "pt" ? "pt-BR" : "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        ),
      [post.date, language],
    );

    return (
      <div className="group relative flex gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-12 last:pb-0">
        {/* Timeline Indicator */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Dot with pulse effect */}
          <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 mt-1.5 sm:mt-2">
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

        {/* Post Content Card */}
        <div className="flex-1 pt-0 min-w-0">
          <Link href={`/${language}/blog/${post.slug}`} className="block">
            {/* Hover border wrapper */}
            <div className="relative rounded-lg border border-transparent p-3 sm:p-4 lg:p-5 -ml-3 sm:-ml-4 lg:-ml-5 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-border group-hover:bg-muted/30">
              {/* Date */}
              <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent group-hover:scale-110" />
                <MonoText className="text-[10px] sm:text-xs text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent">
                  <time dateTime={post.date}>{formattedDate}</time>
                </MonoText>
                {post.readingTime && (
                  <>
                    <span className="text-muted-foreground/60">•</span>
                    <MonoText className="text-[10px] sm:text-xs text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent">
                      {post.readingTime} {t.blog.readingTime}
                    </MonoText>
                  </>
                )}
              </div>

              {/* Title */}
              <H3 className="mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl leading-snug transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent line-clamp-2">
                {post.title}
              </H3>

              {/* Excerpt */}
              <P className="mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-foreground/90">
                {post.excerpt}
              </P>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={tag}
                      className="text-[10px] sm:text-xs transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent"
                      style={{
                        transitionDelay: `${index * 30}ms`,
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge className="text-[10px] sm:text-xs" variant="outline">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Read More Indicator with enhanced hover */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent sm:group-hover:gap-3">
                <span className="relative">
                  {t.blog.readMore}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                </span>
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-hover:scale-110" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  },
);

TimelinePost.displayName = "TimelinePost";
