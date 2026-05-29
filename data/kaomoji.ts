/**
 * Seed kaomoji dataset (UTF-8).
 *
 * Every entry uses glyphs that render reliably on iOS, Android, and Windows —
 * Greek (ω Σ ε ∀), Cyrillic (Д д), basic punctuation, halfwidth katakana
 * (ﾉ ﾟ), and CJK marks (・ ｡ 人). Box-like or exotic symbols (□ ▱ ◞ ◟ ꒰ ꒱)
 * are deliberately avoided so nothing falls back to a tofu box.
 *
 * Schema is defined by the project charter (CLAUDE.md).
 */
import type { CategorySlug } from "@/lib/categories";

export interface Kaomoji {
  id: string;
  /** The kaomoji itself. */
  text: string;
  categories: CategorySlug[];
  /** Freeform Japanese keywords powering search. */
  tags: string[];
  /** かな/ひらがな yomi for Japanese search. */
  reading: string;
  popularity: number;
  /** ISO date. */
  createdAt: string;
}

export const KAOMOJI: Kaomoji[] = [
  // ── happy ───────────────────────────────────────────────
  {
    id: "happy-niko",
    text: "(*^ω^*)",
    categories: ["happy"],
    tags: ["うれしい", "笑顔", "にこにこ", "喜び"],
    reading: "にこにこ",
    popularity: 98,
    createdAt: "2025-09-12",
  },
  {
    id: "happy-banzai",
    text: "＼(^o^)／",
    categories: ["happy"],
    tags: ["万歳", "ばんざい", "喜び", "やったー"],
    reading: "ばんざい",
    popularity: 95,
    createdAt: "2025-09-20",
  },
  {
    id: "happy-nikkori",
    text: "(´▽`)",
    categories: ["happy"],
    tags: ["ほっと", "笑顔", "にっこり", "安心"],
    reading: "にっこり",
    popularity: 80,
    createdAt: "2026-02-02",
  },
  {
    id: "happy-ooyorokobi",
    text: "(≧▽≦)",
    categories: ["happy"],
    tags: ["大喜び", "笑う", "テンション", "うれしい"],
    reading: "おおよろこび",
    popularity: 90,
    createdAt: "2026-04-18",
  },
  {
    id: "happy-manzoku",
    text: "(*´∀`*)",
    categories: ["happy"],
    tags: ["満足", "うれしい", "ほのぼの"],
    reading: "まんぞく",
    popularity: 76,
    createdAt: "2026-05-22",
  },

  // ── cute ────────────────────────────────────────────────
  {
    id: "cute-neko",
    text: "(=^・ω・^=)",
    categories: ["cute"],
    tags: ["ねこ", "かわいい", "猫", "にゃー"],
    reading: "ねこ",
    popularity: 88,
    createdAt: "2025-10-05",
  },
  {
    id: "cute-koneko",
    text: "(｡･ω･｡)",
    categories: ["cute"],
    tags: ["かわいい", "小さい", "うるうる"],
    reading: "かわいい",
    popularity: 85,
    createdAt: "2026-03-15",
  },
  {
    id: "cute-tere",
    text: "(*´ω`*)",
    categories: ["cute", "happy"],
    tags: ["照れ", "かわいい", "てれ", "ぽっ"],
    reading: "てれ",
    popularity: 82,
    createdAt: "2026-05-10",
  },
  {
    id: "cute-waai",
    text: "ヽ(・ω・)ノ",
    categories: ["cute", "happy"],
    tags: ["わーい", "かわいい", "ばんざい"],
    reading: "わーい",
    popularity: 70,
    createdAt: "2026-01-28",
  },
  {
    id: "cute-wink",
    text: "(・ω<)",
    categories: ["cute"],
    tags: ["ウインク", "かわいい", "てへ"],
    reading: "ういんく",
    popularity: 66,
    createdAt: "2026-05-26",
  },

  // ── sad ─────────────────────────────────────────────────
  {
    id: "sad-naku",
    text: "(T_T)",
    categories: ["sad"],
    tags: ["泣く", "悲しい", "なみだ", "号泣"],
    reading: "なく",
    popularity: 92,
    createdAt: "2025-09-30",
  },
  {
    id: "sad-namida",
    text: "(；_；)",
    categories: ["sad"],
    tags: ["泣く", "涙", "うるうる", "悲しい"],
    reading: "なみだ",
    popularity: 84,
    createdAt: "2026-02-20",
  },
  {
    id: "sad-goukyuu",
    text: "(´；ω；`)",
    categories: ["sad"],
    tags: ["号泣", "悲しい", "ぐすん", "なみだ"],
    reading: "ごうきゅう",
    popularity: 78,
    createdAt: "2026-04-30",
  },
  {
    id: "sad-gakkuri",
    text: "orz",
    categories: ["sad"],
    tags: ["落ち込む", "がっくり", "絶望", "へこむ"],
    reading: "がっくり",
    popularity: 60,
    createdAt: "2025-11-11",
  },
  {
    id: "sad-shonbori",
    text: "(._.)",
    categories: ["sad"],
    tags: ["しょんぼり", "悲しい", "うつむく"],
    reading: "しょんぼり",
    popularity: 55,
    createdAt: "2026-05-18",
  },

  // ── angry ───────────────────────────────────────────────
  {
    id: "angry-okoru",
    text: "(｀Д´)",
    categories: ["angry"],
    tags: ["怒る", "プンプン", "おこ", "むっ"],
    reading: "おこる",
    popularity: 72,
    createdAt: "2025-10-22",
  },
  {
    id: "angry-gekido",
    text: "ヽ(｀Д´)ﾉ",
    categories: ["angry"],
    tags: ["激怒", "怒る", "キレる"],
    reading: "げきど",
    popularity: 68,
    createdAt: "2026-03-03",
  },
  {
    id: "angry-iraira",
    text: "(#｀д´)",
    categories: ["angry"],
    tags: ["イライラ", "怒る", "むかむか"],
    reading: "いらいら",
    popularity: 58,
    createdAt: "2026-05-06",
  },
  {
    id: "angry-punpun",
    text: "(｀ε´)",
    categories: ["angry"],
    tags: ["ぷんぷん", "むくれる", "ぶーぶー"],
    reading: "ぷんぷん",
    popularity: 50,
    createdAt: "2026-04-09",
  },

  // ── surprised ───────────────────────────────────────────
  {
    id: "surprised-bikkuri",
    text: "Σ(ﾟДﾟ)",
    categories: ["surprised"],
    tags: ["驚き", "びっくり", "ガーン", "衝撃"],
    reading: "びっくり",
    popularity: 86,
    createdAt: "2025-12-01",
  },
  {
    id: "surprised-odoroku",
    text: "(°o°)",
    categories: ["surprised"],
    tags: ["驚く", "おどろき", "ぽかん"],
    reading: "おどろく",
    popularity: 64,
    createdAt: "2026-03-27",
  },
  {
    id: "surprised-shougeki",
    text: "Σ(O_O)",
    categories: ["surprised"],
    tags: ["衝撃", "驚き", "えっ"],
    reading: "しょうげき",
    popularity: 62,
    createdAt: "2026-05-24",
  },
  {
    id: "surprised-azen",
    text: "(ﾟдﾟ)",
    categories: ["surprised"],
    tags: ["唖然", "驚き", "ぽかーん"],
    reading: "あぜん",
    popularity: 57,
    createdAt: "2026-04-14",
  },

  // ── love ────────────────────────────────────────────────
  {
    id: "love-suki",
    text: "(´∀`)♡",
    categories: ["love", "happy"],
    tags: ["好き", "愛", "ハート", "らぶ"],
    reading: "すき",
    popularity: 89,
    createdAt: "2025-10-15",
  },
  {
    id: "love-daisuki",
    text: "(*♥ω♥*)",
    categories: ["love"],
    tags: ["大好き", "恋", "ハート目", "メロメロ"],
    reading: "だいすき",
    popularity: 83,
    createdAt: "2026-02-14",
  },
  {
    id: "love-chu",
    text: "(＾３＾)♡",
    categories: ["love"],
    tags: ["キス", "ちゅー", "好き"],
    reading: "ちゅー",
    popularity: 71,
    createdAt: "2026-05-02",
  },
  {
    id: "love-ai",
    text: "ヽ(♡´∀`)ﾉ",
    categories: ["love", "happy"],
    tags: ["愛", "うれしい", "らぶ", "ハート"],
    reading: "あい",
    popularity: 63,
    createdAt: "2026-04-22",
  },

  // ── greeting ────────────────────────────────────────────
  {
    id: "greeting-yaa",
    text: "(・∀・)ノ",
    categories: ["greeting"],
    tags: ["挨拶", "やあ", "おーい", "こんにちは"],
    reading: "やあ",
    popularity: 74,
    createdAt: "2025-11-25",
  },
  {
    id: "greeting-konnichiwa",
    text: "(^_^)/",
    categories: ["greeting"],
    tags: ["こんにちは", "手を振る", "あいさつ", "バイバイ"],
    reading: "こんにちは",
    popularity: 69,
    createdAt: "2026-03-19",
  },
  {
    id: "greeting-ojigi",
    text: "m(_ _)m",
    categories: ["greeting", "apology"],
    tags: ["お礼", "ありがとう", "お辞儀", "よろしく", "ごめん"],
    reading: "おじぎ",
    popularity: 81,
    createdAt: "2026-05-28",
  },

  // ── apology ─────────────────────────────────────────────
  {
    id: "apology-gomen",
    text: "(>_<)",
    categories: ["apology", "sad"],
    tags: ["ごめん", "謝る", "ごめんなさい", "ぴえん"],
    reading: "ごめん",
    popularity: 67,
    createdAt: "2026-01-09",
  },
  {
    id: "apology-hiraayamari",
    text: "ﾍ(_ _ﾍ)",
    categories: ["apology"],
    tags: ["平謝り", "お辞儀", "土下座", "謝る"],
    reading: "ひらあやまり",
    popularity: 48,
    createdAt: "2026-05-15",
  },
];

/** All kaomoji. */
export function getAllKaomoji(): Kaomoji[] {
  return KAOMOJI;
}

/** Most popular first. */
export function getPopularKaomoji(limit?: number): Kaomoji[] {
  const sorted = [...KAOMOJI].sort((a, b) => b.popularity - a.popularity);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** Newest first (by createdAt). */
export function getNewestKaomoji(limit?: number): Kaomoji[] {
  const sorted = [...KAOMOJI].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getKaomojiById(id: string): Kaomoji | undefined {
  return KAOMOJI.find((k) => k.id === id);
}

export function getKaomojiByCategory(category: CategorySlug): Kaomoji[] {
  return getPopularKaomoji().filter((k) => k.categories.includes(category));
}
