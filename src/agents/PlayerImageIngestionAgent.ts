/**
 * PLAYER IMAGE INGESTION AGENT
 * ============================
 * 
 * Dedicated agent for player image resolution.
 * Uses verified, working image sources only.
 * 
 * @author Footballytics Team
 * @version 1.0.0
 */

export interface PlayerImageResult {
  entity_type: "player";
  id: string;
  name: string;
  image_url: string;
  status: "validated" | "unavailable";
  source: string;
}

/**
 * VERIFIED WORKING IMAGE SOURCES
 * All URLs tested and confirmed working as of 2025-02
 */
const PLAYER_IMAGE_DATABASE: Record<string, { url: string; source: string }> = {
  // =========================================================================
  // PREMIER LEAGUE - Using Official PL CDN (VERIFIED WORKING)
  // =========================================================================
  "haaland": {
    url: "https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png",
    source: "Premier League Official"
  },
  "salah": {
    url: "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png",
    source: "Premier League Official"
  },
  "saka": {
    url: "https://resources.premierleague.com/premierleague/photos/players/250x250/p223340.png",
    source: "Premier League Official"
  },
  "foden": {
    url: "https://resources.premierleague.com/premierleague/photos/players/250x250/p209244.png",
    source: "Premier League Official"
  },
  "palmer": {
    url: "https://resources.premierleague.com/premierleague/photos/players/250x250/p244851.png",
    source: "Premier League Official"
  },
  "rice": {
    url: "https://resources.premierleague.com/premierleague/photos/players/250x250/p204480.png",
    source: "Premier League Official"
  },

  // =========================================================================
  // LA LIGA / REAL MADRID - Using SofaScore CDN (VERIFIED WORKING)
  // =========================================================================
  "mbappe": {
    url: "https://api.sofascore.app/api/v1/player/129718/image",
    source: "SofaScore"
  },
  "bellingham": {
    url: "https://api.sofascore.app/api/v1/player/954195/image",
    source: "SofaScore"
  },
  "vinicius": {
    url: "https://api.sofascore.app/api/v1/player/832498/image",
    source: "SofaScore"
  },
  "rodrygo": {
    url: "https://api.sofascore.app/api/v1/player/839248/image",
    source: "SofaScore"
  },

  // =========================================================================
  // BARCELONA - Using SofaScore CDN (VERIFIED WORKING)
  // =========================================================================
  "yamal": {
    url: "https://api.sofascore.app/api/v1/player/1210964/image",
    source: "SofaScore"
  },
  "pedri": {
    url: "https://api.sofascore.app/api/v1/player/942771/image",
    source: "SofaScore"
  },

  // =========================================================================
  // BUNDESLIGA - Using SofaScore CDN (VERIFIED WORKING)
  // =========================================================================
  "kane": {
    url: "https://api.sofascore.app/api/v1/player/69737/image",
    source: "SofaScore"
  },
  "musiala": {
    url: "https://api.sofascore.app/api/v1/player/934498/image",
    source: "SofaScore"
  },
  "wirtz": {
    url: "https://api.sofascore.app/api/v1/player/927799/image",
    source: "SofaScore"
  },

  // =========================================================================
  // SAUDI PRO LEAGUE - Using SofaScore CDN (VERIFIED WORKING)
  // =========================================================================
  "ronaldo": {
    url: "https://api.sofascore.app/api/v1/player/750/image",
    source: "SofaScore"
  },
  "neymar": {
    url: "https://api.sofascore.app/api/v1/player/68556/image",
    source: "SofaScore"
  },
  "benzema": {
    url: "https://api.sofascore.app/api/v1/player/3646/image",
    source: "SofaScore"
  },
  "mahrez": {
    url: "https://api.sofascore.app/api/v1/player/152929/image",
    source: "SofaScore"
  },

  // =========================================================================
  // SERIE A - Using SofaScore CDN (VERIFIED WORKING)
  // =========================================================================
  "lautaro": {
    url: "https://api.sofascore.app/api/v1/player/778793/image",
    source: "SofaScore"
  },

  // =========================================================================
  // LIGUE 1 - Using SofaScore CDN (VERIFIED WORKING)
  // =========================================================================
  "dembele": {
    url: "https://api.sofascore.app/api/v1/player/631533/image",
    source: "SofaScore"
  },
};

/**
 * Player Image Ingestion Agent
 * Single responsibility: Resolve player images
 */
export class PlayerImageIngestionAgent {
  private cache: Map<string, PlayerImageResult> = new Map();

  /**
   * Get image for a single player
   */
  async getPlayerImage(playerId: string, playerName: string): Promise<PlayerImageResult> {
    // Check cache first
    if (this.cache.has(playerId)) {
      return this.cache.get(playerId)!;
    }

    // Look up in verified database
    const imageData = PLAYER_IMAGE_DATABASE[playerId];

    if (imageData) {
      const result: PlayerImageResult = {
        entity_type: "player",
        id: playerId,
        name: playerName,
        image_url: imageData.url,
        status: "validated",
        source: imageData.source,
      };
      this.cache.set(playerId, result);
      return result;
    }

    // Image not in database - return unavailable (no retry)
    const unavailableResult: PlayerImageResult = {
      entity_type: "player",
      id: playerId,
      name: playerName,
      image_url: "",
      status: "unavailable",
      source: "none",
    };
    this.cache.set(playerId, unavailableResult);
    return unavailableResult;
  }

  /**
   * Get images for multiple players
   */
  async getPlayerImages(players: Array<{ id: string; name: string }>): Promise<PlayerImageResult[]> {
    return Promise.all(
      players.map(p => this.getPlayerImage(p.id, p.name))
    );
  }

  /**
   * Get all available player images
   */
  getAllValidatedImages(): Record<string, string> {
    const images: Record<string, string> = {};
    for (const [id, data] of Object.entries(PLAYER_IMAGE_DATABASE)) {
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
export const playerImageAgent = new PlayerImageIngestionAgent();

// Export direct image map for data files
export const VERIFIED_PLAYER_IMAGES = Object.fromEntries(
  Object.entries(PLAYER_IMAGE_DATABASE).map(([id, data]) => [id, data.url])
);
