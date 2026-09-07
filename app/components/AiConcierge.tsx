"use client";

import { useMemo, useState } from "react";

const STARTERS = [
  "Savdoni avtomatlashtirish",
  "Mijozlarga javob berish",
  "Kurs sotish",
  "Telegram kanal yuritish",
  "Buyurtma qabul qilish",
];

const FOLLOWUPS = [
  { q: "Bu bot kim uchun ishlaydi?", options: ["Biznesim uchun", "Shaxsiy loyiha", "Mijozlarim uchun"] },
  { q: "Qanchalik tez ishga tushirish kerak?", options: ["Bugun", "1 hafta ichida", "Shoshilinch emas"] },
  { q: "Taxminiy budjet?", options: ["500 minggacha", "500 ming – 2 mln", "2 mln+"] },
];

type SearchResult = { id: number; summary: string; category?: string | null; price?: number | null; channel_url: string };

export default function AiConcierge() {
  const [input, setInput] = useState("");
  const [problem, setProblem] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [intro, setIntro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const step = Math.min(answers.length, FOLLOWUPS.length);
  const query = useMemo(() => [problem, ...answers].filter(Boolean).join(". "), [problem, answers]);

  async function search(finalQuery: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: finalQuery }) });
      const data = await res.json();
      setIntro(data.intro || "Siz uchun eng yaqin tayyor yechimlarni topdim.");
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch {
      setIntro("Qidiruv vaqtincha ishlamadi. Katalogni to'g'ridan-to'g'ri ko'rishingiz mumkin.");
      setResults([]);
    } finally { setLoading(false); }
  }

  function start(value: string) {
    const clean = value.trim();
    if (!clean) return;
    setProblem(clean); setInput(""); setAnswers([]); setResults([]); setIntro(null);
  }

  function answer(value: string) {
    const next = [...answers, value];
    setAnswers(next);
    if (next.length >= FOLLOWUPS.length) search([problem, ...next].join(". "));
  }

  function reset() { setProblem(""); setInput(""); setAnswers([]); setResults([]); setIntro(null); }

  return (
    <div className="concierge-shell">
      <div className="concierge-topline"><span>TEZDA AI</span><span className="live-dot">LIVE</span></div>
      {!problem ? (
        <div className="concierge-start">
          <p className="eyebrow">01 / MUAMMONI AYTing</p>
          <h2>Sizga qaysi bot kerakligini bilishingiz shart emas.</h2>
          <p className="concierge-copy">Nima qilmoqchi ekaningizni oddiy tilda yozing. Biz @tezdasotdim e'lonlari ichidan eng moslarini topamiz.</p>
          <form onSubmit={(e) => { e.preventDefault(); start(input); }} className="problem-form">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} placeholder="Masalan: Instagramdan kelgan mijozlarga avtomatik javob berib, buyurtma yig'adigan bot kerak..." />
            <button disabled={!input.trim()} type="submit">Topib ber <span>↗</span></button>
          </form>
          <div className="starter-row">{STARTERS.map((s) => <button key={s} onClick={() => start(s)}>{s}</button>)}</div>
        </div>
      ) : results.length === 0 && !loading && answers.length < FOLLOWUPS.length ? (
        <div className="concierge-question">
          <button className="mini-back" onClick={reset}>← qayta boshlash</button>
          <div className="problem-quote">“{problem}”</div>
          <p className="eyebrow">0{step + 2} / ANIQLASHTIRAMIZ</p>
          <h3>{FOLLOWUPS[step].q}</h3>
          <div className="choice-grid">{FOLLOWUPS[step].options.map((o) => <button key={o} onClick={() => answer(o)}>{o}<span>→</span></button>)}</div>
          <div className="progress"><span style={{ width: `${((step + 1) / (FOLLOWUPS.length + 1)) * 100}%` }} /></div>
        </div>
      ) : loading ? (
        <div className="concierge-loading"><div className="search-orbit"/><p>@tezdasotdim ichidan mos e'lonlar qidirilmoqda...</p></div>
      ) : (
        <div className="concierge-results">
          <button className="mini-back" onClick={reset}>← yangi qidiruv</button>
          <p className="eyebrow">TOPILDI</p>
          <h3>{intro}</h3>
          {results.length > 0 ? <div className="ai-result-list">{results.slice(0,4).map((r, i) => (
            <a key={r.id} href={r.channel_url} target="_blank" rel="noreferrer" className="ai-result-card">
              <div className="match">{[97,94,91,88][i] || 86}% MOS</div>
              <div><strong>{r.category || "Telegram bot"}</strong><p>{r.summary}</p></div><span className="result-arrow">↗</span>
            </a>
          ))}</div> : <a className="channel-fallback" href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer">@tezdasotdim kanalini ochish ↗</a>}
        </div>
      )}
    </div>
  );
}
