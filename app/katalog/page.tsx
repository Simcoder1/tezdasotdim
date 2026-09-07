import type { Metadata } from "next";
import Link from "next/link";
import { getAds } from "../lib/api";
import SiteHeader from "../components/SiteHeader";
import CatalogClient from "../components/CatalogClient";

export const metadata: Metadata = {
  title: "Telegram botlar katalogi — Tezda Sotdim",
  description: "Tekshirilgan tayyor Telegram botlarni kategoriya, vazifa va narx bo'yicha toping.",
};

export const revalidate = 60;

export default async function CatalogPage() {
  const ads = await getAds(96);

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-brand-600">← Bosh sahifa</Link>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Tayyor botlar katalogi</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Vazifangizga mos botni qidiring, narx bo'yicha saralang va tekshirilgan e'lonni to'g'ridan-to'g'ri Telegramda oching.</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800"><span className="h-2 w-2 rounded-full bg-emerald-500" /> E'lonlar har daqiqada yangilanadi</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
        {ads.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="font-bold text-slate-950">Hozircha faol e'lon topilmadi</h2>
            <p className="mt-2 text-sm text-slate-500">Backend bilan aloqa yoki e'lonlar holatini tekshiring.</p>
          </div>
        ) : <CatalogClient ads={ads} />}
      </section>

      <footer className="mt-10 border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-400">© {new Date().getFullYear()} Tezda Sotdim</footer>
    </main>
  );
}
