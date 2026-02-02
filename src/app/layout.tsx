import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataConfig = {
  en: {
    title: "Pedro Felipe - Backend Engineer & System Architect",
    description:
      "Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable, maintainable systems with Node.js, TypeScript, Go, PostgreSQL, Docker, and Linux.",
    ogDescription:
      "Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable, maintainable systems.",
    twitterDescription:
      "Backend developer passionate about system design, cloud infrastructure, and automation.",
  },
  pt: {
    title: "Pedro Felipe - Engenheiro Backend & Arquiteto de Sistemas",
    description:
      "Desenvolvedor backend apaixonado por design de sistemas, infraestrutura em nuvem e automação. Construindo sistemas escaláveis e mantíveis com Node.js, TypeScript, Go, PostgreSQL, Docker e Linux.",
    ogDescription:
      "Desenvolvedor backend apaixonado por design de sistemas, infraestrutura em nuvem e automação. Construindo sistemas escaláveis e mantíveis.",
    twitterDescription:
      "Desenvolvedor backend apaixonado por design de sistemas, infraestrutura em nuvem e automação.",
  },
};

export const metadata: Metadata = {
  title: metadataConfig.en.title,
  description: metadataConfig.en.description,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: "https://portfolio.vercel.app",
    siteName: "Pedro Felipe",
    title: metadataConfig.en.title,
    description: metadataConfig.en.ogDescription,
  },
  twitter: {
    card: "summary",
    title: metadataConfig.en.title,
    description: metadataConfig.en.twitterDescription,
  },
  alternates: {
    canonical: "https://portfolio.vercel.app/en",
    languages: {
      en: "https://portfolio.vercel.app/en",
      pt: "https://portfolio.vercel.app/pt",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
