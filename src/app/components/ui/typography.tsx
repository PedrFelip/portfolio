import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Typography components following AGENTS.md design principles
 * - Headlines: 600 weight, tight letter-spacing (-0.02em)
 * - Body: 400-500 weight, standard tracking
 * - Labels: 500 weight, slight positive tracking for uppercase
 * - Monospace for data
 */

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
}

/**
 * H1 - Main page headline
 * @example <H1>Portfolio</H1>
 */
export function H1({
  className,
  as: Component = "h1",
  ref,
  ...props
}: TypographyProps) {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl",
        className,
      )}
      {...props}
    />
  );
}
H1.displayName = "H1";

/**
 * H3 - Subsection headline
 * @example <H3>Work Experience</H3>
 */
export function H3({
  className,
  as: Component = "h3",
  ref,
  ...props
}: TypographyProps) {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}
H3.displayName = "H3";

/**
 * P - Body paragraph
 * Optimized responsive sizing (2 breakpoints for consistency)
 * @example <P>This is a paragraph of body text.</P>
 */
export function P({
  className,
  as: Component = "p",
  ref,
  ...props
}: TypographyProps) {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-base leading-relaxed text-muted-foreground md:text-lg",
        className,
      )}
      {...props}
    />
  );
}
P.displayName = "P";

/**
 * Label - Form labels and UI labels
 * @example <Label>Email Address</Label>
 */
export function Label({
  className,
  as: Component = "label",
  ref,
  ...props
}: TypographyProps) {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-xs font-medium tracking-wide text-foreground sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}
Label.displayName = "Label";

/**
 * MonoText - Monospace text for data (IDs, timestamps, numbers)
 * @example <MonoText>2024-01-15</MonoText>
 */
export function MonoText({
  className,
  as: Component = "span",
  ref,
  ...props
}: TypographyProps) {
  return (
    <Component
      ref={ref}
      className={cn("font-mono text-xs sm:text-xs tabular-nums", className)}
      {...props}
    />
  );
}
MonoText.displayName = "MonoText";

/**
 * Lead - Larger intro paragraph
 * @example <Lead>Welcome to my portfolio</Lead>
 */
export function Lead({
  className,
  as: Component = "p",
  ref,
  ...props
}: TypographyProps) {
  return (
    <Component
      ref={ref}
      className={cn("text-base text-muted-foreground sm:text-lg", className)}
      {...props}
    />
  );
}
Lead.displayName = "Lead";
