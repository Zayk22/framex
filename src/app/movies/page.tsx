import { Metadata } from "next";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/tmdb";
import MovieRow from "@/components/home/MovieRow";
import type { MovieRow as MovieRowType } from "@/types/movie";

export const metadata: Metadata = {
  title: "Movies | FRAMEX",
  description: "Browse our collection of popular, top-rated, and upcoming movies.",
};

export default async function MoviesPage() {
  const [popular, topRated, upcoming] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ]);

  const rows: MovieRowType[] = [
    { id: "popular", title: "Popular Movies", movies: popular },
    { id: "top-rated", title: "Top Rated", movies: topRated },
    { id: "upcoming", title: "Upcoming", movies: upcoming },
  ];

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 mb-8">
        <h1 className="font-display text-display text-white">Movies</h1>
        <p className="mt-2 text-body-lg text-matte-500">
          Discover popular, top-rated, and upcoming films.
        </p>
      </div>
      {rows.map((row) => (
        <MovieRow key={row.id} title={row.title} movies={row.movies} />
      ))}
    </main>
  );
}