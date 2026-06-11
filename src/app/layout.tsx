import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Space_Grotesk,
} from "next/font/google";

import { FaviconSwitcher } from "@/components/FaviconSwitcher";
import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
    icon: "/favicon-light.svg",
    apple: "/favicon-light.svg",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${ibmPlexSerif.variable} ${spaceGrotesk.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <MotionProvider>
            <FaviconSwitcher />

            {children}
          </MotionProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
