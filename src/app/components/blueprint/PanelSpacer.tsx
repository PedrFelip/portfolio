import { memo } from "react";
import { cn } from "@/lib/utils";

interface PanelSpacerProps {
  className?: string;
}

/**
 * PanelSpacer - Thin band with just side borders
 *
 * Creates a minimal visual break between panels, keeping
 * the continuous `border-x` running through.
 * Inspired by chanhdai.com's `<div className="flex h-2 w-full border-x border-line" />`
 */
export const PanelSpacer = memo(function PanelSpacer({
  className,
}: PanelSpacerProps) {
  return <div className={cn("bp-spacer", className)} aria-hidden="true" />;
});

PanelSpacer.displayName = "PanelSpacer";
