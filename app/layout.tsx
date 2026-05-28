import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | DyreBudget.dk",
    default: "DyreBudget.dk — Hvad koster dit kæledyr egentlig?",
  },
  description:
    "Beregn de reelle omkostninger ved hund og kat i Danmark. Sammenlign racer, se månedlig pris, livsbudget og find de bedste produkter. Datadrevet kæledyrsøkonomi.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dyrebudget.dk"),
  keywords: [
    "hvad koster en hund",
    "hvad koster en kat",
    "hundebudget",
    "kattebudget",
    "billigste hunderace",
    "kæledyrsomkostninger",
    "hundeforsikring pris",
  ],
  authors: [{ name: "DyreBudget.dk" }],
  creator: "DyreBudget.dk",
  publisher: "DyreBudget.dk",
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "DyreBudget.dk",
    url: "https://dyrebudget.dk",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dyrebudget",
    creator: "@dyrebudget",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
