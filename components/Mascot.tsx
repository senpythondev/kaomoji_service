/**
 * Palette-kun — the site mascot. A simple, friendly paint-drop character.
 * Decorative by default (aria-hidden); pass a `label` to expose it to AT.
 */
export function Mascot({
  size = 64,
  className,
  label,
}: {
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* little tuft */}
      <path
        d="M32 3c2.4 3 4 5.2 4 7a4 4 0 0 1-8 0c0-1.8 1.6-4 4-7z"
        fill="var(--color-primary)"
      />
      {/* face */}
      <circle
        cx="32"
        cy="34"
        r="25"
        fill="var(--color-primary-soft)"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
      />
      {/* cheeks */}
      <circle cx="20" cy="39" r="3.6" fill="var(--color-accent)" opacity="0.75" />
      <circle cx="44" cy="39" r="3.6" fill="var(--color-accent)" opacity="0.75" />
      {/* eyes */}
      <circle cx="24" cy="31" r="2.8" fill="var(--color-ink)" />
      <circle cx="40" cy="31" r="2.8" fill="var(--color-ink)" />
      <circle cx="25" cy="30" r="0.9" fill="#ffffff" />
      <circle cx="41" cy="30" r="0.9" fill="#ffffff" />
      {/* smile */}
      <path
        d="M24 39c2.6 3.4 5.4 3.4 8 3.4S37.4 42.4 40 39"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
