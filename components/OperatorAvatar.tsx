/**
 * Operator avatar for 風 — an original, simple kaomoji/mascot-style face that
 * matches the brand mark (sky-blue #3d8bf0, white face, ink eyes, peach cheeks,
 * a friendly smile). It is intentionally an illustrated avatar, NOT a photo. A
 * subtle wind swirl nods to the operator's name (風 = wind).
 *
 * Drawn full-bleed (square); wrap it in a `rounded-*` + `overflow-hidden`
 * container to get rounded corners.
 */
export function OperatorAvatar({
  size = 112,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="運営者・風のアバター"
    >
      <rect width="64" height="64" fill="#3d8bf0" />
      {/* wind swirls (風) */}
      <g
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M9 12c7 0 11-2 11-6" />
        <path d="M9 17c9 0 13-2 13-7" />
      </g>
      {/* face */}
      <circle cx="32" cy="35" r="17" fill="#ffffff" />
      {/* cheeks */}
      <circle cx="23" cy="39" r="2.6" fill="#f8917f" opacity="0.8" />
      <circle cx="41" cy="39" r="2.6" fill="#f8917f" opacity="0.8" />
      {/* eyes */}
      <circle cx="26" cy="33" r="2.1" fill="#1f2933" />
      <circle cx="38" cy="33" r="2.1" fill="#1f2933" />
      {/* smile */}
      <path
        d="M25 39c2.5 3 11.5 3 14 0"
        fill="none"
        stroke="#1f2933"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
