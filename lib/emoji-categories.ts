/**
 * Emoji (絵文字) category metadata — a parallel taxonomy to the kaomoji
 * categories. Reuses the existing --cat-* theme tokens so emoji pages feel
 * consistent with kaomoji pages. The category icon is a representative emoji
 * (rendered with the platform color-emoji font), not an SVG.
 */
export const EMOJI_CATEGORY_SLUGS = [
  "face",
  "heart",
  "celebration",
  "animal",
  "food",
  "weather",
  "hand",
  "nature",
] as const;

export type EmojiSlug = (typeof EMOJI_CATEGORY_SLUGS)[number];

export interface EmojiCategory {
  slug: EmojiSlug;
  label: string;
  /** Representative emoji used as the category icon. */
  icon: string;
  description: string;
  /** Unique on-page intro (2–3 sentences, natural Japanese). */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  accentVar: string;
  softVar: string;
  related: EmojiSlug[];
}

export const EMOJI_CATEGORIES: Record<EmojiSlug, EmojiCategory> = {
  face: {
    slug: "face",
    label: "顔・感情",
    icon: "😀",
    description: "うれしい・悲しいなど感情を表す顔の絵文字。",
    intro:
      "うれしい・悲しい・怒りなど、気持ちをそのまま伝えられる顔の絵文字を集めました。LINEやSNSのメッセージに添えるだけで、感情がぐっと伝わります。タップしてそのままコピーできます。",
    metaTitle: "顔・感情の絵文字一覧｜気持ちが伝わる絵文字をコピー",
    metaDescription:
      "うれしい・悲しい・怒りなど、感情を表す顔の絵文字を集めました。LINEやSNSですぐ使える絵文字をワンクリックでコピーできます。",
    accentVar: "var(--cat-happy)",
    softVar: "var(--cat-happy-soft)",
    related: ["heart", "hand", "celebration"],
  },
  heart: {
    slug: "heart",
    label: "ハート",
    icon: "❤️",
    description: "赤やピンクなど色とりどりのハート絵文字。",
    intro:
      "赤やピンク、色とりどりのハート絵文字を集めました。「好き」「ありがとう」の気持ちを伝えたいときにぴったりです。お気に入りのハートをタップしてコピーしてください。",
    metaTitle: "ハートの絵文字一覧｜色とりどりのハートをコピー",
    metaDescription:
      "赤・ピンク・水色など、色とりどりのハート絵文字を集めました。「好き」や「ありがとう」を伝えるハートをワンクリックでコピーできます。",
    accentVar: "var(--cat-love)",
    softVar: "var(--cat-love-soft)",
    related: ["face", "celebration", "nature"],
  },
  celebration: {
    slug: "celebration",
    label: "お祝い",
    icon: "🎉",
    description: "誕生日やおめでとうを伝えるお祝いの絵文字。",
    intro:
      "誕生日やおめでとうを伝えるお祝いの絵文字を集めました。クラッカーやケーキ、プレゼントなど、特別な日のメッセージを華やかに彩ります。タップでコピーできます。",
    metaTitle: "お祝いの絵文字一覧｜おめでとうを伝える絵文字をコピー",
    metaDescription:
      "誕生日・記念日・合格などをお祝いする絵文字を集めました。クラッカーやケーキ、プレゼントなどをワンクリックでコピーできます。",
    accentVar: "var(--cat-cute)",
    softVar: "var(--cat-cute-soft)",
    related: ["heart", "food", "face"],
  },
  animal: {
    slug: "animal",
    label: "動物",
    icon: "🐱",
    description: "猫や犬などかわいい動物の絵文字。",
    intro:
      "猫や犬、うさぎなど人気の動物絵文字を集めました。かわいい動物でメッセージをほっこり和ませたいときにどうぞ。タップするだけでコピーできます。",
    metaTitle: "動物の絵文字一覧｜猫・犬などかわいい動物をコピー",
    metaDescription:
      "猫・犬・うさぎ・くまなど、人気の動物絵文字を集めました。かわいい動物の絵文字をワンクリックでコピーして使えます。",
    accentVar: "var(--cat-greeting)",
    softVar: "var(--cat-greeting-soft)",
    related: ["nature", "food", "face"],
  },
  food: {
    slug: "food",
    label: "食べ物",
    icon: "🍎",
    description: "果物・スイーツ・ごはんなど食べ物の絵文字。",
    intro:
      "果物やスイーツ、ごはんなど食べ物の絵文字を集めました。お店の感想やお腹がすいた気持ち、今日のごはんの報告にぴったりです。タップでコピーできます。",
    metaTitle: "食べ物の絵文字一覧｜果物・スイーツ・ごはんをコピー",
    metaDescription:
      "果物・スイーツ・ごはん・ドリンクなど食べ物の絵文字を集めました。グルメの話題で使える絵文字をワンクリックでコピーできます。",
    accentVar: "var(--cat-angry)",
    softVar: "var(--cat-angry-soft)",
    related: ["celebration", "animal", "nature"],
  },
  weather: {
    slug: "weather",
    label: "天気",
    icon: "☀️",
    description: "晴れ・雨・雪など天気の絵文字。",
    intro:
      "晴れ・雨・雪など天気の絵文字を集めました。今日の天気や気分を伝えるのに便利で、予定やお出かけの連絡にもよく使われます。タップでコピーできます。",
    metaTitle: "天気の絵文字一覧｜晴れ・雨・雪をコピー",
    metaDescription:
      "晴れ・くもり・雨・雪・虹など、天気の絵文字を集めました。今日の天気や予定の連絡で使える絵文字をワンクリックでコピーできます。",
    accentVar: "var(--cat-sad)",
    softVar: "var(--cat-sad-soft)",
    related: ["nature", "face", "celebration"],
  },
  hand: {
    slug: "hand",
    label: "ジェスチャー",
    icon: "👍",
    description: "いいね・OK・拍手など手のジェスチャー絵文字。",
    intro:
      "いいね・OK・拍手など、手のジェスチャーの絵文字を集めました。あいづちやお願い、感謝の気持ちをさっと伝えられます。タップするだけでコピーできます。",
    metaTitle: "ジェスチャーの絵文字一覧｜いいね・OK・拍手をコピー",
    metaDescription:
      "いいね・OK・拍手・お願いなど、手のジェスチャーの絵文字を集めました。返事やあいづちに使える絵文字をワンクリックでコピーできます。",
    accentVar: "var(--cat-apology)",
    softVar: "var(--cat-apology-soft)",
    related: ["face", "heart", "celebration"],
  },
  nature: {
    slug: "nature",
    label: "自然",
    icon: "🌸",
    description: "花や葉っぱなど自然の絵文字。",
    intro:
      "桜や花、葉っぱなど自然の絵文字を集めました。季節のあいさつや、おだやかな雰囲気を出したいときにぴったりです。タップでコピーできます。",
    metaTitle: "自然の絵文字一覧｜花・植物・季節をコピー",
    metaDescription:
      "桜・バラ・四つ葉・紅葉など自然や植物の絵文字を集めました。季節のあいさつに使える絵文字をワンクリックでコピーできます。",
    accentVar: "var(--cat-surprised)",
    softVar: "var(--cat-surprised-soft)",
    related: ["animal", "weather", "heart"],
  },
};

export const EMOJI_CATEGORY_LIST: EmojiCategory[] = EMOJI_CATEGORY_SLUGS.map(
  (slug) => EMOJI_CATEGORIES[slug],
);

export function getEmojiCategory(slug: string): EmojiCategory | undefined {
  return (EMOJI_CATEGORIES as Record<string, EmojiCategory>)[slug];
}
