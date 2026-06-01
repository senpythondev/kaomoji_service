// Generates the raster brand icons WITHOUT any external image tooling:
//   - app/favicon.ico        (ICO embedding 16/32/48 PNGs)
//   - public/icon-192.png    (manifest)
//   - public/icon-512.png    (manifest)
//   - public/icon-maskable-512.png (manifest, extra safe-zone padding)
//
// The mark matches the site brand: a sky-blue (#3d8bf0) rounded square with the
// friendly mascot face (white face, ink eyes, peach cheeks, a smile). It is
// drawn per-pixel at 4× and box-downsampled for anti-aliasing. This is an
// original, simple mark — the PM can replace it with a designed asset later.
//
// Run: node scripts/build-icons.mjs   (re-run if the brand mark changes)
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const BRAND = [0x3d, 0x8b, 0xf0];
const FACE = [0xff, 0xff, 0xff];
const INK = [0x1f, 0x29, 0x33];
const CHEEK = [0xf8, 0x91, 0x7f];

// Draw the mark into an RGBA buffer at `s`×`s`. `pad` is the fraction of the
// canvas kept empty around the rounded square (used for the maskable safe zone).
// `square` fills the whole canvas as an opaque brand square with no rounded
// corners (used for the Apple touch icon, which iOS masks itself).
function drawRaw(s, pad, square = false) {
  const buf = new Uint8Array(s * s * 4); // transparent
  const x0 = pad * s;
  const y0 = pad * s;
  const x1 = s - x0;
  const y1 = s - y0;
  const w = x1 - x0;
  const br = square ? 0 : w * 0.24; // corner radius of the square

  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const faceR = w * 0.34;
  const eyeR = w * 0.05;
  const eyeY = cy - w * 0.05;
  const eyeDX = w * 0.13;
  const cheekR = w * 0.055;
  const cheekY = cy + w * 0.06;
  const cheekDX = w * 0.2;
  const smileR = w * 0.17;
  const smileY = cy - w * 0.01;
  const smileThk = w * 0.035;

  const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
  const inSquare = (x, y) => {
    if (x < x0 || x >= x1 || y < y0 || y >= y1) return false;
    const rx = Math.min(x - x0, x1 - x);
    const ry = Math.min(y - y0, y1 - y);
    if (rx >= br || ry >= br) return true;
    const dx = br - rx;
    const dy = br - ry;
    return dx * dx + dy * dy <= br * br;
  };

  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      if (!inSquare(px, py)) continue;
      let c = BRAND;
      if (dist(px, py, cx, cy) <= faceR) {
        c = FACE;
        if (
          dist(px, py, cx - cheekDX, cheekY) <= cheekR ||
          dist(px, py, cx + cheekDX, cheekY) <= cheekR
        )
          c = CHEEK;
      }
      if (
        dist(px, py, cx - eyeDX, eyeY) <= eyeR ||
        dist(px, py, cx + eyeDX, eyeY) <= eyeR
      )
        c = INK;
      const ds = dist(px, py, cx, smileY);
      if (py > smileY && Math.abs(ds - smileR) <= smileThk) c = INK;
      const i = (y * s + x) * 4;
      buf[i] = c[0];
      buf[i + 1] = c[1];
      buf[i + 2] = c[2];
      buf[i + 3] = 255;
    }
  }
  return buf;
}

// Render with 4× supersampling → smooth (anti-aliased) edges.
function render(size, pad = 0, square = false) {
  const ss = 4;
  const big = drawRaw(size * ss, pad, square);
  const out = new Uint8Array(size * size * 4);
  const bw = size * ss;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let dy = 0; dy < ss; dy++) {
        for (let dx = 0; dx < ss; dx++) {
          const i = ((y * ss + dy) * bw + (x * ss + dx)) * 4;
          const al = big[i + 3];
          r += big[i] * al;
          g += big[i + 1] * al;
          b += big[i + 2] * al;
          a += al;
        }
      }
      const oi = (y * size + x) * 4;
      const n = ss * ss;
      out[oi + 3] = Math.round(a / n);
      if (a > 0) {
        out[oi] = Math.round(r / a);
        out[oi + 1] = Math.round(g / a);
        out[oi + 2] = Math.round(b / a);
      }
    }
  }
  return out;
}

// --- PNG encoder (RGBA, 8-bit) --------------------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(size, rgba) {
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    Buffer.from(rgba.buffer, y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- ICO (embeds PNG images) ----------------------------------------------
function encodeICO(sizes) {
  const pngs = sizes.map((s) => encodePNG(s, render(s)));
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  sizes.forEach((s, i) => {
    const png = pngs[i];
    const e = i * 16;
    dir[e] = s >= 256 ? 0 : s; // width
    dir[e + 1] = s >= 256 ? 0 : s; // height
    dir[e + 2] = 0; // palette
    dir[e + 3] = 0; // reserved
    dir.writeUInt16LE(1, e + 4); // planes
    dir.writeUInt16LE(32, e + 6); // bit count
    dir.writeUInt32LE(png.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...pngs]);
}

writeFileSync(join(ROOT, "app/favicon.ico"), encodeICO([16, 32, 48]));
// Next.js app/ icon conventions (linked automatically in <head>).
writeFileSync(join(ROOT, "app/icon.png"), encodePNG(64, render(64)));
// Apple touch icon: full-bleed opaque square (iOS applies its own rounding).
writeFileSync(join(ROOT, "app/apple-icon.png"), encodePNG(180, render(180, 0, true)));
// Manifest (PWA) icons.
writeFileSync(join(ROOT, "public/icon-192.png"), encodePNG(192, render(192)));
writeFileSync(join(ROOT, "public/icon-512.png"), encodePNG(512, render(512)));
// Maskable: keep the mark inside the ~80% safe zone (10% padding each side).
writeFileSync(
  join(ROOT, "public/icon-maskable-512.png"),
  encodePNG(512, render(512, 0.1)),
);

console.log(
  "✓ icons written: app/favicon.ico, app/icon.png, app/apple-icon.png, public/icon-{192,512}.png, public/icon-maskable-512.png",
);
