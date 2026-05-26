"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import { useToast } from "@/components/ui/Toast";
import { Check, Plus } from "lucide-react";
import type { Movie } from "@/types/movie";

interface WatchlistButtonProps {
  movie: Movie;
}

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { isAdded, toggle } = useWatchlist(movie.id);
  const { showToast } = useToast();

  const handleClick = () => {
    toggle({
      movieId: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      year: movie.year,
      rating: movie.rating,
      type: movie.type,
    });
    showToast(
      isAdded ? "Removed from Watchlist" : "Added to Watchlist",
      "success"
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2.5 rounded-lg border px-6 sm:px-8 py-3 sm:py-3.5 text-body font-medium backdrop-blur-sm transition-all duration-300 w-full sm:w-auto justify-center ${
        isAdded
          ? "border-crimson-DEFAULT bg-crimson-DEFAULT/20 text-crimson-DEFAULT"
          : "border-matte-700 bg-matte-900/50 text-white hover:border-matte-600 hover:bg-matte-800/50"
      }`}
    >
      {isAdded ? <Check size={18} /> : <Plus size={18} />}
      {isAdded ? "Saved" : "Add to Watchlist"}
    </button>
  );
}