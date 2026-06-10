import type { ContentItem, ContentType } from "@/types/content";

// ============================================
// REAL HAPPU TV CONTENT DATA
// ============================================

const PLACEHOLDER_CONTENT: ContentItem[] = [
  {
    id: "1", slug: "african-rhapsody", title: "African Rhapsody", type: "movie",
    description: "African Rhapsody is a compelling drama that explores love, ambition, and cultural identity against the vibrant backdrop of Africa. Through powerful storytelling and emotional performances, the film follows characters navigating personal struggles, family expectations, and the pursuit of dreams in a rapidly changing society. Rich in music, tradition, and heartfelt moments, African Rhapsody celebrates resilience and the spirit of hope.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/RAPSODY-MUYIWAGLOBAL-STILL.Still001.png",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/RAPSODY-MUYIWAGLOBAL-STILL.Still001.png",
    duration: "2 h : 45 min", language: ["English (US)"], genres: ["Drama", "African"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/71muabo3j3", rating: 0,
  },
  {
    id: "2", slug: "turn-it-up-with-big-b", title: "Turn it up with BIG B", type: "movie",
    description: "Turn It Up with BIG B is an energetic music-driven experience that celebrates rhythm, culture, and vibrant African sound. Hosted by BIG B, the show brings together powerful performances, engaging conversations, and unforgettable moments that keep audiences entertained from start to finish.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Turn-It-Up-Big-B-scaled.jpg",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Turn-It-Up-Big-B-scaled.jpg",
    duration: "1 h : 50 min", language: ["English (US)"], genres: ["Music", "Entertainment"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/88da3r24gf", rating: 0,
  },
  {
    id: "3", slug: "cbn-faith-nation", title: "CBN Faith Nation", type: "movie",
    description: "CBN Faith Nation is an inspiring faith-based program delivering uplifting messages, powerful testimonies, and engaging discussions centered on hope, spirituality, and Christian living. The show brings encouragement and insight to viewers seeking strength and inspiration in their daily lives.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/faithnation_1920x1080_v2-Thumbnail.png",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/faithnation_1920x1080_v2-Thumbnail.png",
    duration: "3 h : 33 min", language: ["English (US)"], genres: ["Faith", "Inspirational"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/ymn8l14bf8", rating: 0,
  },
  {
    id: "4", slug: "sinach", title: "SINACH", type: "movie",
    description: "SINACH is a globally recognized gospel artist known for her powerful worship music and inspirational performances. This feature captures unforgettable moments of praise, faith, and spiritual upliftment through her timeless songs and impactful ministry.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Sinach-Thumbnail.png",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Sinach-Thumbnail.png",
    duration: "1 h : 45 min", language: ["English (US)"], genres: ["Gospel", "Music"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/a7wg42zv43", rating: 0,
  },
  {
    id: "5", slug: "body-praise", title: "BODY PRAISE", type: "movie",
    description: "Body Praise is an uplifting and energetic gospel experience that blends music, movement, and spiritual expression. Through dynamic performances and vibrant praise sessions, the show inspires viewers to celebrate faith with joy and passion.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Body-Praise-Thumbnail.png",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Body-Praise-Thumbnail.png",
    duration: "2 h : 35 min", language: ["English (US)"], genres: ["Gospel", "Music"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/m5s04uxyna", rating: 0,
  },
  {
    id: "6", slug: "don-moen", title: "Don Moen", type: "movie",
    description: "Don Moen is a globally celebrated worship leader known for his timeless gospel music and inspiring ministry. This feature highlights powerful worship moments, heartfelt performances, and uplifting songs that have impacted audiences around the world.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/DON-Background.png",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/DON-Background.png",
    duration: "2 h : 15 min", language: ["English (US)"], genres: ["Gospel", "Music"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/4kvvngejl9", rating: 0,
  },
  {
    id: "7", slug: "muyiwa-riversongz-live-o2", title: "Muyiwa & Riversongz Live @ O2", type: "movie",
    description: "Muyiwa & Riversongz Live @ O2 captures an electrifying night of worship and gospel celebration at one of the world's most iconic venues. Featuring powerful performances, vibrant praise, and unforgettable musical moments, this live experience brings audiences into an atmosphere of faith and inspiration.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Muyiwa-Riversongz-@-O2-thumbnail.png",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/Muyiwa-Riversongz-@-O2-thumbnail.png",
    duration: "1 h : 45 min", language: ["English (US)"], genres: ["Gospel", "Live Music"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/phkuz8unol", rating: 0,
  },
  {
    id: "8", slug: "tpi-show", title: "TPi Show", type: "movie",
    description: "The TPi Show delivers engaging conversations, dynamic performances, and insightful discussions that connect with audiences across different interests. Blending entertainment and meaningful dialogue, the show offers a fresh and compelling viewing experience.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/TPi-1.jpeg",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/TPi-1.jpeg",
    duration: "50 min", language: ["English (US)"], genres: ["Talk Show", "Entertainment"], accessType: "free",
    videoEmbedUrl: "https://fast.wistia.net/embed/iframe/uwetefphjm", rating: 0,
  },
  {
    id: "9", slug: "ccp", title: "Captain Crazy Praise", type: "movie",
    description: "Captain Crazy Praise is a vibrant and energetic gospel celebration that brings music, praise, and spiritual joy together in a dynamic experience for all ages.",
    posterUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/CCP_POSTER_COMING-SOON-1-2-scaled-e1771414834927.jpeg",
    backdropUrl: "https://watch.haaputv.com/wp-content/uploads/2026/02/CCP_POSTER_COMING-SOON-1-2-scaled-e1771414834927.jpeg",
    duration: "2 h : 15 min", language: ["English (UK)"], genres: ["Gospel", "Music"], accessType: "free",
    videoEmbedUrl: "https://www.youtube.com/embed/nOqaxC2y2Fs", rating: 5.0,
  },
];
// ============================================
// DATA ACCESS FUNCTIONS
// ============================================

export async function getContent(type?: ContentType): Promise<ContentItem[]> {
  let items = PLACEHOLDER_CONTENT;
  if (type) {
    items = items.filter((item) => item.type === type);
  }
  return items;
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  return PLACEHOLDER_CONTENT.find((item) => item.slug === slug) || null;
}

export async function getContentByGenre(genre: string): Promise<ContentItem[]> {
  return PLACEHOLDER_CONTENT.filter((item) =>
    item.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
  );
}

export async function searchContent(query: string): Promise<ContentItem[]> {
  const q = query.toLowerCase();
  return PLACEHOLDER_CONTENT.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  );
}

export async function getGenres(): Promise<string[]> {
  const genres = new Set<string>();
  PLACEHOLDER_CONTENT.forEach((item) => {
    item.genres.forEach((g) => genres.add(g));
  });
  return Array.from(genres).sort();
}