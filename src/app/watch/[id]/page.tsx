import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/lib/tmdb";
import CustomPlayer from "@/components/movie/CustomPlayer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(Number(id));

  if (!movie) {
    return { title: "Not Found | FRAMEX" };
  }

  return {
    title: `Watch ${movie.title} | FRAMEX`,
  };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const movie = await getMovieDetails(movieId);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-matte-black">
      <CustomPlayer movie={movie} />
    </main>
  );
}