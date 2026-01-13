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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Load from localStorage or detect browser language
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "en" || stored === "pt")) {
      setLanguageState(stored);
    } else {
      // Detect browser language
      const browserLang = navigator.language.startsWith("pt") ? "pt" : "en";
      setLanguageState(browserLang);
      localStorage.setItem(STORAGE_KEY, browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
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
