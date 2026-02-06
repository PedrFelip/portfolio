import { memo } from "react";

interface SyntaxHighlightedH1Props {
  title: string;
  keywords: string[];
}

/**
 * SyntaxHighlightedH1 component
 *
 * Displays title with syntax highlighting for technical keywords.
 * Example: "Backend Engineer & DevOps Enthusiast"
 * - "Backend" and "DevOps" get highlighted as keywords
 * - Rest remains in standard color
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing
 * - Typography hierarchy: proper sizing
 * - Color for meaning only: keywords highlighted
 * - Mobile-first: responsive text sizes
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Case-insensitive keyword matching
 * - Clean visual hierarchy
 */
export const SyntaxHighlightedH1 = memo(
  ({ title, keywords }: SyntaxHighlightedH1Props) => {
    const highlightKeywords = (text: string, keys: string[]) => {
      if (keys.length === 0) return text;

      const regex = new RegExp(`(${keys.join("|")})`, "gi");
      const parts = text.split(regex);

      let keywordCount = 0;
      return parts.map((part) => {
        if (keys.some((key) => key.toLowerCase() === part.toLowerCase())) {
          keywordCount += 1;
          return (
            <span key={`keyword-${keywordCount}`} className="syntax-keyword">
              {part}
            </span>
          );
        }
        keywordCount += 1;
        return <span key={`text-${keywordCount}`}>{part}</span>;
      });
    };

    return (
      <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight animate-in-up animate-delay-100">
        {highlightKeywords(title, keywords)}
      </h1>
    );
  },
);

SyntaxHighlightedH1.displayName = "SyntaxHighlightedH1";
