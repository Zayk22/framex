import { Metadata } from "next";
import { getTrendingTVShows, getPopularTVShows, getTopRatedTVShows } from "@/lib/tmdb";
import MovieRow from "@/components/home/MovieRow";
import type { MovieRow as MovieRowType } from "@/types/movie";

export const metadata: Metadata = {
  title: "TV Shows | FRAMEX",
  description: "Discover trending, popular, and top-rated TV shows.",
};

export default async function TVShowsPage() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingTVShows(),
    getPopularTVShows(),
    getTopRatedTVShows(),
  ]);

  const rows: MovieRowType[] = [
    { id: "trending-tv", title: "Trending TV Shows", movies: trending },
    { id: "popular-tv", title: "Popular TV Shows", movies: popular },
    { id: "top-rated-tv", title: "Top Rated TV Shows", movies: topRated },
  ];

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 mb-8">
        <h1 className="font-display text-display text-white">TV Shows</h1>
        <p className="mt-2 text-body-lg text-matte-500">
          Binge-worthy series, trending shows, and critically acclaimed TV.
        </p>
      </div>

      {rows.map((row) => (
        <MovieRow key={row.id} title={row.title} movies={row.movies} />
      ))}

      <section className="flex min-h-[30vh] items-center justify-center">
        <p className="text-body-lg text-matte-600">
          More TV categories coming soon...
        </p>
      </section>
    </main>
  );
}