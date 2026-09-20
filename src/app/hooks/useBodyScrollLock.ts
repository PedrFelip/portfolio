"use client";

import { useEffect } from "react";
import { acquireScrollLock } from "@/lib/scroll-lock";

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    return acquireScrollLock(document.body.style);
  }, [locked]);
}
