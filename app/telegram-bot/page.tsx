import type { Metadata } from "next";
import Link from "next/link";
import { SEO_PAGES } from "../lib/seo-pages";

export const metadata: Metadata = {
  title: "Telegram bot turlari",
  description: "Biznesingiz uchun tayyor Telegram botni vazifa bo‘yicha tanlang.",
  alternates: { canonical: "/telegram-bot" },
};

export default function TelegramBotHub() {
  return (
    <main className="seo-page">
      <header className="seo-header">
        <Link href="/" className="seo-back">← Bot tanlash</Link>
        <a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer">Telegram kanal ↗</a>
      </header>
      <section className="seo-hero">
        <p className="seo-kicker">TAYYOR TELEGRAM BOTLAR</p>
        <h1>Biznes vazifangizga mos botni tanlang.</h1>
        <p>Kerakli yo‘nalishni oching, nimalarga e’tibor berishni bilib oling va sotuvdagi tayyor variantlarni ko‘ring.</p>
      </section>
      <section className="seo-grid">
        {SEO_PAGES.map((page) => (
          <Link key={page.slug} href={`/telegram-bot/${page.slug}`}>
            <span>{page.title}</span><b>→</b>
          </Link>
        ))}
      </section>
    </main>
  );
}
