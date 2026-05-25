"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  type WatchlistItem,
} from "@/lib/storage";

export function useWatchlist(movieId?: number) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  // Load watchlist on mount
  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  // Check if current movie is in watchlist
  useEffect(() => {
    if (movieId) {
      setIsAdded(isInWatchlist(movieId));
    }
  }, [movieId, watchlist]);

  // Toggle watchlist
  const toggle = useCallback(
    (item: Omit<WatchlistItem, "addedAt">) => {
      if (isInWatchlist(item.movieId)) {
        removeFromWatchlist(item.movieId);
      } else {
        addToWatchlist(item);
      }
      setWatchlist(getWatchlist());
      setIsAdded(!isAdded);
    },
    [isAdded]
  );

  // Remove from watchlist
  const remove = useCallback((id: number) => {
    removeFromWatchlist(id);
    setWatchlist(getWatchlist());
  }, []);

  return { watchlist, isAdded, toggle, remove };
}