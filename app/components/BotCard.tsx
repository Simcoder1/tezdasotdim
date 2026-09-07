import Link from "next/link";
import type { Ad } from "../lib/api";

function formatPrice(price: number | null) {
  if (!price) return "Narxi kelishiladi";
  return `${new Intl.NumberFormat("uz-UZ").format(price)} so'm`;
}

function getInitial(category: string | null) {
  return (category?.trim()?.[0] || "T").toUpperCase();
}

export default function BotCard({ ad, compact = false }: { ad: Ad; compact?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-700 text-sm font-black text-white shadow-lg shadow-brand-600/15">
            {getInitial(ad.category)}
          </div>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Tekshirilgan
            </span>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-950">{ad.category || "Telegram bot"}</p>
          </div>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">#{ad.id}</div>
      </div>

      <p className={`mt-5 flex-1 text-[15px] leading-6 text-slate-600 ${compact ? "line-clamp-4" : "line-clamp-5"}`}>
        {ad.description}
      </p>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Narxi</div>
            <div className="mt-1 text-base font-extrabold tracking-tight text-slate-950">{formatPrice(ad.price)}</div>
          </div>
          <Link
            href={ad.channel_url}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-600"
          >
            Ko'rish
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
