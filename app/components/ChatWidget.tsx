"use client";

import { useState, useRef, useEffect } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  results?: { id: number; summary: string; channel_url: string }[];
};

const SUGGESTIONS = [
  "Menga kino qidiruv boti kerak",
  "Onlayn do'kon uchun buyurtma qabul qiluvchi bot",
  "300 mingdan oshmaydigan talabalar uchun bot",
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Assalomu alaykum! Sizga qanday bot kerakligini yozing — men mos variantlarni topib beraman.",
    },
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

      const introText: string =
        data.intro || (data.results?.length ? "Sizga mos variantlarni topdim:" : "Hozircha mos bot topilmadi.");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: introText, results: data.results || [] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Kechirasiz, texnik nosozlik yuz berdi. Birozdan so'ng qayta urinib ko'ring." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-800 bg-black shadow-2xl">
      <div className="flex items-center gap-3 border-b border-neutral-800 px-5 py-4">
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
        <span className="text-sm font-medium text-neutral-200">Tezda Sotdim yordamchisi</span>
      </div>

      <div ref={scrollRef} className="h-[420px] space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                msg.role === "user"
                  ? "max-w-[80%] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm text-black"
                  : "max-w-[85%] rounded-2xl rounded-bl-sm bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100"
              }
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

              {msg.results && msg.results.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-neutral-700 pt-3">
                  {msg.results.map((r) => (
                    <a
                      key={r.id}
                      href={r.channel_url}
                      target="_blank"
                      className="block rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-200 transition hover:border-white hover:bg-neutral-800"
                    >
                      <p className="line-clamp-2">{r.summary}</p>
                      <span className="mt-1 inline-block text-neutral-400">Kanalda ko'rish →</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-neutral-900 px-4 py-2.5 text-sm text-neutral-400">
              Yozyapti...
            </div>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 border-t border-neutral-800 px-5 py-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-white hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-neutral-800 px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sizga qanday bot kerak?"
          className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition disabled:opacity-30"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}
