/**
 * Football-Data.org Agent (Simplified)
 */

export function createFootballDataAgent() {
  if (!process.env.FOOTBALL_DATA_API_KEY) {
    return null;
  }

  return {
    async fetchLeagueData(leagueCode: string, years: number = 5) {
      return {
        recordsProcessed: 0,
        errors: [] as string[],
        duration: 0,
      };
    },
  };
}
