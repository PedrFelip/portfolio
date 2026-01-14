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

export const metadata: Metadata = {
  title: "Pedro Felipe - Backend Engineer & System Architect",
  description:
    "Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable, maintainable systems with Node.js, TypeScript, Go, PostgreSQL, Docker, and Linux.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.vercel.app",
    siteName: "Pedro Felipe",
    title: "Pedro Felipe - Backend Engineer & System Architect",
    description:
      "Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable, maintainable systems.",
    images: [
      {
        url: "https://portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pedro Felipe Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Felipe - Backend Engineer & System Architect",
    description:
      "Backend developer passionate about system design, cloud infrastructure, and automation.",
    images: ["https://portfolio.vercel.app/og-image.png"],
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
      </body>
    </html>
  );
}
