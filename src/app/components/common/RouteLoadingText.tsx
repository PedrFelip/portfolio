"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const FRAME_WIDTH = 20;

function buildHashFrame(width: number, tick: number): string {
  let output = "";
  for (let i = 0; i < width; i += 1) {
    const wave = Math.sin((i + tick * 1.5) / 2.1);
    const noise = ((i * 19 + tick * 11) % 13) / 13;
    output += wave + noise > 0.42 ? "#" : " ";
  }
  return output;
}

interface RouteLoadingTextProps {
  text?: string;
}

export function RouteLoadingText({ text }: RouteLoadingTextProps) {
  const pathname = usePathname();
  const [tick, setTick] = useState(0);
  const langSegment = pathname?.split("/")[1];
  const localizedText =
    text ?? (langSegment === "pt" ? "Carregando..." : "Loading...");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60);
    return () => window.clearInterval(timer);
  }, []);

  const stream = useMemo(() => buildHashFrame(FRAME_WIDTH, tick), [tick]);

  return (
    <div className="fixed inset-x-0 bottom-0 top-16 z-[130] flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground/85">
          {localizedText}
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
          [{stream}]
        </p>
      </div>
    </div>
  );
}
