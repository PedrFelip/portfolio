"use client";

import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import { FLICKER_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
}

const FRAME_INTERVAL = 1000 / 15;

// TODO(refactor)[P1]: React.FC discouraged
export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = FLICKER_CONFIG.SQUARE_SIZE,
  gridGap = FLICKER_CONFIG.GRID_GAP,
  flickerChance = FLICKER_CONFIG.FLICKER_CHANCE,
  color = FLICKER_CONFIG.COLOR,
  width,
  height,
  className,
  maxOpacity = FLICKER_CONFIG.MAX_OPACITY,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const propsRef = useRef({
    squareSize,
    gridGap,
    maxOpacity,
    flickerChance,
    memoizedColor,
  });
  propsRef.current = {
    squareSize,
    gridGap,
    maxOpacity,
    flickerChance,
    memoizedColor,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    let animationFrameId: number | null = null;
    let animationTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let resizeFrameId: number | null = null;
    let idleCallbackId: number | null = null;
    let idleTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let handleVisibilityChange: (() => void) | null = null;
    let isInView = false;
    let isIdleReady = false;
    let isDocumentVisible = !document.hidden;

    const setupCanvas = (canvas: HTMLCanvasElement, w: number, h: number) => {
      const { squareSize: sq, gridGap: gg, maxOpacity: mo } = propsRef.current;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.cssText = `width:${w}px;height:${h}px;`;
      const cols = Math.ceil(w / (sq + gg));
      const rows = Math.ceil(h / (sq + gg));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * mo;
      }
      return { cols, rows, squares, dpr };
    };

    const updateSquares = (squares: Float32Array, deltaTime: number) => {
      const { flickerChance: fc, maxOpacity: mo } = propsRef.current;
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < fc * deltaTime) {
          squares[i] = Math.random() * mo;
        }
      }
    };

    const drawGrid = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      const {
        memoizedColor: mc,
        squareSize: sq,
        gridGap: gg,
      } = propsRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${mc}${opacity})`;
          ctx.fillRect(
            i * (sq + gg) * dpr,
            j * (sq + gg) * dpr,
            sq * dpr,
            sq * dpr,
          );
        }
      }
    };

    let gridParams: ReturnType<typeof setupCanvas> | null = null;

    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth;
        const newHeight = height || container.clientHeight;
        gridParams = setupCanvas(canvas, newWidth, newHeight);
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr,
        );
      };

      updateCanvasSize();

      let lastTime = 0;
      const animate = (time: number) => {
        if (!isInView || !isIdleReady || !isDocumentVisible || !gridParams) {
          animationFrameId = null;
          return;
        }

        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;

        updateSquares(gridParams.squares, deltaTime);
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr,
        );

        animationTimeoutId = setTimeout(() => {
          animationFrameId = requestAnimationFrame(animate);
        }, FRAME_INTERVAL);
      };

      const startAnimation = () => {
        if (
          animationFrameId !== null ||
          !isInView ||
          !isIdleReady ||
          !isDocumentVisible
        ) {
          return;
        }
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      };

      const stopAnimation = () => {
        if (animationFrameId === null) return;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        if (animationTimeoutId !== null) {
          clearTimeout(animationTimeoutId);
          animationTimeoutId = null;
        }
      };

      resizeObserver = new ResizeObserver(() => {
        if (resizeFrameId !== null) cancelAnimationFrame(resizeFrameId);
        resizeFrameId = requestAnimationFrame(updateCanvasSize);
      });
      resizeObserver.observe(container);

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting;
          if (isInView) startAnimation();
          else stopAnimation();
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(canvas);

      handleVisibilityChange = () => {
        isDocumentVisible = !document.hidden;
        if (isDocumentVisible) startAnimation();
        else stopAnimation();
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      const enableAnimation = () => {
        isIdleReady = true;
        startAnimation();
      };

      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(enableAnimation, {
          timeout: 1000,
        });
      } else {
        idleTimeoutId = setTimeout(enableAnimation, 250);
      }
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (animationTimeoutId !== null) clearTimeout(animationTimeoutId);
      if (resizeFrameId !== null) cancelAnimationFrame(resizeFrameId);
      if (idleCallbackId !== null) window.cancelIdleCallback(idleCallbackId);
      if (idleTimeoutId !== null) clearTimeout(idleTimeoutId);
      if (handleVisibilityChange) {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none h-full w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"
      />
    </div>
  );
};
