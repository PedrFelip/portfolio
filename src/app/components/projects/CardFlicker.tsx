"use client";

// TODO(refactor)[P1]: import from framer-motion
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/animations";

interface CardFlickerProps {
  duration?: number;
}

export function CardFlicker({ duration = 400 }: CardFlickerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
          transition={{ duration: 0.1, ease: EASE }}
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-background" />
        </m.div>
      )}
    </AnimatePresence>
  );
}
