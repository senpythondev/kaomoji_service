import { splitGlyphSegments } from "@/lib/glyphs";

/**
 * Renders a kaomoji / emoji / combo glyph, putting each emoji run in a
 * color-emoji-only element (.emoji-glyph) and each kaomoji run in the subset
 * font (.kaomoji-glyph). Emoji therefore NEVER inherit the general text stack
 * and can never resolve to a monochrome/box font.
 */
export function Glyph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const segments = splitGlyphSegments(text);
  return (
    <span className={className}>
      {segments.map((seg, i) => (
        <span key={i} className={seg.emoji ? "emoji-glyph" : "kaomoji-glyph"}>
          {seg.text}
        </span>
      ))}
    </span>
  );
}
