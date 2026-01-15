"use client";

import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function Figure({
  src,
  alt,
  caption,
  width = 800,
  height = 400,
}: FigureProps) {
  return (
    <figure className="my-6">
      <div className="relative rounded-lg border border-border overflow-hidden bg-muted">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-xs sm:text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
