"use client";

import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "@/components/ui/blur";

export function SiteProgressiveBlur() {
  const pathname = usePathname();

  if (pathname === "/links" || pathname.startsWith("/links/")) {
    return null;
  }

  return (
    <ProgressiveBlur
      className="site-progressive-blur fixed bottom-0 left-0 h-[clamp(5rem,14vh,9rem)]"
      height="clamp(5rem, 14vh, 9rem)"
      position="bottom"
    />
  );
}
