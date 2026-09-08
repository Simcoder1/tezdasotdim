"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "../lib/analytics";

type Result = { id: number; summary: string; channel_url: string };
type Choice = { label: string; query: string };

const GOALS: Choice[] = [
  { label: "Buyurtma qabul qilish", query: "Onlayn buyurtmalarni qabul qiladigan Telegram bot" },
  { label: "Kurs yoki obuna sotish", query: "Kurs va pullik obuna sotadigan Telegram bot" },
  { label: "Mijozlarga tez javob", query: "Mijozlarga avtomatik javob beradigan biznes bot" },
  { label: "Savdo va to‘lov", query: "To‘lov qabul qiladigan savdo Telegram bot" },
];
const QUESTIONS: Choice[][] = [
  [{ label: "Mahsulot sotaman", query: "mahsulot savdosi" }, { label: "Xizmat ko‘rsataman", query: "xizmatlar" }, { label: "Kontent yoki kurs", query: "kurs va premium kontent" }],
  [{ label: "Bugunoq boshlamoqchiman", query: "tez ishga tushadigan" }, { label: "To‘lov bo‘lsin", query: "to‘lov bilan" }, { label: "Oddiy va qulay", query: "sodda boshqaruvli" }],
];
function title(summary: string) {
  const line = summary.replace(/\s+/g, " ").trim().split(/[.!?]/)[0] || "Tayyor Telegram yechimi";
  return line.length > 72 ? `${line.slice(0, 69)}…` : line;
}

export default function ChatWidget() {
  const [screen, setScreen] = useState<"start" | "questions" | "results">("start");
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  useEffect(() => { stageRef.current?.focus(); }, [screen]);

  async function findBots(parts: string[], source: "guided" | "free_text" = "guided") {
    trackEvent("search", { search_source: source, query_length: parts.join(", ").length });
    setLoading(true); setScreen("results");
    try {
      const response = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: parts.join(", ") }) });
      const data = await response.json();
      setIntro(data.intro || "Siz aytgan ehtiyoj uchun tayyor variantlarni ajratdik.");
      setResults(data.results || []);
      trackEvent("recommendations_viewed", { results_count: data.results?.length || 0, search_source: source });
    } catch {
      setIntro("Hozir qidiruvga ulanib bo‘lmadi. Kanalda yangi tayyor botlarni ko‘rishingiz mumkin."); setResults([]);
    } finally { setLoading(false); }
  }
  function chooseGoal(choice: Choice) {
    trackEvent("goal_selected", { goal: choice.label });
    setAnswers([choice.query]); setQuestion(0); setScreen("questions");
  }
  function openSelection() {
    trackEvent("guided_search_started");
    setAnswers(["biznes uchun tayyor Telegram bot"]);
    setQuestion(0);
    setScreen("questions");
  }
  function chooseAnswer(choice: Choice) {
    const next = [...answers, choice.query];
    if (question === QUESTIONS.length - 1) { setAnswers(next); void findBots(next); return; }
    setAnswers(next); setQuestion(question + 1);
  }
  function submit(event: FormEvent) { event.preventDefault(); if (input.trim()) void findBots([input.trim()], "free_text"); }
  function restart() { setInput(""); setAnswers([]); setResults([]); setIntro(""); setQuestion(0); setScreen("start"); }
  function trackTelegram(location: string) { trackEvent("telegram_click", { click_location: location }); }

  return <main className="finder-page">
    <section className="finder-shell" ref={stageRef} tabIndex={-1} aria-label="Tayyor Telegram bot tanlash yordamchisi">
      <header className="finder-topbar">
        <button className="home-link" onClick={restart} aria-label="Bosh sahifaga qaytish">
          <Image className="brand-icon" src="/bot-icon.jpg" width={48} height={48} priority alt="Tezda Sotdim — tayyor Telegram botlar" />
        </button>
        <div className="top-links">
          <Link href="/telegram-bot">Bot turlari</Link>
          <a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer" className="channel-link" onClick={() => trackTelegram("header")}>Telegram kanal <span>↗</span></a>
        </div>
      </header>
      <div className={"finder-stage screen-" + screen}>
        {screen === "start" && <div className="screen start-screen">
          <h1><span className="headline-alert">Noldan Telegram bot yasatmang!</span><em>Tayyorini sotib oling va hoziroq ishga tushuring.</em></h1>
          <p className="lead">Sizga qanday Telegram bot kerakligini qisqacha tushuntiring — sizga mos botlarni taqdim etamiz yoki tugmalardan birini tanlang.</p>
          <div className="goal-grid" aria-label="Maqsadingizni tanlang">{GOALS.map((goal, index) => <button key={goal.label} onClick={() => chooseGoal(goal)}><span>0{index + 1}</span>{goal.label}<b>↗</b></button>)}</div>
          <form className="intent-form" onSubmit={submit}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Masalan: gul do‘konim uchun onlayn savdo boti kerak" aria-label="Nima kerakligini yozing" /><button aria-label="Qidirish" disabled={!input.trim()}>↑</button></form>
        </div>}
        {screen === "questions" && <div className="screen question-screen">
          <p className="eyebrow">MOSLIKNI ANIQLAYMIZ · {question + 1}/2</p><div className="progress"><span style={{ width: `${(question + 1) * 50}%` }} /></div>
          <h2>{question === 0 ? "Biznesingiz ko‘proq qaysi yo‘nalishda?" : "Siz uchun ayniqsa nima muhim?"}</h2>
          <p className="lead">Bu savol faqat mos tayyor yechimni tanlash uchun.</p>
          <div className="answer-list">{QUESTIONS[question].map((choice, index) => <button key={choice.label} onClick={() => chooseAnswer(choice)}><span>0{index + 1}</span>{choice.label}<b>→</b></button>)}</div>
          <button className="quiet-button" onClick={() => void findBots(answers)}>Savollarni o‘tkazib yuborish</button>
        </div>}
        {screen === "results" && <div className="screen results-screen">
          <div className="results-heading"><h2>{loading ? "Siz uchun qidiryapmiz…" : "Sizga mos variantlar"}</h2><button onClick={restart} className="restart">↺ Qayta tanlash</button></div>
          {loading ? <div className="loading-card"><span /><span /><span /></div> : results.length > 0 ? <><p className="result-intro">{intro}</p><div className="result-rail">{results.slice(0, 5).map((result, index) => <article className="bot-card" key={result.id}><div className="match"><span>{96 - index * 3}%</span> MOS</div><h3>{title(result.summary)}</h3><p>{result.summary}</p><div className="card-actions"><button onClick={() => { trackTelegram("result_details"); window.open(result.channel_url, "_blank", "noopener,noreferrer"); }}>Batafsil ko‘rish</button><a href={result.channel_url} target="_blank" rel="noreferrer" onClick={() => trackTelegram("result_listing")}>E’lonni ko‘rish ↗</a></div></article>)}</div></> : <div className="empty-state"><p><strong>Siz so‘ragan botni topa olmadik.</strong>Balki qidiruv adashgandir. Telegram kanalimizda tayyor bot e’lonlarini ko‘ring va o‘zingizga yoqqanini tanlang.</p><a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer" onClick={() => trackTelegram("empty_state")}>Telegram kanalga o‘tish ↗</a></div>}
          {!loading && <p className="channel-note">Yangi tayyor botlar Telegram kanalimizda muntazam e’lon qilib boriladi.</p>}
        </div>}
      </div>
      <nav className="control-dock" aria-label="Asosiy boshqaruv">
        <button className={screen === "start" ? "active" : ""} onClick={restart}><span>⌂</span>Boshlash</button>
        <button className={screen === "questions" ? "active" : ""} onClick={openSelection}><span>✦</span>Tanlash</button>
        <a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer" onClick={() => trackTelegram("dock")}><span>↗</span>Kanal</a>
      </nav>
    </section>
  </main>;
}
