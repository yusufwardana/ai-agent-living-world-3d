# Implementation status — 2026-11-21

| Capability | Status | Evidence / limitation |
|---|---|---|
| Master prompt in repository | Implemented | `docs/MASTER_PROMPT.md` |
| Procedural 3D campus | PASS in Muse VM (dev and preview) | Browser rendered ground/buildings/pool/avatars; 1,736/1,085 draw calls per two-second probe on commit `b25760c` |
| 10 avatar models | Implemented in source (demo) | No true navmesh, collision avoidance, animation clips or gameplay state machine |
| Orbit and camera presets | PASS in Muse VM | Top/isometric, orbit drag, roof and repeated UI controls verified on `b25760c` |
| Agent inspector | PASS as demo in Muse VM | Roster and 3D avatar selection verified; no live provider connection |
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

### Offline-rendering patch (Muse browser verification completed)

- Replaced Drei/Troika `<Text>` objects with local Canvas2D-backed sprite labels
  (`WorldLabel`) to remove the runtime CDN unicode-font fetch from core scene.
- Removed remote Google Fonts import and used system font fallbacks.
- Avatar movement now advances a local simulation clock only when unpaused.
- Added `tests/offline-scene.test.ts` for static dependency regression.

**Verification gate satisfied in Muse VM:** Dev and production preview both
rendered actual WebGL geometry with draw calls >0 and repeated UI controls
responded correctly, as reported in the retest below. Real hardware and
mobile performance remain untested.

## Muse retest — 2026-11-21 (reported, commit `b25760c`)

The following results were provided by Muse (Node 24.22.1, Chromium headless,
SwiftShader) and were **not** independently rerun in this editing environment.

- **PASS:** npm install, full typecheck, 2/2 tests, production build.
- **PASS in dev AND preview:** 3D WebGL scene drawn; 1,736 and 1,085
  draw calls per two-second window respectively (previously zero).
- **PASS:** repeated real mouse clicks on Tasks/World navigation, roof,
  pause/resume, camera presets, roster and rendered avatar selection; orbit drag.
- **PASS:** demo task submitted through UI with simulated artifact; no page errors
  or failed network requests. LIVE was still correctly rejected with HTTP 501.
- **NOT TESTED:** physical-GPU FPS, mobile/touch, scroll wheel zoom, cross-device
  behavior, and any real LLM/Supabase execution.
- **New finding:** `mode: "live"` (lowercase) previously fell through and
  created a DEMO task. This is a request validation bug, not evidence of
  successful live execution.

### API request-mode hardening (Muse HTTP retest completed)

- `POST /api/tasks` now requires an object with exact mode `DEMO` or `LIVE`.
- `DEMO` remains simulated and returns 201 for valid task input.
- `LIVE` remains explicitly unsupported and returns 501 INTEGRATION_REQUIRED.
- Lowercase, missing or malformed modes return HTTP 400 INVALID_MODE;
  malformed JSON object shapes return 400 VALIDATION_ERROR.
- Unit tests cover the accepted and rejected mode values.
- **PASS in Muse VM:** HTTP matrix 19/19; no rejected request created a task or
  emitted SSE task-created events. Browser smoke passed 13/13 in each of dev and preview.

## Muse strict-mode API retest — 2026-11-21 (reported, commit `7539935`)

Reported by Muse in the same Linux VM setup; not independently rerun here.

- **PASS:** npm install, typecheck, unit tests 4/4, production build.
- **PASS:** 19/19 API checks. Strict `DEMO` 201, uppercase `LIVE` 501,
  invalid/lowercase/missing mode 400 INVALID_MODE, malformed body shape
  400 VALIDATION_ERROR. Rejected requests changed neither task count nor SSE event count.
- **PASS:** 13/13 browser smoke checks each in development and production
  preview; 1,519 and 1,736 WebGL draw calls per two-second probe respectively;
  no console/page/network errors.
- **NOT TESTED:** hardware GPU FPS, scroll zoom, mobile/touch, LIVE execution.
- **Known edge:** empty POST body returns 400 BAD_REQUEST rather than
  VALIDATION_ERROR; not in this acceptance checklist.

### World Engine v2 — modularization (source committed, Muse QA pending)

- Split monolithic scene into `src/world/WorldLabel.tsx`, `WorldCamera.tsx`,
  `WorldBuildings.tsx`, `WorldProps.tsx`, `WorldAvatars.tsx`, and `types.ts`.
- Composition remains in `src/components/WorldScene.tsx`; geometry, camera,
  event controls and simulation-clock logic are intended to remain equivalent.
- Updated static regression tests for new module boundaries.
- **NOT TESTED in Muse yet:** complete typecheck, build, real mouse interactions
  and visible WebGL rendering after modularization. Run `docs/MUSE_WORLD_V2_RETEST.md`.
