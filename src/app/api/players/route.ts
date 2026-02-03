import { NextResponse } from "next/server";
import { getOrSetCache } from "@/lib/cache";
import { players, getTopPlayersByValue } from "@/data";

export const runtime = "edge";
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");
  const position = searchParams.get("position");
  const club = searchParams.get("club");
  const sortBy = searchParams.get("sortBy") || "marketValue";

  try {
    const cacheKey = `list:${limit}:${position}:${club}:${sortBy}`;
    
    const { data, cached, duration } = await getOrSetCache(
      "players",
      cacheKey,
      async () => {
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

        return result.slice(0, limit);
      }
    );

    return NextResponse.json({
      data,
      meta: {
        total: data.length,
        cached,
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
