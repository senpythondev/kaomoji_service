/**
 * Unified category taxonomy — shared across ALL kinds (kaomoji, emoji, combo).
 * A category page therefore shows kaomoji, emoji and combos together.
 *
 * The 8 emotion categories are the charter's kaomoji categories (unchanged
 * slugs/labels/URLs/SEO). The 5 thematic categories give object-style emoji
 * (and the occasional kaomoji/combo) a natural home. Each carries the CSS
 * variable names that drive its theming (the `--cat-*` tokens in globals.css).
 */

export const CATEGORY_SLUGS = [
  // emotion (kaomoji-first)
  "happy",
  "cute",
  "sad",
  "angry",
  "surprised",
  "love",
  "greeting",
  "apology",
  // thematic (emoji-first, but shared)
  "animal",
  "food",
  "celebration",
  "nature",
  "weather",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryIconName = CategorySlug;

export interface Category {
  slug: CategorySlug;
  /** Japanese label shown in the UI. */
  label: string;
  /** Short Japanese blurb. */
  description: string;
  /** CSS variable holding the accent color. */
  accentVar: `var(--cat-${CategorySlug})`;
  /** CSS variable holding the soft tint used for card backgrounds. */
  softVar: `var(--cat-${CategorySlug}-soft)`;
}

function cat(
  slug: CategorySlug,
  label: string,
  description: string,
): Category {
  return {
    slug,
    label,
    description,
    accentVar: `var(--cat-${slug})`,
    softVar: `var(--cat-${slug}-soft)`,
  };
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  happy: cat("happy", "うれしい", "うれしい・楽しい気持ちを伝える顔文字や絵文字。"),
  cute: cat("cute", "かわいい", "ふんわりかわいい顔文字・絵文字あつめ。"),
  sad: cat("sad", "悲しい", "悲しい・泣きたい気持ちの顔文字や絵文字。"),
  angry: cat("angry", "怒る", "プンプン怒っているときの顔文字や絵文字。"),
  surprised: cat("surprised", "驚き", "びっくり・驚いたときの顔文字や絵文字。"),
  love: cat("love", "愛・好き", "大好きな気持ちを伝える顔文字・絵文字・ハート。"),
  greeting: cat("greeting", "挨拶・お礼", "あいさつやお礼に使える顔文字や絵文字。"),
  apology: cat("apology", "謝る", "ごめんなさいの気持ちを伝える顔文字や絵文字。"),
  animal: cat("animal", "動物", "猫や犬などかわいい動物の絵文字・顔文字。"),
  food: cat("food", "食べ物", "果物・スイーツ・ごはんなど食べ物の絵文字。"),
  celebration: cat("celebration", "お祝い", "誕生日やおめでとうを伝えるお祝いの絵文字。"),
  nature: cat("nature", "自然", "花や植物など自然の絵文字。"),
  weather: cat("weather", "天気", "晴れ・雨・雪など天気の絵文字。"),
};

/** Ordered list of all categories. */
export const CATEGORY_LIST: Category[] = CATEGORY_SLUGS.map(
  (slug) => CATEGORIES[slug],
);

export function getCategory(slug: string): Category | undefined {
  return (CATEGORIES as Record<string, Category>)[slug];
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in CATEGORIES;
}
