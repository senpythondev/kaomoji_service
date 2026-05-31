"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  type ContentItem,
  detailHref,
  getCategoryMeta,
  unitNoun,
} from "@/lib/content";
import { copyText } from "@/lib/clipboard";
import { useToast } from "./ToastProvider";
import { CheckIcon, ChevronRightIcon, CopyIcon } from "./icons";

/**
 * Card for a kaomoji OR emoji. Tapping the card copies + toasts; a small corner
 * link opens the item's detail page. Emoji render with the platform color-emoji
 * font (.emoji-glyph); kaomoji use the self-hosted subset (.kaomoji-glyph).
 */
export function KaomojiCard({
  kaomoji,
  categorySlug,
}: {
  kaomoji: ContentItem;
  /** Override the tint/label (e.g. force the current category page's theme). */
  categorySlug?: string;
}) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEmoji = kaomoji.type === "emoji";
  const meta = getCategoryMeta(kaomoji.type, categorySlug ?? kaomoji.categories[0]);
  const softVar = meta?.softVar ?? "var(--color-surface-tint)";
  const label = meta?.label ?? unitNoun(kaomoji.type);

  async function handleCopy() {
    await copyText(kaomoji.text);
    toast("コピーしました");
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${unitNoun(kaomoji.type)} ${kaomoji.text} をコピー`}
        style={{ backgroundColor: softVar }}
        className="flex aspect-[5/4] w-full flex-col justify-between rounded-card p-3 text-left ring-1 ring-black/[0.03] shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="flex flex-1 items-center justify-center px-1">
          <span
            className={
              isEmoji
                ? "emoji-glyph text-center text-4xl sm:text-[2.75rem]"
                : "kaomoji-glyph text-center text-xl font-medium text-ink sm:text-2xl"
            }
          >
            {kaomoji.text}
          </span>
        </span>
        <span className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
            {label}
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

      <Link
        href={detailHref(kaomoji)}
        aria-label={`${kaomoji.text} の詳細をみる`}
        className="absolute right-2 top-2 z-10 grid size-6 place-items-center rounded-full bg-white/85 text-ink-faint opacity-70 shadow-sm transition hover:text-primary hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary group-hover:opacity-100"
      >
        <ChevronRightIcon size={14} />
      </Link>
    </div>
  );
}
