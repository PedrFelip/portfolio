"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ASPECT_RATIO = 416 / 542;

interface LogoProps {
  height?: number;
  className?: string;
}

export const Logo = ({ height = 28, className = "" }: LogoProps) => {
  const width = Math.round(height * ASPECT_RATIO);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className={`bg-surface-3 rounded animate-pulse ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? "/logo-dark.svg" : "/logo-ligth.svg";

  return (
    <Image
      src={logoSrc}
      alt="Pedro Felipe Logo"
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${className}`}
      priority
    />
  );
};
