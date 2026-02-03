/**
 * FOOTBALLYTICS - DATA FETCH SCRIPT
 * ==================================
 * 
 * Automated script to fetch and update football data from free sources.
 * Run with: npm run data:fetch
 * 
 * Sources:
 * - Football-Data.org (Leagues, Teams, Matches)
 * - API-Football via RapidAPI (Players, Statistics)
 * - FIFA Rankings (National Teams)
 */

import { createFootballDataAgent } from "../src/agents/ingestion/football-data-agent";
import { createAPIFootballAgent } from "../src/agents/ingestion/api-football-agent";
import { ingestionOrchestrator, LEAGUES_CONFIG } from "../src/agents/ingestion/orchestrator";

interface FetchResult {
  source: string;
  success: boolean;
  recordsFetched: number;
  errors: string[];
  duration: number;
}

async function main() {
  console.log("=".repeat(60));
  console.log("FOOTBALLYTICS DATA FETCH");
  console.log("=".repeat(60));
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log("");

  const results: FetchResult[] = [];
  const startTime = Date.now();

  // Initialize agents
  const footballDataAgent = createFootballDataAgent();
  const apiFootballAgent = createAPIFootballAgent();

  // ==========================================================================
  // 1. FETCH FROM FOOTBALL-DATA.ORG
  // ==========================================================================
  if (footballDataAgent) {
    console.log("[1/3] Fetching from Football-Data.org...");
    
    const leagues = [
      "PL",   // Premier League
      "PD",   // La Liga
      "BL1",  // Bundesliga
      "SA",   // Serie A
      "FL1",  // Ligue 1
    ];

    for (const league of leagues) {
      try {
        console.log(`  - Fetching ${league}...`);
        const result = await footballDataAgent.fetchLeagueData(league, 5);
        
        results.push({
          source: `football-data-org:${league}`,
          success: result.errors.length === 0,
          recordsFetched: result.recordsProcessed,
          errors: result.errors,
          duration: result.duration,
        });

        console.log(`    ✓ ${result.recordsProcessed} records (${result.duration}ms)`);
      } catch (error) {
        console.error(`    ✗ Error: ${error}`);
        results.push({
          source: `football-data-org:${league}`,
          success: false,
          recordsFetched: 0,
          errors: [String(error)],
          duration: 0,
        });
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
  } else {
    console.log("[1/3] Skipped Football-Data.org (no API key)");
  }

  // ==========================================================================
  // 2. FETCH FROM API-FOOTBALL (Arabic Leagues)
  // ==========================================================================
  if (apiFootballAgent) {
    console.log("\n[2/3] Fetching Arabic leagues from API-Football...");
    
    try {
      const arabicLeagues = await apiFootballAgent.getArabicLeagues();
      console.log(`  Found ${arabicLeagues.length} Arabic leagues`);

      // Fetch top 5 Arabic leagues
      const topLeagues = arabicLeagues.slice(0, 5);
      
      for (const league of topLeagues) {
        try {
          console.log(`  - Fetching ${league.name}...`);
          const result = await apiFootballAgent.fetchLeagueData(league.id, 3);
          
          results.push({
            source: `api-football:${league.name}`,
            success: result.errors.length === 0,
            recordsFetched: result.recordsProcessed,
            errors: result.errors,
            duration: result.duration,
          });

          console.log(`    ✓ ${result.recordsProcessed} records (${result.duration}ms)`);
        } catch (error) {
          console.error(`    ✗ Error: ${error}`);
        }
      }
    } catch (error) {
      console.error(`  Error fetching Arabic leagues: ${error}`);
    }
  } else {
    console.log("\n[2/3] Skipped API-Football (no API key)");
  }

  // ==========================================================================
  // 3. SUMMARY
  // ==========================================================================
  const totalDuration = Date.now() - startTime;
  const successCount = results.filter(r => r.success).length;
  const totalRecords = results.reduce((sum, r) => sum + r.recordsFetched, 0);

  console.log("\n" + "=".repeat(60));
  console.log("FETCH SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Duration: ${(totalDuration / 1000).toFixed(1)}s`);
  console.log(`Sources Fetched: ${successCount}/${results.length}`);
  console.log(`Total Records: ${totalRecords.toLocaleString()}`);
  console.log("");

  // Print errors if any
  const errors = results.filter(r => r.errors.length > 0);
  if (errors.length > 0) {
    console.log("Errors:");
    errors.forEach(r => {
      console.log(`  - ${r.source}: ${r.errors.join(", ")}`);
    });
  }

  console.log("\n" + "=".repeat(60));
  console.log(`Completed at: ${new Date().toISOString()}`);
}

// Run the script
main().catch(console.error);
