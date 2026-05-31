/**
 * Emoji (絵文字) seed dataset (UTF-8). Parallel to the kaomoji dataset and the
 * same shape, distinguished by `type: "emoji"` (added at assembly).
 *
 * WELL-ESTABLISHED ONLY: every entry is a long-standing emoji (broadly Unicode
 * Emoji ≤ ~9.0 / pre-2017) that renders across iOS, Android, Windows, and Mac.
 * The newest emoji, flags, skin-tone modifiers, and complex ZWJ sequences are
 * deliberately avoided so nothing tofus on older devices. Additions must also be
 * added to scripts/approved-emoji.mjs, which the build validates.
 *
 * Emoji render with the platform COLOR-emoji font (see .emoji-glyph in
 * app/globals.css) — NOT the kaomoji subset — so they are not run through the
 * font-coverage check.
 *
 * Tags are honest, intent-level Japanese search words; `reading` is the kana
 * name powering Japanese search.
 */
import type { ContentItem } from "@/lib/content";
import type { EmojiSlug } from "@/lib/emoji-categories";

type EmojiSeed = Omit<ContentItem, "type" | "categories"> & {
  categories: EmojiSlug[];
};

// ── 顔・感情 / face ─────────────────────────────────────────
const FACE: EmojiSeed[] = [
  { id: "emoji-face-01", text: "😀", categories: ["face"], tags: ["笑顔", "にこにこ", "うれしい"], reading: "えがお", popularity: 96, createdAt: "2025-07-02" },
  { id: "emoji-face-02", text: "😄", categories: ["face"], tags: ["笑顔", "わらい", "うれしい", "元気"], reading: "わらい", popularity: 92, createdAt: "2025-07-20" },
  { id: "emoji-face-03", text: "😁", categories: ["face"], tags: ["にっこり", "笑顔", "歯"], reading: "にっこり", popularity: 84, createdAt: "2025-08-09" },
  { id: "emoji-face-04", text: "😆", categories: ["face"], tags: ["大笑い", "爆笑", "わらい"], reading: "ばくしょう", popularity: 80, createdAt: "2025-09-01" },
  { id: "emoji-face-05", text: "😅", categories: ["face"], tags: ["苦笑い", "汗", "あせり"], reading: "あせり", popularity: 86, createdAt: "2025-09-18" },
  { id: "emoji-face-06", text: "😂", categories: ["face"], tags: ["爆笑", "泣き笑い", "笑いすぎ", "わらい"], reading: "なきわらい", popularity: 98, createdAt: "2025-10-04" },
  { id: "emoji-face-07", text: "🤣", categories: ["face"], tags: ["爆笑", "転げ笑い", "おかしい"], reading: "ばくしょう", popularity: 90, createdAt: "2025-10-22" },
  { id: "emoji-face-08", text: "😊", categories: ["face"], tags: ["笑顔", "にっこり", "照れ", "ほっこり"], reading: "にっこり", popularity: 94, createdAt: "2025-11-07" },
  { id: "emoji-face-09", text: "🙂", categories: ["face"], tags: ["微笑み", "にっこり"], reading: "ほほえみ", popularity: 70, createdAt: "2025-11-25" },
  { id: "emoji-face-10", text: "😉", categories: ["face"], tags: ["ウインク", "茶目っ気", "ちゃめ"], reading: "ういんく", popularity: 76, createdAt: "2025-12-12" },
  { id: "emoji-face-11", text: "😍", categories: ["face", "heart"], tags: ["大好き", "目がハート", "メロメロ"], reading: "めろめろ", popularity: 93, createdAt: "2026-01-03" },
  { id: "emoji-face-12", text: "😘", categories: ["face", "heart"], tags: ["投げキッス", "ちゅー", "好き"], reading: "なげきっす", popularity: 79, createdAt: "2026-01-19" },
  { id: "emoji-face-13", text: "😜", categories: ["face"], tags: ["てへぺろ", "おどけ", "舌"], reading: "てへぺろ", popularity: 72, createdAt: "2026-02-05" },
  { id: "emoji-face-14", text: "😎", categories: ["face"], tags: ["かっこいい", "クール", "サングラス"], reading: "くーる", popularity: 78, createdAt: "2026-02-21" },
  { id: "emoji-face-15", text: "😢", categories: ["face"], tags: ["泣く", "悲しい", "涙"], reading: "なみだ", popularity: 88, createdAt: "2026-03-08" },
  { id: "emoji-face-16", text: "😭", categories: ["face"], tags: ["号泣", "大泣き", "悲しい", "うれし泣き"], reading: "ごうきゅう", popularity: 95, createdAt: "2026-03-24" },
  { id: "emoji-face-17", text: "😡", categories: ["face"], tags: ["怒り", "激怒", "プンプン"], reading: "おこ", popularity: 83, createdAt: "2026-04-10" },
  { id: "emoji-face-18", text: "😠", categories: ["face"], tags: ["怒る", "むっ", "不機嫌"], reading: "おこ", popularity: 68, createdAt: "2026-04-26" },
  { id: "emoji-face-19", text: "😱", categories: ["face"], tags: ["驚き", "恐怖", "悲鳴", "びっくり"], reading: "ぎょっ", popularity: 81, createdAt: "2026-05-09" },
  { id: "emoji-face-20", text: "😴", categories: ["face"], tags: ["寝る", "睡眠", "ねむい", "おやすみ"], reading: "すやすや", popularity: 74, createdAt: "2025-06-28" },
  { id: "emoji-face-21", text: "🤔", categories: ["face"], tags: ["考え中", "うーん", "疑問", "なやむ"], reading: "かんがえちゅう", popularity: 82, createdAt: "2025-08-23" },
  { id: "emoji-face-22", text: "😳", categories: ["face"], tags: ["照れ", "赤面", "びっくり", "動揺"], reading: "てれ", popularity: 71, createdAt: "2025-10-30" },
  { id: "emoji-face-23", text: "🙄", categories: ["face"], tags: ["呆れ", "じとー", "やれやれ"], reading: "あきれ", popularity: 66, createdAt: "2026-01-27" },
  { id: "emoji-face-24", text: "😏", categories: ["face"], tags: ["にやり", "ドヤ", "したり顔"], reading: "にやり", popularity: 64, createdAt: "2026-03-30" },
];

// ── ハート / heart ──────────────────────────────────────────
const HEART: EmojiSeed[] = [
  { id: "emoji-heart-01", text: "❤️", categories: ["heart"], tags: ["赤いハート", "愛", "好き", "ラブ"], reading: "あかいはーと", popularity: 97, createdAt: "2025-07-06" },
  { id: "emoji-heart-02", text: "🧡", categories: ["heart"], tags: ["オレンジ", "ハート"], reading: "おれんじのはーと", popularity: 62, createdAt: "2025-08-15" },
  { id: "emoji-heart-03", text: "💛", categories: ["heart"], tags: ["黄色", "ハート", "友情"], reading: "きいろのはーと", popularity: 70, createdAt: "2025-09-10" },
  { id: "emoji-heart-04", text: "💚", categories: ["heart"], tags: ["緑", "ハート"], reading: "みどりのはーと", popularity: 64, createdAt: "2025-10-01" },
  { id: "emoji-heart-05", text: "💙", categories: ["heart"], tags: ["青", "ハート"], reading: "あおいはーと", popularity: 72, createdAt: "2025-10-21" },
  { id: "emoji-heart-06", text: "💜", categories: ["heart"], tags: ["紫", "ハート", "推し"], reading: "むらさきのはーと", popularity: 75, createdAt: "2025-11-12" },
  { id: "emoji-heart-07", text: "🖤", categories: ["heart"], tags: ["黒", "ハート"], reading: "くろいはーと", popularity: 58, createdAt: "2025-12-03" },
  { id: "emoji-heart-08", text: "💕", categories: ["heart"], tags: ["ふたつのハート", "大好き", "ラブラブ"], reading: "ふたつのはーと", popularity: 89, createdAt: "2025-12-22" },
  { id: "emoji-heart-09", text: "💖", categories: ["heart"], tags: ["きらめき", "大好き", "ハート"], reading: "きらきらはーと", popularity: 85, createdAt: "2026-01-14" },
  { id: "emoji-heart-10", text: "💗", categories: ["heart"], tags: ["高鳴り", "ハート", "ときめき"], reading: "どきどきはーと", popularity: 73, createdAt: "2026-02-02" },
  { id: "emoji-heart-11", text: "💓", categories: ["heart"], tags: ["鼓動", "ドキドキ", "ハート"], reading: "はーとびーと", popularity: 69, createdAt: "2026-02-20" },
  { id: "emoji-heart-12", text: "💘", categories: ["heart"], tags: ["矢", "恋", "キューピッド"], reading: "やのはーと", popularity: 66, createdAt: "2026-03-12" },
  { id: "emoji-heart-13", text: "💝", categories: ["heart", "celebration"], tags: ["贈り物", "リボン", "プレゼント"], reading: "りぼんのはーと", popularity: 67, createdAt: "2026-04-01" },
  { id: "emoji-heart-14", text: "💞", categories: ["heart"], tags: ["くるくる", "ハート", "両思い"], reading: "まわるはーと", popularity: 60, createdAt: "2026-04-20" },
  { id: "emoji-heart-15", text: "💔", categories: ["heart"], tags: ["失恋", "傷心", "ハート割れ"], reading: "われたはーと", popularity: 71, createdAt: "2026-05-08" },
  { id: "emoji-heart-16", text: "💟", categories: ["heart"], tags: ["ハートマーク", "装飾"], reading: "はーとまーく", popularity: 50, createdAt: "2025-06-25" },
];

// ── お祝い / celebration ────────────────────────────────────
const CELEBRATION: EmojiSeed[] = [
  { id: "emoji-celebration-01", text: "🎉", categories: ["celebration"], tags: ["お祝い", "おめでとう", "パーティー", "クラッカー"], reading: "くらっかー", popularity: 95, createdAt: "2025-07-11" },
  { id: "emoji-celebration-02", text: "🎊", categories: ["celebration"], tags: ["お祝い", "くす玉", "おめでとう"], reading: "くすだま", popularity: 82, createdAt: "2025-08-02" },
  { id: "emoji-celebration-03", text: "🎂", categories: ["celebration"], tags: ["誕生日", "バースデー", "ケーキ", "お祝い"], reading: "たんじょうびけーき", popularity: 90, createdAt: "2025-08-26" },
  { id: "emoji-celebration-04", text: "🎁", categories: ["celebration"], tags: ["贈り物", "プレゼント", "お祝い"], reading: "ぷれぜんと", popularity: 86, createdAt: "2025-09-20" },
  { id: "emoji-celebration-05", text: "🎈", categories: ["celebration"], tags: ["風船", "バルーン", "パーティー"], reading: "ふうせん", popularity: 74, createdAt: "2025-10-12" },
  { id: "emoji-celebration-06", text: "🎄", categories: ["celebration"], tags: ["クリスマス", "ツリー", "冬"], reading: "くりすますつりー", popularity: 84, createdAt: "2025-11-04" },
  { id: "emoji-celebration-07", text: "🎃", categories: ["celebration"], tags: ["ハロウィン", "かぼちゃ", "秋"], reading: "はろうぃん", popularity: 76, createdAt: "2025-11-22" },
  { id: "emoji-celebration-08", text: "🎆", categories: ["celebration"], tags: ["花火", "夏祭り", "打ち上げ花火"], reading: "はなび", popularity: 72, createdAt: "2025-12-15" },
  { id: "emoji-celebration-09", text: "✨", categories: ["celebration"], tags: ["キラキラ", "輝き", "きらめき"], reading: "きらきら", popularity: 91, createdAt: "2026-01-09" },
  { id: "emoji-celebration-10", text: "🌟", categories: ["celebration"], tags: ["輝く星", "スター", "キラキラ"], reading: "きらきらぼし", popularity: 80, createdAt: "2026-01-28" },
  { id: "emoji-celebration-11", text: "⭐", categories: ["celebration"], tags: ["星", "スター", "お気に入り"], reading: "ほし", popularity: 83, createdAt: "2026-02-15" },
  { id: "emoji-celebration-12", text: "🏆", categories: ["celebration"], tags: ["優勝", "トロフィー", "1位", "受賞"], reading: "とろふぃー", popularity: 70, createdAt: "2026-03-05" },
  { id: "emoji-celebration-13", text: "🥇", categories: ["celebration"], tags: ["金メダル", "1位", "優勝"], reading: "きんめだる", popularity: 68, createdAt: "2026-03-23" },
  { id: "emoji-celebration-14", text: "🎀", categories: ["celebration"], tags: ["リボン", "かわいい", "飾り"], reading: "りぼん", popularity: 73, createdAt: "2026-04-11" },
  { id: "emoji-celebration-15", text: "👑", categories: ["celebration"], tags: ["王冠", "クラウン", "1番", "女王"], reading: "おうかん", popularity: 71, createdAt: "2026-04-29" },
  { id: "emoji-celebration-16", text: "🎓", categories: ["celebration"], tags: ["卒業", "学士帽", "合格"], reading: "そつぎょう", popularity: 64, createdAt: "2026-05-12" },
  { id: "emoji-celebration-17", text: "💐", categories: ["celebration", "nature"], tags: ["花束", "ブーケ", "お祝い", "贈り物"], reading: "はなたば", popularity: 69, createdAt: "2025-09-06" },
  { id: "emoji-celebration-18", text: "🍾", categories: ["celebration"], tags: ["シャンパン", "乾杯", "お祝い", "栓"], reading: "しゃんぱん", popularity: 60, createdAt: "2025-12-29" },
];

// ── 動物 / animal ───────────────────────────────────────────
const ANIMAL: EmojiSeed[] = [
  { id: "emoji-animal-01", text: "🐱", categories: ["animal"], tags: ["猫", "ねこ", "ネコ", "にゃー"], reading: "ねこ", popularity: 94, createdAt: "2025-07-04" },
  { id: "emoji-animal-02", text: "🐶", categories: ["animal"], tags: ["犬", "いぬ", "イヌ", "わんわん"], reading: "いぬ", popularity: 93, createdAt: "2025-07-22" },
  { id: "emoji-animal-03", text: "🐰", categories: ["animal"], tags: ["うさぎ", "ウサギ", "バニー"], reading: "うさぎ", popularity: 85, createdAt: "2025-08-12" },
  { id: "emoji-animal-04", text: "🐻", categories: ["animal"], tags: ["くま", "クマ", "熊"], reading: "くま", popularity: 80, createdAt: "2025-09-02" },
  { id: "emoji-animal-05", text: "🐼", categories: ["animal"], tags: ["パンダ", "ぱんだ"], reading: "ぱんだ", popularity: 82, createdAt: "2025-09-23" },
  { id: "emoji-animal-06", text: "🐨", categories: ["animal"], tags: ["コアラ", "こあら"], reading: "こあら", popularity: 68, createdAt: "2025-10-14" },
  { id: "emoji-animal-07", text: "🦁", categories: ["animal"], tags: ["ライオン", "獅子", "らいおん"], reading: "らいおん", popularity: 66, createdAt: "2025-11-03" },
  { id: "emoji-animal-08", text: "🐯", categories: ["animal"], tags: ["虎", "とら", "タイガー"], reading: "とら", popularity: 65, createdAt: "2025-11-21" },
  { id: "emoji-animal-09", text: "🐸", categories: ["animal"], tags: ["カエル", "かえる", "蛙"], reading: "かえる", popularity: 70, createdAt: "2025-12-10" },
  { id: "emoji-animal-10", text: "🐵", categories: ["animal"], tags: ["猿", "さる", "モンキー"], reading: "さる", popularity: 63, createdAt: "2025-12-28" },
  { id: "emoji-animal-11", text: "🐧", categories: ["animal"], tags: ["ペンギン", "ぺんぎん"], reading: "ぺんぎん", popularity: 75, createdAt: "2026-01-16" },
  { id: "emoji-animal-12", text: "🐦", categories: ["animal"], tags: ["鳥", "とり", "小鳥"], reading: "とり", popularity: 60, createdAt: "2026-02-04" },
  { id: "emoji-animal-13", text: "🐤", categories: ["animal"], tags: ["ひよこ", "ヒヨコ", "鳥"], reading: "ひよこ", popularity: 72, createdAt: "2026-02-22" },
  { id: "emoji-animal-14", text: "🦊", categories: ["animal"], tags: ["キツネ", "きつね", "狐"], reading: "きつね", popularity: 67, createdAt: "2026-03-13" },
  { id: "emoji-animal-15", text: "🐮", categories: ["animal"], tags: ["牛", "うし", "モー"], reading: "うし", popularity: 58, createdAt: "2026-04-02" },
  { id: "emoji-animal-16", text: "🐷", categories: ["animal"], tags: ["豚", "ぶた", "ブタ"], reading: "ぶた", popularity: 64, createdAt: "2026-04-21" },
  { id: "emoji-animal-17", text: "🐭", categories: ["animal"], tags: ["ねずみ", "ネズミ", "マウス"], reading: "ねずみ", popularity: 55, createdAt: "2026-05-10" },
  { id: "emoji-animal-18", text: "🐹", categories: ["animal"], tags: ["ハムスター", "はむすたー"], reading: "はむすたー", popularity: 69, createdAt: "2025-06-30" },
  { id: "emoji-animal-19", text: "🐴", categories: ["animal"], tags: ["馬", "うま", "ウマ"], reading: "うま", popularity: 54, createdAt: "2025-08-19" },
  { id: "emoji-animal-20", text: "🐝", categories: ["animal"], tags: ["ハチ", "はち", "ミツバチ"], reading: "はち", popularity: 61, createdAt: "2025-10-26" },
  { id: "emoji-animal-21", text: "🐢", categories: ["animal"], tags: ["カメ", "かめ", "亀"], reading: "かめ", popularity: 57, createdAt: "2025-12-17" },
  { id: "emoji-animal-22", text: "🐟", categories: ["animal", "food"], tags: ["魚", "さかな", "サカナ"], reading: "さかな", popularity: 59, createdAt: "2026-02-11" },
  { id: "emoji-animal-23", text: "🦋", categories: ["animal", "nature"], tags: ["蝶", "ちょうちょ", "チョウ"], reading: "ちょうちょ", popularity: 71, createdAt: "2026-03-28" },
  { id: "emoji-animal-24", text: "🐙", categories: ["animal"], tags: ["タコ", "たこ", "海"], reading: "たこ", popularity: 56, createdAt: "2026-05-01" },
];

// ── 食べ物 / food ───────────────────────────────────────────
const FOOD: EmojiSeed[] = [
  { id: "emoji-food-01", text: "🍎", categories: ["food"], tags: ["りんご", "リンゴ", "果物"], reading: "りんご", popularity: 84, createdAt: "2025-07-08" },
  { id: "emoji-food-02", text: "🍓", categories: ["food"], tags: ["いちご", "イチゴ", "果物"], reading: "いちご", popularity: 88, createdAt: "2025-07-26" },
  { id: "emoji-food-03", text: "🍌", categories: ["food"], tags: ["バナナ", "ばなな", "果物"], reading: "ばなな", popularity: 76, createdAt: "2025-08-17" },
  { id: "emoji-food-04", text: "🍉", categories: ["food"], tags: ["スイカ", "すいか", "果物", "夏"], reading: "すいか", popularity: 73, createdAt: "2025-09-07" },
  { id: "emoji-food-05", text: "🍇", categories: ["food"], tags: ["ぶどう", "ブドウ", "果物"], reading: "ぶどう", popularity: 67, createdAt: "2025-09-28" },
  { id: "emoji-food-06", text: "🍊", categories: ["food"], tags: ["みかん", "オレンジ", "果物"], reading: "みかん", popularity: 70, createdAt: "2025-10-19" },
  { id: "emoji-food-07", text: "🍑", categories: ["food"], tags: ["桃", "もも", "ピーチ", "果物"], reading: "もも", popularity: 72, createdAt: "2025-11-09" },
  { id: "emoji-food-08", text: "🍒", categories: ["food"], tags: ["さくらんぼ", "チェリー", "果物"], reading: "さくらんぼ", popularity: 65, createdAt: "2025-11-27" },
  { id: "emoji-food-09", text: "🍰", categories: ["food"], tags: ["ケーキ", "スイーツ", "デザート", "ショートケーキ"], reading: "けーき", popularity: 86, createdAt: "2025-12-16" },
  { id: "emoji-food-10", text: "🍩", categories: ["food"], tags: ["ドーナツ", "どーなつ", "おやつ"], reading: "どーなつ", popularity: 71, createdAt: "2026-01-06" },
  { id: "emoji-food-11", text: "🍪", categories: ["food"], tags: ["クッキー", "くっきー", "おやつ"], reading: "くっきー", popularity: 66, createdAt: "2026-01-24" },
  { id: "emoji-food-12", text: "🍫", categories: ["food"], tags: ["チョコ", "チョコレート", "おやつ", "バレンタイン"], reading: "ちょこ", popularity: 78, createdAt: "2026-02-13" },
  { id: "emoji-food-13", text: "🍬", categories: ["food"], tags: ["飴", "キャンディ", "あめ"], reading: "あめ", popularity: 62, createdAt: "2026-03-03" },
  { id: "emoji-food-14", text: "🍦", categories: ["food"], tags: ["アイス", "ソフトクリーム", "夏", "デザート"], reading: "そふとくりーむ", popularity: 79, createdAt: "2026-03-21" },
  { id: "emoji-food-15", text: "🍿", categories: ["food"], tags: ["ポップコーン", "映画", "おやつ"], reading: "ぽっぷこーん", popularity: 63, createdAt: "2026-04-08" },
  { id: "emoji-food-16", text: "🍕", categories: ["food"], tags: ["ピザ", "ぴざ", "イタリアン"], reading: "ぴざ", popularity: 80, createdAt: "2026-04-27" },
  { id: "emoji-food-17", text: "🍔", categories: ["food"], tags: ["ハンバーガー", "バーガー", "ファストフード"], reading: "はんばーがー", popularity: 77, createdAt: "2026-05-14" },
  { id: "emoji-food-18", text: "🍟", categories: ["food"], tags: ["フライドポテト", "ポテト", "ファストフード"], reading: "ふらいどぽてと", popularity: 68, createdAt: "2025-06-26" },
  { id: "emoji-food-19", text: "🍜", categories: ["food"], tags: ["ラーメン", "麺", "らーめん"], reading: "らーめん", popularity: 82, createdAt: "2025-08-05" },
  { id: "emoji-food-20", text: "🍣", categories: ["food"], tags: ["寿司", "すし", "スシ", "和食"], reading: "すし", popularity: 81, createdAt: "2025-10-08" },
  { id: "emoji-food-21", text: "🍙", categories: ["food"], tags: ["おにぎり", "ご飯", "和食"], reading: "おにぎり", popularity: 74, createdAt: "2025-12-01" },
  { id: "emoji-food-22", text: "🍵", categories: ["food"], tags: ["お茶", "抹茶", "湯のみ", "和"], reading: "おちゃ", popularity: 70, createdAt: "2026-01-31" },
  { id: "emoji-food-23", text: "☕", categories: ["food"], tags: ["コーヒー", "カフェ", "ホットドリンク", "休憩"], reading: "こーひー", popularity: 85, createdAt: "2026-03-18" },
  { id: "emoji-food-24", text: "🍺", categories: ["food"], tags: ["ビール", "乾杯", "お酒", "宴会"], reading: "びーる", popularity: 75, createdAt: "2026-05-05" },
];

// ── 天気 / weather ──────────────────────────────────────────
const WEATHER: EmojiSeed[] = [
  { id: "emoji-weather-01", text: "☀️", categories: ["weather"], tags: ["太陽", "晴れ", "お日様", "快晴"], reading: "たいよう", popularity: 90, createdAt: "2025-07-13" },
  { id: "emoji-weather-02", text: "⛅", categories: ["weather"], tags: ["晴れ時々曇り", "雲", "天気"], reading: "はれときどきくもり", popularity: 66, createdAt: "2025-08-21" },
  { id: "emoji-weather-03", text: "☁️", categories: ["weather"], tags: ["曇り", "雲", "くもり"], reading: "くもり", popularity: 72, createdAt: "2025-09-15" },
  { id: "emoji-weather-04", text: "🌧️", categories: ["weather"], tags: ["雨", "雨降り", "あめ"], reading: "あめ", popularity: 78, createdAt: "2025-10-09" },
  { id: "emoji-weather-05", text: "⛈️", categories: ["weather"], tags: ["雷雨", "嵐", "かみなり"], reading: "らいう", popularity: 60, createdAt: "2025-11-06" },
  { id: "emoji-weather-06", text: "🌩️", categories: ["weather"], tags: ["雷", "稲妻", "かみなり"], reading: "かみなり", popularity: 62, createdAt: "2025-12-04" },
  { id: "emoji-weather-07", text: "❄️", categories: ["weather"], tags: ["雪", "結晶", "冬", "ゆき"], reading: "ゆき", popularity: 83, createdAt: "2026-01-12" },
  { id: "emoji-weather-08", text: "☃️", categories: ["weather"], tags: ["雪だるま", "冬", "ゆきだるま"], reading: "ゆきだるま", popularity: 70, createdAt: "2026-02-08" },
  { id: "emoji-weather-09", text: "⛄", categories: ["weather"], tags: ["雪だるま", "冬", "ゆき"], reading: "ゆきだるま", popularity: 68, createdAt: "2026-03-01" },
  { id: "emoji-weather-10", text: "🌈", categories: ["weather", "nature"], tags: ["虹", "レインボー", "にじ"], reading: "にじ", popularity: 87, createdAt: "2026-03-26" },
  { id: "emoji-weather-11", text: "🌙", categories: ["weather"], tags: ["月", "三日月", "夜", "つき"], reading: "つき", popularity: 80, createdAt: "2026-04-15" },
  { id: "emoji-weather-12", text: "🌞", categories: ["weather"], tags: ["太陽", "日差し", "笑顔"], reading: "おひさま", popularity: 73, createdAt: "2026-05-03" },
  { id: "emoji-weather-13", text: "🌊", categories: ["weather", "nature"], tags: ["波", "海", "うみ", "なみ"], reading: "なみ", popularity: 74, createdAt: "2025-07-29" },
  { id: "emoji-weather-14", text: "💧", categories: ["weather"], tags: ["水滴", "雫", "水", "しずく"], reading: "しずく", popularity: 64, createdAt: "2025-09-25" },
  { id: "emoji-weather-15", text: "🔥", categories: ["weather"], tags: ["炎", "火", "ファイア", "アツい"], reading: "ほのお", popularity: 86, createdAt: "2025-11-30" },
  { id: "emoji-weather-16", text: "⚡", categories: ["weather"], tags: ["稲妻", "電気", "雷", "いなずま"], reading: "いなずま", popularity: 71, createdAt: "2026-02-26" },
];

// ── ジェスチャー / hand ─────────────────────────────────────
const HAND: EmojiSeed[] = [
  { id: "emoji-hand-01", text: "👍", categories: ["hand"], tags: ["いいね", "グッド", "賛成", "OK"], reading: "いいね", popularity: 95, createdAt: "2025-07-15" },
  { id: "emoji-hand-02", text: "👎", categories: ["hand"], tags: ["だめ", "ブーイング", "反対"], reading: "ばっど", popularity: 66, createdAt: "2025-08-07" },
  { id: "emoji-hand-03", text: "👌", categories: ["hand"], tags: ["OK", "オーケー", "完璧", "いいね"], reading: "おっけー", popularity: 84, createdAt: "2025-08-30" },
  { id: "emoji-hand-04", text: "✌️", categories: ["hand"], tags: ["ピース", "勝利", "Vサイン"], reading: "ぴーす", popularity: 82, createdAt: "2025-09-24" },
  { id: "emoji-hand-05", text: "🤞", categories: ["hand"], tags: ["指クロス", "幸運を祈る", "おねがい"], reading: "ゆびくろす", popularity: 64, createdAt: "2025-10-18" },
  { id: "emoji-hand-06", text: "👏", categories: ["hand"], tags: ["拍手", "パチパチ", "称賛", "すごい"], reading: "はくしゅ", popularity: 88, createdAt: "2025-11-14" },
  { id: "emoji-hand-07", text: "🙏", categories: ["hand"], tags: ["お願い", "合掌", "感謝", "ありがとう"], reading: "おねがい", popularity: 92, createdAt: "2025-12-08" },
  { id: "emoji-hand-08", text: "🙌", categories: ["hand"], tags: ["万歳", "やったー", "歓喜", "ばんざい"], reading: "ばんざい", popularity: 79, createdAt: "2026-01-02" },
  { id: "emoji-hand-09", text: "👋", categories: ["hand"], tags: ["手を振る", "やあ", "バイバイ", "挨拶"], reading: "てをふる", popularity: 83, createdAt: "2026-01-22" },
  { id: "emoji-hand-10", text: "🤝", categories: ["hand"], tags: ["握手", "よろしく", "合意", "あくしゅ"], reading: "あくしゅ", popularity: 70, createdAt: "2026-02-10" },
  { id: "emoji-hand-11", text: "💪", categories: ["hand"], tags: ["筋肉", "力こぶ", "がんばる", "ちから"], reading: "ちから", popularity: 81, createdAt: "2026-02-28" },
  { id: "emoji-hand-12", text: "👊", categories: ["hand"], tags: ["げんこつ", "グータッチ", "パンチ"], reading: "ぐーぱんち", popularity: 67, createdAt: "2026-03-19" },
  { id: "emoji-hand-13", text: "✊", categories: ["hand"], tags: ["こぶし", "がんばろう", "握りこぶし"], reading: "こぶし", popularity: 60, createdAt: "2026-04-07" },
  { id: "emoji-hand-14", text: "👀", categories: ["hand", "face"], tags: ["目", "見てる", "注目", "みてる"], reading: "みてる", popularity: 85, createdAt: "2026-04-25" },
  { id: "emoji-hand-15", text: "👉", categories: ["hand"], tags: ["右", "指差し", "こちら"], reading: "みぎゆび", popularity: 62, createdAt: "2026-05-13" },
  { id: "emoji-hand-16", text: "☝️", categories: ["hand"], tags: ["上", "人差し指", "ひとつ"], reading: "うえゆび", popularity: 58, createdAt: "2025-06-27" },
  { id: "emoji-hand-17", text: "🖐️", categories: ["hand"], tags: ["手のひら", "パー", "ストップ"], reading: "てのひら", popularity: 56, createdAt: "2025-09-12" },
  { id: "emoji-hand-18", text: "🤙", categories: ["hand"], tags: ["電話して", "シャカ", "コール"], reading: "でんわして", popularity: 54, createdAt: "2025-12-20" },
];

// ── 自然 / nature ───────────────────────────────────────────
const NATURE: EmojiSeed[] = [
  { id: "emoji-nature-01", text: "🌸", categories: ["nature"], tags: ["桜", "さくら", "花", "春"], reading: "さくら", popularity: 92, createdAt: "2025-07-18" },
  { id: "emoji-nature-02", text: "🌹", categories: ["nature"], tags: ["バラ", "薔薇", "花", "ばら"], reading: "ばら", popularity: 78, createdAt: "2025-08-11" },
  { id: "emoji-nature-03", text: "🌻", categories: ["nature"], tags: ["ひまわり", "ヒマワリ", "花", "夏"], reading: "ひまわり", popularity: 80, createdAt: "2025-09-04" },
  { id: "emoji-nature-04", text: "🌷", categories: ["nature"], tags: ["チューリップ", "花", "春", "ちゅーりっぷ"], reading: "ちゅーりっぷ", popularity: 74, createdAt: "2025-09-30" },
  { id: "emoji-nature-05", text: "🌼", categories: ["nature"], tags: ["花", "デイジー", "はな"], reading: "はな", popularity: 70, createdAt: "2025-10-25" },
  { id: "emoji-nature-06", text: "🌺", categories: ["nature"], tags: ["ハイビスカス", "花", "南国"], reading: "はいびすかす", popularity: 66, createdAt: "2025-11-18" },
  { id: "emoji-nature-07", text: "🌿", categories: ["nature"], tags: ["葉", "ハーブ", "植物", "はっぱ"], reading: "はっぱ", popularity: 68, createdAt: "2025-12-13" },
  { id: "emoji-nature-08", text: "🍀", categories: ["nature"], tags: ["四つ葉", "クローバー", "幸運", "よつば"], reading: "よつば", popularity: 84, createdAt: "2026-01-10" },
  { id: "emoji-nature-09", text: "🍁", categories: ["nature"], tags: ["紅葉", "秋", "かえで", "もみじ"], reading: "もみじ", popularity: 76, createdAt: "2026-02-06" },
  { id: "emoji-nature-10", text: "🍂", categories: ["nature"], tags: ["落ち葉", "秋", "おちば"], reading: "おちば", popularity: 64, createdAt: "2026-03-02" },
  { id: "emoji-nature-11", text: "🌳", categories: ["nature"], tags: ["木", "樹木", "自然", "き"], reading: "き", popularity: 62, createdAt: "2026-03-27" },
  { id: "emoji-nature-12", text: "🌲", categories: ["nature"], tags: ["常緑樹", "松", "森", "まつ"], reading: "まつ", popularity: 58, createdAt: "2026-04-16" },
  { id: "emoji-nature-13", text: "🌵", categories: ["nature"], tags: ["サボテン", "さぼてん"], reading: "さぼてん", popularity: 60, createdAt: "2026-05-04" },
  { id: "emoji-nature-14", text: "🌴", categories: ["nature"], tags: ["ヤシの木", "南国", "リゾート", "やしのき"], reading: "やしのき", popularity: 67, createdAt: "2025-06-29" },
  { id: "emoji-nature-15", text: "🌱", categories: ["nature"], tags: ["芽", "新芽", "植物", "ふたば"], reading: "ふたば", popularity: 65, createdAt: "2025-08-28" },
  { id: "emoji-nature-16", text: "🐚", categories: ["nature"], tags: ["貝", "貝殻", "海", "かい"], reading: "かいがら", popularity: 56, createdAt: "2025-11-01" },
  { id: "emoji-nature-17", text: "🌎", categories: ["nature"], tags: ["地球", "世界", "アース", "ちきゅう"], reading: "ちきゅう", popularity: 72, createdAt: "2026-01-25" },
  { id: "emoji-nature-18", text: "🍄", categories: ["nature"], tags: ["きのこ", "キノコ", "秋", "茸"], reading: "きのこ", popularity: 50, createdAt: "2026-04-30" },
];

/** Flat emoji list, tagged with type. */
export const EMOJI: ContentItem[] = [
  ...FACE,
  ...HEART,
  ...CELEBRATION,
  ...ANIMAL,
  ...FOOD,
  ...WEATHER,
  ...HAND,
  ...NATURE,
].map((e) => ({ ...e, type: "emoji" as const }));
