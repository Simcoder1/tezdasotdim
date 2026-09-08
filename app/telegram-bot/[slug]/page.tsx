import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TrackedTelegramLink from "../../components/TrackedTelegramLink";
import { getSeoPage, SEO_PAGES } from "../../lib/seo-pages";

export function generateStaticParams() {
  return SEO_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/telegram-bot/${page.slug}` },
    openGraph: { title: page.title, description: page.description, type: "website" },
  };
}

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();
  const related = SEO_PAGES.filter((item) => item.slug !== page.slug).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tezdasotdim.vercel.app";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Telegram botlar", item: `${siteUrl}/telegram-bot` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${siteUrl}/telegram-bot/${page.slug}` },
    ],
  };

  return (
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <header className="seo-header">
        <Link href="/" className="seo-back">← Bot tanlash</Link>
        <TrackedTelegramLink location={`seo_header_${page.slug}`}>Telegram kanal ↗</TrackedTelegramLink>
      </header>
      <article>
        <section className="seo-hero">
          <p className="seo-kicker">NOLDAN YASATIB KUTMANG</p>
          <h1>{page.heading}</h1>
          <p>{page.intro}</p>
          <div className="seo-actions">
            <Link href="/">Mos botni topish</Link>
            <TrackedTelegramLink location={`seo_hero_${page.slug}`}>Tayyor e’lonlarni ko‘rish ↗</TrackedTelegramLink>
          </div>
        </section>
        <section className="seo-columns">
          <div><span>QANDAY YORDAM BERADI</span><h2>Tayyor bot bilan tezroq boshlang</h2><ul>{page.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><span>SOTIB OLISHDAN OLDIN</span><h2>Shularni tekshiring</h2><ul>{page.checks.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>
        <section className="seo-cta">
          <p>Sizga aynan qanday bot kerak?</p>
          <h2>Vazifangizni ayting — mos tayyor variantlarni topamiz.</h2>
          <Link href="/">Bot tanlashni boshlash →</Link>
        </section>
        <nav className="seo-related" aria-label="Boshqa Telegram bot turlari">
          <span>Boshqa yo‘nalishlar</span>
          {related.map((item) => <Link key={item.slug} href={`/telegram-bot/${item.slug}`}>{item.title} →</Link>)}
        </nav>
      </article>
    </main>
  );
}
