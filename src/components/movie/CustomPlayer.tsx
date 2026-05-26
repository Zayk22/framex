"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowLeft,
  SkipForward,
  Settings,
} from "lucide-react";
import type { Movie } from "@/types/movie";
import { getDemoVideo } from "@/lib/demoVideos";
import { getContinueWatching, updateProgress, addToContinueWatching } from "@/lib/storage";

interface CustomPlayerProps {
  movie: Movie;
}

export default function CustomPlayer({ movie }: CustomPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState(0);

  const videoUrl = getDemoVideo(movie.id, movie.genres);

  // Restore saved progress
  useEffect(() => {
    const saved = getContinueWatching().find((item) => item.movieId === movie.id);
    if (saved && saved.progress > 0 && videoRef.current) {
      videoRef.current.currentTime = saved.progress;
    }
  }, [movie.id]);

  // Save progress every 5 seconds
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (videoRef.current) {
          const current = videoRef.current.currentTime;
          const total = videoRef.current.duration || 0;
          updateProgress(movie.id, current, total);
          addToContinueWatching({
            movieId: movie.id,
            title: movie.title,
            posterUrl: movie.posterUrl,
            year: movie.year,
            rating: movie.rating,
            type: movie.type,
          });
        }
      }, 5000);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, movie]);

  // Save on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        updateProgress(movie.id, videoRef.current.currentTime, videoRef.current.duration || 0);
      }
    };
  }, [movie.id]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      const saved = getContinueWatching().find((item) => item.movieId === movie.id);
      if (saved && saved.progress > 5 && saved.progress < videoRef.current.duration - 10) {
        videoRef.current.currentTime = saved.progress;
      }
      videoRef.current.play().catch(() => setIsLoading(false));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isPlaying) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      switch (e.key) {
        case " ": case "k": e.preventDefault(); togglePlay(); break;
        case "ArrowLeft": e.preventDefault(); skip(-10); break;
        case "ArrowRight": e.preventDefault(); skip(10); break;
        case "ArrowUp": e.preventDefault(); setVolume(v => Math.min(1, v + 0.1)); break;
        case "ArrowDown": e.preventDefault(); setVolume(v => Math.max(0, v - 0.1)); break;
        case "m": e.preventDefault(); setIsMuted(m => !m); break;
        case "f": e.preventDefault(); toggleFullscreen(); break;
        case "Escape": if (isFullscreen) toggleFullscreen(); else goBack(); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isFullscreen, volume]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
    resetHideTimer();
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      setCurrentTime(videoRef.current.currentTime);
      resetHideTimer();
    }
  };

  // Seek bar hover — shows time tooltip
  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || duration === 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(fraction * duration);
    setHoverPosition(e.clientX - rect.left);
  };

  const handleProgressLeave = () => {
    setHoverTime(null);
  };

  // Seek bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || duration === 0) return;
    e.stopPropagation();
    const rect = progressRef.current.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = fraction * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    resetHideTimer();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetHideTimer();
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Saved progress
  const savedItem = typeof window !== "undefined"
    ? getContinueWatching().find((item) => item.movieId === movie.id)
    : null;
  const hasSavedProgress = savedItem && savedItem.progress > 30;

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen bg-black overflow-hidden select-none"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center px-6">
            <p className="font-display text-heading-1 text-white mb-4">{movie.title}</p>
            <p className="text-body text-matte-400 mb-8">Video failed to load. Please try again.</p>
            <button onClick={goBack} className="flex items-center gap-2 mx-auto rounded-lg bg-crimson-DEFAULT px-6 py-3 text-body font-semibold text-white hover:bg-crimson-dark">
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
        </div>
      )}

      {/* Video element */}
      {!hasError && (
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 h-full w-full object-contain bg-black cursor-pointer"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onError={handleError}
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          playsInline
          preload="auto"
        />
      )}

      {/* Loading spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-crimson-DEFAULT" />
        </div>
      )}

      {/* Resume button */}
      {hasSavedProgress && !isPlaying && !isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 text-center">
          <p className="text-caption text-matte-400 mb-3">Resume from {formatTime(savedItem!.progress)}?</p>
          <button
            onClick={() => {
              if (videoRef.current && savedItem) {
                videoRef.current.currentTime = savedItem.progress;
                setCurrentTime(savedItem.progress);
                videoRef.current.play().catch(() => {});
                setIsPlaying(true);
              }
            }}
            className="rounded-lg bg-crimson-DEFAULT px-6 py-3 text-body font-semibold text-white hover:bg-crimson-dark transition-colors"
          >
            Resume
          </button>
        </div>
      )}

      {/* Top overlay */}
      <AnimatePresence>
        {showControls && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent px-4 sm:px-8 pt-4 pb-12"
          >
            <div className="flex items-center justify-between">
              <button onClick={(e) => { e.stopPropagation(); goBack(); }}
                className="flex items-center gap-2 text-white hover:text-crimson-DEFAULT transition-colors">
                <ArrowLeft size={20} /> <span className="text-caption font-medium">Back</span>
              </button>
              <div className="text-right">
                <p className="text-caption text-matte-400">Now Playing</p>
                <h2 className="font-display text-heading-3 sm:text-heading-2 text-white drop-shadow-lg">
                  {movie.title}
                </h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center play button */}
      <AnimatePresence>
        {!isPlaying && showControls && !isLoading && !hasError && !hasSavedProgress && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-crimson-DEFAULT/90 text-white shadow-glow-lg hover:scale-110 transition-transform"
          >
            <Play size={32} fill="white" className="ml-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom controls */}
      <AnimatePresence>
        {showControls && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/50 to-transparent px-4 sm:px-8 pb-4 sm:pb-6 pt-16"
          >
            {/* ===== PROGRESS BAR WITH TIME TOOLTIP ===== */}
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={handleProgressLeave}
              className="group relative mb-3 sm:mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/20 hover:h-2.5 transition-all"
            >
              {/* Loaded/buffered */}
              <div className="absolute top-0 left-0 h-full rounded-full bg-white/30" style={{ width: "100%" }} />
              {/* Played */}
              <div className="absolute top-0 left-0 h-full rounded-full bg-crimson-DEFAULT" style={{ width: `${progress}%` }} />
              {/* Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                style={{ left: `${progress}%`, marginLeft: "-8px" }} />

              {/* Time tooltip on hover */}
              {hoverTime !== null && (
                <div
                  className="absolute bottom-full mb-2 -translate-x-1/2 rounded bg-black/90 px-2 py-1 text-caption text-white whitespace-nowrap pointer-events-none"
                  style={{ left: `${hoverPosition}px` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>

            {/* ===== CONTROLS ROW ===== */}
            <div className="flex items-center justify-between gap-4">
              {/* Left side */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white hover:scale-110 transition-transform">
                  {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); skip(-10); }} className="hidden sm:flex items-center text-white/70 hover:text-white">
                  <SkipForward size={16} className="rotate-180" /><span className="text-caption ml-0.5">10</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); skip(10); }} className="hidden sm:flex items-center text-white/70 hover:text-white">
                  <SkipForward size={16} /><span className="text-caption ml-0.5">10</span>
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-white/70 hover:text-white">
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume}
                    onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-16 sm:w-20 h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white" />
                </div>

                {/* ===== TIME DISPLAY ===== */}
                <span className="text-caption text-white/80 tabular-nums ml-1 font-medium">
                  <span className="text-white">{formatTime(currentTime)}</span>
                  <span className="text-white/40 mx-1">/</span>
                  <span className="text-white/60">{formatTime(duration)}</span>
                </span>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu); }}
                    className="flex items-center gap-1 text-white/70 hover:text-white">
                    <Settings size={16} /><span className="text-caption hidden sm:inline">{playbackSpeed}x</span>
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 rounded-lg border border-white/10 bg-black/90 backdrop-blur-md py-1 shadow-elevated">
                      {speeds.map(s => (
                        <button key={s} onClick={(e) => { e.stopPropagation(); setPlaybackSpeed(s); setShowSpeedMenu(false); }}
                          className={`block w-full px-4 py-2 text-left text-caption hover:bg-white/10 ${playbackSpeed === s ? "text-crimson-DEFAULT" : "text-white"}`}>
                          {s}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-white/70 hover:text-white">
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}