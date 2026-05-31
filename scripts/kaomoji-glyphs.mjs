// Canonical extractor for the glyphs the library renders, split by rendering
// system. Combos contain BOTH kaomoji line-art and color emoji, so this module
// classifies each character:
//   - emoji  → an Extended_Pictographic char NOT used as kaomoji line-art
//              (validated against the approved emoji list)
//   - kaomoji → everything else, incl. text-style symbols like ♥ ♡ ☆ ♪ that the
//              kaomoji dataset uses (validated against the subset font)
// Used by scripts/check-font-coverage.mjs, scripts/check-emoji.mjs, and
// scripts/build-subset-font.mjs — one source of truth.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function readTexts(relPath) {
  const src = readFileSync(join(ROOT, relPath), "utf8");
  return [...src.matchAll(/text:\s*"([^"]+)"/g)].map((m) => m[1]);
}

const isExtPict = (cp) => /\p{Extended_Pictographic}/u.test(String.fromCodePoint(cp));

// Extended_Pictographic codepoints that the PURE-kaomoji dataset uses are
// line-art symbols (♥ ♡ ☆ ★ ♪ …), served by the subset font — not color emoji.
const KAOMOJI_TEXT_SYMBOLS = new Set();
for (const t of readTexts("data/kaomoji.ts")) {
  for (const ch of t) {
    const cp = ch.codePointAt(0);
    if (isExtPict(cp)) KAOMOJI_TEXT_SYMBOLS.add(cp);
  }
}

const isEmojiBase = (cp) => isExtPict(cp) && !KAOMOJI_TEXT_SYMBOLS.has(cp);

/** Split a string into kaomoji codepoints and emoji sequences. */
export function classifyText(text) {
  const chars = [...text];
  const kaomojiCps = [];
  const emojiSeqs = [];
  for (let i = 0; i < chars.length; i++) {
    const cp = chars[i].codePointAt(0);
    if (isEmojiBase(cp)) {
      let seq = chars[i];
      while (
        i + 1 < chars.length &&
        (chars[i + 1] === "️" || chars[i + 1] === "‍")
      ) {
        seq += chars[i + 1];
        if (chars[i + 1] === "‍" && i + 2 < chars.length) {
          seq += chars[i + 2];
          i += 2;
        } else {
          i += 1;
        }
      }
      emojiSeqs.push(seq);
    } else if (chars[i] === "️" || chars[i] === "‍") {
      // stray modifier — ignore
    } else {
      kaomojiCps.push(cp);
    }
  }
  return { kaomojiCps, emojiSeqs };
}

const KAOMOJI_SOURCES = ["data/kaomoji.ts", "data/combos.ts"];
const EMOJI_SOURCES = ["data/emoji.ts", "data/combos.ts"];

/** Map of kaomoji codepoint -> a sample text using it (kaomoji items + combos). */
export function codepointSamples() {
  const map = new Map();
  for (const file of KAOMOJI_SOURCES) {
    for (const t of readTexts(file)) {
      for (const cp of classifyText(t).kaomojiCps) {
        if (!map.has(cp)) map.set(cp, t);
      }
    }
  }
  return map;
}

/** Sorted kaomoji codepoints that must be covered by the subset font. */
export function datasetCodepoints() {
  return [...codepointSamples().keys()].sort((a, b) => a - b);
}

/** Map of emoji sequence -> a sample text using it (emoji items + combos). */
export function emojiUsage() {
  const map = new Map();
  for (const file of EMOJI_SOURCES) {
    for (const t of readTexts(file)) {
      for (const seq of classifyText(t).emojiSeqs) {
        if (!map.has(seq)) map.set(seq, t);
      }
    }
  }
  return map;
}

export const isAscii = (cp) => cp <= 0x7f;
export const hex = (cp) => "U+" + cp.toString(16).toUpperCase().padStart(4, "0");

// CLI: print the unique non-ASCII kaomoji codepoints with a sample, for review.
if (process.argv[1] && process.argv[1].endsWith("kaomoji-glyphs.mjs")) {
  const samples = codepointSamples();
  const all = [...samples.keys()].sort((a, b) => a - b);
  const nonAscii = all.filter((cp) => !isAscii(cp));
  console.log(`kaomoji codepoints: ${all.length} (non-ASCII ${nonAscii.length})`);
  for (const cp of nonAscii) {
    console.log(`  ${hex(cp).padEnd(8)} ${String.fromCodePoint(cp)}\t${samples.get(cp)}`);
  }
  console.log(`emoji sequences used: ${emojiUsage().size}`);
}
