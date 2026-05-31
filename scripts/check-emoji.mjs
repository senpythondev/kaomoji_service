// Build gate for emoji: ensure every emoji in data/emoji.ts is on the approved,
// well-established allowlist (scripts/approved-emoji.mjs) — so risky brand-new
// emoji that tofu on older devices can't slip in. Also catches duplicates.
//
// NOTE: emoji render with the platform color-emoji font, NOT the kaomoji subset,
// so they are intentionally NOT run through scripts/check-font-coverage.mjs.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { APPROVED_EMOJI } from "./approved-emoji.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(ROOT, "data/emoji.ts"), "utf8");
const texts = [...src.matchAll(/text:\s*"([^"]+)"/g)].map((m) => m[1]);

const notApproved = texts.filter((t) => !APPROVED_EMOJI.has(t));
const seen = new Set();
const dupes = texts.filter((t) => (seen.has(t) ? true : (seen.add(t), false)));

if (notApproved.length || dupes.length) {
  if (notApproved.length) {
    console.error(
      `✗ ${notApproved.length} emoji not on the approved well-established list:`,
    );
    for (const t of notApproved) {
      const cps = [...t]
        .map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase())
        .join(" ");
      console.error(`  ${t}  (${cps})`);
    }
    console.error(
      "  Add it to scripts/approved-emoji.mjs ONLY if it is well-established and renders everywhere.",
    );
  }
  if (dupes.length) {
    console.error(`✗ duplicate emoji in data/emoji.ts: ${[...new Set(dupes)].join(" ")}`);
  }
  process.exit(1);
}

console.log(
  `✓ emoji check: all ${texts.length} emoji are approved & unique (${APPROVED_EMOJI.size} on the allowlist)`,
);
