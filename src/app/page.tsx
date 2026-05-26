import AuthGate from "@/components/home/AuthGate";
import ContinueWatchingRow from "@/components/home/ContinueWatchingRow";
import Hero from "@/components/home/Hero";
import MovieRow from "@/components/home/MovieRow";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/tmdb";
import type { MovieRow as MovieRowType } from "@/types/movie";

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  const featuredMovie = trending[0] || null;

  const rows: MovieRowType[] = [
    { id: "trending", title: "Trending Now", movies: trending },
    { id: "popular", title: "Popular on FRAMEX", movies: popular },
    { id: "top-rated", title: "Top Rated Films", movies: topRated },
  ];

  return (
    <main>
      <AuthGate />
      <Hero featuredMovie={featuredMovie} />
      <div className="relative z-20 -mt-16">
        <ContinueWatchingRow />
        {rows.map((row) => (
          <MovieRow key={row.id} title={row.title} movies={row.movies} />
        ))}
      </div>
      <section className="flex min-h-[50vh] items-center justify-center px-6">
        <p className="text-body-lg text-matte-600">
          More sections coming soon...
        </p>
      </section>
    </main>
  );
}