"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { create } from "zustand";
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_COOKIE,
  type Language,
  translations,
} from "@/lib/i18n";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  _router: ReturnType<typeof useRouter> | null;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: DEFAULT_LANGUAGE,
  _router: null,
  setLanguage: (lang: Language) => {
    set({ language: lang });
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has limited browser support
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;

    const { _router } = get();
    if (!_router) return;

    const pathname = window.location.pathname;
    const pathParts = pathname.split("/").filter(Boolean);
    const currentLang = pathParts[0];

    let newPath = "";
    if (currentLang === "pt" || currentLang === "en") {
      newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    } else {
      newPath = `/${lang}${pathname}`;
    }

    _router.push(newPath);
  },
}));

export function useLanguageSync(initialLanguage?: Language) {
  const router = useRouter();
  const pathname = usePathname();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    useLanguageStore.setState({ _router: router });
  }, [router]);

  useEffect(() => {
    if (synced) return;

    const currentStoreLang = useLanguageStore.getState().language;

    if (initialLanguage && currentStoreLang !== initialLanguage) {
      useLanguageStore.setState({ language: initialLanguage });
      setSynced(true);
      return;
    }

    const pathParts = pathname.split("/").filter(Boolean);
    const langFromUrl = pathParts[0] as Language;

    if (isLanguage(langFromUrl)) {
      if (currentStoreLang !== langFromUrl) {
        useLanguageStore.setState({ language: langFromUrl });
        // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has limited browser support
        document.cookie = `${LANGUAGE_COOKIE}=${langFromUrl}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } else {
      const cookieLang = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LANGUAGE_COOKIE}=`))
        ?.split("=")[1];

      if (isLanguage(cookieLang)) {
        if (currentStoreLang !== cookieLang) {
          useLanguageStore.setState({ language: cookieLang });
        }
      } else {
        const browserLang = navigator.language.startsWith("pt") ? "pt" : "en";
        if (currentStoreLang !== browserLang) {
          useLanguageStore.setState({ language: browserLang });
        }
      }
    }

    setSynced(true);
  }, [synced, initialLanguage, pathname]);
}

export function useLanguage() {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const t = translations[language];

  return { language, setLanguage, t } as const;
}
