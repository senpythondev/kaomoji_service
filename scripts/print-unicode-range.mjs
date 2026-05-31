// Prints the CSS `unicode-range` value for the kaomoji subset font, derived from
// the exact kaomoji codepoints in the data. Paste the output into the
// @font-face "KaomojiText" rule in app/globals.css whenever the subset changes,
// so the font is scoped to ONLY the glyphs it contains (emoji always fall
// through to the color-emoji font).
import { datasetCodepoints } from "./kaomoji-glyphs.mjs";

const cps = datasetCodepoints();
const ranges = [];
let start = cps[0];
let prev = cps[0];
for (let i = 1; i < cps.length; i++) {
  if (cps[i] === prev + 1) {
    prev = cps[i];
    continue;
  }
  ranges.push([start, prev]);
  start = prev = cps[i];
}
ranges.push([start, prev]);

const h = (n) => "U+" + n.toString(16).toUpperCase();
const value = ranges
  .map(([a, b]) => (a === b ? h(a) : `${h(a)}-${b.toString(16).toUpperCase()}`))
  .join(", ");

console.log(`/* ${cps.length} codepoints, ${ranges.length} ranges */`);
console.log(`unicode-range: ${value};`);
