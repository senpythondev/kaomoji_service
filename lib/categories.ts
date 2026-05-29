/**
 * Category metadata for Kaomoji Palette.
 * Slugs and Japanese labels are fixed by the project charter (CLAUDE.md).
 * Each category carries the CSS-variable names that drive its theming
 * (see the `--cat-*` tokens in app/globals.css).
 */

export const CATEGORY_SLUGS = [
  "happy",
  "cute",
  "sad",
  "angry",
  "surprised",
  "love",
  "greeting",
  "apology",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryIconName = CategorySlug;

export interface Category {
  slug: CategorySlug;
  /** Japanese label shown in the UI. */
  label: string;
  /** Short Japanese blurb used on category pages and for SEO. */
  description: string;
  /** CSS variable holding the accent color. */
  accentVar: `var(--cat-${CategorySlug})`;
  /** CSS variable holding the soft tint used for card backgrounds. */
  softVar: `var(--cat-${CategorySlug}-soft)`;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  happy: {
    slug: "happy",
    label: "うれしい",
    description: "うれしい・楽しい気持ちを伝える顔文字。",
    accentVar: "var(--cat-happy)",
    softVar: "var(--cat-happy-soft)",
  },
  cute: {
    slug: "cute",
    label: "かわいい",
    description: "ふんわりかわいい顔文字あつめ。",
    accentVar: "var(--cat-cute)",
    softVar: "var(--cat-cute-soft)",
  },
  sad: {
    slug: "sad",
    label: "悲しい",
    description: "悲しい・泣きたい気持ちの顔文字。",
    accentVar: "var(--cat-sad)",
    softVar: "var(--cat-sad-soft)",
  },
  angry: {
    slug: "angry",
    label: "怒る",
    description: "プンプン怒っているときの顔文字。",
    accentVar: "var(--cat-angry)",
    softVar: "var(--cat-angry-soft)",
  },
  surprised: {
    slug: "surprised",
    label: "驚き",
    description: "びっくり・驚いたときの顔文字。",
    accentVar: "var(--cat-surprised)",
    softVar: "var(--cat-surprised-soft)",
  },
  love: {
    slug: "love",
    label: "愛・好き",
    description: "大好きな気持ちを伝える顔文字。",
    accentVar: "var(--cat-love)",
    softVar: "var(--cat-love-soft)",
  },
  greeting: {
    slug: "greeting",
    label: "挨拶・お礼",
    description: "あいさつやお礼に使える顔文字。",
    accentVar: "var(--cat-greeting)",
    softVar: "var(--cat-greeting-soft)",
  },
  apology: {
    slug: "apology",
    label: "謝る",
    description: "ごめんなさいの気持ちを伝える顔文字。",
    accentVar: "var(--cat-apology)",
    softVar: "var(--cat-apology-soft)",
  },
};

/** Ordered list of all categories (charter order). */
export const CATEGORY_LIST: Category[] = CATEGORY_SLUGS.map(
  (slug) => CATEGORIES[slug],
);

export function getCategory(slug: string): Category | undefined {
  return (CATEGORIES as Record<string, Category>)[slug];
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in CATEGORIES;
}
