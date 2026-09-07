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
        <div className="hero-noise" />
        <div className="hero-content">
          <div className="hero-meta"><span>TELEGRAM BOT DISCOVERY</span><span>UZ / 2026</span></div>
          <h1><span>BOT</span><span>QIDIRMANG.</span></h1>
          <div className="hero-bottom"><p>Sizga qaysi bot kerakligini bilishingiz shart emas.<br/><strong>Muammoingizni ayting. Biz topamiz.</strong></p><Link href="#topish" className="circle-arrow" aria-label="Bot topish">↓</Link></div>
        </div>
        <div className="ticker"><div>MUAMMO → TAHLIL → TAYYOR YECHIM → TELEGRAM → MUAMMO → TAHLIL → TAYYOR YECHIM → TELEGRAM →</div></div>
      </section>

      <section id="topish" className="concierge-section">
        <div className="section-label"><span>01</span><span>BOT CONCIERGE</span></div>
        <AiConcierge />
      </section>

      <section className="white-manifesto">
        <div className="section-label dark"><span>02</span><span>NEGA BOSHQA?</span></div>
        <div className="manifesto-grid"><h2>SIZGA<br/>BOT<br/><i>EMAS.</i></h2><div className="manifesto-copy"><p>Sizga natija kerak.</p><p>TezdaSotdim yuzlab e'lonlarni ko'rsatib, tanlovni sizga tashlab qo'ymaydi. Biz ehtiyojingizni tushunib, aynan mos botlarni ajratamiz.</p><div className="metric-row"><div><strong>{stats?.active_ads ?? "100+"}</strong><span>faol e'lon</span></div><div><strong>{stats?.sold_via_channel ? `${stats.sold_via_channel}+` : "24/7"}</strong><span>kanal faol</span></div><div><strong>1</strong><span>aniq yo'l</span></div></div></div></div>
      </section>

      {ads.length > 0 && <section className="black-listings"><div className="section-label"><span>03</span><span>HOZIR SOTUVDA</span></div><div className="listing-head"><h2>YANGI<br/>YECHIMLAR.</h2><Link href="/katalog">Barchasini ko'rish ↗</Link></div><div className="mono-grid">{ads.map(ad => <BotCard key={ad.id} ad={ad} compact />)}</div></section>}

      <section className="channel-stage"><p>@TEZDASOTDIM</p><h2>TOPDINGIZMI?<br/><span>TELEGRAMDA DAVOM ETING.</span></h2><Link href="https://t.me/tezdasotdim" target="_blank">KANALNI OCHISH <span>↗</span></Link></section>

      <div className="mobile-dock"><Link href="/">⌂<span>Bosh</span></Link><Link className="dock-ai" href="#topish">AI<span>Topish</span></Link><Link href="/katalog">⌕<span>Katalog</span></Link></div>
      <footer className="bw-footer"><span>© {new Date().getFullYear()} TEZDA SOTDIM</span><Link href="https://t.me/tezdasotdim" target="_blank">@TEZDASOTDIM ↗</Link></footer>
    </main>
  );
}
