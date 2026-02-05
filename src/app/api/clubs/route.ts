import { NextResponse } from "next/server";
import { clubs } from "@/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50");
  const league = searchParams.get("league");
  const sortBy = searchParams.get("sortBy") || "marketValue";

  try {
    const startTime = Date.now();
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
      { error: "Failed to fetch clubs" },
      { status: 500 }
    );
  }
}
