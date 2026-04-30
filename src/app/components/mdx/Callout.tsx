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

const configs: Record<
  CalloutType,
  {
    bg: string;
    border: string;
    icon: React.ReactNode;
    indicator: string;
    text: string;
  }
> = {
  info: {
    bg: "bg-[color:var(--callout-info-bg)]",
    border: "border-[color:var(--callout-info-border)]",
    indicator: "border-l-[color:var(--callout-info-text)]",
    text: "text-[color:var(--callout-info-text)]",
    icon: <Info className="h-3.5 w-3.5" />,
  },
  warning: {
    bg: "bg-[color:var(--callout-warning-bg)]",
    border: "border-[color:var(--callout-warning-border)]",
    indicator: "border-l-[color:var(--callout-warning-text)]",
    text: "text-[color:var(--callout-warning-text)]",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
  success: {
    bg: "bg-[color:var(--callout-success-bg)]",
    border: "border-[color:var(--callout-success-border)]",
    indicator: "border-l-[color:var(--callout-success-text)]",
    text: "text-[color:var(--callout-success-text)]",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
  },
  error: {
    bg: "bg-[color:var(--callout-error-bg)]",
    border: "border-[color:var(--callout-error-border)]",
    indicator: "border-l-[color:var(--callout-error-text)]",
    text: "text-[color:var(--callout-error-text)]",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
};

export const Callout = memo(
  ({ type = "info", children, title }: CalloutProps) => {
    const config = configs[type];

    return (
      <div
        className={cn(
          "my-7 flex gap-3 rounded-sm border border-l-[3px] p-4 sm:p-5",
          config.bg,
          config.border,
          config.indicator,
        )}
      >
        <div className={cn("mt-0.5 shrink-0", config.text)}>{config.icon}</div>
        <div className="min-w-0 flex-1">
          {title && (
            <div className={cn("mb-2 text-sm font-semibold", config.text)}>
              {title}
            </div>
          )}
          <div className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Callout.displayName = "Callout";
