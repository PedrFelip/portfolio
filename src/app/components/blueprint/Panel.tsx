import { memo } from "react";
import { cn } from "@/lib/utils";

/* ─── Panel ─── */

interface PanelProps extends React.ComponentProps<"section"> {
  /** Show top border line spanning full viewport */
  lineTop?: boolean;
  /** Show bottom border line spanning full viewport */
  lineBottom?: boolean;
  /** Show side borders (vertical). Defaults to true. */
  bordered?: boolean;
}

/**
 * Panel - Bordered section container with blueprint lines
 *
 * Inspired by chanhdai.com's Panel component:
 * - `border-x` for continuous vertical side borders
 * - `bp-line-top` / `bp-line-bottom` for full-viewport horizontal lines
 * - Stacks vertically with HatchSeparator / PanelSpacer between
 *
 * @example
 * ```tsx
 * <Panel lineBottom>
 *   <PanelHeader>
 *     <PanelTitle>About</PanelTitle>
 *   </PanelHeader>
 *   <PanelContent>...</PanelContent>
 * </Panel>
 * ```
 */
export const Panel = memo(function Panel({
  lineTop = false,
  lineBottom = false,
  bordered = true,
  className,
  children,
  ...props
}: PanelProps) {
  return (
    <section
      data-slot="panel"
      className={cn(
        bordered && "bp-panel",
        lineTop && "bp-line-top",
        lineBottom && "bp-line-bottom",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
});

Panel.displayName = "Panel";

/* ─── PanelHeader ─── */

interface PanelHeaderProps extends React.ComponentProps<"header"> {}

export const PanelHeader = memo(function PanelHeader({
  className,
  ...props
}: PanelHeaderProps) {
  return (
    <header
      data-slot="panel-header"
      className={cn("bp-line-bottom px-4", className)}
      {...props}
    />
  );
});

PanelHeader.displayName = "PanelHeader";

/* ─── PanelTitle ─── */

interface PanelTitleProps extends React.ComponentProps<"h2"> {}

export const PanelTitle = memo(function PanelTitle({
  className,
  ...props
}: PanelTitleProps) {
  return (
    <h2
      data-slot="panel-title"
      className={cn(
        "py-3 text-lg font-semibold tracking-tight sm:text-xl",
        className,
      )}
      {...props}
    />
  );
});

PanelTitle.displayName = "PanelTitle";

/* ─── PanelDescription ─── */

interface PanelDescriptionProps extends React.ComponentProps<"div"> {}

export const PanelDescription = memo(function PanelDescription({
  className,
  ...props
}: PanelDescriptionProps) {
  return (
    <div
      data-slot="panel-description"
      className={cn("pb-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

PanelDescription.displayName = "PanelDescription";

/* ─── PanelContent ─── */

interface PanelContentProps extends React.ComponentProps<"div"> {}

export const PanelContent = memo(function PanelContent({
  className,
  ...props
}: PanelContentProps) {
  return (
    <div
      data-slot="panel-content"
      className={cn("p-4", className)}
      {...props}
    />
  );
});

PanelContent.displayName = "PanelContent";
