"use client";

import { useMemo, useState } from "react";
import type { Kaomoji } from "@/data/kaomoji";
import type { CategorySlug } from "@/lib/categories";
import { KaomojiCard } from "./KaomojiCard";

type SortKey = "popular" | "newest";

/**
 * Category kaomoji grid with client-side sort (人気順 / 新着順, default 人気順).
 * `items` arrive in popularity order, so the server-rendered HTML (the SEO
 * payload) already lists every kaomoji; the pills only reorder on the client.
 */
export function CategoryKaomojiList({
  items,
  categorySlug,
  label,
}: {
  items: Kaomoji[];
  categorySlug: CategorySlug;
  label: string;
}) {
  const [sort, setSort] = useState<SortKey>("popular");

  const sorted = useMemo(() => {
    const next = [...items];
    if (sort === "newest") {
      next.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    } else {
      next.sort((a, b) => b.popularity - a.popularity);
    }
    return next;
  }, [items, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          全<span className="font-bold text-ink">{items.length}</span>件の
          {label}顔文字
        </p>
        <div
          role="group"
          aria-label="並び替え"
          className="inline-flex items-center gap-2"
        >
          <SortPill active={sort === "popular"} onClick={() => setSort("popular")}>
            人気順
          </SortPill>
          <SortPill active={sort === "newest"} onClick={() => setSort("newest")}>
            新着順
          </SortPill>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {sorted.map((k) => (
          <li key={k.id}>
            <KaomojiCard kaomoji={k} categorySlug={categorySlug} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SortPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? "bg-primary text-white shadow-soft"
          : "bg-white text-ink-soft ring-1 ring-hairline hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
