import { NextResponse } from "next/server";
import { getOrSetCache } from "@/lib/cache";
import { clubs, getTopClubsByValue } from "@/data";

export const runtime = "edge";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");
  const league = searchParams.get("league");
  const sortBy = searchParams.get("sortBy") || "marketValue";

  try {
    const cacheKey = `list:${limit}:${league}:${sortBy}`;
    
    const { data, cached, duration } = await getOrSetCache(
      "clubs",
      cacheKey,
      async () => {
        let result = [...clubs];

        // Apply filters
        if (league) {
          result = result.filter(c => c.leagueId === league);
        }

        // Sort
        result.sort((a, b) => {
          switch (sortBy) {
            case "revenue":
              return b.revenue - a.revenue;
            case "trophies":
              return b.trophies - a.trophies;
            case "brandIndex":
              return b.brandIndex - a.brandIndex;
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
      { error: "Failed to fetch clubs" },
      { status: 500 }
    );
  }
}
