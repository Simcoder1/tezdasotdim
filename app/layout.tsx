import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Tezda Sotdim — Tayyor Telegram bot toping", template: "%s | Tezda Sotdim" },
  description: "Biznesingiz uchun mos tayyor Telegram botni toping, qisqa ma'lumotni ko'ring va original @tezdasotdim e'loniga o'ting.",
  keywords: ["telegram bot kerak", "telegram bot sotib olish", "tayyor telegram bot", "telegram bot narxi", "biznes uchun telegram bot"],
  metadataBase: new URL("https://tezdasotdim.vercel.app"),
  openGraph: {
    title: "Tezda Sotdim — Tayyor Telegram bot toping",
    description: "Muammoingizni ayting. Mos tayyor botni topib, original Telegram e'loniga olib boramiz.",
    url: "https://tezdasotdim.vercel.app",
    siteName: "Tezda Sotdim",
    locale: "uz_UZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="uz"><body>{children}</body></html>;
}
