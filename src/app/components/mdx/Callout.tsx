"use client";

import { memo } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
} from "@/components/ui/icons";
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
    bg: "bg-[color:var(--callout-info-bg)]",
    border: "border-[color:var(--callout-info-border)]",
    color: "text-[color:var(--callout-info-text)]",
    icon: <Info className="h-4 w-4" />,
  },
  warning: {
    bg: "bg-[color:var(--callout-warning-bg)]",
    border: "border-[color:var(--callout-warning-border)]",
    color: "text-[color:var(--callout-warning-text)]",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  success: {
    bg: "bg-[color:var(--callout-success-bg)]",
    border: "border-[color:var(--callout-success-border)]",
    color: "text-[color:var(--callout-success-text)]",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  error: {
    bg: "bg-[color:var(--callout-error-bg)]",
    border: "border-[color:var(--callout-error-border)]",
    color: "text-[color:var(--callout-error-text)]",
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
          "my-4 flex gap-3 rounded-md border p-4",
          style.bg,
          style.border,
        )}
      >
        <div className={cn("mt-1 flex-shrink-0", style.color)}>
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
