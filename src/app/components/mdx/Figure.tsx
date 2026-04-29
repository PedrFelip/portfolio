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

export const Figure = memo(
  ({ src, alt, caption, width = 800, height = 400 }: FigureProps) => {
    return (
      <figure className="my-9">
        <div className="relative overflow-hidden rounded-sm border border-border/60">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full"
          />
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-xs text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },
);

Figure.displayName = "Figure";
