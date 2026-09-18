"use client";

import dynamic from "next/dynamic";

const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then(
      (module) => module.SpeedInsights,
    ),
  { ssr: false },
);

/** Load non-critical telemetry after hydration, outside the static App Shell. */
export function ClientSpeedInsights() {
  return <SpeedInsights />;
}
