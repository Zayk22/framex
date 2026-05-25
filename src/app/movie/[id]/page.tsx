import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Calendar } from "lucide-react";
import { getMovieDetails, getPopularMovies } from "@/lib/tmdb";
import MovieRow from "@/components/home/MovieRow";
import WatchlistButton from "@/components/movie/WatchlistButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(Number(id));

  if (!movie) {
    return { title: "Movie Not Found | FRAMEX" };
  }

  return {
    title: `${movie.title} | FRAMEX`,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.description || "",
      images: [movie.posterUrl],
    },
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const [movie, popularMovies] = await Promise.all([
    getMovieDetails(movieId),
    getPopularMovies(),
  ]);

  if (!movie) {
    notFound();
  }

  const relatedMovies = popularMovies
    .filter((m) => m.id !== movie.id)
    .slice(0, 12);

  return (
    <main>
      <section className="relative min-h-[70vh] flex items-end">
        {movie.backdropUrl ? (
          <div className="absolute inset-0 z-0">
            <img
              src={movie.backdropUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/70 to-matte-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-matte-black/80 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-matte-black via-matte-950 to-matte-900" />
        )}

        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 pb-16 pt-32 lg:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-caption text-matte-400 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Browse
          </Link>

          <div className="max-w-2xl">
            <h1 className="font-display text-display-xl text-white">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-caption text-matte-400">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-gold-DEFAULT" fill="currentColor" />
                <span className="font-medium text-white">{movie.rating}</span>
                <span className="text-matte-500">/ 10</span>
              </div>

              {movie.year > 0 && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{movie.year}</span>
                </div>
              )}

              {movie.quality && (
                <span className="rounded border border-matte-700 px-2 py-0.5 text-small text-matte-400">
                  {movie.quality}
                </span>
              )}

              {movie.genres.length > 0 && (
                <div className="flex items-center gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-matte-800 px-3 py-0.5 text-small text-matte-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {movie.description && (
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-matte-300">
                {movie.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/watch/${movie.id}`}
                className="flex items-center gap-2.5 rounded-lg bg-crimson-DEFAULT px-8 py-3.5 text-body font-semibold text-white shadow-glow-lg transition-all duration-300 hover:bg-crimson-dark"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Link>
              <WatchlistButton movie={movie} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-matte-950 pb-20">
        <MovieRow title="More Like This" movies={relatedMovies} />
      </section>
    </main>
  );
}