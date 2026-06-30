import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-mono text-xs font-medium tracking-widest disabled:pointer-events-none disabled:opacity-50 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] touch-manipulation active:scale-[0.98] active:opacity-90",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-muted/50",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/30",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive hover:bg-transparent hover:text-destructive",
        filter:
          "border border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background",
      },
      size: {
        sm: "h-11 md:h-9 px-4",
        md: "h-12 md:h-10 px-6",
        lg: "h-14 md:h-12 px-8",
        icon: "size-11 md:size-10",
        filter: "min-h-[44px] md:min-h-[36px] px-3 py-2 md:py-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
