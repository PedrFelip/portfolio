"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { BlogMetadata } from "@/types/portfolio";

interface BlogCardProps {
  post: BlogMetadata;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { t, language } = useLanguage();

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString(
    language === "pt" ? "pt-BR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="group rounded-lg border border-border bg-card p-4 sm:p-6 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:shadow-sm hover:-translate-y-0.5">
      {/* Header */}
      <div className="mb-3">
        <Link
          href={`/${language}/blog/${post.slug}`}
          className="block hover:opacity-80 transition-opacity duration-150"
        >
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground tabular-nums">
          <Calendar className="h-3.5 w-3.5 transition-transform duration-150 group-hover:scale-110" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
      </div>

      {/* Excerpt */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {post.excerpt}
      </p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Read More Link */}
      <Link
        href={`/${language}/blog/${post.slug}`}
        className="inline-flex items-center text-sm font-medium text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
      >
        {t.blog.readMore}
        <span className="ml-1 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
};
