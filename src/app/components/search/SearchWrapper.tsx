"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useSearchStore } from "@/lib/search-store";

const SearchCommand = dynamic(
  () => import("./SearchCommand").then((mod) => mod.SearchCommand),
  {
    ssr: false,
  },
);

export function SearchWrapper() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const open = useSearchStore((s) => s.open);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const prefetch = () => {
      void import("./SearchCommand").catch((err) => {
        console.warn("Failed to prefetch SearchCommand:", err);
      });
      void useSearchStore
        .getState()
        .loadIndex()
        .catch((err) => {
          console.warn("Failed to prefetch search index:", err);
        });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => prefetch());
      } else {
        setTimeout(prefetch, 2000);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        if (isOpen) return;
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open]);

  // Desabilita modal de pesquisa em dispositivos touch
  if (isTouch) return null;

  return isOpen ? <SearchCommand /> : null;
}
