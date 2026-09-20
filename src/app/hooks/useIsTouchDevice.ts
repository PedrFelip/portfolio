"use client";

import { useEffect, useState } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Detecta se o dispositivo atual é touch (mobile/tablet).
 * Usado para desabilitar funcionalidades que não fazem sentido
 * em dispositivos sem teclado físico.
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  return isTouch;
}
