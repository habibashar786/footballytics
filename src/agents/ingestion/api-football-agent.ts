/**
 * API-FOOTBALL AGENT (RapidAPI)
 * =============================
 * 
 * Comprehensive football API with detailed statistics.
 * Free tier: 100 requests/day
 * 
 * Excellent for:
 * - Detailed player statistics
 * - Transfer data
 * - Arabic/Middle East leagues
 * - Historical data
 */

import { IngestionResult } from "./orchestrator";

const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

interface APIFootballConfig {
  apiKey: string;
  apiHost: string;
}

interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: Season[];
}

interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
}

interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}

interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

interface PlayerStatistics {
  player: Player;
  statistics: {
    team: { id: number; name: string; logo: string };
    league: { id: number; name: string; country: string };
    games: {
      appearances: number;
      lineups: number;
      minutes: number;
      position: string;
      rating: string;
    };
    goals: {
      total: number;
      assists: number;
      saves: number;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number;
      interceptions: number;
    };
    cards: {
      yellow: number;
      red: number;
    };
  }[];
}

interface Transfer {
  player: {
    id: number;
    name: string;
  };
  update: string;
  transfers: {
    date: string;
    type: string;
    teams: {
      in: { id: number; name: string; logo: string };
      out: { id: number; name: string; logo: string };
    };
  }[];
}

export class APIFootballAgent {
  private apiKey: string;
  private apiHost: string;
  private requestCount: number = 0;
  private dailyLimit: number = 100;

  constructor(config: APIFootballConfig) {
    this.apiKey = config.apiKey;
    this.apiHost = config.apiHost || "api-football-v1.p.rapidapi.com";
  }

  /**
   * Make an API request
   */
  private async fetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    if (this.requestCount >= this.dailyLimit) {
      throw new Error("Daily request limit reached");
    }

    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": this.apiHost,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    this.requestCount++;
    const data = await response.json();
    return data.response;
  }

  /**
   * Get all available leagues
   */
  async getLeagues(country?: string): Promise<League[]> {
    const params: Record<string, string> = {};
    if (country) params.country = country;
    
    return this.fetch<League[]>("/leagues", params);
  }

  /**
   * Get Arabic/Middle East leagues specifically
   */
  async getArabicLeagues(): Promise<League[]> {
    const arabCountries = [
      "Saudi-Arabia", "UAE", "Qatar", "Egypt", "Morocco",
      "Tunisia", "Algeria", "Kuwait", "Bahrain", "Oman",
      "Jordan", "Iraq", "Lebanon", "Syria", "Palestine"
    ];

    const leagues: League[] = [];
    
    for (const country of arabCountries) {
      try {
        const countryLeagues = await this.getLeagues(country);
        leagues.push(...countryLeagues);
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.warn(`[APIFootball] Failed to get leagues for ${country}:`, error);
      }
    }

    return leagues;
  }

  /**
   * Get teams in a league
   */
  async getTeams(leagueId: number, season: number): Promise<Team[]> {
    return this.fetch<Team[]>("/teams", {
      league: leagueId.toString(),
      season: season.toString(),
    });
  }

  /**
   * Get team statistics
   */
  async getTeamStatistics(teamId: number, leagueId: number, season: number): Promise<any> {
    return this.fetch<any>("/teams/statistics", {
      team: teamId.toString(),
      league: leagueId.toString(),
      season: season.toString(),
    });
  }

  /**
   * Get player statistics
   */
  async getPlayerStatistics(
    leagueId: number,
    season: number,
    page: number = 1
  ): Promise<PlayerStatistics[]> {
    return this.fetch<PlayerStatistics[]>("/players", {
      league: leagueId.toString(),
      season: season.toString(),
      page: page.toString(),
    });
  }

  /**
   * Get top scorers
   */
  async getTopScorers(leagueId: number, season: number): Promise<PlayerStatistics[]> {
    return this.fetch<PlayerStatistics[]>("/players/topscorers", {
      league: leagueId.toString(),
      season: season.toString(),
    });
  }

  /**
   * Get transfers
   */
  async getTransfers(teamId: number): Promise<Transfer[]> {
    return this.fetch<Transfer[]>("/transfers", {
      team: teamId.toString(),
    });
  }

  /**
   * Get standings
   */
  async getStandings(leagueId: number, season: number): Promise<any[]> {
    return this.fetch<any[]>("/standings", {
      league: leagueId.toString(),
      season: season.toString(),
    });
  }

  /**
   * Fetch complete league data with history
   */
  async fetchLeagueData(leagueId: number, years: number = 5): Promise<IngestionResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let processed = 0;
    let inserted = 0;
    let updated = 0;

    const currentYear = new Date().getFullYear();

    try {
      for (let year = currentYear - years; year <= currentYear; year++) {
        try {
          console.log(`[APIFootball] Fetching ${year} season for league ${leagueId}`);

          // Get teams
          const teams = await this.getTeams(leagueId, year);
          processed += teams.length;
          inserted += teams.length;

          // Get standings
          const standings = await this.getStandings(leagueId, year);
          processed += standings.length;

          // Get top scorers
          const scorers = await this.getTopScorers(leagueId, year);
          processed += scorers.length;

          // Rate limiting between seasons
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          errors.push(`Failed to fetch ${year} season: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Fatal error: ${error}`);
    }

    return {
      taskId: `api-football-${leagueId}`,
      source: "api-football",
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
export function createAPIFootballAgent(): APIFootballAgent | null {
  const apiKey = process.env.RAPIDAPI_KEY;
  
  if (!apiKey) {
    console.warn("[APIFootball] API key not configured");
    return null;
  }

  return new APIFootballAgent({ 
    apiKey,
    apiHost: "api-football-v1.p.rapidapi.com"
  });
}
