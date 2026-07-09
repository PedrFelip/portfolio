/**
 * Slugify text for anchor IDs.
 * Handles Portuguese characters (accents, cedilla).
 */
// TODO(refactor)[P4]: untested Portuguese-aware slugify
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
