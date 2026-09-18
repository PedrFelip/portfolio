"use client";

import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";

const VIEWBOX_WIDTH = 2160;
const VIEWBOX_HEIGHT = 320;

const FluidGradientText = lazy(() =>
  import("@/components/ui/fluid-gradient-text").then((mod) => ({
    default: mod.FluidGradientText,
  })),
);

export function DeferredFooterGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="px-4 py-4 text-foreground sm:px-6">
      {shouldLoad ? (
        <Suspense fallback={<StaticFooterGradient />}>
          <FluidGradientText
            text="PEDRO FELIPE"
            svgViewBoxWidth={VIEWBOX_WIDTH}
          />
        </Suspense>
      ) : (
        <StaticFooterGradient />
      )}
    </div>
  );
}

function StaticFooterGradient() {
  const gradientId = useId();

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-clip after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current/8"
    >
      <div className="w-full translate-y-[37.5%]">
        <svg
          className="block h-auto w-full select-none"
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            stroke="var(--accent)"
            strokeOpacity={0.5}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            textLength={VIEWBOX_WIDTH - VIEWBOX_HEIGHT / 5}
            lengthAdjust="spacingAndGlyphs"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontWeight: "bold",
              fontSize: VIEWBOX_HEIGHT,
            }}
          >
            PEDRO FELIPE
          </text>
          <defs>
            <linearGradient
              id={gradientId}
              x1={VIEWBOX_WIDTH / 2}
              y1="0"
              x2={VIEWBOX_WIDTH / 2}
              y2={VIEWBOX_HEIGHT}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.50" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
