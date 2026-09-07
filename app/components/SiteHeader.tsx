import Link from "next/link";

const BOT_URL = "https://t.me/tezdasotdimbot";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Tezda Sotdim bosh sahifa">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white shadow-sm transition group-hover:-translate-y-0.5">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7.5 8.5h9M7.5 12h6M5.5 4.5h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4.5 3v-3H5.5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
            </svg>
          </span>
          <div>
            <div className="text-sm font-extrabold tracking-[-0.02em] text-slate-950 sm:text-base">Tezda Sotdim</div>
            <div className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">Telegram bot marketplace</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/katalog" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">Katalog</Link>
          <Link href="/#ai-search" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">AI yordamchi</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">Qanday ishlaydi?</Link>
        </nav>

        <Link
          href={BOT_URL}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <span className="hidden sm:inline">Bot topish</span>
          <span className="sm:hidden">Qidirish</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
