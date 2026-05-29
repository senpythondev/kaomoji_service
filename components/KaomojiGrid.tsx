import type { Kaomoji } from "@/data/kaomoji";
import { KaomojiCard } from "./KaomojiCard";

/**
 * Responsive grid of kaomoji cards: 2 columns on mobile, up to 4 on desktop
 * (per charter's multi-column requirement).
 */
export function KaomojiGrid({ items }: { items: Kaomoji[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {items.map((k) => (
        <li key={k.id}>
          <KaomojiCard kaomoji={k} />
        </li>
      ))}
    </ul>
  );
}
