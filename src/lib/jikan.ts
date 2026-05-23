import type { Movie } from "@/types/movie";

// ============================================
// JIKAN API CLIENT (Anime)
// Free API — no key required
// ============================================

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

async function fetchFromJikan<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${JIKAN_BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Jikan API error: ${response.status}`);
  }

  return response.json();
}

function transformAnime(anime: any): Movie | null {
  if (!anime.images?.jpg?.large_image_url) {
    return null;
  }

  return {
    id: anime.mal_id,
    title: anime.title_english || anime.title,
    posterUrl: anime.images.jpg.large_image_url,
    backdropUrl: anime.images.jpg.large_image_url,
    rating: anime.score || 0,
    year: anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 0,
    genres: anime.genres?.map((g: any) => g.name) || [],
    description: anime.synopsis?.slice(0, 200) + "...",
    quality: anime.score > 8 ? "HD" : "HD",
    type: "anime",
  };
}

export async function getTrendingAnime(): Promise<Movie[]> {
  const data = await fetchFromJikan<{ data: any[] }>("/top/anime?filter=airing&limit=25");
  return data.data
    .map(transformAnime)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}

export async function getPopularAnime(): Promise<Movie[]> {
  const data = await fetchFromJikan<{ data: any[] }>("/top/anime?filter=bypopularity&limit=25");
  return data.data
    .map(transformAnime)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}

export async function getTopRatedAnime(): Promise<Movie[]> {
  const data = await fetchFromJikan<{ data: any[] }>("/top/anime?filter=favorite&limit=25");
  return data.data
    .map(transformAnime)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}