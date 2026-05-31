/**
 * Split a string into runs of kaomoji line-art vs color emoji, so each run is
 * rendered in a font-family that can actually display it. This guarantees emoji
 * (incl. the emoji part of a combo) always sit in a COLOR-emoji-only element
 * (.emoji-glyph) and never in a mixed stack that could route them to a
 * monochrome/box font.
 */
import { KAOMOJI } from "@/data/kaomoji";

const EXT_PICT = /\p{Extended_Pictographic}/u;

// Codepoints the kaomoji dataset uses as LINE-ART symbols (e.g. ♥ ♡ ☆ ♪).
// They are Extended_Pictographic but belong to the bundled kaomoji subset font,
// NOT the color-emoji font — so they must not be treated as emoji when split.
// Derived from the data so it can never drift.
const KAOMOJI_PICT = new Set<number>();
for (const k of KAOMOJI) {
  for (const ch of k.text) {
    if (EXT_PICT.test(ch)) KAOMOJI_PICT.add(ch.codePointAt(0) as number);
  }
}

function isEmojiCodepoint(cp: number): boolean {
  return !KAOMOJI_PICT.has(cp) && EXT_PICT.test(String.fromCodePoint(cp));
}

export interface GlyphSegment {
  text: string;
  /** true → render with the color-emoji font; false → kaomoji subset font. */
  emoji: boolean;
}

export function splitGlyphSegments(text: string): GlyphSegment[] {
  const segments: GlyphSegment[] = [];
  for (const ch of text) {
    const cp = ch.codePointAt(0) as number;
    // Variation selector / ZWJ stay attached to the current (emoji) run.
    const emoji =
      ch === "️" || ch === "‍"
        ? segments.length > 0
          ? segments[segments.length - 1].emoji
          : true
        : isEmojiCodepoint(cp);
    const last = segments[segments.length - 1];
    if (last && last.emoji === emoji) last.text += ch;
    else segments.push({ text: ch, emoji });
  }
  return segments;
}
