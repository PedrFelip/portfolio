/**
 * Simple hash function that generates Git-like commit hashes
 * Uses a variation of FNV-1a algorithm to produce consistent,
 * deterministic 40-character hexadecimal hashes
 */

/**
 * Generate a Git-style 40-character hex hash from a string
 *
 * @param input - String to hash
 * @returns 40-character hexadecimal string (like Git SHA-1)
 */
export function generateHash(input: string): string {
  let hash = 0x811c9dc5; // FNV offset basis

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime
  }

  // Convert to 40-character hex string (like Git SHA-1)
  // Pad with additional passes to reach 40 chars
  let hexHash = hash.toString(16);
  while (hexHash.length < 40) {
    hash = Math.imul(hash, 0x01000193);
    hexHash = hash.toString(16) + hexHash;
  }

  return hexHash.slice(0, 40);
}

/**
 * Generate a short 7-character hash (Git short commit style)
 *
 * @param input - String to hash
 * @returns 7-character hexadecimal string
 */
export function generateShortHash(input: string): string {
  return generateHash(input).slice(0, 7);
}
