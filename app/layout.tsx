import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tezda Sotdim — O'zbekistonda tayyor Telegram bot toping",
  description:
    "Biznesingiz uchun tayyor Telegram botni bir necha soniyada toping. Tezda Sotdim — sun'iy intellekt yordamida mos botni tavsiya qiluvchi O'zbekistondagi platforma.",
  keywords: [
    "telegram bot sotib olish",
    "tayyor telegram bot",
    "biznes uchun telegram bot",
    "o'zbekiston telegram bot",
    "telegram bot narxi",
  ],
  metadataBase: new URL("https://tezdasotdim.vercel.app"),
  openGraph: {
    title: "Tezda Sotdim — Tayyor Telegram bot toping",
    description:
      "Biznesingiz uchun tayyor Telegram botni bir necha soniyada toping — sun'iy intellekt yordamida.",
    url: "https://tezdasotdim.vercel.app",
    siteName: "Tezda Sotdim",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="min-h-screen text-slate-900 antialiased">{children}</body>
    </html>
  );
}
