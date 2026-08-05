import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RamayanaVerse — Immersive Cinematic Digital Universe",
  description: "Journey through every story, every character, every battle, every lesson, and every sacred place of the Ramayana in a high-fidelity digital universe.",
  keywords: "Ramayana, Ayodhya, Rama, Hanuman, Sita, Epic, Hindu Mythology, Indian Culture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark antialiased`}>
      <body className="bg-[#050505] text-[#fcfcfc] min-h-screen overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
