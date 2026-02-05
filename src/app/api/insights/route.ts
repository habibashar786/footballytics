import { NextResponse } from "next/server";
import { orchestrator } from "@/agents";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // Execute orchestrator
    const result = await orchestrator.runQuery(query);

    return NextResponse.json({
      success: true,
      response: result.response,
      agents: result.agents.map(a => ({
        agent: a.agent,
        status: a.status,
        duration: a.duration,
        cached: a.cached,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Insights API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process insights request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method with query parameter",
  });
}
