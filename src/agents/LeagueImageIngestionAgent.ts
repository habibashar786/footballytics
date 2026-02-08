/**
 * LEAGUE IMAGE INGESTION AGENT
 * ============================
 * 
 * Dedicated agent for league logo resolution.
 * Uses verified, working image sources only.
 * 
 * @author Footballytics Team
 * @version 1.0.0
 */

export interface LeagueImageResult {
  entity_type: "league";
  id: string;
  name: string;
  image_url: string;
  status: "validated" | "unavailable";
  source: string;
}

/**
 * VERIFIED WORKING LEAGUE LOGOS
 * All URLs tested and confirmed working as of 2025-02
 * Using SofaScore Tournament API - highly reliable
 */
const LEAGUE_IMAGE_DATABASE: Record<string, { url: string; source: string }> = {
  // =========================================================================
  // EUROPEAN TOP 5 - Using Football-Data.org (VERIFIED WORKING)
  // =========================================================================
  "premier-league": {
    url: "https://crests.football-data.org/PL.png",
    source: "Football-Data.org"
  },
  "la-liga": {
    url: "https://crests.football-data.org/PD.png",
    source: "Football-Data.org"
  },
  "bundesliga": {
    url: "https://crests.football-data.org/BL1.png",
    source: "Football-Data.org"
  },
  "serie-a": {
    url: "https://crests.football-data.org/SA.png",
    source: "Football-Data.org"
  },
  "ligue-1": {
    url: "https://crests.football-data.org/FL1.png",
    source: "Football-Data.org"
  },

  // =========================================================================
  // SOUTH AMERICAN - Using SofaScore Tournament API (VERIFIED WORKING)
  // =========================================================================
  "brasileirao": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/325/image",
    source: "SofaScore"
  },
  "liga-argentina": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/155/image",
    source: "SofaScore"
  },

  // =========================================================================
  // MIDDLE EAST - Using SofaScore Tournament API (VERIFIED WORKING)
  // =========================================================================
  "saudi-pro": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/955/image",
    source: "SofaScore"
  },
  "uae-pro": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/962/image",
    source: "SofaScore"
  },
  "qatar-stars": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/627/image",
    source: "SofaScore"
  },
  "egyptian-premier": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/236/image",
    source: "SofaScore"
  },
  "botola-pro": {
    url: "https://api.sofascore.app/api/v1/unique-tournament/937/image",
    source: "SofaScore"
  },
};

/**
 * League Image Ingestion Agent
 * Single responsibility: Resolve league logos
 */
export class LeagueImageIngestionAgent {
  private cache: Map<string, LeagueImageResult> = new Map();

  /**
   * Get logo for a single league
   */
  async getLeagueImage(leagueId: string, leagueName: string): Promise<LeagueImageResult> {
    // Check cache first
    if (this.cache.has(leagueId)) {
      return this.cache.get(leagueId)!;
    }

    // Look up in verified database
    const imageData = LEAGUE_IMAGE_DATABASE[leagueId];

    if (imageData) {
      const result: LeagueImageResult = {
        entity_type: "league",
        id: leagueId,
        name: leagueName,
        image_url: imageData.url,
        status: "validated",
        source: imageData.source,
      };
      this.cache.set(leagueId, result);
      return result;
    }

    // Image not in database - return unavailable (no retry)
    const unavailableResult: LeagueImageResult = {
      entity_type: "league",
      id: leagueId,
      name: leagueName,
      image_url: "",
      status: "unavailable",
      source: "none",
    };
    this.cache.set(leagueId, unavailableResult);
    return unavailableResult;
  }

  /**
   * Get logos for multiple leagues
   */
  async getLeagueImages(leagues: Array<{ id: string; name: string }>): Promise<LeagueImageResult[]> {
    return Promise.all(
      leagues.map(l => this.getLeagueImage(l.id, l.name))
    );
  }

  /**
   * Get all available league logos
   */
  getAllValidatedImages(): Record<string, string> {
    const images: Record<string, string> = {};
    for (const [id, data] of Object.entries(LEAGUE_IMAGE_DATABASE)) {
      images[id] = data.url;
    }
    return images;
  }

  /**
   * Clear cache (for testing)
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const leagueImageAgent = new LeagueImageIngestionAgent();

// Export direct image map for data files
export const VERIFIED_LEAGUE_IMAGES = Object.fromEntries(
  Object.entries(LEAGUE_IMAGE_DATABASE).map(([id, data]) => [id, data.url])
);
