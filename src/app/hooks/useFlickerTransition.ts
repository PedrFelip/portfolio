"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FlickerPhase = "idle" | "visible" | "exiting";

interface UseFlickerTransitionReturn {
  flickerPhase: FlickerPhase;
  contentVisible: boolean;
  trigger: (onApply: () => void) => void;
}

export function useFlickerTransition(): UseFlickerTransitionReturn {
  const [flickerPhase, setFlickerPhase] = useState<FlickerPhase>("idle");
  const [contentVisible, setContentVisible] = useState(true);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      for (const t of timersRef.current) clearTimeout(t);
      timersRef.current = [];
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const safe = useCallback((fn: () => void) => {
    if (mountedRef.current) fn();
  }, []);

  const trigger = useCallback(
    (onApply: () => void) => {
      for (const t of timersRef.current) clearTimeout(t);
      timersRef.current = [];
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      safe(() => {
        setContentVisible(false);
        setFlickerPhase("visible");
      });

      const t2 = setTimeout(() => {
        safe(() => {
          onApply();
          setFlickerPhase("exiting");
        });
        rafRef.current = requestAnimationFrame(() => {
          safe(() => setContentVisible(true));
        });
      }, 650);
      timersRef.current.push(t2);

      const t3 = setTimeout(() => {
        safe(() => setFlickerPhase("idle"));
      }, 950);
      timersRef.current.push(t3);
    },
    [safe],
  );

  return { flickerPhase, contentVisible, trigger };
}
