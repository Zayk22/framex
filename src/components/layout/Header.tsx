"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, User, Bell } from "lucide-react";
import SearchOverlay from "@/components/layout/SearchOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv-shows" },
  { label: "Anime", href: "/anime" },
  { label: "Kids", href: "/kids" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: press "/" to open search
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (
      e.key === "/" &&
      document.activeElement?.tagName !== "INPUT" &&
      document.activeElement?.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-matte-black/95 backdrop-blur-md shadow-elevated"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-12">
          {/* LEFT: Logo + Navigation */}
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-1">
              <span className="font-display text-heading-3 font-bold tracking-tight text-crimson-DEFAULT transition-colors duration-300 group-hover:text-crimson-dark">
                FRAMEX
              </span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-caption font-medium text-matte-500 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-6">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-matte-500 transition-colors duration-300 hover:text-white"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
              {/* Keyboard shortcut hint */}
              <kbd className="hidden rounded border border-matte-700 px-1.5 py-0.5 text-small text-matte-600 lg:inline-block">
                /
              </kbd>
            </button>

            <button
              className="hidden text-matte-500 transition-colors duration-300 hover:text-white sm:block"
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={1.5} />
            </button>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-matte-800 text-matte-500 transition-all duration-300 hover:bg-matte-700 hover:text-white"
              aria-label="User profile"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}