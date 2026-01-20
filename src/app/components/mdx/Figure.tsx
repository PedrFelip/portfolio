"use client";

import Image from "next/image";
import { memo } from "react";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Figure component for MDX images
 *
 * Design principles (AGENTS.md):
 * - Borders-only approach (no shadows)
 * - Symmetrical spacing (my-6)
 * - Typography: italic caption with muted-foreground
 * - Uses Next.js Image for optimization
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Responsive image sizing
 * - Accessible alt text
 * - Optional caption support
 */
export const Figure = memo(
  ({ src, alt, caption, width = 800, height = 400 }: FigureProps) => {
    return (
      <figure className="my-6">
        <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full"
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-xs italic text-muted-foreground sm:text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },
);

Figure.displayName = "Figure";
