"use client";

import { useEffect, useRef, useState } from "react";

type SearchResult = { id: number; summary: string; channel_url: string };
type ChatMessage = { role: "user" | "assistant"; text: string; results?: SearchResult[] };

const SUGGESTIONS = [
  "Onlayn do'kon uchun buyurtma boti",
  "Kino qidiruv boti kerak",
  "500 minggacha foydali bot",
  "CRM yoki mijozlar bilan ishlash boti",
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Assalomu alaykum! Nima uchun bot kerakligini oddiy tilda yozing. Men katalogdan eng mos tayyor variantlarni topaman." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      const results = data.results || [];
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.intro || (results.length ? "Sizning so'rovingizga mos variantlarni topdim:" : "Hozircha aynan shu so'rovga mos bot topilmadi. Talabni biroz boshqacha yozib ko'ring."),
          results,
        },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Qidiruv xizmatiga ulanib bo'lmadi. Katalog orqali ham botlarni ko'rishingiz mumkin." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-700 text-white shadow-lg shadow-brand-600/20">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 9h8M8 13h5M6 4.5h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.5l-4.5 3v-3H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"/></svg>
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-950">AI bot topuvchi</div>
            <div className="text-xs text-slate-500">Talabingizni tushunib, katalogdan qidiradi</div>
          </div>
        </div>
        <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 sm:inline">ONLINE</span>
      </div>

      <div ref={scrollRef} className="h-[390px] space-y-5 overflow-y-auto bg-gradient-to-b from-slate-50/70 to-white px-4 py-5 sm:px-6">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={msg.role === "user" ? "max-w-[88%] rounded-2xl rounded-br-md bg-slate-950 px-4 py-3 text-sm text-white shadow-sm sm:max-w-[75%]" : "max-w-[92%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm sm:max-w-[80%]"}>
              <p className="whitespace-pre-wrap leading-6">{msg.text}</p>
              {!!msg.results?.length && (
                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-3">
                  {msg.results.map((r, idx) => (
                    <a key={r.id} href={r.channel_url} target="_blank" className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-200 hover:bg-brand-50/40">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600">Variant {idx + 1}</span>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{r.summary}</p>
                      </div>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-slate-700 shadow-sm transition group-hover:bg-brand-600 group-hover:text-white">→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="typing-dot" /><span className="typing-dot [animation-delay:150ms]" /><span className="typing-dot [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-4 py-3 sm:px-6 scrollbar-hide">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">{s}</button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3 sm:p-4">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Masalan: kurs sotish uchun to'lov qabul qiladigan bot..." className="h-12 min-w-0 flex-1 rounded-2xl bg-slate-100 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-slate-50 focus:ring-2 focus:ring-brand-500/20" />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Yuborish" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:translate-y-0 disabled:opacity-35">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 14-7-4 14-3-5-7-2Z"/><path d="m12 14 7-9"/></svg>
        </button>
      </form>
    </div>
  );
}
