"use client";

import { memo, useMemo, useState, useTransition } from "react";
import { MonoText } from "@/components/ui";
import {
  Linkedin,
  Link2 as LinkIcon,
  Mail,
  Share2,
  X,
} from "@/components/ui/icons";
import { blogContent } from "@/lib/content/blog-content";
import { useLanguage } from "@/lib/LanguageContext";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

/**
 * ShareButtons component - Social sharing for blog posts
 *
 * Design principles (AGENTS.md):
 * - Minimal, technical aesthetic
 * - 4px grid spacing
 * - Borders-only approach
 * - Monospace labels
 * - Accent hover states
 * - Copy link with feedback
 *
 * Best practices:
 * - Memoized to prevent re-renders
 * - Client-side only (uses navigator.clipboard)
 * - Accessible with aria-labels
 * - Non-blocking copy operation
 * - useTransition for state updates (Vercel best practice)
 */
export const ShareButtons = memo(
  ({ title, url, description = "" }: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { language } = useLanguage();
    const t = blogContent[language].blog;

    // Memoize share URLs to avoid recreating URL strings on every render
    // Cache hit when title, url, description don't change
    const shareLinks = useMemo(() => {
      const encodedTitle = encodeURIComponent(title);
      const encodedUrl = encodeURIComponent(url);
      const encodedDescription = encodeURIComponent(description);

      return {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      };
    }, [title, url, description]);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(url);
        // Use startTransition to mark state update as non-blocking
        // Prevents UI blocking while clipboard write completes
        startTransition(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return (
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Label */}
        <MonoText className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
          {t.share}
        </MonoText>

        {/* Share buttons */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {/* Twitter/X */}
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-card px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent"
            aria-label={`${t.shareOn} X (Twitter)`}
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
            <span className="font-mono text-[10px] sm:text-xs">X</span>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-card px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent"
            aria-label={`${t.shareOn} LinkedIn`}
          >
            <Linkedin className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
            <span className="font-mono text-[10px] sm:text-xs">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href={shareLinks.email}
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-card px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent"
            aria-label={`${t.shareVia} Email`}
          >
            <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
            <span className="font-mono text-[10px] sm:text-xs">Email</span>
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={copyToClipboard}
            disabled={isPending}
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-card px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={copied ? t.linkCopied : t.copyLink}
          >
            {copied ? (
              <>
                <Share2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent" />
                <span className="font-mono text-[10px] sm:text-xs text-accent">
                  {t.linkCopied}
                </span>
              </>
            ) : (
              <>
                <LinkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" />
                <span className="font-mono text-[10px] sm:text-xs">
                  {t.copyLink}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  },
);

ShareButtons.displayName = "ShareButtons";
