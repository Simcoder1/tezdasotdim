import Link from "next/link";
import { getAds, getStats } from "./lib/api";
import SiteHeader from "./components/SiteHeader";
import BotCard from "./components/BotCard";
import AiConcierge from "./components/AiConcierge";

export const revalidate = 60;

export default async function HomePage() {
  const [stats, ads] = await Promise.all([getStats(), getAds(6)]);

  return (
    <main className="bw-page">
      <SiteHeader />

      <section className="future-hero">
        <div className="hero-content">
          <div className="hero-meta">
            <span>TAYYOR TELEGRAM BOTLAR</span>
            <span>@TEZDASOTDIM</span>
          </div>

          <div className="hero-copy-block">
            <p className="hero-kicker">Botni noldan yasatish shart emas.</p>
            <h1>
              <span>MUAMMONI</span>
              <span>AYTING.</span>
            </h1>
            <p className="hero-lead">
              Biz ehtiyojingizni tushunamiz, TezdaSotdim e'lonlari ichidan mos tayyor botlarni topamiz va original e'longa olib boramiz.
            </p>
          </div>

          <div className="hero-actions">
            <Link href="#topish" className="primary-hero-cta">Menga bot topib ber <span>↓</span></Link>
            <Link href="/katalog" className="secondary-hero-cta">Katalogni ko'rish</Link>
          </div>
        </div>
      </section>

      <section id="topish" className="concierge-section">
        <div className="section-label"><span>01</span><span>MOS BOTNI TOPISH</span></div>
        <AiConcierge />
      </section>

      <section className="white-manifesto">
        <div className="section-label dark"><span>02</span><span>NEGA TEZDA SOTDIM?</span></div>
        <div className="manifesto-grid">
          <h2>TAYYOR.<br/>TEZ.<br/><i>QULAY.</i></h2>
          <div className="manifesto-copy">
            <p>Birinchi botingizga tezroq ega bo'ling.</p>
            <p>
              Tayyor loyihani tanlash ko'p hollarda noldan ishlab chiqishni kutishdan osonroq: vaqt tejaladi, ortiqcha murakkablik kamayadi va narxni oldindan ko'rish mumkin.
            </p>
            <div className="benefit-stack">
              <div><strong>01</strong><span>Ehtiyojingizga mos botni tez topish</span></div>
              <div><strong>02</strong><span>Original e'lon va sotuvchi bilan bevosita tanishish</span></div>
              <div><strong>03</strong><span>Yangi bot e'lonlarini Telegram kanalida kuzatish</span></div>
            </div>
            <div className="metric-row">
              <div><strong>{stats?.active_ads ?? "100+"}</strong><span>faol e'lon</span></div>
              <div><strong>24/7</strong><span>qidirish mumkin</span></div>
              <div><strong>1</strong><span>aniq yo'l</span></div>
            </div>
          </div>
        </div>
      </section>

      {ads.length > 0 && (
        <section className="black-listings">
          <div className="section-label"><span>03</span><span>HOZIRGI E'LONLAR</span></div>
          <div className="listing-head">
            <div>
              <h2>MOSINI<br/>TANLANG.</h2>
              <p>Qisqa tavsifni ko'ring. Kerak bo'lsa batafsil oching yoki bevosita Telegramdagi original e'longa o'ting.</p>
            </div>
            <Link href="/katalog">Barcha botlar ↗</Link>
          </div>
          <div className="mono-grid">{ads.map((ad) => <BotCard key={ad.id} ad={ad} compact />)}</div>
        </section>
      )}

      <section className="channel-stage">
        <p>@TEZDASOTDIM</p>
        <h2>YANGI BOTLARNI<br/><span>O'TKAZIB YUBORMANG.</span></h2>
        <p className="channel-copy">Yangi tayyor botlar va loyihalar kanalga joylanadi. Mos e'lon chiqsa, birinchi bo'lib ko'ring.</p>
        <Link href="https://t.me/tezdasotdim" target="_blank">KANALGA OBUNA BO'LISH <span>↗</span></Link>
      </section>

      <div className="mobile-dock">
        <Link href="/"><span className="dock-icon">⌂</span><span>Bosh sahifa</span></Link>
        <Link className="dock-ai" href="#topish"><span className="dock-icon">AI</span><span>Bot topish</span></Link>
        <Link href="/katalog"><span className="dock-icon">⌕</span><span>Katalog</span></Link>
      </div>

      <footer className="bw-footer">
        <span>© {new Date().getFullYear()} TEZDA SOTDIM</span>
        <Link href="https://t.me/tezdasotdim" target="_blank">@TEZDASOTDIM ↗</Link>
      </footer>
    </main>
  );
}
