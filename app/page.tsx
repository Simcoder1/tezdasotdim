import Link from "next/link";
import { getStats } from "./lib/api";
<<<<<<< HEAD
import ChatWidget from "./components/ChatWidget";
=======
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4

const BOT_URL = "https://t.me/tezdasotdimbot";
const CHANNEL_URL = "https://t.me/tezdasotdim";

export default async function HomePage() {
  const stats = await getStats();

  return (
<<<<<<< HEAD
    <main className="bg-white">
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <span className="inline-block rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-600">
          O'zbekistondagi tayyor Telegram botlar bozori
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Biznesingiz uchun tayyor botni <span className="underline decoration-4 underline-offset-4">bir necha soniyada</span> toping
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
          Pastda nima kerakligini yozing — sun'iy intellekt yordamchimiz sizga aynan mos, tayyor
          Telegram botlarni topib beradi.
        </p>

        {stats && (
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-neutral-500">
            <span>
              <strong className="text-black">{stats.sold_via_channel}+</strong> bot sotilgan
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>
              <strong className="text-black">{stats.active_ads}</strong> faol e'lon
            </span>
=======
    <main>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
          O'zbekistondagi tayyor Telegram botlar bozori
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Tayyor Telegram botingizni <span className="text-brand-600">tezda soting</span>
          <br className="hidden sm:block" /> yoki mos botni <span className="text-brand-600">tezda toping</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Tezda Sotdim — ishlab chiqilgan Telegram botlarni xavfsiz sotish va sotib olish uchun
          markazlashgan platforma. AI yordamida sizga aynan mos botni tez topib beramiz.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={BOT_URL}
            target="_blank"
            className="w-full rounded-xl bg-brand-600 px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 sm:w-auto"
          >
            🤖 Bot qidirish
          </Link>
          <Link
            href="/katalog"
            className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-center text-base font-semibold text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 sm:w-auto"
          >
            📂 Katalogni ko'rish
          </Link>
        </div>

        {stats && (
          <div className="mx-auto mt-14 grid max-w-md grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <div className="text-3xl font-bold text-brand-600">{stats.sold_via_channel}+</div>
              <div className="mt-1 text-sm text-slate-500">bot sotilgan</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600">{stats.active_ads}</div>
              <div className="mt-1 text-sm text-slate-500">faol e'lon</div>
            </div>
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
          </div>
        )}
      </section>

<<<<<<< HEAD
      <section className="px-6 pb-20">
        <ChatWidget />
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-black sm:text-3xl">
=======
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
            Nega Tezda Sotdim?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <Feature
              icon="🤝"
              title="Ishonchli jarayon"
<<<<<<< HEAD
              text="Har bir e'lon admin tomonidan tekshiriladi — soxta yoki ishlamaydigan botlarga joy yo'q."
=======
              text="Har bir e'lon admin tomonidan tekshiriladi, to'lov cheklari tasdiqlanadi — soxta e'lonlarga joy yo'q."
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
            />
            <Feature
              icon="🧠"
              title="AI yordamchi"
<<<<<<< HEAD
              text="Ehtiyojingizni tushunib, aynan mos keladigan botlarni tavsiya qiluvchi sun'iy intellekt."
            />
            <Feature
              icon="⚡"
              title="Tezkor natija"
              text="Ro'yxatdan o'tish yoki murakkab jarayonsiz — bir necha soniyada mos variantlarni ko'rasiz."
=======
              text="Xaridorning ehtiyojini tushunib, aynan mos keladigan botlarni tavsiya qiluvchi sun'iy intellekt."
            />
            <Feature
              icon="⚡"
              title="Tezkor va sodda"
              text="Telegram ichida — hech qanday ro'yxatdan o'tish yoki murakkab jarayonsiz, bir necha daqiqada natija."
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
            />
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Link
            href="/katalog"
            className="inline-block rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-black hover:text-black"
          >
            Barcha e'lonlarni ko'rish →
=======
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Botingizni sotishga tayyormisiz?
          </h2>
          <p className="mt-4 text-slate-600">
            {CHANNEL_URL.replace("https://", "")} kanaliga e'lon joylashtirib, minglab potensial
            xaridorlarga yeting.
          </p>
          <Link
            href={BOT_URL}
            target="_blank"
            className="mt-8 inline-block rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
          >
            /ad — E'lon berish
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
          </Link>
        </div>
      </section>

<<<<<<< HEAD
      <footer className="border-t border-neutral-100 py-10 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Tezda Sotdim ·{" "}
        <Link href={CHANNEL_URL} target="_blank" className="hover:text-black">
=======
      <footer className="border-t border-slate-100 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Tezda Sotdim ·{" "}
        <Link href={CHANNEL_URL} target="_blank" className="hover:text-brand-600">
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
          Telegram kanal
        </Link>
      </footer>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
<<<<<<< HEAD
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{text}</p>
    </div>
  );
}

=======
    <div className="rounded-2xl border border-slate-100 p-6 text-center">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
}
>>>>>>> 170ef2c529b3d20092160db210ab9f7370cc1ac4
