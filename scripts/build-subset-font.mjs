// Regenerate the self-hosted kaomoji subset font.
//
// Subsets a full Noto Sans JP source to ONLY the codepoints the dataset uses,
// keeping the variable weight axis, and writes public/fonts/kaomoji-subset.woff2.
//
// Requires fonttools (`pyftsubset`) + brotli, and a Noto Sans JP source TTF:
//   pip install fonttools brotli
//   node scripts/build-subset-font.mjs /path/to/NotoSansJP.ttf
// Source font: https://github.com/google/fonts (ofl/notosansjp), OFL licensed.
// Override the binary with PYFTSUBSET=... if pyftsubset is not on PATH.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { datasetCodepoints, hex } from "./kaomoji-glyphs.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = process.argv[2] || process.env.NOTO_SANS_JP_SRC;
if (!src) {
  console.error(
    "usage: node scripts/build-subset-font.mjs <NotoSansJP.ttf>  (or set NOTO_SANS_JP_SRC)",
  );
  process.exit(1);
}
const pyftsubset = process.env.PYFTSUBSET || "pyftsubset";
const outDir = join(ROOT, "public/fonts");
const out = join(outDir, "kaomoji-subset.woff2");
mkdirSync(outDir, { recursive: true });

const codepoints = datasetCodepoints();
const unicodes = codepoints.map(hex).join(",");

execFileSync(
  pyftsubset,
  [
    src,
    `--unicodes=${unicodes}`,
    "--flavor=woff2",
    `--output-file=${out}`,
    "--no-hinting",
    "--layout-features=",
    "--drop-tables+=DSIG",
  ],
  { stdio: "inherit" },
);
console.log(`wrote ${out} covering ${codepoints.length} codepoints`);
