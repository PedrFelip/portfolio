import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded border text-xs font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] disabled:pointer-events-none disabled:opacity-50 sm:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-border bg-background text-foreground hover:border-foreground hover:bg-muted",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "border-transparent hover:bg-muted hover:text-foreground",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        nav: "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-muted/60 active:scale-95 px-3 py-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-2 text-xs",
        lg: "px-4 py-3 sm:px-6 sm:py-3",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
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
