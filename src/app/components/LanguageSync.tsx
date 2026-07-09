"use client";

import { type ReactNode, useEffect } from "react";
import type { Language } from "@/lib/i18n";
import { useLanguage, useLanguageSync } from "@/lib/language-store";

export function LanguageSync({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  useLanguageSync(initialLanguage);
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
