"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// TODO(refactor)[P1]: element prop declared but never used
interface ZenLayoutTransitionProps {
  children: ReactNode;
  element: "nav" | "footer";
}

export function ZenLayoutTransition({ children }: ZenLayoutTransitionProps) {
  const pathname = usePathname();
  const isBlogPost = pathname.match(/\/(en|pt)\/blog\/.+/);

  return <div hidden={!!isBlogPost}>{children}</div>;
}
