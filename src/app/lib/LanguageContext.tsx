"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_LANGUAGE, type Language, translations } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "portfolio-language";

export const LanguageProvider = ({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) => {
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
    const pathname = window.location.pathname;
    const pathParts = pathname.split("/").filter(Boolean);
    const langFromUrl = pathParts[0] as Language;

    if (langFromUrl === "pt" || langFromUrl === "en") {
      if (language !== langFromUrl) {
        setLanguageState(langFromUrl);
        localStorage.setItem(STORAGE_KEY, langFromUrl);
      }
    }
  }, [isClient, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    // Navigate to the new language path
    const pathname = window.location.pathname;
    const pathParts = pathname.split("/").filter(Boolean);
    const currentLang = pathParts[0];
    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    window.location.pathname = newPath;
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
