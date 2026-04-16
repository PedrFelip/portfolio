"use client";

import { useEffect, useMemo, useState } from "react";

interface AsciiTerminalLoaderProps {
  width?: number;
  speedMs?: number;
  className?: string;
}

function buildFrame(width: number, tick: number): string {
  let output = "";
  for (let i = 0; i < width; i += 1) {
    const wave = Math.sin((i + tick * 1.8) / 2.6);
    const noise = ((i * 31 + tick * 17) % 23) / 23;
    output += wave + noise > 0.35 ? "#" : " ";
  }
  return output;
}

export function AsciiTerminalLoader({
  width = 28,
  speedMs = 55,
  className,
}: AsciiTerminalLoaderProps) {
  const [tick, setTick] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, speedMs);
    return () => window.clearInterval(timer);
  }, [reduceMotion, speedMs]);

  const stream = useMemo(() => {
    if (reduceMotion) return "#".repeat(width);
    return buildFrame(width, tick);
  }, [reduceMotion, tick, width]);

  return (
    <output
      className={
        className ??
        "w-full max-w-xl rounded border border-overlay-border bg-surface-2 px-5 py-4 sm:px-6 sm:py-5"
      }
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        SYSTEM
      </div>
      <div className="mt-2 font-mono text-sm text-foreground">
        Booting route...
      </div>
      <div className="mt-3 rounded border border-overlay-border bg-background/70 px-3 py-2 font-mono text-xs text-foreground/90">
        [{stream}]
      </div>
      <div className="mt-2 font-mono text-[11px] text-muted-foreground">
        Status: Loading
      </div>
    </output>
  );
}
