"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getContinueWatching,
  addToContinueWatching,
  removeFromContinueWatching,
  type ContinueWatchingItem,
} from "@/lib/storage";

export function useContinueWatching() {
  const [items, setItems] = useState<ContinueWatchingItem[]>([]);

  useEffect(() => {
    setItems(getContinueWatching());
  }, []);

  const addItem = useCallback(
    (item: Omit<ContinueWatchingItem, "progress" | "duration" | "lastWatched">) => {
      addToContinueWatching(item);
      setItems(getContinueWatching());
    },
    []
  );

  const removeItem = useCallback((movieId: number) => {
    removeFromContinueWatching(movieId);
    setItems(getContinueWatching());
  }, []);

  return { items, addItem, removeItem };
}