import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        "text-[10px] sm:text-xs font-mono lowercase tracking-wide",
        className,
      )}
    >
      <span className="text-muted-foreground/25 select-none" aria-hidden>
        //
      </span>
      <span className="font-medium text-muted-foreground/60">{children}</span>
      <span
        className="ml-1 flex-1 border-b border-dashed border-border/30"
        aria-hidden
      />
    </div>
  );
}
