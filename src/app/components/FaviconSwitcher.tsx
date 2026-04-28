"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const FaviconSwitcher = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const links = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"], link[rel="apple-touch-icon"]',
    );

    const href =
      resolvedTheme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";

    for (const link of links) {
      link.href = href;
    }
  }, [resolvedTheme, mounted]);

  return null;
};
