"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final value */
  value: number;
  /** Animation duration in ms (default: 1200) */
  duration?: number;
  /** Text before the number */
  prefix?: string;
  /** Text after the number */
  suffix?: string;
  /** CSS class for the wrapper span */
  className?: string;
  /** If true, format using thousands separator (e.g. 1,234) */
  format?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * CountUp — Animates a number from 0 to `value` when it enters the viewport.
 *
 * Uses Framer Motion's useInView to detect visibility.
 * Respects prefers-reduced-motion: when enabled, shows the final value directly.
 *
 * Usage:
 * ```tsx
 * <CountUp value={1234} suffix=" commits" format />
 * ```
 */
export const CountUp = memo(function CountUp({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  className,
  format = false,
}: CountUpProps) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [current, setCurrent] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setCurrent(value);
      return;
    }

    startTimeRef.current = null;

    function animate(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      setCurrent(Math.round(eased * value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, value, duration, shouldReduce]);

  const display = format ? formatNumber(current) : String(current);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
});

CountUp.displayName = "CountUp";
