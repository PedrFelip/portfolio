"use client";

import type { ReactNode } from "react";
import type { Language } from "@/lib/i18n";
import { useLanguageSync } from "@/lib/language-store";

export function LanguageSync({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  useLanguageSync(initialLanguage);
  return <>{children}</>;
}
