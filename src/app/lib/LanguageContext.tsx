"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_COOKIE,
  type Language,
  translations,
} from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // Initialize with the server-provided language to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>(
    initialLanguage || DEFAULT_LANGUAGE,
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only run language detection on client-side and after hydration
  useEffect(() => {
    if (!isClient) return;

    // Detect language from URL
    const pathParts = pathname.split("/").filter(Boolean);
    const langFromUrl = pathParts[0] as Language;

    if (isLanguage(langFromUrl)) {
      if (language !== langFromUrl) {
        setLanguageState(langFromUrl);
        // Sync cookie with current path
        document.cookie = `${LANGUAGE_COOKIE}=${langFromUrl}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } else {
      // No language in URL, check cookie or fallback to browser
      const cookieLang = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LANGUAGE_COOKIE}=`))
        ?.split("=")[1];

      if (isLanguage(cookieLang)) {
        if (language !== cookieLang) {
          setLanguageState(cookieLang);
        }
      } else {
        // No cookie, fallback to browser language
        const browserLang = navigator.language.startsWith("pt") ? "pt" : "en";
        if (language !== browserLang) {
          setLanguageState(browserLang);
        }
      }
    }
  }, [isClient, language, pathname]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Persist in cookie for server-side detection (Middleware)
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;

    // Navigate to the new language path using next/navigation for SPA-like feel
    const pathParts = pathname.split("/").filter(Boolean);
    const currentLang = pathParts[0];

    let newPath = "";
    if (currentLang === "pt" || currentLang === "en") {
      newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    } else {
      newPath = `/${lang}${pathname}`;
    }

    router.push(newPath);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
