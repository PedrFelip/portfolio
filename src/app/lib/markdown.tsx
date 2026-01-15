import type { ReactNode } from "react";

/**
 * Parses a minimal subset of markdown for bold text (**text**).
 *
 * Keeps this intentionally small to avoid pulling a full markdown parser
 * for simple inline emphasis.
 */
export const parseBoldMarkdown = (text: string): ReactNode[] => {
  if (!text) return [];

  const parts = text.split(/(\*\*.*?\*\*)/g);
  const result: ReactNode[] = [];
  let keyCounter = 0;

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      result.push(
        <strong
          key={`bold-${keyCounter++}`}
          className="font-semibold text-foreground"
        >
          {content}
        </strong>,
      );
      continue;
    }

    result.push(part);
  }

  return result;
};
