import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { LanguageProvider } from "@/lib/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <Navigation />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
