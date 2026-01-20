"use client";

import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { memo } from "react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
  title?: string;
}

const styles: Record<
  CalloutType,
  { bg: string; border: string; icon: React.ReactNode; color: string }
> = {
  info: {
    bg: "bg-blue-950/20",
    border: "border-blue-700/30",
    color: "text-blue-300",
    icon: <Info className="h-4 w-4" />,
  },
  warning: {
    bg: "bg-yellow-950/20",
    border: "border-yellow-700/30",
    color: "text-yellow-300",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  success: {
    bg: "bg-green-950/20",
    border: "border-green-700/30",
    color: "text-green-300",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  error: {
    bg: "bg-red-950/20",
    border: "border-red-700/30",
    color: "text-red-300",
    icon: <AlertCircle className="h-4 w-4" />,
  },
};

/**
 * Callout component for MDX content
 *
 * Design principles (AGENTS.md):
 * - 4px grid spacing (gap-3 = 12px, p-3 = 12px, p-4 = 16px)
 * - Borders-only approach with semantic colors
 * - Symmetrical padding
 * - Color for meaning only (status communication)
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Semantic color usage for different alert types
 * - Clean icon + content layout
 */
export const Callout = memo(
  ({ type = "info", children, title }: CalloutProps) => {
    const style = styles[type];

    return (
      <div
        className={cn(
          "my-4 flex gap-3 rounded-lg border p-4",
          style.bg,
          style.border,
        )}
      >
        <div className={cn("mt-0.5 flex-shrink-0", style.color)}>
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <div className={cn("mb-1 text-sm font-semibold", style.color)}>
              {title}
            </div>
          )}
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    );
  },
);

Callout.displayName = "Callout";
