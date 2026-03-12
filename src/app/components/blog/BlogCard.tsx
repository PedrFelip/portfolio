"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { Badge, MonoText } from "@/components/ui";
import { ArrowRight, Calendar, Clock } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import type { BlogMetadata } from "@/types/portfolio";

interface BlogCardProps {
  post: BlogMetadata;
  index?: number;
}

export const BlogCard = memo(({ post, index = 0 }: BlogCardProps) => {
  const { t, language } = useLanguage();

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
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-sm",
        "border border-border bg-card",
        "terminal-glow touch-feedback-subtle",
        "transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
      )}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-[2px]",
          "bg-accent/0 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "group-hover:bg-accent/60",
        )}
        aria-hidden="true"
      />

      <Link
        href={`/${language}/blog/${post.slug}`}
        className="block flex-1 p-4 sm:p-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-2.5">
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

        {/* Title */}
        <h3
          className={cn(
            "mb-2 text-sm sm:text-base font-semibold leading-snug tracking-[-0.01em] text-foreground line-clamp-2",
            "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
            "group-hover:text-accent",
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={cn(
            "mb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2",
            "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
            "group-hover:text-muted-foreground/90",
          )}
        >
          {post.excerpt}
        </p>

        {/* Footer: tags + read more */}
        <div className="flex items-center justify-between gap-3">
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {post.tags.slice(0, 3).map((tag, i) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    "text-[10px] px-1.5 py-0 min-h-0 h-5 font-mono font-normal tracking-wide",
                    "border-border/50 text-muted-foreground/70 bg-transparent",
                    "transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    "group-hover:border-accent/30 group-hover:text-accent/80",
                  )}
                  style={{ transitionDelay: `${i * 20}ms` }}
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
            className={cn(
              "inline-flex shrink-0 items-center gap-1 text-[11px] font-medium",
              "text-muted-foreground/50",
              "transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
              "group-hover:text-accent group-hover:gap-1.5",
            )}
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
    </article>
  );
});

BlogCard.displayName = "BlogCard";
