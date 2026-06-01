"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  getFavoritesSnapshot,
  getServerFavoritesSnapshot,
  subscribeFavorites,
  toggleFavorite as toggleInStore,
} from "@/lib/favorites";

interface FavoritesContextValue {
  /** Favorite ids, newest-first. Empty until `ready` (mounted + storage read). */
  ids: readonly string[];
  isFavorite: (id: string) => boolean;
  /** Toggle and return the new state (true = now favorited). */
  toggle: (id: string) => boolean;
  /** False during SSR and the first client paint; true once hydrated. */
  ready: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/** No-op subscribe for the hydration flag (its snapshot never changes after mount). */
const noopSubscribe = () => () => {};

/**
 * Holds the device-local favorites and keeps every favorite control in sync.
 *
 * Hydration-safe via useSyncExternalStore: the server snapshot is an empty list,
 * so the first client paint matches the SSR HTML; React then re-reads
 * localStorage after hydration. Cross-tab edits stay in sync through the store's
 * `storage`-event subscription.
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    getServerFavoritesSnapshot,
  );
  // Hydration flag: false on the server / first paint, true once on the client.
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const favSet = useMemo(() => new Set(ids), [ids]);
  const isFavorite = useCallback((id: string) => favSet.has(id), [favSet]);
  // toggleInStore dispatches a change event synchronously, which the store
  // subscription turns into a re-read — so the snapshot stays the source of truth.
  const toggle = useCallback((id: string) => toggleInStore(id), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ ids, isFavorite, toggle, ready }),
    [ids, isFavorite, toggle, ready],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}
