/**
 * Client-side kaomoji search.
 *
 * Per the charter, search runs entirely in the browser over the bundled
 * dataset (a prebuilt in-memory index) — no server call. Each kaomoji's
 * searchable text combines its glyph, tags, and reading, folded so that
 * Japanese works across scripts:
 *   - NFKC + lowercase (full/half-width and case folding)
 *   - katakana → hiragana (カワイイ matches かわいい)
 *   - a romaji rendering of the reading and kana tags (kawaii / arigatou)
 */
import { KAOMOJI, type Kaomoji } from "@/data/kaomoji";

/** NFKC + lowercase + trim, with katakana folded to hiragana. */
export function normalize(input: string): string {
  return input
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[ァ-ヶ]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60),
    );
}

const ROMAJI: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
  ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", を: "o", ん: "n",
  ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o",
};

const YOON: Record<string, string> = {
  きゃ: "kya", きゅ: "kyu", きょ: "kyo",
  ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
  しゃ: "sha", しゅ: "shu", しょ: "sho",
  じゃ: "ja", じゅ: "ju", じょ: "jo",
  ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
  にゃ: "nya", にゅ: "nyu", にょ: "nyo",
  ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
  びゃ: "bya", びゅ: "byu", びょ: "byo",
  ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
  みゃ: "mya", みゅ: "myu", みょ: "myo",
  りゃ: "rya", りゅ: "ryu", りょ: "ryo",
};

/** Convert a hiragana string (already normalized) to rough Hepburn romaji. */
function toRomaji(hira: string): string {
  let out = "";
  for (let i = 0; i < hira.length; i++) {
    const pair = hira.slice(i, i + 2);
    if (YOON[pair]) {
      out += YOON[pair];
      i++;
      continue;
    }
    const ch = hira[i];
    if (ch === "っ") {
      const nextPair = hira.slice(i + 1, i + 3);
      const next = YOON[nextPair] ?? ROMAJI[hira[i + 1]];
      if (next) out += next[0];
      continue;
    }
    if (ch === "ー") {
      const last = out[out.length - 1];
      if (last && "aiueo".includes(last)) out += last;
      continue;
    }
    out += ROMAJI[ch] ?? ch;
  }
  return out;
}

interface IndexEntry {
  kaomoji: Kaomoji;
  haystack: string;
  /** Normalized tags + reading for relevance scoring. */
  exact: string[];
}

const INDEX: IndexEntry[] = KAOMOJI.map((k) => {
  const exact = [...k.tags, k.reading].map(normalize);
  const base = normalize([k.text, ...k.tags, k.reading].join(" "));
  const romaji = [k.reading, ...k.tags]
    .map((s) => toRomaji(normalize(s)))
    .join(" ");
  return { kaomoji: k, haystack: `${base} ${romaji}`, exact };
});

function relevance(entry: IndexEntry, q: string): number {
  if (entry.exact.includes(q)) return 3;
  if (entry.exact.some((t) => t.startsWith(q))) return 2;
  return 1;
}

/**
 * Search the kaomoji dataset. Returns the matches (every whitespace-separated
 * term must be present), ranked by relevance then popularity. An empty query
 * returns an empty array — callers decide what to show instead.
 */
export function searchKaomoji(query: string): Kaomoji[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return INDEX.filter((entry) => terms.every((t) => entry.haystack.includes(t)))
    .sort(
      (a, b) =>
        relevance(b, q) - relevance(a, q) ||
        b.kaomoji.popularity - a.kaomoji.popularity,
    )
    .map((entry) => entry.kaomoji);
}
