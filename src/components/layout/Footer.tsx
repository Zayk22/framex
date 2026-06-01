import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

// ============================================
// FOOTER LINK DATA — Centralized for easy editing
// ============================================

const footerLinks = [
  {
    title: "Browse",
    links: [
      { label: "Movies", href: "/movies" },
      { label: "TV Shows", href: "/tv-shows" },
      { label: "Kids", href: "/kids" },
      { label: "New & Popular", href: "/new" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Supported Devices", href: "/devices" },
      { label: "Streaming Quality", href: "/quality" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Preferences", href: "/cookies" },
      { label: "Corporate Information", href: "/corporate" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

// ============================================
// COMPONENT
// ============================================

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-matte-800 bg-matte-black">
      <div className="mx-auto max-w-screen-2xl px-6 py-16 lg:px-12">
        {/* ========== TOP SECTION: Brand + Links ========== */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-display text-heading-2 font-bold tracking-tight text-white">
                Happu TV
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-body text-matte-500">
              Premium streaming for movie lovers. Discover award-winning films,
              exclusive originals, and timeless classics.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-matte-900 text-matte-500 transition-all duration-300 hover:bg-matte-800 hover:text-white"
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-caption font-semibold uppercase tracking-wider text-matte-400">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-caption text-matte-500 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ========== DIVIDER ========== */}
        <div className="mt-12 border-t border-matte-800/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-small text-matte-600 sm:flex-row">
            <p>&copy; {currentYear} Happu TV. All rights reserved.</p>
            <p>
              Designed with precision. Built for cinema lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}