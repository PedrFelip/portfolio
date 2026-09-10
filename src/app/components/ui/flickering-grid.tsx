"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { FLICKER_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
}

export function FlickeringGrid({
  squareSize = FLICKER_CONFIG.SQUARE_SIZE,
  gridGap = FLICKER_CONFIG.GRID_GAP,
  flickerChance = FLICKER_CONFIG.FLICKER_CHANCE,
  color = FLICKER_CONFIG.COLOR,
  maxOpacity = FLICKER_CONFIG.MAX_OPACITY,
  className,
  ...props
}: FlickeringGridProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;
    const gridContainer = container;
    const gridCanvas = canvas;
    const gridContext = context;

    let frameId = 0;
    let columns = 0;
    let rows = 0;
    let opacities = new Float32Array();

    function resizeCanvas() {
      const { height, width } = gridContainer.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      gridCanvas.width = Math.round(width * dpr);
      gridCanvas.height = Math.round(height * dpr);
      gridCanvas.style.width = `${width}px`;
      gridCanvas.style.height = `${height}px`;
      gridContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / (squareSize + gridGap));
      rows = Math.ceil(height / (squareSize + gridGap));
      opacities = Float32Array.from(
        { length: columns * rows },
        () => Math.random() * maxOpacity,
      );
    }

    function drawGrid() {
      const { height, width } = gridContainer.getBoundingClientRect();
      gridContext.clearRect(0, 0, width, height);

      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          const index = column * rows + row;
          if (Math.random() < flickerChance / 60) {
            opacities[index] = Math.random() * maxOpacity;
          }
          gridContext.globalAlpha = opacities[index];
          gridContext.fillStyle = color;
          gridContext.fillRect(
            column * (squareSize + gridGap),
            row * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }
      gridContext.globalAlpha = 1;
      frameId = requestAnimationFrame(drawGrid);
    }

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(gridContainer);
    resizeCanvas();
    drawGrid();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [color, flickerChance, gridGap, maxOpacity, squareSize]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none block" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"
      />
    </div>
  );
}
