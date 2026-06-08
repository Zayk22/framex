"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Bell, Menu, X, Bookmark, User } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchOverlay from "@/components/layout/SearchOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv-shows" },
  //{ label: "Anime", href: "/anime" }, // removed for Happu TV
  { label: "Kids", href: "/kids" },
  { label: "Account", href: "/account" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
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

  const handleMobileLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? "bg-matte-black/95 backdrop-blur-md shadow-elevated" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 lg:px-12 lg:py-4">
          {/* LEFT */}
          <div className="flex items-center gap-6 lg:gap-10">
            <Link href="/" className="group flex-shrink-0">
              <img
                src="/logo.png"
                alt="Happu TV"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-caption font-medium text-matte-500 transition-colors duration-300 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2 text-matte-500 transition-colors duration-300 hover:text-white" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
              <kbd className="hidden rounded border border-matte-700 px-1.5 py-0.5 text-small text-matte-600 lg:inline-block">/</kbd>
            </button>

            <Link href="/watchlist" className="flex h-9 w-9 items-center justify-center rounded-full text-matte-500 transition-all duration-300 hover:text-white" aria-label="Watchlist">
              <Bookmark size={18} strokeWidth={1.5} />
            </Link>

            <button className="hidden text-matte-500 transition-colors duration-300 hover:text-white sm:block" aria-label="Notifications">
              <Bell size={20} strokeWidth={1.5} />
            </button>

            {/* Clerk User Button — shows when logged in */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9",
                    userButtonTrigger: "focus:shadow-none",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>

            {/* Show guest icon when not logged in */}
            <SignedOut>
              <Link
                href="/sign-in"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-matte-800 text-matte-500 transition-all duration-300 hover:bg-matte-700 hover:text-white"
                aria-label="Sign in"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            </SignedOut>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-matte-500 transition-colors hover:text-white lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="border-t border-matte-800 bg-matte-black/95 backdrop-blur-md lg:hidden">
            <div className="mx-auto max-w-screen-2xl px-4 py-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={handleMobileLinkClick} className="block py-3 text-body font-medium text-matte-300 transition-colors duration-200 hover:text-white">
                  {link.label}
                </Link>
              ))}
              <Link href="/watchlist" onClick={handleMobileLinkClick} className="block py-3 text-body font-medium text-matte-300 transition-colors duration-200 hover:text-white">
                My Watchlist
              </Link>
            </div>
          </nav>
        )}
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}