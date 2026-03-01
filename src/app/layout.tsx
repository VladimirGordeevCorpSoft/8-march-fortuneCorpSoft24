import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🌸 Гадание на 8 Марта | КорпСофт24",
  description: "Интерактивное онлайн-гадание на 8 марта для коллег. 12 волшебных предсказаний и персональная карта судьбы!",
  keywords: ["8 марта", "гадание", "поздравление", "женский день", "весна", "КорпСофт24"],
  authors: [{ name: "КорпСофт24" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌸</text></svg>",
  },
  openGraph: {
    title: "🌸 Гадание на 8 Марта",
    description: "12 волшебных предсказаний для коллег",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
