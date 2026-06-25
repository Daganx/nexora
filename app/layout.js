import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const interTight = Inter_Tight({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Wallpaper",
  description: "Gallery of Wallpaper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
