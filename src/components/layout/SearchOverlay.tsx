"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Film } from "lucide-react";
import type { Movie } from "@/types/movie";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset state when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search — waits 400ms after user stops typing
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Navigate to movie detail
  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-matte-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Search Panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-4"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 rounded-xl border border-matte-700 bg-matte-900 px-5 py-4 shadow-elevated">
              <Search size={20} className="text-matte-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search movies..."
                className="flex-1 bg-transparent text-body text-white placeholder-matte-500 outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-matte-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Results Dropdown */}
            {query.length >= 2 && (
              <motion.div
                className="mt-3 max-h-[60vh] overflow-y-auto rounded-xl border border-matte-700 bg-matte-900 shadow-elevated"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Loading State */}
                {isLoading && (
                  <div className="space-y-3 p-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-16 w-12 flex-shrink-0 animate-pulse rounded bg-matte-800" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-48 animate-pulse rounded bg-matte-800" />
                          <div className="h-3 w-24 animate-pulse rounded bg-matte-800" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && results.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Film size={32} className="text-matte-600 mb-3" />
                    <p className="text-body text-matte-500">No movies found</p>
                    <p className="text-caption text-matte-600 mt-1">
                      Try a different search term
                    </p>
                  </div>
                )}

                {/* Results */}
                {!isLoading &&
                  results.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors duration-200 hover:bg-matte-800"
                    >
                      {/* Poster thumbnail */}
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="h-16 w-12 flex-shrink-0 rounded object-cover"
                      />
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-caption font-medium text-white truncate">
                          {movie.title}
                        </p>
                        <p className="text-small text-matte-500 mt-0.5">
                          {movie.year} • ⭐ {movie.rating}
                        </p>
                      </div>
                    </button>
                  ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}