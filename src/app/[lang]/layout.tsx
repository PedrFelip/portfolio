import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageSync } from "@/components/LanguageSync";
import { LayoutShell } from "@/components/layout/LayoutShell";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  isLanguage,
  langStaticParams,
} from "@/lib/i18n";

export function generateStaticParams() {
  return langStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const t = getTranslations(validLang).meta;

  return {
    title: {
      default: t.title,
      template: `%s | Pedro Felipe`,
    },
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: "Pedro Felipe" }],
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      type: "website",
      locale: validLang === "pt" ? "pt_BR" : "en_US",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  // Ensure lang is valid
  if (lang !== "pt" && lang !== "en") {
    notFound();
  }

  const validLang = lang as "pt" | "en";

  return (
    <LanguageSync initialLanguage={validLang}>
      <LayoutShell>{children}</LayoutShell>
    </LanguageSync>
  );
}
