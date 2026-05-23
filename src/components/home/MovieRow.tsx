"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/movie/MovieCard";
import type { MovieRowProps } from "@/types/movie";

export default function MovieRow({ title, movies, isLoading = false }: MovieRowProps) {
  // Reference to the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position to show/hide navigation arrows
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Check scroll position to update arrow visibility
  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Can scroll left if we're not at the start
    setCanScrollLeft(container.scrollLeft > 10);
    
    // Can scroll right if we're not at the end
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    setCanScrollRight(!isAtEnd);
  }, []);

  // Listen for scroll events on the container
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    // Check initial state
    checkScroll();
    
    return () => container.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  // Scroll function — moves the row left or right
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Scroll by ~70% of container width for smooth navigation
    const scrollAmount = container.clientWidth * 0.7;
    const targetScroll = direction === "left"
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // ========== LOADING SKELETON ==========
  if (isLoading) {
    return (
      <section className="py-8">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          {/* Skeleton title */}
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-matte-800" />
          {/* Skeleton cards */}
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] w-[220px] flex-shrink-0 animate-pulse rounded-lg bg-matte-800"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ========== EMPTY STATE ==========
  if (!movies || movies.length === 0) {
    return null; // Don't render anything if no movies
  }

  // ========== MOVIE ROW ==========
  return (
    <section
      className="py-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        {/* Row Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-heading-3 font-semibold text-white">
            {title}
          </h2>
          <button className="text-caption font-medium text-matte-500 transition-colors duration-300 hover:text-crimson-DEFAULT">
            View All
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="relative group/row">
          {/* ===== LEFT ARROW ===== */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className={`absolute -left-3 top-0 z-20 flex h-full w-12 items-center justify-center transition-all duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Scroll left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-matte-900/90 text-white shadow-elevated backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                <ChevronLeft size={20} />
              </div>
            </button>
          )}

          {/* ===== MOVIE CARDS CONTAINER ===== */}
          <div
            ref={scrollContainerRef}
            className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-4"
          >
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>

          {/* ===== RIGHT ARROW ===== */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className={`absolute -right-3 top-0 z-20 flex h-full w-12 items-center justify-center transition-all duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Scroll right"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-matte-900/90 text-white shadow-elevated backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                <ChevronRight size={20} />
              </div>
            </button>
          )}

          {/* ===== FADE EDGES (Subtle) ===== */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-matte-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-matte-950 to-transparent" />
        </div>
      </div>
    </section>
  );
}