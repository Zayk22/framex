import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Dark mode is our primary mode, controlled via CSS class
  darkMode: 'class',
  theme: {
    extend: {
      // ============================================
      // CINEMATIC COLOR SYSTEM
      // ============================================
      colors: {
        // Neutral Palette — Soft blacks & charcoals (NOT pure black)
        matte: {
          black: '#0A0A0A',  // Deepest tone, use sparingly
          950:   '#141414',  // Main background
          900:   '#1A1A1A',  // Card backgrounds, elevated surfaces
          800:   '#262626',  // Borders, subtle dividers
          700:   '#333333',  // Hover states, secondary elements
          600:   '#4D4D4D',  // Muted text on dark
          500:   '#808080',  // Secondary text
          300:   '#B3B3B3',  // Light mode secondary text
          200:   '#D9D9D9',  // Light mode card backgrounds
          100:   '#F2F2F2',  // Light mode background
          50:    '#FAFAFA',  // Light mode surface
        },
        // Primary Accent — Bold crimson for CTAs and highlights
        crimson: {
          DEFAULT: '#E50914', // Primary action color
          dark:    '#B20710', // Hover state
          deep:    '#8A0D12', // Active/pressed state
          50:      '#FCEBEC', // Light mode tint
        },
        // Premium Accent — Soft gold for luxury touches
        gold: {
          DEFAULT: '#D4AF37', // Premium badges, subtle accents
          soft:    '#F3E5AB', // Light gold backgrounds
          dark:    '#8A7322', // Gold text on light
        },
      },

      // ============================================
      // TYPOGRAPHY SYSTEM
      // ============================================
      fontFamily: {
        // Inter: clean, modern, highly legible. Perfect for UI and body.
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        // Playfair Display: elegant, cinematic. Reserved for headings only.
        display: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        // Named size scale for consistent hierarchy
        'hero':       ['4.5rem',  { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display':    ['3rem',    { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-1':  ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-2':  ['1.5rem',  { lineHeight: '2rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-3':  ['1.25rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        'body-lg':    ['1.125rem', { lineHeight: '1.75rem' }],
        'body':       ['1rem',     { lineHeight: '1.5rem' }],
        'caption':    ['0.875rem', { lineHeight: '1.25rem' }],
        'small':      ['0.75rem',  { lineHeight: '1rem' }],
      },

      // ============================================
      // SHADOWS — Creating depth on dark backgrounds
      // ============================================
      boxShadow: {
        // Gold glows for premium elements
        'glow-sm': '0 0 10px rgba(212, 175, 55, 0.15)',
        'glow-md': '0 0 20px rgba(212, 175, 55, 0.1), 0 4px 12px rgba(0, 0, 0, 0.5)',
        // Crimson glow for CTAs and interactive elements
        'glow-lg': '0 0 40px rgba(229, 9, 20, 0.15), 0 10px 25px rgba(0, 0, 0, 0.6)',
        // Standard elevation for cards and surfaces
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
        // Intense elevation for hover states
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.9)',
        // Subtle lift
        'lift': '0 4px 15px rgba(0, 0, 0, 0.5)',
      },

      // ============================================
      // SPACING EXTENSIONS
      // ============================================
      spacing: {
        '18':    '4.5rem',
        '88':    '22rem',
        '128':   '32rem',
        'screen-90': '90vh',
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        '4xl': '2rem',
      },

      // ============================================
      // ANIMATION DURATIONS
      // ============================================
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};

export default config;