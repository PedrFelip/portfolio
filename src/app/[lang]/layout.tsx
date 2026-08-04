import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageSync } from "@/components/LanguageSync";
import { LayoutShell } from "@/components/layout/LayoutShell";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  isLanguage,
  langStaticParams,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return langStaticParams();
}

/** Build hreflang alternates for a localized path under [lang]. */
function localizedAlternates(currentLang: string, path = "") {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = `${siteConfig.url}/${locale}${path}`;
  }
  languages["x-default"] = `${siteConfig.url}/${DEFAULT_LANGUAGE}${path}`;
  return {
    canonical: `${siteConfig.url}/${currentLang}${path}`,
    languages,
  };
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
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      type: "website",
      locale: validLang === "pt" ? "pt_BR" : "en_US",
      siteName: siteConfig.name,
      url: `${siteConfig.url}/${validLang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      creator: siteConfig.social.xHandle,
    },
    alternates: localizedAlternates(validLang),
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
