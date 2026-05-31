// Build gate for emoji: every emoji used anywhere in the library — standalone
// emoji items AND the emoji part(s) of combo items — must be on the approved,
// well-established allowlist (scripts/approved-emoji.mjs). Keeps risky brand-new
// emoji that tofu on older devices out. Also catches duplicate emoji items.
//
// Emoji render with the platform color-emoji font, NOT the kaomoji subset, so
// emoji characters are intentionally NOT run through check-font-coverage.mjs;
// the kaomoji characters of combos ARE (see scripts/kaomoji-glyphs.mjs).
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { APPROVED_EMOJI } from "./approved-emoji.mjs";
import { classifyText, emojiUsage } from "./kaomoji-glyphs.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const emojiTexts = [
  ...readFileSync(join(ROOT, "data/emoji.ts"), "utf8").matchAll(/text:\s*"([^"]+)"/g),
].map((m) => m[1]);

// Emoji used across emoji items + combo emoji-parts → must all be approved.
const usage = emojiUsage();
const notApproved = [...usage].filter(([seq]) => !APPROVED_EMOJI.has(seq));

// Corruption guard: every character of an emoji item must be a real emoji
// codepoint (Extended_Pictographic + VS16/ZWJ). Any non-emoji codepoint — esp.
// a placeholder/box like U+FFFD (replacement) or U+25A1 (white square) left by a
// mangled/non-UTF-8 write — would be classified as "kaomoji", so flag those.
const PLACEHOLDERS = new Set([0xfffd, 0xfffc, 0x25a1, 0x25af, 0xff1f]);
const corrupted = [];
for (const t of emojiTexts) {
  const { kaomojiCps } = classifyText(t);
  const bad = kaomojiCps.filter((cp) => cp > 0x20); // ignore plain spaces
  if (bad.length) {
    corrupted.push([t, bad.map((cp) => "U+" + cp.toString(16).toUpperCase())]);
  }
}
const placeholders = corrupted.filter(([, cps]) =>
  cps.some((h) => PLACEHOLDERS.has(parseInt(h.slice(2), 16))),
);

// Duplicate emoji items.
const seen = new Set();
const dupes = [...new Set(emojiTexts.filter((t) => (seen.has(t) ? true : (seen.add(t), false))))];

if (notApproved.length || dupes.length || corrupted.length) {
  if (corrupted.length) {
    console.error(
      `✗ ${corrupted.length} emoji item(s) contain non-emoji / placeholder codepoints` +
        (placeholders.length ? " (⚠ includes □/replacement-style placeholders — likely a corrupt write)" : "") +
        ":",
    );
    for (const [t, cps] of corrupted) console.error(`  "${t}"  ->  ${cps.join(" ")}`);
    console.error("  Emoji items must be real emoji codepoints (re-author as correct UTF-8).");
  }
  if (notApproved.length) {
    console.error(`✗ ${notApproved.length} emoji not on the approved well-established list:`);
    for (const [seq, sample] of notApproved) {
      const cps = [...seq]
        .map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase())
        .join(" ");
      console.error(`  ${seq}  (${cps})  in: ${sample}`);
    }
    console.error(
      "  Add it to scripts/approved-emoji.mjs ONLY if it is well-established and renders everywhere.",
    );
  }
  if (dupes.length) {
    console.error(`✗ duplicate emoji in data/emoji.ts: ${dupes.join(" ")}`);
  }
  process.exit(1);
}

console.log(
  `✓ emoji check: all ${usage.size} distinct emoji (emoji items + combos) are approved (${APPROVED_EMOJI.size} on the allowlist)`,
);
