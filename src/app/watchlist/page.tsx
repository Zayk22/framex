"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Film } from "lucide-react";
import { getWatchlist, removeFromWatchlist, type WatchlistItem } from "@/lib/storage";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setItems(getWatchlist());
  }, []);

  const handleRemove = (movieId: number) => {
    removeFromWatchlist(movieId);
    setItems(getWatchlist());
  };

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-caption text-matte-400 transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Browse
        </Link>

        <h1 className="font-display text-display text-white">My Watchlist</h1>
        <p className="mt-2 text-body-lg text-matte-500">
          {items.length > 0
            ? `${items.length} ${items.length === 1 ? "title" : "titles"} saved`
            : "Your saved movies and shows will appear here."}
        </p>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Film size={48} className="text-matte-600 mb-4" />
            <p className="text-body-lg text-matte-500 mb-2">Your watchlist is empty</p>
            <p className="text-caption text-matte-600 mb-6">
              Click "Add to Watchlist" on any movie or show to save it here.
            </p>
            <Link
              href="/movies"
              className="rounded-lg bg-crimson-DEFAULT px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-crimson-dark"
            >
              Browse Movies
            </Link>
          </div>
        )}

        {/* Watchlist Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
            {items.map((item) => (
              <div key={item.movieId} className="group relative">
                {/* Poster */}
                <Link href={`/movie/${item.movieId}`}>
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-matte-800">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Title & Remove */}
                <div className="mt-2">
                  <Link
                    href={`/movie/${item.movieId}`}
                    className="text-caption font-medium text-matte-300 line-clamp-1 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-small text-matte-500">
                      {item.year} • ⭐ {item.rating}
                    </span>
                    <button
                      onClick={() => handleRemove(item.movieId)}
                      className="text-matte-600 hover:text-crimson-DEFAULT transition-colors"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}