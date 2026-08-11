"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_COOKIE,
  type Language,
  type Translation,
  translations,
} from "@/lib/i18n";

function setLanguageCookie(lang: Language): void {
  Cookies.set(LANGUAGE_COOKIE, lang, {
    path: "/",
    sameSite: "Lax",
    expires: 365,
  });
}

function getLanguageCookie(): Language | undefined {
  const value = Cookies.get(LANGUAGE_COOKIE);
  return isLanguage(value) ? value : undefined;
}

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  // TODO(refactor)[P3]: router stored in global Zustand
  _router: ReturnType<typeof useRouter> | null;
}

const useLanguageStore = create<LanguageState>((set, get) => ({
  language: DEFAULT_LANGUAGE,
  _router: null,
  setLanguage: (lang: Language) => {
    set({ language: lang });
    setLanguageCookie(lang);

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

  useEffect(() => {
    useLanguageStore.setState({ _router: router });
  }, [router]);

  useEffect(() => {
    const currentStoreLang = useLanguageStore.getState().language;
    const pathParts = pathname.split("/").filter(Boolean);
    const langFromUrl = pathParts[0];

    let nextLang: Language | undefined;
    let persistToCookie = false;

    if (initialLanguage) {
      nextLang = initialLanguage;
    } else if (isLanguage(langFromUrl)) {
      nextLang = langFromUrl;
      persistToCookie = true;
    } else {
      nextLang =
        getLanguageCookie() ??
        (navigator.language.startsWith("pt") ? "pt" : "en");
    }

    if (nextLang && currentStoreLang !== nextLang) {
      useLanguageStore.setState({ language: nextLang });
      if (persistToCookie) setLanguageCookie(nextLang);
    }
  }, [initialLanguage, pathname]);
}

export function useLanguage() {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const t: Translation = translations[language];

  return { language, setLanguage, t } as const;
}
