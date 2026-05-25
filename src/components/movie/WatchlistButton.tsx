"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import { Check, Plus } from "lucide-react";
import type { Movie } from "@/types/movie";

interface WatchlistButtonProps {
  movie: Movie;
}

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { isAdded, toggle } = useWatchlist(movie.id);

  return (
    <button
      onClick={() =>
        toggle({
          movieId: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          year: movie.year,
          rating: movie.rating,
          type: movie.type,
        })
      }
      className={`flex items-center gap-2.5 rounded-lg border px-8 py-3.5 text-body font-medium backdrop-blur-sm transition-all duration-300 ${
        isAdded
          ? "border-crimson-DEFAULT bg-crimson-DEFAULT/20 text-crimson-DEFAULT"
          : "border-matte-700 bg-matte-900/50 text-white hover:border-matte-600 hover:bg-matte-800/50"
      }`}
    >
      {isAdded ? <Check size={20} /> : <Plus size={20} />}
      {isAdded ? "Saved" : "Add to Watchlist"}
    </button>
  );
}