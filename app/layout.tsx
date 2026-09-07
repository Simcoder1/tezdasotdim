import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tezda Sotdim — O'zbekistonda tayyor Telegram botlar bozori",
  description:
    "Tayyor Telegram botingizni tez va ishonchli sotib oling yoki soting. Tezda Sotdim — O'zbekistondagi eng yirik tayyor Telegram bot va biznes avtomatlashtirish botlari platformasi.",
  keywords: [
    "telegram bot sotib olish",
    "telegram bot sotish",
    "tayyor telegram bot",
    "telegram bot narxi",
    "biznes uchun telegram bot",
    "o'zbekiston telegram bot",
  ],
  metadataBase: new URL("https://tezdasotdim.vercel.app"),
  openGraph: {
    title: "Tezda Sotdim — Tayyor Telegram botlar bozori",
    description:
      "O'zbekistondagi eng yirik tayyor Telegram bot va biznes avtomatlashtirish botlari platformasi.",
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
