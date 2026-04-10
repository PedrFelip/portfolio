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
          "border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-foreground/[0.04]",
        work: "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
        education:
          "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
        expertise:
          "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
        projects:
          "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
        blog: "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
        contact:
          "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
        about:
          "border-foreground/20 bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/35",
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
