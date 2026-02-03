"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Lightbulb,
  Database,
  Cpu,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agents?: AgentStatus[];
}

interface AgentStatus {
  name: string;
  status: "pending" | "running" | "complete" | "error";
  duration?: number;
  output?: string;
}

// Simulated AI responses
const sampleResponses: Record<string, { agents: AgentStatus[], response: string }> = {
  "market": {
    agents: [
      { name: "Data Agent", status: "complete", duration: 120, output: "Retrieved 2,458 player records" },
      { name: "Analytics Agent", status: "complete", duration: 340, output: "Calculated market valuations" },
      { name: "Insights Agent", status: "complete", duration: 180, output: "Generated market analysis" },
    ],
    response: `## Market Value Analysis

Based on my analysis of the current football market:

**Key Findings:**
- Total market value across top 5 leagues: **€31.5B** (+11.7% YoY)
- Average player value: **€12.8M** (up from €11.5M)
- Premier League leads with **€11.2B** total value

**Top Value Increases:**
1. Jude Bellingham (+€50M after Real Madrid move)
2. Bukayo Saka (+€30M after consistent performances)
3. Florian Wirtz (+€40M emerging talent premium)

**Investment Recommendation:** Focus on young midfielders (21-24 age bracket) from top academies - they show the highest value appreciation potential.`
  },
  "player": {
    agents: [
      { name: "Data Agent", status: "complete", duration: 95, output: "Loaded player statistics" },
      { name: "Analytics Agent", status: "complete", duration: 280, output: "Performance analysis complete" },
      { name: "Ranking Agent", status: "complete", duration: 150, output: "Rankings generated" },
    ],
    response: `## Top Player Recommendations

Based on performance metrics and market trends:

**Best Value Players (Performance/Price Ratio):**
1. **Florian Wirtz** - €130M value, elite creative output
2. **Jamal Musiala** - €120M, versatile attacking threat
3. **Bukayo Saka** - €140M, consistent Premier League performer

**Undervalued Talents:**
- Khvicha Kvaratskhelia (Napoli) - Should be valued €20M higher
- Moisés Caicedo (Chelsea) - Elite defensive metrics

**Risk Assessment:** High-value transfers (>€100M) have 40% chance of underperforming relative to fee.`
  },
  "default": {
    agents: [
      { name: "Data Agent", status: "complete", duration: 100, output: "Data retrieved" },
      { name: "Analytics Agent", status: "complete", duration: 200, output: "Analysis complete" },
      { name: "Insights Agent", status: "complete", duration: 150, output: "Insights generated" },
    ],
    response: `I've analyzed your query across our football intelligence database.

**Key Insights:**
- Our system tracks 2,458 players across 6 major leagues
- Real-time valuations updated every 24 hours
- AI-powered predictions based on 50+ performance metrics

**Available Analysis:**
- Market value trends and predictions
- Player performance comparisons
- Transfer recommendation engine
- Fan engagement analytics
- Investment risk assessment

What specific aspect would you like me to dive deeper into?`
  }
};

// Sample queries
const sampleQueries = [
  "What are the current market trends?",
  "Which players should I invest in?",
  "Compare Premier League vs La Liga",
  "Top performing forwards this season",
  "Fan engagement insights",
];

export default function InsightsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Welcome to **Footballytics AI**! I'm your intelligent football analytics assistant powered by our multi-agent system.\n\nI can help you with:\n- 📊 Market analysis & valuations\n- ⚽ Player performance insights\n- 💰 Investment recommendations\n- 👥 Fan engagement analytics\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAgents, setCurrentAgents] = useState<AgentStatus[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgentExecution = async (agents: AgentStatus[]) => {
    for (let i = 0; i < agents.length; i++) {
      // Set agent to running
      setCurrentAgents(prev => 
        prev.map((a, idx) => 
          idx === i ? { ...a, status: "running" } : a
        )
      );

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, agents[i].duration || 200));

      // Set agent to complete
      setCurrentAgents(prev => 
        prev.map((a, idx) => 
          idx === i ? { ...a, status: "complete" } : a
        )
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Determine response type
    const lowerInput = input.toLowerCase();
    let responseData = sampleResponses.default;
    
    if (lowerInput.includes("market") || lowerInput.includes("value") || lowerInput.includes("trend")) {
      responseData = sampleResponses.market;
    } else if (lowerInput.includes("player") || lowerInput.includes("invest") || lowerInput.includes("recommend")) {
      responseData = sampleResponses.player;
    }

    // Initialize agents
    const agents = responseData.agents.map(a => ({ ...a, status: "pending" as const }));
    setCurrentAgents(agents);

    // Simulate agent execution
    await simulateAgentExecution(responseData.agents);

    // Add assistant response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseData.response,
      timestamp: new Date(),
      agents: responseData.agents,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
    setCurrentAgents([]);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-gold-400" />
            <span className="gradient-text">AI Insights</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Multi-agent powered football intelligence
          </p>
        </div>

        {/* Agent Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pitch-500/20 border border-pitch-500/30">
            <div className="h-2 w-2 rounded-full bg-pitch-400 animate-pulse" />
            <span className="text-sm text-pitch-400">3 Agents Online</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Column */}
        <div className="flex-1 flex flex-col glass-card overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  {/* Avatar */}
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    message.role === "user" 
                      ? "bg-gold-500/20 text-gold-400" 
                      : "bg-purple-500/20 text-purple-400"
                  )}>
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={cn(
                    "flex-1 max-w-[80%]",
                    message.role === "user" && "flex flex-col items-end"
                  )}>
                    <div className={cn(
                      "rounded-2xl p-4",
                      message.role === "user"
                        ? "bg-gold-500/20 text-white"
                        : "bg-white/5"
                    )}>
                      <div 
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/## (.*?)$/gm, '<h3 class="text-lg font-semibold text-gold-400 mt-4 mb-2">$1</h3>')
                            .replace(/- (.*?)$/gm, '<li class="ml-4">$1</li>')
                            .replace(/\n/g, '<br>')
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Processing Indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl p-4 bg-white/5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing with multi-agent system...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            {/* Sample Queries */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {sampleQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => setInput(query)}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white whitespace-nowrap transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about players, markets, trends..."
                disabled={isProcessing}
                className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-gold-400 hover:to-gold-500 transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Agent Status Panel */}
        <div className="w-80 glass-card p-6 hidden xl:block">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-gold-400" />
            Agent System
          </h3>

          {/* Agent Cards */}
          <div className="space-y-4">
            {[
              { name: "Data Agent", icon: Database, description: "ETL & data retrieval", color: "blue" },
              { name: "Analytics Agent", icon: BarChart3, description: "KPI computation", color: "purple" },
              { name: "Insights Agent", icon: Lightbulb, description: "AI-powered insights", color: "gold" },
            ].map((agent) => {
              const currentAgent = currentAgents.find(a => a.name === agent.name);
              const status = currentAgent?.status || "idle";

              return (
                <div
                  key={agent.name}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    status === "running" && "bg-blue-500/10 border-blue-500/30",
                    status === "complete" && "bg-pitch-500/10 border-pitch-500/30",
                    status === "pending" && "bg-yellow-500/10 border-yellow-500/30",
                    status === "idle" && "bg-white/5 border-white/10"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <agent.icon className={cn(
                        "h-4 w-4",
                        agent.color === "blue" && "text-blue-400",
                        agent.color === "purple" && "text-purple-400",
                        agent.color === "gold" && "text-gold-400"
                      )} />
                      <span className="font-medium text-sm">{agent.name}</span>
                    </div>
                    {status === "running" && (
                      <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                    )}
                    {status === "complete" && (
                      <CheckCircle className="h-4 w-4 text-pitch-400" />
                    )}
                    {status === "pending" && (
                      <Clock className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                  {currentAgent?.output && status === "complete" && (
                    <p className="text-xs text-pitch-400 mt-2">{currentAgent.output}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* System Stats */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-sm font-medium mb-3">System Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response Time</span>
                <span className="text-pitch-400">&lt; 500ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cache Hit Rate</span>
                <span className="text-pitch-400">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Freshness</span>
                <span className="text-blue-400">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
