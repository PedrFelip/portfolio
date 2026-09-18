"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/next").then((module) => ({
    default: module.SpeedInsights,
  })),
);

/** Load non-critical telemetry after hydration, outside the static App Shell. */
export function ClientSpeedInsights() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIsIdle(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(() => setIsIdle(true), 1000);
    return () => clearTimeout(id);
  }, []);

  return isIdle ? (
    <Suspense fallback={null}>
      <SpeedInsights />
    </Suspense>
  ) : null;
}
