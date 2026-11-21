# AI Agent Living World 3D

**An interactive 3D AI-agent campus.** A stylized web simulation with a strictly separated roadmap for real AI execution.

> **Status: Phase 1 starter / development scaffold, NOT a finished AI-agent platform.** The initial scene is real 3D (React Three Fiber), while character routines and task completion are **explicitly simulated**. No LLM execution, provider credential storage, Supabase integration, tool sandbox, production-ready authentication, or pathfinding are implemented yet. Do not deploy the development API publicly.

## What exists now

- A navigable procedural 3D campus: office with workstations, research building, lounge, pool, landscaping, 10 selectable character avatars.
- Orbit/zoom, top-down/isometric camera presets, roof toggle, pause/resume visual simulation.
- React interface: campus overview, roster, avatar inspector, task panel.
- Local Node.js **DEMO ONLY** API: create a simulated task, persist transitions to `data/tasks.json`, emit Server-Sent Events, display an explicitly simulated artifact.
- Frontend/backend TypeScript checks, task state machine test, readable full master prompt in [`docs/MASTER_PROMPT.md`](docs/MASTER_PROMPT.md).

## Quick start

Requires Node.js 20.19+ and npm.

```bash
npm install
npm run dev
```

Open **http://127.0.0.1:5173**. Vite proxies `/api` to the local demo API at `127.0.0.1:8787`. Do not run only the web process if you want task persistence.

```bash
npm run typecheck
npm test
npm run build
```

> The `.env.example` file lists local server defaults; no provider keys are needed for demo mode. **Never put API secrets in VITE_ variables.**

## Source specification

- [Original Google Doc](https://docs.google.com/document/d/1EFuYf9Dqbf26Rc4NhbWV3LcPDjQX6_Q-2IAdj961zD8/mobilebasic)
- [Full master prompt, 23 sections](docs/MASTER_PROMPT.md)
- [Architecture & separation of concerns](docs/ARCHITECTURE.md)
- [Delivery roadmap & acceptance gates](docs/ROADMAP.md)
- [Implementation status / missing integrations](docs/STATUS.md)
- [Muse execution instructions](docs/MUSE_HANDOFF.md)

## Repo structure

```text
src/
  components/WorldScene.tsx   # Procedural 3D world and avatars
  data/agents.ts             # Clearly simulated character roster
  lib/store.ts               # UI/world state
  lib/api.ts                 # Typed demo API client
  App.tsx                    # Interactive interface
server/
  index.ts                   # Local-only HTTP + SSE demo API
  store.ts                   # Atomic JSON persistence; demo only
tests/
  store.test.ts              # State machine and persistence test
docs/
  MASTER_PROMPT.md           # Full source product specification
  ARCHITECTURE.md            # Target architecture, gaps and boundaries
  ROADMAP.md                 # Vertical-slice gates and milestones
  STATUS.md                  # Honest delivered / planned classification
  MUSE_HANDOFF.md            # Pasteable implementation instruction
```

## Engineering principles

1. **No fake AI work:** `demo_completed` never means an LLM task succeeded.
2. **Event truth:** production agents must consume authoritative backend events, not animation timers.
3. **Secret safety:** live execution and provider credentials stay server-side, under explicit permissions and budget limits.
4. **Vertical slice first:** ship a real task→LLM→artifact→3D-status flow before scaling decorative simulation.
5. **Human approvals:** no deployment, publication, paid APIs, credential usage, or destructive external operations without authorization.

## GitHub publication

Create a **private** repository named `ai-agent-living-world-3d`, then from this extracted folder:

```bash
git init
git add .
git commit -m "chore: bootstrap AI Agent Living World 3D phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USER/ai-agent-living-world-3d.git
git push -u origin main
```

Update `YOUR_GITHUB_USER` with your GitHub login. Nothing here automatically creates or publishes a remote GitHub repository.
