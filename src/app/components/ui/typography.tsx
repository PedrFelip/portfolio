import * as React from "react";
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
}

/**
 * H1 - Main page headline
 * @example <H1>Portfolio</H1>
 */
export const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, as: Component = "h1", ...props }, ref) => {
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
  },
);
H1.displayName = "H1";

/**
 * H2 - Section headline
 * @example <H2>Recent Projects</H2>
 */
export const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, as: Component = "h2", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl md:text-4xl",
          className,
        )}
        {...props}
      />
    );
  },
);
H2.displayName = "H2";

/**
 * H3 - Subsection headline
 * @example <H3>Work Experience</H3>
 */
export const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, as: Component = "h3", ...props }, ref) => {
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
  },
);
H3.displayName = "H3";

/**
 * H4 - Card/Component headline
 * @example <H4>Project Title</H4>
 */
export const H4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, as: Component = "h4", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "scroll-m-20 text-base font-semibold tracking-[-0.02em] sm:text-lg",
          className,
        )}
        {...props}
      />
    );
  },
);
H4.displayName = "H4";

/**
 * P - Body paragraph
 * Optimized responsive sizing (2 breakpoints for consistency)
 * @example <P>This is a paragraph of body text.</P>
 */
export const P = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, as: Component = "p", ...props }, ref) => {
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
  },
);
P.displayName = "P";

/**
 * Muted - Secondary/muted text
 * @example <Muted>Secondary information</Muted>
 */
export const Muted = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  },
);
Muted.displayName = "Muted";

/**
 * Small - Smaller text (captions, footnotes)
 * @example <Small>Last updated: 2024</Small>
 */
export const Small = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = "small", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-xs text-muted-foreground", className)}
        {...props}
      />
    );
  },
);
Small.displayName = "Small";

/**
 * Label - Form labels and UI labels
 * @example <Label>Email Address</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, TypographyProps>(
  ({ className, as: Component = "label", ...props }, ref) => {
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
  },
);
Label.displayName = "Label";

/**
 * Code - Inline code (monospace)
 * @example <Code>npm install</Code>
 */
export const Code = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as: Component = "code", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative rounded border border-border bg-muted px-2 py-1",
          "font-mono text-xs",
          className,
        )}
        {...props}
      />
    );
  },
);
Code.displayName = "Code";

/**
 * MonoText - Monospace text for data (IDs, timestamps, numbers)
 * @example <MonoText>2024-01-15</MonoText>
 */
export const MonoText = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ className, as: Component = "span", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-mono text-[10px] sm:text-xs tabular-nums",
          className,
        )}
        {...props}
      />
    );
  },
);
MonoText.displayName = "MonoText";

/**
 * Lead - Larger intro paragraph
 * @example <Lead>Welcome to my portfolio</Lead>
 */
export const Lead = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-base text-muted-foreground sm:text-lg", className)}
        {...props}
      />
    );
  },
);
Lead.displayName = "Lead";

/**
 * Blockquote - Quote blocks
 * @example <Blockquote>This is a quote</Blockquote>
 */
export const Blockquote = React.forwardRef<HTMLQuoteElement, TypographyProps>(
  ({ className, as: Component = "blockquote", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mt-6 border-l border-border pl-4 italic text-muted-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);
Blockquote.displayName = "Blockquote";

/**
 * List - Unordered list
 * @example <List><li>Item 1</li></List>
 */
export const List = React.forwardRef<HTMLUListElement, TypographyProps>(
  ({ className, as: Component = "ul", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("ml-6 list-disc text-sm [&>li]:mt-2", className)}
        {...props}
      />
    );
  },
);
List.displayName = "List";

/**
 * OrderedList - Ordered list
 * @example <OrderedList><li>First</li></OrderedList>
 */
export const OrderedList = React.forwardRef<HTMLOListElement, TypographyProps>(
  ({ className, as: Component = "ol", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("ml-6 list-decimal text-sm [&>li]:mt-2", className)}
        {...props}
      />
    );
  },
);
OrderedList.displayName = "OrderedList";
