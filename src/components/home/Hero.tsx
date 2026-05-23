"use client";

import { motion } from "framer-motion";
import { Play, Plus, Star, Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Movie } from "@/types/movie";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

interface HeroProps {
  featuredMovie: Movie | null;
}

export default function Hero({ featuredMovie }: HeroProps) {
  const router = useRouter();

  // Fallback if no movie data
  const movie = featuredMovie;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* ========== BACKGROUND LAYER ========== */}
      <div className="absolute inset-0 z-0">
        {/* Backdrop image if available */}
        {movie?.backdropUrl ? (
          <>
            <img
              src={movie.backdropUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/60 to-matte-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-matte-black/90 via-matte-black/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="h-full w-full bg-gradient-to-br from-matte-black via-matte-950 to-matte-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-matte-black/80 via-transparent to-matte-black/40" />
          </>
        )}

        {/* Subtle accent glows */}
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-gold-DEFAULT opacity-[0.03] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-crimson-DEFAULT opacity-[0.04] blur-[100px]" />
      </div>

      {/* ========== CONTENT LAYER ========== */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 pt-20 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl">
          {/* Genre Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-block rounded-full border border-gold-DEFAULT/30 bg-gold-DEFAULT/10 px-4 py-1.5 text-small font-medium uppercase tracking-wider text-gold-soft">
              {movie ? "Featured Movie" : "Welcome to FRAMEX"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 font-display text-hero leading-none text-white"
          >
            {movie ? movie.title : "The Art of Cinema"}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-body-lg leading-relaxed text-matte-300"
          >
            {movie?.description ||
              "Experience storytelling at its finest. Discover award-winning films, exclusive originals, and timeless classics — all in stunning quality."}
          </motion.p>

          {/* Metadata Row */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-6 text-caption text-matte-500"
          >
            {movie?.rating && (
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-gold-DEFAULT" fill="currentColor" />
                <span className="font-medium text-white">{movie.rating}</span>
                <span className="text-matte-600">Rating</span>
              </div>
            )}

            {movie?.year > 0 && (
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-matte-600" />
                <span>{movie.year}</span>
              </div>
            )}

            {movie?.quality && (
              <span className="rounded border border-matte-700 px-2 py-0.5 text-small text-matte-400">
                {movie.quality}
              </span>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => movie && router.push(`/movie/${movie.id}`)}
              className="flex items-center gap-2.5 rounded-lg bg-crimson-DEFAULT px-8 py-3.5 text-body font-semibold text-white shadow-glow-lg transition-colors duration-300 hover:bg-crimson-dark"
            >
              <Play size={20} fill="currentColor" />
              Watch Now
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2.5 rounded-lg border border-matte-700 bg-matte-900/50 px-8 py-3.5 text-body font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-matte-600 hover:bg-matte-800/50"
            >
              <Plus size={20} />
              Add to Watchlist
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-matte-950 to-transparent" />
    </section>
  );
}