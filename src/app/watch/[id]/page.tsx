import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/contentData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getContentBySlug(id);

  if (!movie) {
    return { title: "Not Found | Happu TV" };
  }

  return {
    title: `Watch ${movie.title} | Happu TV`,
  };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getContentBySlug(id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-matte-black">
      <div className="relative h-screen w-screen">
        {movie.videoEmbedUrl ? (
          <iframe
            src={movie.videoEmbedUrl}
            className="absolute inset-0 h-full w-full"
            allowFullScreen
            allow="autoplay"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white">
            <p>No video source available for this content.</p>
          </div>
        )}
      </div>
    </main>
  );
}