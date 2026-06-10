import { Movie, MovieRow } from "@/types/movie";

// ============================================
// MOCK MOVIE DATA
// ============================================
// Using placeholder poster images from a free service
// In production, these would come from TMDB API

export const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l1Qm9NASKdAYOMjQFATWek.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    rating: 8.2,
    year: 2024,
    duration: "2h 46m",
    genres: ["Sci-Fi", "Adventure"],
    description: "Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family.",
    quality: "4K UHD",
    type: "movie",
  },
  {
    id: 2,
    title: "The Batman",
    posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    rating: 7.8,
    year: 2022,
    duration: "2h 56m",
    genres: ["Crime", "Action"],
    quality: "4K UHD",
    type: "movie",
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.4,
    year: 2014,
    duration: "2h 49m",
    genres: ["Sci-Fi", "Drama"],
    quality: "4K UHD",
    type: "movie",
  },
  {
    id: 4,
    title: "Parasite",
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    year: 2019,
    duration: "2h 12m",
    genres: ["Thriller", "Drama"],
    quality: "HD",
    type: "movie",
  },
  {
    id: 5,
    title: "Spider-Verse",
    posterUrl: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    rating: 8.4,
    year: 2018,
    duration: "1h 57m",
    genres: ["Animation", "Action"],
    quality: "4K UHD",
    type: "movie",
  },
  {
    id: 6,
    title: "Oppenheimer",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 8.1,
    year: 2023,
    duration: "3h 0m",
    genres: ["Drama", "History"],
    quality: "4K UHD",
    type: "movie",
  },
  {
    id: 7,
    title: "Joker",
    posterUrl: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    rating: 8.2,
    year: 2019,
    duration: "2h 2m",
    genres: ["Crime", "Drama"],
    quality: "HD",
    type: "movie",
  },
  {
    id: 8,
    title: "Inception",
    posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    rating: 8.4,
    year: 2010,
    duration: "2h 28m",
    genres: ["Action", "Sci-Fi"],
    quality: "4K UHD",
    type: "movie",
  },
];

// ============================================
// MOVIE ROWS (Sections)
// ============================================

export const movieRows: MovieRow[] = [
  {
    id: "trending",
    title: "Trending Now",
    movies: featuredMovies,
  },
  {
    id: "popular",
    title: "Popular on Happu TV",
    movies: [...featuredMovies].reverse(), // Shuffle for variety
  },
  {
    id: "award-winning",
    title: "Award-Winning Films",
    movies: featuredMovies.slice(3, 8),
  },
];