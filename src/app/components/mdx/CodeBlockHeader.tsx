import type { ReactNode } from "react";

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
    <div className="flex items-center justify-between gap-3 border-b border-[var(--code-border)] bg-[var(--code-bg)]/60 px-3 py-1.5">
      <div className="flex min-w-0 items-center gap-1.5">
        <span
          className="font-mono text-[10px] text-accent/30 select-none sm:text-xs"
          aria-hidden
        >
          {"//"}
        </span>
        <span
          className="truncate font-mono text-[10px] font-medium text-accent/70 sm:text-xs"
          title={filename}
        >
          {filename}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {showLang ? (
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">
            .{language}
          </span>
        ) : null}
        {actions}
      </div>
    </div>
  );
}
