import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentBySlug } from "@/lib/contentData";
import { ArrowLeft, Star, Clock, Calendar, Globe, Play } from "lucide-react";
import type { ContentItem } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug(slug);
  if (!content) return { title: "Not Found | Happu TV" };
  return { title: `${content.title} | Happu TV`, description: content.description };
}

export default async function TitleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContentBySlug(slug);

  if (!content) {
    notFound();
  }

  return (
    <main>
      {/* ========== BACKDROP SECTION ========== */}
      <section className="relative min-h-[70vh] flex items-end">
        {content.backdropUrl ? (
          <div className="absolute inset-0 z-0">
            <img
              src={content.backdropUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/70 to-matte-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-matte-black/80 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-matte-black via-matte-950 to-matte-900" />
        )}

        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 pb-16 pt-32 lg:px-12">
          <Link
            href={`/${content.type === "tv_show" ? "tv-shows" : content.type + "s"}`}
            className="mb-8 inline-flex items-center gap-2 text-caption text-matte-400 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to {content.type === "tv_show" ? "TV Shows" : content.type.charAt(0).toUpperCase() + content.type.slice(1) + "s"}
          </Link>

          <div className="max-w-2xl">
            <h1 className="font-display text-display-xl text-white">
              {content.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-caption text-matte-400">
              {content.rating && (
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-gold-DEFAULT" fill="currentColor" />
                  <span className="font-medium text-white">{content.rating}</span>
                  <span className="text-matte-500">/ 10</span>
                </div>
              )}

              {content.duration && (
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{content.duration}</span>
                </div>
              )}

              {content.language && content.language.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Globe size={14} />
                  <span>{content.language.join(", ")}</span>
                </div>
              )}

              <span className="rounded border border-matte-700 px-2 py-0.5 text-small text-matte-400 capitalize">
                {content.accessType}
              </span>
            </div>

            {content.genres.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                {content.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-matte-800 px-3 py-0.5 text-small text-matte-400"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {content.description && (
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-matte-300">
                {content.description}
              </p>
            )}

            {/* Cast & Director */}
            {content.cast && content.cast.length > 0 && (
              <div className="mt-6">
                <p className="text-caption font-semibold uppercase tracking-wider text-matte-400">
                  Cast
                </p>
                <p className="mt-1 text-caption text-matte-300">
                  {content.cast.join(", ")}
                </p>
              </div>
            )}
            {content.director && (
              <div className="mt-2">
                <p className="text-caption font-semibold uppercase tracking-wider text-matte-400">
                  Director
                </p>
                <p className="mt-1 text-caption text-matte-300">
                  {content.director}
                </p>
              </div>
            )}

            {/* Watch Now button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {content.videoEmbedUrl && (
                <Link
                  href={`/watch/title/${content.slug}`}
                  className="flex items-center gap-2.5 rounded-lg bg-crimson-DEFAULT px-8 py-3.5 text-body font-semibold text-white shadow-glow-lg transition-all duration-300 hover:bg-crimson-dark"
                >
                  <Play size={18} fill="currentColor" />
                  Watch Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SEASONS & EPISODES (TV Shows) ========== */}
      {content.type === "tv_show" && content.seasons && content.seasons.length > 0 && (
        <section className="bg-matte-950 px-6 py-12 lg:px-12">
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="font-display text-heading-2 text-white mb-6">Seasons & Episodes</h2>
            <div className="space-y-8">
              {content.seasons.map((season) => (
                <div key={season.seasonNumber} className="rounded-2xl border border-matte-800 bg-matte-900 p-6">
                  <h3 className="font-display text-heading-3 text-white">
                    {season.title || `Season ${season.seasonNumber}`}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {season.episodes.map((ep) => (
                      <div
                        key={ep.id}
                        className="flex items-center justify-between rounded-lg border border-matte-700 bg-matte-800 px-4 py-3"
                      >
                        <div>
                          <p className="text-caption font-medium text-white">
                            {ep.episodeNumber}. {ep.title}
                          </p>
                          <p className="text-small text-matte-500">{ep.duration}</p>
                        </div>
                        {ep.videoEmbedUrl && (
                          <Link
                            href={`/watch/title/${content.slug}?episode=${ep.slug}`}
                            className="flex items-center gap-2 rounded-lg bg-crimson-DEFAULT px-4 py-2 text-caption font-semibold text-white hover:bg-crimson-dark transition-colors"
                          >
                            <Play size={14} fill="currentColor" />
                            Play
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}