// Build gate: verify the bundled kaomoji subset font actually contains a glyph
// for every codepoint the dataset renders. This replaces the old Unicode-RANGE
// allowlist (which could pass a codepoint that has no glyph in the visitor's
// fonts → tofu). Here we check the ACTUAL bundled font, so if a glyph is
// missing the build fails instead of shipping boxes.
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import { datasetCodepoints, codepointSamples, hex } from "./kaomoji-glyphs.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FONT = join(ROOT, "public/fonts/kaomoji-subset.woff2");
const open = fontkit.openSync ?? fontkit.default?.openSync;

function fail(msg) {
  console.error(`\n✗ font coverage check failed: ${msg}\n`);
  process.exit(1);
}

if (!existsSync(FONT)) {
  fail(
    `missing ${FONT}\n  Regenerate it: node scripts/build-subset-font.mjs <NotoSansJP.ttf>`,
  );
}

const font = open(FONT);
const codepoints = datasetCodepoints();
const samples = codepointSamples();
const missing = codepoints.filter((cp) => !font.hasGlyphForCodePoint(cp));

if (missing.length) {
  console.error(
    `✗ ${missing.length} kaomoji codepoint(s) are NOT covered by the bundled subset font:`,
  );
  for (const cp of missing) {
    console.error(`  ${hex(cp).padEnd(8)} ${String.fromCodePoint(cp)}\t${samples.get(cp)}`);
  }
  fail(
    "either add coverage (regenerate the subset from a font that has these glyphs)\n" +
      "  or replace the offending kaomoji in data/kaomoji.ts with covered equivalents.",
  );
}

console.log(
  `✓ font coverage: all ${codepoints.length} kaomoji codepoints are in public/fonts/kaomoji-subset.woff2`,
);
