import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

  try {
    // Fetch 2 pages for more results
    const [page1, page2] = await Promise.all([
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      ),
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=2`
      ),
    ]);

    const data1 = await page1.json();
    const data2 = await page2.json();

    const allResults = [...(data1.results || []), ...(data2.results || [])];

    // Filter to movies with posters and transform
    const movies = allResults
      .filter((movie: any) => movie.poster_path)
      .map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : 0,
        rating: Math.round(movie.vote_average * 10) / 10,
      }))
      .slice(0, 20);

    return NextResponse.json({ results: movies });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}