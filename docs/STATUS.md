# Implementation status — 2026-11-21

| Capability | Status | Evidence / limitation |
|---|---|---|
| Master prompt in repository | Implemented | `docs/MASTER_PROMPT.md` |
| Procedural 3D campus | Implemented in source | `src/components/WorldScene.tsx`; browser validation still needed |
| 10 avatar models | Implemented in source (demo) | No true navmesh, collision avoidance, animation clips or gameplay state machine |
| Orbit and camera presets | Implemented in source | Browser validation still needed |
| Agent inspector | Implemented in source | No live provider connection |
| Task creation and event stream | Implemented as local demo | `server/index.ts`; no auth, no live execution |
| Task persistence | Implemented as local demo | `server/store.ts`; JSON, not production DB |
| AI/LLM task execution | NOT IMPLEMENTED | Must not claim real task completion |
| Tool-calling / sandbox | NOT IMPLEMENTED | Blocked by design until security integration |
| Supabase & RLS | NOT IMPLEMENTED | Needs project configuration and authorization |
| Multi-agent team orchestration | NOT IMPLEMENTED | P3 |
| Real meeting engine | NOT IMPLEMENTED | P3 |
| Life simulation beyond roaming | NOT IMPLEMENTED | P4 |
| World builder | NOT IMPLEMENTED | P4 |
| Mobile, collision, FPS benchmarks | NOT TESTED | P1/P5 verification |

**Terminology:** Source present ≠ function passed browser QA. DEMO task completion ≠ actual LLM work. Do not expose the local API publicly.

## Verification from this workspace

- PASS — TypeScript **syntax/transpilation only**: 10 source files parsed by TypeScript 5.8.3 (not a full typecheck).
- PASS — Node test: 1 of 1 tests passing for demo persistence and state transition.
- PASS — Local HTTP smoke checks: `/api/health` OK; demo task created and transitions to `demo_completed` with `simulated: true`; LIVE task rejected with HTTP 501 `INTEGRATION_REQUIRED`.
- NOT TESTED — Full `npm run typecheck`, `npm run build`, and browser 3D tests; npm dependencies could not be installed in this environment.
- NOT TESTED — Actual Supabase, AI provider APIs, tool sandbox, performance and mobile devices.

## Muse Linux VM verification — 2026-11-21 (reported, commit `76480fc`)

The following evidence was reported by Muse on Node 24.22.1 / Chromium headless
with SwiftShader; it was not independently rerun in this editing environment.

- **PASS:** `npm install`, full `npm run typecheck`, 1/1 unit tests,
  `npm run build`, HTTP health, demo task transitions/artifact, SSE and LIVE 501.
- **FAIL in Muse VM:** blank WebGL world with zero draw calls/programs during a
  two-second probe; scene never became visible in either dev or production build.
- **FAIL in Muse VM:** React control clicks often did not produce stable UI state
  changes. Cause not yet proven.
- **Observed:** Troika unicode metadata request to jsDelivr failed, and Google
  Fonts CSS request failed. Correlation with scene suspension is plausible but
  not yet a verified root cause.
- **NOT TESTED:** real hardware FPS, mobile behavior, real provider execution.

### Offline-rendering patch (pending Muse browser verification)

- Replaced Drei/Troika `<Text>` objects with local Canvas2D-backed sprite labels
  (`WorldLabel`) to remove the runtime CDN unicode-font fetch from core scene.
- Removed remote Google Fonts import and used system font fallbacks.
- Avatar movement now advances a local simulation clock only when unpaused.
- Added `tests/offline-scene.test.ts` for static dependency regression.

**Next gate:** Muse must rerun dev and production browser probes, verify the
scene actually produces WebGL draw calls, and exercise every UI control. Do not
mark browser rendering PASS based on this patch or a static test alone.
