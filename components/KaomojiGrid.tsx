import type { ContentItem } from "@/lib/content";
import { KaomojiCard } from "./KaomojiCard";

/**
 * Responsive grid of kaomoji/emoji cards: 2 columns on mobile, up to 4 on
 * desktop (per charter's multi-column requirement).
 */
export function KaomojiGrid({ items }: { items: ContentItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.id}>
          <KaomojiCard kaomoji={item} />
        </li>
      ))}
    </ul>
  );
}
