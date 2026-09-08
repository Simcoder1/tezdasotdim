"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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

  async function findBots(parts: string[]) {
    setLoading(true); setScreen("results");
    try {
      const response = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: parts.join(", ") }) });
      const data = await response.json();
      setIntro(data.intro || "Siz aytgan ehtiyoj uchun tayyor variantlarni ajratdik.");
      setResults(data.results || []);
    } catch {
      setIntro("Hozir qidiruvga ulanib bo‘lmadi. Kanalda yangi tayyor botlarni ko‘rishingiz mumkin."); setResults([]);
    } finally { setLoading(false); }
  }
  function chooseGoal(choice: Choice) { setAnswers([choice.query]); setQuestion(0); setScreen("questions"); }
  function chooseAnswer(choice: Choice) {
    const next = [...answers, choice.query];
    if (question === QUESTIONS.length - 1) { setAnswers(next); void findBots(next); return; }
    setAnswers(next); setQuestion(question + 1);
  }
  function submit(event: FormEvent) { event.preventDefault(); if (input.trim()) void findBots([input.trim()]); }
  function restart() { setInput(""); setAnswers([]); setResults([]); setIntro(""); setQuestion(0); setScreen("start"); }

  return <main className="finder-page">
    <section className="finder-shell" ref={stageRef} tabIndex={-1} aria-label="Tayyor Telegram bot tanlash yordamchisi">
      <header className="finder-topbar">
        <button className="finder-mark" onClick={restart} aria-label="Bosh sahifaga qaytish"><i /> BOT FINDER</button>
        <a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer" className="channel-link">Telegram kanali <span>↗</span></a>
      </header>
      <div className={"finder-stage screen-" + screen}>
        {screen === "start" && <div className="screen start-screen">
          <p className="eyebrow">BIR NECHA DAQIQA ICHIDA</p>
          <h1>Tayyor Telegram bot.<br /><em>Sizning biznesingizga mos.</em></h1>
          <p className="lead">Nimani yo‘lga qo‘ymoqchi ekaningizni tanlang — aqlli tanlovchi sizga tayyor variantlarni topadi.</p>
          <div className="goal-grid" aria-label="Maqsadingizni tanlang">{GOALS.map((goal, index) => <button key={goal.label} onClick={() => chooseGoal(goal)}><span>0{index + 1}</span>{goal.label}<b>↗</b></button>)}</div>
          <form className="intent-form" onSubmit={submit}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Yoki qisqacha nima kerakligini yozing…" aria-label="Nima kerakligini yozing" /><button aria-label="Qidirish" disabled={!input.trim()}>↑</button></form>
        </div>}
        {screen === "questions" && <div className="screen question-screen">
          <p className="eyebrow">MOSLIKNI ANIQLAYMIZ · {question + 1}/2</p><div className="progress"><span style={{ width: `${(question + 1) * 50}%` }} /></div>
          <h2>{question === 0 ? "Biznesingiz ko‘proq qaysi yo‘nalishda?" : "Siz uchun ayniqsa nima muhim?"}</h2>
          <p className="lead">Bu savol faqat mos tayyor yechimni tanlash uchun.</p>
          <div className="answer-list">{QUESTIONS[question].map((choice, index) => <button key={choice.label} onClick={() => chooseAnswer(choice)}><span>0{index + 1}</span>{choice.label}<b>→</b></button>)}</div>
          <button className="quiet-button" onClick={() => void findBots(answers)}>Savollarni o‘tkazib yuborish</button>
        </div>}
        {screen === "results" && <div className="screen results-screen">
          <div className="results-heading"><div><p className="eyebrow">TAYYOR YECHIMLAR</p><h2>{loading ? "Siz uchun qidiryapmiz…" : "Sizga mos variantlar"}</h2></div><button onClick={restart} className="restart">↺ Qayta tanlash</button></div>
          {loading ? <div className="loading-card"><span /><span /><span /></div> : results.length > 0 ? <><p className="result-intro">{intro}</p><div className="result-rail">{results.slice(0, 5).map((result, index) => <article className="bot-card" key={result.id}><div className="match"><span>{96 - index * 3}%</span> MOS</div><h3>{title(result.summary)}</h3><p>{result.summary}</p><div className="card-actions"><button onClick={() => window.open(result.channel_url, "_blank", "noopener,noreferrer")}>Batafsil ko‘rish</button><a href={result.channel_url} target="_blank" rel="noreferrer">E’lonni ko‘rish ↗</a></div></article>)}</div></> : <div className="empty-state"><p>{intro}</p><a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer">Telegram kanalini ochish ↗</a></div>}
          {!loading && <p className="channel-note">Yangi tayyor botlar Telegram kanalida muntazam e’lon qilinadi.</p>}
        </div>}
      </div>
      <nav className="control-dock" aria-label="Asosiy boshqaruv">
        <button className={screen === "start" ? "active" : ""} onClick={restart}><span>⌂</span>Boshlash</button>
        <button className={screen === "questions" ? "active" : ""} onClick={() => screen !== "start" && setScreen("questions")}><span>✦</span>Tanlash</button>
        <a href="https://t.me/tezdasotdim" target="_blank" rel="noreferrer"><span>↗</span>Kanal</a>
      </nav>
    </section>
  </main>;
}
