import { NextResponse } from "next/server";
import { players } from "@/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");
  const position = searchParams.get("position");
  const club = searchParams.get("club");
  const sortBy = searchParams.get("sortBy") || "marketValue";

  try {
    const startTime = Date.now();
    let result = [...players];

    // Apply filters
    if (position) {
      result = result.filter(p => p.positionCategory === position);
    }
    if (club) {
      result = result.filter(p => p.clubId === club);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "goals":
          return b.stats.goals - a.stats.goals;
        case "assists":
          return b.stats.assists - a.stats.assists;
        case "rating":
          return b.stats.rating - a.stats.rating;
        case "age":
          return a.age - b.age;
        default:
          return b.marketValue - a.marketValue;
      }
    });

    const data = result.slice(0, limit);
    const duration = Date.now() - startTime;

    return NextResponse.json({
      data,
      meta: {
        total: data.length,
        cached: false,
        duration,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
