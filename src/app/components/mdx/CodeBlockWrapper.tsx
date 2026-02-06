"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/ui/icons";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";
import { useLanguage } from "@/lib/LanguageContext";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

interface CodeBlockWrapperProps {
  children: React.ReactNode;
}

/**
 * CodeBlockWrapper component for MDX code blocks
 *
 * Design principles (AGENTS.md):
 * - 4px grid spacing (p-2 = 8px, p-4 = 16px)
 * - Borders-only approach (no shadows)
 * - Animation: 150-200ms with cubic-bezier easing
 * - Isolated controls: copy button feels like crafted object
 * - Monospace for code content
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Accessible copy button with visual feedback
 * - Respects reduced motion preference
 * - Clean group hover interaction
 * - useRef for efficient DOM access (Vercel 5.2)
 * - useCallback for stable function reference
 * - Timeout cleanup on unmount (Vercel 5.1)
 */
export const CodeBlockWrapper = memo(({ children }: CodeBlockWrapperProps) => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const t = blogContent[language].blog;
  // ✅ useRef for O(1) DOM access instead of querySelector (Vercel 5.2)
  const preRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Cleanup timer on unmount to prevent memory leaks and state updates on unmounted component
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ✅ useCallback for stable function reference (Vercel 5.3)
  const copyToClipboard = useCallback(async () => {
    try {
      if (!navigator?.clipboard) {
        console.error("Clipboard API not available");
        return;
      }

      // ✅ Direct ref access - O(1), no DOM query (Vercel 5.2)
      const text = preRef.current?.textContent || "";
      if (!text) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopied(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, []);

  return (
    <div className="group relative my-4">
      <pre
        ref={preRef}
        className="hljs overflow-x-auto rounded-md border border-border bg-muted p-4 text-sm leading-relaxed"
      >
        {children}
      </pre>

      {/* Copy button */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute right-3 top-3 rounded border border-border bg-card p-2 text-muted-foreground opacity-0 transition-[opacity,color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground group-hover:opacity-100 motion-reduce:transition-none"
        title={t.copyCode}
        aria-label={copied ? t.codeCopied : t.copyCode}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
});

CodeBlockWrapper.displayName = "CodeBlockWrapper";
