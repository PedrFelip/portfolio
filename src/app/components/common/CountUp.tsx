"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Valor final */
  value: number;
  /** Duração da animação em ms (default: 1200) */
  duration?: number;
  /** Texto antes do número */
  prefix?: string;
  /** Texto depois do número */
  suffix?: string;
  /** Classe CSS do wrapper span */
  className?: string;
  /** Se true, formata com separador de milhar (ex: 1,234) */
  format?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * CountUp — Anima um número de 0 até `value` quando entra no viewport.
 *
 * Usa useInView do Framer Motion para detectar quando está visível.
 * Respeita prefers-reduced-motion: se ativo, exibe o valor final diretamente.
 *
 * Uso:
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
