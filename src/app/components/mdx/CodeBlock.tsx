"use client";

import { memo, useState, useTransition } from "react";
import { Check, Copy } from "@/components/ui/icons";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CodeBlock component
 *
 * Design principles (AGENTS.md):
 * - Isolated Controls: crafted UI element
 * - 4px grid: consistent spacing and padding
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, no heavy shadows
 * - Typography: monospace for code
 * - Animation: 150ms with cubic-bezier easing
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Non-blocking clipboard operation
 * - useTransition for state updates (Vercel best practice)
 */
export const CodeBlock = memo(({ children, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const copyToClipboard = () => {
    const text =
      typeof children === "string"
        ? children
        : Array.isArray(children)
          ? children.join("")
          : String(children);

    navigator.clipboard.writeText(text);
    // Use startTransition to mark state update as non-blocking
    startTransition(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="group relative mb-4 mt-4 rounded-lg border border-border bg-muted">
      <button
        type="button"
        onClick={copyToClipboard}
        disabled={isPending}
        className="absolute right-3 top-3 flex items-center gap-1.5 rounded border border-border bg-background px-2 sm:px-2.5 py-1 sm:py-1.5 font-mono text-xs text-muted-foreground opacity-0 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:text-foreground hover:bg-muted/50 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
      <pre className={className}>
        <code className="text-xs sm:text-sm leading-relaxed">{children}</code>
      </pre>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";
