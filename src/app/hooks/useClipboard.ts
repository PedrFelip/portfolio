"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COPY_FEEDBACK_DURATION_MS = 2000;

interface ClipboardState {
  copied: boolean;
  isCopying: boolean;
  copy: (text: string) => Promise<void>;
}

export function useClipboard(): ClipboardState {
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    return () => {
      // Ignore clipboard writes that finish after unmount.
      requestIdRef.current += 1;
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string): Promise<void> => {
    const requestId = ++requestIdRef.current;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setCopied(false);
    setIsCopying(true);

    try {
      if (!navigator.clipboard) return;
      await navigator.clipboard.writeText(text);

      // Only the latest request owns the feedback and its timer.
      if (requestId !== requestIdRef.current) return;
      setCopied(true);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, COPY_FEEDBACK_DURATION_MS);
    } catch {
      if (requestId === requestIdRef.current) setCopied(false);
    } finally {
      if (requestId === requestIdRef.current) setIsCopying(false);
    }
  }, []);

  return { copied, isCopying, copy };
}
