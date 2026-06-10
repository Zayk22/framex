"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export default function AuthGate() {
  const { isSignedIn, isLoaded } = useAuth();
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    // Check if user has dismissed the gate before
    const dismissed = localStorage.getItem("happutv_auth_gate_dismissed");
    if (!isSignedIn && !dismissed) {
      setShowGate(true);
    }
  }, [isSignedIn, isLoaded]);

  const handleGuest = () => {
    localStorage.setItem("happutv_auth_gate_dismissed", "true");
    setShowGate(false);
  };

  if (!showGate) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-matte-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-2xl border border-matte-800 bg-matte-900 p-8 shadow-elevated"
        >
          {/* Close button */}
          <button
            onClick={handleGuest}
            className="absolute top-4 right-4 text-matte-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <h2 className="font-display text-heading-1 text-white text-center mb-2">
            Happu TV
          </h2>
          <p className="text-body text-matte-400 text-center mb-8">
           Stream your favorite movies, videos, and TV shows.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/sign-in"
              className="block w-full rounded-lg bg-crimson-DEFAULT px-6 py-3.5 text-center text-body font-semibold text-white transition-colors hover:bg-crimson-dark"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="block w-full rounded-lg border border-matte-700 bg-matte-800 px-6 py-3.5 text-center text-body font-medium text-white transition-colors hover:bg-matte-700"
            >
              Create Account
            </Link>
            <button
              onClick={handleGuest}
              className="block w-full rounded-lg px-6 py-3.5 text-center text-caption text-matte-500 transition-colors hover:text-white"
            >
              Continue as Guest
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}