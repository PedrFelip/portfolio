import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CodeBlockHeaderProps {
  filename: string;
  language?: string | null;
  actions?: ReactNode;
}

export function CodeBlockHeader({
  filename,
  language,
  actions,
}: CodeBlockHeaderProps) {
  const showLang = language && !filename.endsWith(`.${language.toLowerCase()}`);

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-3",
        "border-b border-code-border bg-code-bg/70 backdrop-blur-[2px]",
        "px-3.5 py-2",
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden
          className="select-none font-mono text-[10px] text-accent/40 sm:text-xs"
        >
          {"//"}
        </span>
        <span
          title={filename}
          className="truncate font-mono text-[11px] font-medium text-accent/90 sm:text-xs"
        >
          {filename}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {showLang ? (
          <span className="rounded-sm border border-code-border/60 bg-code-bg/40 px-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70 sm:text-[10px]">
            .{language}
          </span>
        ) : null}
        {actions}
      </div>
    </div>
  );
}
