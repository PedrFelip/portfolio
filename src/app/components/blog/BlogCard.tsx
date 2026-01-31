"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  H3,
  MonoText,
  P,
} from "@/components/ui";
import { ArrowRight, Calendar } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import type { BlogMetadata } from "@/types/portfolio";

interface BlogCardProps {
  post: BlogMetadata;
}

/**
 * BlogCard component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, minimal depth
 * - Typography: monospace for data (date)
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: optimized for small screens
 * - Flex column layout to push content and links consistently
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when post prop doesn't change
 * - Flex column layout with flex-grow to push links to bottom
 * - useMemo for date formatting optimization (Vercel best practice)
 * - Clean component composition
 * - Uses shadcn/ui components: Card, H3, P, MonoText, Badge
 */
export const BlogCard = memo(({ post }: BlogCardProps) => {
  const { t, language } = useLanguage();

  // Memoize date formatting to avoid expensive toLocaleDateString() on every render
  // Vercel best practice: cache function results
  const formattedDate = useMemo(
    () =>
      new Date(post.date).toLocaleDateString(
        language === "pt" ? "pt-BR" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      ),
    [post.date, language],
  );

  return (
    <Card className="group flex h-full flex-col p-3 sm:p-4">
      {/* Header */}
      <CardHeader className="p-0 mb-3 sm:mb-4">
        <Link
          href={`/${language}/blog/${post.slug}`}
          className="block hover:opacity-80 transition-opacity duration-150"
        >
          <H3 className="mb-2 sm:mb-3 line-clamp-2">{post.title}</H3>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 tabular-nums">
          <Calendar className="h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
          <MonoText>
            <time dateTime={post.date}>{formattedDate}</time>
          </MonoText>
          {post.readingTime && (
            <>
              <span className="text-muted-foreground/60">•</span>
              <MonoText>{post.readingTime} min</MonoText>
            </>
          )}
        </div>
      </CardHeader>

      {/* Content: Excerpt + Tags */}
      <CardContent className="flex-grow space-y-3 sm:space-y-4 p-0">
        <P className="leading-relaxed text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
          {post.excerpt}
        </P>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                className="transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/60"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Read More Link - always pushed to bottom */}
      <CardFooter className="p-0">
        <Link
          href={`/${language}/blog/${post.slug}`}
          className="group/link inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
        >
          {t.blog.readMore}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </CardFooter>
    </Card>
  );
});

BlogCard.displayName = "BlogCard";
