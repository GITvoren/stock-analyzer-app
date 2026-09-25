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