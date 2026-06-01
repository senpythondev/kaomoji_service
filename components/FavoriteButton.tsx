"use client";

import { useState } from "react";
import { type ContentItem, unitNoun } from "@/lib/content";
import { useFavorites } from "./FavoritesProvider";
import { useToast } from "./ToastProvider";
import { HeartFilledIcon, HeartIcon } from "./icons";

/**
 * Small ♡ toggle that saves/removes an item in device-local favorites.
 *
 * Deliberately a SEPARATE control from copy — copy stays the primary action on
 * every card and on the detail hero. Tapping this never triggers a copy (it
 * stops propagation so it can sit on top of the card's copy button).
 *
 * `icon`    — compact heart for card corners.
 * `labeled` — heart + text pill for the detail hero.
 */
export function FavoriteButton({
  item,
  variant = "icon",
  className = "",
}: {
  item: ContentItem;
  variant?: "icon" | "labeled";
  className?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const fav = isFavorite(item.id);
  // Quick pop when toggled ON (not on removal). Reset on animation end so it can
  // replay; inert under reduced motion (the keyframe simply doesn't run).
  const [pop, setPop] = useState(false);

  function handleClick(e: React.MouseEvent) {
    // The card's copy button sits behind this control — don't let the tap fall
    // through to it, and don't follow the detail link if we're inside one.
    e.preventDefault();
    e.stopPropagation();
    const nowFavorite = toggle(item.id);
    if (nowFavorite) setPop(true);
    toast(nowFavorite ? "お気に入りに追加しました" : "お気に入りから削除しました");
  }

  const noun = unitNoun(item.kind);
  const ariaLabel = `${noun} ${item.text} を${fav ? "お気に入りから削除" : "お気に入りに追加"}`;
  const heart = (
    <span
      className={pop ? "motion-pop inline-flex" : "inline-flex"}
      onAnimationEnd={() => setPop(false)}
    >
      {fav ? (
        <HeartFilledIcon size={variant === "labeled" ? 18 : 15} />
      ) : (
        <HeartIcon size={variant === "labeled" ? 18 : 15} />
      )}
    </span>
  );

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={fav}
        aria-label={ariaLabel}
        className={`motion-tap inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          fav
            ? "border-transparent bg-[var(--cat-love-soft)] text-[var(--cat-love)]"
            : "border-hairline bg-white text-ink-soft hover:text-[var(--cat-love)]"
        } ${className}`}
      >
        {heart}
        {fav ? "お気に入り済み" : "お気に入り"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={fav}
      aria-label={ariaLabel}
      className={`motion-tap grid size-7 place-items-center rounded-full bg-white/85 shadow-sm transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${
        fav
          ? "text-[var(--cat-love)] opacity-100"
          : "text-ink-faint opacity-70 hover:text-[var(--cat-love)] group-hover:opacity-100"
      } ${className}`}
    >
      {heart}
    </button>
  );
}
