import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Tv } from "lucide-react";
import { getPopularAnime } from "@/lib/jikan";
import MovieRow from "@/components/home/MovieRow";
import type { Movie } from "@/types/movie";

async function getAnimeById(id: number): Promise<Movie | null> {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    const anime = data.data;
    return {
      id: anime.mal_id,
      title: anime.title_english || anime.title,
      posterUrl: anime.images?.jpg?.large_image_url || "",
      backdropUrl: anime.images?.jpg?.large_image_url || "",
      rating: anime.score || 0,
      year: anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 0,
      genres: anime.genres?.map((g: any) => g.name) || [],
      description: anime.synopsis || "",
      quality: "HD",
      type: "anime",
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const anime = await getAnimeById(Number(id));
  return { title: anime ? `${anime.title} | FRAMEX` : "Anime | FRAMEX" };
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animeId = Number(id);
  const [anime, popularAnime] = await Promise.all([getAnimeById(animeId), getPopularAnime()]);

  if (!anime) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <Tv size={48} className="mx-auto mb-4 text-matte-600" />
          <h1 className="font-display text-display text-white">Anime Not Found</h1>
          <Link href="/anime" className="mt-6 inline-flex items-center gap-2 text-crimson-DEFAULT hover:underline">
            <ArrowLeft size={18} /> Back to Anime
          </Link>
        </div>
      </main>
    );
  }

  const relatedAnime = popularAnime.filter((a) => a.id !== anime.id).slice(0, 12);

  return (
    <main>
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img src={anime.backdropUrl || anime.posterUrl} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/70 to-matte-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-matte-black/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 pb-16 pt-32 lg:px-12">
          <Link href="/anime" className="mb-8 inline-flex items-center gap-2 text-caption text-matte-400 transition-colors duration-300 hover:text-white">
            <ArrowLeft size={18} /> Back to Anime
          </Link>
          <div className="max-w-2xl">
            <h1 className="font-display text-display-xl text-white">{anime.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-5 text-caption text-matte-400">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-gold-DEFAULT" fill="currentColor" />
                <span className="font-medium text-white">{anime.rating}</span>
                <span className="text-matte-500">/ 10</span>
              </div>
              {anime.year > 0 && <span>{anime.year}</span>}
              {anime.genres.slice(0, 3).map((g) => (
                <span key={g} className="rounded-full bg-matte-800 px-3 py-0.5 text-small text-matte-400">{g}</span>
              ))}
            </div>
            {anime.description && (
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-matte-300">{anime.description}</p>
            )}
            <div className="mt-8">
              <Link href={`/watch/${anime.id}`} className="inline-flex items-center gap-2.5 rounded-lg bg-crimson-DEFAULT px-8 py-3.5 text-body font-semibold text-white shadow-glow-lg transition-all duration-300 hover:bg-crimson-dark">
                ▶ Watch Trailer
              </Link>
            </div>
          </div>
        </div>
      </section>
      {relatedAnime.length > 0 && (
        <section className="bg-matte-950 pb-20">
          <MovieRow title="More Anime" movies={relatedAnime} />
        </section>
      )}
    </main>
  );
}