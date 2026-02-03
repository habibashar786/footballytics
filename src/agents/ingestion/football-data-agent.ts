/**
 * FOOTBALL-DATA.ORG API AGENT
 * ===========================
 * 
 * Free API for football data.
 * Rate Limit: 10 requests/minute (free tier)
 * 
 * Endpoints:
 * - /competitions - List all competitions
 * - /competitions/{id}/teams - Teams in a competition
 * - /competitions/{id}/standings - Standings
 * - /competitions/{id}/scorers - Top scorers
 * - /competitions/{id}/matches - Matches
 * - /teams/{id} - Team details
 * - /persons/{id} - Player details
 */

import { IngestionResult } from "./orchestrator";

const BASE_URL = "https://api.football-data.org/v4";

interface FootballDataConfig {
  apiKey: string;
}

interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
}

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  coach: {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
  };
  squad: Player[];
}

interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  shirtNumber: number;
  marketValue: number;
}

interface Standing {
  position: number;
  team: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export class FootballDataAgent {
  private apiKey: string;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;

  constructor(config: FootballDataConfig) {
    this.apiKey = config.apiKey;
  }

  /**
   * Make an API request with rate limiting
   */
  private async fetch<T>(endpoint: string): Promise<T> {
    // Rate limiting: max 10 requests per minute
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < 6000) { // 6 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 6000 - timeSinceLastRequest));
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "X-Auth-Token": this.apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all available competitions
   */
  async getCompetitions(): Promise<Competition[]> {
    const data = await this.fetch<{ competitions: Competition[] }>("/competitions");
    return data.competitions;
  }

  /**
   * Get competition details
   */
  async getCompetition(code: string): Promise<Competition> {
    const data = await this.fetch<Competition>(`/competitions/${code}`);
    return data;
  }

  /**
   * Get teams in a competition
   */
  async getTeams(competitionCode: string): Promise<Team[]> {
    const data = await this.fetch<{ teams: Team[] }>(`/competitions/${competitionCode}/teams`);
    return data.teams;
  }

  /**
   * Get standings for a competition
   */
  async getStandings(competitionCode: string): Promise<Standing[]> {
    const data = await this.fetch<{ standings: { table: Standing[] }[] }>(
      `/competitions/${competitionCode}/standings`
    );
    return data.standings[0]?.table || [];
  }

  /**
   * Get top scorers for a competition
   */
  async getTopScorers(competitionCode: string, limit: number = 20): Promise<{
    player: Player;
    team: { id: number; name: string };
    goals: number;
    assists: number;
  }[]> {
    const data = await this.fetch<{ scorers: any[] }>(
      `/competitions/${competitionCode}/scorers?limit=${limit}`
    );
    return data.scorers;
  }

  /**
   * Get team details
   */
  async getTeam(teamId: number): Promise<Team> {
    const data = await this.fetch<Team>(`/teams/${teamId}`);
    return data;
  }

  /**
   * Get matches for a competition
   */
  async getMatches(
    competitionCode: string,
    options?: {
      season?: number;
      matchday?: number;
      status?: string;
    }
  ): Promise<any[]> {
    let endpoint = `/competitions/${competitionCode}/matches`;
    const params = new URLSearchParams();
    
    if (options?.season) params.append("season", options.season.toString());
    if (options?.matchday) params.append("matchday", options.matchday.toString());
    if (options?.status) params.append("status", options.status);

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    const data = await this.fetch<{ matches: any[] }>(endpoint);
    return data.matches;
  }

  /**
   * Fetch and process all data for a league (5 years)
   */
  async fetchLeagueData(
    competitionCode: string,
    years: number = 5
  ): Promise<IngestionResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let processed = 0;
    let inserted = 0;
    let updated = 0;

    try {
      // Get competition info
      console.log(`[FootballData] Fetching competition: ${competitionCode}`);
      const competition = await this.getCompetition(competitionCode);
      processed++;

      // Get teams
      console.log(`[FootballData] Fetching teams for: ${competitionCode}`);
      const teams = await this.getTeams(competitionCode);
      processed += teams.length;
      inserted += teams.length;

      // Get current standings
      console.log(`[FootballData] Fetching standings for: ${competitionCode}`);
      const standings = await this.getStandings(competitionCode);
      processed += standings.length;

      // Get top scorers
      console.log(`[FootballData] Fetching top scorers for: ${competitionCode}`);
      const scorers = await this.getTopScorers(competitionCode, 50);
      processed += scorers.length;

      // Get historical data for past seasons
      const currentYear = new Date().getFullYear();
      for (let year = currentYear - years; year <= currentYear; year++) {
        try {
          console.log(`[FootballData] Fetching ${year} season data for: ${competitionCode}`);
          const matches = await this.getMatches(competitionCode, { season: year });
          processed += matches.length;
        } catch (error) {
          errors.push(`Failed to fetch ${year} season: ${error}`);
        }
      }

    } catch (error) {
      errors.push(`Fatal error: ${error}`);
    }

    return {
      taskId: `football-data-${competitionCode}`,
      source: "football-data-org",
      recordsProcessed: processed,
      recordsInserted: inserted,
      recordsUpdated: updated,
      errors,
      duration: Date.now() - startTime,
      timestamp: new Date(),
    };
  }
}

// Factory function
export function createFootballDataAgent(): FootballDataAgent | null {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  
  if (!apiKey) {
    console.warn("[FootballData] API key not configured");
    return null;
  }

  return new FootballDataAgent({ apiKey });
}
