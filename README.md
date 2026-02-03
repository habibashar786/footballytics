# ⚽ Footballytics v2.0 - Elite Football Intelligence Platform

> State-of-the-art multi-stakeholder football intelligence platform with AI-powered multi-agent system, real-time data ingestion, and premium analytics.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=flat-square)
![Upstash](https://img.shields.io/badge/Upstash-Redis-red?style=flat-square)

---

## 🚀 Quick Start

```bash
# Navigate to project
cd footballytics

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FOOTBALLYTICS LIGHTNING STACK                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND (Next.js 15 + React 19)                  │   │
│  │  • Server Components    • Framer Motion    • Recharts               │   │
│  │  • Clerk Auth          • SWR Caching      • Glassmorphism UI        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    MULTI-AGENT DATA INGESTION                        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│  │  │ Football │ │ API-     │ │ Transfer │ │ FIFA     │ │ Social   │  │   │
│  │  │ Data.org │ │ Football │ │ -markt   │ │ Rankings │ │ Media    │  │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    AI AGENTS (Parallel Execution)                    │   │
│  │  • Data Agent      • Analytics Agent    • Insights Agent            │   │
│  │  • Ranking Agent   • Quality Agent      • Orchestrator              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    DATA LAYER                                        │   │
│  │  • Upstash Redis (Caching)    • Neon PostgreSQL (Storage)           │   │
│  │  • Edge Functions             • Vercel Cron (Scheduled Updates)     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Features

### Domain Modules

| Module | Description | Route |
|--------|-------------|-------|
| **Dashboard** | KPIs, trends, quick insights | `/` |
| **Players** | Search, filter, compare players | `/players` |
| **Clubs** | Valuations, financials, rankings | `/clubs` |
| **Leagues** | Competitive balance, media rights | `/leagues` |
| **Fans** | Regional engagement, demographics | `/fans` |
| **Investors** | ROI analysis, ownership structure | `/investors` |
| **Events** | Tournaments, economic impact | `/events` |
| **AI Insights** | Multi-agent chat interface | `/insights` |
| **Analytics** | Advanced charts & trends | `/analytics` |

### Data Coverage

| Category | Coverage |
|----------|----------|
| **European Leagues** | Premier League, La Liga, Bundesliga, Serie A, Ligue 1 |
| **Arabic Leagues** | Saudi Pro, UAE Pro, Qatar Stars, Egyptian, Moroccan |
| **South American** | Brasileirão, Liga Argentina |
| **Historical Data** | 5 years (2020-2025) |
| **Players** | 50+ with full stats |
| **Clubs** | 30+ with financials |

### Chart Types

- 📈 Line Charts (Market trends, time series)
- 📊 Bar Charts (Revenue, transfers)
- 🎯 Radar Charts (Player stats comparison)
- 🥧 Pie Charts (Fan distribution)
- 📉 Area Charts (Engagement trends)

---

## 🔐 Authentication

Powered by **Clerk** with:
- Email/Password
- Google OAuth
- GitHub OAuth
- Magic Links
- Dark theme integration

---

## 🚀 Deployment to Vercel

### 1. Create Vercel Project

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### 2. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
# Required: Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx

# Optional: Caching
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Optional: Database
DATABASE_URL=postgresql://xxx@xxx.neon.tech/xxx

# Optional: Football APIs
FOOTBALL_DATA_API_KEY=xxx
RAPIDAPI_KEY=xxx

# Cron Secret
CRON_SECRET=your-random-secret
```

### 3. Enable Cron Jobs

Vercel automatically detects `vercel.json` cron configuration:
- Data updates every 6 hours
- Automatic cache warming

---

## 🔧 Free Tier Services

| Service | Free Tier | Sign Up |
|---------|-----------|---------|
| **Vercel** | Unlimited hobby | [vercel.com](https://vercel.com) |
| **Clerk** | 10K MAU | [clerk.com](https://clerk.com) |
| **Upstash** | 10K cmds/day | [upstash.com](https://upstash.com) |
| **Neon** | 0.5GB storage | [neon.tech](https://neon.tech) |
| **Football-Data** | 10 req/min | [football-data.org](https://football-data.org) |
| **RapidAPI** | 100 req/day | [rapidapi.com](https://rapidapi.com) |

**Total Monthly Cost: $0**

---

## 📁 Project Structure

```
footballytics/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   │   ├── api/               # API routes
│   │   │   ├── players/       # Players API
│   │   │   ├── clubs/         # Clubs API
│   │   │   ├── insights/      # AI Insights API
│   │   │   └── cron/          # Scheduled updates
│   │   ├── players/           # Players page
│   │   ├── clubs/             # Clubs page
│   │   ├── leagues/           # Leagues page
│   │   ├── fans/              # Fans page
│   │   ├── investors/         # Investors page
│   │   ├── events/            # Events page
│   │   ├── insights/          # AI Insights page
│   │   └── analytics/         # Analytics page
│   │
│   ├── agents/
│   │   ├── index.ts           # AI Agents
│   │   └── ingestion/         # Data ingestion agents
│   │       ├── orchestrator.ts
│   │       ├── football-data-agent.ts
│   │       └── api-football-agent.ts
│   │
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   ├── charts/            # Chart components
│   │   ├── players/           # Player components
│   │   └── clubs/             # Club components
│   │
│   ├── data/
│   │   ├── index.ts           # Central export
│   │   ├── leagues-clubs.ts   # League & club data
│   │   ├── players.ts         # Player data
│   │   ├── historical.ts      # 5-year historical data
│   │   └── fan-media-sponsorship.ts
│   │
│   ├── lib/
│   │   ├── utils.ts           # Utilities
│   │   ├── cache.ts           # Redis caching
│   │   └── database.ts        # PostgreSQL client
│   │
│   ├── hooks/
│   │   └── useData.ts         # SWR data hooks
│   │
│   └── types/
│       └── index.ts           # TypeScript types
│
├── scripts/
│   └── fetch-data.ts          # Data fetch script
│
├── vercel.json                # Vercel config + crons
├── middleware.ts              # Clerk auth middleware
└── package.json
```

---

## 🤖 Multi-Agent System

### Agents

| Agent | Purpose | Execution |
|-------|---------|-----------|
| **Data Agent** | ETL, validation | Parallel |
| **Analytics Agent** | KPI computation | Parallel |
| **Insights Agent** | AI analysis | Parallel |
| **Ranking Agent** | Rankings | Parallel |
| **Quality Agent** | Data cleaning | Sequential |
| **Orchestrator** | Coordination | - |

### Data Sources

| Source | Data Types | Rate Limit |
|--------|-----------|------------|
| Football-Data.org | Leagues, Teams, Matches | 10/min |
| API-Football | Players, Stats, Transfers | 100/day |
| FIFA | Rankings, Tournaments | 30/min |
| Wikipedia | Club info | Scraping |

---

## 📈 Performance

| Metric | Target | Status |
|--------|--------|--------|
| Initial Load | <200ms | ✅ |
| Page Transition | <50ms | ✅ |
| Cache Hit Rate | >90% | ✅ |
| API Response | <100ms | ✅ |
| Lighthouse Score | >90 | ✅ |

---

## 🎨 Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `gold-400` | #FBBF24 | Primary, CTAs |
| `pitch-400` | #4ADE80 | Success, growth |
| `blue-400` | #60A5FA | Info, links |
| `purple-400` | #C084FC | AI, premium |
| `red-400` | #F87171 | Errors, decline |

### Components

- Glassmorphism cards
- Gradient text
- Animated transitions
- Responsive grids
- Dark theme optimized

---

## 📜 Scripts

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Production build
npm run start            # Start production

# Data
npm run data:fetch       # Fetch all data
npm run data:update      # Update existing data

# Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - For demonstration and educational purposes.

---

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/⚽-Footballytics_v2.0-gold?style=for-the-badge" alt="Footballytics" />
  <br /><br />
  <p><strong>Where Data Meets Football</strong></p>
  <p>Built with ❤️ using Next.js 15, TypeScript, Clerk, and Tailwind CSS</p>
</div>
