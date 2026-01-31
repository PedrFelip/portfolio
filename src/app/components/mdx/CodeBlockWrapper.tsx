"use client";

import { memo, useCallback, useRef, useState } from "react";
import { Check, Copy } from "@/components/ui/icons";

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
 */
export const CodeBlockWrapper = memo(({ children }: CodeBlockWrapperProps) => {
  const [copied, setCopied] = useState(false);
  // ✅ useRef for O(1) DOM access instead of querySelector (Vercel 5.2)
  const preRef = useRef<HTMLPreElement>(null);

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

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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
        title="Copy code"
        aria-label={copied ? "Code copied" : "Copy code"}
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
