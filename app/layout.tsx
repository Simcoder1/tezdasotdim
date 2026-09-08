import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tayyor Telegram bot toping",
  description:
    "Biznesingiz uchun tayyor Telegram botni tez toping. Aqlli tanlovchi mos yechimlarni ajratib beradi.",
  keywords: [
    "telegram bot sotib olish",
    "tayyor telegram bot",
    "telegram bot narxi",
    "biznes uchun telegram bot",
    "o'zbekiston telegram bot",
  ],
  metadataBase: new URL("https://tezdasotdim.vercel.app"),
  openGraph: {
    title: "Tayyor Telegram bot toping",
    description:
      "Biznesingiz uchun tayyor Telegram botni tez toping.",
    url: "https://tezdasotdim.vercel.app",
    siteName: "Bot Finder",
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
