"use client";

import { useState } from "react";
import type { Ad } from "../lib/api";

function formatPrice(price: number | null) {
  return price ? `${new Intl.NumberFormat("uz-UZ").format(price)} so'm` : "Narxi kelishiladi";
}

export default function BotCard({ ad, compact = false }: { ad: Ad; compact?: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`mono-card ${expanded ? "is-expanded" : ""}`}>
      <div className="mono-card-top">
        <span className="verified">● FAOL E'LON</span>
        <span>#{String(ad.id).padStart(3, "0")}</span>
      </div>

      <div className="mono-category">{ad.category || "Telegram bot"}</div>
      <p className={!expanded && compact ? "line-clamp-4" : !expanded ? "line-clamp-6" : ""}>
        {ad.description}
      </p>

      <div className="mono-price">
        <small>NARXI</small>
        <strong>{formatPrice(ad.price)}</strong>
      </div>

      <div className="card-actions">
        <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          {expanded ? "Yopish" : "Batafsil ko'rish"}
        </button>
        <a href={ad.channel_url} target="_blank" rel="noreferrer">
          E'lonni ko'rish <span>↗</span>
        </a>
      </div>
    </article>
  );
}
