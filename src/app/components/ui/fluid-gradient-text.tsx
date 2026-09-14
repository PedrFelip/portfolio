"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useId, useRef } from "react";

export type FluidGradientTextProps = {
  text: string;
  svgViewBoxWidth?: number;
  svgViewBoxHeight?: number;
};

const textProps = {
  x: "50%",
  y: "50%",
  textAnchor: "middle" as const,
  dominantBaseline: "central" as const,
  stroke: "var(--accent)",
  strokeOpacity: 0.5,
  strokeWidth: 2,
};

const textStyle = {
  fontFamily: "var(--font-ibm-plex-mono)",
  fontWeight: "bold",
} as const;

export function FluidGradientText({
  text,
  svgViewBoxWidth = 2400,
  svgViewBoxHeight = 320,
}: FluidGradientTextProps) {
  const gradientX1Raw = useMotionValue(svgViewBoxWidth / 2);
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  const shouldReduceMotion = useReducedMotion();
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);

  const resetGradient = () => {
    gradientX1Raw.set(svgViewBoxWidth / 2);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width === 0) return;

    const normalizedX =
      ((event.clientX - rect.left) / rect.width) * svgViewBoxWidth;
    gradientX1Raw.set(Math.max(0, Math.min(svgViewBoxWidth, normalizedX)));
  };

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-clip after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current/8"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetGradient}
      onPointerUp={resetGradient}
      onPointerCancel={resetGradient}
    >
      <div className="w-full translate-y-[37.5%]">
        <svg
          ref={svgRef}
          className="block h-auto w-full select-none"
          width={svgViewBoxWidth}
          height={svgViewBoxHeight}
          viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <text
            {...textProps}
            fill={`url(#${gradientId})`}
            textLength={svgViewBoxWidth - svgViewBoxHeight / 5}
            lengthAdjust="spacingAndGlyphs"
            style={{ ...textStyle, fontSize: svgViewBoxHeight }}
          >
            {text}
          </text>
          <defs>
            <m.linearGradient
              id={gradientId}
              x1={shouldReduceMotion ? svgViewBoxWidth / 2 : gradientX1}
              y1="0"
              x2={svgViewBoxWidth / 2}
              y2={svgViewBoxHeight}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.50" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0.85" />
            </m.linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
