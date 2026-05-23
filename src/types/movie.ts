// ============================================
// MOVIE TYPE DEFINITIONS
// ============================================

// Represents a single movie/TV show item
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;      // Path to poster image
  backdropUrl?: string;   // Optional background image for hero
  rating: number;         // 0-10 scale (like TMDB)
  year: number;
  duration?: string;      // e.g., "2h 18m"
  genres: string[];
  description?: string;
  quality?: "4K UHD" | "HD" | "SD";
  type: "movie" | "tv" | "anime";
}

// Represents a collection/row of movies
export interface MovieRow {
  id: string;
  title: string;          // e.g., "Trending Now", "Continue Watching"
  movies: Movie[];
}

// Props for our MovieRow component
export interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}