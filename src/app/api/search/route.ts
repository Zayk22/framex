import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/contentData";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const content = await searchContent(query);

    // Map to the shape SearchOverlay expects
    const results = content.map((item) => ({
      id: item.id,
      title: item.title,
      posterUrl: item.posterUrl,
      year: item.releaseDate
        ? new Date(item.releaseDate).getFullYear()
        : new Date().getFullYear(),
      rating: item.rating ?? 0,
      slug: item.slug,      // <-- needed for navigation
      type: item.type,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}