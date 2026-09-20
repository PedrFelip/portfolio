"use client";

import { memo, useMemo } from "react";
import { MonoText } from "@/components/ui";
import {
  Linkedin,
  Link2 as LinkIcon,
  Mail,
  Share2,
} from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { useClipboard } from "@/hooks/useClipboard";
import { useLanguage } from "@/lib/language-store";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

const SHARE_BUTTON_CLASS =
  "terminal-glow inline-flex h-11 md:h-9 items-center gap-2 rounded-lg border border-border bg-card px-4 md:px-3 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground active:scale-[0.98] active:opacity-90 touch-manipulation select-none";

export const ShareButtons = memo(
  ({ title, url, description = "" }: ShareButtonsProps) => {
    const { copied, isCopying, copy } = useClipboard();
    const { t } = useLanguage();
    const tBlog = t.blog;

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

    return (
      <div className="flex flex-col gap-2 md:gap-3">
        <MonoText className="text-xs md:text-xs text-muted-foreground uppercase tracking-wider">
          {tBlog.share}
        </MonoText>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(SHARE_BUTTON_CLASS, "icon-link-hover")}
            aria-label={`${tBlog.shareOn} X (Twitter)`}
          >
            <XIcon className="size-3.5" />
            <MonoText className="text-xs">[X]</MonoText>
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(SHARE_BUTTON_CLASS, "icon-link-hover")}
            aria-label={`${tBlog.shareOn} LinkedIn`}
          >
            <Linkedin className="size-3.5" />
            <MonoText className="text-xs">[LI]</MonoText>
          </a>

          <a
            href={shareLinks.email}
            className={cn(SHARE_BUTTON_CLASS, "icon-link-hover")}
            aria-label={`${tBlog.shareVia} Email`}
          >
            <Mail className="size-3.5" />
            <MonoText className="text-xs">[EMAIL]</MonoText>
          </a>

          <button
            type="button"
            onClick={() => void copy(url)}
            disabled={isCopying}
            className={cn(
              SHARE_BUTTON_CLASS,
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            aria-label={copied ? tBlog.linkCopied : tBlog.copyLink}
          >
            {copied ? (
              <>
                <Share2 className="size-3.5 text-accent" />
                <MonoText className="text-xs text-accent">[COPIED]</MonoText>
              </>
            ) : (
              <>
                <LinkIcon className="size-3.5" />
                <MonoText className="text-xs">[COPY]</MonoText>
              </>
            )}
          </button>
        </div>
      </div>
    );
  },
);

ShareButtons.displayName = "ShareButtons";
