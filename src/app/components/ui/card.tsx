import type * as React from "react";

import { CornerBrackets } from "@/components/blueprint";
import { cn } from "@/lib/utils";

interface CardProps extends React.ComponentProps<"div"> {
  withBrackets?: boolean;
}

function Card({
  className,
  withBrackets = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground relative flex flex-col rounded-lg border border-border/60 p-3 sm:p-4 md:p-6 transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent/50 hover:bg-accent/[0.04] touch-manipulation group backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {withBrackets && (
        <CornerBrackets className="opacity-40 group-hover:opacity-100 transition-opacity duration-150" />
      )}
      {children}
    </div>
  );
}

export { Card };
