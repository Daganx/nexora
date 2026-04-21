import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexora - UI/UX Collection",
  description: "Inspiration design & web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${interTight.variable} h-full antialiased`}>
      <body
        className={`${interTight.variable} min-h-full flex flex-col font-sans`}
      >
        {/* ✅ Navbar globale */}
        <Navbar />

        {/* ✅ Contenu des pages */}
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
