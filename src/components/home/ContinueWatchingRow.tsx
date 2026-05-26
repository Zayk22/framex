"use client";

import { useContinueWatching } from "@/hooks/useContinueWatching";
import MovieRow from "@/components/home/MovieRow";
import type { Movie } from "@/types/movie";

export default function ContinueWatchingRow() {
  const { items } = useContinueWatching();

  if (items.length === 0) return null;

  // Convert ContinueWatchingItem to Movie type for MovieRow
  const movies: Movie[] = items.map((item) => ({
    id: item.movieId,
    title: item.title,
    posterUrl: item.posterUrl,
    year: item.year,
    rating: item.rating,
    type: item.type,
    genres: [],
    description: "",
    quality: "HD",
  }));

  return <MovieRow title="Continue Watching" movies={movies} />;
}