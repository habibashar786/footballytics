/**
 * FOOTBALLYTICS MULTI-AGENT SYSTEM
 * ================================
 *
 * Multi-agent architecture with Claude AI for insights generation.
 */

import { Player, Club, League } from "@/types";
import { players, clubs, leagues, fanSegments } from "@/data";
import { generateResponse, isAIConfigured } from "@/lib/ai";

// =============================================================================
// TYPES
// =============================================================================

export interface AgentResult<T = unknown> {
  agent: string;
  status: "success" | "error";
  data: T;
  duration: number;
  cached: boolean;
  timestamp: Date;
}

// =============================================================================
// DATA AGENT
// =============================================================================

export const dataAgent = {
  name: "Data Agent",

  async getPlayers(): Promise<AgentResult<Player[]>> {
    const start = Date.now();
    return {
      agent: this.name,
      status: "success",
      data: players,
      duration: Date.now() - start,
      cached: true,
      timestamp: new Date(),
    };
  },

  async getClubs(): Promise<AgentResult<Club[]>> {
    const start = Date.now();
    return {
      agent: this.name,
      status: "success",
      data: clubs,
      duration: Date.now() - start,
      cached: true,
      timestamp: new Date(),
    };
  },

  async getLeagues(): Promise<AgentResult<League[]>> {
    const start = Date.now();
    return {
      agent: this.name,
      status: "success",
      data: leagues,
      duration: Date.now() - start,
      cached: true,
      timestamp: new Date(),
    };
  },
};

// =============================================================================
// ANALYTICS AGENT
// =============================================================================

export const analyticsAgent = {
  name: "Analytics Agent",

  async calculateMarketStats(): Promise<AgentResult<{
    totalMarketValue: number;
    averagePlayerValue: number;
    topLeague: string;
  }>> {
    const start = Date.now();

    const totalMarketValue = clubs.reduce((sum, c) => sum + c.marketValue, 0);
    const averagePlayerValue = players.reduce((sum, p) => sum + p.marketValue, 0) / players.length;

    return {
      agent: this.name,
      status: "success",
      data: {
        totalMarketValue,
        averagePlayerValue,
        topLeague: "Premier League",
      },
      duration: Date.now() - start,
      cached: false,
      timestamp: new Date(),
    };
  },
};

// =============================================================================
// CONTEXT BUILDER
// =============================================================================

function formatValue(value: number): string {
  if (value >= 1_000_000_000) return `€${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(0)}M`;
  return `€${value.toLocaleString()}`;
}

function buildContext(
  playerData: Player[],
  clubData: Club[],
  leagueData: League[],
  marketStats: { totalMarketValue: number; averagePlayerValue: number; topLeague: string }
): string {
  const topPlayers = [...playerData]
    .sort((a, b) => b.marketValue - a.marketValue)
    .slice(0, 10)
    .map(p => `${p.name} (${p.clubName}, ${p.positionCategory}, ${formatValue(p.marketValue)}, ${p.stats.goals}g, rating ${p.stats.rating})`)
    .join("; ");

  const topClubs = [...clubData]
    .sort((a, b) => b.marketValue - a.marketValue)
    .slice(0, 10)
    .map(c => `${c.name} (${formatValue(c.marketValue)}, Rev ${formatValue(c.revenue)}, ${c.trophies} trophies)`)
    .join("; ");

  const leagueSummary = leagueData
    .map(l => `${l.name} (${formatValue(l.marketValue)}, ${l.totalClubs} clubs)`)
    .join("; ");

  const fans = fanSegments
    .map(f => `${f.region} ${(f.totalFans / 1_000_000).toFixed(0)}M fans`)
    .join(", ");

  return [
    `Top Players: ${topPlayers}`,
    `Top Clubs: ${topClubs}`,
    `Leagues: ${leagueSummary}`,
    `Market: Total ${formatValue(marketStats.totalMarketValue)}, Avg Player ${formatValue(marketStats.averagePlayerValue)}`,
    `Fans: ${fans}`,
  ].join("\n");
}

// =============================================================================
// INSIGHTS AGENT
// =============================================================================

const SYSTEM_PROMPT = `You are Footballytics AI, an elite football intelligence assistant. You have access to real-time data from our football analytics platform.

Use the provided context data to answer questions accurately. Reference specific numbers, player names, club names, and statistics from the data. Format your responses using markdown with headers, bold text, and lists for readability. Be concise but insightful.

If the user's question is outside the scope of football analytics, politely redirect them.`;

export const insightsAgent = {
  name: "Insights Agent",

  async generateInsights(query: string, context: string): Promise<AgentResult<string>> {
    const start = Date.now();

    if (!isAIConfigured()) {
      return {
        agent: this.name,
        status: "error",
        data: "AI assistant is not configured. Please add your Anthropic API key to .env.local to enable AI-powered insights.",
        duration: Date.now() - start,
        cached: false,
        timestamp: new Date(),
      };
    }

    try {
      const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n--- CURRENT DATA ---\n${context}`;
      const response = await generateResponse(fullSystemPrompt, query);

      return {
        agent: this.name,
        status: "success",
        data: response,
        duration: Date.now() - start,
        cached: false,
        timestamp: new Date(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return {
        agent: this.name,
        status: "error",
        data: `Failed to generate insights: ${message}`,
        duration: Date.now() - start,
        cached: false,
        timestamp: new Date(),
      };
    }
  },
};

// =============================================================================
// ORCHESTRATOR
// =============================================================================

export const orchestrator = {
  async runQuery(query: string): Promise<{
    agents: AgentResult[];
    response: string;
  }> {
    // Step 1: Gather data from agents in parallel
    const [playersResult, clubsResult, leaguesResult, marketResult] = await Promise.all([
      dataAgent.getPlayers(),
      dataAgent.getClubs(),
      dataAgent.getLeagues(),
      analyticsAgent.calculateMarketStats(),
    ]);

    // Step 2: Build context from gathered data
    const context = buildContext(
      playersResult.data,
      clubsResult.data,
      leaguesResult.data,
      marketResult.data
    );

    // Step 3: Generate insights with Claude
    const insightResult = await insightsAgent.generateInsights(query, context);

    return {
      agents: [playersResult, clubsResult, leaguesResult, marketResult, insightResult],
      response: insightResult.data,
    };
  },
};
