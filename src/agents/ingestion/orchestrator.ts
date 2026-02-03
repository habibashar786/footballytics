/**
 * FOOTBALLYTICS - MASTER DATA INGESTION ORCHESTRATOR
 * ===================================================
 * 
 * Multi-agent system for automated data collection from free sources.
 * 
 * Data Sources:
 * - Football-Data.org API (Free tier)
 * - API-Football (RapidAPI - Free tier)
 * - Transfermarkt (via scraping)
 * - FIFA Rankings (Official)
 * - Wikipedia (Club/League data)
 * - Social Media Stats
 * 
 * Agents:
 * - League Agent: Fetches league data
 * - Club Agent: Fetches club data
 * - Player Agent: Fetches player data
 * - Stats Agent: Fetches historical statistics
 * - Transfer Agent: Fetches transfer data
 * - Fan Agent: Fetches fan/social data
 * - Media Agent: Fetches media/sponsorship data
 * - Quality Agent: Validates and cleans data
 */

export interface DataSource {
  name: string;
  type: "api" | "scraper" | "static";
  url: string;
  rateLimit: number; // requests per minute
  requiresAuth: boolean;
  dataTypes: string[];
}

export interface IngestionTask {
  id: string;
  source: string;
  type: string;
  params: Record<string, unknown>;
  priority: number;
  retryCount: number;
  maxRetries: number;
  status: "pending" | "running" | "complete" | "failed";
  result?: unknown;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface IngestionResult {
  taskId: string;
  source: string;
  recordsProcessed: number;
  recordsInserted: number;
  recordsUpdated: number;
  errors: string[];
  duration: number;
  timestamp: Date;
}

// =============================================================================
// DATA SOURCES CONFIGURATION
// =============================================================================

export const DATA_SOURCES: DataSource[] = [
  {
    name: "football-data-org",
    type: "api",
    url: "https://api.football-data.org/v4",
    rateLimit: 10, // 10 requests per minute for free tier
    requiresAuth: true,
    dataTypes: ["leagues", "clubs", "players", "matches", "standings"],
  },
  {
    name: "api-football",
    type: "api",
    url: "https://api-football-v1.p.rapidapi.com/v3",
    rateLimit: 100, // 100 requests per day for free tier
    requiresAuth: true,
    dataTypes: ["leagues", "clubs", "players", "statistics", "transfers"],
  },
  {
    name: "fifa-rankings",
    type: "api",
    url: "https://www.fifa.com/api",
    rateLimit: 30,
    requiresAuth: false,
    dataTypes: ["rankings", "tournaments"],
  },
  {
    name: "transfermarkt",
    type: "scraper",
    url: "https://www.transfermarkt.com",
    rateLimit: 5,
    requiresAuth: false,
    dataTypes: ["valuations", "transfers", "clubs", "players"],
  },
  {
    name: "worldfootball",
    type: "scraper",
    url: "https://www.worldfootball.net",
    rateLimit: 10,
    requiresAuth: false,
    dataTypes: ["historical", "statistics", "leagues"],
  },
  {
    name: "sofascore",
    type: "api",
    url: "https://api.sofascore.com/api/v1",
    rateLimit: 30,
    requiresAuth: false,
    dataTypes: ["live", "statistics", "ratings"],
  },
];

// =============================================================================
// LEAGUE CONFIGURATIONS
// =============================================================================

export const LEAGUES_CONFIG = {
  // European Top Leagues
  european: [
    { id: "PL", name: "Premier League", country: "England", code: "premier-league" },
    { id: "PD", name: "La Liga", country: "Spain", code: "la-liga" },
    { id: "BL1", name: "Bundesliga", country: "Germany", code: "bundesliga" },
    { id: "SA", name: "Serie A", country: "Italy", code: "serie-a" },
    { id: "FL1", name: "Ligue 1", country: "France", code: "ligue-1" },
    { id: "PPL", name: "Primeira Liga", country: "Portugal", code: "primeira-liga" },
    { id: "DED", name: "Eredivisie", country: "Netherlands", code: "eredivisie" },
  ],
  // Arabic/Middle East Leagues
  arabic: [
    { id: "SAL", name: "Saudi Pro League", country: "Saudi Arabia", code: "saudi-pro" },
    { id: "UAE", name: "UAE Pro League", country: "UAE", code: "uae-pro" },
    { id: "QSL", name: "Qatar Stars League", country: "Qatar", code: "qatar-stars" },
    { id: "EGY", name: "Egyptian Premier League", country: "Egypt", code: "egyptian-premier" },
    { id: "MAR", name: "Botola Pro", country: "Morocco", code: "botola-pro" },
    { id: "TUN", name: "Tunisian Ligue 1", country: "Tunisia", code: "tunisian-ligue" },
    { id: "ALG", name: "Algerian Ligue 1", country: "Algeria", code: "algerian-ligue" },
    { id: "KUW", name: "Kuwait Premier League", country: "Kuwait", code: "kuwait-premier" },
    { id: "BHR", name: "Bahraini Premier League", country: "Bahrain", code: "bahraini-premier" },
    { id: "OMN", name: "Oman Professional League", country: "Oman", code: "oman-pro" },
    { id: "JOR", name: "Jordanian Pro League", country: "Jordan", code: "jordanian-pro" },
    { id: "IRQ", name: "Iraqi Premier League", country: "Iraq", code: "iraqi-premier" },
  ],
  // South American
  southAmerican: [
    { id: "BSA", name: "Brasileirão", country: "Brazil", code: "brasileirao" },
    { id: "ASL", name: "Liga Profesional", country: "Argentina", code: "liga-argentina" },
  ],
  // International
  international: [
    { id: "CL", name: "UEFA Champions League", country: "Europe", code: "ucl" },
    { id: "EL", name: "UEFA Europa League", country: "Europe", code: "uel" },
    { id: "ACL", name: "AFC Champions League", country: "Asia", code: "acl" },
    { id: "CAF", name: "CAF Champions League", country: "Africa", code: "caf-cl" },
    { id: "WC", name: "FIFA World Cup", country: "World", code: "world-cup" },
  ],
};

// =============================================================================
// INGESTION ORCHESTRATOR
// =============================================================================

export class DataIngestionOrchestrator {
  private taskQueue: IngestionTask[] = [];
  private results: IngestionResult[] = [];
  private isRunning: boolean = false;
  private rateLimiters: Map<string, number> = new Map();

  /**
   * Initialize the orchestrator
   */
  async initialize(): Promise<void> {
    console.log("[Orchestrator] Initializing data ingestion system...");
    
    // Initialize rate limiters for each source
    DATA_SOURCES.forEach(source => {
      this.rateLimiters.set(source.name, source.rateLimit);
    });

    console.log("[Orchestrator] Initialized with", DATA_SOURCES.length, "sources");
  }

  /**
   * Add a task to the queue
   */
  addTask(task: Omit<IngestionTask, "id" | "status" | "retryCount">): string {
    const id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.taskQueue.push({
      ...task,
      id,
      status: "pending",
      retryCount: 0,
    });

    // Sort by priority (higher = more important)
    this.taskQueue.sort((a, b) => b.priority - a.priority);

    return id;
  }

  /**
   * Execute all pending tasks
   */
  async executeAll(): Promise<IngestionResult[]> {
    if (this.isRunning) {
      throw new Error("Ingestion already in progress");
    }

    this.isRunning = true;
    this.results = [];

    console.log("[Orchestrator] Starting ingestion of", this.taskQueue.length, "tasks");

    while (this.taskQueue.some(t => t.status === "pending")) {
      const pendingTasks = this.taskQueue.filter(t => t.status === "pending");
      
      // Group tasks by source for rate limiting
      const tasksBySource = this.groupTasksBySource(pendingTasks);

      // Execute tasks respecting rate limits
      const promises = Object.entries(tasksBySource).map(([source, tasks]) => 
        this.executeSourceTasks(source, tasks)
      );

      await Promise.all(promises);
    }

    this.isRunning = false;
    console.log("[Orchestrator] Ingestion complete. Results:", this.results.length);

    return this.results;
  }

  /**
   * Group tasks by data source
   */
  private groupTasksBySource(tasks: IngestionTask[]): Record<string, IngestionTask[]> {
    return tasks.reduce((acc, task) => {
      if (!acc[task.source]) {
        acc[task.source] = [];
      }
      acc[task.source].push(task);
      return acc;
    }, {} as Record<string, IngestionTask[]>);
  }

  /**
   * Execute tasks for a specific source with rate limiting
   */
  private async executeSourceTasks(source: string, tasks: IngestionTask[]): Promise<void> {
    const rateLimit = this.rateLimiters.get(source) || 10;
    const delayMs = (60 * 1000) / rateLimit; // Delay between requests

    for (const task of tasks) {
      task.status = "running";
      task.startedAt = new Date();

      try {
        const result = await this.executeTask(task);
        task.status = "complete";
        task.result = result;
        task.completedAt = new Date();

        this.results.push({
          taskId: task.id,
          source: task.source,
          recordsProcessed: result.processed || 0,
          recordsInserted: result.inserted || 0,
          recordsUpdated: result.updated || 0,
          errors: result.errors || [],
          duration: task.completedAt.getTime() - task.startedAt.getTime(),
          timestamp: new Date(),
        });
      } catch (error) {
        task.retryCount++;
        
        if (task.retryCount < task.maxRetries) {
          task.status = "pending";
          console.log(`[Orchestrator] Task ${task.id} failed, retrying (${task.retryCount}/${task.maxRetries})`);
        } else {
          task.status = "failed";
          task.error = error instanceof Error ? error.message : "Unknown error";
          task.completedAt = new Date();
        }
      }

      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  /**
   * Execute a single task
   */
  private async executeTask(task: IngestionTask): Promise<{
    processed: number;
    inserted: number;
    updated: number;
    errors: string[];
  }> {
    console.log(`[Orchestrator] Executing task ${task.id}: ${task.type} from ${task.source}`);

    // This will be implemented by specific agents
    // For now, return mock result
    return {
      processed: 100,
      inserted: 80,
      updated: 20,
      errors: [],
    };
  }

  /**
   * Get current status
   */
  getStatus(): {
    isRunning: boolean;
    pending: number;
    running: number;
    complete: number;
    failed: number;
  } {
    return {
      isRunning: this.isRunning,
      pending: this.taskQueue.filter(t => t.status === "pending").length,
      running: this.taskQueue.filter(t => t.status === "running").length,
      complete: this.taskQueue.filter(t => t.status === "complete").length,
      failed: this.taskQueue.filter(t => t.status === "failed").length,
    };
  }

  /**
   * Schedule automatic updates
   */
  scheduleUpdates(intervalMinutes: number = 60): void {
    console.log(`[Orchestrator] Scheduling automatic updates every ${intervalMinutes} minutes`);
    
    setInterval(async () => {
      console.log("[Orchestrator] Running scheduled update...");
      await this.runFullUpdate();
    }, intervalMinutes * 60 * 1000);
  }

  /**
   * Run a full data update
   */
  async runFullUpdate(): Promise<void> {
    // Add tasks for all data types
    const allLeagues = [
      ...LEAGUES_CONFIG.european,
      ...LEAGUES_CONFIG.arabic,
      ...LEAGUES_CONFIG.southAmerican,
      ...LEAGUES_CONFIG.international,
    ];

    // League data
    allLeagues.forEach(league => {
      this.addTask({
        source: "football-data-org",
        type: "league",
        params: { leagueId: league.id, code: league.code },
        priority: 10,
        maxRetries: 3,
      });
    });

    // Execute all tasks
    await this.executeAll();
  }
}

// Export singleton
export const ingestionOrchestrator = new DataIngestionOrchestrator();
