"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import type { Movie } from "@/types/movie";
import { useContinueWatching } from "@/hooks/useContinueWatching";

interface MovieCardProps {
  movie: Movie;
  index?: number;
  slug?: string; // NEW: optional slug for content items
}

export default function MovieCard({ movie, index = 0, slug }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const { addItem } = useContinueWatching();

  return (
    <motion.div
      className="group relative flex-shrink-0 cursor-pointer w-[150px] sm:w-[180px] lg:w-[220px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        addItem({
          movieId: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          year: movie.year,
          rating: movie.rating,
          type: movie.type,
        });
        if (slug) {
          // New content types use slug-based routing
          router.push(`/title/${slug}`);
        } else if (movie.type === "anime") {
          router.push(`/anime/${movie.id}`);
        } else {
          router.push(`/movie/${movie.id}`);
        }
      }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-matte-800">
        {!imageLoaded && <div className="absolute inset-0 z-10 animate-pulse bg-matte-800" />}
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-opacity duration-500"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
          decoding="async"
        />
        <motion.div
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-matte-black/95 via-matte-black/40 to-transparent p-3 sm:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        >
          <div className="mb-2 sm:mb-3 flex justify-center">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
              <Play size={18} fill="white" className="ml-0.5" />
            </div>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="text-small sm:text-body font-semibold text-white line-clamp-1">{movie.title}</h3>
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-small text-matte-300">
              <span className="flex items-center gap-1"><Star size={10} className="text-gold-DEFAULT" fill="currentColor" />{movie.rating}</span>
              <span>{movie.year}</span>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div className="mt-1.5 sm:mt-2 px-0.5 sm:px-1" animate={{ opacity: isHovered ? 0 : 1 }} transition={{ duration: 0.2 }}>
        <h3 className="text-small sm:text-caption font-medium text-matte-300 line-clamp-1">{movie.title}</h3>
        <div className="mt-0.5 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-small text-matte-600">
          <span>{movie.year}</span><span>•</span>
          <span className="flex items-center gap-1"><Star size={8} className="text-gold-DEFAULT" fill="currentColor" />{movie.rating}</span>
        </div>
      </motion.div>
      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-white/0 transition-all duration-300 group-hover:ring-white/10 group-hover:shadow-glow-md"
        animate={{ scale: isHovered ? 1.05 : 1, zIndex: isHovered ? 10 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originY: 0.5 }}
      />
    </motion.div>
  );
}