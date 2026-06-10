"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ContentItem } from "@/types/content";

export default function WatchTitlePage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch content by slug (this would normally be a server component,
    // but for the watch page we need client-side due to dynamic embed)
    fetch(`/api/content?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const episodeSlug = searchParams.get("episode");
  let embedUrl = content?.videoEmbedUrl;

  // If it's a TV show and an episode is selected, use that episode's embed URL
  if (content?.type === "tv_show" && episodeSlug && content.seasons) {
    for (const season of content.seasons) {
      const episode = season.episodes.find((ep) => ep.slug === episodeSlug);
      if (episode?.videoEmbedUrl) {
        embedUrl = episode.videoEmbedUrl;
        break;
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-matte-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-matte-700 border-t-crimson-DEFAULT" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex h-screen items-center justify-center bg-matte-black">
        <p className="text-white">Content not found.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-matte-black">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allowFullScreen
          allow="autoplay"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-white">
          <p>No video source available for this content.</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-matte-black/80 px-4 py-2.5 text-white backdrop-blur-md transition-colors hover:bg-matte-black"
      >
        <ArrowLeft size={18} />
        <span className="text-caption font-medium">Back</span>
      </button>

      {/* Title overlay */}
      <div className="absolute top-4 right-4 z-50 text-right">
        <p className="text-caption text-matte-400">Now Playing</p>
        <h2 className="font-display text-heading-2 text-white drop-shadow-lg">
          {content.title}
        </h2>
      </div>
    </div>
  );
}