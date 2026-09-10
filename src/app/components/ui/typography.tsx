import {
  type ComponentPropsWithoutRef,
  createElement,
  type JSX,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Typography components following AGENTS.md design principles
 * - Headlines: 600 weight, tight letter-spacing (-0.02em)
 * - Body: 400-500 weight, standard tracking
 * - Monospace for data
 */

interface TypographyProps extends ComponentPropsWithoutRef<"div"> {
  as?: keyof JSX.IntrinsicElements;
  ref?: Ref<HTMLElement>;
}

/**
 * H1 - Main page headline
 * @example <H1>Portfolio</H1>
 */
export function H1({ className, as = "h1", ref, ...props }: TypographyProps) {
  return createElement(as, {
    ...props,
    ref,
    className: cn(
      "text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl",
      className,
    ),
  });
}
H1.displayName = "H1";

/**
 * H3 - Subsection headline
 * @example <H3>Work Experience</H3>
 */
export function H3({ className, as = "h3", ref, ...props }: TypographyProps) {
  return createElement(as, {
    ...props,
    ref,
    className: cn(
      "text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg",
      className,
    ),
  });
}
H3.displayName = "H3";

/**
 * P - Body paragraph
 * Optimized responsive sizing (2 breakpoints for consistency)
 * @example <P>This is a paragraph of body text.</P>
 */
export function P({ className, as = "p", ref, ...props }: TypographyProps) {
  return createElement(as, {
    ...props,
    ref,
    className: cn(
      "text-base leading-relaxed text-muted-foreground md:text-lg",
      className,
    ),
  });
}
P.displayName = "P";

/**
 * MonoText - Monospace text for data (IDs, timestamps, numbers)
 * @example <MonoText>2024-01-15</MonoText>
 */
export function MonoText({
  className,
  as = "span",
  ref,
  ...props
}: TypographyProps) {
  return createElement(as, {
    ...props,
    ref,
    className: cn("font-mono text-xs sm:text-xs tabular-nums", className),
  });
}
MonoText.displayName = "MonoText";
