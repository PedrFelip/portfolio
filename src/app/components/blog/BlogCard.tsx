"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { Badge, MonoText } from "@/components/ui";
import { ArrowRight, Calendar, Clock } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import type { BlogMetadata } from "@/types/portfolio";

interface BlogCardProps {
  post: BlogMetadata;
}
export const BlogCard = memo(({ post }: BlogCardProps) => {
  const { t, language } = useLanguage();

  const formattedDate = useMemo(
    () =>
      new Date(post.date).toLocaleDateString(
        language === "pt" ? "pt-BR" : "en-US",
        { year: "numeric", month: "short", day: "numeric" },
      ),
    [post.date, language],
  );

  return (
    <Link
      href={`/${language}/blog/${post.slug}`}
      className="block px-6 py-5 sm:px-8 sm:py-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          <MonoText className="text-[11px]">
            <time dateTime={post.date}>{formattedDate}</time>
          </MonoText>
        </span>

        {post.readingTime && (
          <>
            <span className="text-muted-foreground/30" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground/70">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <MonoText className="text-[11px]">
                {post.readingTime} min
              </MonoText>
            </span>
          </>
        )}
      </div>

      <h3 className="mb-2 text-sm sm:text-base font-semibold leading-snug tracking-[-0.01em] text-foreground line-clamp-2 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent">
        {post.title}
      </h3>

      <p className="mb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between gap-3">
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0 min-h-0 h-5 font-mono font-normal tracking-wide border-border/50 text-muted-foreground/70 bg-transparent transition-colors duration-150 group-hover:border-accent/30 group-hover:text-accent/80"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 min-h-0 h-5 font-mono font-normal border-border/40 text-muted-foreground/40 bg-transparent"
              >
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        ) : (
          <span />
        )}

        <span
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-muted-foreground/50 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent group-hover:gap-1.5"
          aria-hidden="true"
        >
          {t.blog.readMore}
          <ArrowRight
            className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
});

BlogCard.displayName = "BlogCard";
