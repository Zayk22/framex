import AuthGate from "@/components/home/AuthGate";
import ContinueWatchingRow from "@/components/home/ContinueWatchingRow";
import Hero from "@/components/home/Hero";
import MovieCard from "@/components/movie/MovieCard";
import { getContent } from "@/lib/contentData";
import type { ContentItem } from "@/types/content";

function toMovie(item: ContentItem) {
  return {
    id: Number(item.id),
    title: item.title,
    posterUrl: item.posterUrl,
    backdropUrl: item.backdropUrl,
    rating: item.rating ?? 0,
    year: 2026,
    duration: item.duration,
    genres: item.genres,
    description: item.description,
    quality: "HD" as const,
    type: item.type,
    slug: item.slug,
  };
}

export default async function Home() {
  const movies = await getContent("movie");

  // Take the first 3 movies for the hero carousel
  const featuredMovies = movies.slice(0, 3);

  return (
    <main>
      <AuthGate />
      <Hero movies={featuredMovies.map(m => m ? toMovie(m) : null)} />

      <div className="relative z-20 -mt-16">
        <ContinueWatchingRow />

        {/* All Movies Section */}
        {movies.length > 0 && (
          <section className="py-6 sm:py-8">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
              <h2 className="font-display text-heading-3 sm:text-heading-2 lg:text-heading-3 font-semibold text-white mb-4">
                Movies
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((item, index) => (
                  <MovieCard
                    key={item.id}
                    movie={toMovie(item)}
                    index={index}
                    slug={item.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <section className="flex min-h-[30vh] items-center justify-center px-6">
        <p className="text-body-lg text-matte-600">
          More content coming soon.
        </p>
      </section>
    </main>
  );
}