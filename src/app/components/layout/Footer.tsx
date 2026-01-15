"use client";

import { useLanguage } from "@/lib/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          © {t.footer.year} Pedro Felipe.
        </p>
      </div>
    </footer>
  );
};
