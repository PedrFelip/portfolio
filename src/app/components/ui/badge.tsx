import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden touch-manipulation",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-foreground text-background hover:bg-foreground/90",
        secondary:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline:
          "border-border bg-transparent text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/[0.08]",
        work: "border-brand-amber/40 bg-brand-amber/15 text-brand-amber/95 hover:bg-brand-amber/25 hover:border-brand-amber/60 shadow-sm hover:shadow-md hover:shadow-brand-amber/5 transition-shadow",
        education:
          "border-brand-violet/40 bg-brand-violet/15 text-brand-violet/95 hover:bg-brand-violet/25 hover:border-brand-violet/60 shadow-sm hover:shadow-md hover:shadow-brand-violet/5 transition-shadow",
        expertise:
          "border-brand-emerald/40 bg-brand-emerald/15 text-brand-emerald/95 hover:bg-brand-emerald/25 hover:border-brand-emerald/60 shadow-sm hover:shadow-md hover:shadow-brand-emerald/5 transition-shadow",
        projects:
          "border-accent/40 bg-accent/15 text-accent/95 hover:bg-accent/25 hover:border-accent/60 shadow-sm hover:shadow-md hover:shadow-accent/5 transition-shadow",
        blog: "border-brand-blue/40 bg-brand-blue/15 text-brand-blue/95 hover:bg-brand-blue/25 hover:border-brand-blue/60 shadow-sm hover:shadow-md hover:shadow-brand-blue/5 transition-shadow",
        contact:
          "border-brand-cyan/40 bg-brand-cyan/15 text-brand-cyan/95 hover:bg-brand-cyan/25 hover:border-brand-cyan/60 shadow-sm hover:shadow-md hover:shadow-brand-cyan/5 transition-shadow",
        about:
          "border-brand-slate/40 bg-brand-slate/15 text-brand-slate/95 hover:bg-brand-slate/25 hover:border-brand-slate/60 shadow-sm hover:shadow-md hover:shadow-brand-slate/5 transition-shadow",
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

export { Badge };
