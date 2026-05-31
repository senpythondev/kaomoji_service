/**
 * Combo (コンボ) seed dataset (UTF-8). Part of the unified library, the same
 * shape as kaomoji/emoji, distinguished by `kind: "combo"` (added at assembly).
 *
 * Each combo fuses an existing kaomoji with a fitting, well-established emoji
 * into ONE copyable item, e.g. "( ´ ▽ ` )ﾉ 🎉". To keep both rendering systems
 * happy the build splits each combo's text: the kaomoji characters go through
 * the subset-font coverage check, the emoji characters through the approved
 * emoji list. So: reuse only kaomoji glyphs already in the dataset, and only
 * emoji already in scripts/approved-emoji.mjs.
 */
import type { ContentItem } from "@/lib/content";
import type { CategorySlug } from "@/lib/categories";

type ComboSeed = Omit<ContentItem, "kind" | "categories"> & {
  categories: CategorySlug[];
};

const COMBO_SEEDS: ComboSeed[] = [
  // happy
  { id: "combo-01", text: "＼(^o^)／ 🎉", categories: ["happy", "celebration"], tags: ["やったー", "お祝い", "ばんざい"], reading: "ばんざい", popularity: 90, createdAt: "2026-05-30" },
  { id: "combo-02", text: "(≧▽≦) ✨", categories: ["happy"], tags: ["大喜び", "キラキラ", "うれしい"], reading: "おおよろこび", popularity: 85, createdAt: "2026-05-28" },
  { id: "combo-03", text: "(*^ω^*) 😊", categories: ["happy"], tags: ["にこにこ", "笑顔", "うれしい"], reading: "にこにこ", popularity: 82, createdAt: "2026-05-20" },
  { id: "combo-04", text: "ヽ(´▽`)/ 🙌", categories: ["happy"], tags: ["万歳", "やったー", "喜び"], reading: "ばんざい", popularity: 80, createdAt: "2026-04-15" },
  { id: "combo-05", text: "v(^_^)v 🎉", categories: ["happy", "celebration"], tags: ["勝利", "ピース", "やったね"], reading: "ぶい", popularity: 72, createdAt: "2026-02-18" },

  // love
  { id: "combo-06", text: "(´∀`)♡ 💕", categories: ["love"], tags: ["好き", "愛", "ハート"], reading: "すき", popularity: 88, createdAt: "2026-05-25" },
  { id: "combo-07", text: "(*♥ω♥*) 😍", categories: ["love"], tags: ["大好き", "メロメロ", "ときめき"], reading: "だいすき", popularity: 86, createdAt: "2026-05-12" },
  { id: "combo-08", text: "(´ε｀ )♡ 💕", categories: ["love"], tags: ["キス", "ラブラブ", "ちゅー"], reading: "ちゅー", popularity: 78, createdAt: "2026-04-08" },
  { id: "combo-09", text: "ヽ(♡´∀`)ﾉ 💖", categories: ["love"], tags: ["愛", "うれしい", "ハート"], reading: "あい", popularity: 75, createdAt: "2026-03-02" },
  { id: "combo-10", text: "(*ノ////ノ) 💗", categories: ["love"], tags: ["照れ", "ときめき", "恥ずかしい"], reading: "てれ", popularity: 68, createdAt: "2026-01-20" },

  // cute
  { id: "combo-11", text: "(=^・ω・^=) 🐱", categories: ["cute", "animal"], tags: ["ねこ", "猫", "かわいい"], reading: "ねこ", popularity: 84, createdAt: "2026-05-22" },
  { id: "combo-12", text: "(｡･ω･｡) 🌸", categories: ["cute", "nature"], tags: ["かわいい", "花", "春"], reading: "かわいい", popularity: 76, createdAt: "2026-04-30" },
  { id: "combo-13", text: "(´•ω•`) 🐰", categories: ["cute", "animal"], tags: ["うさぎ", "かわいい"], reading: "うさぎ", popularity: 70, createdAt: "2026-03-18" },
  { id: "combo-14", text: "ヽ(・ω・)ノ ✨", categories: ["cute"], tags: ["わーい", "かわいい", "キラキラ"], reading: "わーい", popularity: 66, createdAt: "2026-02-09" },

  // sad
  { id: "combo-15", text: "(T_T) 💧", categories: ["sad"], tags: ["泣く", "涙", "悲しい"], reading: "なく", popularity: 80, createdAt: "2026-05-18" },
  { id: "combo-16", text: "(；_；) 😢", categories: ["sad"], tags: ["泣く", "なみだ", "悲しい"], reading: "なみだ", popularity: 74, createdAt: "2026-04-22" },
  { id: "combo-17", text: "(´；ω；`) 💔", categories: ["sad", "love"], tags: ["号泣", "失恋", "悲しい"], reading: "ごうきゅう", popularity: 68, createdAt: "2026-03-14" },
  { id: "combo-18", text: "(>_<) 😭", categories: ["sad"], tags: ["泣く", "つらい", "悲しい"], reading: "なく", popularity: 64, createdAt: "2026-02-02" },

  // angry
  { id: "combo-19", text: "ヽ(｀Д´)ﾉ 😡", categories: ["angry"], tags: ["激怒", "怒り", "プンプン"], reading: "げきど", popularity: 76, createdAt: "2026-05-16" },
  { id: "combo-20", text: "(｀ε´) 😠", categories: ["angry"], tags: ["ぷんぷん", "怒る", "むくれる"], reading: "ぷんぷん", popularity: 62, createdAt: "2026-03-26" },
  { id: "combo-21", text: "(#｀д´) 🔥", categories: ["angry"], tags: ["イライラ", "怒り", "激怒"], reading: "いらいら", popularity: 60, createdAt: "2026-02-12" },

  // surprised
  { id: "combo-22", text: "Σ(ﾟДﾟ) 😱", categories: ["surprised"], tags: ["びっくり", "驚き", "衝撃"], reading: "びっくり", popularity: 80, createdAt: "2026-05-10" },
  { id: "combo-23", text: "(°o°) ✨", categories: ["surprised"], tags: ["驚く", "おどろき", "目が輝く"], reading: "おどろく", popularity: 64, createdAt: "2026-03-30" },
  { id: "combo-24", text: "Σ(ﾟдﾟ) ⚡", categories: ["surprised"], tags: ["衝撃", "驚き", "ガーン"], reading: "しょうげき", popularity: 58, createdAt: "2026-01-28" },

  // greeting
  { id: "combo-25", text: "(^人^) 🙏", categories: ["greeting"], tags: ["ありがとう", "感謝", "お礼"], reading: "かんしゃ", popularity: 84, createdAt: "2026-05-26" },
  { id: "combo-26", text: "m(_ _)m 🙏", categories: ["greeting", "apology"], tags: ["お辞儀", "ありがとう", "お礼"], reading: "おじぎ", popularity: 82, createdAt: "2026-05-08" },
  { id: "combo-27", text: "(・∀・)ノ 👋", categories: ["greeting"], tags: ["挨拶", "やあ", "手を振る"], reading: "やあ", popularity: 76, createdAt: "2026-04-12" },
  { id: "combo-28", text: "ヽ(´▽`)/ 🎉", categories: ["greeting", "celebration"], tags: ["おめでとう", "お祝い", "やったー"], reading: "おめでとう", popularity: 78, createdAt: "2026-05-14" },
  { id: "combo-29", text: "(￣^￣)ゞ 👍", categories: ["greeting"], tags: ["了解", "よろしく", "いいね"], reading: "りょうかい", popularity: 66, createdAt: "2026-02-22" },

  // apology
  { id: "combo-30", text: "m(._.)m 🙏", categories: ["apology"], tags: ["ごめんなさい", "謝る", "お詫び"], reading: "ごめんなさい", popularity: 78, createdAt: "2026-05-04" },
  { id: "combo-31", text: "_(._.)_ 🙏", categories: ["apology"], tags: ["土下座", "謝る", "平謝り"], reading: "どげざ", popularity: 64, createdAt: "2026-03-20" },
  { id: "combo-32", text: "(´；ω；`) 🙏", categories: ["apology", "sad"], tags: ["ごめんね", "泣く", "謝る"], reading: "ごめんね", popularity: 62, createdAt: "2026-01-15" },

  // animal
  { id: "combo-33", text: "ヽ(=^･ω･^=)ﾉ 🐱", categories: ["animal", "cute"], tags: ["ねこ", "猫", "はしゃぐ"], reading: "ねこ", popularity: 72, createdAt: "2026-05-02" },
  { id: "combo-34", text: "(・ω・) 🐶", categories: ["animal"], tags: ["いぬ", "犬", "わんわん"], reading: "いぬ", popularity: 68, createdAt: "2026-04-18" },
  { id: "combo-35", text: "(・ω・) 🐻", categories: ["animal"], tags: ["くま", "クマ", "動物"], reading: "くま", popularity: 60, createdAt: "2026-03-08" },
  { id: "combo-36", text: "(｡･ω･｡) 🐰", categories: ["animal", "cute"], tags: ["うさぎ", "バニー", "動物"], reading: "うさぎ", popularity: 64, createdAt: "2026-02-14" },

  // food
  { id: "combo-37", text: "(*^ω^*) 🍰", categories: ["food", "happy"], tags: ["ケーキ", "スイーツ", "おやつ"], reading: "けーき", popularity: 66, createdAt: "2026-04-26" },
  { id: "combo-38", text: "(￣▽￣) 🍜", categories: ["food"], tags: ["ラーメン", "麺", "ごはん"], reading: "らーめん", popularity: 62, createdAt: "2026-03-16" },
  { id: "combo-39", text: "(´ω`) ☕", categories: ["food"], tags: ["コーヒー", "カフェ", "ほっと"], reading: "こーひー", popularity: 64, createdAt: "2026-02-26" },
  { id: "combo-40", text: "＼(^o^)／ 🍺", categories: ["food"], tags: ["ビール", "乾杯", "お酒"], reading: "かんぱい", popularity: 60, createdAt: "2026-01-10" },

  // celebration
  { id: "combo-41", text: "＼(^o^)／ 🎂", categories: ["celebration"], tags: ["誕生日", "お祝い", "おめでとう"], reading: "たんじょうび", popularity: 80, createdAt: "2026-05-24" },
  { id: "combo-42", text: "(≧▽≦) 🎁", categories: ["celebration"], tags: ["プレゼント", "お祝い", "うれしい"], reading: "ぷれぜんと", popularity: 70, createdAt: "2026-04-04" },
  { id: "combo-43", text: "ヽ(*≧ω≦)ﾉ 🎊", categories: ["celebration"], tags: ["お祝い", "くす玉", "おめでとう"], reading: "おいわい", popularity: 68, createdAt: "2026-02-28" },
  { id: "combo-44", text: "(*^▽^*) 🏆", categories: ["celebration"], tags: ["優勝", "おめでとう", "受賞"], reading: "ゆうしょう", popularity: 64, createdAt: "2026-01-22" },

  // nature
  { id: "combo-45", text: "(´▽`) 🌸", categories: ["nature"], tags: ["桜", "花", "春"], reading: "さくら", popularity: 70, createdAt: "2026-05-06" },
  { id: "combo-46", text: "(*´ω`*) 🌷", categories: ["nature"], tags: ["花", "チューリップ", "春"], reading: "はな", popularity: 62, createdAt: "2026-03-24" },
  { id: "combo-47", text: "(´ー`) 🍀", categories: ["nature"], tags: ["四つ葉", "幸運", "クローバー"], reading: "よつば", popularity: 58, createdAt: "2026-02-06" },

  // weather
  { id: "combo-48", text: "(＾▽＾) 🌞", categories: ["weather", "happy"], tags: ["晴れ", "太陽", "気分"], reading: "はれ", popularity: 66, createdAt: "2026-04-20" },
  { id: "combo-49", text: "(；´Д｀) 💧", categories: ["weather"], tags: ["雨", "しずく", "天気"], reading: "あめ", popularity: 56, createdAt: "2026-02-16" },
  { id: "combo-50", text: "(*ﾟ▽ﾟ*) 🌈", categories: ["weather", "happy"], tags: ["虹", "晴れ", "うれしい"], reading: "にじ", popularity: 60, createdAt: "2026-01-05" },
];

/** Flat combo list, tagged with kind. */
export const COMBOS: ContentItem[] = COMBO_SEEDS.map((c) => ({
  ...c,
  kind: "combo" as const,
}));
