import type { ReactNode } from "react";
import { MonoText } from "@/components/ui/typography";
import { APP_VERSION } from "@/lib/version";

function ShortcutKey({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
      {children}
    </kbd>
  );
}

export function SearchFooter() {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-surface-1/50">
      <MonoText className="text-[10px] tracking-[0.15em] text-muted-foreground/30">
        {APP_VERSION}
      </MonoText>
      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30">
        <ShortcutKey>↑</ShortcutKey>
        <ShortcutKey>↓</ShortcutKey>
        <span className="ml-0.5">navigate</span>
      </span>
      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30">
        <ShortcutKey>⌘J</ShortcutKey>
        <ShortcutKey>⌘K</ShortcutKey>
        <span className="ml-0.5">vim</span>
      </span>
      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30">
        <ShortcutKey>↵</ShortcutKey>
        <span className="ml-0.5">open</span>
      </span>
      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30 ml-auto">
        <ShortcutKey>ESC</ShortcutKey>
        <span className="ml-0.5">close</span>
      </span>
    </div>
  );
}
