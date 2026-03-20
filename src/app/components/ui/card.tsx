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
        "bg-card text-card-foreground relative flex flex-col rounded-sm border border-border/60 p-3 sm:p-4 md:p-6 transition-[border-color,background-color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent/40 hover:bg-accent/[0.02] touch-manipulation group",
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

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("mb-3 sm:mb-4 flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("mb-3 sm:mb-4", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-auto flex flex-wrap items-center gap-3 pt-3 sm:pt-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
