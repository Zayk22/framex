// ============================================
// CONTENT TYPES — matches WordPress export structure
// ============================================

export type ContentType = "movie" | "video" | "tv_show";

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  description: string;
  posterUrl: string;
  backdropUrl?: string;
  duration?: string;         // e.g., "2 h : 15 min"
  language?: string[];
  genres: string[];
  tags?: string[];
  releaseDate?: string;
  accessType: "free" | "registered" | "premium";
  videoEmbedUrl?: string;    // iframe embed URL from boss's platform
  seasons?: Season[];        // for TV shows only
  rating?: number;           // 0-10
  cast?: string[];
  director?: string;
}

export interface Season {
  seasonNumber: number;
  title?: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  slug: string;
  description?: string;
  duration?: string;
  videoEmbedUrl?: string;
  episodeNumber: number;
}