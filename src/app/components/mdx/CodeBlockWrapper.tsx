"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { cn } from "@/lib/utils";
import { CodeBlockHeader } from "./CodeBlockHeader";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
  filename?: string;
  language?: string;
}

export const CodeBlockWrapper = memo(
  ({ children, filename, language }: CodeBlockWrapperProps) => {
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();
    const preRef = useRef<HTMLPreElement>(null);
    // TODO(refactor)[P1]: use ReturnType<typeof setTimeout> in browser code
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    // TODO(refactor)[P2]: copy+timeout duplicated in ShareButtons
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

    const copyButton = (
      <button
        type="button"
        onClick={copyToClipboard}
        title={t.blog.copyCode}
        aria-label={copied ? t.blog.codeCopied : t.blog.copyCode}
        className={cn(
          "flex items-center justify-center rounded-sm border border-code-border text-muted-foreground",
          "transition-[color,background-color,opacity,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "hover:border-accent/30 hover:bg-accent/[0.04] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50",
          "motion-reduce:transition-none touch-manipulation",
          filename
            ? "size-7"
            : "absolute right-2 top-2 z-10 min-h-[44px] min-w-[44px] bg-code-bg/80 opacity-100 backdrop-blur-sm md:opacity-0 md:group-hover/code:opacity-100",
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-accent" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </button>
    );

    if (filename) {
      return (
        <div
          className={cn(
            "group/code relative my-4 overflow-hidden rounded-sm",
            "border border-code-border bg-code-bg",
            "shadow-[0_1px_0_oklch(0.5_0.05_220/0.04)]",
          )}
        >
          <CodeBlockHeader
            filename={filename}
            language={language}
            actions={copyButton}
          />
          <pre
            ref={preRef}
            className="m-0 overflow-x-auto rounded-none border-0 bg-transparent p-0 text-sm leading-relaxed"
          >
            {children}
          </pre>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "group/code relative my-4 overflow-hidden rounded-sm",
          "border border-code-border bg-code-bg",
        )}
      >
        <pre
          ref={preRef}
          className="m-0 overflow-x-auto rounded-none border-0 bg-transparent p-0 text-sm leading-relaxed"
        >
          {children}
        </pre>
        {copyButton}
      </div>
    );
  },
);

CodeBlockWrapper.displayName = "CodeBlockWrapper";
