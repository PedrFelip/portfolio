"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import {
  CommitDate,
  CommitHash,
  CommitLogTimelineItem,
  CommitPill,
} from "@/components/common/timeline-components";
import { H3, P } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { generateShortHash } from "@/lib/hash";
import { useLanguage } from "@/lib/LanguageContext";
import type { BlogMetadata } from "@/types/portfolio";

interface BlogCommitLogProps {
  post: BlogMetadata;
}

/**
 * BlogCommitLog component - Commit Log List style for blog posts
 *
 * Design principles (AGENTS.md):
 * - Commit Log List approach with git-style vertical timeline
 * - 4px grid: consistent spacing throughout
 * - Commit hash generated from slug using FNV-1a algorithm (deterministic, 7 characters)
 * - Monospace for data: hash, date, tags
 * - Borders-only approach: subtle glow on hover
 * - Typography: monospace for data, hierarchy for titles
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - No lift/scale transformations
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Uses shared commit log components for consistency
 * - Clean semantic HTML structure
 * - Accessible with proper aria-labels
 * - useMemo for date formatting optimization (Vercel best practice)
 * - GitCommitVertical icon for GitHub-style commit graph
 */
export const BlogCommitLog = memo(({ post }: BlogCommitLogProps) => {
  const { language, t } = useLanguage();
  const hash = generateShortHash(post.slug);

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
    <CommitLogTimelineItem>
      <div className="flex-1 min-w-0">
        {/* Título do commit - alinhado com o ícone */}
        <Link href={`/${language}/blog/${post.slug}`} className="block">
          <H3 className="mb-2 text-base md:text-lg font-semibold leading-tight transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent line-clamp-1">
            {post.title}
          </H3>
        </Link>

        {/* Autor + data - segunda linha como no GitHub */}
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <CommitHash hash={hash} />
          <span>committed on</span>
          <CommitDate start={formattedDate} />
        </div>

        {/* Excerpt */}
        <P className="mb-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-foreground/90">
          {post.excerpt}
        </P>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <CommitPill key={tag}>{tag}</CommitPill>
            ))}
            {post.tags.length > 3 && (
              <CommitPill>{`+${post.tags.length - 3}`}</CommitPill>
            )}
          </div>
        )}

        {/* Read more link */}
        <Link
          href={`/${language}/blog/${post.slug}`}
          className="link-underline inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent"
        >
          {t.blog.readMore}
          <ArrowRight className="h-3 w-3 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
        </Link>
      </div>
    </CommitLogTimelineItem>
  );
});

BlogCommitLog.displayName = "BlogCommitLog";
