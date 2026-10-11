# AGENTS.md

Stock Analyzer App (React 19 + Vite client & Cloudflare Worker backend).

## Project Structure
- `client/`: React 19 + Vite frontend application.
- `worker/`: Cloudflare Worker backend handling `/polygon` and `/openai` API routes.

## Development & Build Commands

### Client (`client/`)
- **Dev Server:** `npm run dev` (Vite)
- **Build:** `npm run build`
- **Lint:** `npm run lint`

### Worker (`worker/`)
- **Local Dev:** `npm run dev` or `npm run start` (Wrangler dev server on port 8787)
- **Test:** `npm test` (Vitest)
- **Deploy:** `npm run deploy`

## Environment Setup
- Copy `worker/.dev.vars.example` to `worker/.dev.vars` and supply `POLYGON_API_KEY` and `OPENAI_API_KEY` for local worker development.

## Architecture & Quirks
- Worker automatically injects CORS headers and handles `OPTIONS` preflight requests for local frontend communication.
- Worker API routes (`/polygon`, `/openai`) expect `POST` requests.
- Client and worker are separate packages with independent `package.json` files and dependencies.

## Purpose & Core Design Principle
This is an AI-*assisted* stock analysis dashboard — explicitly NOT a price predictor.
The LLM's job is to explain/synthesize real computed data in plain English.
It must NEVER recommend buy/hold/sell, and must NEVER speculate about future price
movement. NFA (Not Financial Advice) is enforced structurally in the system prompt
itself, not just added as a disclaimer after the fact.

## Architecture Pattern
- `index.js` is intentionally thin: CORS/method handling + routing only.
- Each route's actual logic lives in its own file (`polygon.js`, `openai.js`),
  exported as named exports, and called with (request, env, corsHeaders) —
  same argument order/shape for every handler.
- This mirrors an Express routes/controllers split. New routes should follow
  this same pattern rather than adding logic directly into index.js.

## Working Style
- Explain the "why" behind code, not just the "what" — this is a learning
  project, not just a deliverable.
- Build step by step, in small chunks — don't dump large blocks of code at once.
- I type code manually myself; give snippets to type rather than writing
  directly into files, unless I ask otherwise.
- Compare concepts to Express equivalents where relevant.
- Flag anything that might be outdated (API models, library versions, provider
  pricing/free tiers) and verify rather than assume.

## Frontend Structure
- Components live in `client/src/components/<Name>/`, each with a co-located `<Name>.jsx` and `<Name>.css`.
- Styling uses design tokens from `src/styles/theme.css`. Dark mode is driven by `[data-theme="dark"]`.
- `App.jsx` owns all search state and `handleSearch`, which calls `/polygon` and then `/openai`.
  Use the fresh local response from the first fetch for the second request, not React state,
  because state updates are not immediate.
- Only one ticker is searched at a time. The worker still takes an array (`tickersArr`), so the
  client always sends `[ticker]`.
- The date window is the last 40 calendar days, so the 20-day SMA has enough trading days.
- AI text arrives with `**bold**` markers and is rendered by a small parser. Do not use
  `dangerouslySetInnerHTML` for model output.

## Data
- `src/data/tickersInfo.json` is the single source of truth for tickers. Entries with
  `featured: true` show as chips with logos. All others appear in `OtherTickerList`.
  A ticker never appears in both.
- Unknown tickers fall back to showing the raw symbol and a letter badge instead of a logo.

## Deployment
- Worker: `npx wrangler deploy` from `worker/`. Deployed name is `clarity-api`.
  Secrets are set per worker with `npx wrangler secret put` (`POLYGON_API_KEY`, `OPENAI_API_KEY`).
  Renaming the worker creates a new worker with no secrets.
- Client: deployed on Vercel with Root Directory set to `client`. `VITE_WORKER_URL` is set in
  Vercel's environment variables, and locally in `client/.env.local`.
- Vite bakes env vars in at build time, so changing one in Vercel requires a redeploy.
- Never put API keys in `VITE_` variables, because they are public in the browser bundle.