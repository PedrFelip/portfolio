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
  preProps?: Omit<React.HTMLAttributes<HTMLPreElement>, "children">;
}

export const CodeBlockWrapper = memo(
  ({ children, filename, language, preProps }: CodeBlockWrapperProps) => {
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
          "relative flex items-center justify-center text-muted-foreground",
          "transition-[color,background-color,opacity,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "hover:bg-foreground/[0.04] hover:text-foreground",
          "focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50",
          "after:absolute after:-inset-1.5 motion-reduce:transition-none touch-manipulation",
          filename
            ? "size-8 shrink-0 rounded-sm border border-code-border bg-inherit"
            : "absolute right-1 top-1 z-10 size-8 rounded-bl-lg border-b border-l border-code-border bg-inherit",
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
          "group/code relative my-6 min-w-0 max-w-full overflow-hidden rounded-xl",
          "border border-code-border bg-surface-2 p-1 text-sm shadow-sm",
        )}
      >
        {filename && (
          <CodeBlockHeader
            filename={filename}
            language={language}
            actions={copyButton}
          />
        )}
        <div className="max-h-[600px] overflow-auto rounded-lg border border-code-border bg-code-bg py-3.5">
          <pre
            {...preProps}
            ref={preRef}
            className={cn(
              "m-0 w-max min-w-full overflow-visible rounded-none border-0 bg-transparent p-0 text-[13px] leading-relaxed",
              preProps?.className,
            )}
          >
            {children}
          </pre>
        </div>
        {!filename && copyButton}
      </div>
    );
  },
);

CodeBlockWrapper.displayName = "CodeBlockWrapper";
