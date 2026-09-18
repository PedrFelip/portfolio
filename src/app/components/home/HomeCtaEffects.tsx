"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Aurora = lazy(() =>
  import("@/components/blueprint/Aurora").then((mod) => ({
    default: mod.Aurora,
  })),
);

const NoiseOverlay = lazy(() =>
  import("@/components/blueprint/NoiseOverlay").then((mod) => ({
    default: mod.NoiseOverlay,
  })),
);

/** Defer decorative GPU work until the CTA is close to the viewport. */
export function HomeCtaEffects() {
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
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      {shouldLoad ? (
        <Suspense fallback={null}>
          <Aurora />
          <NoiseOverlay />
        </Suspense>
      ) : null}
    </div>
  );
}
