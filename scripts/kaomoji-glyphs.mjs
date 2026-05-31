// Canonical extractor for the glyphs the kaomoji dataset actually renders.
// Used by the font-coverage build check (scripts/check-font-coverage.mjs) and
// for generating the subset fonts. Single source of truth so the subset, the
// font, and the check can never drift.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data/kaomoji.ts");

/** Map of codepoint -> a sample kaomoji `text` that uses it. */
export function codepointSamples() {
  const src = readFileSync(DATA, "utf8");
  const re = /text:\s*"([^"]+)"/g;
  const samples = new Map();
  let m;
  while ((m = re.exec(src)) !== null) {
    for (const ch of m[1]) {
      const cp = ch.codePointAt(0);
      if (!samples.has(cp)) samples.set(cp, m[1]);
    }
  }
  return samples;
}

/** Sorted array of every codepoint used across all kaomoji `text` fields. */
export function datasetCodepoints() {
  return [...codepointSamples().keys()].sort((a, b) => a - b);
}

export const isAscii = (cp) => cp <= 0x7f;
export const hex = (cp) => "U+" + cp.toString(16).toUpperCase().padStart(4, "0");

// CLI: print the unique non-ASCII codepoints with a sample, for review.
if (process.argv[1] && process.argv[1].endsWith("kaomoji-glyphs.mjs")) {
  const samples = codepointSamples();
  const all = [...samples.keys()].sort((a, b) => a - b);
  const nonAscii = all.filter((cp) => !isAscii(cp));
  console.log(`total unique codepoints: ${all.length} (ASCII: ${all.length - nonAscii.length}, non-ASCII: ${nonAscii.length})`);
  console.log("non-ASCII codepoints used in the dataset:");
  for (const cp of nonAscii) {
    console.log(`  ${hex(cp).padEnd(8)} ${String.fromCodePoint(cp)}\t${samples.get(cp)}`);
  }
}
