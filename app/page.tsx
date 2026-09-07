import Link from "next/link";
import { getStats } from "./lib/api";
import ChatWidget from "./components/ChatWidget";

const BOT_URL = "https://t.me/tezdasotdimbot";
const CHANNEL_URL = "https://t.me/tezdasotdim";

export default async function HomePage() {
  const stats = await getStats();

  return (
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
          </div>
        )}
      </section>

      <section className="px-6 pb-20">
        <ChatWidget />
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-black sm:text-3xl">
            Nega Tezda Sotdim?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <Feature
              icon="🤝"
              title="Ishonchli jarayon"
              text="Har bir e'lon admin tomonidan tekshiriladi — soxta yoki ishlamaydigan botlarga joy yo'q."
            />
            <Feature
              icon="🧠"
              title="AI yordamchi"
              text="Ehtiyojingizni tushunib, aynan mos keladigan botlarni tavsiya qiluvchi sun'iy intellekt."
            />
            <Feature
              icon="⚡"
              title="Tezkor natija"
              text="Ro'yxatdan o'tish yoki murakkab jarayonsiz — bir necha soniyada mos variantlarni ko'rasiz."
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Link
            href="/katalog"
            className="inline-block rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-black hover:text-black"
          >
            Barcha e'lonlarni ko'rish →
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-100 py-10 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} Tezda Sotdim ·{" "}
        <Link href={CHANNEL_URL} target="_blank" className="hover:text-black">
          Telegram kanal
        </Link>
      </footer>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{text}</p>
    </div>
  );
}

