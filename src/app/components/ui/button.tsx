import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] touch-manipulation",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.5),0_0_32px_rgba(255,255,255,0.1)] hover:opacity-90",
        outline:
          "border border-white/[0.1] text-foreground hover:bg-white/[0.04]",
        ghost: "text-muted-foreground hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-80",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-sm",
        icon: "size-9",
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
