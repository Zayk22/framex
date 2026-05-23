import { Metadata } from "next";
import { getFamilyMovies, getKidsTVShows } from "@/lib/tmdb";
import MovieRow from "@/components/home/MovieRow";
import type { MovieRow as MovieRowType } from "@/types/movie";

export const metadata: Metadata = {
  title: "Kids | FRAMEX",
  description: "Family-friendly movies and shows for kids of all ages.",
};

export default async function KidsPage() {
  const [movies, tvShows] = await Promise.all([
    getFamilyMovies(),
    getKidsTVShows(),
  ]);

  const rows: MovieRowType[] = [
    { id: "family-movies", title: "Family Movies", movies: movies },
    { id: "kids-tv", title: "Kids TV Shows", movies: tvShows },
  ];

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 mb-8">
        <h1 className="font-display text-display text-white">Kids</h1>
        <p className="mt-2 text-body-lg text-matte-500">
          Safe, fun, and family-friendly content for kids of all ages.
        </p>
      </div>

      {rows.map((row) => (
        <MovieRow key={row.id} title={row.title} movies={row.movies} />
      ))}

      <section className="flex min-h-[30vh] items-center justify-center">
        <p className="text-body-lg text-matte-600">
          More kids content coming soon...
        </p>
      </section>
    </main>
  );
}