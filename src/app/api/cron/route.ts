import { NextResponse } from "next/server";

/**
 * Cron job endpoint for automated data updates
 * Runs daily via Vercel Cron
 */
export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    // Simple health check response for now
    // Full data ingestion can be added later
    
    const totalDuration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: "Cron job executed successfully",
      timestamp: new Date().toISOString(),
      duration: totalDuration,
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
