"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 220;
const FRAME_WIDTH = 24;

function buildHashFrame(width: number, tick: number): string {
  let output = "";
  for (let i = 0; i < width; i += 1) {
    const wave = Math.sin((i + tick * 1.7) / 2.3);
    const noise = ((i * 29 + tick * 13) % 17) / 17;
    output += wave + noise > 0.45 ? "#" : " ";
  }
  return output;
}

export function RouteNavigationLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);
  const startRef = useRef<number>(0);
  const initialPathRef = useRef(pathname);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      startRef.current = performance.now();
      setVisible(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 55);
    return () => window.clearInterval(timer);
  }, [visible]);

  useEffect(() => {
    if (pathname === initialPathRef.current) return;
    if (!visible) return;

    const elapsed = performance.now() - startRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    const timer = window.setTimeout(() => setVisible(false), remaining);
    return () => window.clearTimeout(timer);
  }, [pathname, visible]);

  if (!visible) return null;

  const langSegment = pathname?.split("/")[1];
  const text = langSegment === "pt" ? "Carregando..." : "Loading...";
  const stream = buildHashFrame(FRAME_WIDTH, tick);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-[130] flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground/85">
          {text}
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
          [{stream}]
        </p>
      </div>
    </div>
  );
}
