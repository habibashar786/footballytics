/**
 * FOOTBALLYTICS DATABASE CLIENT
 * =============================
 * 
 * Neon PostgreSQL serverless database integration.
 * Provides connection pooling and edge-compatible queries.
 */

// Note: Install @neondatabase/serverless for production use
// npm install @neondatabase/serverless

interface DatabaseConfig {
  connectionString: string;
  poolSize?: number;
}

interface QueryResult<T> {
  rows: T[];
  rowCount: number;
  duration: number;
}

/**
 * Serverless-optimized database client
 */
class DatabaseClient {
  private connectionString: string;
  private isConnected: boolean = false;

  constructor(config?: DatabaseConfig) {
    this.connectionString = config?.connectionString || 
      process.env.DATABASE_URL || 
      "";
  }

  /**
   * Check if database is configured
   */
  isConfigured(): boolean {
    return !!this.connectionString;
  }

  /**
   * Execute a query (mock implementation for demo)
   * In production, this would use @neondatabase/serverless
   */
  async query<T>(sql: string, params?: unknown[]): Promise<QueryResult<T>> {
    const startTime = Date.now();

    if (!this.isConfigured()) {
      console.log("[DB] Database not configured, using mock data");
      return {
        rows: [],
        rowCount: 0,
        duration: Date.now() - startTime,
      };
    }

    try {
      // In production, this would be:
      // const { neon } = await import('@neondatabase/serverless');
      // const sql = neon(this.connectionString);
      // const result = await sql(query, params);
      
      console.log(`[DB] Executing query: ${sql.substring(0, 50)}...`);
      
      // Mock response for demo
      return {
        rows: [],
        rowCount: 0,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      console.error("[DB] Query error:", error);
      throw error;
    }
  }

  /**
   * Execute a transaction
   */
  async transaction<T>(
    callback: (client: DatabaseClient) => Promise<T>
  ): Promise<T> {
    try {
      await this.query("BEGIN");
      const result = await callback(this);
      await this.query("COMMIT");
      return result;
    } catch (error) {
      await this.query("ROLLBACK");
      throw error;
    }
  }
}

/**
 * Database schema definitions
 */
export const SCHEMA = {
  players: `
    CREATE TABLE IF NOT EXISTS players (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      short_name TEXT,
      photo_url TEXT,
      nationality TEXT,
      position TEXT,
      position_category TEXT,
      age INT,
      club_id UUID REFERENCES clubs(id),
      jersey_number INT,
      market_value DECIMAL(12,2),
      market_value_trend TEXT,
      contract_expiry DATE,
      social_followers BIGINT,
      brand_score INT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  clubs: `
    CREATE TABLE IF NOT EXISTS clubs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      short_name TEXT,
      logo_url TEXT,
      league_id UUID REFERENCES leagues(id),
      founded INT,
      stadium TEXT,
      capacity INT,
      owner TEXT,
      market_value DECIMAL(12,2),
      revenue DECIMAL(12,2),
      wage_ratio DECIMAL(4,2),
      trophies INT,
      global_ranking INT,
      brand_index INT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  leagues: `
    CREATE TABLE IF NOT EXISTS leagues (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      country TEXT,
      logo_url TEXT,
      founded INT,
      total_clubs INT,
      market_value DECIMAL(14,2),
      media_rights_value DECIMAL(14,2),
      global_fan_base BIGINT,
      competitive_balance_index INT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  player_stats: `
    CREATE TABLE IF NOT EXISTS player_stats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      player_id UUID REFERENCES players(id),
      season TEXT,
      appearances INT,
      goals INT,
      assists INT,
      minutes_played INT,
      xg DECIMAL(4,2),
      xa DECIMAL(4,2),
      pass_accuracy DECIMAL(4,2),
      tackles_won INT,
      aerial_duels_won INT,
      clean_sheets INT,
      saves INT,
      rating DECIMAL(3,2),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  fan_segments: `
    CREATE TABLE IF NOT EXISTS fan_segments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      club_id UUID REFERENCES clubs(id),
      region TEXT,
      total_fans BIGINT,
      engagement_score INT,
      merchandise_revenue DECIMAL(12,2),
      loyalty_index INT,
      average_age INT,
      digital_engagement INT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  kpis: `
    CREATE TABLE IF NOT EXISTS kpis (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      value DECIMAL(14,2),
      previous_value DECIMAL(14,2),
      unit TEXT,
      category TEXT,
      trend TEXT,
      target DECIMAL(14,2),
      computed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,

  // Materialized views for fast KPI access
  mv_player_rankings: `
    CREATE MATERIALIZED VIEW IF NOT EXISTS mv_player_rankings AS
    SELECT 
      p.id,
      p.name,
      p.market_value,
      ps.goals,
      ps.assists,
      ps.rating,
      RANK() OVER (ORDER BY p.market_value DESC) as value_rank,
      RANK() OVER (ORDER BY ps.goals DESC) as goals_rank,
      RANK() OVER (ORDER BY ps.rating DESC) as rating_rank
    FROM players p
    LEFT JOIN player_stats ps ON ps.player_id = p.id
    WHERE ps.season = '2024-25';
  `,
};

/**
 * Repository pattern for data access
 */
export class PlayerRepository {
  constructor(private db: DatabaseClient) {}

  async findAll(limit: number = 100): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM players ORDER BY market_value DESC LIMIT $1`,
      [limit]
    );
  }

  async findById(id: string): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM players WHERE id = $1`,
      [id]
    );
  }

  async findByClub(clubId: string): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM players WHERE club_id = $1 ORDER BY market_value DESC`,
      [clubId]
    );
  }

  async findTopByValue(limit: number = 10): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM players ORDER BY market_value DESC LIMIT $1`,
      [limit]
    );
  }
}

export class ClubRepository {
  constructor(private db: DatabaseClient) {}

  async findAll(limit: number = 100): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM clubs ORDER BY market_value DESC LIMIT $1`,
      [limit]
    );
  }

  async findById(id: string): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM clubs WHERE id = $1`,
      [id]
    );
  }

  async findByLeague(leagueId: string): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM clubs WHERE league_id = $1 ORDER BY market_value DESC`,
      [leagueId]
    );
  }
}

export class LeagueRepository {
  constructor(private db: DatabaseClient) {}

  async findAll(): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM leagues ORDER BY market_value DESC`
    );
  }

  async findById(id: string): Promise<QueryResult<any>> {
    return this.db.query(
      `SELECT * FROM leagues WHERE id = $1`,
      [id]
    );
  }
}

// Export singleton database client
export const db = new DatabaseClient();
export const playerRepository = new PlayerRepository(db);
export const clubRepository = new ClubRepository(db);
export const leagueRepository = new LeagueRepository(db);
