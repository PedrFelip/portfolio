import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
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
  authors: [{ name: "Pedro Felipe" }],
  openGraph: {
    title: "Pedro Felipe - Backend Engineer",
    description:
      "Building scalable, maintainable systems focused on efficiency and reliability",
    type: "website",
  },
};

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
