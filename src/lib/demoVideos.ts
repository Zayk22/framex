// ============================================
// DEMO VIDEO MAPPING
// Maps different movies to different public-domain videos
// from Internet Archive so it feels like real content
// ============================================

const DEMO_VIDEOS = {
  // Action/Sci-Fi movies
  action: [
    "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    "https://archive.org/download/ElephantsDream/ed_hd.mp4",
  ],
  // Anime
  anime: [
    "https://archive.org/download/Sintel/sintel-2048-surround.mp4",
  ],
  // General/Fallback
  default: [
    "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
  ],
};

// Map movie genres to video categories
function getCategory(genres: string[]): keyof typeof DEMO_VIDEOS {
  const genreStr = genres.join(" ").toLowerCase();
  if (genreStr.includes("anime") || genreStr.includes("animation")) return "anime";
  if (genreStr.includes("action") || genreStr.includes("sci-fi") || genreStr.includes("thriller")) return "action";
  return "default";
}

// Get a deterministic video URL based on movie ID
// Same movie always gets the same demo video
export function getDemoVideo(movieId: number, genres: string[]): string {
  const category = getCategory(genres);
  const videos = DEMO_VIDEOS[category];
  const index = movieId % videos.length;
  return videos[index];
}