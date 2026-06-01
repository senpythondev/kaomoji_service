"use client";

import { useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { useToast } from "./ToastProvider";
import { CheckIcon, CopyIcon } from "./icons";

/** Prominent copy button for the detail hero (copies + fires the global toast). */
export function CopyButton({ text }: { text: string }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [pulse, setPulse] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleCopy() {
    await copyText(text);
    toast("コピーしました", "クリップボードに保存しました");
    setCopied(true);
    setPulse(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="motion-tap inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span
        className={pulse ? "motion-pulse inline-flex" : "inline-flex"}
        onAnimationEnd={() => setPulse(false)}
      >
        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      </span>
      {copied ? "コピーしました" : "コピーする"}
    </button>
  );
}
