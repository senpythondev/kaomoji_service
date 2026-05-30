import type { CSSProperties } from "react";

/**
 * Decorative hero backdrop — pure CSS/SVG, no raster (fast + copyright-clean).
 * A soft diagonal mint → very-light peach-pink gradient, plus faint kaomoji
 * "confetti" scattered behind the content. The whole layer is aria-hidden,
 * captures no pointer events, and is clipped to the hero, so it never affects
 * readability, layout, or LCP.
 */

type Confetti = {
  k: string;
  pos: CSSProperties;
  rotate: number;
  size: string;
  opacity: number;
  /** Extra responsive classes (e.g. desktop-only pieces). */
  className?: string;
};

// Biased to corners/edges so the slogan, subtext, search bar and mascot stay clear.
// The center pieces are desktop-only to keep the (narrower) mobile hero airy.
const CONFETTI: Confetti[] = [
  { k: "(◕‿◕)", pos: { top: "7%", left: "4%" }, rotate: -8, size: "1.6rem", opacity: 0.11 },
  { k: "(｡•ᴗ•｡)", pos: { top: "10%", right: "5%" }, rotate: 9, size: "1.5rem", opacity: 0.1 },
  { k: "＼(^o^)／", pos: { bottom: "10%", left: "6%" }, rotate: 6, size: "1.7rem", opacity: 0.1 },
  { k: "ʕ•ᴥ•ʔ", pos: { bottom: "14%", right: "7%" }, rotate: -10, size: "1.7rem", opacity: 0.11 },
  {
    k: "(*^ω^*)",
    pos: { top: "44%", left: "3%" },
    rotate: -5,
    size: "1.4rem",
    opacity: 0.09,
    className: "hidden sm:block",
  },
  {
    k: "(´∀｀)♡",
    pos: { top: "40%", right: "3%" },
    rotate: 8,
    size: "1.4rem",
    opacity: 0.09,
    className: "hidden sm:block",
  },
  {
    k: "(≧▽≦)",
    pos: { top: "5%", left: "47%" },
    rotate: -6,
    size: "1.5rem",
    opacity: 0.1,
    className: "hidden sm:block",
  },
  {
    k: "(・ω・)",
    pos: { bottom: "7%", left: "48%" },
    rotate: 7,
    size: "1.4rem",
    opacity: 0.1,
    className: "hidden sm:block",
  },
];

export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e8f7f0 0%, #eef6ff 50%, #fdeae3 100%)",
        }}
      />
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className={`kaomoji-glyph absolute select-none font-medium text-ink ${c.className ?? ""}`}
          style={{
            ...c.pos,
            transform: `rotate(${c.rotate}deg)`,
            fontSize: c.size,
            opacity: c.opacity,
          }}
        >
          {c.k}
        </span>
      ))}
    </div>
  );
}
