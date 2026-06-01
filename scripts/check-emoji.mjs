// Build gate for emoji: enforce the FIRM-ONLY allowlist so only rock-solid,
// universally-supported emoji ship. Every emoji used anywhere — standalone emoji
// items AND the emoji part(s) of combos — must be:
//   * a SINGLE codepoint (no VS16/ZWJ sequences, no skin-tone modifiers, no
//     flags, no profession/family combos), and
//   * introduced in Emoji version <= CUTOFF (a conservative, easy-to-lower
//     constant), per official Unicode data (scripts/emoji-versions.mjs).
// Fails the build otherwise. (Emoji use the platform color-emoji font, not the
// kaomoji subset, so they are NOT run through check-font-coverage.mjs; the
// kaomoji characters of combos ARE.)
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { EMOJI_VERSION } from "./emoji-versions.mjs";
import { classifyText, emojiUsage } from "./kaomoji-glyphs.mjs";

// Firm cutoff: keep ONLY emoji introduced in this Emoji version or earlier.
// Lower this single constant to tighten the set further.
const CUTOFF = 5.0;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function firmness(seq) {
  const cps = [...seq].map((c) => c.codePointAt(0));
  const show = (arr) => arr.map((c) => "U+" + c.toString(16).toUpperCase()).join(" ");
  // Allow a single BASE emoji, optionally followed by VS16 (emoji presentation).
  // VS16-qualified emoji (❤️ ☀️ …) are universally supported. Still reject
  // ZWJ sequences, skin-tone modifiers, and flags.
  let base = cps;
  if (base[base.length - 1] === 0xfe0f) base = base.slice(0, -1);
  if (base.includes(0xfe0f)) return { firm: false, reason: `misplaced/extra VS16 (${show(cps)})` };
  if (base.includes(0x200d)) return { firm: false, reason: `ZWJ sequence not allowed (${show(cps)})` };
  if (base.some((c) => c >= 0x1f3fb && c <= 0x1f3ff))
    return { firm: false, reason: `skin-tone modifier not allowed (${show(cps)})` };
  if (base.some((c) => c >= 0x1f1e6 && c <= 0x1f1ff))
    return { firm: false, reason: `flag not allowed (${show(cps)})` };
  if (base.length !== 1)
    return { firm: false, reason: `not a single base codepoint (${show(cps)})` };
  const hex = base[0].toString(16).toUpperCase();
  const v = EMOJI_VERSION[hex];
  if (v === undefined) return { firm: false, reason: `U+${hex} is not a recognized emoji` };
  if (v > CUTOFF) return { firm: false, reason: `Emoji ${v} > cutoff ${CUTOFF}` };
  return { firm: true };
}

// Every distinct emoji used across emoji items + combo emoji-parts.
const usage = emojiUsage();
const nonFirm = [...usage].map(([s, sample]) => [s, sample, firmness(s)]).filter((x) => !x[2].firm);

// Emoji items must contain ONLY emoji codepoints — catches placeholders/boxes
// (e.g. U+FFFD/U+25A1) from a mangled write, which classify as non-emoji.
const emojiTexts = [
  ...readFileSync(join(ROOT, "data/emoji.ts"), "utf8").matchAll(/text:\s*"([^"]+)"/g),
].map((m) => m[1]);
const corrupted = emojiTexts
  .map((t) => [t, classifyText(t).kaomojiCps.filter((cp) => cp > 0x20)])
  .filter(([, bad]) => bad.length);

const seen = new Set();
const dupes = [...new Set(emojiTexts.filter((t) => (seen.has(t) ? true : (seen.add(t), false))))];

if (nonFirm.length || corrupted.length || dupes.length) {
  if (nonFirm.length) {
    console.error(`✗ ${nonFirm.length} non-firm emoji (must be single-codepoint, Emoji <= ${CUTOFF}):`);
    for (const [s, sample, r] of nonFirm) console.error(`  ${s}  — ${r.reason}  (in: ${sample})`);
    console.error("  Remove it, or re-point the combo to a firm emoji.");
  }
  if (corrupted.length) {
    console.error(`✗ ${corrupted.length} emoji item(s) contain non-emoji / placeholder codepoints:`);
    for (const [t, bad] of corrupted) {
      console.error(`  "${t}"  ->  ${bad.map((cp) => "U+" + cp.toString(16).toUpperCase()).join(" ")}`);
    }
  }
  if (dupes.length) console.error(`✗ duplicate emoji in data/emoji.ts: ${dupes.join(" ")}`);
  process.exit(1);
}

console.log(
  `✓ emoji check: all ${usage.size} distinct emoji are firm — single base codepoint (optional VS16), Emoji <= ${CUTOFF} (${emojiTexts.length} emoji items)`,
);
