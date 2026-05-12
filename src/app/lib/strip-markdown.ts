/**
 * Strip Markdown to plain text for search indexing.
 *
 * Removes all Markdown syntax, code blocks, and HTML,
 * returning clean text suitable for fuzzy matching.
 * Preserves Portuguese characters (accents, ç).
 */

/**
 * Strip all markdown syntax from content, leaving plain text
 */
export function stripMarkdown(content: string): string {
  let text = content;

  // Remove fenced code blocks (```...```) — heavy noise for search
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove inline code (`...`)
  text = text.replace(/`[^`]+`/g, "");

  // Remove images ![alt](url) — keep alt text
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");

  // Remove links [text](url) — keep text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");

  // Remove headings markers (# ## ###)
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Remove bold (**text** or __text__)
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/__(.+?)__/g, "$1");

  // Remove italic (*text* or _text_)
  text = text.replace(/\*(.+?)\*/g, "$1");
  text = text.replace(/(?<!\w)_(.+?)_(?!\w)/g, "$1");

  // Remove blockquotes (>)
  text = text.replace(/^>\s*/gm, "");

  // Remove horizontal rules (---, ***, ___)
  text = text.replace(/^[-*_]{3,}\s*$/gm, "");

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Remove footnotes [^1]
  text = text.replace(/\[\^[^\]]*\]/g, "");

  // Collapse whitespace
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/[ \t]+/g, " ");

  return text.trim();
}
