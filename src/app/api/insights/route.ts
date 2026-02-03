import { NextResponse } from "next/server";
import { orchestrator, AgentTask } from "@/agents";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, type = "general" } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // Determine which agents to use based on query type
    const tasks: AgentTask[] = [];
    const queryLower = query.toLowerCase();

    // Always include data agent
    if (queryLower.includes("player")) {
      tasks.push({ id: "data-players", type: "data", query: "players" });
      tasks.push({ id: "rank-players", type: "ranking", query: "player:value" });
    }
    
    if (queryLower.includes("club")) {
      tasks.push({ id: "data-clubs", type: "data", query: "clubs" });
      tasks.push({ id: "rank-clubs", type: "ranking", query: "club:value" });
    }

    if (queryLower.includes("market") || queryLower.includes("value")) {
      tasks.push({ id: "analytics-market", type: "analytics", query: "market" });
    }

    // Always include insights
    tasks.push({ id: "insights", type: "insights", query: "market" });

    // If no specific tasks, add general ones
    if (tasks.length === 1) {
      tasks.unshift({ id: "data-players", type: "data", query: "players" });
      tasks.unshift({ id: "analytics-market", type: "analytics", query: "market" });
    }

    // Execute agents in parallel
    const result = await orchestrator.executeParallel(tasks);

    return NextResponse.json({
      success: true,
      taskId: result.taskId,
      results: result.results.map(r => ({
        agent: r.agent,
        status: r.status,
        duration: r.duration,
        cached: r.cached,
        dataPreview: Array.isArray(r.data) 
          ? `${(r.data as any[]).length} items`
          : typeof r.data,
      })),
      totalDuration: result.totalDuration,
      synthesizedResponse: result.synthesizedResponse,
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
