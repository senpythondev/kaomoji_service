"use client";

import { useState } from "react";
import { Mascot } from "./Mascot";
import { CheckIcon, SendIcon } from "./icons";

type Status = "idle" | "sending" | "done" | "error";

export function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const text = message.trim();
    if (!text || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("done");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-white px-6 py-10 text-center shadow-soft">
        <Mascot size={56} />
        <p className="flex items-center gap-1.5 text-lg font-bold text-ink">
          <CheckIcon size={18} className="text-[var(--cat-greeting)]" />
          ありがとうございます！
        </p>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">
          いただいた声は運営者がしっかり読ませていただき、今後の改善に役立てます。
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-sm font-semibold text-primary hover:underline"
        >
          もう一度送る
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-hairline bg-white p-4 shadow-soft sm:p-5"
    >
      <label htmlFor="feedback-message" className="sr-only">
        ご意見・ご要望
      </label>
      <textarea
        id="feedback-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={4}
        placeholder="ここにメッセージを入力してください…（例：もっと「うれしい」の顔文字を増やしてほしい！）"
        className="w-full resize-y rounded-2xl border border-hairline bg-surface-tint px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p
          className={`text-sm ${status === "error" ? "text-[var(--cat-angry)]" : "text-ink-faint"}`}
          role={status === "error" ? "alert" : undefined}
        >
          {status === "error"
            ? "送信できませんでした。時間をおいて再度お試しください。"
            : "お名前や連絡先は不要です。"}
        </p>
        <button
          type="submit"
          disabled={status === "sending" || message.trim().length === 0}
          className="motion-tap inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon size={16} />
          {status === "sending" ? "送信中…" : "送信する"}
        </button>
      </div>
    </form>
  );
}
