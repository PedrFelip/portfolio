import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { MotionProvider } from "@/components/MotionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
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
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// TODO(refactor)[P1]: hardcoded #fcfcfc / #0a0a0a duplicates
// --background — use CSS var or derive
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
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
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon-light.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.social.xHandle,
  },
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      en: `${siteConfig.url}/en`,
      pt: `${siteConfig.url}/pt`,
      "x-default": `${siteConfig.url}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
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
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
