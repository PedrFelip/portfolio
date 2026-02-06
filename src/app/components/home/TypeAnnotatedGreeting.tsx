import { memo } from "react";

interface TypeAnnotatedGreetingProps {
  greeting: string;
}

/**
 * TypeAnnotatedGreeting component
 *
 * Displays greeting in TypeScript-style constant declaration format:
 * const greeting: string = "Hi, I'm [Name]"
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing
 * - Monospace for code elements
 * - Syntax highlighting for meaning (types vs strings)
 * - Blink cursor animation for code-editor feel
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Clean visual hierarchy
 * - Accessible with proper contrast
 */
export const TypeAnnotatedGreeting = memo(
  ({ greeting }: TypeAnnotatedGreetingProps) => {
    return (
      <div className="mb-8 sm:mb-12 animate-in-up code-block">
        <div className="inline-flex flex-wrap items-baseline gap-2 text-sm sm:text-base">
          <span className="text-muted-foreground">const</span>
          <span className="syntax-keyword">greeting</span>
          <span className="syntax-punctuation">:</span>
          <span className="syntax-type">string</span>
          <span className="syntax-punctuation">=</span>
          <span className="syntax-string">"{greeting}"</span>
          <span className="animate-blink-cursor text-foreground">|</span>
        </div>
      </div>
    );
  },
);

TypeAnnotatedGreeting.displayName = "TypeAnnotatedGreeting";
