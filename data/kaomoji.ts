/**
 * Seed kaomoji dataset (UTF-8).
 *
 * RENDER-SAFETY: every entry uses only glyphs that display correctly on iOS,
 * Android, and Windows — basic ASCII, Latin-1 marks (´ ° · ¬ º), common CJK
 * punctuation, hiragana/katakana (incl. halfwidth ﾟ ﾉ ヽ), Greek (ω ε Σ ∀),
 * Cyrillic (Д д з), safe math/geometry (∩ ∠ ≧ ≦ ● ○ ◎ ▽ △ • ☆ ★ ♪ ♡ ♥),
 * and a few safe kanji used as features (人 益 皿). Box-like / exotic symbols
 * (the literal □ tofu square, ◇ ◕ ‿ combining diacritics, and non-CJK scripts)
 * are deliberately avoided so nothing falls back to a tofu box. A scan enforces
 * this allowlist over every `text`.
 *
 * Tags are honest, intent-level search words (emotion / scene / synonym) — not
 * padded with generic terms. `reading` is the kana yomi powering Japanese search.
 *
 * Schema is defined by the project charter (CLAUDE.md). Authored per-category for
 * readability; `KAOMOJI` is the flat list the rest of the app consumes.
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

// ── happy / うれしい ────────────────────────────────────────
const HAPPY: Kaomoji[] = [
  { id: "happy-niko", text: "(*^ω^*)", categories: ["happy"], tags: ["うれしい", "笑顔", "にこにこ", "喜び"], reading: "にこにこ", popularity: 98, createdAt: "2025-09-12" },
  { id: "happy-banzai", text: "＼(^o^)／", categories: ["happy"], tags: ["万歳", "ばんざい", "喜び", "やったー"], reading: "ばんざい", popularity: 95, createdAt: "2025-09-20" },
  { id: "happy-nikkori", text: "(´▽`)", categories: ["happy"], tags: ["ほっと", "笑顔", "にっこり", "安心"], reading: "にっこり", popularity: 80, createdAt: "2026-02-02" },
  { id: "happy-ooyorokobi", text: "(≧▽≦)", categories: ["happy"], tags: ["大喜び", "笑う", "テンション", "うれしい"], reading: "おおよろこび", popularity: 90, createdAt: "2026-04-18" },
  { id: "happy-manzoku", text: "(*´∀`*)", categories: ["happy"], tags: ["満足", "うれしい", "ほのぼの"], reading: "まんぞく", popularity: 76, createdAt: "2026-05-22" },
  { id: "happy-06", text: "(^○^)", categories: ["happy"], tags: ["笑顔", "にこにこ", "うれしい"], reading: "にこにこ", popularity: 70, createdAt: "2025-07-03" },
  { id: "happy-07", text: "(・∀・)", categories: ["happy"], tags: ["笑顔", "楽しい", "うれしい"], reading: "たのしい", popularity: 74, createdAt: "2025-08-11" },
  { id: "happy-08", text: "ヽ(´▽`)/", categories: ["happy"], tags: ["喜び", "やったー", "万歳", "うれしい"], reading: "やったー", popularity: 79, createdAt: "2025-10-09" },
  { id: "happy-09", text: "(＾▽＾)", categories: ["happy"], tags: ["笑顔", "えがお", "ハッピー"], reading: "えがお", popularity: 72, createdAt: "2025-11-02" },
  { id: "happy-10", text: "o(^▽^)o", categories: ["happy"], tags: ["わくわく", "うれしい", "楽しい"], reading: "わくわく", popularity: 68, createdAt: "2025-12-15" },
  { id: "happy-11", text: "(∩´∀`)∩", categories: ["happy"], tags: ["喜び", "やったー", "万歳", "わーい"], reading: "わーい", popularity: 77, createdAt: "2026-01-19" },
  { id: "happy-12", text: "＼(≧▽≦)／", categories: ["happy"], tags: ["大喜び", "やったー", "テンション", "万歳"], reading: "おおはしゃぎ", popularity: 84, createdAt: "2026-03-08" },
  { id: "happy-13", text: "(*^▽^*)", categories: ["happy"], tags: ["笑顔", "にこにこ", "うれしい"], reading: "にこにこ", popularity: 66, createdAt: "2026-04-02" },
  { id: "happy-14", text: "v(^_^)v", categories: ["happy"], tags: ["ピース", "勝利", "やったね", "喜び"], reading: "ぶいさいん", popularity: 73, createdAt: "2025-07-21" },
  { id: "happy-15", text: "(b^_^)b", categories: ["happy"], tags: ["いいね", "グッド", "喜び"], reading: "ぐっど", popularity: 60, createdAt: "2025-08-30" },
  { id: "happy-16", text: "(≧▽≦)/", categories: ["happy"], tags: ["大喜び", "やったー", "万歳"], reading: "おおよろこび", popularity: 71, createdAt: "2025-10-25" },
  { id: "happy-17", text: "(☆▽☆)", categories: ["happy"], tags: ["キラキラ", "目が輝く", "わくわく", "期待"], reading: "きらきら", popularity: 75, createdAt: "2025-11-28" },
  { id: "happy-18", text: "(*ﾟ▽ﾟ*)", categories: ["happy"], tags: ["わくわく", "うれしい", "楽しい"], reading: "わくわく", popularity: 67, createdAt: "2026-01-05" },
  { id: "happy-19", text: "♪(´▽`)", categories: ["happy"], tags: ["るんるん", "ごきげん", "楽しい", "音楽"], reading: "るんるん", popularity: 69, createdAt: "2026-02-22" },
  { id: "happy-20", text: "ヽ(^。^)ノ", categories: ["happy"], tags: ["万歳", "喜び", "やったー"], reading: "ばんざい", popularity: 64, createdAt: "2026-03-26" },
  { id: "happy-21", text: "(^皿^)", categories: ["happy"], tags: ["にやり", "にやにや", "笑い"], reading: "にやり", popularity: 58, createdAt: "2026-04-12" },
  { id: "happy-22", text: "(´ー`)", categories: ["happy"], tags: ["まったり", "満足", "ほっと"], reading: "まったり", popularity: 62, createdAt: "2025-06-18" },
  { id: "happy-23", text: "(ﾟ∀ﾟ)", categories: ["happy"], tags: ["笑顔", "楽しい", "うれしい"], reading: "たのしい", popularity: 65, createdAt: "2025-09-05" },
  { id: "happy-24", text: "(*≧∀≦*)", categories: ["happy"], tags: ["大喜び", "うれしい", "テンション"], reading: "おおよろこび", popularity: 70, createdAt: "2025-12-01" },
  { id: "happy-25", text: "d(^_^)b", categories: ["happy"], tags: ["ごきげん", "ノリノリ", "音楽"], reading: "ごきげん", popularity: 55, createdAt: "2026-02-10" },
  { id: "happy-26", text: "(^-^)", categories: ["happy"], tags: ["にっこり", "笑顔", "うれしい"], reading: "にっこり", popularity: 78, createdAt: "2026-03-15" },
  { id: "happy-27", text: "(*^o^*)", categories: ["happy"], tags: ["にこにこ", "笑顔", "元気"], reading: "にこにこ", popularity: 72, createdAt: "2026-04-25" },
  { id: "happy-28", text: "ヽ(*≧ω≦)ﾉ", categories: ["happy"], tags: ["大喜び", "やったー", "テンション", "はしゃぐ"], reading: "おおはしゃぎ", popularity: 74, createdAt: "2026-05-08" },
  { id: "happy-29", text: "(´∀`*)", categories: ["happy"], tags: ["ほのぼの", "うれしい", "笑顔"], reading: "ほのぼの", popularity: 63, createdAt: "2025-07-29" },
  { id: "happy-30", text: "(((o(*ﾟ▽ﾟ*)o)))", categories: ["happy"], tags: ["わくわく", "ドキドキ", "楽しみ", "期待"], reading: "わくわく", popularity: 81, createdAt: "2026-05-19" },
  { id: "happy-31", text: "☆*:.｡o(≧▽≦)o｡.:*☆", categories: ["happy"], tags: ["おめでとう", "お祝い", "祝福", "キラキラ", "合格", "誕生日"], reading: "おめでとう", popularity: 86, createdAt: "2026-05-26" },
  { id: "happy-32", text: "＼(*^▽^*)／", categories: ["happy"], tags: ["おめでとう", "お祝い", "祝福", "やったね"], reading: "おめでとう", popularity: 82, createdAt: "2026-05-12" },
  { id: "happy-33", text: "(*´▽`*)", categories: ["happy"], tags: ["おめでとう", "お祝い", "祝福", "うれしい"], reading: "おめでとう", popularity: 79, createdAt: "2026-04-30" },
  { id: "happy-34", text: "｡ﾟ(´∀`)ﾟ｡", categories: ["happy"], tags: ["うれし泣き", "感動", "喜び"], reading: "うれしなき", popularity: 61, createdAt: "2026-01-27" },
  { id: "happy-35", text: "(^J^)", categories: ["happy"], tags: ["にこ", "笑顔", "おどけ"], reading: "にこ", popularity: 52, createdAt: "2025-08-19" },
];

// ── cute / かわいい ─────────────────────────────────────────
const CUTE: Kaomoji[] = [
  { id: "cute-neko", text: "(=^・ω・^=)", categories: ["cute"], tags: ["ねこ", "かわいい", "猫", "にゃー"], reading: "ねこ", popularity: 88, createdAt: "2025-10-05" },
  { id: "cute-koneko", text: "(｡･ω･｡)", categories: ["cute"], tags: ["かわいい", "小さい", "うるうる"], reading: "かわいい", popularity: 85, createdAt: "2026-03-15" },
  { id: "cute-tere", text: "(*´ω`*)", categories: ["cute", "happy"], tags: ["照れ", "かわいい", "てれ", "ぽっ"], reading: "てれ", popularity: 82, createdAt: "2026-05-10" },
  { id: "cute-waai", text: "ヽ(・ω・)ノ", categories: ["cute", "happy"], tags: ["わーい", "かわいい", "ばんざい"], reading: "わーい", popularity: 70, createdAt: "2026-01-28" },
  { id: "cute-wink", text: "(・ω<)", categories: ["cute"], tags: ["ウインク", "かわいい", "てへ"], reading: "ういんく", popularity: 66, createdAt: "2026-05-26" },
  { id: "cute-06", text: "(´･ω･`)", categories: ["cute"], tags: ["かわいい", "うるうる", "ほのぼの"], reading: "うるうる", popularity: 77, createdAt: "2025-07-12" },
  { id: "cute-07", text: "(=｀ω´=)", categories: ["cute"], tags: ["ねこ", "猫", "かわいい"], reading: "ねこ", popularity: 64, createdAt: "2025-08-22" },
  { id: "cute-08", text: "(●ω●)", categories: ["cute"], tags: ["かわいい", "まんまる", "どうぶつ"], reading: "まんまる", popularity: 60, createdAt: "2025-10-14" },
  { id: "cute-09", text: "(*≧ω≦*)", categories: ["cute"], tags: ["かわいい", "うれしい", "照れ"], reading: "かわいい", popularity: 73, createdAt: "2025-11-19" },
  { id: "cute-10", text: "(´ω`*)", categories: ["cute"], tags: ["ほのぼの", "かわいい", "まったり"], reading: "ほのぼの", popularity: 62, createdAt: "2025-12-22" },
  { id: "cute-11", text: "ヽ(=^･ω･^=)ﾉ", categories: ["cute"], tags: ["ねこ", "猫", "かわいい", "はしゃぐ"], reading: "ねこ", popularity: 68, createdAt: "2026-01-15" },
  { id: "cute-12", text: "ʕ•ω•ʔ", categories: ["cute"], tags: ["くま", "かわいい", "動物", "クマ"], reading: "くま", popularity: 80, createdAt: "2026-02-27" },
  { id: "cute-13", text: "ʕ´•ω•`ʔ", categories: ["cute"], tags: ["くま", "かわいい", "ほのぼの"], reading: "くま", popularity: 67, createdAt: "2026-03-30" },
  { id: "cute-14", text: "(｡♥ω♥｡)", categories: ["cute", "love"], tags: ["かわいい", "ときめき", "大好き"], reading: "ときめき", popularity: 75, createdAt: "2026-04-20" },
  { id: "cute-15", text: "(´｡• ω •｡`)", categories: ["cute"], tags: ["かわいい", "うるうる", "ほのぼの"], reading: "うるうる", popularity: 71, createdAt: "2026-05-03" },
  { id: "cute-16", text: "(・×・)", categories: ["cute"], tags: ["かわいい", "どうぶつ", "てへ"], reading: "てへ", popularity: 54, createdAt: "2025-06-25" },
  { id: "cute-17", text: "(○•ω•○)", categories: ["cute"], tags: ["かわいい", "にこにこ", "ほのぼの"], reading: "にこにこ", popularity: 63, createdAt: "2025-09-08" },
  { id: "cute-18", text: "(-ω-)", categories: ["cute"], tags: ["すやすや", "ねむい", "かわいい"], reading: "すやすや", popularity: 58, createdAt: "2025-11-11" },
  { id: "cute-19", text: "(´-ω-`)", categories: ["cute"], tags: ["ねむい", "すやすや", "まったり"], reading: "ねむい", popularity: 56, createdAt: "2026-01-03" },
  { id: "cute-20", text: "ヽ(•ω•)/", categories: ["cute", "happy"], tags: ["かわいい", "ばんざい", "うれしい"], reading: "ばんざい", popularity: 65, createdAt: "2026-02-17" },
  { id: "cute-21", text: "(·ω·)つ", categories: ["cute"], tags: ["どうぞ", "さしだす", "かわいい"], reading: "どうぞ", popularity: 57, createdAt: "2026-03-21" },
  { id: "cute-22", text: "(＾・ω・＾)", categories: ["cute"], tags: ["ねこ", "猫", "かわいい"], reading: "ねこ", popularity: 61, createdAt: "2026-04-09" },
  { id: "cute-23", text: "(ﾟωﾟ)", categories: ["cute"], tags: ["きょとん", "かわいい", "まるめ"], reading: "きょとん", popularity: 59, createdAt: "2026-05-15" },
  { id: "cute-24", text: "(｀・ω・´)", categories: ["cute"], tags: ["きりっ", "かわいい", "がんばる", "ドヤ"], reading: "きりっ", popularity: 72, createdAt: "2025-07-26" },
  { id: "cute-25", text: "(´•ω•`)♡", categories: ["cute", "love"], tags: ["かわいい", "すき", "ほのぼの"], reading: "すき", popularity: 69, createdAt: "2025-10-30" },
  { id: "cute-26", text: "( ´ ▽ ` )ﾉ", categories: ["cute", "greeting"], tags: ["やあ", "かわいい", "挨拶", "元気"], reading: "やあ", popularity: 66, createdAt: "2025-12-09" },
  { id: "cute-27", text: "(=^.^=)", categories: ["cute"], tags: ["ねこ", "猫", "にっこり", "かわいい"], reading: "ねこ", popularity: 64, createdAt: "2026-02-05" },
  { id: "cute-28", text: "(・ω・)b", categories: ["cute"], tags: ["いいね", "かわいい", "グッド"], reading: "いいね", popularity: 53, createdAt: "2026-03-12" },
  { id: "cute-29", text: "(*･ω･*)", categories: ["cute"], tags: ["かわいい", "うるうる", "おねがい"], reading: "うるうる", popularity: 60, createdAt: "2026-04-16" },
  { id: "cute-30", text: "ʕ-ω-ʔ", categories: ["cute"], tags: ["くま", "かわいい", "動物", "ねむい"], reading: "くま", popularity: 50, createdAt: "2025-08-07" },
  { id: "cute-31", text: "(=ﾟωﾟ=)", categories: ["cute"], tags: ["ねこ", "猫", "きょとん", "かわいい"], reading: "ねこ", popularity: 55, createdAt: "2026-05-20" },
  { id: "cute-32", text: "(uωu)", categories: ["cute"], tags: ["すやすや", "ねむい", "しあわせ"], reading: "すやすや", popularity: 51, createdAt: "2026-01-22" },
  { id: "cute-33", text: "(*ﾟoﾟ)", categories: ["cute"], tags: ["きょとん", "かわいい", "ぽかん"], reading: "きょとん", popularity: 49, createdAt: "2025-09-27" },
];

// ── sad / 悲しい ────────────────────────────────────────────
const SAD: Kaomoji[] = [
  { id: "sad-naku", text: "(T_T)", categories: ["sad"], tags: ["泣く", "悲しい", "なみだ", "号泣"], reading: "なく", popularity: 92, createdAt: "2025-09-30" },
  { id: "sad-namida", text: "(；_；)", categories: ["sad"], tags: ["泣く", "涙", "うるうる", "悲しい"], reading: "なみだ", popularity: 84, createdAt: "2026-02-20" },
  { id: "sad-goukyuu", text: "(´；ω；`)", categories: ["sad"], tags: ["号泣", "悲しい", "ぐすん", "なみだ"], reading: "ごうきゅう", popularity: 78, createdAt: "2026-04-30" },
  { id: "sad-gakkuri", text: "orz", categories: ["sad"], tags: ["落ち込む", "がっくり", "絶望", "へこむ"], reading: "がっくり", popularity: 60, createdAt: "2025-11-11" },
  { id: "sad-shonbori", text: "(._.)", categories: ["sad"], tags: ["しょんぼり", "悲しい", "うつむく"], reading: "しょんぼり", popularity: 55, createdAt: "2026-05-18" },
  { id: "sad-06", text: "(ノД`)", categories: ["sad"], tags: ["号泣", "泣く", "悲しい", "わーん"], reading: "ごうきゅう", popularity: 73, createdAt: "2025-07-08" },
  { id: "sad-07", text: "(つд`)", categories: ["sad"], tags: ["泣く", "ぐすん", "悲しい"], reading: "ぐすん", popularity: 50, createdAt: "2025-08-16" },
  { id: "sad-08", text: "(；▽；)", categories: ["sad"], tags: ["号泣", "感動", "泣く", "うるうる"], reading: "なく", popularity: 68, createdAt: "2025-10-19" },
  { id: "sad-09", text: "(´；д；`)", categories: ["sad"], tags: ["号泣", "悲しい", "つらい"], reading: "つらい", popularity: 62, createdAt: "2025-12-05" },
  { id: "sad-10", text: "(´·_·`)", categories: ["sad"], tags: ["しょんぼり", "落ち込む", "切ない"], reading: "しょんぼり", popularity: 58, createdAt: "2026-01-12" },
  { id: "sad-11", text: "(；ω；)", categories: ["sad"], tags: ["泣く", "うるうる", "悲しい", "ぴえん"], reading: "うるうる", popularity: 75, createdAt: "2026-02-28" },
  { id: "sad-12", text: "(T▽T)", categories: ["sad"], tags: ["号泣", "泣く", "悲しい"], reading: "ごうきゅう", popularity: 64, createdAt: "2026-03-22" },
  { id: "sad-13", text: "ヽ(´Д`;)ﾉ", categories: ["sad"], tags: ["あたふた", "うろたえる", "こまる"], reading: "あたふた", popularity: 52, createdAt: "2026-04-11" },
  { id: "sad-14", text: "(´ノω`｡)", categories: ["sad"], tags: ["よしよし", "なぐさめ", "泣く"], reading: "よしよし", popularity: 57, createdAt: "2026-05-04" },
  { id: "sad-15", text: "(；´Д｀)", categories: ["sad"], tags: ["疲れた", "ため息", "やれやれ", "つらい"], reading: "つかれた", popularity: 66, createdAt: "2025-06-29" },
  { id: "sad-16", text: "_(:3」∠)_", categories: ["sad"], tags: ["ぐったり", "脱力", "疲れた", "へろへろ"], reading: "ぐったり", popularity: 71, createdAt: "2026-05-21" },
  { id: "sad-17", text: "(;_;)", categories: ["sad"], tags: ["泣く", "涙", "悲しい"], reading: "なく", popularity: 70, createdAt: "2025-09-14" },
  { id: "sad-18", text: "(πーπ)", categories: ["sad"], tags: ["泣く", "なみだ", "うるうる"], reading: "なく", popularity: 48, createdAt: "2025-11-23" },
  { id: "sad-19", text: "(っ´ω`c)", categories: ["sad"], tags: ["へこむ", "うずくまる", "落ち込む"], reading: "へこむ", popularity: 54, createdAt: "2026-01-30" },
  { id: "sad-20", text: "(；∀；)", categories: ["sad"], tags: ["号泣", "感動", "泣く"], reading: "かんどう", popularity: 47, createdAt: "2026-03-05" },
  { id: "sad-21", text: "( ; ; )", categories: ["sad"], tags: ["泣く", "なみだ", "悲しい"], reading: "なく", popularity: 59, createdAt: "2026-04-19" },
  { id: "sad-22", text: "( ´Д`)=3", categories: ["sad"], tags: ["ため息", "がっかり", "やれやれ"], reading: "ためいき", popularity: 56, createdAt: "2025-08-02" },
  { id: "sad-23", text: "(；へ；)", categories: ["sad"], tags: ["泣く", "べそ", "悲しい"], reading: "べそ", popularity: 51, createdAt: "2025-10-27" },
  { id: "sad-24", text: "(ﾉ_<。)", categories: ["sad"], tags: ["泣く", "悲しい", "うつむく"], reading: "なく", popularity: 49, createdAt: "2025-12-18" },
  { id: "sad-25", text: "(´°ω°`)", categories: ["sad"], tags: ["うるうる", "感動", "泣きそう"], reading: "うるうる", popularity: 45, createdAt: "2026-02-14" },
  { id: "sad-26", text: "( ´•ω•` )", categories: ["sad"], tags: ["うるうる", "泣きそう", "切ない"], reading: "せつない", popularity: 53, createdAt: "2026-03-28" },
  { id: "sad-27", text: "(ºωº)", categories: ["sad"], tags: ["ぼうぜん", "ショック", "がっかり"], reading: "ぼうぜん", popularity: 46, createdAt: "2026-04-26" },
  { id: "sad-28", text: "( _ _ )", categories: ["sad"], tags: ["うなだれる", "落ち込む", "反省"], reading: "うなだれる", popularity: 50, createdAt: "2025-07-17" },
  { id: "sad-29", text: "(´.ω.`)", categories: ["sad"], tags: ["しょんぼり", "さみしい", "切ない"], reading: "さみしい", popularity: 55, createdAt: "2026-05-09" },
  { id: "sad-30", text: "(/_;)", categories: ["sad"], tags: ["泣く", "なみだ", "悲しい"], reading: "なく", popularity: 52, createdAt: "2025-09-19" },
  { id: "sad-31", text: "(´Д｀)", categories: ["sad"], tags: ["ぐったり", "がっくり", "ため息"], reading: "ぐったり", popularity: 51, createdAt: "2026-04-07" },
  { id: "sad-32", text: "(ﾉ;_;)ﾉ", categories: ["sad"], tags: ["泣く", "号泣", "悲しい"], reading: "なく", popularity: 48, createdAt: "2025-08-13" },
  { id: "sad-33", text: "(p_q)", categories: ["sad"], tags: ["めそめそ", "泣く", "しょんぼり"], reading: "めそめそ", popularity: 44, createdAt: "2025-10-02" },
  { id: "sad-34", text: "(；д；)", categories: ["sad"], tags: ["泣く", "号泣", "うるうる"], reading: "なく", popularity: 50, createdAt: "2026-01-16" },
  { id: "sad-35", text: "(=_=)", categories: ["sad"], tags: ["げんなり", "疲れた", "うんざり"], reading: "げんなり", popularity: 46, createdAt: "2026-03-13" },
];

// ── angry / 怒る ────────────────────────────────────────────
const ANGRY: Kaomoji[] = [
  { id: "angry-okoru", text: "(｀Д´)", categories: ["angry"], tags: ["怒る", "プンプン", "おこ", "むっ"], reading: "おこる", popularity: 72, createdAt: "2025-10-22" },
  { id: "angry-gekido", text: "ヽ(｀Д´)ﾉ", categories: ["angry"], tags: ["激怒", "怒る", "キレる"], reading: "げきど", popularity: 68, createdAt: "2026-03-03" },
  { id: "angry-iraira", text: "(#｀д´)", categories: ["angry"], tags: ["イライラ", "怒る", "むかむか"], reading: "いらいら", popularity: 58, createdAt: "2026-05-06" },
  { id: "angry-punpun", text: "(｀ε´)", categories: ["angry"], tags: ["ぷんぷん", "むくれる", "ぶーぶー"], reading: "ぷんぷん", popularity: 50, createdAt: "2026-04-09" },
  { id: "angry-05", text: "(#＞皿＜)", categories: ["angry"], tags: ["激怒", "怒る", "ブチギレ"], reading: "げきど", popularity: 70, createdAt: "2025-07-05" },
  { id: "angry-06", text: "(*｀皿´*)", categories: ["angry"], tags: ["怒る", "むっ", "ぷんぷん"], reading: "おこる", popularity: 60, createdAt: "2025-08-25" },
  { id: "angry-07", text: "(￢_￢)", categories: ["angry"], tags: ["じとー", "うたがう", "うざい"], reading: "じとー", popularity: 56, createdAt: "2025-10-12" },
  { id: "angry-08", text: "ヽ(#｀Д´)ﾉ", categories: ["angry"], tags: ["激怒", "怒る", "キレる", "ブチギレ"], reading: "げきど", popularity: 65, createdAt: "2025-11-30" },
  { id: "angry-09", text: "(`へ´)", categories: ["angry"], tags: ["むっ", "ふくれる", "怒る"], reading: "むっ", popularity: 52, createdAt: "2026-01-17" },
  { id: "angry-10", text: "(▼皿▼)", categories: ["angry"], tags: ["怒り", "激怒", "こわい"], reading: "いかり", popularity: 57, createdAt: "2026-02-23" },
  { id: "angry-11", text: "(#・∀・)", categories: ["angry"], tags: ["イラッ", "むっ", "怒る"], reading: "いらっ", popularity: 53, createdAt: "2026-03-19" },
  { id: "angry-12", text: "ヾ(｀ヘ´)ﾉ", categories: ["angry"], tags: ["怒る", "おこ", "プンプン"], reading: "おこる", popularity: 54, createdAt: "2026-04-14" },
  { id: "angry-13", text: "(ｏ｀ﾟ皿ﾟ｀ｏ)", categories: ["angry"], tags: ["激怒", "ブチギレ", "怒り"], reading: "げきど", popularity: 48, createdAt: "2026-05-02" },
  { id: "angry-14", text: "(*`ω´*)", categories: ["angry"], tags: ["ぷんすか", "むくれる", "おこ"], reading: "ぷんすか", popularity: 51, createdAt: "2025-06-22" },
  { id: "angry-15", text: "(`Δ´)", categories: ["angry"], tags: ["怒る", "おこ", "むっ"], reading: "おこる", popularity: 49, createdAt: "2025-09-10" },
  { id: "angry-16", text: "凸(`0´)凸", categories: ["angry"], tags: ["怒り", "ムカつく", "おこ"], reading: "むかつく", popularity: 55, createdAt: "2025-12-13" },
  { id: "angry-17", text: "(#｀ω´)", categories: ["angry"], tags: ["怒る", "むっ", "イライラ"], reading: "おこる", popularity: 46, createdAt: "2026-02-08" },
  { id: "angry-18", text: "(ーー゛)", categories: ["angry"], tags: ["イライラ", "むっ", "不機嫌"], reading: "ふきげん", popularity: 50, createdAt: "2026-03-25" },
  { id: "angry-19", text: "( `ー´)", categories: ["angry"], tags: ["むっ", "不満", "ふてくされ"], reading: "ふまん", popularity: 44, createdAt: "2026-04-22" },
  { id: "angry-20", text: "凸(￣皿￣)凸", categories: ["angry"], tags: ["怒り", "ムカつく", "ブチギレ"], reading: "むかつく", popularity: 47, createdAt: "2025-08-14" },
  { id: "angry-21", text: "(￣ヘ￣)", categories: ["angry"], tags: ["むっ", "不機嫌", "ジト目"], reading: "ふきげん", popularity: 42, createdAt: "2026-05-11" },
  { id: "angry-22", text: "(＃ﾟдﾟ)", categories: ["angry"], tags: ["激怒", "ブチギレ", "怒り"], reading: "げきど", popularity: 59, createdAt: "2026-01-09" },
  { id: "angry-23", text: "(¬_¬)", categories: ["angry"], tags: ["じとー", "うたがう", "あきれ"], reading: "じとー", popularity: 56, createdAt: "2025-10-31" },
  { id: "angry-24", text: "(`皿´)", categories: ["angry"], tags: ["怒鳴る", "怒る", "激怒"], reading: "どなる", popularity: 45, createdAt: "2025-11-17" },
  { id: "angry-25", text: "(*≧m≦*)", categories: ["angry"], tags: ["くやしい", "むぎぎ", "怒る"], reading: "くやしい", popularity: 43, createdAt: "2026-04-04" },
  { id: "angry-26", text: "(; ･`д･´)", categories: ["angry"], tags: ["むむっ", "本気", "怒り"], reading: "むむっ", popularity: 48, createdAt: "2026-02-26" },
  { id: "angry-27", text: "(▼へ▼)", categories: ["angry"], tags: ["怒り", "こわい", "にらむ"], reading: "いかり", popularity: 44, createdAt: "2025-07-19" },
  { id: "angry-28", text: "(*｀д´)", categories: ["angry"], tags: ["怒る", "プンプン", "むっ"], reading: "おこる", popularity: 52, createdAt: "2025-09-23" },
  { id: "angry-29", text: "ヽ(`д´*)ﾉ", categories: ["angry"], tags: ["激怒", "怒る", "キレる"], reading: "げきど", popularity: 49, createdAt: "2025-12-21" },
  { id: "angry-30", text: "(／｀皿´)／", categories: ["angry"], tags: ["激怒", "ブチギレ", "怒り"], reading: "ぶちぎれ", popularity: 46, createdAt: "2026-02-11" },
  { id: "angry-31", text: "(；￣Д￣)", categories: ["angry"], tags: ["イライラ", "不機嫌", "むっ"], reading: "いらいら", popularity: 50, createdAt: "2026-03-31" },
  { id: "angry-32", text: "o(>< )o", categories: ["angry"], tags: ["ぷんぷん", "くやしい", "怒る"], reading: "ぷんぷん", popularity: 47, createdAt: "2026-04-18" },
  { id: "angry-33", text: "(￣ε￣)", categories: ["angry"], tags: ["ふてくされ", "むくれる", "不満"], reading: "ふくれっつら", popularity: 43, createdAt: "2025-08-31" },
  { id: "angry-34", text: "(#＞ロ＜)", categories: ["angry"], tags: ["怒鳴る", "怒る", "激怒"], reading: "どなる", popularity: 45, createdAt: "2026-05-23" },
];

// ── surprised / 驚き ───────────────────────────────────────
const SURPRISED: Kaomoji[] = [
  { id: "surprised-bikkuri", text: "Σ(ﾟДﾟ)", categories: ["surprised"], tags: ["驚き", "びっくり", "ガーン", "衝撃"], reading: "びっくり", popularity: 86, createdAt: "2025-12-01" },
  { id: "surprised-odoroku", text: "(°o°)", categories: ["surprised"], tags: ["驚く", "おどろき", "ぽかん"], reading: "おどろく", popularity: 64, createdAt: "2026-03-27" },
  { id: "surprised-shougeki", text: "Σ(O_O)", categories: ["surprised"], tags: ["衝撃", "驚き", "えっ"], reading: "しょうげき", popularity: 62, createdAt: "2026-05-24" },
  { id: "surprised-azen", text: "(ﾟдﾟ)", categories: ["surprised"], tags: ["唖然", "驚き", "ぽかーん"], reading: "あぜん", popularity: 57, createdAt: "2026-04-14" },
  { id: "surprised-05", text: "(ﾟoﾟ)", categories: ["surprised"], tags: ["びっくり", "驚き", "おどろく"], reading: "びっくり", popularity: 70, createdAt: "2025-07-09" },
  { id: "surprised-06", text: "Σ(･ω･ﾉ)ﾉ", categories: ["surprised"], tags: ["びっくり", "驚き", "えっ", "わわっ"], reading: "びっくり", popularity: 73, createdAt: "2025-08-28" },
  { id: "surprised-07", text: "(￣O￣;)", categories: ["surprised"], tags: ["ショック", "がーん", "驚き"], reading: "がーん", popularity: 55, createdAt: "2025-10-16" },
  { id: "surprised-08", text: "(゜ロ゜)", categories: ["surprised"], tags: ["びっくり", "驚き", "目を丸く"], reading: "びっくり", popularity: 60, createdAt: "2025-12-08" },
  { id: "surprised-09", text: "(;ﾟﾛﾟ)", categories: ["surprised"], tags: ["ぎょっ", "驚き", "焦り"], reading: "ぎょっ", popularity: 52, createdAt: "2026-01-20" },
  { id: "surprised-10", text: "Σ(･ω･`)", categories: ["surprised"], tags: ["衝撃", "びっくり", "戦慄"], reading: "しょうげき", popularity: 50, createdAt: "2026-02-25" },
  { id: "surprised-11", text: "(｡o_o)", categories: ["surprised"], tags: ["えっ", "驚き", "とまどい"], reading: "えっ", popularity: 48, createdAt: "2026-03-18" },
  { id: "surprised-12", text: "Σ(ﾟOﾟ)", categories: ["surprised"], tags: ["びっくり", "衝撃", "驚き"], reading: "びっくり", popularity: 66, createdAt: "2026-04-23" },
  { id: "surprised-13", text: "(ﾟﾟ)", categories: ["surprised"], tags: ["ぽかん", "きょとん", "驚き"], reading: "ぽかん", popularity: 44, createdAt: "2026-05-07" },
  { id: "surprised-14", text: "Σ(°ロ°)", categories: ["surprised"], tags: ["びっくり", "驚き", "衝撃"], reading: "びっくり", popularity: 58, createdAt: "2025-06-27" },
  { id: "surprised-15", text: "(◎o◎)", categories: ["surprised"], tags: ["驚き", "えっ", "目が点"], reading: "おどろく", popularity: 42, createdAt: "2025-09-13" },
  { id: "surprised-16", text: "( ﾟ３ﾟ)", categories: ["surprised"], tags: ["えっ", "なんで", "驚き"], reading: "えっ", popularity: 45, createdAt: "2025-11-21" },
  { id: "surprised-17", text: "(@_@)", categories: ["surprised"], tags: ["びっくり", "目が回る", "混乱"], reading: "こんらん", popularity: 61, createdAt: "2026-01-31" },
  { id: "surprised-18", text: "Σ(￣ロ￣lll)", categories: ["surprised"], tags: ["ガーン", "ショック", "衝撃"], reading: "がーん", popularity: 53, createdAt: "2026-03-09" },
  { id: "surprised-19", text: "(°0°)", categories: ["surprised"], tags: ["びっくり", "驚き", "えっ"], reading: "びっくり", popularity: 56, createdAt: "2026-04-27" },
  { id: "surprised-20", text: "(O_O)", categories: ["surprised"], tags: ["驚き", "目を見開く", "えっ"], reading: "おどろく", popularity: 47, createdAt: "2025-08-05" },
  { id: "surprised-21", text: "Σ(=ﾟωﾟ=)", categories: ["surprised"], tags: ["ねこ", "びっくり", "驚き"], reading: "びっくり", popularity: 49, createdAt: "2025-10-23" },
  { id: "surprised-22", text: "(ﾟ▽ﾟ;)", categories: ["surprised"], tags: ["えっ", "あせり", "驚き"], reading: "あせり", popularity: 51, createdAt: "2026-02-12" },
  { id: "surprised-23", text: "( ; ﾟ Д ﾟ)", categories: ["surprised"], tags: ["ぎょっ", "驚愕", "衝撃"], reading: "きょうがく", popularity: 54, createdAt: "2026-05-13" },
  { id: "surprised-24", text: "(•ロ•)", categories: ["surprised"], tags: ["ぽかん", "驚き", "えっ"], reading: "ぽかん", popularity: 43, createdAt: "2026-03-02" },
  { id: "surprised-25", text: "Σd(ﾟ∀ﾟd)", categories: ["surprised"], tags: ["おっ", "気づく", "驚き"], reading: "おっ", popularity: 46, createdAt: "2025-12-26" },
  { id: "surprised-26", text: "(￣Д￣)", categories: ["surprised"], tags: ["あんぐり", "ぽかん", "驚き"], reading: "あんぐり", popularity: 44, createdAt: "2025-07-22" },
  { id: "surprised-27", text: "Σ(･o･)", categories: ["surprised"], tags: ["びっくり", "驚き", "えっ"], reading: "びっくり", popularity: 50, createdAt: "2025-09-29" },
  { id: "surprised-28", text: "(゜o゜)", categories: ["surprised"], tags: ["びっくり", "驚き", "目を丸く"], reading: "びっくり", popularity: 53, createdAt: "2025-11-09" },
  { id: "surprised-29", text: "Σ(゜゜)", categories: ["surprised"], tags: ["はっ", "気づく", "驚き"], reading: "はっ", popularity: 41, createdAt: "2026-01-13" },
  { id: "surprised-30", text: "(◎_◎)", categories: ["surprised"], tags: ["驚き", "目が点", "えっ"], reading: "おどろく", popularity: 45, createdAt: "2026-03-16" },
  { id: "surprised-31", text: "(°Д°)", categories: ["surprised"], tags: ["びっくり", "驚き", "衝撃"], reading: "びっくり", popularity: 52, createdAt: "2026-04-20" },
  { id: "surprised-32", text: "Σ(ﾟ∀ﾟ)", categories: ["surprised"], tags: ["はっ", "気づく", "驚き"], reading: "はっ", popularity: 48, createdAt: "2026-05-11" },
  { id: "surprised-33", text: "(ﾟヘﾟ)", categories: ["surprised"], tags: ["ぽかん", "きょとん", "驚き"], reading: "ぽかん", popularity: 40, createdAt: "2025-08-17" },
];

// ── love / 愛・好き ─────────────────────────────────────────
const LOVE: Kaomoji[] = [
  { id: "love-suki", text: "(´∀`)♡", categories: ["love", "happy"], tags: ["好き", "愛", "ハート", "らぶ"], reading: "すき", popularity: 89, createdAt: "2025-10-15" },
  { id: "love-daisuki", text: "(*♥ω♥*)", categories: ["love"], tags: ["大好き", "恋", "ハート目", "メロメロ"], reading: "だいすき", popularity: 83, createdAt: "2026-02-14" },
  { id: "love-chu", text: "(＾３＾)♡", categories: ["love"], tags: ["キス", "ちゅー", "好き"], reading: "ちゅー", popularity: 71, createdAt: "2026-05-02" },
  { id: "love-ai", text: "ヽ(♡´∀`)ﾉ", categories: ["love", "happy"], tags: ["愛", "うれしい", "らぶ", "ハート"], reading: "あい", popularity: 63, createdAt: "2026-04-22" },
  { id: "love-05", text: "(♡´ω`♡)", categories: ["love"], tags: ["しあわせ", "大好き", "ハート", "うっとり"], reading: "しあわせ", popularity: 76, createdAt: "2025-07-15" },
  { id: "love-06", text: "(*´ω`*).｡.:*♡", categories: ["love"], tags: ["しあわせ", "うっとり", "ハート", "ときめき"], reading: "うっとり", popularity: 78, createdAt: "2025-09-02" },
  { id: "love-07", text: "( ´ε` )っ", categories: ["love"], tags: ["キス", "ちゅー", "らぶ", "恋人"], reading: "ちゅー", popularity: 67, createdAt: "2025-10-26" },
  { id: "love-08", text: "ヽ(♥▽♥)ﾉ", categories: ["love"], tags: ["大好き", "ハート", "ときめき"], reading: "だいすき", popularity: 70, createdAt: "2025-12-11" },
  { id: "love-09", text: "(´ε｀ )♡", categories: ["love"], tags: ["キス", "ちゅー", "好き", "らぶ"], reading: "ちゅー", popularity: 62, createdAt: "2026-01-25" },
  { id: "love-10", text: "(*´∀`*)♡", categories: ["love"], tags: ["好き", "らぶ", "ハート", "うれしい"], reading: "すき", popularity: 72, createdAt: "2026-02-19" },
  { id: "love-11", text: "(♡>ω<)", categories: ["love"], tags: ["大好き", "きゅん", "ハート"], reading: "きゅん", popularity: 58, createdAt: "2026-03-23" },
  { id: "love-12", text: "(♡ω♡ )", categories: ["love"], tags: ["ハート目", "メロメロ", "大好き"], reading: "めろめろ", popularity: 74, createdAt: "2026-04-17" },
  { id: "love-13", text: "ヽ(*´∀`)ノ♡", categories: ["love", "happy"], tags: ["大好き", "うれしい", "ハート"], reading: "だいすき", popularity: 65, createdAt: "2026-05-09" },
  { id: "love-14", text: "(*´▽`*)♡", categories: ["love"], tags: ["好き", "にこにこ", "ハート"], reading: "すき", popularity: 60, createdAt: "2025-08-18" },
  { id: "love-15", text: "(///ω///)", categories: ["love"], tags: ["照れ", "てれ", "恥ずかしい", "ぽっ"], reading: "てれ", popularity: 73, createdAt: "2025-11-06" },
  { id: "love-16", text: "(*ノ////ノ)", categories: ["love"], tags: ["照れ", "恥ずかしい", "てれ"], reading: "てれ", popularity: 68, createdAt: "2026-01-14" },
  { id: "love-17", text: "(´｡•ω•｡`)♡", categories: ["love"], tags: ["しあわせ", "大好き", "ほっこり"], reading: "しあわせ", popularity: 64, createdAt: "2026-03-07" },
  { id: "love-18", text: "(´▽`)~♡", categories: ["love"], tags: ["うっとり", "好き", "るんるん"], reading: "うっとり", popularity: 56, createdAt: "2026-04-29" },
  { id: "love-19", text: "( ´ ▽ ` )♡", categories: ["love"], tags: ["好き", "らぶ", "ハート", "ほのぼの"], reading: "すき", popularity: 61, createdAt: "2025-07-31" },
  { id: "love-20", text: "(≧▽≦)♡", categories: ["love"], tags: ["大好き", "うれしい", "ハート"], reading: "だいすき", popularity: 59, createdAt: "2025-10-08" },
  { id: "love-21", text: "(•ω•)♡", categories: ["love"], tags: ["きゅん", "かわいい", "ハート"], reading: "きゅん", popularity: 54, createdAt: "2025-12-20" },
  { id: "love-22", text: "(♡ﾟ▽ﾟ♡)", categories: ["love"], tags: ["ときめき", "きゅん", "ハート"], reading: "ときめき", popularity: 50, createdAt: "2026-02-03" },
  { id: "love-23", text: "(♡´∀`♡)", categories: ["love"], tags: ["好き", "ハート", "しあわせ"], reading: "すき", popularity: 47, createdAt: "2026-03-29" },
  { id: "love-24", text: "ヾ(♡ ＞ω＜ ♡)ﾉ", categories: ["love", "happy"], tags: ["大好き", "きゅんきゅん", "ハート"], reading: "だいすき", popularity: 66, createdAt: "2026-05-16" },
  { id: "love-25", text: "(=´ω`=)♡", categories: ["love", "cute"], tags: ["ねこ", "好き", "ハート", "まったり"], reading: "すき", popularity: 57, createdAt: "2025-09-24" },
  { id: "love-26", text: "(/ω＼*)♡", categories: ["love"], tags: ["照れ", "恥ずかしい", "ハート"], reading: "てれ", popularity: 52, createdAt: "2026-04-06" },
  { id: "love-27", text: "(♡∀♡)", categories: ["love"], tags: ["ハート目", "メロメロ", "大好き"], reading: "めろめろ", popularity: 60, createdAt: "2025-07-28" },
  { id: "love-28", text: "(´ω`♡)", categories: ["love"], tags: ["好き", "ほのぼの", "ハート"], reading: "すき", popularity: 55, createdAt: "2025-11-14" },
  { id: "love-29", text: "(*^ω^*)♡", categories: ["love", "happy"], tags: ["しあわせ", "好き", "ハート"], reading: "しあわせ", popularity: 58, createdAt: "2026-01-21" },
  { id: "love-30", text: "ヽ(`∀´)ﾉ♡", categories: ["love"], tags: ["大好き", "うれしい", "ハート"], reading: "だいすき", popularity: 53, createdAt: "2026-03-10" },
  { id: "love-31", text: "(っ♡ω♡)っ", categories: ["love"], tags: ["抱きしめ", "大好き", "ハート"], reading: "だきしめ", popularity: 56, createdAt: "2026-04-24" },
  { id: "love-32", text: "(♡ヮ♡)", categories: ["love"], tags: ["ハート目", "メロメロ", "大好き"], reading: "めろめろ", popularity: 51, createdAt: "2025-08-23" },
  { id: "love-33", text: "(´ ３`)♡", categories: ["love"], tags: ["キス", "ちゅー", "らぶ"], reading: "ちゅー", popularity: 49, createdAt: "2026-05-20" },
];

// ── greeting / 挨拶・お礼 ───────────────────────────────────
const GREETING: Kaomoji[] = [
  { id: "greeting-yaa", text: "(・∀・)ノ", categories: ["greeting"], tags: ["挨拶", "やあ", "おーい", "こんにちは"], reading: "やあ", popularity: 74, createdAt: "2025-11-25" },
  { id: "greeting-konnichiwa", text: "(^_^)/", categories: ["greeting"], tags: ["こんにちは", "手を振る", "あいさつ", "バイバイ"], reading: "こんにちは", popularity: 69, createdAt: "2026-03-19" },
  { id: "greeting-ojigi", text: "m(_ _)m", categories: ["greeting", "apology"], tags: ["お礼", "ありがとう", "お辞儀", "よろしく", "ごめん"], reading: "おじぎ", popularity: 81, createdAt: "2026-05-28" },
  { id: "greeting-04", text: "(^人^)", categories: ["greeting"], tags: ["ありがとう", "感謝", "お願い", "お礼"], reading: "かんしゃ", popularity: 78, createdAt: "2025-07-11" },
  { id: "greeting-05", text: "m(__)m", categories: ["greeting", "apology"], tags: ["ありがとう", "お礼", "お辞儀", "よろしく"], reading: "おれい", popularity: 79, createdAt: "2025-08-20" },
  { id: "greeting-06", text: "(*- -)(*_ _)ペコリ", categories: ["greeting"], tags: ["お辞儀", "ありがとう", "ぺこり", "よろしく"], reading: "ぺこり", popularity: 72, createdAt: "2025-10-18" },
  { id: "greeting-07", text: "ありがとう(o^^o)", categories: ["greeting"], tags: ["ありがとう", "感謝", "お礼", "笑顔"], reading: "ありがとう", popularity: 80, createdAt: "2025-12-03" },
  { id: "greeting-08", text: "(*´ω`*)ﾉ", categories: ["greeting"], tags: ["やあ", "こんにちは", "挨拶", "ほのぼの"], reading: "こんにちは", popularity: 64, createdAt: "2026-01-08" },
  { id: "greeting-09", text: "(´∀`)ノ゛", categories: ["greeting"], tags: ["バイバイ", "またね", "手を振る", "さようなら"], reading: "ばいばい", popularity: 70, createdAt: "2026-02-21" },
  { id: "greeting-10", text: "ヾ(^▽^)", categories: ["greeting"], tags: ["やあ", "おーい", "挨拶", "元気"], reading: "やあ", popularity: 67, createdAt: "2026-03-24" },
  { id: "greeting-11", text: "(=ﾟ▽ﾟ)ノ", categories: ["greeting"], tags: ["おはよう", "やあ", "挨拶"], reading: "おはよう", popularity: 71, createdAt: "2026-04-15" },
  { id: "greeting-12", text: "(￣▽￣)ノ", categories: ["greeting"], tags: ["バイバイ", "またね", "じゃあね"], reading: "またね", popularity: 65, createdAt: "2026-05-01" },
  { id: "greeting-13", text: "ヾ(・ω・*)", categories: ["greeting"], tags: ["やっほー", "やあ", "挨拶", "元気"], reading: "やっほー", popularity: 60, createdAt: "2025-06-30" },
  { id: "greeting-14", text: "(･ω･)ゞ", categories: ["greeting"], tags: ["よろしく", "敬礼", "挨拶"], reading: "よろしく", popularity: 50, createdAt: "2025-09-16" },
  { id: "greeting-15", text: "<(_ _)>", categories: ["greeting", "apology"], tags: ["よろしく", "お辞儀", "ありがとう", "お願い"], reading: "おじぎ", popularity: 73, createdAt: "2025-11-13" },
  { id: "greeting-16", text: "(^o^)丿", categories: ["greeting"], tags: ["やあ", "おーい", "手を振る"], reading: "やあ", popularity: 58, createdAt: "2026-01-23" },
  { id: "greeting-17", text: "おはよう(*´∀`)ﾉ", categories: ["greeting"], tags: ["おはよう", "あいさつ", "朝", "おはようございます"], reading: "おはよう", popularity: 75, createdAt: "2026-02-27" },
  { id: "greeting-18", text: "おやすみ(_ _)。゜zzZ", categories: ["greeting"], tags: ["おやすみ", "ねむい", "おやすみなさい", "夜"], reading: "おやすみ", popularity: 76, createdAt: "2026-03-31" },
  { id: "greeting-19", text: "(ﾉ´∀`)ﾉ", categories: ["greeting"], tags: ["やあ", "おーい", "呼びかけ"], reading: "やあ", popularity: 55, createdAt: "2026-04-21" },
  { id: "greeting-20", text: "感謝(*- -)", categories: ["greeting"], tags: ["感謝", "ありがとう", "お礼"], reading: "かんしゃ", popularity: 68, createdAt: "2026-05-14" },
  { id: "greeting-21", text: "(*^^*)ノ", categories: ["greeting"], tags: ["こんにちは", "やあ", "挨拶", "笑顔"], reading: "こんにちは", popularity: 62, createdAt: "2025-07-24" },
  { id: "greeting-22", text: "ヾ(´▽`*)ゝ", categories: ["greeting"], tags: ["よろしく", "やあ", "挨拶", "敬礼"], reading: "よろしく", popularity: 57, createdAt: "2025-10-04" },
  { id: "greeting-23", text: "(-人-)", categories: ["greeting"], tags: ["お願い", "ありがとう", "感謝", "祈り"], reading: "おねがい", popularity: 66, createdAt: "2025-12-16" },
  { id: "greeting-24", text: "ただいま(´ω`)", categories: ["greeting"], tags: ["ただいま", "帰宅", "あいさつ"], reading: "ただいま", popularity: 59, createdAt: "2026-02-09" },
  { id: "greeting-25", text: "いってきます(^^)/", categories: ["greeting"], tags: ["いってきます", "外出", "あいさつ"], reading: "いってきます", popularity: 56, createdAt: "2026-03-14" },
  { id: "greeting-26", text: "(￣^￣)ゞ", categories: ["greeting"], tags: ["敬礼", "よろしく", "了解", "ラジャー"], reading: "りょうかい", popularity: 61, createdAt: "2026-04-28" },
  { id: "greeting-27", text: "おつかれ(´ー`)旦", categories: ["greeting"], tags: ["おつかれ", "お疲れ様", "ねぎらい", "お茶"], reading: "おつかれ", popularity: 70, createdAt: "2026-05-17" },
  { id: "greeting-28", text: "(*^-^)ノ", categories: ["greeting"], tags: ["バイバイ", "またね", "手を振る"], reading: "ばいばい", popularity: 54, createdAt: "2025-08-09" },
  { id: "greeting-29", text: "( ´ ▽ ` )ﾉﾉ", categories: ["greeting"], tags: ["おーい", "やあ", "呼びかけ"], reading: "おーい", popularity: 52, createdAt: "2025-11-27" },
  { id: "greeting-30", text: "(人＞ω＜)", categories: ["greeting"], tags: ["お願い", "おねがい", "たのむ"], reading: "おねがい", popularity: 63, createdAt: "2026-01-29" },
  { id: "greeting-31", text: "こんばんは(´∀`)", categories: ["greeting"], tags: ["こんばんは", "挨拶", "夜", "晩"], reading: "こんばんは", popularity: 58, createdAt: "2025-09-12" },
  { id: "greeting-32", text: "(*´▽`)ノ゛", categories: ["greeting"], tags: ["バイバイ", "またね", "手を振る"], reading: "ばいばい", popularity: 53, createdAt: "2026-02-18" },
  { id: "greeting-33", text: "よろしく(*_ _)", categories: ["greeting"], tags: ["よろしく", "お願い", "挨拶"], reading: "よろしく", popularity: 60, createdAt: "2026-04-10" },
  { id: "greeting-34", text: "おかえり(´▽`)ﾉ", categories: ["greeting"], tags: ["おかえり", "帰宅", "挨拶"], reading: "おかえり", popularity: 55, createdAt: "2026-05-22" },
];

// ── apology / 謝る ─────────────────────────────────────────
const APOLOGY: Kaomoji[] = [
  { id: "apology-gomen", text: "(>_<)", categories: ["apology", "sad"], tags: ["ごめん", "謝る", "ごめんなさい", "ぴえん"], reading: "ごめん", popularity: 67, createdAt: "2026-01-09" },
  { id: "apology-hiraayamari", text: "ﾍ(_ _ﾍ)", categories: ["apology"], tags: ["平謝り", "お辞儀", "土下座", "謝る"], reading: "ひらあやまり", popularity: 48, createdAt: "2026-05-15" },
  { id: "apology-03", text: "m(._.)m", categories: ["apology"], tags: ["ごめんなさい", "謝る", "お詫び", "すみません"], reading: "ごめんなさい", popularity: 75, createdAt: "2025-07-06" },
  { id: "apology-04", text: "(_ _;)", categories: ["apology"], tags: ["反省", "ごめん", "申し訳ない"], reading: "はんせい", popularity: 60, createdAt: "2025-08-27" },
  { id: "apology-05", text: "m(>_<)m", categories: ["apology"], tags: ["ごめんなさい", "謝る", "ごめん", "お願い"], reading: "ごめんなさい", popularity: 70, createdAt: "2025-10-20" },
  { id: "apology-06", text: "(´；ω；`)ゴメン", categories: ["apology", "sad"], tags: ["ごめん", "泣く", "謝る", "ごめんね"], reading: "ごめんね", popularity: 64, createdAt: "2025-12-07" },
  { id: "apology-07", text: "゜゜(´O｀)°゜", categories: ["apology", "sad"], tags: ["ごめんなさい", "号泣", "謝る"], reading: "ごめんなさい", popularity: 52, createdAt: "2026-02-16" },
  { id: "apology-08", text: "(；・д・)", categories: ["apology"], tags: ["やばい", "あせる", "ごめん", "焦り"], reading: "あせる", popularity: 54, createdAt: "2026-03-20" },
  { id: "apology-09", text: "_(._.)_", categories: ["apology"], tags: ["土下座", "謝る", "平謝り", "ごめんなさい"], reading: "どげざ", popularity: 66, createdAt: "2026-04-13" },
  { id: "apology-10", text: "(*_ _)人", categories: ["apology"], tags: ["ごめん", "お願い", "謝る", "許して"], reading: "ごめん", popularity: 58, createdAt: "2026-05-06" },
  { id: "apology-11", text: "(o_ _)o", categories: ["apology"], tags: ["土下座", "平謝り", "ごめんなさい"], reading: "どげざ", popularity: 56, createdAt: "2025-06-24" },
  { id: "apology-12", text: "(ーー;)", categories: ["apology"], tags: ["反省", "やれやれ", "ごめん"], reading: "はんせい", popularity: 49, createdAt: "2025-09-21" },
  { id: "apology-13", text: "m(_ _;)m", categories: ["apology"], tags: ["すみません", "ごめんなさい", "お詫び", "謝る"], reading: "すみません", popularity: 68, createdAt: "2025-11-15" },
  { id: "apology-14", text: "(>人<;)", categories: ["apology"], tags: ["お願い", "ごめん", "許して", "謝る"], reading: "おねがい", popularity: 55, createdAt: "2026-01-26" },
  { id: "apology-15", text: "(´・ω・`)ゴメンネ", categories: ["apology"], tags: ["ごめんね", "謝る", "しょんぼり"], reading: "ごめんね", popularity: 51, createdAt: "2026-03-11" },
  { id: "apology-16", text: "<(. .)>", categories: ["apology"], tags: ["お辞儀", "謝る", "すみません", "ごめんなさい"], reading: "おじぎ", popularity: 53, createdAt: "2026-04-24" },
  { id: "apology-17", text: "(；´∀`)", categories: ["apology"], tags: ["反省", "ごめん", "てへぺろ", "苦笑い"], reading: "はんせい", popularity: 44, createdAt: "2026-05-19" },
  { id: "apology-18", text: "m(. .)m", categories: ["apology"], tags: ["ごめんなさい", "お詫び", "謝る", "すみません"], reading: "ごめんなさい", popularity: 57, createdAt: "2025-10-29" },
  { id: "apology-19", text: "(；ω；)ゴメン", categories: ["apology", "sad"], tags: ["ごめん", "泣く", "謝る"], reading: "ごめん", popularity: 50, createdAt: "2025-08-04" },
  { id: "apology-20", text: "(´；д；`)ゴメンナサイ", categories: ["apology", "sad"], tags: ["ごめんなさい", "号泣", "お詫び"], reading: "ごめんなさい", popularity: 47, createdAt: "2025-12-29" },
  { id: "apology-21", text: "(o*。_。)oペコ", categories: ["apology"], tags: ["ぺこり", "お辞儀", "ごめんなさい", "謝る"], reading: "ぺこり", popularity: 54, createdAt: "2026-02-22" },
  { id: "apology-22", text: "(>_<;)", categories: ["apology"], tags: ["ごめん", "あせる", "謝る"], reading: "ごめん", popularity: 52, createdAt: "2026-04-02" },
  { id: "apology-23", text: "(_ _)", categories: ["apology"], tags: ["お辞儀", "謝る", "反省", "ごめんなさい"], reading: "おじぎ", popularity: 59, createdAt: "2025-09-07" },
  { id: "apology-24", text: "m(；_；)m", categories: ["apology", "sad"], tags: ["ごめんなさい", "泣く", "謝る"], reading: "ごめんなさい", popularity: 50, createdAt: "2026-03-26" },
  { id: "apology-25", text: "(￣人￣)", categories: ["apology"], tags: ["お願い", "謝る", "許して", "拝む"], reading: "おねがい", popularity: 53, createdAt: "2025-11-01" },
  { id: "apology-26", text: "(；・∀・)", categories: ["apology"], tags: ["あせり", "ごめん", "やばい"], reading: "あせり", popularity: 48, createdAt: "2026-01-18" },
  { id: "apology-27", text: "OTL", categories: ["apology", "sad"], tags: ["土下座", "がっくり", "落ち込む", "絶望"], reading: "がっくり", popularity: 46, createdAt: "2026-05-09" },
  { id: "apology-28", text: "(_ _。)", categories: ["apology"], tags: ["反省", "しょんぼり", "ごめん"], reading: "はんせい", popularity: 45, createdAt: "2025-10-12" },
];

/** Flat list consumed by the rest of the app. */
export const KAOMOJI: Kaomoji[] = [
  ...HAPPY,
  ...CUTE,
  ...SAD,
  ...ANGRY,
  ...SURPRISED,
  ...LOVE,
  ...GREETING,
  ...APOLOGY,
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
