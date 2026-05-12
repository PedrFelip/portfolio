"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export type FluidGradientTextProps = {
  text: string;
  mobileText?: string;
  svgViewBoxWidth?: number;
  svgViewBoxHeight?: number;
};

const textProps = {
  x: "50%",
  y: "50%",
  textAnchor: "middle" as const,
  dominantBaseline: "central" as const,
  stroke: "currentColor",
  strokeOpacity: 0.6,
  strokeWidth: 2,
};

const textStyle = {
  fontFamily: "var(--font-space-grotesk)",
  fontWeight: "bold",
} as const;

export function FluidGradientText({
  text,
  mobileText,
  svgViewBoxWidth = 1200,
  svgViewBoxHeight = 300,
}: FluidGradientTextProps) {
  const gradientX1Raw = useMotionValue(svgViewBoxWidth / 2);
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  const updateGradient = (clientX: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const normalizedX = ((clientX - rect.left) / rect.width) * svgViewBoxWidth;
    gradientX1Raw.set(Math.max(0, Math.min(svgViewBoxWidth, normalizedX)));
  };

  const resetGradient = () => {
    gradientX1Raw.set(svgViewBoxWidth / 2);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateGradient(e.clientX, e.currentTarget);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0 && containerRef.current) {
        e.preventDefault();
        updateGradient(e.touches[0].clientX, containerRef.current);
      }
    },
    [updateGradient],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", handleTouchMove);
  }, [handleTouchMove]);

  const hasMobileText = mobileText && mobileText !== text;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-hidden="true"
      className="relative size-full overflow-hidden after:absolute after:bottom-0 after:h-px after:w-full after:bg-current/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetGradient}
      onTouchEnd={resetGradient}
    >
      <svg
        className="size-full translate-y-[37.5%] select-none"
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {hasMobileText ? (
          <>
            <text
              {...textProps}
              fill="url(#fluid_gradient_text_linear)"
              className="inline sm:hidden"
              style={{ ...textStyle, fontSize: svgViewBoxHeight }}
            >
              {mobileText}
            </text>
            <text
              {...textProps}
              fill="url(#fluid_gradient_text_linear)"
              className="hidden sm:inline"
              style={{ ...textStyle, fontSize: svgViewBoxHeight }}
            >
              {text}
            </text>
          </>
        ) : (
          <text
            {...textProps}
            fill="url(#fluid_gradient_text_linear)"
            style={{ ...textStyle, fontSize: svgViewBoxHeight }}
          >
            {text}
          </text>
        )}
        <defs>
          <m.linearGradient
            id="fluid_gradient_text_linear"
            x1={gradientX1}
            y1="0"
            x2={svgViewBoxWidth / 2}
            y2={svgViewBoxHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.55" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.60" />
          </m.linearGradient>
        </defs>
      </svg>
    </div>
  );
}
