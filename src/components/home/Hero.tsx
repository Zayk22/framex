"use client";

import { motion } from "framer-motion";
import { Play, Star, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Movie } from "@/types/movie";
import WatchlistButton from "@/components/movie/WatchlistButton";

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
  const movie = featuredMovie;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {movie?.backdropUrl ? (
          <>
            <img src={movie.backdropUrl} alt="" className="h-full w-full object-cover" />
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
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-gold-DEFAULT opacity-[0.03] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-crimson-DEFAULT opacity-[0.04] blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-6 pt-24 lg:pt-20 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl">
          <motion.div variants={itemVariants}>
            <span className="inline-block rounded-full border border-gold-DEFAULT/30 bg-gold-DEFAULT/10 px-3 py-1 sm:px-4 sm:py-1.5 text-small font-medium uppercase tracking-wider text-gold-soft">
              {movie ? "Featured Movie" : "Welcome to FRAMEX"}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-4 sm:mt-6 font-display text-display lg:text-hero leading-none text-white"
          >
            {movie ? movie.title : "The Art of Cinema"}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-6 max-w-lg text-body sm:text-body-lg leading-relaxed text-matte-300 hidden sm:block"
          >
            {movie?.description ||
              "Experience storytelling at its finest. Discover award-winning films, exclusive originals, and timeless classics — all in stunning quality."}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-3 max-w-lg text-caption leading-relaxed text-matte-400 sm:hidden"
          >
            {movie?.description
              ? movie.description.slice(0, 100) + "..."
              : "Award-winning films and exclusive originals in stunning quality."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-small sm:text-caption text-matte-500"
          >
            {movie?.rating && (
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-gold-DEFAULT" fill="currentColor" />
                <span className="font-medium text-white">{movie.rating}</span>
                <span className="text-matte-600 hidden sm:inline">Rating</span>
              </div>
            )}
            {movie?.year > 0 && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-matte-600" />
                <span>{movie.year}</span>
              </div>
            )}
            {movie?.quality && (
              <span className="rounded border border-matte-700 px-1.5 py-0.5 text-small text-matte-400">
                {movie.quality}
              </span>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4"
          >
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => movie && router.push(`/watch/${movie.id}`)}
              className="flex items-center gap-2.5 rounded-lg bg-crimson-DEFAULT px-6 sm:px-8 py-3 sm:py-3.5 text-body font-semibold text-white shadow-glow-lg transition-colors duration-300 hover:bg-crimson-dark w-full sm:w-auto justify-center"
            >
              <Play size={18} fill="currentColor" />
              Watch Now
            </motion.button>

            {movie && <WatchlistButton movie={movie} />}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-matte-950 to-transparent" />
    </section>
  );
}