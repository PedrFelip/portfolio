"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import {
  TimelineCardWrapper,
  TimelineItem,
} from "@/components/common/timeline-components";
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
 * - Uses shared timeline components for consistency
 * - Clean semantic HTML structure
 * - Accessible with proper aria-labels
 * - useMemo for date formatting optimization (Vercel best practice)
 */
export const TimelinePost = memo(
  ({ post, isLast = false }: TimelinePostProps) => {
    const { language, t } = useLanguage();

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
      <TimelineItem isLast={isLast}>
        <TimelineCardWrapper>
          {/* Date Row */}
          <div className="mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
            <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent group-hover:scale-110" />
            <MonoText className="text-[10px] md:text-xs text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent">
              <time dateTime={post.date}>{formattedDate}</time>
            </MonoText>
            {post.readingTime && (
              <>
                <span className="text-muted-foreground/60">•</span>
                <MonoText className="text-[10px] md:text-xs text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent">
                  {post.readingTime} {t.blog.readingTime}
                </MonoText>
              </>
            )}
          </div>

          {/* Title */}
          <Link href={`/${language}/blog/${post.slug}`} className="block">
            <H3 className="mb-2 md:mb-3 text-base md:text-lg lg:text-xl leading-snug transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent line-clamp-2">
              {post.title}
            </H3>
          </Link>

          {/* Excerpt */}
          <P className="mb-3 md:mb-4 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-foreground/90">
            {post.excerpt}
          </P>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-3 md:mb-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={tag}
                  className="text-[10px] md:text-xs transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent"
                  style={{
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge className="text-[10px] md:text-xs" variant="outline">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Read More Indicator with enhanced hover */}
          <Link
            href={`/${language}/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent md:group-hover:gap-3"
          >
            <span className="relative">
              {t.blog.readMore}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
            </span>
            <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-hover:scale-110" />
          </Link>
        </TimelineCardWrapper>
      </TimelineItem>
    );
  },
);

TimelinePost.displayName = "TimelinePost";
