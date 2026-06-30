import Link from "next/link";
import {
  CornerBrackets,
  SectionBadge,
  SectionLabel,
} from "@/components/blueprint";
import { Badge, MonoText } from "@/components/ui";
import { ArrowRight, BookOpen, Calendar } from "@/components/ui/icons";
import { getLatestPost, getPostDateISO } from "@/lib/blog-data";

interface LatestPostSectionProps {
  lang: string;
  badge: string;
  title: string;
  description: string;
  readMore: string;
  readingTimeLabel: string;
  serial: string;
}

/**
 * LatestPostSection
 *
 * Highlights the most recently published blog post on the home page.
 * Mirrors the GitHubSection header pattern (info left, mono stat right)
 * and renders a single, generously typeset post cell with corner brackets
 * to reinforce the blueprint aesthetic.
 */
export async function LatestPostSection({
  lang,
  badge,
  title,
  description,
  readMore,
  readingTimeLabel,
  serial,
}: LatestPostSectionProps) {
  const post = getLatestPost();

  if (!post) return null;

  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const displayDate = getPostDateISO(post.date);
  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/Sao_Paulo",
  });

  return (
    <section
      id="latest-post"
      data-slot="panel"
      className="bp-panel bp-line-bottom"
    >
      {/* Header */}
      {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{badge}</SectionLabel>
            <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <MonoText className="text-2xl font-bold tracking-tighter text-foreground sm:text-3xl">
              {displayDate}
            </MonoText>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
              {serial}
            </span>
          </div>
        </div>
      </SectionBadge>

      {/* Post cell */}
      <Link
        href={`/${lang}/blog/${post.slug}`}
        scroll={false}
        className="group relative block touch-manipulation transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring active:scale-[0.995]"
      >
        <div className="relative px-4 py-6 sm:px-6 sm:py-8">
          <CornerBrackets
            size={10}
            corners={["top-left", "bottom-right"]}
            className="border-accent/40 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-accent/80"
          />

          {/* Metadata row */}
          {/* TODO(refactor)[P2]: date+readingTime row duplicated */}
          <div className="mb-4 flex items-center gap-3 text-muted-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3" aria-hidden="true" />
              <MonoText className="text-[11px]">
                <time dateTime={post.date}>{formattedDate}</time>
              </MonoText>
            </span>
            {post.readingTime && (
              <>
                <span className="text-muted-foreground/30" aria-hidden="true">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="size-3" aria-hidden="true" />
                  <MonoText className="text-[11px]">
                    {post.readingTime} {readingTimeLabel}
                  </MonoText>
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent sm:text-3xl">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3">
            {post.tags.length > 0 ? (
              <div className="flex min-w-0 flex-wrap gap-1.5">
                {/* TODO(refactor)[P2]: tag badge className duplicated */}
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="h-5 min-h-0 bg-transparent px-1.5 py-0 font-mono text-[10px] font-normal tracking-wide border-border/50 text-muted-foreground/70 transition-colors duration-150 group-hover:border-accent/30 group-hover:text-accent/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <span />
            )}

            {/* TODO(refactor)[P2]: read-more arrow duplicated */}
            <span
              className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-muted-foreground/50 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:gap-1.5 group-hover:text-accent"
              aria-hidden="true"
            >
              {readMore}
              <ArrowRight
                className="size-3 translate-x-0 text-muted-foreground/30 opacity-70 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5 group-hover:text-accent group-hover:opacity-100"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

LatestPostSection.displayName = "LatestPostSection";
