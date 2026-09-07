import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
<<<<<<< HEAD
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
=======
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
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
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
