"use client";

import { memo, useRef } from "react";
import { Check, Copy } from "@/components/ui/icons";
import { useClipboard } from "@/hooks/useClipboard";
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
    const { copied, isCopying, copy } = useClipboard();
    const { t } = useLanguage();
    const preRef = useRef<HTMLPreElement>(null);
    function handleCopy(): void {
      const text = preRef.current?.textContent;
      if (text) void copy(text);
    }

    const copyButton = (
      <button
        type="button"
        onClick={handleCopy}
        disabled={isCopying}
        title={t.blog.copyCode}
        aria-label={copied ? t.blog.codeCopied : t.blog.copyCode}
        className={cn(
          "flex items-center justify-center rounded-sm border border-code-border text-muted-foreground",
          "transition-[color,background-color,opacity,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "hover:border-accent/30 hover:bg-accent/[0.04] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50",
          "motion-reduce:transition-none touch-manipulation",
          filename
            ? "size-11 shrink-0"
            : "absolute right-2 top-2 z-10 min-h-[44px] min-w-[44px] bg-code-bg/80 opacity-100 backdrop-blur-sm md:opacity-0 md:group-hover/code:opacity-100 focus-visible:opacity-100",
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-accent" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </button>
    );

    return (
      <div
        className={cn(
          "group/code relative my-6 min-w-0 max-w-full overflow-clip rounded-sm",
          "border border-code-border bg-code-bg",
          filename && "shadow-[0_1px_0_oklch(0.5_0.05_220/0.04)]",
        )}
      >
        {filename && (
          <CodeBlockHeader
            filename={filename}
            language={language}
            actions={copyButton}
          />
        )}
        <pre
          ref={preRef}
          className="m-0 overflow-x-auto rounded-none border-0 bg-transparent p-0 text-sm leading-relaxed"
        >
          {children}
        </pre>
        {!filename && copyButton}
      </div>
    );
  },
);

CodeBlockWrapper.displayName = "CodeBlockWrapper";
