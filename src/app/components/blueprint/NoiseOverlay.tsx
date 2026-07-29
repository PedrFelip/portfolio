"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const TILE_SIZE = 200;

/** Generate a small noise tile as a blob URL (shade 0-19, 70% opaque). */
function generateNoiseTile(size: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve("");
      return;
    }
    const imageData = ctx.createImageData(size, size);
    const buffer = new Uint32Array(imageData.data.buffer);

    for (let p = 0; p < buffer.length; p++) {
      const shade = (Math.random() * 20) | 0;
      const alpha = Math.random() < 0.7 ? 255 : 0;
      buffer[p] = (alpha << 24) | (shade << 16) | (shade << 8) | shade;
    }

    ctx.putImageData(imageData, 0, 0);
    canvas.toBlob(
      (blob) => resolve(blob ? URL.createObjectURL(blob) : ""),
      "image/png",
    );
  });
}

interface NoiseOverlayProps {
  opacity?: number;
}

export function NoiseOverlay({ opacity = 0.085 }: NoiseOverlayProps) {
  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    let url: string | null = null;
    let cancelled = false;

    generateNoiseTile(TILE_SIZE).then((blobUrl) => {
      if (!blobUrl) return;
      if (cancelled) {
        URL.revokeObjectURL(blobUrl);
        return;
      }
      url = blobUrl;
      setTileUrl(blobUrl);
    });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  if (!tileUrl) return null;

  if (shouldReduce) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity }}
        aria-hidden
      >
        <div
          style={{
            position: "absolute",
            inset: -TILE_SIZE,
            backgroundImage: `url(${tileUrl})`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes noiseShift {
          0%   { transform: translate(0, 0) }
          20%  { transform: translate(-${TILE_SIZE * 0.5}px, -${TILE_SIZE * 0.33}px) }
          40%  { transform: translate(-${TILE_SIZE * 0.33}px, -${TILE_SIZE * 0.5}px) }
          60%  { transform: translate(-${TILE_SIZE * 0.75}px, -${TILE_SIZE * 0.25}px) }
          80%  { transform: translate(-${TILE_SIZE * 0.17}px, -${TILE_SIZE * 0.67}px) }
          100% { transform: translate(0, 0) }
        }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity }}
        aria-hidden
      >
        <div
          style={{
            position: "absolute",
            inset: -TILE_SIZE,
            backgroundImage: `url(${tileUrl})`,
            backgroundRepeat: "repeat",
            animation: "noiseShift 1.25s steps(5) infinite",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}
