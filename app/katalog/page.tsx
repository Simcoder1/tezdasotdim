import Link from "next/link";
import type { Metadata } from "next";
import { getAds } from "../lib/api";

export const metadata: Metadata = {
  title: "Katalog — Tezda Sotdim",
  description: "Hozirda sotuvda turgan barcha tayyor Telegram botlar ro'yxati.",
};

export const revalidate = 60;

export default async function CatalogPage() {
  const ads = await getAds(48);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <Link href="/" className="text-sm text-brand-600 hover:underline">
          ← Bosh sahifa
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Faol e'lonlar</h1>
        <p className="mt-2 text-slate-600">
          Hozirda sotuvda turgan tayyor Telegram botlar. Har biri admin tomonidan tekshirilgan.
        </p>
      </div>

      {ads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          Hozircha faol e'lonlar yo'q. Tez orada yangilanadi.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <article
              key={ad.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {ad.category && (
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                  {ad.category}
                </span>
              )}
              <p className="flex-1 text-sm leading-relaxed text-slate-700 line-clamp-6">
                {ad.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-slate-900">
                  {ad.price ? `${ad.price.toLocaleString("uz-UZ")} so'm` : "Kelishiladi"}
                </span>
                <Link
                  href={ad.channel_url}
                  target="_blank"
                  className="text-sm font-medium text-brand-600 hover:underline"
                >
                  Batafsil →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
