import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { LanguageProvider } from "@/lib/LanguageContext";

const metadataConfig = {
  en: {
    title: "Pedro Felipe - Backend Engineer & System Architect",
    description:
      "Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable, maintainable systems with Node.js, TypeScript, Go, PostgreSQL, Docker, and Linux.",
    keywords: [
      "Backend Developer",
      "System Architect",
      "Node.js",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Docker",
      "Linux",
      "DevOps",
      "Cloud Infrastructure",
    ],
    ogTitle: "Pedro Felipe - Backend Engineer",
    ogDescription:
      "Building scalable, maintainable systems focused on efficiency and reliability",
  },
  pt: {
    title: "Pedro Felipe - Engenheiro Backend & Arquiteto de Sistemas",
    description:
      "Desenvolvedor backend apaixonado por design de sistemas, infraestrutura em nuvem e automação. Construindo sistemas escaláveis e mantíveis com Node.js, TypeScript, Go, PostgreSQL, Docker e Linux.",
    keywords: [
      "Desenvolvedor Backend",
      "Arquiteto de Sistemas",
      "Node.js",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Docker",
      "Linux",
      "DevOps",
      "Infraestrutura em Nuvem",
    ],
    ogTitle: "Pedro Felipe - Engenheiro Backend",
    ogDescription:
      "Construindo sistemas escaláveis e mantíveis focados em eficiência e confiabilidade",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLang = lang === "pt" || lang === "en" ? lang : "en";
  const config = metadataConfig[validLang as keyof typeof metadataConfig];

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "Pedro Felipe" }],
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
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
    <LanguageProvider initialLanguage={validLang}>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
