/**
 * Favorites storage layer (v1: device-local, no DB, no login).
 *
 * This is the ONLY place that touches the persistence medium. v1 stores favorite
 * item ids in localStorage, per-device. When v2 adds accounts, swap the body of
 * these functions for an account-synced backend (Supabase) — the public API
 * (read / toggle / isFavorite / subscribe) is what the UI depends on, so nothing
 * else needs to change.
 *
 * All functions are safe to call during SSR: they no-op / return empty when
 * `window` is unavailable. The UI must still read on the CLIENT after mount to
 * avoid hydration mismatches (see components/FavoritesProvider.tsx).
 */

const STORAGE_KEY = "kaomoji-palette:favorites:v1";
/** Same-tab change notification (the native `storage` event only fires cross-tab). */
const CHANGE_EVENT = "kaomoji-palette:favorites-changed";

/** Stable empty reference for SSR / unavailable-storage snapshots. */
const EMPTY: readonly string[] = [];

function canUseStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function parseFavorites(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Keep only strings, and de-dupe defensively.
    return [...new Set(parsed.filter((x): x is string => typeof x === "string"))];
  } catch {
    return [];
  }
}

/** Current favorite ids, newest-first. Empty array on SSR or if storage is unreadable. */
export function readFavorites(): string[] {
  if (!canUseStorage()) return [];
  return parseFavorites(window.localStorage.getItem(STORAGE_KEY));
}

// --- useSyncExternalStore support -----------------------------------------
// getSnapshot must return a STABLE reference while the underlying value is
// unchanged (else React loops). We cache the parsed array and only recompute
// when the raw stored string differs from last read.
let cachedRaw: string | null = null;
let cachedSnapshot: readonly string[] = EMPTY;
let cacheInitialized = false;

/** Cached client snapshot for useSyncExternalStore. */
export function getFavoritesSnapshot(): readonly string[] {
  if (!canUseStorage()) return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (cacheInitialized && raw === cachedRaw) return cachedSnapshot;
  cacheInitialized = true;
  cachedRaw = raw;
  cachedSnapshot = parseFavorites(raw);
  return cachedSnapshot;
}

/** Stable empty snapshot for SSR / first hydration render. */
export function getServerFavoritesSnapshot(): readonly string[] {
  return EMPTY;
}

function writeFavorites(ids: string[]): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Quota exceeded / private mode — favorites are non-critical, so ignore.
  }
  // Notify listeners in THIS tab (the `storage` event does not fire in the
  // tab that made the change).
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function isFavorite(id: string): boolean {
  return readFavorites().includes(id);
}

/**
 * Add or remove an id (newest-first). Returns the resulting state:
 * `true` if the item is now a favorite, `false` if it was removed.
 */
export function toggleFavorite(id: string): boolean {
  const current = readFavorites();
  const exists = current.includes(id);
  const next = exists ? current.filter((x) => x !== id) : [id, ...current];
  writeFavorites(next);
  return !exists;
}

/**
 * Subscribe to favorites changes (same-tab edits AND other-tab `storage` events).
 * Returns an unsubscribe function. No-op on the server.
 */
export function subscribeFavorites(callback: () => void): () => void {
  if (!canUseStorage()) return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}
