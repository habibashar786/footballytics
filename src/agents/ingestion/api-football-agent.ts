/**
 * API-Football Agent (Simplified)
 */

export function createAPIFootballAgent() {
  if (!process.env.RAPIDAPI_KEY) {
    return null;
  }

  return {
    async getArabicLeagues() {
      return [];
    },

    async fetchLeagueData(leagueId: number, years: number = 3) {
      return {
        recordsProcessed: 0,
        errors: [] as string[],
        duration: 0,
      };
    },
  };
}
