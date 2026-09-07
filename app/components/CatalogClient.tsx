"use client";

import { useMemo, useState } from "react";
import type { Ad } from "../lib/api";
import BotCard from "./BotCard";

const PRICE_FILTERS = [
  { key: "all", label: "Barchasi" },
  { key: "budget", label: "500 minggacha" },
  { key: "mid", label: "500 ming – 2 mln" },
  { key: "premium", label: "2 mln+" },
] as const;

type PriceKey = (typeof PRICE_FILTERS)[number]["key"];

export default function CatalogClient({ ads }: { ads: Ad[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Barchasi");
  const [priceKey, setPriceKey] = useState<PriceKey>("all");

  const categories = useMemo(() => {
    const values = Array.from(new Set(ads.map((a) => a.category).filter(Boolean) as string[]));
    return ["Barchasi", ...values.slice(0, 8)];
  }, [ads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("uz");
    return ads.filter((ad) => {
      const haystack = `${ad.category || ""} ${ad.description}`.toLocaleLowerCase("uz");
      const queryOk = !q || haystack.includes(q);
      const categoryOk = category === "Barchasi" || ad.category === category;
      const p = ad.price;
      const priceOk =
        priceKey === "all" ||
        (priceKey === "budget" && p !== null && p <= 500_000) ||
        (priceKey === "mid" && p !== null && p > 500_000 && p <= 2_000_000) ||
        (priceKey === "premium" && p !== null && p > 2_000_000);
      return queryOk && categoryOk && priceOk;
    });
  }, [ads, query, category, priceKey]);

  return (
    <>
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.05)] sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masalan: kino, do'kon, CRM, obuna..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
          </label>

          <select
            value={priceKey}
            onChange={(e) => setPriceKey(e.target.value as PriceKey)}
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-500/10 lg:w-52"
          >
            {PRICE_FILTERS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === item ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500"><span className="font-bold text-slate-900">{filtered.length}</span> ta mos yechim topildi</p>
        {(query || category !== "Barchasi" || priceKey !== "all") && (
          <button onClick={() => { setQuery(""); setCategory("Barchasi"); setPriceKey("all"); }} className="text-sm font-semibold text-brand-600 hover:text-brand-700">Filtrlarni tozalash</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </div>
          <h3 className="mt-4 font-bold text-slate-950">Mos bot topilmadi</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Qidiruv so'zini soddalashtiring yoki boshqa narx/kategoriya tanlang.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ad) => <BotCard key={ad.id} ad={ad} />)}
        </div>
      )}
    </>
  );
}
