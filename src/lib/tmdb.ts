import type { Movie } from "@/types/movie";

// ============================================
// TMDB API CLIENT
// ============================================

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// ============================================
// HELPER: Build API URL
// ============================================
function buildUrl(endpoint: string, params: Record<string, string> = {}): string {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY || "");
  url.searchParams.set("language", "en-US");
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return url.toString();
}

// ============================================
// HELPER: Fetch with error handling
// ============================================
async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = buildUrl(endpoint, params);
  
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// HELPER: Transform TMDB movie to our Movie type
// ============================================
function transformMovie(tmdbMovie: any): Movie | null {
  if (!tmdbMovie.poster_path) {
    return null;
  }

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title || tmdbMovie.name,
    posterUrl: `${IMAGE_BASE_URL}/w500${tmdbMovie.poster_path}`,
    backdropUrl: tmdbMovie.backdrop_path
      ? `${IMAGE_BASE_URL}/original${tmdbMovie.backdrop_path}`
      : undefined,
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    year: new Date(tmdbMovie.release_date || tmdbMovie.first_air_date).getFullYear() || 0,
    genres: tmdbMovie.genre_ids ? [] : tmdbMovie.genres?.map((g: any) => g.name) || [],
    description: tmdbMovie.overview,
    quality: tmdbMovie.vote_average > 8 ? "4K UHD" : "HD",
    type: tmdbMovie.media_type || "movie",
  };
}

// ============================================
// API FUNCTIONS
// ============================================

export async function getTrendingMovies(): Promise<Movie[]> {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>("/trending/movie/week"),
    fetchFromTMDB<{ results: any[] }>("/trending/movie/week", { page: "2" }),
  ]);
  
  return [...page1.results, ...page2.results]
    .map(transformMovie)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}

export async function getPopularMovies(): Promise<Movie[]> {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>("/movie/popular"),
    fetchFromTMDB<{ results: any[] }>("/movie/popular", { page: "2" }),
  ]);
  
  return [...page1.results, ...page2.results]
    .map(transformMovie)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>("/movie/top_rated"),
    fetchFromTMDB<{ results: any[] }>("/movie/top_rated", { page: "2" }),
  ]);
  
  return [...page1.results, ...page2.results]
    .map(transformMovie)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>("/movie/upcoming"),
    fetchFromTMDB<{ results: any[] }>("/movie/upcoming", { page: "2" }),
  ]);
  
  return [...page1.results, ...page2.results]
    .map(transformMovie)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 12);
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const [page1, page2] = await Promise.all([
    fetchFromTMDB<{ results: any[] }>("/search/movie", { query }),
    fetchFromTMDB<{ results: any[] }>("/search/movie", { query, page: "2" }),
  ]);
  
  return [...page1.results, ...page2.results]
    .map(transformMovie)
    .filter((movie): movie is Movie => movie !== null)
    .slice(0, 20);
}

export async function getMovieDetails(movieId: number): Promise<Movie | null> {
  try {
    const data = await fetchFromTMDB<any>(`/movie/${movieId}`);
    return transformMovie(data);
  } catch {
    return null;
  }
}

export function getImageUrl(path: string, size: "w500" | "original" = "w500"): string {
  return `${IMAGE_BASE_URL}/${size}${path}`;
}