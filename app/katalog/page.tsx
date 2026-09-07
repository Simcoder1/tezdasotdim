import type { Metadata } from "next";
import Link from "next/link";
import { getAds } from "../lib/api";
import SiteHeader from "../components/SiteHeader";
import CatalogClient from "../components/CatalogClient";
export const metadata: Metadata = { title: "Tayyor Telegram botlar — Tezda Sotdim", description: "Tayyor Telegram botlarni toping va original @tezdasotdim e'loniga o'ting." };
export const revalidate = 60;
export default async function CatalogPage() { const ads = await getAds(96); return <main className="catalog-page"><SiteHeader/><section className="catalog-hero"><div className="section-label"><span>CATALOG</span><span>{ads.length} E'LON</span></div><h1>TAYYOR<br/>BOTLAR.</h1><p>Qidiring. Solishtiring. Original e'lonni Telegramda oching.</p><Link href="/#topish">Qaysi bot kerakligini bilmaysizmi? AI topib bersin →</Link></section><section className="catalog-body">{ads.length ? <CatalogClient ads={ads}/> : <div className="empty-black">Hozircha faol e'lon topilmadi.</div>}</section><footer className="bw-footer"><span>© {new Date().getFullYear()} TEZDA SOTDIM</span><Link href="https://t.me/tezdasotdim" target="_blank">@TEZDASOTDIM ↗</Link></footer></main> }
