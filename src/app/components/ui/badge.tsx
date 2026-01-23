import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border px-2 py-0.5 text-xs font-mono w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-border bg-muted text-muted-foreground hover:border-foreground hover:bg-muted/60",
        // Work experience - distinctive blue accent
        work: "border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/15",
        // Education - green accent
        education:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/15",
        // Skills/Expertise - purple accent
        expertise:
          "border border-violet-500/30 bg-violet-500/10 text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/15",
        // Projects - amber/orange accent
        projects:
          "border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/15",
        // Blog - distinct purple accent
        blog: "border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/15",
        // Contact - cyan accent
        contact:
          "border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/15",
        // About/Profile - slate/neutral
        about:
          "border border-slate-500/30 bg-slate-500/10 text-slate-300 hover:border-slate-500/50 hover:bg-slate-500/15",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
