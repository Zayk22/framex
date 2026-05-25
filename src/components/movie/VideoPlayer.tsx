"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Movie } from "@/types/movie";

interface VideoPlayerProps {
  movie: Movie;
}

export default function VideoPlayer({ movie }: VideoPlayerProps) {
  const router = useRouter();
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        setIsLoading(true);
        const query = encodeURIComponent(`${movie.title} ${movie.year} trailer`);
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDdJIMErHwHNClJw2JFpGZpzZpHPEpuH78&type=video&maxResults=3`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const official = data.items.find((item: any) =>
              item.snippet.title.toLowerCase().includes("official")
            );
            setTrailerId(official ? official.id.videoId : data.items[0].id.videoId);
            return;
          }
        }
        
        setError("fallback");
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
        setError("fallback");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrailer();
  }, [movie.title, movie.year]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.title} ${movie.year} official trailer`
  )}`;

  return (
    <div className="relative h-screen w-screen bg-matte-black overflow-hidden">
      {/* ========== BACK BUTTON (above everything) ========== */}
      <button
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-matte-black/80 px-4 py-2.5 text-white backdrop-blur-md transition-colors hover:bg-matte-black"
      >
        <ArrowLeft size={18} />
        <span className="text-caption font-medium">Back</span>
      </button>

      {/* ========== YOUTUBE EMBED ========== */}
      {trailerId ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-matte-black">
          {movie.backdropUrl && (
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/50 to-matte-black/30" />

          <div className="relative z-10 text-center px-6">
            {isLoading ? (
              <>
                <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-matte-700 border-t-crimson-DEFAULT" />
                <p className="text-body-lg text-matte-400">Searching for trailer...</p>
              </>
            ) : (
              <>
                <p className="font-display text-heading-1 text-white mb-4">
                  {movie.title}
                </p>
                <p className="text-body text-matte-400 mb-8 max-w-md mx-auto">
                  {movie.description
  ? movie.description
  : "Enjoy the cinematic experience."}
                </p>
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-crimson-DEFAULT px-6 py-3 text-body font-semibold text-white shadow-glow-lg transition-all duration-300 hover:bg-crimson-dark"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Search on YouTube
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========== MOVIE TITLE ========== */}
      {trailerId && (
        <div className="absolute bottom-6 left-4 z-50">
          <h2 className="font-display text-heading-2 text-white drop-shadow-lg">
            {movie.title}
          </h2>
        </div>
      )}
    </div>
  );
}