import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-mono text-xs uppercase tracking-widest disabled:pointer-events-none disabled:opacity-50 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] touch-manipulation",
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
      },
      size: {
        sm: "h-9 px-4",
        md: "h-10 px-6",
        lg: "h-12 px-8",
        icon: "size-10",
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

export { Button, buttonVariants };
