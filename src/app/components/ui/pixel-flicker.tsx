"use client";

import type React from "react";
import Dither, { type DitherProps } from "@/components/ui/Dither";
import { cn } from "@/lib/utils";

export type PixelFlickerVariant = "band" | "compact" | "overlay";

export interface PixelFlickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PixelFlickerVariant;
}

const VARIANT_CONFIG: Record<
  PixelFlickerVariant,
  Pick<
    DitherProps,
    "colorNum" | "pixelSize" | "waveAmplitude" | "waveFrequency" | "waveSpeed"
  >
> = {
  band: {
    waveSpeed: 0.65,
    waveFrequency: 3,
    waveAmplitude: 0.3,
    colorNum: 4,
    pixelSize: 2,
  },
  compact: {
    waveSpeed: 0.35,
    waveFrequency: 3,
    waveAmplitude: 0.3,
    colorNum: 4,
    pixelSize: 2,
  },
  overlay: {
    waveSpeed: 0.05,
    waveFrequency: 3,
    waveAmplitude: 0.3,
    colorNum: 4,
    pixelSize: 2,
  },
};

export function PixelFlicker({
  variant = "overlay",
  className,
  ...props
}: PixelFlickerProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "pixel-flicker pointer-events-none h-full w-full overflow-hidden",
        variant === "band" && "pixel-flicker-band",
        className,
      )}
      {...props}
      aria-hidden="true"
    >
      <Dither
        className="absolute inset-0"
        {...VARIANT_CONFIG[variant]}
        backgroundColor={[0, 0, 0]}
        disableAnimation={false}
        enableMouseInteraction={false}
        waveColor={[1, 1, 1]}
      />
    </div>
  );
}
