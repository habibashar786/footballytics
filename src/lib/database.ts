/**
 * FOOTBALLYTICS - DATABASE LAYER
 * ==============================
 * 
 * Simple data layer using in-memory data.
 * Can be replaced with Neon PostgreSQL in production.
 */

import { players, clubs, leagues } from "@/data";
import { Player, Club, League } from "@/types";

// =============================================================================
// PLAYER REPOSITORY
// =============================================================================

export const playerRepository = {
  findAll: async (): Promise<Player[]> => {
    return players;
  },

  findById: async (id: string): Promise<Player | undefined> => {
    return players.find((p) => p.id === id);
  },

  findByClub: async (clubId: string): Promise<Player[]> => {
    return players.filter((p) => p.clubId === clubId);
  },

  findTopByValue: async (limit: number = 10): Promise<Player[]> => {
    return [...players]
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, limit);
  },
};

// =============================================================================
// CLUB REPOSITORY
// =============================================================================

export const clubRepository = {
  findAll: async (): Promise<Club[]> => {
    return clubs;
  },

  findById: async (id: string): Promise<Club | undefined> => {
    return clubs.find((c) => c.id === id);
  },

  findByLeague: async (leagueId: string): Promise<Club[]> => {
    return clubs.filter((c) => c.leagueId === leagueId);
  },

  findTopByValue: async (limit: number = 10): Promise<Club[]> => {
    return [...clubs]
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, limit);
  },
};

// =============================================================================
// LEAGUE REPOSITORY
// =============================================================================

export const leagueRepository = {
  findAll: async (): Promise<League[]> => {
    return leagues;
  },

  findById: async (id: string): Promise<League | undefined> => {
    return leagues.find((l) => l.id === id);
  },
};
