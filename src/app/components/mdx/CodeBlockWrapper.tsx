"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
}

export const CodeBlockWrapper = memo(({ children }: CodeBlockWrapperProps) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const preRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      if (!navigator?.clipboard) {
        return;
      }

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
    } catch {
      setCopied(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, []);

  return (
    <div className="group/code relative">
      <pre
        ref={preRef}
        className="hljs overflow-x-auto rounded-sm border border-[var(--code-border)] bg-[var(--code-bg)] p-4 text-sm leading-relaxed"
      >
        {children}
      </pre>

      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute right-2 top-2 rounded-sm border border-[var(--code-border)] bg-card/80 p-1.5 text-muted-foreground opacity-0 backdrop-blur-sm transition-[opacity,color,background-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-accent/[0.04] hover:text-foreground group-hover/code:opacity-100 motion-reduce:transition-none"
        title={t.blog.copyCode}
        aria-label={copied ? t.blog.codeCopied : t.blog.copyCode}
      >
        {copied ? (
          <Check className="h-3 w-3" aria-hidden="true" />
        ) : (
          <Copy className="h-3 w-3" aria-hidden="true" />
        )}
      </button>
    </div>
  );
});

CodeBlockWrapper.displayName = "CodeBlockWrapper";
