import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded border text-xs font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] disabled:pointer-events-none disabled:opacity-50 touch-manipulation sm:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground active:scale-[0.97] active:brightness-95",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.97] active:brightness-95",
        outline:
          "border-border bg-background text-foreground hover:border-foreground hover:bg-muted active:scale-[0.97] active:bg-muted/80",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97] active:brightness-95",
        ghost:
          "border-transparent hover:bg-muted hover:text-foreground active:scale-[0.97] active:bg-muted/80",
        link: "border-transparent text-primary underline-offset-4 hover:underline active:opacity-70",
        nav: "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-muted/60 active:scale-[0.95] active:bg-muted/80 px-3 py-2 min-h-[44px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
      size: {
        default: "px-4 py-2 min-h-[44px]",
        sm: "px-3 py-2 text-xs min-h-[40px]",
        lg: "px-4 py-3 sm:px-6 sm:py-3 min-h-[48px]",
        icon: "size-9 min-h-[36px]",
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
