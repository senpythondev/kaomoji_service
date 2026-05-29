"use client";

import { useRef, useState } from "react";
import type { Kaomoji } from "@/data/kaomoji";
import { CATEGORIES } from "@/lib/categories";
import { useToast } from "./ToastProvider";
import { CheckIcon, CopyIcon } from "./icons";

async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // fall through to the legacy path below
  }
  // Fallback for insecure contexts / older browsers.
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    /* nothing else we can do */
  }
  document.body.removeChild(ta);
}

export function KaomojiCard({ kaomoji }: { kaomoji: Kaomoji }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const category = CATEGORIES[kaomoji.categories[0]] ?? CATEGORIES.happy;

  async function handleCopy() {
    await copyText(kaomoji.text);
    toast("コピーしました");
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`顔文字 ${kaomoji.text} をコピー`}
      style={{ backgroundColor: category.softVar }}
      className="group relative flex aspect-[5/4] w-full flex-col justify-between rounded-card p-3 text-left ring-1 ring-black/[0.03] shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="flex flex-1 items-center justify-center px-1">
        <span className="kaomoji-glyph text-center text-xl font-medium text-ink sm:text-2xl">
          {kaomoji.text}
        </span>
      </span>
      <span className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
          {category.label}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm transition ${
            copied
              ? "bg-[var(--cat-greeting)] text-white"
              : "bg-white text-ink-soft group-hover:text-primary"
          }`}
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          {copied ? "完了" : "コピー"}
        </span>
      </span>
    </button>
  );
}
