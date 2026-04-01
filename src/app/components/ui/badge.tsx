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
          "border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground",
        work: "border-brand-blue/30 bg-brand-blue/10 text-brand-blue/90 hover:bg-brand-blue/20",
        education:
          "border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald/90 hover:bg-brand-emerald/20",
        expertise:
          "border-brand-violet/30 bg-brand-violet/10 text-brand-violet/90 hover:bg-brand-violet/20",
        projects:
          "border-brand-amber/30 bg-brand-amber/10 text-brand-amber/90 hover:bg-brand-amber/20",
        blog: "border-accent/30 bg-accent/10 text-accent/90 hover:bg-accent/20",
        contact:
          "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan/90 hover:bg-brand-cyan/20",
        about:
          "border-brand-slate/30 bg-brand-slate/10 text-brand-slate/90 hover:bg-brand-slate/20",
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
