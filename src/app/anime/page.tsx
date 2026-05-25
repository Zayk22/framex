import { Metadata } from "next";
import { getTrendingAnime, getPopularAnime, getTopRatedAnime } from "@/lib/jikan";
import MovieRow from "@/components/home/MovieRow";
import type { MovieRow as MovieRowType } from "@/types/movie";

export const metadata: Metadata = {
  title: "Anime | FRAMEX",
  description: "Explore trending, popular, and top-rated anime.",
};

export default async function AnimePage() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingAnime(),
    getPopularAnime(),
    getTopRatedAnime(),
  ]);

  const rows: MovieRowType[] = [
    { id: "trending-anime", title: "Trending Anime", movies: trending },
    { id: "popular-anime", title: "Popular Anime", movies: popular },
    { id: "top-rated-anime", title: "Top Rated Anime", movies: topRated },
  ];

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 mb-8">
        <h1 className="font-display text-display text-white">Anime</h1>
        <p className="mt-2 text-body-lg text-matte-500">
          Discover trending anime, fan favorites, and critically acclaimed series.
        </p>
      </div>
      {rows.map((row) => (
        <MovieRow key={row.id} title={row.title} movies={row.movies} />
      ))}
    </main>
  );
}