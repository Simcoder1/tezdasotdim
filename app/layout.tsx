import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Tezda Sotdim — Tayyor Telegram botlar marketplace", template: "%s | Tezda Sotdim" },
  description: "Biznes va loyihangiz uchun tayyor, tekshirilgan Telegram botlarni AI yordamida tez toping.",
  keywords: ["telegram bot sotib olish", "tayyor telegram bot", "telegram bot narxi", "biznes uchun telegram bot", "o'zbekiston telegram bot"],
  metadataBase: new URL("https://tezdasotdim.vercel.app"),
  openGraph: { title: "Tezda Sotdim — Tayyor Telegram botlar", description: "Tayyor va tekshirilgan Telegram botlarni tez toping.", url: "https://tezdasotdim.vercel.app", siteName: "Tezda Sotdim", locale: "uz_UZ", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="uz"><body className="min-h-screen antialiased">{children}</body></html>;
}
