"use client";

import { useState } from "react";

const STARTERS = [
  "Savdo uchun bot kerak",
  "Mijozlarga javob berish",
  "Buyurtma qabul qilish",
  "Kurs yoki obuna sotish",
  "Telegram kanal uchun bot",
];

const FOLLOWUPS = [
  { q: "Bot asosan nima uchun kerak?", options: ["Savdo va buyurtma", "Mijozlar bilan ishlash", "Kontent yoki xizmat"] },
  { q: "Qachon ishga tushirmoqchisiz?", options: ["Imkon qadar tez", "1 hafta ichida", "Hozircha ko'rib chiqyapman"] },
  { q: "Taxminiy budjetingiz?", options: ["500 minggacha", "500 ming – 2 mln", "2 mln+"] },
];

type SearchResult = {
  id: number;
  summary: string;
  category?: string | null;
  price?: number | null;
  channel_url: string;
};

function formatPrice(price?: number | null) {
  return price ? `${new Intl.NumberFormat("uz-UZ").format(price)} so'm` : "Narxi kelishiladi";
}

export default function AiConcierge() {
  const [input, setInput] = useState("");
  const [problem, setProblem] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [intro, setIntro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const step = Math.min(answers.length, FOLLOWUPS.length);
  async function search(finalQuery: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery }),
      });
      const data = await res.json();
      setIntro(data.intro || "Sizga mos tayyor botlarni topdim.");
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch {
      setIntro("Hozir avtomatik qidiruv ishlamadi. Katalog yoki Telegram kanal orqali davom etishingiz mumkin.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function start(value: string) {
    const clean = value.trim();
    if (!clean) return;
    setProblem(clean);
    setInput("");
    setAnswers([]);
    setResults([]);
    setIntro(null);
  }

  function answer(value: string) {
    const next = [...answers, value];
    setAnswers(next);
    if (next.length >= FOLLOWUPS.length) search([problem, ...next].join(". "));
  }

  function reset() {
    setProblem("");
    setInput("");
    setAnswers([]);
    setResults([]);
    setIntro(null);
  }

  return (
    <div className="concierge-shell">
      <div className="concierge-topline">
        <span>TEZDA AI</span>
        <span className="live-dot">MOS BOTNI QIDIRADI</span>
      </div>

      {!problem ? (
        <div className="concierge-start">
          <p className="eyebrow">MUAMMOINGIZNI YOZING</p>
          <h2>Sizga qaysi bot kerakligini oldindan bilishingiz shart emas.</h2>
          <p className="concierge-copy">
            Biznesingizda nima qilmoqchi ekaningizni oddiy tilda yozing. Biz TezdaSotdim e'lonlari ichidan mos variantlarni ajratamiz.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); start(input); }} className="problem-form">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="Masalan: mijozlardan buyurtma qabul qilib, ularga avtomatik javob beradigan Telegram bot kerak..."
            />
            <button disabled={!input.trim()} type="submit">Mos botlarni topish <span>→</span></button>
          </form>
          <div className="starter-row" aria-label="Tezkor tanlovlar">
            {STARTERS.map((s) => <button type="button" key={s} onClick={() => start(s)}>{s}</button>)}
          </div>
        </div>
      ) : results.length === 0 && !loading && answers.length < FOLLOWUPS.length ? (
        <div className="concierge-question">
          <button className="mini-back" onClick={reset}>← qayta boshlash</button>
          <div className="problem-quote">“{problem}”</div>
          <p className="eyebrow">ANIQLASHTIRAMIZ · {step + 1}/{FOLLOWUPS.length}</p>
          <h3>{FOLLOWUPS[step].q}</h3>
          <div className="choice-grid">
            {FOLLOWUPS[step].options.map((o) => <button type="button" key={o} onClick={() => answer(o)}>{o}<span>→</span></button>)}
          </div>
          <div className="progress"><span style={{ width: `${((step + 1) / FOLLOWUPS.length) * 100}%` }} /></div>
        </div>
      ) : loading ? (
        <div className="concierge-loading">
          <div className="search-orbit" />
          <p>TezdaSotdim e'lonlari ichidan mos botlar qidirilmoqda...</p>
        </div>
      ) : (
        <div className="concierge-results">
          <button className="mini-back" onClick={reset}>← yangi qidiruv</button>
          <p className="eyebrow">MOS VARIANTLAR</p>
          <h3>{intro}</h3>

          {results.length > 0 ? (
            <div className="ai-result-list">
              {results.slice(0, 4).map((r, i) => (
                <article key={r.id} className="ai-result-card">
                  <div className="result-rank">0{i + 1}</div>
                  <div className="result-main">
                    <strong>{r.category || "Telegram bot"}</strong>
                    <p>{r.summary}</p>
                    <small>{formatPrice(r.price)}</small>
                  </div>
                  <a href={r.channel_url} target="_blank" rel="noreferrer">E'lonni ko'rish <span>↗</span></a>
                </article>
              ))}
            </div>
          ) : (
            <div className="result-empty">
              <p>Aynan mos natija topilmadi. Barcha e'lonlarni ko'rishingiz yoki kanalga o'tishingiz mumkin.</p>
              <div>
                <a href="/katalog">Katalogni ko'rish</a>
                <a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer">Telegram kanal ↗</a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
