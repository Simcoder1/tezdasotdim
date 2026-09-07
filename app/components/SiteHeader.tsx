import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark">TEZDA<span>•</span>SOTDIM</Link>
        <nav className="desktop-nav"><Link href="/#topish">AI topish</Link><Link href="/katalog">Katalog</Link><Link href="https://t.me/tezdasotdim" target="_blank">Telegram ↗</Link></nav>
        <Link href="/#topish" className="header-cta">BOT TOPISH</Link>
      </div>
    </header>
  );
}
