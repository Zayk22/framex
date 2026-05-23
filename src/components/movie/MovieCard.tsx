"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import type { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      className="group relative flex-shrink-0 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/movie/${movie.id}`)}
      style={{ width: "220px" }}
    >
      {/* ========== POSTER IMAGE ========== */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-matte-800">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-matte-800" />
        )}

        {/* Actual poster image */}
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
        />

        {/* ========== HOVER OVERLAY ========== */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-matte-black/95 via-matte-black/40 to-transparent p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Play button */}
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
              <Play size={20} fill="white" className="ml-0.5" />
            </div>
          </div>

          {/* Movie info on hover */}
          <div className="space-y-1.5">
            <h3 className="text-body font-semibold text-white line-clamp-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-3 text-small text-matte-300">
              <span className="flex items-center gap-1">
                <Star size={12} className="text-gold-DEFAULT" fill="currentColor" />
                {movie.rating}
              </span>
              <span>{movie.year}</span>
              {movie.quality && (
                <span className="rounded border border-matte-600 px-1.5 py-0.5 text-[10px] text-matte-400">
                  {movie.quality}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {movie.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="text-[11px] text-matte-500">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========== CARD INFO (Visible when not hovering) ========== */}
      <motion.div
        className="mt-2 px-1"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-caption font-medium text-matte-300 line-clamp-1">
          {movie.title}
        </h3>
        <div className="mt-0.5 flex items-center gap-2 text-small text-matte-600">
          <span>{movie.year}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Star size={10} className="text-gold-DEFAULT" fill="currentColor" />
            {movie.rating}
          </span>
        </div>
      </motion.div>

      {/* ========== SCALE EFFECT ON HOVER ========== */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-white/0 transition-all duration-300 group-hover:ring-white/10"
        animate={{
          scale: isHovered ? 1.05 : 1,
          zIndex: isHovered ? 10 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ originY: 0.5 }}
      />
    </motion.div>
  );
}