import Link from "next/link";
import { getAds, getStats } from "./lib/api";
import ChatWidget from "./components/ChatWidget";
import SiteHeader from "./components/SiteHeader";
import BotCard from "./components/BotCard";

const BOT_URL = "https://t.me/tezdasotdimbot";
const CHANNEL_URL = "https://t.me/tezdasotdim";

export default async function HomePage() {
  const [stats, ads] = await Promise.all([getStats(), getAds(6)]);

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-slate-100 bg-grid">
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3.5 py-2 text-xs font-bold text-brand-700 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/></span>
              Tayyor va tekshirilgan Telegram botlar
            </div>

            <h1 className="mt-7 text-balance text-[42px] font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[72px]">
              Kerakli botni toping.<br />
              <span className="text-gradient">Noldan yasatib o'tirmang.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-slate-600 sm:text-lg">
              Biznes, savdo, ta'lim yoki kontent uchun tayyor Telegram botlarni bir joydan toping. AI talabingizni tushunadi va mos variantlarni soniyalar ichida saralaydi.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="#ai-search" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 sm:w-auto">
                AI bilan bot topish
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/katalog" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 sm:w-auto">Katalogni ko'rish</Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Admin tekshirgan</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> Ro'yxatdan o'tish shart emas</span>
              <span className="inline-flex items-center gap-1.5"><CheckIcon /> To'g'ridan-to'g'ri Telegramda</span>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-[24px] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-6">
            <Stat value={stats ? `${stats.active_ads}` : "24/7"} label="Faol bot" />
            <Stat value={stats ? `${stats.sold_via_channel}+` : "AI"} label="Muvaffaqiyatli savdo" />
            <Stat value="1 min" label="O'rtacha qidiruv" />
          </div>
        </div>
      </section>

      <section id="ai-search" className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
        <div className="absolute inset-0 ai-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">Aqlli qidiruv</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">Nima kerakligini yozing — qolganini AI qilsin.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Texnik nomini bilishingiz shart emas. Vazifani oddiy tilda tushuntiring, AI katalogdagi mos yechimlarni topadi.</p>
          </div>
          <div className="mt-10"><ChatWidget /></div>
        </div>
      </section>

      {ads.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Hozir sotuvda</span>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Tanlangan tayyor botlar</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Katalogdagi yangi va faol yechimlardan namunalar.</p>
              </div>
              <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-brand-600">Barcha botlarni ko'rish <span>→</span></Link>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ads.map((ad) => <BotCard key={ad.id} ad={ad} compact />)}</div>
          </div>
        </section>
      )}

      <section id="how-it-works" className="border-y border-slate-100 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">3 oddiy qadam</span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Bot sotib olish murakkab bo'lmasligi kerak.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Step number="01" title="Talabingizni ayting" text="AI yordamchiga nima uchun bot kerakligini yozing yoki katalogdan mustaqil qidiring." />
            <Step number="02" title="Mos variantni tanlang" text="Vazifasi, narxi va tavsifini solishtirib, sizga mos tayyor yechimni toping." />
            <Step number="03" title="Telegramda bog'laning" text="E'lonni oching va sotuvchi bilan Telegram orqali to'g'ridan-to'g'ri bog'laning." />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] bg-slate-950 px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Tayyor yechimlar</div>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">G'oyadan ishlaydigan botgacha — tezroq.</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">Katalogni ko'ring yoki AI yordamchiga vazifani ayting. Siz uchun eng yaqin tayyor yechimni topamiz.</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:pl-8">
              <Link href="/katalog" className="rounded-2xl bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:bg-slate-100">Katalogga o'tish</Link>
              <Link href={BOT_URL} target="_blank" className="rounded-2xl border border-slate-700 px-6 py-3.5 text-center text-sm font-bold text-white transition hover:border-slate-500 hover:bg-slate-900">Telegramda ochish</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div><span className="font-bold text-slate-900">Tezda Sotdim</span> · © {new Date().getFullYear()}</div>
          <div className="flex gap-5"><Link href="/katalog" className="hover:text-slate-950">Katalog</Link><Link href={CHANNEL_URL} target="_blank" className="hover:text-slate-950">Telegram kanal</Link></div>
        </div>
      </footer>
    </main>
  );
}

function CheckIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.3"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>; }
function Stat({ value, label }: { value: string; label: string }) { return <div className="px-2 text-center"><div className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{value}</div><div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:text-xs">{label}</div></div>; }
function Step({ number, title, text }: { number: string; title: string; text: string }) { return <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:p-7"><div className="text-xs font-black tracking-[0.16em] text-brand-600">{number}</div><h3 className="mt-7 text-lg font-bold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></div>; }
