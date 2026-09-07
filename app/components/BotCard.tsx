import Link from "next/link";
import type { Ad } from "../lib/api";

function formatPrice(price: number | null) { return price ? `${new Intl.NumberFormat("uz-UZ").format(price)} so'm` : "Narxi kelishiladi"; }

export default function BotCard({ ad, compact = false }: { ad: Ad; compact?: boolean }) {
  return (
    <article className="mono-card">
      <div className="mono-card-top"><span className="verified">● TEKSHIRILGAN</span><span>#{String(ad.id).padStart(3,"0")}</span></div>
      <div className="mono-category">{ad.category || "TELEGRAM BOT"}</div>
      <p className={compact ? "line-clamp-4" : "line-clamp-6"}>{ad.description}</p>
      <div className="mono-card-bottom"><div><small>NARXI</small><strong>{formatPrice(ad.price)}</strong></div><Link href={ad.channel_url} target="_blank">E'LONNI OCHISH ↗</Link></div>
    </article>
  );
}
