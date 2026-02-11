"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { MonoText } from "@/components/ui";
import {
  Linkedin,
  Link2 as LinkIcon,
  Mail,
  Share2,
} from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";
import { useLanguage } from "@/lib/LanguageContext";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

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
 * - Terminal compact style: brackets for platform labels
 * - 4px grid spacing
 * - Borders-only approach: subtle glow on hover
 * - Monospace labels for platforms
 * - Accent hover states
 * - Copy link with feedback
 * - No scale/rotate animations on icons
 *
 * Best practices:
 * - Memoized to prevent re-renders
 * - Client-side only (uses navigator.clipboard)
 * - Accessible with aria-labels
 * - Non-blocking copy operation
 * - useTransition for state updates (Vercel best practice)
 * - Timer cleanup on unmount (Vercel 5.1)
 */
export const ShareButtons = memo(
  ({ title, url, description = "" }: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { language } = useLanguage();
    const t = blogContent[language].blog;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const copyToClipboard = useCallback(async () => {
      try {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        await navigator.clipboard.writeText(url);
        startTransition(() => {
          setCopied(true);
          timeoutRef.current = setTimeout(() => {
            setCopied(false);
            timeoutRef.current = null;
          }, 2000);
        });
      } catch (err) {
        console.error("Failed to copy:", err);
        setCopied(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    }, [url]);

    return (
      <div className="flex flex-col gap-2 md:gap-3">
        <MonoText className="text-xs md:text-xs text-muted-foreground uppercase tracking-wider">
          {t.share}
        </MonoText>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-glow inline-flex items-center gap-1 md:gap-2 rounded-md border border-border bg-card px-2 md:px-3 py-2 md:py-2 text-sm text-muted-foreground"
            aria-label={`${t.shareOn} X (Twitter)`}
          >
            <XIcon className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <MonoText className="text-xs md:text-xs">[X]</MonoText>
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-glow inline-flex items-center gap-1 md:gap-2 rounded-md border border-border bg-card px-2 md:px-3 py-2 md:py-2 text-sm text-muted-foreground"
            aria-label={`${t.shareOn} LinkedIn`}
          >
            <Linkedin className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <MonoText className="text-xs md:text-xs">[LI]</MonoText>
          </a>

          <a
            href={shareLinks.email}
            className="terminal-glow inline-flex items-center gap-1 md:gap-2 rounded-md border border-border bg-card px-2 md:px-3 py-2 md:py-2 text-sm text-muted-foreground"
            aria-label={`${t.shareVia} Email`}
          >
            <Mail className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <MonoText className="text-xs md:text-xs">[EMAIL]</MonoText>
          </a>

          <button
            type="button"
            onClick={copyToClipboard}
            disabled={isPending}
            className="terminal-glow inline-flex items-center gap-1 md:gap-2 rounded-md border border-border bg-card px-2 md:px-3 py-2 md:py-2 text-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={copied ? t.linkCopied : t.copyLink}
          >
            {copied ? (
              <>
                <Share2 className="h-3 w-3 md:h-3.5 md:w-3.5 text-accent" />
                <MonoText className="text-xs md:text-xs text-accent">
                  [COPIED]
                </MonoText>
              </>
            ) : (
              <>
                <LinkIcon className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <MonoText className="text-xs md:text-xs">[COPY]</MonoText>
              </>
            )}
          </button>
        </div>
      </div>
    );
  },
);

ShareButtons.displayName = "ShareButtons";
