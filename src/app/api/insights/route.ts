import { NextResponse } from "next/server";
import { orchestrator } from "@/agents";
import { isAIConfigured } from "@/lib/ai";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI not configured. Add ANTHROPIC_API_KEY to .env.local" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

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
    const message = error instanceof Error ? error.message : "Failed to process insights request";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method with query parameter",
    configured: isAIConfigured(),
  });
}
