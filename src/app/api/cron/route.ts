import { NextResponse } from "next/server";
import { ingestionOrchestrator, LEAGUES_CONFIG } from "@/agents/ingestion/orchestrator";

export const runtime = "edge";
export const maxDuration = 300; // 5 minutes max

/**
 * Cron job endpoint for automated data updates
 * Runs every 6 hours via Vercel Cron
 * 
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/update-data",
 *     "schedule": "0 */6 * * *"
 *   }]
 * }
 */
export async function GET(request: Request) {
  // Verify cron secret (prevent unauthorized access)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const startTime = Date.now();
  const results: {
    source: string;
    status: string;
    records: number;
    duration: number;
  }[] = [];

  try {
    console.log("[Cron] Starting data update...");

    // Initialize orchestrator
    await ingestionOrchestrator.initialize();

    // Add tasks for all configured leagues
    const allLeagues = [
      ...LEAGUES_CONFIG.european,
      ...LEAGUES_CONFIG.arabic,
      ...LEAGUES_CONFIG.international,
    ];

    // Add league update tasks
    allLeagues.forEach((league) => {
      ingestionOrchestrator.addTask({
        source: "football-data-org",
        type: "league",
        params: { leagueId: league.id, code: league.code },
        priority: 10,
        maxRetries: 3,
      });
    });

    // Execute all tasks
    const ingestionResults = await ingestionOrchestrator.executeAll();

    // Process results
    ingestionResults.forEach((result) => {
      results.push({
        source: result.source,
        status: result.errors.length === 0 ? "success" : "partial",
        records: result.recordsProcessed,
        duration: result.duration,
      });
    });

    const totalDuration = Date.now() - startTime;
    const successCount = results.filter((r) => r.status === "success").length;
    const totalRecords = results.reduce((sum, r) => sum + r.records, 0);

    console.log(`[Cron] Update complete: ${successCount}/${results.length} sources, ${totalRecords} records in ${totalDuration}ms`);

    return NextResponse.json({
      success: true,
      summary: {
        totalDuration,
        sourcesUpdated: successCount,
        totalSources: results.length,
        totalRecords,
        timestamp: new Date().toISOString(),
      },
      results,
    });
  } catch (error) {
    console.error("[Cron] Update failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
