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
          "flex items-center justify-center rounded-sm border border-[var(--code-border)] text-muted-foreground transition-[color,background-color,opacity] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-accent/[0.04] hover:text-foreground motion-reduce:transition-none touch-manipulation",
          filename
            ? "h-7 w-7"
            : "absolute right-2 top-2 min-h-[44px] min-w-[44px] bg-card/80 opacity-100 backdrop-blur-sm md:opacity-0 md:group-hover/code:opacity-100",
        )}
      >
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
    );

    if (filename) {
      return (
        <div className="group/code relative my-4 overflow-hidden rounded-sm border border-[var(--code-border)] bg-[var(--code-bg)]">
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
      <div className="group/code relative">
        <pre
          ref={preRef}
          className="my-4 overflow-x-auto rounded-sm border border-[var(--code-border)] bg-[var(--code-bg)] text-sm leading-relaxed"
        >
          {children}
        </pre>
        {copyButton}
      </div>
    );
  },
);

CodeBlockWrapper.displayName = "CodeBlockWrapper";
