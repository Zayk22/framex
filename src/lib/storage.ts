// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

const WATCHLIST_KEY = "happutv_watchlist";
const CONTINUE_WATCHING_KEY = "happutv_continue_watching";
const RECENTLY_WATCHED_KEY = "happutv_recently_watched";

// ============================================
// TYPES
// ============================================
export interface WatchlistItem {
  movieId: number;
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
  type: "movie" | "tv" | "anime";
  addedAt: number; // timestamp
}

export interface ContinueWatchingItem {
  movieId: number;
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
  type: "movie" | "tv" | "anime";
  progress: number; // seconds watched
  duration: number; // total duration
  lastWatched: number; // timestamp
}

// ============================================
// HELPER: Get/set from localStorage
// ============================================
function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

// ============================================
// WATCHLIST FUNCTIONS
// ============================================

export function getWatchlist(): WatchlistItem[] {
  return getStorageItem<WatchlistItem[]>(WATCHLIST_KEY, []);
}

export function addToWatchlist(item: Omit<WatchlistItem, "addedAt">): void {
  const list = getWatchlist();
  // Don't add duplicates
  if (list.find((i) => i.movieId === item.movieId)) return;
  list.unshift({ ...item, addedAt: Date.now() });
  // Keep max 50 items
  setStorageItem(WATCHLIST_KEY, list.slice(0, 50));
}

export function removeFromWatchlist(movieId: number): void {
  const list = getWatchlist().filter((i) => i.movieId !== movieId);
  setStorageItem(WATCHLIST_KEY, list);
}

export function isInWatchlist(movieId: number): boolean {
  return getWatchlist().some((i) => i.movieId === movieId);
}

// ============================================
// CONTINUE WATCHING FUNCTIONS
// ============================================

export function getContinueWatching(): ContinueWatchingItem[] {
  return getStorageItem<ContinueWatchingItem[]>(CONTINUE_WATCHING_KEY, []);
}

export function addToContinueWatching(item: Omit<ContinueWatchingItem, "progress" | "duration" | "lastWatched">): void {
  const list = getContinueWatching();
  // Remove if already exists
  const filtered = list.filter((i) => i.movieId !== item.movieId);
  filtered.unshift({
    ...item,
    progress: 0,
    duration: 0,
    lastWatched: Date.now(),
  });
  setStorageItem(CONTINUE_WATCHING_KEY, filtered.slice(0, 20));
}

export function updateProgress(movieId: number, progress: number, duration: number): void {
  const list = getContinueWatching();
  const item = list.find((i) => i.movieId === movieId);
  if (item) {
    item.progress = progress;
    item.duration = duration;
    item.lastWatched = Date.now();
    setStorageItem(CONTINUE_WATCHING_KEY, list);
  }
}

export function removeFromContinueWatching(movieId: number): void {
  const list = getContinueWatching().filter((i) => i.movieId !== movieId);
  setStorageItem(CONTINUE_WATCHING_KEY, list);
}