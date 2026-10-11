# Clarity: AI-powered Stock Analysis

**Live demo:** https://clarity-stockanalyzer.vercel.app/

## About This Project
A working demonstration of AI + Web integration, connecting a real financial data API (Polygon), an LLM (OpenAI), and a React frontend into a single pipeline, with a Cloudflare Worker backend handling API orchestration and keeping credentials server-side. I built the backend and the frontend integration step by step and understand how each piece works. I also integrated opencode into my VS Code and connected Google AI Studio's free API, using it as a coding assistant to explain concepts, debug issues, and get feedback on how to make my code cleaner and more efficient in this project.

## Features
- Search any ticker, or pick from featured chips with company logos
- Last close, 20-day SMA, and 14-day RSI computed in JavaScript, never estimated by the LLM
- A short plain-English AI insight describing trend and momentum
- Light and dark themes
- Specific error messages for no data, rate limits, AI failures, and an unreachable server

## Design Principle
Clarity explains historical data. It does not predict prices or recommend buying, holding, or selling. That rule is enforced in the AI's system prompt, not just added as a disclaimer, and a disclaimer is also shown in the UI.

## Tech Stack
React 19 + Vite, Cloudflare Workers (backend), Polygon.io (now Massive) market data API, OpenAI API, Vercel (frontend hosting)

## How It Works
```
Browser (React) --> Cloudflare Worker --> Polygon API
                         |
                         +--> OpenAI API
```
1. A search sends the ticker to the Worker's `/polygon` route, which fetches the last 40 days of daily prices and computes the SMA and RSI.
2. The frontend sends that data to `/openai`, which returns a plain-English summary.
3. API keys live only in the Worker as secrets and are never exposed to the browser.

## Run Locally
```
# worker
cd worker
npm install
# add POLYGON_API_KEY and OPENAI_API_KEY to .dev.vars (see .dev.vars.example)
npm run dev

# client (in another terminal)
cd client
npm install
# create .env.local containing: VITE_WORKER_URL=http://localhost:8787
npm run dev
```

## Limitations
- Uses Polygon's free plan: delayed data and 5 requests per minute across all users
- One ticker per search

## Roadmap
- Price chart with an SMA overlay (Recharts)
- Response caching to reduce API calls