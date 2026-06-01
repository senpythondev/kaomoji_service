"use client";

import { useMemo } from "react";
import Link from "next/link";
import { type ContentItem, getContentById } from "@/lib/content";
import { useFavorites } from "./FavoritesProvider";
import { KaomojiGrid } from "./KaomojiGrid";
import { Mascot } from "./Mascot";
import { HeartFilledIcon } from "./icons";

/**
 * お気に入り page body. Favorites live in localStorage (per-device), so this is
 * read on the CLIENT after mount via the FavoritesProvider. Until `ready`, we
 * render a minimal placeholder to avoid flashing the empty state before storage
 * has been read.
 */
export function FavoritesClient() {
  const { ids, ready } = useFavorites();

  // Map stored ids → items (newest-first). Drop any id that no longer resolves
  // (e.g. an item removed from the dataset) so a stale favorite can't crash.
  const items = useMemo(
    () =>
      ids
        .map((id) => getContentById(id))
        .filter((x): x is ContentItem => x !== undefined),
    [ids],
  );

  return (
    <div className="shell py-6 sm:py-8">
      <header className="flex items-center gap-2.5">
        <span aria-hidden="true" className="text-[var(--cat-love)]">
          <HeartFilledIcon size={26} />
        </span>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">お気に入り</h1>
      </header>
      <p className="mt-2 text-sm text-ink-soft">
        この端末に保存した顔文字・絵文字・コンボの一覧です。ワンクリックでコピーできます。
      </p>

      <div className="mt-6 sm:mt-8">
        {!ready ? (
          <p className="py-16 text-center text-sm text-ink-faint">読み込み中…</p>
        ) : items.length > 0 ? (
          <>
            <p className="mb-4 text-sm font-semibold text-ink-soft">
              {items.length}件のお気に入り
            </p>
            <KaomojiGrid items={items} />
          </>
        ) : (
          <EmptyFavorites />
        )}
      </div>
    </div>
  );
}

function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center rounded-card border border-hairline bg-surface-tint px-6 py-12 text-center">
      <div className="relative">
        <Mascot size={88} className="-rotate-6" />
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-1 text-[var(--cat-love)]"
        >
          <HeartFilledIcon size={22} />
        </span>
      </div>
      <p className="mt-4 text-xl font-extrabold text-ink">お気に入りはまだありません</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
        気になる顔文字や絵文字の ♡ をタップすると、ここに保存されます。
      </p>

      <Link
        href="/#popular"
        className="mt-6 inline-flex items-center gap-1 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        人気の顔文字をみる →
      </Link>
    </div>
  );
}
